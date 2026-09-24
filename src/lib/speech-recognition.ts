import { Rnnoise } from "@shiguredo/rnnoise-wasm";

export type SpeechResultPayload = {
  alternatives: string[];
  isFinal: boolean;
  resultIndex: number;
};

type ContinuousSpeechOptions = {
  shouldStayAlive?: () => boolean;
  onListeningChange?: (listening: boolean) => void;
  onError?: (error: string, recoverable: boolean) => void;
  onSessionStart?: () => void;
};

const SAMPLE_RATE = 16000;
const MAX_RECONNECT_DELAY = 10000;

function downsample(buffer: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate || buffer.length === 0) return buffer;
  const ratio = fromRate / toRate;
  const length = Math.max(1, Math.ceil(buffer.length / ratio));
  const result = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const srcIdx = Math.min(Math.floor(i * ratio), buffer.length - 1);
    result[i] = buffer[srcIdx];
  }
  return result;
}

function float32ToInt16(float32: Float32Array): Int16Array {
  const int16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16;
}

function createAudioConstraints(): MediaTrackConstraints {
  return {
    echoCancellation: { ideal: true },
    autoGainControl: { ideal: true },
    noiseSuppression: { ideal: false },
  };
}

export function startContinuousSpeechRecognition(
  onResult: (payload: SpeechResultPayload) => void,
  options: ContinuousSpeechOptions = {},
): { stop: () => void; restart: () => void } | null {
  if (typeof window === "undefined") return null;

  let alive = true;
  let ws: WebSocket | null = null;
  let stream: MediaStream | null = null;
  let audioCtx: AudioContext | null = null;
  let sourceNode: MediaStreamAudioSourceNode | null = null;
  let processorNode: ScriptProcessorNode | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let stayAliveTimer: ReturnType<typeof setInterval> | null = null;
  let reconnectDelay = 1000;

  type RnnoiseModule = Awaited<ReturnType<typeof Rnnoise.load>>;
  let rnnoise: RnnoiseModule | null = null;
  let denoiseState: ReturnType<RnnoiseModule["createDenoiseState"]> | null = null;
  let denoiseBuffer = new Float32Array(0);

  const cleanupAudio = () => {
    if (processorNode) {
      try { processorNode.disconnect(); } catch { }
      processorNode = null;
    }
    if (sourceNode) {
      try { sourceNode.disconnect(); } catch { }
      sourceNode = null;
    }
    if (audioCtx && audioCtx.state !== "closed") {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
    denoiseBuffer = new Float32Array(0);
  };

  const destroyRNNoise = () => {
    if (denoiseState) {
      try { denoiseState.destroy(); } catch { }
      denoiseState = null;
    }
    rnnoise = null;
  };

  const cleanupWS = () => {
    if (ws) {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
      ws = null;
    }
  };

  const cleanup = () => {
    if (reconnectTimer !== null) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (stayAliveTimer !== null) {
      clearInterval(stayAliveTimer);
      stayAliveTimer = null;
    }
    cleanupAudio();
    cleanupWS();
    destroyRNNoise();
  };

  const reportError = (error: string, recoverable: boolean) => {
    options.onError?.(error, recoverable);
  };

  const scheduleReconnect = () => {
    if (!alive) return;
    if (options.shouldStayAlive && !options.shouldStayAlive()) {
      cleanup();
      return;
    }

    reconnectTimer = setTimeout(() => {
      if (!alive) return;
      if (options.shouldStayAlive && !options.shouldStayAlive()) {
        cleanup();
        return;
      }
      reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
      connect();
    }, reconnectDelay);
  };

  const processThroughRNNoise = (samples: Float32Array): Float32Array => {
    if (!rnnoise || !denoiseState) return samples;

    const frameSize = 480;
    const combined = new Float32Array(denoiseBuffer.length + samples.length);
    combined.set(denoiseBuffer);
    combined.set(samples, denoiseBuffer.length);

    const frames = Math.floor(combined.length / frameSize);
    if (frames === 0) {
      denoiseBuffer = combined;
      return new Float32Array(0);
    }

    const denoised = new Float32Array(frames * frameSize);
    for (let i = 0; i < frames; i++) {
      const frame = combined.subarray(i * frameSize, (i + 1) * frameSize);
      denoiseState.processFrame(frame);
      denoised.set(frame, i * frameSize);
    }

    const consumed = frames * frameSize;
    denoiseBuffer = combined.slice(consumed);

    return denoised;
  };

  const startMicAndStream = async () => {
    if (!alive || !ws || ws.readyState !== WebSocket.OPEN) return;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: createAudioConstraints() });
    } catch (err) {
      const isPermission = err instanceof DOMException && err.name === "NotAllowedError";
      if (isPermission) {
        reportError("not-allowed", false);
        cleanupWS();
        options.onListeningChange?.(false);
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        reportError("audio-capture", true);
        scheduleReconnect();
        return;
      }
    }

    if (!alive) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
      return;
    }

    try {
      audioCtx = new AudioContext();
      sourceNode = audioCtx.createMediaStreamSource(stream);
      processorNode = audioCtx.createScriptProcessor(4096, 1, 1);

      processorNode.onaudioprocess = (e) => {
        if (!alive) return;
        const input = e.inputBuffer.getChannelData(0);
        const downsampled = downsample(input, audioCtx!.sampleRate, SAMPLE_RATE);
        const denoised = processThroughRNNoise(downsampled);
        if (denoised.length > 0) {
          const pcm = float32ToInt16(denoised);
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(pcm.buffer as ArrayBuffer);
          }
        }
      };

      sourceNode.connect(processorNode);
      processorNode.connect(audioCtx.destination);

      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
    } catch {
      reportError("audio-capture", true);
      cleanupAudio();
      scheduleReconnect();
    }
  };

  const connect = async () => {
    if (!alive) return;
    cleanupWS();

    let token: string;
    try {
      const res = await fetch("/api/assemblyai/token", { method: "POST", cache: "no-store" });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[speech] token fetch failed:", res.status, body);
        throw new Error("token fetch failed");
      }
      const data = await res.json();
      token = data.token;
      if (!token) throw new Error("no token");
    } catch {
      reportError("token", false);
      return;
    }

    if (!alive) return;

    try {
      ws = new WebSocket(
        // Explicitly select the current multilingual model. Without a model,
        // the legacy default is English, which is unreliable for Portuguese
        // commands and saint names.
        `wss://streaming.assemblyai.com/v3/ws?token=${token}&sample_rate=${SAMPLE_RATE}&speech_model=u3-rt-pro&prompt=Transcribe%20in%20Brazilian%20Portuguese.`,
      );
    } catch {
      reportError("network", true);
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      if (!alive) {
        cleanupWS();
        return;
      }
      reconnectDelay = 1000;
      options.onSessionStart?.();
      options.onListeningChange?.(true);
      startMicAndStream();
    };

    ws.onmessage = (event) => {
      if (!alive) return;

      if (typeof event.data !== "string") return;

      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (msg.type === "Termination") {
        reportError("network", true);
        cleanupAudio();
        options.onListeningChange?.(false);
        scheduleReconnect();
        return;
      }

      if (msg.type === "Error") {
        reportError("network", true);
        return;
      }

      if (msg.type === "Turn" && msg.transcript) {
        const transcript = msg.transcript as string;
        const utterance = typeof msg.utterance === "string" ? msg.utterance : "";
        // AssemblyAI can finalize an utterance before it decides that the whole
        // conversational turn has ended. Treat that finalized utterance as a
        // final result too, otherwise short commands such as "passar" can sit
        // waiting indefinitely for end_of_turn.
        const isFinalUtterance = utterance.trim().length > 0;
        onResult({
          alternatives: [isFinalUtterance ? utterance : transcript],
          isFinal: msg.end_of_turn === true || isFinalUtterance,
          resultIndex: msg.turn_order as number,
        });
      }
    };

    ws.onerror = () => {
      if (!alive) return;
      reportError("network", true);
    };

    ws.onclose = () => {
      if (!alive) return;
      options.onListeningChange?.(false);
      cleanupAudio();
      ws = null;
      scheduleReconnect();
    };
  };

  connect();

  Rnnoise.load().then((m) => {
    if (!alive) {
      m.createDenoiseState().destroy();
      return;
    }
    rnnoise = m;
    denoiseState = m.createDenoiseState();
  }).catch(() => {
    console.warn("[speech] RNNoise failed to load, continuing without denoising");
  });

  stayAliveTimer = setInterval(() => {
    if (!alive) return;
    if (options.shouldStayAlive && !options.shouldStayAlive()) {
      alive = false;
      cleanup();
      options.onListeningChange?.(false);
    }
  }, 3000);

  return {
    stop: () => {
      alive = false;
      cleanup();
      options.onListeningChange?.(false);
    },
    restart: () => {
      alive = true;
      reconnectDelay = 1000;
      cleanup();
      connect();
    },
  };
}

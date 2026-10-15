import { getControlSnapshot, subscribeControl } from "@/src/lib/control-hub";
import type { ControlEvent } from "@/src/lib/control";

// Server-Sent Events: the `/admin` panel subscribes here and receives every
// game state, every microphone transcript and every command in real time.
export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const keepAlive = setInterval(() => write(": ping\n\n"), 15000);
      const unsubscribe = subscribeControl(emit);

      function write(chunk: string) {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          close();
        }
      }

      function emit(event: ControlEvent) {
        write(`event: ${event.kind}\ndata: ${JSON.stringify(event)}\n\n`);
      }

      function close() {
        if (closed) return;
        closed = true;
        clearInterval(keepAlive);
        unsubscribe();
        try {
          controller.close();
        } catch {
          // The consumer already went away.
        }
      }

      request.signal.addEventListener("abort", close);
      emit({ kind: "snapshot", snapshot: getControlSnapshot() });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
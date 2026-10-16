"use client";

import { useEffect, useRef } from "react";

type AirMouseOptions = {
  onCorrect?: () => void;
  onSkip?: () => void;
  onFault?: () => void;
  onHome?: () => void;
  onChooseForbidden?: () => void;
  onChooseEmoji?: () => void;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function isActivatableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return ["BUTTON", "A", "SUMMARY"].includes(target.tagName);
}

export function useAirMouseControls(options: AirMouseOptions) {
  const callbacks = useRef(options);

  useEffect(() => {
    callbacks.current = options;
  }, [options]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.repeat || isEditableTarget(event.target)) return;
      const code = event.code;
      const key = event.key.toLowerCase();
      const isCorrect = code === "PageUp" || key === "pageup" || event.keyCode === 33;
      const isSkip = code === "PageDown" || key === "pagedown" || event.keyCode === 34;
      // Enter already activates a focused button natively. Firing the fault
      // command as well would send it twice, and would let a button that has
      // nothing to do with the game — the admin ranking form, for instance —
      // register a fault just because the operator pressed Enter.
      const isEnter = code === "Enter" || code === "NumpadEnter" || key === "enter" || event.keyCode === 13;
      const isFault = isEnter && !isActivatableTarget(event.target);
      const isHome = code === "AudioVolumeMute" || code === "Mute" || key === "audiovolumemute" || key === "mute" || event.keyCode === 173;
      const isChooseForbidden = code === "ArrowUp" || key === "arrowup";
      const isChooseEmoji = code === "ArrowDown" || key === "arrowdown";
      const action = isCorrect ? callbacks.current.onCorrect : isSkip ? callbacks.current.onSkip : isFault ? callbacks.current.onFault : isHome ? callbacks.current.onHome : isChooseForbidden ? callbacks.current.onChooseForbidden : isChooseEmoji ? callbacks.current.onChooseEmoji : undefined;
      if (!action) return;
      event.preventDefault();
      action();
    };

    const preventMediaKey = (event: KeyboardEvent) => {
      const code = event.code;
      const key = event.key.toLowerCase();
      if (["AudioVolumeMute", "Mute"].includes(code) || ["audiovolumemute", "mute"].includes(key) || [173].includes(event.keyCode)) event.preventDefault();
    };

    window.addEventListener("keydown", handleKey, true);
    window.addEventListener("keyup", preventMediaKey, true);
    return () => {
      window.removeEventListener("keydown", handleKey, true);
      window.removeEventListener("keyup", preventMediaKey, true);
    };
  }, []);
}

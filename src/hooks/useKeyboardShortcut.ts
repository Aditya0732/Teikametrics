import { useEffect } from "react";

interface ShortcutOptions {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  handler: () => void;
  /** When true, shortcut fires even when an input/textarea is focused */
  global?: boolean;
}

/**
 * Registers a global keyboard shortcut.
 * Cleans up on unmount.
 */
export function useKeyboardShortcut({
  key,
  ctrl = false,
  meta = false,
  handler,
  global = false,
}: ShortcutOptions): void {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Skip if inside input/textarea unless global
      if (
        !global &&
        (e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement)
      ) {
        return;
      }

      const ctrlMatch = ctrl ? e.ctrlKey || e.metaKey : true;
      const metaMatch = meta ? e.metaKey : true;

      if (e.key === key && ctrlMatch && metaMatch) {
        e.preventDefault();
        handler();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, ctrl, meta, handler, global]);
}

import { useState, useCallback } from "react";

/**
 * Copy-to-clipboard hook extracted from Contact.
 * Returns [copied, copyFn] where copied is a boolean that auto-resets
 * after 1.6s (matching the original 1600ms timeout).
 */
export function useCopyToClipboard(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op — matches original silent failure */
    }
  }, []);

  return [copied, copy];
}

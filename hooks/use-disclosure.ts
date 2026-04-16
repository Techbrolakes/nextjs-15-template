"use client";

import { useCallback, useState } from "react";

/**
 * Hook for managing open/close state (modals, dropdowns, drawers).
 *
 * @example
 * const { isOpen, open, close, toggle } = useDisclosure();
 */
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle } as const;
}

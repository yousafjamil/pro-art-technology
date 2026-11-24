"use client";

import { MotionConfig } from "framer-motion";

// Respects the OS "reduce motion" setting everywhere a <motion.*> element is
// used, without every call site having to check for it.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

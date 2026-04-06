import { useState, useEffect } from "react";

/**
 * Returns true if the user has requested reduced motion via OS accessibility settings.
 * When true, all 3D animations, auto-rotations, and GLSL time uniforms should be paused.
 * Conforms to WCAG 2.1 SC 2.3.3.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

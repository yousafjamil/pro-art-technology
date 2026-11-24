"use client";

import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Counts a stat like "62", "24h" or "83%" up from zero the first time it
// scrolls into view. Pure decoration never invents a number — the digits
// come straight from the string passed in.
export function Counter({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);
  const done = useRef(false);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const [, prefix, numStr, suffix] = match;
    const target = Number(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        animate(0, target, {
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
        });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

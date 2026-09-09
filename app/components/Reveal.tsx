"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * Uses an IntersectionObserver directly rather than motion's `whileInView`
 * so we can guarantee a fallback: if the observer never fires (unsupported,
 * scaled/emulated viewports, odd embedding contexts), a timer reveals the
 * content anyway. Content must never be left stuck at opacity 0.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety net — reveal regardless if nothing else has by then.
    const timer = window.setTimeout(() => setShown(true), 1500);

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return () => window.clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

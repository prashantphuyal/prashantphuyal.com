"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { Button, Eyebrow, Headline, Section } from "./ui";
import { Reveal } from "./Reveal";

export function Services() {
  const [open, setOpen] = useState(1); // second item expanded, as in the reference

  return (
    <Section id="help">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Eyebrow>How I help</Eyebrow>
          <Headline lead="What I Can" accent="Help With" />
        </div>
        <Button href="#consult" className="shrink-0">
          Book a free call
        </Button>
      </div>

      <ul className="flex flex-col gap-3">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={s.n} delay={i * 0.05}>
              <li
                className={`overflow-hidden rounded-[26px] border transition-colors duration-300 ${
                  isOpen
                    ? "border-transparent bg-ink-900 text-cream-100 shadow-card dark:bg-ink-800"
                    : "border-line bg-surface-raised text-fg shadow-lift"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`svc-panel-${s.n}`}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
                >
                  <span
                    className={`w-8 shrink-0 text-[13px] font-semibold tabular-nums ${
                      isOpen ? "text-cream-100/45" : "text-fg-muted"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="font-display flex-1 text-[clamp(1.1rem,2.6vw,1.5rem)] font-bold tracking-[-0.015em]">
                    {s.title}
                  </span>
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                      isOpen
                        ? "rotate-45 bg-amber-brand text-ink-900"
                        : "bg-amber-brand text-ink-900"
                    }`}
                  >
                    <ArrowUpRight className="size-[17px]" strokeWidth={2.6} aria-hidden />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`svc-panel-${s.n}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pl-5 sm:px-7 sm:pl-[4.75rem]">
                        <ul className="flex flex-wrap gap-2">
                          {s.chips.map((c) => (
                            <li
                              key={c}
                              className="rounded-pill border border-cream-100/20 px-3 py-1.5 text-[12.5px] font-medium text-cream-100/85"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-cream-100/70">
                          {s.body}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

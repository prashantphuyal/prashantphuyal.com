"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import {
  heroSecondStat,
  heroStats,
  heroTags,
  rotatingBadge,
  site,
} from "@/lib/content";
import { Button } from "./ui";
import { Portrait } from "./Portrait";
import { Socials } from "./Socials";

/** Amber ring badge with text on a circular path. */
function RotatingStamp() {
  return (
    <div className="relative size-[100px] shrink-0 md:size-[118px]">
      <svg viewBox="0 0 200 200" className="size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="stamp-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="96" className="fill-ink-900 dark:fill-ink-700" />
        <circle
          cx="100"
          cy="100"
          r="88"
          className="fill-none stroke-amber-brand/30"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <text className="fill-cream-100 text-[15px] font-semibold tracking-[0.14em]">
          <textPath href="#stamp-path" startOffset="0%">
            {rotatingBadge.repeat(2)}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-10 place-items-center rounded-full bg-amber-brand md:size-11">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
            <path
              d="M12 5v14M12 19l-6-6M12 19l6-6"
              stroke="#16110d"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </div>
  );
}

/** Capability pills as a centered row — no absolute positioning, so nothing collides. */
function CapabilityPills() {
  return (
    <ul className="mt-7 flex flex-wrap justify-center gap-2">
      {heroTags.map((tag, i) => (
        <motion.li
          key={tag}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-pill px-3.5 py-2 text-[12.5px] font-semibold shadow-lift ${
            i % 2 === 0
              ? "bg-ink-900 text-cream-100 dark:bg-ink-700 dark:ring-1 dark:ring-cream-100/10"
              : "bg-amber-brand text-ink-900"
          }`}
        >
          {tag}
        </motion.li>
      ))}
    </ul>
  );
}

function Stat({ headline, sub }: { headline: string; sub: string }) {
  return (
    <div>
      <p className="font-display text-[1.6rem] leading-none font-bold text-amber-deep dark:text-amber-brand">
        {headline}
      </p>
      <p className="mt-1.5 max-w-[15rem] text-[13px] leading-snug text-fg-muted">{sub}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pt-24 pb-0 sm:px-8 sm:pt-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Name — sized so it never overflows its container */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mx-auto max-w-[16ch] text-center text-[clamp(2.25rem,7.5vw,4.75rem)] leading-[1] font-bold tracking-[-0.035em] text-balance"
        >
          I&apos;m {site.firstName}{" "}
          <span className="text-amber-deep dark:text-amber-brand">{site.lastName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-3.5 text-center text-[15px] font-medium text-fg-muted"
        >
          {site.role} · {site.location}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-fg-muted"
        >
          {site.tagline}
        </motion.p>

        <CapabilityPills />

        {/* Portrait stage with side rails */}
        <div className="relative mt-10">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)_minmax(0,1fr)] lg:gap-10">
            {/* Left rail */}
            <div className="order-2 flex flex-col gap-7 lg:order-1 lg:pb-20">
              <div>
                <p className="mb-2.5 text-[13px] font-semibold text-fg-muted">Follow me on</p>
                <Socials compact omit={["mail"]} />
              </div>
              <Stat {...heroStats} />
            </div>

            {/* Center portrait */}
            <div className="relative order-1 lg:order-2">
              <Portrait />
            </div>

            {/* Right rail */}
            <div className="order-3 flex flex-col items-start gap-7 lg:items-end lg:pb-20">
              <div className="lg:self-end">
                <RotatingStamp />
              </div>
              <div className="lg:text-right">
                <Stat {...heroSecondStat} />
              </div>
              <figure className="max-w-[16rem] lg:text-right">
                <Quote
                  className="mb-1.5 size-4 text-amber-brand lg:ml-auto"
                  fill="currentColor"
                  aria-hidden
                />
                <blockquote className="text-[13px] leading-relaxed font-medium text-fg-muted">
                  {site.pullQuote}
                </blockquote>
              </figure>
            </div>
          </div>

          {/* CTAs sit below the portrait, clear of it */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="relative z-10 flex flex-wrap justify-center gap-3 pt-8 pb-16"
          >
            <Button href="#consult">Get a free consultation</Button>
            <Button href="#help" variant="outline">
              See how I help
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

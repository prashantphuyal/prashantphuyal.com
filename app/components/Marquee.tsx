import { marquee } from "@/lib/content";

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {marquee.map((word) => (
        <span key={word} className="flex items-center">
          <span className="font-display px-6 text-[clamp(1.1rem,2.6vw,1.75rem)] font-bold whitespace-nowrap text-ink-900">
            {word}
          </span>
          <span className="text-xl text-ink-900/50" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative bg-amber-brand py-4">
      {/* Torn top edge */}
      <svg
        className="absolute -top-[1px] left-0 h-4 w-full text-surface"
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 0h1200v6l-40 3-38-5-42 7-36-4-44 6-40-6-38 5-42-3-36 6-44-5-40 4-38-6-42 5-36-4-44 6-40-5-38 4-42-6-36 5-44-4-40 6-38-5-42 4-36-6-44 5-40-4-38 6-42-5-36 4-44-6-40 5-38-4-42 6-36-5-44 4-40-6V0Z"
          fill="currentColor"
        />
      </svg>

      <div className="flex overflow-hidden">
        <div className="flex animate-marquee">
          <Row />
          <Row />
        </div>
      </div>

      {/* Torn bottom edge */}
      <svg
        className="absolute -bottom-[1px] left-0 h-4 w-full rotate-180 text-surface"
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 0h1200v6l-40 3-38-5-42 7-36-4-44 6-40-6-38 5-42-3-36 6-44-5-40 4-38-6-42 5-36-4-44 6-40-5-38 4-42-6-36 5-44-4-40 6-38-5-42 4-36-6-44 5-40-4-38 6-42-5-36 4-44-6-40 5-38-4-42 6-36-5-44 4-40-6V0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

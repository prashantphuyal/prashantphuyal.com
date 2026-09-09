import Image from "next/image";
import { portraitSrc, site } from "@/lib/content";

const alt = `${site.name}, ${site.role}`;

/** Soft paper strokes, echoing the reference's brush texture. */
function Strokes() {
  return (
    <svg viewBox="0 0 500 500" className="absolute inset-0 size-full" aria-hidden>
      <g className="fill-cream-100/45 dark:fill-cream-100/20">
        <rect x="42" y="228" width="150" height="26" rx="13" transform="rotate(-4 42 228)" />
        <rect x="300" y="300" width="140" height="22" rx="11" transform="rotate(3 300 300)" />
        <rect x="64" y="352" width="104" height="20" rx="10" transform="rotate(-2 64 352)" />
      </g>
    </svg>
  );
}

function Placeholder({ hint }: { hint: boolean }) {
  return (
    <div className="relative flex size-full flex-col items-center justify-end pb-6">
      <svg viewBox="0 0 240 240" className="h-[88%] w-auto" aria-hidden>
        <defs>
          <clipPath id="pf">
            <path d="M120 22c34 0 58 24 58 58 0 26-12 46-28 56 40 12 74 40 82 84 2 8 2 15 1 20H27c-1-5-1-12 1-20 8-44 42-72 82-84-16-10-28-30-28-56 0-34 24-58 38-58Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#pf)">
          <rect width="240" height="240" className="fill-ink-900/85" />
        </g>
      </svg>
      {hint && (
        <p className="absolute bottom-4 rounded-pill bg-ink-900/85 px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide text-cream-100">
          Add photo → /public, set portraitSrc
        </p>
      )}
    </div>
  );
}

/**
 * Hero treatment: half-body cut-out on a rounded amber blob.
 * The frame is square so the wider half-body crop fills it edge to edge.
 */
export function Portrait() {
  return (
    <div className="relative mx-auto aspect-7/6 w-full max-w-[460px]">
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 size-full"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M250 16c92 0 168 40 208 108 40 68 44 156 4 222-40 66-118 138-212 138S78 412 38 346C-2 280 2 192 42 124 82 56 158 16 250 16Z"
          className="fill-amber-brand"
        />
      </svg>
      <Strokes />
      {portraitSrc ? (
        <Image
          src={portraitSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 460px"
          className="relative object-contain object-bottom"
        />
      ) : (
        <Placeholder hint />
      )}
    </div>
  );
}

/**
 * About treatment: a framed card crop, so the same photo reads
 * differently from the hero cut-out.
 */
export function PortraitCard() {
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <div className="relative aspect-4/5 overflow-hidden rounded-[32px] bg-amber-brand">
        <Strokes />
        {portraitSrc ? (
          <Image
            src={portraitSrc}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 90vw, 400px"
            className="relative object-cover object-center"
          />
        ) : (
          <Placeholder hint={false} />
        )}
      </div>

      {/* Caption chip breaking the frame, as in the reference */}
      <span className="absolute -bottom-4 left-5 rounded-pill bg-ink-900 px-4 py-2.5 text-[12.5px] font-semibold text-cream-100 shadow-card dark:bg-cream-100 dark:text-ink-900">
        Kathmandu, Nepal
      </span>
    </div>
  );
}

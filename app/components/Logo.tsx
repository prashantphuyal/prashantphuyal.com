export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-amber-brand ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-[58%]" fill="none">
        {/* Stylised "P" mark: stem + bowl, drawn as a single geometric glyph */}
        <path
          d="M8.2 19V5.6h5.1a4.35 4.35 0 0 1 0 8.7H8.2"
          stroke="#16110d"
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

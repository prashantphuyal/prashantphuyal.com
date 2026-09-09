import { ThemeToggle } from "./ThemeToggle";

/** Nav-less page: keep the theme control reachable without a header. */
export function FloatingControls() {
  return (
    <div className="fixed top-4 right-4 z-50 rounded-full border border-line bg-surface-raised/80 p-1 shadow-lift backdrop-blur-md sm:top-6 sm:right-6">
      <ThemeToggle />
    </div>
  );
}

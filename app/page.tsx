import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Services } from "./components/Services";
import { Proof } from "./components/Proof";
import { About } from "./components/About";
import { Ventures } from "./components/Ventures";
import { Consult } from "./components/Consult";
import { Footer } from "./components/Contact";
import { FloatingControls } from "./components/FloatingControls";

export default function Home() {
  return (
    <>
      <a
        href="#consult"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-pill focus:bg-ink-900 focus:px-5 focus:py-2.5 focus:text-cream-100"
      >
        Skip to the consultation form
      </a>
      <FloatingControls />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Proof />
        <About />
        <Ventures />
        <Consult />
      </main>
      <Footer />
    </>
  );
}

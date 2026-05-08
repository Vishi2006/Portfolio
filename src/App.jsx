import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tech from "./components/Tech";
import Project from "./components/Project";
import Contact from "./components/Contact";
import LoadingPage from "./components/LoadingPage";
import CustomCursor from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  /* ── Loading timer ─────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3800);
    return () => clearTimeout(t);
  }, []);

  /* ── Lenis smooth scroll + GSAP ScrollTrigger ─────────────── */
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Wire Lenis into GSAP's RAF so ScrollTrigger stays in sync
    function onFrame(time) {
      lenis.raf(time * 1000); // GSAP ticker gives seconds → Lenis needs ms
    }
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    // Keep GSAP ScrollTrigger up to date on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Scroll progress bar
    lenis.on("scroll", ({ progress }) => {
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = `${progress * 100}%`;
    });

    // Let ScrollTrigger know about the actual scroll height after content paints
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      lenis.destroy();
      gsap.ticker.remove(onFrame);
    };
  }, [loading]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise" />

      {/* Scroll progress bar */}
      <div id="scroll-progress" />

      {/* Custom cursor (desktop only, hidden on mobile via CSS) */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full bg-[#050505] text-white"
          >
            <Navbar />
            <main>
              <section id="hero">
                <Hero />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="tech">
                <Tech />
              </section>
              <section id="projects">
                <Project />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * LoadingPage — Cinematic terminal boot sequence.
 * Types out boot lines one by one, fills a green progress bar, then exits.
 */
const BOOT_LINES = [
    "> initializing pulkit.dev ...",
    "> loading core modules ...",
    "> mounting creative engine ...",
    "> calibrating animations ...",
    "> system ready.",
];

const LoadingPage = () => {
    const containerRef = useRef(null);
    const terminalRef = useRef(null);
    const progressRef = useRef(null);
    const lineIndex = useRef(0);
    const charIndex = useRef(0);

    useEffect(() => {
        let rafId;
        let lastTime = 0;
        const charDelay = 28; // ms per char
        const linePause = 280; // ms between lines
        let waitUntil = 0;

        const tick = (time) => {
            if (time < waitUntil) {
                rafId = requestAnimationFrame(tick);
                return;
            }

            const li = lineIndex.current;
            const ci = charIndex.current;
            const terminal = terminalRef.current;
            const progress = progressRef.current;

            if (li >= BOOT_LINES.length) {
                // Done — fill progress to 100%
                if (progress) progress.style.width = "100%";
                return;
            }

            const line = BOOT_LINES[li];

            // Build / find the current <p> element
            let p = terminal?.querySelectorAll("p")[li];
            if (!p) {
                p = document.createElement("p");
                p.className = "text-green-400 text-sm sm:text-base font-mono mb-1 leading-relaxed";
                terminal?.appendChild(p);
            }

            if (ci <= line.length) {
                p.textContent = line.substring(0, ci);
                charIndex.current++;
                waitUntil = time + charDelay;
            } else {
                lineIndex.current++;
                charIndex.current = 0;
                waitUntil = time + linePause;
                // Update progress bar
                if (progress) {
                    progress.style.width = `${((li + 1) / BOOT_LINES.length) * 100}%`;
                }
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[9996] bg-[#050505] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-[80px]"
            ref={containerRef}
        >
            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,255,0,0.018) 3px, rgba(0,255,0,0.018) 4px)",
                }}
            />

            {/* Terminal Window */}
            <div className="w-full max-w-2xl border border-green-500/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,0,0.12)]">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-green-500/20 bg-black/60 backdrop-blur-sm">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span
                        className="ml-3 text-green-500/60 font-mono text-xs tracking-widest uppercase"
                    >
                        pulkit.dev — boot sequence
                    </span>
                </div>

                {/* Terminal Output */}
                <div className="bg-black px-6 sm:px-8 py-6 sm:py-8 min-h-[200px] sm:min-h-[220px]">
                    {/* Large name on top */}
                    <h1
                        className="font-[Doto] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase mb-4 sm:mb-6"
                        style={{
                            background: "linear-gradient(135deg, #39ff14, #00cc00)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Pulkit Khowal
                    </h1>

                    {/* Typed lines */}
                    <div ref={terminalRef} className="mb-3 sm:mb-4" />

                    {/* Blinking cursor */}
                    <span className="terminal-cursor" />
                </div>

                {/* Progress Bar */}
                <div className="h-[3px] bg-green-500/10">
                    <div
                        ref={progressRef}
                        className="h-full bg-green-500 transition-all duration-300 ease-out"
                        style={{ width: "0%", boxShadow: "0 0 8px #00ff00" }}
                    />
                </div>
            </div>

            {/* Subtitle */}
            <p className="mt-6 sm:mt-8 font-mono text-xs tracking-[0.3em] text-green-500/40 uppercase">
                web developer · mern stack · 3d experiences
            </p>
        </motion.div>
    );
};

export default LoadingPage;

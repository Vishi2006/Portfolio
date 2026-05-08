import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import astronautData from "../assets/svgs/Astronaut Illustration.json";

gsap.registerPlugin(ScrollTrigger);

const splitChars = (text) =>
  text.split("").map((ch, i) => (
    <span key={i} className="inline-block" style={{ willChange: "opacity, transform" }}>
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));

const Hero = () => {
  const sectionRef    = useRef(null);
  const nameRef       = useRef(null);
  const subRef        = useRef(null);
  const tagRef        = useRef(null);
  const canvasRef     = useRef(null);
  const arrowRef      = useRef(null);
  const orb1Ref       = useRef(null);
  const orb2Ref       = useRef(null);
  const ctaRef        = useRef(null);
  const astronautRef  = useRef(null);

  /* ── Starfield ──────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, stars, rafId;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.2 + 0.04,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      const time = t / 1000;
      stars.forEach((s) => {
        const opacity = 0.15 + Math.sin(time + s.phase) * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,0,${opacity})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      });
      rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  /* ── GSAP: text entrance ─────────────────────────────────────── */
  useEffect(() => {
    const nameEl   = nameRef.current;
    const subChars = subRef.current?.querySelectorAll("span");
    const tagEl    = tagRef.current;
    const arrow    = arrowRef.current;
    const cta      = ctaRef.current;

    gsap.set(nameEl,   { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.set(subChars, { opacity: 0, y: 18 });
    gsap.set(tagEl,    { opacity: 0, y: 16 });
    gsap.set(cta,      { opacity: 0, y: 24 });
    gsap.set(arrow,    { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
      tl.to(nameEl,   { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.1, ease: "power4.out" })
        .to(subChars, { opacity: 1, y: 0, duration: 0.7, stagger: 0.016 }, "-=0.6")
        .to(tagEl,    { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .to(cta,      { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(arrow,    { opacity: 1,        duration: 0.5  }, "-=0.2");

      // Parallax orbs
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", end: "bottom top", scrub: 1.5,
        onUpdate(self) {
          const p = self.progress;
          if (orb1Ref.current) gsap.set(orb1Ref.current, { y: p * -130 });
          if (orb2Ref.current) gsap.set(orb2Ref.current, { y: p * -65 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── GSAP: Astronaut cinematic flyby ───────────────────────── */
  useEffect(() => {
    const el = astronautRef.current;
    if (!el) return;

    // Adjust animation based on screen size
    const isMobile = window.innerWidth < 1024;
    const startX = isMobile ? "-80vw" : "-120vw";
    const endX = isMobile ? "0vw" : "0vw";
    const duration = isMobile ? 1.6 : 2.2;
    const delay = isMobile ? 1.2 : 0.8;

    // Start far off left, fly across, park on right side
    gsap.set(el, { x: startX, opacity: 0, rotate: -8 });

    const tl = gsap.timeline({ delay: delay });
    tl.to(el, {
      x: endX,
      opacity: 1,
      rotate: 0,
      duration: duration,
      ease: "power2.out",
    })
    // Gentle floating once parked
    .to(el, {
      y: -14,
      rotate: 3,
      duration: 2.0,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => { tl.kill(); };
  }, []);

  /* ── Scroll arrow bounce ───────────────────────────────────── */
  useEffect(() => {
    const a = arrowRef.current;
    if (!a) return;
    const tw = gsap.to(a, { y: 8, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
    return () => tw.kill();
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#050505]"
      style={{ overflowX: "clip" }}
    >
      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%", opacity: 0.75 }} />

      {/* Orbs */}
      <div ref={orb1Ref} className="absolute top-[8%] right-[4%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,0,0.08) 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div ref={orb2Ref} className="absolute bottom-[10%] left-[-60px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,200,0,0.05) 0%, transparent 70%)", filter: "blur(90px)" }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,255,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.018) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto hero-container pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-8 lg:gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-8 lg:mb-10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="font-mono text-xs tracking-[0.3em] text-green-500/60 uppercase">Available for work</span>
            </div>

            {/* Name */}
            <div className="mb-3 sm:mb-5">
              <h1 ref={nameRef}
                className="font-[Doto] font-extrabold uppercase leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(2.2rem, 7vw, 8rem)",
                  background: "linear-gradient(140deg, #ffffff 30%, #39ff14 85%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  willChange: "clip-path, opacity",
                  letterSpacing: "-0.02em",
                }}>
                PULKIT <br /> KHOWAL
              </h1>
            </div>

            {/* Sub heading */}
            <div className="mb-6 lg:mb-8 overflow-hidden">
              <h2 ref={subRef}
                className="font-[Doto] font-extrabold uppercase tracking-[0.2em] whitespace-nowrap"
                style={{ fontSize: "clamp(0.6rem, 1.3vw, 1rem)", color: "rgba(57,255,20,0.65)" }}>
                {splitChars("Web Development  ·  MERN Stack")}
              </h2>
            </div>

            {/* Tagline */}
            <p ref={tagRef} className="font-mono text-sm sm:text-base text-white/38 max-w-md mb-8 sm:mb-10 lg:mb-12 leading-[1.9]">
              <span className="text-green-500/80">{">"}</span>{" "}
              I craft immersive digital experiences — where clean code meets cinematic design.
            </p>

            {/* CTAs — redesigned to match resume button style */}
            <div ref={ctaRef} className="flex items-center gap-6 flex-wrap">
              <a href="#projects"
                onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }}
                className="hero-cta-primary" data-cursor-hover>
                <span>View My Work</span>
                <span className="cta-arrow">↗</span>
              </a>
              <a href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="hero-cta-ghost" data-cursor-hover>
                Let's Talk
              </a>
            </div>
          </div>

          {/* Right: Astronaut flyby */}
          <div
            ref={astronautRef}
            className="flex lg:flex items-center justify-center mt-8 lg:mt-0"
            style={{ willChange: "transform" }}
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[480px]">
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 60%)", filter: "blur(40px)", transform: "scale(1.15)" }} />
              <Lottie
                animationData={astronautData}
                loop={true}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={arrowRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[9px] tracking-[0.4em] text-green-500/35 uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-green-500/35 to-transparent" />
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
    </div>
  );
};

export default Hero;

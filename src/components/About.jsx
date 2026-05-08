import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 2,   label: "Years Coding",   suffix: "+", desc: "of relentless building" },
  { value: 10,  label: "Projects Built",  suffix: "+", desc: "shipped and deployed" },
  { value: 5,   label: "Tech Stacks",     suffix: "+",  desc: "mastered & counting" },
  { value: 100, label: "Git Commits",     suffix: "+", desc: "lines of intent" },
];

const BIO = [
  "Hey! I'm Pulkit — a passionate MERN stack developer who crafts immersive digital experiences. I specialize in building modern, interactive JavaScript-driven applications.",
  "With a keen eye for design and love for clean code, I transform ideas into pixel-perfect reality. From complex architectures to sleek UI/UX — I'm always up for the challenge.",
  "When I'm not coding, you'll find me exploring new tech, building side projects, or experimenting with creative coding to bring unique ideas to life.",
];

const About = () => {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const labelRef   = useRef(null);
  const statsRefs  = useRef([]);
  const parasRefs  = useRef([]);
  const codeRef    = useRef(null);

  useEffect(() => {
    gsap.set(titleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.set(labelRef.current, { opacity: 0, x: -20 });
    statsRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0, y: 50 }));
    parasRefs.current.forEach((el)  => el && gsap.set(el,  { opacity: 0, y: 30 }));
    if (codeRef.current) gsap.set(codeRef.current, { opacity: 0, x: 40 });

    const ctx = gsap.context(() => {

      /* Label fade */
      gsap.to(labelRef.current, {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 90%" },
      });

      /* Title wipe-in */
      gsap.to(titleRef.current, {
        clipPath: "inset(0 0% 0 0)", opacity: 1,
        duration: 1.3, ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 88%" },
      });

      /* Stats: slide up + count */
      statsRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });

        const numEl  = el.querySelector(".stat-num");
        const target = STATS[i].value;
        const obj    = { val: 0 };

        gsap.to(obj, {
          val: target, duration: 2.2, ease: "power2.out",
          onUpdate() { if (numEl) numEl.textContent = Math.floor(obj.val); },
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      /* Bio paragraphs */
      parasRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, delay: i * 0.18, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });

      /* Code card */
      if (codeRef.current) {
        gsap.to(codeRef.current, {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: codeRef.current, start: "top 88%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#050505] overflow-hidden py-32 section-container mt-20 mb-20"
    >
      {/* BG orbs */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,0,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 left-[-100px] w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,200,0,0.03) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">

        {/* Section label */}
        <div ref={labelRef} className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-[0.35em] text-green-500/50 uppercase">
            {"// about_me.txt"}
          </span>
          <div className="flex-1 h-px bg-green-500/10" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-[Doto] font-extrabold uppercase mb-24"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
            lineHeight: 0.95,
            background: "linear-gradient(135deg, #ffffff 35%, #39ff14 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          About Me
        </h2>

        {/* Stats — larger, more impactful */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statsRefs.current[i] = el)}
              className="about-stat-card group"
            >
              <div
                className="font-[Doto] font-extrabold mb-2 leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                  color: "#39ff14",
                  textShadow: "0 0 30px rgba(0,255,0,0.35), 0 0 60px rgba(0,255,0,0.15)",
                }}
              >
                <span className="stat-num">0</span>
                {stat.suffix}
              </div>
              <div className="font-mono text-xs tracking-widest text-white/55 uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-mono text-[10px] tracking-wider text-green-500/30">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: bio + code */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start">

          {/* Bio paragraphs */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-xs tracking-[0.3em] text-green-500/40 uppercase">// my story</span>
              <div className="w-24 h-px bg-green-500/15" />
            </div>
            {BIO.map((para, i) => (
              <p
                key={i}
                ref={(el) => (parasRefs.current[i] = el)}
                className="text-white/55 text-lg sm:text-xl leading-[1.8] font-mono"
              >
                <span className="text-green-400 mr-3 text-sm font-bold">{">"}</span>
                {para}
              </p>
            ))}
          </div>

          {/* Code card */}
          <div ref={codeRef} className="about-code-card !my-0">
            {/* Title bar */}
            <div className="flex items-center gap-2 p-10 border-b border-green-500/10 bg-black/60">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-white/25">pulkit.json</span>
            </div>
            {/* Code body */}
            <pre className="p-8 text-sm leading-6 overflow-x-auto font-mono">
              <code>
                <span className="text-white/30">{"{"}</span>{"\n"}
                {"  "}<span className="text-green-400">"name"</span>
                <span className="text-white/30">: </span>
                <span className="text-white">"Pulkit Khowal"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"  "}<span className="text-green-400">"role"</span>
                <span className="text-white/30">: </span>
                <span className="text-white">"MERN Stack Developer"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"  "}<span className="text-green-400">"location"</span>
                <span className="text-white/30">: </span>
                <span className="text-white">"India 🇮🇳"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"  "}<span className="text-green-400">"experience"</span>
                <span className="text-white/30">: </span>
                <span className="text-green-300">"2+ years"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"  "}<span className="text-green-400">"focus"</span>
                <span className="text-white/30">: [</span>{"\n"}
                {"    "}<span className="text-white">"React"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"    "}<span className="text-white">"Node.js"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"    "}<span className="text-white">"3D Web"</span>
                <span className="text-white/30">,</span>{"\n"}
                {"    "}<span className="text-white">"Creative UI"</span>{"\n"}
                {"  "}<span className="text-white/30">],</span>{"\n"}
                {"  "}<span className="text-green-400">"available"</span>
                <span className="text-white/30">: </span>
                <span className="text-green-400">true</span>{"\n"}
                <span className="text-white/30">{"}"}</span>
              </code>
            </pre>
            {/* Blinking cursor at bottom */}
            <div className="px-7 pb-5 flex items-center gap-2">
              <span className="text-green-500/40 font-mono text-xs">$</span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
    </div>
  );
};

export default About;
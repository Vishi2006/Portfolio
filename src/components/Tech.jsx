import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { name: "JavaScript", img: "/js.png" },
  { name: "React.js", img: "/react.png" },
  { name: "Node.js", img: "/node.png" },
  { name: "MongoDB", img: "/mongo.png" },
  { name: "Express.js", img: "/express.png" },
  { name: "Python", img: "/py.png" },
  { name: "HTML5", img: "/html.png" },
  { name: "CSS3", img: "/css.png" },
  { name: "Tailwind", img: "/tailwind.png" },
  { name: "Next.js", img: "/next.png" },
  { name: "Firebase", img: "/firebase.png" },
  { name: "MySQL", img: "/mysql.png" },
  { name: "Git", img: "/github.png" },
  { name: "Linux", img: "/linux.png" },
  { name: "Bootstrap", img: "/bootstrap.png" },
  { name: "C/C++", img: "/cpp.png" },
];

// Duplicate for seamless loop
const ROW1 = [...TECH_STACK, ...TECH_STACK];
const ROW2 = [...[...TECH_STACK].reverse(), ...[...TECH_STACK].reverse()];

const TechCard = ({ tech }) => (
  <div
    className="flex-shrink-0 flex flex-col items-center justify-center gap-3 mx-5 lg:mx-8
      w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-green-500/15 bg-black/40
      hover:border-green-500/60 hover:bg-green-500/[0.06] hover:shadow-[0_0_20px_rgba(0,255,0,0.15)]
      transition-all duration-300 group cursor-none"
    data-cursor-hover
  >
    <img
      src={tech.img}
      alt={tech.name}
      className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
    />
    <span className="font-[Doto] font-bold uppercase text-[10px] tracking-widest text-white/40 group-hover:text-green-400 transition-colors duration-300 text-center leading-tight">
      {tech.name}
    </span>
  </div>
);

const Tech = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[70vh] flex flex-col justify-center py-20 pb-32 bg-[#050505] overflow-hidden mt-[120px] mb-[120px]"
    >
      {/* BG orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,255,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto section-container mb-20">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs tracking-[0.3em] text-green-500/50 uppercase">
            // skills.config
          </span>
          <div className="flex-1 h-px bg-green-500/10" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-[Doto] font-extrabold uppercase"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
            lineHeight: 0.95,
            background: "linear-gradient(135deg, #ffffff 40%, #39ff14 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
          }}
        >
          Things I Know
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div
        className="relative mb-8 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track-left py-2">
          {ROW1.map((tech, i) => (
            <TechCard key={`r1-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track-right py-2">
          {ROW2.map((tech, i) => (
            <TechCard key={`r2-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
    </div>
  );
};

export default Tech;
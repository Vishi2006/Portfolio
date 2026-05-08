import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "Placement Management System",
    description:
      "Comprehensive campus recruitment platform with student profiles, job postings, application tracking, and interview scheduling for efficient hiring workflow.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "https://images.unsplash.com/photo-1516031190212-da133013de50?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/Vishi2006/placement-management-system",
    demo: "http://placement-management-system-jec.vercel.app/login",
    accent: "#f97316",
  },
  {
    id: "02",
    title: "Habit Tracker",
    description:
      "Daily habit tracking application with streak counting, progress visualization, and persistent data storage for building consistent routines.",
    tags: ["React", "Context API", "LocalStorage"],
    image: "https://images.unsplash.com/photo-1626984260017-356d1189ec72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    github: "https://github.com/Vishi2006/habit-tracker",
    demo: "https://habit-tracker-pulkit.vercel.app/",
    accent: "#a78bfa",
  },
  {
    id: "03",
    title: "Real Time Restaurant Ordering System",
    description:
      "Full-stack real-time ordering platform with live kitchen updates, QR table scanning, and order tracking dashboard.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/project1.png",
    github: "https://github.com/Vishi2006/Vishi-Foods",
    demo: "https://vishfoodsmenu.vercel.app/table/1",
    accent: "#39ff14",
  },
  {
    id: "04",
    title: "React Router Learning Blog",
    description:
      "Interactive developer blog built to showcase React Router v6 patterns — nested routes, loaders, and data fetching.",
    tags: ["React", "React Router", "Tailwind"],
    image: "/project2.png",
    github: "https://github.com/Vishi2006/react-router-blog",
    demo: "https://react-router-blog-pulkit.netlify.app/",
    accent: "#00ccff",
  },
  {
    id: "05",
    title: "Task Manager — To Do List",
    description:
      "Minimalist productivity app with drag-and-drop tasks, local persistence, and priority sorting — zero dependencies.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: "/project3.png",
    github: "https://github.com/Vishi2006/To-Do-List-JS-project",
    demo: "https://vishi2006.github.io/To-Do-List-JS-project/",
    accent: "#ff6b6b",
  },
  {
    id: "06",
    title: "Live Weather App",
    description:
      "Real-time weather application with animated weather icons, 5-day forecast, and geolocation-based auto-detection.",
    tags: ["JavaScript", "OpenWeather API", "CSS"],
    image: "/project4.png",
    github: "https://github.com/Vishi2006/weather-app-in-JS",
    demo: "https://vishi2006.github.io/weather-app-in-JS/",
    accent: "#ffbe0b",
  },
];

/* ── Single Project Card ───────────────────────────────────────── */
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const overlay = overlayRef.current;
    if (!card || !img || !overlay) return;

    // Start overlay invisible
    gsap.set(overlay, { opacity: 0 });

    const enter = () => {
      gsap.to(img, { scale: 1.06, duration: 0.5, ease: "power2.out" });
      gsap.to(overlay, { opacity: 1, duration: 0.35 });
    };
    const leave = () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 cursor-none select-none"
      style={{ width: "clamp(280px, 85vw, 580px)", marginRight: "clamp(1.5rem, 4vw, 3rem)" }}
      data-cursor-hover
    >
      {/* Image container */}
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5 border border-white/[0.06]"
        style={{ height: "clamp(160px, 50vw, 380px)" }}>
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex items-center justify-center gap-4"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)" }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-[Doto] font-extrabold uppercase text-[0.75rem] sm:text-[0.8rem] tracking-[0.2em] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-[1.5px] border-white/50 text-white hover:border-white/90 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-[Doto] font-extrabold uppercase text-[0.75rem] sm:text-[0.8rem] tracking-[0.2em] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-black hover:scale-105 hover:shadow-[0_0_24px_rgba(0,255,0,0.3)]"
            style={{ background: project.accent }}
          >
            Live Demo ↗
          </a>
        </div>

        {/* Number badge */}
        <span
          className="absolute top-4 right-4 font-[Doto] font-extrabold text-4xl leading-none select-none pointer-events-none"
          style={{ color: project.accent, opacity: 0.2 }}
        >
          {project.id}
        </span>
      </div>

      {/* Meta */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `${project.accent}50`,
                color: project.accent,
                background: `${project.accent}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          className="font-[Doto] font-extrabold uppercase text-white mb-2 leading-tight"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)" }}
        >
          {project.title}
        </h3>
        <p className="font-mono text-sm text-white/40 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
};

/* ── Projects Section (Horizontal Pin) ─────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Title reveal */
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 88%" },
        }
      );

      /* Horizontal scroll — calculate at refresh time */
      const getScrollAmount = () =>
        -(trackRef.current.scrollWidth - pinRef.current.offsetWidth);

      gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-[#050505]">

      {/* Static header — sits above pinned region */}
      <div className="w-full max-w-[1400px] mx-auto section-container pt-28 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs tracking-[0.3em] text-green-500/50 uppercase">
            // selected.work
          </span>
          <div className="flex-1 h-px bg-green-500/10" />
        </div>
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
          My Projects
        </h2>
      </div>

      {/* Pinned horizontal scroll viewport */}
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Card track */}
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center pl-6 sm:pl-10 md:pl-16 lg:pl-[88px] xl:pl-[112px] pr-4 sm:pr-6 md:pr-12 lg:pr-[40px] xl:pr-[60px]"
          style={{ willChange: "transform" }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Hint */}
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-white/20 uppercase select-none">
          scroll to explore →
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
    </div>
  );
};

export default Projects;
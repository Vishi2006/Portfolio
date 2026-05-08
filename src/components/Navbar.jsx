import React, { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleResume = () => {
    const link = document.createElement("a");
    link.href = "/Pulkit_Khowal_Resume.pdf";
    link.download = "Pulkit_Khowal_Resume.pdf";
    link.click();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${scrolled
        ? "py-3 bg-black/70 backdrop-blur-xl border-b border-green-500/10 shadow-[0_4px_30px_rgba(0,255,0,0.04)]"
        : "py-4 bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" }); }}
          className="font-[Doto] text-2xl sm:text-3xl font-extrabold uppercase"
          style={{
            background: "linear-gradient(135deg, #39ff14, #00cc00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          data-cursor-hover
        >
          Pulkit Khowal - A Developer
        </a>

        {/* Resume button — properly padded */}
        <button
          onClick={handleResume}
          hero-cta-hover
          className="hero-cta-primary"
        >
          <span>Resume</span>
          <MdOutlineFileDownload size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
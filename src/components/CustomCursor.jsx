import React, { useEffect, useRef } from "react";

/**
 * CustomCursor — Two-ring cursor with magnetic pull on [data-magnetic] elements.
 * Desktop only (hidden via CSS on mobile).
 * BUG FIX: Removed undefined gsapMagnet() call. Unused onEnterMagnetic/onLeaveMagnetic removed.
 */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId;

    /* ── Mouse tracking ── */
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    /* ── Lerp ring ── */
    const lerpRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      rafId = requestAnimationFrame(lerpRing);
    };

    /* ── Hover: any interactive element enlarges the ring ── */
    const onEnter = () => ring.classList.add("hovering");
    const onLeave = () => ring.classList.remove("hovering");

    const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    /* ── Magnetic elements ── */
    const onMagneticMove = (e) => {
      const el   = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.35;
      const dy   = (e.clientY - cy) * 0.35;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      ring.classList.add("hovering");
    };
    const onMagneticLeave = (e) => {
      e.currentTarget.style.transform = "";
      ring.classList.remove("hovering");
    };

    const magnetics = document.querySelectorAll("[data-magnetic]");
    magnetics.forEach((el) => {
      el.addEventListener("mousemove",  onMagneticMove);
      el.addEventListener("mouseleave", onMagneticLeave);
    });

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(lerpRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      magnetics.forEach((el) => {
        el.removeEventListener("mousemove",  onMagneticMove);
        el.removeEventListener("mouseleave", onMagneticLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;

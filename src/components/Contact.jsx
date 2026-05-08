import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: "GitHub",   icon: FiGithub,   url: "https://github.com/Vishi2006",          color: "#fff"    },
  { name: "LinkedIn", icon: FiLinkedin, url: "https://linkedin.com/in/pulkit-khowal", color: "#0077b5" },
  { name: "Twitter",  icon: FiTwitter,  url: "https://twitter.com/the_pulkit_2006",   color: "#1da1f2" },
  { name: "Email",    icon: FiMail,     url: "mailto:pulkitkhowal2006@gmail.com",      color: "#39ff14" },
];

const TerminalInput = ({ label, type = "text", name, value, onChange, placeholder, rows }) => (
  <div className="contact-field-group">
    <label className="block font-mono text-xs tracking-[0.3em] uppercase text-green-500/55 mb-4 sm:mb-5">
      <span className="text-green-500 mr-2">$</span>{label}
    </label>
    {rows ? (
      <textarea
        name={name} value={value} onChange={onChange}
        rows={rows} placeholder={placeholder} required
        className="contact-input"
      />
    ) : (
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required className="contact-input"
      />
    )}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading]   = useState(false);
  const [status, setStatus]         = useState(null);
  const [errorMsg, setErrorMsg]     = useState('');
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const subTitleRef = useRef(null);
  const formRef     = useRef(null);
  const panelRef    = useRef(null);
  const btnRef      = useRef(null);

  const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()  || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || '';
  const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()  || '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) { setStatus(null); setErrorMsg(''); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error'); setErrorMsg('EmailJS not configured. Check .env file.'); return;
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error'); setErrorMsg('Please fill in all fields.'); return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error'); setErrorMsg('Invalid email address.'); return;
    }
    setIsLoading(true); setStatus(null); setErrorMsg('');
    try {
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Pulkit Khowal' },
        EMAILJS_PUBLIC_KEY
      );
      if (res.status === 200) { setStatus('success'); setFormData({ name: '', email: '', message: '' }); }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.text || err.message || 'Failed to send. Please try again.');
    } finally { setIsLoading(false); }
  };

  /* Magnetic submit button */
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onMove  = (e) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.35, y: (e.clientY - rect.top - rect.height / 2) * 0.35, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* Scroll reveals */
  useEffect(() => {
    gsap.set(titleRef.current,    { clipPath: "inset(0 100% 0 0)", opacity: 0 });
    gsap.set(subTitleRef.current, { opacity: 0, y: 30 });
    gsap.set(formRef.current,     { opacity: 0, x: -40 });
    gsap.set(panelRef.current,    { opacity: 0, x:  40 });

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.3, ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      });
      gsap.to(subTitleRef.current, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: subTitleRef.current, start: "top 87%" },
      });
      gsap.to(formRef.current, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      });
      gsap.to(panelRef.current, {
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: panelRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#050505] overflow-hidden py-36 section-container">

      {/* BG orbs */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,0,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-1/4 left-[-100px] w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,180,0,0.03) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">

        {/* Label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-[0.35em] text-green-500/50 uppercase">// contact.init()</span>
          <div className="flex-1 h-px bg-green-500/10" />
        </div>

        {/* Bold closing headline */}
        <h2
          ref={titleRef}
          className="font-[Doto] font-extrabold uppercase mb-8 lg:mb-12"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 5rem)", lineHeight: 0.95,
            background: "linear-gradient(135deg, #ffffff 35%, #39ff14 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          Let's Build<br />Something<br />Crazy Together
        </h2>

        <p ref={subTitleRef} className="font-mono text-base sm:text-lg text-white/35 max-w-xl mb-20 leading-relaxed">
          <span className="text-green-500">{">"}</span> Have an idea or a project in mind? Drop a message — I'm always excited to collaborate.
        </p>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-14 lg:gap-24">

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-9 lg:space-y-10">
            <TerminalInput label="name"    name="name"    value={formData.name}    onChange={handleChange} placeholder="Your name..."                        />
            <TerminalInput label="email"   type="email"   name="email"   value={formData.email}   onChange={handleChange} placeholder="your.email@domain.com"            />
            <TerminalInput label="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project or idea..." rows={7}   />

            {status === 'error' && errorMsg && (
              <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/[0.05] rounded-2xl px-5 py-4">
                <span className="text-red-400 font-mono text-xs mt-0.5">✗</span>
                <p className="font-mono text-xs text-red-400">{errorMsg}</p>
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-3 border border-green-500/30 bg-green-500/[0.05] rounded-2xl px-5 py-4">
                <span className="text-green-400 font-mono text-xs">✓</span>
                <p className="font-mono text-xs text-green-400">Transmission successful! I'll get back to you within 24 hours.</p>
              </div>
            )}

            <div className="pt-3">
              <button ref={btnRef} type="submit" disabled={isLoading} className="hero-cta-primary">
                <span>{isLoading ? 'Transmitting...' : 'Transmit Message'}</span>
                {!isLoading && <FiArrowUpRight size={20} />}
              </button>
            </div>
          </form>

          {/* Right panel */}
          <div ref={panelRef} className="space-y-10">
            <div className="contact-info-card">
              <p className="font-mono text-xs tracking-widest text-green-500/55 uppercase mb-10 sm:mb-12">// system.info</p>
              {[
                ["response_time", "< 24 hours"],
                ["status",        "open_to_freelance"],
                ["timezone",      "IST (UTC+5:30)"],
                ["mode",          "building_cool_things"],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center gap-4 py-5 sm:py-6 border-b border-green-500/[0.07] last:border-0">
                  <span className="text-green-500 font-mono text-xs">$</span>
                  <span className="font-mono text-xs text-white/35 min-w-[160px]">{key}:</span>
                  <span className="font-mono text-xs text-white/80">{val}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-green-500/45 mb-6 sm:mb-8">// find me on</p>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(({ name, icon: Icon, url, color }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                    data-cursor-hover className="contact-social-link group">
                    <Icon size={18} style={{ color }} className="flex-shrink-0 opacity-65 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-[Doto] font-bold uppercase text-xs tracking-widest text-white/45 group-hover:text-white/90 transition-colors duration-300">
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-28 pt-10 border-t border-green-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/20 tracking-widest uppercase">© 2025 Pulkit Khowal — Built in the Void</p>
          <p className="font-mono text-xs text-green-500/30 tracking-widest uppercase">React · GSAP · Lenis · Tailwind</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
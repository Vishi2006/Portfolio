import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LocomotiveScroll from 'locomotive-scroll';
import LoadingPage from "./components/LoadingPage";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import About from "./components/About";
import Tech from "./components/Tech";
import Project from "./components/Project";
import Contact from "./components/Contact";

/**
 * Main App Component
 * Handles loading state and smooth scroll initialization
 * Renders all portfolio sections with smooth transitions
 */
const App = () => {
  const [loading, setLoading] = useState(true);
  const smoothScrollRef = useRef(null);

  // Loading screen timer - shows for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Locomotive Scroll for smooth scrolling after loading
  useEffect(() => {
    if (!loading && smoothScrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: smoothScrollRef.current,
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
      // Update scroll after a delay to ensure DOM is ready
      setTimeout(() => scroll.update(), 1000);
      // Cleanup: destroy scroll instance on unmount
      return () => {
        scroll.destroy();
      };
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage />
        ) : (
          <motion.div
            data-scroll-container
            ref={smoothScrollRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full min-h-screen bg-black text-white"
          >
            <Navbar />
            <div className="border-b border-green-500/70">
              <LandingPage />
            </div>
            <div className="border-b border-green-500/70">
              <About />
            </div>
            <div className="border-b border-green-500/70">
              <Tech />
            </div>
            <div className="border-b border-green-500/70">
              <Project />
            </div>
            <div>
              <Contact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;



import { motion } from 'framer-motion'
import Lottie from "lottie-react";
import astronaut from "../assets/svgs/Astronaut Illustration.json"
import coder from "../assets/svgs/space boy developer.json"
import React, { useRef, useState } from 'react'

/**
 * LandingPage Component
 * Main hero section with animated text and Lottie animations
 * Fully responsive for mobile, tablet, and desktop
 */
const LandingPage = () => {
  const tiltRef = useRef(null);
  const [xVal, setXVal] = useState(0);
  const [yVal, setYVal] = useState(0);

  // 3D tilt effect on mouse move (desktop only)
  const mouseMoving = (e) => {
    if (tiltRef.current && window.innerWidth >= 1024) {
      setXVal((e.clientX - tiltRef.current.getBoundingClientRect().x - tiltRef.current.getBoundingClientRect().width / 2) / 30);
      setYVal(-(e.clientY - tiltRef.current.getBoundingClientRect().y - tiltRef.current.getBoundingClientRect().height / 2) / 20);
      tiltRef.current.style.transform = `rotateX(${yVal}deg) rotateY(${xVal}deg)`;
    }
  };

  return (
    <div id='mainDiv' className="w-full min-h-screen flex flex-col lg:flex-row pb-8 sm:pb-12 lg:pb-16">
      {/* Left Section - Text Content */}
      <div
        ref={tiltRef}
        onMouseMove={mouseMoving}
        id='textstructure'
        className='textstructure div1 w-full lg:w-[65vw] min-h-[60vh] lg:h-[80vh] font-[Doto] mt-[5vh] lg:mt-[10vh] px-[5vw] lg:px-[7vw] font-extrabold uppercase flex items-center'
      >
        <div className='headings w-full'>
          <div className="w-fit">
            <h1 className='leading-[1.2] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4vw] lg:leading-[5vw] mb-2 sm:mb-4'>heyy!</h1>
            <div className='w-fit flex items-center flex-wrap gap-2 sm:gap-3 md:gap-4'>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 1, delay: 1 }}
                className='h-[6vh] sm:h-[8vh] md:h-[10vh] lg:h-[12vh] w-[50px] sm:w-[60px] md:w-[80px] lg:w-[6vw] flex items-center justify-center overflow-hidden'
              >
                <Lottie
                  animationData={astronaut}
                  loop={true}
                  autoplay={true}
                  style={{transform: "scale(2)"}}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <h2 className='leading-[1.2] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4vw] lg:leading-[5vw]'>i'm pulkit,</h2>
            </div>
            <h2 className='leading-[1.2] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4vw] lg:leading-[5vw] mt-2 sm:mt-4'>a web developer</h2>
            <h1 className='leading-[1.2] text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[3vw] lg:leading-[5vw] mt-2 sm:mt-4'>who loves creating cool,</h1>
            <h1 className='leading-[1.2] text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[3vw] lg:leading-[5vw]'>modern and 3d websites.</h1>
          </div>
        </div>
      </div>

      {/* Right Section - Coder Animation */}
      <div className="div2 w-full lg:w-[35vw] min-h-[40vh] lg:h-[80vh] font-[Doto] mt-[2vh] lg:mt-[10vh] px-[5vw] lg:px-[7vw] flex justify-center items-center">
        <Lottie
          animationData={coder}
          loop={true}
          autoplay={true}
          style={{transform: "scale(3)"}}
          className="w-[60vw] h-[30vh] sm:w-[50vw] sm:h-[35vh] md:w-[40vw] md:h-[40vh] lg:w-[20vw] lg:h-[30vh] object-contain mb-[2vh] lg:mb-[16vh]"
        />
      </div>
    </div>
  )
}

export default LandingPage

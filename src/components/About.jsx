import React from 'react';
import Lottie from "lottie-react";
import me from "../assets/svgs/Technology.json"


const AnimationComponent = () => {
  return (
    <div className="w-full h-full flex text-center items-center justify-center bg-gray-900/20 rounded-lg">
      <Lottie
        animationData={me}
        loop={true}
        autoplay={true}
        className="w-full h-full object-contain scale-100"
      />
    </div>
  );
};


const BioComponent = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center space-y-6 sm:space-y-8 font-[Doto] px-4 sm:px-6 lg:px-8">
      <div className="w-full mb-6 sm:mb-8">
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer'>
          About me.txt
        </h1>
        {/* Consistent green underline bar */}
        <div className="h-1 w-96 bg-green-500/70 mt-2"></div>
      </div>

      <div className="space-y-4 sm:space-y-6 font-extrabold uppercase">
        <p className="text-2xl leading-relaxed">
          <span className="text-[#00ff00] font-mono">{'> '}</span>
          Hey! I'm Pulkit, a passionate MERN stack developer who loves crafting immersive digital experiences. 
          I specialize in building modern and interactive JS based development.
        </p>
        
        <p className="text-2xl leading-relaxed">
          <span className="text-[#00ff00] font-mono">{'> '}</span>
          With a keen eye for design and a love for clean code, I transform ideas into pixel-perfect reality. 
          Whether it's quality code, complex design, or sleek UI/UX, I'm always excited to take on new challenges.
        </p>

        <p className="text-2xl leading-relaxed">
          <span className="text-[#00ff00] font-mono">{'> '}</span>
          When I'm not coding, you'll find me exploring new development technologies, building some projects, 
          or experimenting with creative coding to bring unique ideas to life.
        </p>
      </div>
    </div>
  );
};


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 border-t border-b border-green-500/70 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-center">
        {/* Animation Component - Full width on mobile, 30% on desktop */}
        <div className="w-full lg:w-[30%] h-[50vh] sm:h-[60vh] lg:h-[85vh] order-2 lg:order-1 mb-8 lg:mb-0">
          <AnimationComponent />
        </div>

        {/* Vertical Divider - Centered and visible on desktop */}
        <div className="hidden lg:flex items-center justify-center h-[85vh]">
          <div className="h-[600px] w-[2px] bg-green-500/30"></div>
        </div>

        {/* Bio Component - Full width on mobile, 70% on desktop */}
        <div className="w-full lg:w-[70%] min-h-[50vh] lg:h-[85vh] flex items-center order-1 lg:order-2">
          <BioComponent />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
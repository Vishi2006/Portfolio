import React from 'react'
import { MdOutlineFileDownload } from "react-icons/md";


const Navbar = () => {
  
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Pulkit-Khowal-Resume.pdf'; 
    link.download = 'Pulkit_Khowal_Resume.pdf';
    link.click();
  };

  return (
    <div className='sticky top-0 w-full px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-6 flex justify-between items-center shadow-lg border-b border-green-500/70 bg-black z-[20]'>
      {/* Logo */}
      <div className="logo">
        <h1 className="font-[Doto] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
          Pulkit Khowal
        </h1>
      </div>

      {/* Resume Download Button */}
      <div className='links'>
        <button
          onClick={handleResumeDownload}
          className='font-[Doto] font-extrabold uppercase group text-base sm:text-lg md:text-xl lg:text-2xl h-10 sm:h-12 px-4 sm:px-6 flex items-center gap-2 sm:gap-3 rounded-full bg-green-500/80 hover:bg-zinc-700 hover:text-green-500 text-black  transition-all duration-300 transform '
        >
          <span>Resume</span>
          <MdOutlineFileDownload className="text-xl sm:text-2xl group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  )
}

export default Navbar;
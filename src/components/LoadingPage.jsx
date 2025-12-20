import { motion } from "framer-motion";
import React, { useRef, useEffect } from 'react';
import loading from '../assets/svgs/Loading bar.json';
import Lottie from "lottie-react";


const LoadingPage = () => {
    const lottieRef = useRef();

    // Slow down Lottie animation speed
    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.5);
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className='w-full h-screen flex justify-center items-center bg-zinc-900/30 p-2 sm:p-4'
        >
            <div className='w-full max-w-[95vw] h-[95vh] bg-zinc-800/70 flex justify-around items-center rounded-2xl sm:rounded-4xl'>
                <div className="w-full h-full bg-zinc-800/90 rounded-2xl sm:rounded-4xl flex justify-center items-center">
                    <div className="w-full h-full bg-black rounded-2xl sm:rounded-4xl font-[Doto] flex flex-col justify-center items-center p-4 sm:p-8">
                        {/* Header */}
                        <div className='w-full h-[18%] flex items-center justify-center sm:justify-start'>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent px-4 sm:px-12">
                                Pulkit Khowal
                            </h1>
                        </div>
                        
                        {/* Main Text */}
                        <div className='w-full h-[62%] flex items-center'>
                            <div className='w-full h-full mt-[2vh] sm:mt-[5vh] px-[5vw] sm:px-[7vw] font-extrabold uppercase text-white'>
                                <h1 className='leading-[1.2] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5vw] lg:leading-[5vw]'>heyy!</h1>
                                <h2 className='leading-[1.2] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5vw] lg:leading-[5vw]'>i'm pulkit,</h2>
                                <h2 className='leading-[1.2] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5vw] lg:leading-[5vw]'>a web developer</h2>
                                <h1 className='leading-[1.2] text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3vw] lg:leading-[5vw]'>who loves creating cool,</h1>
                                <h1 className='leading-[1.2] text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3vw] lg:leading-[5vw]'>modern and 3d websites.</h1>
                            </div>
                        </div>
                        
                        {/* Loading Animation */}
                        <div className='w-full h-[20%] flex items-end justify-center sm:justify-end mr-40'>
                            <div className='w-fit h-20 sm:h-32 p-3 sm:p-5'>
                                <Lottie
                                    animationData={loading}
                                    lottieRef={lottieRef}
                                    loop={true}
                                    autoplay={true}
                                    className="w-full h-full object-contain"
                                    style={{ filter: "invert(1)", transform: "scale(3)" }}
                                    speed={0.25}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingPage;

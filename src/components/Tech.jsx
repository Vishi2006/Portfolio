import React, { useState } from 'react';


const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  // Tech stack data with images
  const techStack = [
    { name: 'JavaScript', image: '/js.png' },
    { name: 'Python', image: '/py.png' },
    { name: 'C/C++', image: '/cpp.png' },
    { name: 'HTML', image: '/html.png' },
    { name: 'CSS', image: '/css.png' },
    { name: 'Tailwind CSS', image: '/tailwind.png' },
    { name: 'Bootstrap CSS', image: '/bootstrap.png' },
    { name: 'React.Js', image: '/react.png' },
    { name: 'Next.Js', image: '/next.png' },
    { name: 'Firebase', image: '/firebase.png' },
    { name: 'Node.js', image: '/node.png' },
    { name: 'Express.js', image: '/express.png' },
    { name: 'MongoDB', image: '/mongo.png' },
    { name: 'MySQL', image: '/mysql.png' },
    { name: 'Git/Github', image: '/github.png' },
    { name: 'Linux', image: '/linux.png' },
  ];

  return (
    <div className="w-full min-h-screen font-[Doto] bg-black text-white flex flex-col items-start justify-center relative border-b border-green-500/70 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Heading */}
      <div className="w-full mb-6 sm:mb-8">
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer'>
          Things i know
        </h1>
        {/* Consistent green underline bar */}
        <div className="h-1 w-96 bg-green-500/70 mt-2"></div>
      </div>
      
      {/* Tech Names List - Full Width, Stacks Vertically */}
      <div className="w-full uppercase font-extrabold">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="relative cursor-pointer w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 transition-all duration-300 text-xl sm:text-2xl md:text-3xl font-bold border-b border-gray-800 hover:bg-green-600 hover:text-black"
            style={{
              backgroundColor: hoveredTech === index ? 'darkgreen' : '#000',
              color: hoveredTech === index ? '#000' : '#fff'
            }}
            onMouseEnter={() => setHoveredTech(index)}
            onMouseLeave={() => setHoveredTech(null)}
            onTouchStart={() => setHoveredTech(hoveredTech === index ? null : index)}
          >
            {tech.name}
          </div>
        ))}
      </div>

      {/* Image Overlay - Positioned over the hovered div (hidden on mobile, shown on tablet+) */}
      {hoveredTech !== null && (
        <div 
          className="hidden md:flex absolute inset-0 pointer-events-none items-center justify-center z-20"
        >
          <img 
            style={{height:"200px", width:"300px", objectFit:"contain"}}
            src={techStack[hoveredTech].image}
            alt={techStack[hoveredTech].name}
            className="max-w-md max-h-[80vh] object-contain rounded-lg shadow-2xl transition-all ease-out"
          />
        </div>
      )}
    </div>
  );
};

export default Tech;
import React, { useState } from 'react';


const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      title: 'Real Time Restaurant Ordering System',
      image: '/project1.png',
      github: 'https://github.com/Vishi2006/Vishi-Foods',
      demo: 'https://vishfoodsmenu.vercel.app/table/1'
    },
    {
      title: 'React Router Learning Blog',
      image: '/project2.png',
      github: 'https://github.com/Vishi2006/react-router-blog',
      demo: 'https://react-router-blog-pulkit.netlify.app/'
    },
    {
      title: 'To Do List',
      image: '/project3.png',
      github: 'https://github.com/Vishi2006/To-Do-List-JS-project',
      demo: 'https://vishi2006.github.io/To-Do-List-JS-project/'
    },
    {
      title: 'Weather App',
      image: '/project4.png',
      github: 'https://github.com/Vishi2006/weather-app-in-JS',
      demo: 'https://vishi2006.github.io/weather-app-in-JS/'
    }
  ];

  return (
    <div className="min-h-screen w-full font-[Doto] mb-12 sm:mb-20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading - Right Aligned */}
        <div className="mb-8 sm:mb-12 flex flex-col items-end">
          <h1 className='text-3xl sm:text-4xl md:text-5xl text-right font-extrabold uppercase bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer'>
            My Projects
          </h1>
          {/* Consistent green underline bar */}
          <div className="h-1 w-80 bg-green-500/70 mt-2"></div>
        </div>
        
        {/* Projects Grid - 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-900"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Project Title - Appears on hover */}
              {hoveredProject === index && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black px-4 sm:px-8 text-center leading-tight"
                    style={{
                      color: 'white',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      animation: 'fadeIn 0.3s ease-out'
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
              )}

              {/* Small dot indicator */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
              
              {/* Project label text at top */}
              <div className="absolute top-4 sm:top-6 left-8 sm:left-12 text-sm sm:text-lg md:text-xl font-extrabold text-white max-w-[80%] truncate">
                {project.title}
              </div>

              {/* Links - Bottom of box, appear on hover */}
              {hoveredProject === index && (
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row gap-2 sm:gap-4 z-10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base"
                    style={{ animation: 'slideUp 0.3s ease-out' }}
                  >
                    GITHUB
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base"
                    style={{ 
                      backgroundColor: 'darkgreen',
                      color: '#000',
                      animation: 'slideUp 0.3s ease-out 0.1s backwards'
                    }}
                  >
                    LIVE DEMO
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
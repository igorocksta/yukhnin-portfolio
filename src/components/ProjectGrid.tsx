
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Plus } from 'lucide-react';
import { PROJECTS } from '../data';
import { Link } from 'react-router-dom';
import { usePageTransition } from '../context/PageTransitionContext';

interface ProjectCardProps {
  project: typeof PROJECTS[number];
  index: number;
  key?: React.Key;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { navigateToCaseStudy } = usePageTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elastic spring configurations for custom cursor behavior
  const springConfig = { stiffness: 150, damping: 22, mass: 0.15 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set raw values immediately on entering so the circle doesn't drift from 0,0
    mouseX.set(x);
    mouseY.set(y);
    sX.set(x);
    sY.set(y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group flex flex-col ${index % 2 !== 0 ? 'xl:mt-32' : ''}`}
    >
      <div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-[20px] md:mb-[32px] border border-white/[0.12] bg-white/5 cursor-none"
      >
        <Link 
          to={`/case-study/${project.id}`} 
          onPointerDown={(e) => {
            if (e.button === 0 && e.pointerType === 'mouse') {
              navigateToCaseStudy(project.id);
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            navigateToCaseStudy(project.id);
          }}
          className="block w-full h-full"
        >
          <img
            src={project.cardImage || project.image}
            alt={project.title}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Background interactive dim transition without blur */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Tracking hover circle badge */}
          <motion.div 
            style={{ 
              x: sX, 
              y: sY, 
              translateX: '-50%', 
              translateY: '-50%',
              left: 0, 
              top: 0 
            }}
            className="absolute pointer-events-none w-[136px] h-[136px] flex items-center justify-center transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-20"
          >
            {/* Background Circle - slightly more transparent, no border */}
            <div className="absolute inset-0 bg-black/70 rounded-full shadow-2xl backdrop-blur-[2px]" />
            
            {/* Rotating Text Circle */}
            <motion.div 
              className="absolute inset-0.5"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white/80">
                <path
                  id={`circlePath-${project.id}`}
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[8.5px] uppercase tracking-[0.18em] font-medium">
                  <textPath xlinkHref={`#circlePath-${project.id}`} startOffset="25%" textAnchor="middle">
                    VIEW PROJECT
                  </textPath>
                  <textPath xlinkHref={`#circlePath-${project.id}`} startOffset="75%" textAnchor="middle">
                    VIEW PROJECT
                  </textPath>
                  <textPath xlinkHref={`#circlePath-${project.id}`} startOffset="50%" textAnchor="middle">
                    •
                  </textPath>
                  <textPath xlinkHref={`#circlePath-${project.id}`} startOffset="0.8%" textAnchor="middle">
                    •
                  </textPath>
                </text>
              </svg>
            </motion.div>
            
            {/* Central Cross */}
            <div className="relative z-10 text-white">
              <Plus size={18} strokeWidth={1.2} />
            </div>
          </motion.div>
        </Link>
      </div>
 
      <div className="flex items-start justify-between w-full">
        <div className="w-full">
          <Link 
            to={`/case-study/${project.id}`}
            onPointerDown={(e) => {
              if (e.button === 0 && e.pointerType === 'mouse') {
                navigateToCaseStudy(project.id);
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              navigateToCaseStudy(project.id);
            }}
          >
            <h3 className="text-2xl sm:text-[32px] sm:leading-tight font-dm-sans font-bold mb-4 tracking-[-0.3px] sm:tracking-[-0.5px] group-hover:text-[#ff6900] transition-colors">
              {project.title}
            </h3>
          </Link>
          {project.description && (
            <>
              {project.mobileDescription ? (
                <>
                  <p className="hidden md:block text-[20px] leading-[28px] text-white/60 font-light mb-4 max-w-2xl">
                    {project.description}
                  </p>
                  <p className="block md:hidden text-[20px] leading-[28px] text-white/60 font-light mb-4 max-w-2xl">
                    {project.mobileDescription}
                  </p>
                </>
              ) : (
                <p className="text-[20px] leading-[28px] text-white/60 font-light mb-4 max-w-2xl">
                  {project.description}
                </p>
              )}
              <div className="w-full h-[1px] bg-white/[0.12] mb-2 sm:mb-4" />
            </>
          )}
          <div>
            <div className="flex flex-wrap gap-2">
              {project.company && (
                <span className="text-[12px] px-2 py-0.5 sm:py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light">
                  {project.company}
                </span>
              )}
              {project.tags.map(tag => (
                <span key={tag} className="text-[12px] px-2 py-0.5 sm:py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 
import { TextReveal } from './TextReveal';

export default function ProjectGrid() {
  return (
    <section id="work" data-section="works" className="pt-0 md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-0 relative overflow-x-clip">
      {/* Target anchor for plural /#works */}
      <div id="works" className="absolute top-0 left-0 pointer-events-none" />
      {/* Background glow centered directly on the screen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] md:w-[750px] h-[550px] sm:h-[650px] md:h-[750px] bg-gradient-to-br from-blue-600/25 via-blue-500/20 to-indigo-600/15 blur-[150px] rounded-full pointer-events-none transform-gpu will-change-transform z-0" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-[80px] gap-2 md:gap-4">
          <div className="max-w-xl">
            <h2 className="text-[36px] md:text-5xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2.5px] text-white leading-[40px] md:leading-none">
              <TextReveal text="Selected Works" delay={0.2} className="tracking-[-1px] md:tracking-[-2.5px]" />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-16 sm:gap-y-20 xl:gap-y-24 gap-x-16 xl:gap-x-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* See More Works Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center mt-16 md:mt-24"
        >
          <motion.a
            href="https://app.notion.com/p/yukhnin-product-designer/Igor-Yukhnin-Portfolio-3f7058457ecc8015ad94d81518453a3f?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center bg-white text-black px-8 sm:px-10 h-[80px] rounded-full text-[18px] font-normal hover:bg-[#ff6900] hover:text-white transition-colors duration-300 cursor-pointer select-none group shadow-lg"
          >
            {/* Left text */}
            <span className="font-sans font-normal text-[18px] whitespace-nowrap">
              See More Works
            </span>

            {/* Vertical separator */}
            <div className="h-8 w-[1px] bg-black/20 group-hover:bg-white/40 transition-colors duration-300 mx-6 shrink-0" />

            {/* Notion brand block */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Authentic Notion Cube */}
              <svg 
                className="w-5 h-5 sm:w-[22px] sm:h-[22px] shrink-0"
                viewBox="0 0 100 100" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" 
                />
              </svg>
              <span className="font-sans font-normal text-[18px] whitespace-nowrap">
                Notion
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

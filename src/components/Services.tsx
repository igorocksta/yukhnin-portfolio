import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, Compass, MonitorSmartphone, Component, Sparkles, FileSearch, ArrowUpRight } from 'lucide-react';
import { TextReveal, BlockReveal, EyebrowReveal } from './TextReveal';

interface ServiceItem {
  num: string;
  tag: string;
  title: string;
  desc: string;
  shortHighlight: string;
  icon: any;
  capabilities: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    num: "01",
    tag: "Strategy",
    title: "Product & UX Strategy",
    desc: "I help B2B SaaS and data‑heavy products align product vision, UX direction and critical user flows with concrete business goals and metrics, so teams move in one direction and measure the impact of design on outcomes.",
    shortHighlight: "Creating a direct link between user behavior and product metrics.",
    icon: Compass,
    capabilities: ["UX Roadmapping", "User Flow Mapping", "Business Alignment"]
  },
  {
    num: "02",
    tag: "Apps",
    title: "Web And Mobile Apps",
    desc: "I design web and mobile products across B2B and B2C, using AI‑assisted research, UX flows and prototyping to move from idea to testable, production‑ready experiences faster and with less rework.",
    shortHighlight: "Transforming ideas into polished, production-ready digital products.",
    icon: MonitorSmartphone,
    capabilities: ["Interactive Prototypes", "Responsive UI/UX", "AI-Assisted Research"]
  },
  {
    num: "03",
    tag: "Design Systems",
    title: "Design Systems & UI Architecture",
    desc: "Structured design systems for web and mobile that align tokens, components and documentation, making it easier for design and engineering to deliver consistent releases at speed.",
    shortHighlight: "Building reusable standards to speed up design and development.",
    icon: Component,
    capabilities: ["Token Integration", "Modular Library", "Documentation"]
  },
  {
    num: "04",
    tag: "AI Automation",
    title: "AI Automation, Integration",
    desc: "I help B2B SaaS teams integrate AI into existing products by automating routine flows, surfacing smarter suggestions and reducing manual steps in key workflows.",
    shortHighlight: "Integrating intelligent assistants and automations into your core workflows.",
    icon: Sparkles,
    capabilities: ["Intelligent Flows", "Routine Automation", "Smart Suggestions"]
  },
  {
    num: "05",
    tag: "Consulting",
    title: "Consulting, Audit And Redesign",
    desc: "I run focused UX consulting and audits for digital products across web and mobile (B2B and B2C), surfacing where workflows and interfaces slow users down, leading targeted redesigns of critical flows and helping teams lift conversion.",
    shortHighlight: "Identifying UX friction and redesigning to optimize conversions.",
    icon: FileSearch,
    capabilities: ["Heuristic Audits", "Friction Diagnostics", "Conversion Redesign"]
  }
];


interface ServiceCardProps {
  key?: any;
  item: any;
  onClick: (e: any) => void;
  hasDragged: boolean;
}

function ServiceCard({ item, onClick, hasDragged }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex-[0_0_calc(88%+8px)] sm:flex-[0_0_80%] lg:flex-[0_0_calc((100%-24px)/2)] min-h-[314px] sm:min-h-[248px] h-[314px] sm:h-[248px] relative rounded-2xl p-[1px] cursor-pointer group select-none transition-shadow duration-500 bg-white/[0.12] overflow-hidden"
    >
      {/* Hover border effect layer - hidden on mobile to disable orange radial glow */}
      <motion.div 
        className="absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none hidden sm:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, rgba(255, 105, 0, 1), transparent)`
        }}
      />
      
      <div className="w-full h-full bg-[#0d0d0d] sm:group-hover:bg-[#080808] rounded-[15px] relative overflow-hidden transition-colors duration-500 z-10">

        {/* Hover inner glow following mouse - hidden on mobile to disable orange radial glow */}
        <motion.div 
          className="absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none hidden sm:block" 
          style={{ 
            opacity: isHovered ? 1 : 0,
            backgroundImage: useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255, 105, 0, 0.14), transparent 80%)`,
            contentVisibility: 'auto'
          } as any}
        />

        {/* Content inside the card */}
        <div className="absolute inset-0 flex flex-col p-6 sm:p-8 text-left z-10">
          {/* Top Row: Icon and Number */}
          <div className="flex items-center justify-between w-full mb-4">
            <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center transition-all duration-500 ease-out sm:group-hover:bg-[#ff6900]/10">
              <item.icon className="w-[30px] h-[30px] sm:w-6 sm:h-6 text-white opacity-80 sm:opacity-60 sm:group-hover:opacity-100 sm:group-hover:text-[#ff6900] sm:group-hover:scale-110 transition-all duration-500 ease-out stroke-[1.5]" />
            </div>
            <span className="font-sans text-[12px] font-light uppercase tracking-widest text-white/40 sm:text-white/30 sm:group-hover:text-[#ff6900] transition-colors duration-500 ease-out relative -top-2 sm:-top-4">
              {item.num}
            </span>
          </div>

          {/* Middle: Title and Description - always expanded on mobile */}
          <div className="flex-1 flex flex-col justify-end overflow-hidden">
            {/* Horizontal Divider Line that hides on hover on desktop, hidden on mobile */}
            <div className="h-[1px] w-full bg-white/[0.12] mb-4 opacity-0 sm:opacity-100 sm:group-hover:opacity-0 transition-opacity duration-500 ease-out" />

            <div className="transition-transform duration-500 ease-out">
              <h3 className="text-[20px] leading-[28px] font-dm-sans font-extrabold tracking-[-0.02em] text-[#f9f9f9] transition-transform duration-500 ease-out">
                {item.title}
              </h3>
              <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                  <p className="text-[15px] leading-[22px] text-white/60 font-light mt-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 ease-out transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grey Arrow pointing up-right in the bottom right corner */}
          <div className="absolute bottom-8 right-5 md:right-8 text-[#555555] opacity-0 sm:opacity-100 transition-all duration-400 ease-out sm:group-hover:opacity-0 sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1 pointer-events-none hidden sm:block">
            <ArrowUpRight className="w-[18px] h-[18px] stroke-[1.5]" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState<number>(5);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true);
  const [activeArrow, setActiveArrow] = useState<'prev' | 'next' | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Drag states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  const handlePrev = () => {
    if (!isTransitionEnabled) return;
    const step = isLargeScreen ? 2 : 1;
    setCurrentIndex((prev) => prev - step);
  };

  const handleNext = () => {
    if (!isTransitionEnabled) return;
    const step = isLargeScreen ? 2 : 1;
    setCurrentIndex((prev) => prev + step);
  };

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    setHasDragged(false);
    window.dispatchEvent(new CustomEvent('app-drag-start'));
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setDragOffset(deltaX);
    if (Math.abs(deltaX) > 10) {
      setHasDragged(true);
      setIsTransitionEnabled(false);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    window.dispatchEvent(new CustomEvent('app-drag-end'));
    
    const threshold = 80;
    const step = isLargeScreen ? 2 : 1;
    
    if (hasDragged) {
      if (dragOffset < -threshold) {
        // Swiped left -> next
        setCurrentIndex((prev) => prev + step);
      } else if (dragOffset > threshold) {
        // Swiped right -> prev
        setCurrentIndex((prev) => prev - step);
      }
    }
    
    setIsTransitionEnabled(true);
    setDragOffset(0);
    setTimeout(() => {
      setHasDragged(false);
    }, 50);
  };

  useEffect(() => {
    if (isLargeScreen) {
      if (currentIndex >= 14) {
        const timer = setTimeout(() => {
          setIsTransitionEnabled(false);
          setCurrentIndex((prev) => prev - 10);
        }, 500);
        return () => clearTimeout(timer);
      }
      if (currentIndex <= 4) {
        const timer = setTimeout(() => {
          setIsTransitionEnabled(false);
          setCurrentIndex((prev) => prev + 10);
        }, 500);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentIndex >= 10) {
        const timer = setTimeout(() => {
          setIsTransitionEnabled(false);
          setCurrentIndex((prev) => prev - 5);
        }, 500);
        return () => clearTimeout(timer);
      }
      if (currentIndex <= 4) {
        const timer = setTimeout(() => {
          setIsTransitionEnabled(false);
          setCurrentIndex((prev) => prev + 5);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, isLargeScreen]);

  useEffect(() => {
    if (!isTransitionEnabled && !isDragging) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitionEnabled, isDragging]);

  const extendedServices = [...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA];

  return (
    <section id="services" className="pt-[120px] md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-0 bg-transparent text-white overflow-hidden relative z-10">
      <div className="container-custom relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* Top Intro Section aligned with Case Study style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[34px] lg:gap-[80px] mb-14 md:mb-16 items-end">
            {/* Left Column: Heading (Sticky on Desktop) */}
            <div className="lg:col-span-1 lg:sticky lg:top-32 h-fit">
              <h2 className="text-[36px] md:text-[44px] lg:text-5xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2.5px] text-white leading-[40px] md:leading-[48px] lg:leading-[52px] flex flex-col relative isolate">
                <span className="inline-flex w-full relative z-20 text-white">
                  <TextReveal text="Capabilities" delay={0.2} wrapperClassName="inline-flex w-full whitespace-nowrap relative z-20 text-white" className="tracking-[-1px] md:tracking-[-2.5px] text-white" />
                </span>
                <span className="inline-flex w-full mt-[-2px] md:mt-0 relative z-[1]">
                  <TextReveal text="Built to scale." delay={0.4} wrapperClassName="text-[#ff6900] font-serif italic font-light relative whitespace-nowrap tracking-[-1px] md:tracking-[-1.5px] glow-orange-italic" className="tracking-[-1px] md:tracking-[-1.5px]" />
                </span>
              </h2>
            </div>
            
            {/* Right Column: Key Intro Details */}
            <div className="lg:col-span-2 lg:max-w-[896px] w-full">
              <motion.p 
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-[20px] leading-[28px] text-white/60 font-light"
              >
                I help teams turn complex workflows and legacy expert tools into modern, scalable products — from UX audits and concept vision to design systems ready for implementation.
              </motion.p>
            </div>
          </div>

          {/* Services Divider Bar */}
          <div className="flex items-center gap-6 mb-6 mt-14 md:mt-20 w-full">
            <EyebrowReveal 
              text="Services / Areas of impact" 
              delay={0.05} 
              wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              className="h-[1px] bg-white/[0.12] flex-grow" 
            />
          </div>

          {/* Interactive Slider of Service Cards */}
          <div className="w-full text-left">
            <div className="w-full">
              {/* Viewport container: flush on left (no hidden card peek), bleeding off-screen to the right */}
              <div 
                className="-mr-4 md:-mr-8 lg:mr-0 overflow-hidden rounded-l-2xl rounded-r-none lg:rounded-r-2xl cursor-grab active:cursor-grabbing select-none"
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMove={(e) => {
                  handleDragMove(e.clientX);
                }}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
              >
                {/* Slider track */}
                <div 
                  className={`flex gap-4 lg:gap-6 ${isTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
                  style={{ 
                    transform: isLargeScreen 
                      ? `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 12}px + ${dragOffset}px))` 
                      : isTablet
                      ? `translateX(calc(-${currentIndex * 80}% - ${currentIndex * 16}px + ${dragOffset}px))`
                      : `translateX(calc(-${currentIndex} * (88% + 8px) - ${currentIndex * 16}px + ${dragOffset}px))` 
                  }}
                >
                  {extendedServices.map((item, idx) => {
                    return (
                      <ServiceCard key={idx} item={item} hasDragged={hasDragged} onClick={(e) => {
                          if (hasDragged) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          if (!isTransitionEnabled) return;
                          setCurrentIndex(idx);
                        }} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Controls placed in the bottom left corner under the slider */}
          <div className="flex items-center gap-3 mt-6 md:mt-[40px] w-full justify-start">
            <button
              onClick={() => {
                handlePrev();
                setActiveArrow('prev');
                setTimeout(() => setActiveArrow(null), 150);
              }}
              className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                activeArrow === 'prev'
                  ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                  : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
              }`}
              aria-label="Previous service"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => {
                handleNext();
                setActiveArrow('next');
                setTimeout(() => setActiveArrow(null), 150);
              }}
              className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                activeArrow === 'next'
                  ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                  : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
              }`}
              aria-label="Next service"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

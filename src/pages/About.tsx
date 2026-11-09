import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { TextReveal, EyebrowReveal, wordReveal } from '../components/TextReveal';
import PhotoCarousel from '../components/PhotoCarousel';
import { usePageTransition } from '../context/PageTransitionContext';

const eyebrowContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

interface ClientProject {
  name: string;
  domain: string;
  highlight: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  clients?: ClientProject[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'EXADEL',
    role: 'Senior Product Designer (UI/UX Senior Designer)',
    period: '2019 — 2026',
    location: 'Remote / Enterprise Consulting',
    description:
      'Leading end-to-end UX strategy, enterprise redesigns, and cross-platform design systems for major US and global clients across data intelligence, fintech, healthcare, and SaaS platforms.',
    clients: [
      {
        name: 'Quest Software',
        domain: 'Data Intelligence & Architecture',
        highlight:
          'Led the end-to-end redesign of an enterprise data-intelligence platform for architects and data professionals. Built a comprehensive design system and component library, cutting design iteration time by ~30% and time-to-completion by ~25%.'
      },
      {
        name: 'Sun Express',
        domain: 'Travel & Booking Experience',
        highlight:
          'Led the end-to-end flight booking redesign across web and mobile with AI-assisted personalization and smart filters, reducing booking time from 5.5 to 3 minutes and raising task success rates by ~30%.'
      },
      {
        name: 'Syntellis',
        domain: 'Enterprise SaaS & Performance Management',
        highlight:
          'Led the design of a cross-platform design system for performance management across healthcare, education, and finance. Defined reusable tokenized components, reducing front-end implementation time by 35–40% and cutting UI design debt by ~50%.'
      },
      {
        name: 'Aktana',
        domain: 'Life Sciences & Healthcare',
        highlight:
          'Designed new B2B/B2C hospital web applications and streamlined navigation in complex SaaS software, cutting task completion time by 15% and reducing UI inconsistencies by 20%.'
      },
      {
        name: 'Bushnell / RCBS',
        domain: 'Mobile IoT & Technical Ballistics',
        highlight:
          'Designed cross-platform mobile apps (iOS/Android) and centralized admin dashboard for high-precision ballistic calculations, cutting calculation time by 40% and user input errors by 25%.'
      },
      {
        name: 'Internal Enterprise Products',
        domain: 'Resource Management & Corporate Tools',
        highlight:
          'Designed Resource Management System (RMS) boosting resource allocation efficiency by 25%, redesigned the corporate career portal (+25% form completion, 1.5x session duration), and created digital assessment tools.'
      }
    ]
  },
  {
    company: 'Freelance & Independent Projects',
    role: 'Product Designer',
    period: '2019 — Present',
    location: 'Remote',
    description:
      'Collaborated directly with founders and tech teams to build end-to-end digital products from 0 to 1. Key clients include Ainstein (TAG Sports radar companion mobile app & Material UI design system, cutting hardware pairing time by ~35%), Code IT (web & mobile rental booking platform), and Boyko Photography (cinematic web platform with +25% client inquiry growth).'
  },
  {
    company: 'iDEUS',
    role: 'UI/UX Designer (Junior to Middle)',
    period: 'Oct 2013 — Apr 2019',
    location: 'Kharkiv, Ukraine',
    description:
      'Over a 5-year tenure, led hands-on end-to-end product design across enterprise, MedTech, fintech, and e-commerce. Progressed from core UI execution to architecting complex CRM platforms and multi-tenant web ecosystems. Designed and shipped 100+ scalable solutions, collaborating closely with front-end developers using solid HTML/CSS knowledge to streamline delivery.'
  },
  {
    company: 'CIKLUM (Vicosoftware)',
    role: '3D Modeler & Application Tester',
    period: 'Jun 2010 — Aug 2012',
    location: 'Kharkiv, Ukraine',
    description:
      'Collaborated in a specialized architectural team creating 3D virtual constructions, 2D drafting analysis, and BIM data management for complex construction coordination and 5D cost estimations. Built foundational systems thinking and structured engineering precision.'
  }
];

export default function About() {
  const { navigateToHomeTop } = usePageTransition();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen text-white pt-24 sm:pt-24 md:pt-[128px] pb-12 sm:pb-16 md:pb-[128px] lg:pb-[128px] xl:pb-[176px] relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-10 md:mb-[96px]"
        >
          <Link 
            to="/" 
            onClick={(e) => {
              e.preventDefault();
              navigateToHomeTop();
            }}
            className="inline-flex items-center gap-2 text-[#9F9F9F] hover:text-white transition-colors group py-3 sm:py-0 pr-4 sm:pr-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 md:w-[14px] md:h-[14px] text-[#9F9F9F] group-hover:text-white transition-colors shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[12px] leading-[16px] uppercase tracking-widest font-light">Back</span>
          </Link>
        </motion.div>

        {/* Hero / Header Section */}
        <div className="max-w-5xl mb-10 sm:mb-14 md:mb-24">
          <div className="flex items-center gap-4 mb-4 sm:mb-6 md:mb-8">
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              className="w-12 h-[1px] bg-[#ff6900] shrink-0 inline-block" 
            />
            <EyebrowReveal 
              text="About Me | Story & Experience" 
              delay={0.1} 
              wrapperClassName="text-[10px] leading-[16px] font-light tracking-[0.14em] uppercase text-white/60 inline-flex flex-wrap items-baseline" 
            />
          </div>

          <h1 className="font-sans text-[26px] md:text-[36px] font-normal leading-[32px] md:leading-[44px] tracking-tight text-white max-w-5xl">
            <TextReveal 
              text="I’m Igor Yukhnin, a Berlin-based product designer with 12 years of experience. I transform complex data into intuitive Fintech, SaaS, and enterprise experiences, focusing on data visualization, scalable design systems, and business outcomes." 
              delay={0.2} 
              className="text-[26px] md:text-[36px] leading-[32px] md:leading-[44px]"
              wrapperClassName="inline-flex w-full text-[26px] md:text-[36px] leading-[32px] md:leading-[44px]" 
            />
          </h1>
        </div>

        {/* Divider (Hidden on mobile) */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
          className="hidden md:block w-full border-t border-white/[0.12] mb-16 md:mb-24" 
        />

        {/* Section 1: Story & Background */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
              <EyebrowReveal text="Background" delay={0.05} />
              <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-0.5px] text-white leading-[40px] md:leading-tight flex flex-wrap max-w-[360px] md:max-w-[380px]">
                <TextReveal text="Building things that matter" delay={0.2} wrapperClassName="inline-flex w-full" className="tracking-[-0.5px] md:tracking-[-0.5px]" />
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-6 text-[20px] leading-[28px] text-white/60 font-light"
            >
              <p>
                I'm a product designer with an architectural background and a passion for building products that solve real business problems.
              </p>
              <p>
                In 2010 I graduated from the Faculty of Architecture at O. M. Beketov National University of Urban Economy in Kharkiv and spent the next two years working as an architect, specialising in BIM technologies. While I enjoyed the structured thinking that architecture taught me, my fascination with digital products, interfaces, and web design kept growing. Eventually, that passion won, and I decided to completely change my career.
              </p>
              <p>
                In 2013, I joined a small agency as a Junior Designer, working across landing pages, mobile apps, and complex digital products for clients in the US market — an unusually broad start that shaped how I think about design today. Over the next decade, that path led me to Senior Product Designer roles at Exadel, where I've spent the last several years designing enterprise-grade SaaS, fintech, and healthcare platforms for clients including Quest Software, Syntellis, and Aktana — leading end-to-end redesigns, building design systems adopted across multiple product lines, and cutting design-to-development time by up to 40% along the way.
              </p>
              <p>
                12+ years in, my focus has narrowed to what matters most: turning ambiguous, data-heavy problems into scalable systems that move real business metrics — conversion, adoption, retention, cost-to-serve — not just interfaces that look polished.
              </p>
              <p>
                Alongside my design career, I'm currently studying leadership and management through IAMP School in Ukraine, with the goal of growing into roles where I can build strong teams, mentor designers, and shape products at a strategic level.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Divider (Hidden on mobile) */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
          className="hidden md:block w-full border-t border-white/[0.12] mb-16 md:mb-24" 
        />

        {/* Section 2: Experience / Career Journey */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 md:mb-12">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
              <EyebrowReveal text="Experience" delay={0.05} />
              <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-0.5px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                <TextReveal text="Career journey & milestones" delay={0.2} wrapperClassName="inline-flex w-full" className="tracking-[-0.5px] md:tracking-[-0.5px]" />
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ 
                    duration: 0.85, 
                    delay: 0.5 + index * 0.12, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="p-6 md:p-8 rounded-[24px] bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0c0c0e] transition-all duration-500 ease-out group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 pb-4 border-b border-white/[0.08] mb-4">
                    <div>
                      <h3 className="text-[20px] leading-[28px] font-dm-sans font-bold text-white tracking-[0px] md:tracking-[-0.5px]">
                        {exp.company}
                      </h3>
                      <p className="text-[14px] text-white/60 font-light mt-0.5">{exp.role}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[13px] leading-[18px] text-white/40 font-light block">
                        {exp.period}
                      </span>
                      <span className="text-[13px] leading-[18px] text-white/40 font-light block mt-0.5">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-[15px] leading-[22px] text-white/50 font-light">
                    {exp.description}
                  </p>

                  {exp.clients && exp.clients.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-4">
                      <EyebrowReveal 
                        text="Key Clients & Enterprise Engagements" 
                        delay={0.1} 
                        wrapperClassName="block text-[10px] leading-[10px] sm:leading-[15px] font-normal sm:font-light tracking-[0.14em] uppercase text-[#ff6900] font-sans"
                      />
                      <div className="grid grid-cols-1 gap-4 -mx-2 sm:mx-0">
                        {exp.clients.map((client, cIndex) => (
                          <div 
                            key={cIndex}
                            className="p-4 md:p-6 rounded-[16px] bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                              <h4 className="text-[20px] leading-[28px] font-dm-sans font-semibold text-[#f9f9f9] tracking-normal">
                                {client.name}
                              </h4>
                              <span className="text-[13px] text-white/40 font-light">
                                {client.domain}
                              </span>
                            </div>
                            <p className="text-[15px] leading-[22px] text-white/50 font-light">
                              {client.highlight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider (Hidden on mobile) */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
          className="hidden md:block w-full border-t border-white/[0.12] mb-16 md:mb-24" 
        />

        {/* Section 3: Outside of Work */}
        <section className="mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-[104px]">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
              <EyebrowReveal text="Beyond Design" delay={0.05} />
              <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-0.5px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                <TextReveal text="Life outside the screen" delay={0.2} wrapperClassName="inline-flex w-full" className="tracking-[-0.5px] md:tracking-[-0.5px]" />
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 text-[20px] leading-[28px] text-white/60 font-light"
            >
              <p>
                When I’m not deep in Figma, research notes, or design reviews, you’ll usually find me exploring new corners of the world with Japan and South America at the top of my list, hitting the open road on a motorcycle, seeking out active adventures, or traveling abroad just to catch a favorite band live in concert. Exploring new cultures and staying in motion is how I recharge and keep creative energy high.
              </p>
            </motion.div>
          </div>

          {/* Draggable Photo Carousel */}
          <div className="-mr-4 md:-mr-8">
            <PhotoCarousel />
          </div>
        </section>

      </div>
    </div>
  );
}


import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Send, ChevronDown, ArrowLeft, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONTACT_INFO } from '../data';
import { TextReveal, EyebrowReveal } from './TextReveal';
import { validateEmail, getDomainSuggestions } from '../utils/emailValidation';

interface FaqCard {
  title: string;
  subtitle: string;
  text: string;
}

const FAQ_CARDS: FaqCard[] = [
  {
    title: 'How do you simplify dense, data-heavy workflows?',
    subtitle: 'FINTECH & COMPLEX SAAS',
    text: 'I turn complex workflows, analytics, and dense data into clear, intuitive interfaces — helping users make decisions and execute faster with zero friction.',
  },
  {
    title: 'How do you bridge design and production code?',
    subtitle: 'ENGINEERING ALIGNMENT',
    text: 'With frontend fluency, I deliver tokenized Figma architectures, exact state edge cases, and accessible components that eliminate developer guesswork and accelerate sprint releases.',
  },
  {
    title: 'What business ROI do your product designs drive?',
    subtitle: 'MEASURABLE BUSINESS IMPACT',
    text: 'Every design decision is tied to key business levers — lifting conversion rates, cutting onboarding drop-offs, accelerating time-to-value, and reducing costly support tickets.',
  },
  {
    title: 'How do you build scalable design systems?',
    subtitle: 'DESIGN SYSTEM ARCHITECTURE',
    text: 'I architect atomic, multi-brand design systems with robust documentation, modular component libraries, and version-controlled governance that keep product teams aligned.',
  },
  {
    title: 'How do you integrate into fast-moving teams?',
    subtitle: 'AUTONOMOUS EXECUTION',
    text: 'I operate with high autonomy and zero management overhead — plugging directly into your agile workflows, communicating asynchronously, and shipping verified iterations rapidly.',
  },
  {
    title: 'How do you integrate modern AI tools into your daily product design workflow?',
    subtitle: 'AI WORKFLOW INTEGRATION',
    text: 'I actively utilize AI tools to eliminate routine tasks, generate high-precision design variations, accelerate decision-making, and continuously refine product outcomes.',
  },
];

const TOPIC_OPTIONS = [
  'A job opportunity',
  'A freelance or consulting project',
  'A potential collaboration',
  'A question',
  'Something else',
];

const ROLE_OPTIONS = [
  'Founder / Executive',
  'Head of Product / Design',
  'Product Manager',
  'Engineering Lead',
  'Recruiter / Talent Partner',
  'Other',
];

export default function Contact() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredFaqIdx, setHoveredFaqIdx] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    companyName: '',
    role: '',
    jobDescriptionLink: '',
    opportunityDetails: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.borderBoxSize?.[0]?.blockSize) {
          setContentHeight(entry.borderBoxSize[0].blockSize);
        } else {
          setContentHeight(entry.contentRect.height);
        }
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [currentStep]);

  // Confetti effect on step 7 (Success confirmation screen - bursts directly over the form)
  useEffect(() => {
    if (currentStep === 7) {
      const brandColors = ['#ff6900', '#ff851a', '#155dfc', '#3b82f6', '#ffffff'];

      const runConfetti = () => {
        const rect = formCardRef.current?.getBoundingClientRect();
        const originX = rect ? Math.max(0.05, Math.min(0.95, (rect.left + rect.width / 2) / window.innerWidth)) : 0.5;
        const originY = rect ? Math.max(0.05, Math.min(0.95, (rect.top + rect.height * 0.25) / window.innerHeight)) : 0.4;
        const leftX = rect ? Math.max(0.05, Math.min(0.95, (rect.left + rect.width * 0.2) / window.innerWidth)) : 0.3;
        const rightX = rect ? Math.max(0.05, Math.min(0.95, (rect.left + rect.width * 0.8) / window.innerWidth)) : 0.7;
        const cannonY = rect ? Math.max(0.05, Math.min(0.95, (rect.top + rect.height * 0.5) / window.innerHeight)) : 0.5;

        // Burst 1: Center celebratory burst right above the form
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { x: originX, y: originY },
          colors: brandColors,
          disableForReducedMotion: true,
          zIndex: 99999,
        });

        // Burst 2: Left cannon shooting outwards beyond the form
        setTimeout(() => {
          confetti({
            particleCount: 45,
            angle: 60,
            spread: 55,
            origin: { x: leftX, y: cannonY },
            colors: brandColors,
            disableForReducedMotion: true,
            zIndex: 99999,
          });
        }, 150);

        // Burst 3: Right cannon shooting outwards beyond the form
        setTimeout(() => {
          confetti({
            particleCount: 45,
            angle: 120,
            spread: 55,
            origin: { x: rightX, y: cannonY },
            colors: brandColors,
            disableForReducedMotion: true,
            zIndex: 99999,
          });
        }, 300);
      };

      const timer = setTimeout(runConfetti, 50);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentStep]);

  const toggleStep = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const isValidEmail = (email: string) => {
    return validateEmail(email).isValid;
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.name.trim()) return;
    if (currentStep === 2 && !formData.topic) return;
    if (currentStep === 3 && !formData.role) return;
    if (currentStep === 5 && !isValidEmail(formData.email)) {
      setEmailTouched(true);
      return;
    }
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (currentStep < 5) {
        e.preventDefault();
        handleNext();
      } else if (currentStep === 5 && isValidEmail(formData.email)) {
        e.preventDefault();
        handleNext();
      } else if (currentStep === 6) {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email) || !formData.name.trim()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      topic: formData.topic,
      role: formData.role,
      company: formData.companyName.trim() || 'Not specified',
      jobDescriptionLink: formData.jobDescriptionLink.trim() || 'Not specified',
      opportunityDetails: formData.opportunityDetails.trim() || 'Not specified',
      _subject: `Portfolio Inquiry from ${formData.name.trim()}: ${formData.topic}`,
      _replyto: formData.email.trim(),
      _template: 'table',
      _captcha: 'false',
    };

    try {
      // Initiate background HTTP request with keepalive: true so browser delivers it reliably without blocking the UI
      const sendPromise = fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        keepalive: true,
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.warn('FormSubmit background notification:', error);
      });

      // Provide natural, responsive button feedback (min 700ms, max 1200ms) - never hanging for 30 seconds
      await Promise.race([
        Promise.all([
          sendPromise,
          new Promise((resolve) => setTimeout(resolve, 700)),
        ]),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
      setCurrentStep(7);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      name: '',
      topic: '',
      companyName: '',
      role: '',
      jobDescriptionLink: '',
      opportunityDetails: '',
      email: '',
    });
  };

  return (
    <section id="contact" className="pt-[120px] md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-16 md:pb-[128px] lg:pb-[128px] xl:pb-[176px] relative z-10">
      <div className="container-custom relative">
        {/* Section Heading */}
        <div className="mb-10 md:mb-16 xl:mb-[88px]">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 md:gap-6 xl:gap-12">
            {/* Left Column: Title */}
            <div className="shrink-0">
              <h2 className="text-[36px] md:text-[44px] lg:text-5xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2.5px] text-white leading-[40px] md:leading-[48px] lg:leading-[52px] flex flex-wrap relative isolate">
                <span className="flex flex-wrap w-full relative z-20 text-white">
                  <TextReveal text="Driven By Value." delay={0.2} wrapperClassName="inline-flex w-full whitespace-nowrap relative z-20 text-white" className="tracking-[-1px] md:tracking-[-2.5px] text-white" />
                </span>
                <span className="flex flex-wrap w-full mt-[-2px] md:mt-0 relative z-[1]">
                  <TextReveal text="Proven by results." delay={0.4} wrapperClassName="text-[#ff6900] font-serif italic font-light whitespace-nowrap tracking-[-1px] md:tracking-[-1.5px] glow-orange-italic" className="tracking-[-1px] md:tracking-[-1.5px]" />
                </span>
              </h2>
            </div>

            {/* Right Column: Text Phrase */}
            <div className="text-left xl:text-right w-full xl:w-auto">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[15px] leading-[22px] font-light text-white/40 w-full max-w-full xl:max-w-[530px] xl:w-auto text-left xl:text-right"
              >
                <span className="xl:block">Helping ambitious teams</span>{' '}
                <span className="xl:block">turn complex problems into clean, simple, and high-performing products.</span>
              </motion.p>
            </div>
          </div>
        </div>

        {/* Content Grid: FAQ on top on mobile, Form below on mobile. On lg+ Form on Left & FAQ on Right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-8 xl:gap-16">
          
          {/* Left Column: Multi-Step Contact Form Card (order-2 on mobile, order-1 on lg+) */}
          <motion.div 
            ref={formCardRef}
            layout
            transition={{ layout: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } }}
            className="w-full lg:max-w-[580px] lg:w-[42%] xl:w-[580px] shrink-0 rounded-2xl p-[4px] relative overflow-hidden order-2 lg:order-1"
          >
            {/* Rotating floating gradient border */}
            <motion.div 
              animate={{ 
                rotate: (currentStep - 1) * 72,
              }}
              transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute -inset-[100%] m-auto w-[300%] h-[300%] pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, #ff6900 0deg, #ff9e42 60deg, #155dfc 180deg, #155dfc 240deg, #ff6900 360deg)',
              }}
            />

            <motion.div 
              layout
              transition={{ layout: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } }}
              className="bg-[#080808] w-full min-h-0 lg:min-h-[400px] rounded-xl px-4 md:px-8 pt-6 md:pt-10 pb-6 md:pb-10 relative z-10 flex flex-col justify-start lg:justify-between text-left overflow-hidden"
            >
              {currentStep <= 6 ? (
                <div className="flex flex-col h-auto lg:h-full justify-start lg:justify-between">
                  {/* Header: GET IN TOUCH / Contact Me - only on Step 1 */}
                  <AnimatePresence>
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <EyebrowReveal 
                          text="GET IN TOUCH" 
                          delay={0.05} 
                          wrapperClassName="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] block mb-1.5 md:mb-2 font-sans" 
                        />
                        <h3 className="text-2xl sm:text-[32px] font-dm-sans font-extrabold tracking-[-0.5px] text-[#f5f5f5] leading-[32px] sm:leading-[42px]">
                          Contact Me
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Top Stepper Indicator: Circles 1 to 5 connected - only on Steps 1 to 5 */}
                  {currentStep <= 5 && (
                    <div className="flex items-center justify-between w-full mb-5 md:mb-8 pt-1 md:pt-2">
                      {[1, 2, 3, 4, 5].map((stepNum, idx) => {
                        const isActive = currentStep === stepNum;
                        const isCompleted = currentStep > stepNum;
                        
                        return (
                          <React.Fragment key={stepNum}>
                            <motion.div 
                              animate={{
                                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : isCompleted ? '#2a2a2a' : 'rgba(255, 255, 255, 0.02)',
                                borderColor: isActive ? '#f5f5f5' : isCompleted ? 'rgba(42, 42, 42, 0)' : 'rgba(255, 255, 255, 0.25)',
                                color: isActive ? '#f5f5f5' : isCompleted ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.25)',
                                boxShadow: isActive ? '0 0 16px rgba(245,245,245,0.2)' : '0 0 0px rgba(0,0,0,0)',
                              }}
                              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                              className="w-7 h-7 md:w-8 md:h-8 rounded-full border-[1.5px] flex items-center justify-center text-xs font-medium select-none"
                            >
                              {stepNum}
                            </motion.div>
                            {idx < 4 && (
                              <div className="flex-1 mx-1 md:mx-2 h-[1px] bg-white/10 relative overflow-hidden">
                                <motion.div 
                                  initial={false}
                                  animate={{ 
                                    scaleX: isCompleted ? 1 : 0,
                                  }}
                                  style={{ transformOrigin: 'left' }}
                                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                                  className="absolute inset-0 bg-white/45"
                                />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  )}

                  {/* Step Content with Smooth Ease-in-out Stretch Animation */}
                  <motion.div 
                    animate={{ height: contentHeight ?? 'auto' }}
                    transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative overflow-hidden mb-5 md:mb-10"
                  >
                    <div ref={contentRef} className="pt-1 pb-0">
                      <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                          <motion.div
                            key="step-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full flex flex-col justify-start"
                          >
                            <h3 className="text-xl md:text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] mb-6 leading-tight">
                              How should I address you?
                            </h3>
                            <div>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onKeyDown={handleKeyDown}
                                placeholder="Your name"
                                className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg px-4 h-14 text-[#f5f5f5] placeholder-white/20 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors"
                              />
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            key="step-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full flex flex-col justify-start"
                          >
                            <h3 className="text-xl md:text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] mb-6 leading-tight">
                              What would you like to discuss?
                            </h3>
                            <div className="relative group">
                              <select
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                className={`w-full appearance-none bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg pl-4 pr-12 h-14 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors cursor-pointer ${
                                  formData.topic ? 'text-[#f5f5f5]' : 'text-white/40'
                                }`}
                              >
                                <option value="" disabled className="bg-[#161616] text-white/40">
                                  Select a topic
                                </option>
                                {TOPIC_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt} className="bg-[#161616] text-[#f5f5f5] py-2">
                                    {opt}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-white/80 transition-colors flex items-center justify-center">
                                <ChevronDown size={16} strokeWidth={1.8} />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 3 && (
                          <motion.div
                            key="step-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full flex flex-col justify-start"
                          >
                            <div className="mb-6">
                              <h3 className="text-xl md:text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] leading-tight">
                                Tell me about your company
                              </h3>
                            </div>

                            <div className="space-y-3 md:space-y-6">
                              <div>
                                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                                  <label className="block text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/60 font-sans">
                                    COMPANY NAME
                                  </label>
                                  <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] font-sans">
                                    OPTIONAL
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  value={formData.companyName}
                                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                  onKeyDown={handleKeyDown}
                                  placeholder="Acme Inc."
                                  className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg px-4 h-14 text-[#f5f5f5] placeholder-white/20 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/60 mb-1.5 md:mb-2 font-sans">
                                  YOUR ROLE
                                </label>
                                <div className="relative group">
                                  <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className={`w-full appearance-none bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg pl-4 pr-12 h-14 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors cursor-pointer ${
                                      formData.role ? 'text-[#f5f5f5]' : 'text-white/40'
                                    }`}
                                  >
                                    <option value="" disabled className="bg-[#161616] text-white/40">Select</option>
                                    {ROLE_OPTIONS.map((opt) => (
                                      <option key={opt} value={opt} className="bg-[#161616] text-[#f5f5f5] py-2">
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-white/80 transition-colors flex items-center justify-center">
                                    <ChevronDown size={16} strokeWidth={1.8} />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                                  <label className="block text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/60 font-sans">
                                    JOB DESCRIPTION LINK
                                  </label>
                                  <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] font-sans">
                                    OPTIONAL
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  value={formData.jobDescriptionLink}
                                  onChange={(e) => setFormData({ ...formData, jobDescriptionLink: e.target.value })}
                                  onKeyDown={handleKeyDown}
                                  placeholder="Paste a link here"
                                  className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg px-4 h-14 text-[#f5f5f5] placeholder-white/20 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 4 && (
                          <motion.div
                            key="step-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full flex flex-col justify-start"
                          >
                            <div className="mb-6">
                              <h3 className="text-xl md:text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] leading-tight">
                                Tell me a little about the opportunity
                              </h3>
                            </div>

                            <div>
                              <textarea
                                rows={3}
                                value={formData.opportunityDetails}
                                onChange={(e) => setFormData({ ...formData, opportunityDetails: e.target.value })}
                                placeholder="What is the role, team, location, working model, and expected timeline?"
                                className="w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#ff6900]/80 rounded-lg p-4 text-[#f5f5f5] placeholder-white/20 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors resize-none leading-relaxed block"
                              />
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 5 && (() => {
                          const emailValidation = validateEmail(formData.email);
                          const domainSuggestions = getDomainSuggestions(formData.email);

                          return (
                            <motion.div
                              key="step-5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                              className="w-full flex flex-col justify-start"
                            >
                              <h3 className="text-xl md:text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] mb-6 leading-tight">
                                Best email to reach you?
                              </h3>
                              <div>
                                <div className="relative">
                                  <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => {
                                      setFormData({ ...formData, email: e.target.value });
                                    }}
                                    onBlur={() => setEmailTouched(true)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        setEmailTouched(true);
                                        if (emailValidation.isValid) {
                                          handleNext();
                                        }
                                      }
                                    }}
                                    placeholder="name@company.com"
                                    className={`w-full bg-white/[0.04] border rounded-lg pl-4 pr-12 h-14 text-[#f5f5f5] placeholder-white/20 text-[15px] md:text-[16px] leading-[22px] md:leading-[24px] font-light outline-none transition-colors ${
                                      emailTouched && !emailValidation.isValid && formData.email.trim()
                                        ? 'border-red-500/60 focus:border-red-500'
                                        : emailValidation.isValid
                                        ? 'border-emerald-500/60 focus:border-emerald-500'
                                        : 'border-white/[0.12] focus:border-[#ff6900]/80'
                                    }`}
                                  />
                                  {emailValidation.isValid && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
                                      <Check size={18} strokeWidth={2.2} />
                                    </div>
                                  )}
                                </div>

                                {/* Smart domain autocomplete chips */}
                                {domainSuggestions.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-2 mt-4">
                                    <span className="text-[14px] text-white/40 font-sans font-light tracking-wide">Quick add:</span>
                                    {domainSuggestions.slice(0, 7).map((provider) => (
                                      <button
                                        key={provider}
                                        type="button"
                                        onClick={() => {
                                          const atIndex = formData.email.indexOf('@');
                                          const local = atIndex !== -1 ? formData.email.slice(0, atIndex) : formData.email;
                                          setFormData({ ...formData, email: `${local || 'user'}@${provider}` });
                                          setEmailTouched(true);
                                        }}
                                        className="text-[14px] font-light px-4 py-2 rounded-full bg-white/[0.06] hover:bg-[#ff6900]/20 text-white/80 hover:text-white border border-white/10 hover:border-[#ff6900]/50 transition-colors font-sans cursor-pointer leading-none"
                                      >
                                        @{provider}
                                      </button>
                                    ))}
                                  </div>
                                )}

                                {/* Typo suggestion (Did you mean?) */}
                                {emailValidation.suggestion && (
                                  <div className="mt-4 flex items-center gap-2 text-[14px] font-light text-[#ff6900]">
                                    <Sparkles size={16} strokeWidth={1.5} className="shrink-0" />
                                    <span>
                                      Did you mean{' '}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setFormData({ ...formData, email: emailValidation.suggestion! });
                                          setEmailTouched(true);
                                        }}
                                        className="underline font-light hover:text-white cursor-pointer"
                                      >
                                        {emailValidation.suggestion}
                                      </button>?
                                    </span>
                                  </div>
                                )}

                                {/* Clear error message */}
                                {emailTouched && emailValidation.error && !emailValidation.suggestion && formData.email.trim() && (
                                  <p className="mt-4 text-[14px] text-red-400 font-light flex items-center gap-2">
                                    <AlertCircle size={16} strokeWidth={1.5} className="shrink-0 text-red-400" />
                                    <span>{emailValidation.error}</span>
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })()}

                        {currentStep === 6 && (
                          <motion.div
                            key="step-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full flex flex-col justify-start"
                          >
                            <div className="mb-4 md:mb-6">
                              <h3 className="text-xl md:text-2xl font-dm-sans font-extrabold tracking-normal text-[#f5f5f5] leading-tight">
                                Review and confirm
                              </h3>
                            </div>

                            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 md:p-6 space-y-2.5 max-h-[352px] overflow-y-auto overscroll-contain pr-4 custom-scrollbar">
                              <div>
                                <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                  NAME
                                </span>
                                <p className="text-[15px] leading-[22px] font-light text-[#f5f5f5] break-words mt-1">{formData.name}</p>
                              </div>

                              <div className="w-full h-[1px] bg-white/[0.06]" />

                              <div>
                                <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                  EMAIL
                                </span>
                                <p className="text-[15px] leading-[22px] font-light text-[#f5f5f5] break-words mt-1">{formData.email}</p>
                              </div>

                              <div className="w-full h-[1px] bg-white/[0.06]" />

                              <div>
                                <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                  TOPIC
                                </span>
                                <p className="text-[15px] leading-[22px] font-light text-[#f5f5f5] break-words mt-1">{formData.topic}</p>
                              </div>

                              <div className="w-full h-[1px] bg-white/[0.06]" />

                              <div>
                                <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                  ROLE
                                </span>
                                <p className="text-[15px] leading-[22px] font-light text-[#f5f5f5] break-words mt-1">{formData.role}</p>
                              </div>

                              {formData.companyName && (
                                <>
                                  <div className="w-full h-[1px] bg-white/[0.06]" />
                                  <div>
                                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                      COMPANY
                                    </span>
                                    <p className="text-[15px] leading-[22px] font-light text-[#f5f5f5] break-words mt-1">{formData.companyName}</p>
                                  </div>
                                </>
                              )}

                              {formData.jobDescriptionLink && (
                                <>
                                  <div className="w-full h-[1px] bg-white/[0.06]" />
                                  <div>
                                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                      JOB LINK
                                    </span>
                                    <p className="text-[15px] leading-[22px] font-light text-white/70 break-all mt-1">{formData.jobDescriptionLink}</p>
                                  </div>
                                </>
                              )}

                              {formData.opportunityDetails && (
                                <>
                                  <div className="w-full h-[1px] bg-white/[0.06]" />
                                  <div>
                                    <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 block font-sans">
                                      OPPORTUNITY DETAILS
                                    </span>
                                    <p className="text-[15px] leading-[22px] font-light text-[#f5f5f5] break-words mt-1 leading-relaxed whitespace-pre-wrap">
                                      {formData.opportunityDetails}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Bottom Navigation Controls */}
                  <motion.div 
                    layout="position"
                    transition={{ layout: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } }}
                    className="flex items-center justify-between pt-5 md:pt-8 border-t border-white/[0.12] mt-0 lg:mt-auto min-h-[48px]"
                  >
                    <div className="flex items-center min-w-[80px]">
                      <AnimatePresence>
                        {currentStep > 1 && (
                          <motion.button
                            key="back-button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 group cursor-pointer py-2"
                          >
                            <ArrowLeft size={14} strokeWidth={1.8} className="text-white/60 group-hover:text-[#f5f5f5] transition-colors shrink-0" />
                            <span className="text-[12px] leading-[16px] font-light tracking-[0.14em] uppercase text-white/60 group-hover:text-[#f5f5f5] transition-colors font-sans">
                              BACK
                            </span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>

                    {currentStep < 6 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          (currentStep === 1 && !formData.name.trim()) ||
                          (currentStep === 2 && !formData.topic) ||
                          (currentStep === 3 && !formData.role) ||
                          (currentStep === 5 && !isValidEmail(formData.email))
                        }
                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0d0d0d] text-[#f5f5f5] border border-white/[0.18] px-5 h-12 rounded-full text-[14px] font-normal tracking-[0.02em] hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all cursor-pointer select-none disabled:bg-[#262626] disabled:text-[#888888] disabled:border-[#262626] disabled:opacity-100 disabled:pointer-events-none group"
                      >
                        <span>Continue</span>
                        <ArrowRight size={16} className="shrink-0" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0d0d0d] text-[#f5f5f5] border border-white/[0.18] px-5 h-12 rounded-full text-[14px] font-normal tracking-[0.02em] hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all cursor-pointer select-none disabled:bg-[#262626] disabled:text-[#888888] disabled:border-[#262626] disabled:opacity-100 disabled:pointer-events-none group"
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <Send size={16} className="shrink-0 rotate-45" />
                      </button>
                    )}
                  </motion.div>
                </div>
              ) : (
                /* Step 7: Success Confirmation Screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-6 flex flex-col items-center justify-center text-center my-auto"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff6900] via-[#ff9e42] to-[#155dfc] p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#080808] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6900]/15 to-[#155dfc]/15 pointer-events-none" />
                        <Check size={26} strokeWidth={2.5} className="text-[#ff6900] relative z-10" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-[32px] font-dm-sans font-extrabold tracking-[-0.5px] text-[#f5f5f5] mb-3 leading-[32px] sm:leading-[42px]">
                    Message sent
                  </h3>
                  
                  <p className="text-white/40 text-sm font-light max-w-sm mx-auto leading-relaxed mb-8">
                    Thanks for reaching out — I'll review your message and get back to you within 24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <a
                      href={`https://${CONTACT_INFO.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 hover:border-white/40 text-[#f5f5f5] text-sm transition-all duration-300 font-normal cursor-pointer group"
                    >
                      <span>Connect on LinkedIn</span>
                    </a>

                    <span className="text-xs uppercase tracking-widest text-white/40 font-light font-sans select-none">
                      OR
                    </span>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black hover:bg-[#ff6900] hover:text-white transition-all duration-300 font-normal text-sm cursor-pointer select-none shadow-md"
                    >
                      <span>Send new Message</span>
                    </button>
                  </div>

                  <div className="w-full h-[1px] bg-white/[0.12] mb-6" />

                  <div className="text-xs text-white/40 font-light flex items-center justify-center gap-2">
                    <span>Response within 24h</span>
                    <Plus size={10} strokeWidth={2.5} className="text-[#ff6900] shrink-0" />
                    <span>Your message stays private</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: FAQ Section (order-1 on mobile, order-2 on lg+) */}
          <div className="w-full lg:w-[54%] xl:flex-1 xl:max-w-2xl order-1 lg:order-2" id="faq" onMouseLeave={() => setHoveredFaqIdx(null)}>
            <div className="relative pt-[1px]">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-10% 0px" }}
                style={{ transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.12]"
              />
              {FAQ_CARDS.map((card, index) => {
                const isOpen = activeIdx === index;
                const isHovered = hoveredFaqIdx === index;
                const isAnyHovered = hoveredFaqIdx !== null;
                const isAnyActive = activeIdx !== null;
                const isDimmed = isAnyHovered ? !isHovered : (isAnyActive && !isOpen);

                return (
                  <div
                    key={index}
                    className="relative transition-colors duration-300 pb-[1px]"
                    onMouseEnter={() => setHoveredFaqIdx(index)}
                    onMouseLeave={() => setHoveredFaqIdx(null)}
                  >
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.6, delay: 0.1 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      style={{ transformOrigin: "left" }}
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.12]"
                    />
                    <motion.button
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.75, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => toggleStep(index)}
                      className="w-full text-left py-8 flex items-center justify-between gap-4 group focus:outline-none pointer-events-auto cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex flex-col gap-2 text-left">
                        <h4 className={`text-[20px] font-semibold tracking-normal leading-[26px] md:leading-[28px] transition-colors duration-300 ${
                          isOpen || isHovered
                            ? 'text-[#f5f5f5]' 
                            : isDimmed 
                              ? 'text-white/30' 
                              : 'text-[#f9f9f9]'
                        }`}>
                          {card.title}
                        </h4>
                      </div>

                      {/* Expand/Collapse Button */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]' 
                            : isHovered
                              ? 'border-white/30 bg-white/5 text-[#f9f9f9]'
                              : isDimmed
                                ? 'border-white/[0.08] bg-transparent text-white/20'
                                : 'border-white/[0.12] bg-transparent text-[#737373]'
                        }`}>
                          <Plus 
                            size={16} 
                            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-[135deg]' : ''}`} 
                          />
                        </div>
                      </div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pr-4 md:pr-12">
                            <p className="text-[16px] leading-[24px] text-white/60 font-light">
                              {card.text}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


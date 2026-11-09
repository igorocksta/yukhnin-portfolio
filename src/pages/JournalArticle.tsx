import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight,
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Sparkles,
  Plus,
  Heart,
  Upload
} from 'lucide-react';
import { JOURNAL_POSTS, getLocalizedJournalPost } from '../data/journal';
import { usePageTransition } from '../context/PageTransitionContext';
import { useJournalLang } from '../context/JournalLanguageContext';
import JournalLanguageSwitcher from '../components/JournalLanguageSwitcher';

const BASE_LIKES: Record<string, number> = {
  'post-1': 4,
  'post-2': 34,
  'post-3': 52,
  'post-4': 29,
  'post-5': 41,
};

export default function JournalArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateToJournal } = usePageTransition();
  const { language, t } = useJournalLang();
  const [copiedLink, setCopiedLink] = useState(false);
  const [openTakeawayIdx, setOpenTakeawayIdx] = useState<number | null>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>('/article/article%20pic2.png');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  // Find raw article by slug (also fallback to legacy slug if opened directly)
  const rawPost = JOURNAL_POSTS.find(
    (p) => p.slug === slug || p.id === slug || (slug === 'designing-for-complexity-modernizing-30-year-old-enterprise-systems' && p.id === 'post-1')
  );

  // Localized post content based on selected language
  const post = rawPost ? getLocalizedJournalPost(rawPost, language) : null;

  // Like / Applause toggle state (persisted per post)
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(4);

  useEffect(() => {
    if (!rawPost) return;
    try {
      const liked = localStorage.getItem(`journal_like_${rawPost.id}`) === 'true';
      setHasLiked(liked);
      const base = BASE_LIKES[rawPost.id] ?? 36;
      setLikeCount(base + (liked ? 1 : 0));
    } catch {
      // Ignore
    }
  }, [rawPost?.id]);

  const handleToggleLike = () => {
    if (!rawPost) return;
    const nextLiked = !hasLiked;
    const base = BASE_LIKES[rawPost.id] ?? 36;
    setHasLiked(nextLiked);
    setLikeCount(base + (nextLiked ? 1 : 0));
    try {
      if (nextLiked) {
        localStorage.setItem(`journal_like_${rawPost.id}`, 'true');
      } else {
        localStorage.removeItem(`journal_like_${rawPost.id}`);
      }
    } catch {
      // Ignore
    }
  };

  // Scroll to top immediately on mount / slug change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [slug]);

  // Update document title for SEO & bookmarking
  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Igor Yukhnin Journal`;
    }
    return () => {
      document.title = 'Igor Yukhnin — Senior Product Designer';
    };
  }, [post]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // If article not found, show elegant fallback
  if (!post) {
    return (
      <div className="min-h-screen text-white pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-dm-sans font-bold mb-4">{t.notFoundTitle}</h1>
        <p className="text-white/60 mb-8 max-w-md">
          The requested journal article could not be found or has been moved.
        </p>
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white text-black hover:bg-[#ff6900] hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>{t.notFoundCta}</span>
        </Link>
      </div>
    );
  }

  // Find next article in sequence for bottom recommendation
  const currentIndex = JOURNAL_POSTS.findIndex((p) => p.slug === slug);
  const rawNextPost = JOURNAL_POSTS[(currentIndex + 1) % JOURNAL_POSTS.length];
  const nextPost = rawNextPost ? getLocalizedJournalPost(rawNextPost, language) : null;

  return (
    <article className="min-h-screen text-white pt-24 sm:pt-24 md:pt-[128px] pb-12 sm:pb-16 md:pb-[128px] lg:pb-[128px] xl:pb-[176px] relative overflow-hidden">
      <div className="container-custom relative z-10 max-w-5xl">
        
        {/* Top Navigation Row: Back to Journal + Language Switcher (eng / ukr) placed on opposite ends */}
        <div className="mb-8 sm:mb-10 md:mb-[96px] flex items-center justify-between gap-4">
          <Link
            to="/journal"
            onClick={(e) => {
              e.preventDefault();
              navigateToJournal();
            }}
            className="inline-flex items-center gap-2 text-[#9F9F9F] hover:text-white transition-colors group py-2 pr-3 cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4 md:w-[14px] md:h-[14px] text-[#9F9F9F] group-hover:text-white transition-colors shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[12px] leading-[16px] uppercase tracking-widest font-light font-sans">
              {t.backToArticles}
            </span>
          </Link>

          {/* Language Switcher opposite back button */}
          <JournalLanguageSwitcher />
        </div>

        {/* Article Header Meta Row (Date & Reading Time) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2.5 mb-6 text-xs font-light text-white/50"
        >
          <span className="flex items-center gap-1.5 text-[13px]">
            <Calendar size={13} className="text-[#9F9F9F]" />
            {post.date}
          </span>
          <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>
          <span className="flex items-center gap-1.5 text-[13px]">
            <Clock size={13} className="text-[#9F9F9F]" />
            {post.readingTime}
          </span>
        </motion.div>

        {/* Headline: 48px / 52px on desktop */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-[48px] font-dm-sans font-extrabold text-white leading-[1.14] md:leading-[52px] tracking-[-1px] md:tracking-[-1.5px] mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Subtitle & Desktop Share button (side-by-side on desktop, mobile share is placed after tags & divider) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6">
          {post.subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] leading-[24px] sm:text-[20px] sm:leading-[28px] text-white/60 font-light max-w-4xl"
            >
              {post.subtitle}
            </motion.p>
          ) : (
            <div />
          )}

          {/* Desktop Share button: hidden on mobile, visible on sm+ */}
          <div className="hidden sm:block shrink-0 self-end pb-1 relative">
            <AnimatePresence>
              {copiedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.92 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#141416]/95 border border-white/15 text-[11px] font-sans font-medium text-white shadow-2xl backdrop-blur-md pointer-events-none z-30 flex items-center gap-1.5 select-none"
                >
                  <Check size={12} strokeWidth={2.5} className="text-[#ff6900]" />
                  <span>{t.copiedLink}</span>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#141416] border-r border-b border-white/15" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={handleCopyLink}
              className={`w-12 h-12 rounded-full border transition-all duration-300 flex items-center justify-center select-none focus:outline-none cursor-pointer backdrop-blur-sm group shrink-0 relative ${
                copiedLink
                  ? 'border-[#ff6900]/40 bg-[#ff6900]/10 text-[#ff6900]'
                  : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20'
              }`}
              aria-label="Copy article link to clipboard"
              title="Copy link"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copiedLink ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <Check size={18} strokeWidth={2.2} className="text-[#ff6900] shrink-0" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="share"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <Share2 
                      size={18} 
                      strokeWidth={1.8} 
                      className="-translate-x-[1px] text-[#9F9F9F] opacity-100 group-hover:text-white transition-all duration-300 group-hover:scale-105 shrink-0" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Divider right under subtitle */}
        <div className="w-full h-[1px] bg-white/[0.12] mb-4" />

        {/* Tags Row - directly under divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-4 sm:mb-10 md:mb-12"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] sm:text-[12px] px-2.5 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/50 font-light"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Mobile Share button - placed under tags and divider on mobile */}
        <div className="sm:hidden mb-8 self-start relative">
          <AnimatePresence>
            {copiedLink && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.92 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-11 left-6 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#141416]/95 border border-white/15 text-[11px] font-sans font-medium text-white shadow-2xl backdrop-blur-md pointer-events-none z-30 flex items-center gap-1.5 select-none"
              >
                <Check size={12} strokeWidth={2.5} className="text-[#ff6900]" />
                <span>{t.copiedLink}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#141416] border-r border-b border-white/15" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleCopyLink}
            className={`w-12 h-12 rounded-full border transition-all duration-300 flex items-center justify-center select-none focus:outline-none cursor-pointer backdrop-blur-sm group shrink-0 relative ${
              copiedLink
                ? 'border-[#ff6900]/40 bg-[#ff6900]/10 text-[#ff6900]'
                : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20'
            }`}
            aria-label="Copy article link to clipboard"
            title="Copy link"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copiedLink ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <Check size={18} strokeWidth={2.2} className="text-[#ff6900] shrink-0" />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  <Share2 
                    size={18} 
                    strokeWidth={1.8} 
                    className="-translate-x-[1px] text-[#9F9F9F] opacity-100 group-hover:text-white transition-all duration-300 group-hover:scale-105 shrink-0" 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Full-width Cover Image (16px border radius) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-white/[0.12] mb-8 sm:mb-12 md:mb-20 lg:mb-24 xl:mb-28 bg-[#0f0f12] shadow-2xl relative"
        >
          <img
            src={post.image}
            alt={post.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Main Article Body Column (full width on landscape tablet, max-w-[864px] on desktop) */}
        <div className="w-full lg:max-w-full xl:max-w-[864px] mx-auto">
          {/* Key Takeaways Heading and Accordion Box */}
          {post.content.takeaways && (
            <div className="mb-10 sm:mb-14">
              <h2 className="text-[24px] leading-[30px] sm:text-[32px] sm:leading-[38px] font-dm-sans font-bold text-white tracking-[-0.2px] sm:tracking-[-0.5px] mb-4 sm:mb-6">
                Key Takeaways
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0c0c0e]/80 backdrop-blur-md px-5 py-2 sm:px-8 sm:py-3 relative overflow-hidden shadow-2xl"
              >
                {/* Takeaway items */}
                <div className="flex flex-col divide-y divide-white/[0.08]">
                  {post.content.takeaways.map((takeaway, tIdx) => {
                    const colonIdx = typeof takeaway === 'string' ? takeaway.indexOf(':') : -1;
                    const parsed = colonIdx > 0 && colonIdx < 60
                      ? {
                          title: takeaway.slice(0, colonIdx).trim(),
                          text: takeaway.slice(colonIdx + 1).trim()
                        }
                      : { title: undefined, text: takeaway };

                    const isOpen = openTakeawayIdx === tIdx;

                    return (
                      <div 
                        key={tIdx} 
                        className="transition-colors duration-200 group"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenTakeawayIdx(isOpen ? null : tIdx)}
                          className="w-full text-left py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer select-none group focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                            {/* Number Badge 01..05 */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-[12px] font-semibold shrink-0 transition-all duration-300 ${
                              isOpen
                                ? 'bg-[#ff6900] text-white border border-[#ff6900] shadow-[0_0_12px_rgba(255,105,0,0.35)]'
                                : 'bg-[#ff6900]/12 border border-[#ff6900]/25 text-[#ff6900] group-hover:bg-[#ff6900]/20'
                            }`}>
                              0{tIdx + 1}
                            </div>
                            {/* Title */}
                            <h4 className={`text-[17px] sm:text-[18px] leading-[24px] font-dm-sans font-bold transition-colors duration-300 ${
                              isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
                            }`}>
                              {parsed.title || parsed.text}
                            </h4>
                          </div>

                          {/* Plus toggle button matching CaseStudy */}
                          <div className="shrink-0">
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isOpen
                                ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                                : 'border-white/[0.12] bg-transparent text-white/40 group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-white'
                            }`}>
                              <Plus
                                size={15}
                                className={`transform transition-transform duration-300 ${isOpen ? 'rotate-[135deg]' : ''}`}
                              />
                            </div>
                          </div>
                        </button>

                        {/* Collapsible content */}
                        <div className={`accordion-grid ${isOpen ? 'is-open' : ''}`}>
                          <div className="accordion-inner">
                            <div className={`pt-0.5 pb-4 sm:pb-5 pl-11.5 sm:pl-12 pr-4 sm:pr-12 transition-opacity duration-300 ${
                              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}>
                              <p className="text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-white/60 font-light">
                                {parsed.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}

          {/* Lead Paragraph(s) broken for readable rhythm */}
          <div className="space-y-6 mb-8 sm:mb-12">
            {Array.isArray(post.content.lead) ? (
              post.content.lead.map((para, pIdx) => (
                <motion.p
                  key={pIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + pIdx * 0.05 }}
                  className="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light"
                >
                  {para}
                </motion.p>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light"
              >
                {post.content.lead}
              </motion.p>
            )}
          </div>

          {/* Article Sections */}
          <div className="space-y-8 sm:space-y-12 text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light">
            {post.content.sections.map((section, idx) => {
              const isTargetPlaceholderSection = section.heading && (
                section.heading.toLowerCase().includes('from a page in the browser') ||
                section.heading.toLowerCase().includes('страницы в браузере') ||
                section.heading.toLowerCase().includes('сторінки в браузері')
              );

              return (
                <div key={idx} className="space-y-6">
                  {isTargetPlaceholderSection && (
                    <div className="w-full pt-2 sm:pt-4 pb-2">
                      {uploadedImage ? (
                        <figure className="w-full">
                          <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-white/[0.12] bg-[#0f0f12] relative group shadow-2xl">
                            <img
                              src={uploadedImage}
                              alt="Article illustration"
                              className="w-full h-full object-cover"
                            />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 cursor-pointer transition-opacity duration-200 text-white text-[13px] font-medium font-sans">
                              <Upload size={16} />
                              <span>{language === 'uk' ? 'Замінити зображення' : language === 'ru' ? 'Заменить изображение' : 'Replace image'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                          <figcaption className="mt-3 text-[13px] leading-[18px] text-white/40 font-light text-center select-none">
                            {language === 'uk'
                              ? 'Середовище Google AI Studio: процес збирання сторінок, адаптиву та інтерфейсу мого сайту-портфоліо'
                              : language === 'ru'
                              ? 'Среда Google AI Studio: процесс сборки страниц, адаптива и интерфейса моего сайта-портфолио'
                              : 'Google AI Studio workspace: building and refining the layouts, responsiveness, and features of this portfolio site'}
                          </figcaption>
                        </figure>
                      ) : (
                        <label className="w-full aspect-[16/9] rounded-[16px] border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#ff6900]/50 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none shadow-sm block">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/12 bg-white/[0.04] flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-[#ff6900]/50 group-hover:bg-[#ff6900]/10 transition-all duration-300 mb-3 sm:mb-4 shadow-inner">
                              <Upload size={22} strokeWidth={1.8} className="group-hover:text-[#ff6900] transition-colors" />
                            </div>
                            <span className="text-[15px] sm:text-[16px] font-sans font-medium text-white/80 group-hover:text-white transition-colors">
                              {language === 'uk' ? 'Місце для зображення (16:9)' : language === 'ru' ? 'Место для изображения (16:9)' : 'Image Placeholder (16:9)'}
                            </span>
                            <span className="text-[12px] sm:text-[13px] font-light text-white/40 mt-1 max-w-sm">
                              {language === 'uk' ? 'Натисніть або перетягніть зображення сюди' : language === 'ru' ? 'Нажмите или перетащите изображение сюда' : 'Click or drop image to upload'}
                            </span>
                          </div>
                        </label>
                      )}
                    </div>
                  )}

                  {section.heading && (
                    <h2 className={`text-[24px] leading-[30px] sm:text-[32px] sm:leading-[38px] font-dm-sans font-bold text-white tracking-[-0.2px] sm:tracking-[-0.5px] ${
                      isTargetPlaceholderSection ? 'pt-10 sm:pt-14' : 'pt-6 sm:pt-8'
                    } pb-2`}>
                      {section.heading}
                    </h2>
                  )}

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <div className="my-8 sm:my-10 pl-5 border-l-2 border-[#ff6900] py-0.5 md:py-1">
                    <p className="font-serif italic text-xl md:text-2xl text-[#ff6900] leading-relaxed tracking-normal">
                      {section.quote.replace(/^["“]|["”]$/g, '').trim()}
                    </p>
                  </div>
                )}

                {section.bulletPoints && (
                  <div className="flex flex-col gap-6 sm:gap-7 my-8 sm:my-10">
                    {section.bulletPoints.map((point, ptIdx) => {
                      const item = typeof point === 'string'
                        ? (point.includes(':') && point.indexOf(':') < 40
                            ? { title: point.slice(0, point.indexOf(':')).trim(), text: point.slice(point.indexOf(':') + 1).trim() }
                            : { title: undefined, text: point })
                        : point;

                      return (
                        <div key={ptIdx} className="flex flex-col gap-2.5 sm:gap-3 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-[8px] bg-[#ff6900]/15 flex items-center justify-center text-[#ff6900] flex-shrink-0">
                              <Plus size={15} strokeWidth={2.2} className="text-[#ff6900]" />
                            </div>
                            {item.title ? (
                              <h4 className="text-[18px] sm:text-[20px] leading-[24px] sm:leading-[26px] font-bold text-white tracking-normal">
                                {item.title}
                              </h4>
                            ) : (
                              <p className="text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] text-white/80 font-light">
                                {item.text}
                              </p>
                            )}
                          </div>
                          {item.title && item.text && (
                            <p className="text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-white/60 font-light pl-10">
                              {item.text}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          </div>

          {/* Article Footer Action Bar: Claps / Likes + Share (no top divider as requested) */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-center gap-3">
              {/* Like / Clap button */}
              <button
                type="button"
                onClick={handleToggleLike}
                className={`h-11 px-4 sm:px-5 rounded-full border transition-all duration-300 flex items-center gap-2.5 font-sans text-[13px] font-medium cursor-pointer backdrop-blur-sm select-none group active:scale-95 ${
                  hasLiked
                    ? 'border-[#ff6900]/50 bg-[#ff6900]/15 text-[#ff6900] shadow-[0_0_24px_rgba(255,105,0,0.25)]'
                    : 'border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20'
                }`}
                aria-label={hasLiked ? 'Remove like' : 'Like this article'}
              >
                <motion.div
                  animate={hasLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Heart
                    size={16}
                    className={`transition-colors duration-300 ${
                      hasLiked ? 'fill-[#ff6900] text-[#ff6900]' : 'text-white/60 group-hover:text-white'
                    }`}
                  />
                </motion.div>
                <span className="tabular-nums font-semibold">{likeCount}</span>
              </button>

              {/* Share button beside likes */}
              <div className="relative">
                <AnimatePresence>
                  {copiedLink && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.92 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#141416]/95 border border-white/15 text-[11px] font-sans font-medium text-white shadow-2xl backdrop-blur-md pointer-events-none z-30 flex items-center gap-1.5 select-none"
                    >
                      <Check size={12} strokeWidth={2.5} className="text-[#ff6900]" />
                      <span>{t.copiedLink}</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#141416] border-r border-b border-white/15" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`h-11 px-4 sm:px-5 rounded-full border transition-all duration-300 flex items-center gap-2 font-sans text-[13px] font-medium cursor-pointer backdrop-blur-sm select-none group active:scale-95 ${
                    copiedLink
                      ? 'border-[#ff6900]/40 bg-[#ff6900]/12 text-[#ff6900]'
                      : 'border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                  aria-label="Share article"
                >
                  {copiedLink ? (
                    <>
                      <Check size={15} strokeWidth={2.2} className="text-[#ff6900]" />
                      <span>{t.copiedLink}</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={15} strokeWidth={1.8} className="text-white/60 group-hover:text-white transition-colors" />
                      <span>{t.share}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-[13px] font-light text-white/50">
              {post.readingTime} · {post.date}
            </div>
          </div>

          {/* Next Article Recommendation - Exact style matching All Previous Posts on Journal page */}
          {nextPost && nextPost.slug !== slug && (
            <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-white/[0.08]">
              {/* Section Eyebrow */}
              <div className="text-[10px] leading-[16px] font-medium tracking-[0.14em] uppercase text-[#ff6900] mb-6 sm:mb-8 font-sans">
                {t.nextInJournal}
              </div>

              <Link
                to={`/journal/${nextPost.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start cursor-pointer select-none relative"
              >
                {/* Left Column: Fixed 16:9 aspect ratio matching main featured image */}
                <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#0f0f12] border border-white/[0.10] relative shadow-md self-start">
                  <img
                    src={nextPost.image}
                    alt={nextPost.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Right Column: Exactly 50% width */}
                <div className="flex flex-col justify-start w-full relative pr-0 sm:pr-14 md:pr-16">
                  {/* Circular Arrow Button at top-right of right column */}
                  <div className="hidden sm:flex absolute top-0 right-0 shrink-0">
                    <div className="w-12 h-12 rounded-full border border-white/[0.12] bg-white/[0.03] group-hover:bg-[#ff6900] group-hover:border-[#ff6900] group-hover:text-white flex items-center justify-center text-white/60 transition-all duration-300 shadow-sm">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Meta details: Date & Reading time with orange plus (8px grid spacing: md:mb-4) */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5 sm:mb-3 md:mb-4 text-xs font-light text-white/50">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#9F9F9F]" />
                      {nextPost.date}
                    </span>
                    <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#9F9F9F]" />
                      {nextPost.readingTime}
                    </span>
                  </div>

                  {/* Article Title: 24/30 text */}
                  <h4 className="text-[24px] leading-[30px] font-dm-sans font-bold text-white group-hover:text-[#ff6900] transition-colors mb-2 sm:mb-3 md:mb-4">
                    {nextPost.title}
                  </h4>

                  {/* Short Excerpt */}
                  <p className="text-[16px] leading-[24px] text-white/60 font-light max-w-2xl mb-3 sm:mb-4">
                    {nextPost.excerpt}
                  </p>

                  {/* Horizontal Divider above tags (matching Selected Works / Featured post) */}
                  <div className="w-full h-[1px] bg-white/[0.12] mb-3 sm:mb-4" />

                  {/* 1-2 Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {(nextPost.tags && nextPost.tags.length > 0 ? nextPost.tags.slice(0, 2) : [nextPost.category]).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] sm:text-[12px] px-2.5 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          )}

        </div>
      </div>
    </article>
  );
}

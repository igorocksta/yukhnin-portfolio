import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  BookOpen
} from 'lucide-react';
import { TextReveal, EyebrowReveal } from '../components/TextReveal';
import { JournalPost, getLocalizedJournalPosts } from '../data/journal';
import { usePageTransition } from '../context/PageTransitionContext';
import { useJournalLang } from '../context/JournalLanguageContext';
import JournalLanguageSwitcher from '../components/JournalLanguageSwitcher';

export default function Journal() {
  const navigate = useNavigate();
  const { navigateToHomeTop } = usePageTransition();
  const { language, t } = useJournalLang();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const openArticle = (post: JournalPost) => {
    navigate(`/journal/${post.slug}`);
  };

  // Localized articles based on selected language
  const localizedPosts = getLocalizedJournalPosts(language);
  const featuredPost = localizedPosts[0];
  const regularPosts = localizedPosts.slice(1, 3);

  const categories = ['All', ...Array.from(new Set(localizedPosts.map((p) => p.category)))];

  const filteredRegularPosts = activeFilter === 'All' 
    ? regularPosts 
    : regularPosts.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen text-white pt-24 sm:pt-24 md:pt-[128px] pb-0 relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        {/* Top Navigation Row: Back to Home + Language Switcher (eng / ukr) placed on opposite ends */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-14 sm:mb-10 md:mb-[96px] flex items-center justify-between gap-4"
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
            <span className="text-[12px] leading-[16px] uppercase tracking-widest font-light font-sans">
              {t.backHome}
            </span>
          </Link>

          {/* Language Switcher opposite back button */}
          <JournalLanguageSwitcher />
        </motion.div>

        {/* Page Header Eyebrow */}
        <motion.div 
          key={`eyebrow-${language}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="inline-flex items-center gap-3 mb-4 sm:mb-6 md:mb-8 w-fit"
        >
          <motion.span 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
            style={{ transformOrigin: "left" }}
            className="w-12 h-[1px] bg-[#ff6900] shrink-0 inline-block" 
          />
          <EyebrowReveal 
            text={t.eyebrow} 
            delay={0.12} 
            wrapperClassName="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/50 inline-flex flex-wrap items-baseline" 
          />
        </motion.div>

        {/* Page Title */}
        <motion.h1 
          key={`title-${language}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[44px] sm:text-[56px] md:text-[64px] lg:text-[64px] xl:text-[102px] font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2px] mb-4 sm:mb-8 md:mb-14 leading-[44px] sm:leading-[58px] md:leading-[68px] lg:leading-[68px] xl:leading-[96px] text-white"
        >
          <TextReveal text={t.title} delay={0.2} wrapperClassName="flex-wrap" />
        </motion.h1>

        {/* TOP FEATURED POST (Latest Article - Large & Prominent) */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 sm:mb-20 md:mb-[96px]"
          >
            {/* Top and Bottom Section Dividers (both dividers removed on mobile, visible sm+) */}
            <div className="border-0 sm:border-y border-white/[0.12] pt-6 pb-8 sm:py-12 md:py-16 lg:py-[72px] relative group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start relative z-10">
                {/* 1. Left Image Column (Equal 50% width, 16:9 ratio matching article cover) */}
                <div 
                  onClick={() => openArticle(featuredPost)}
                  className="w-full cursor-pointer overflow-hidden rounded-[16px] border border-white/[0.12] bg-[#0f0f12] aspect-[16/9] relative group/img shadow-xl self-start"
                >
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  {/* New Article Badge in top-left corner - dark opaque background for strong contrast */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0A0A0C]/90 backdrop-blur-md border border-white/20 shadow-lg select-none pointer-events-none">
                    <span className="text-[#ff6900] text-[11px] sm:text-[12px] font-normal tracking-wider">
                      {t.latestArticle}
                    </span>
                  </div>

                  {/* Subtle hover badge in corner (hidden on mobile) */}
                  <div className="hidden sm:flex absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* 2. Right Content Column (Equal 50% width) */}
                <div className="flex flex-col justify-start w-full">
                  <div>
                    {/* Meta Bar: Date + Reading Time with How I Work typographic orange plus */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                      <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-light text-white/50">
                        <Calendar size={13} className="text-[#9F9F9F]" />
                        {featuredPost.date}
                      </span>

                      <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>

                      <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-light text-white/50">
                        <Clock size={13} className="text-[#9F9F9F]" />
                        {featuredPost.readingTime}
                      </span>
                    </div>

                    {/* Headline - 30px line-height on mobile (24/30), restored original proportional leading on desktop */}
                    <h2 
                      onClick={() => openArticle(featuredPost)}
                      className="text-2xl sm:text-[30px] lg:text-[34px] xl:text-[38px] leading-[30px] sm:leading-[1.2] lg:leading-[1.18] xl:leading-[1.16] font-dm-sans font-bold mb-4 tracking-[-0.3px] sm:tracking-[-0.5px] text-white group-hover:text-[#ff6900] transition-colors cursor-pointer"
                    >
                      {featuredPost.title}
                    </h2>

                    {/* Description - 16/24 on mobile, 20/28 on desktop */}
                    <p className="text-[16px] leading-[24px] sm:text-[20px] sm:leading-[28px] text-white/60 font-light mb-4 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>

                    {/* Horizontal Divider */}
                    <div className="w-full h-[1px] bg-white/[0.12] mb-3 sm:mb-4" />

                    {/* Tag Row */}
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[12px] px-2.5 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light">
                          {featuredPost.category}
                        </span>
                        {featuredPost.tags
                          .filter((tag) => !featuredPost.category.toLowerCase().includes(tag.toLowerCase()))
                          .map((tag) => (
                            <span 
                              key={tag} 
                              className="text-[12px] px-2.5 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Action Row: Read Button (hidden on mobile, visible on desktop) */}
                    <div className="hidden sm:flex items-center pt-6 sm:pt-8 md:pt-[36px]">
                      <button
                        type="button"
                        onClick={() => openArticle(featuredPost)}
                        className="inline-flex items-center gap-2.5 bg-white text-black hover:bg-[#ff6900] hover:text-white px-7 h-13 rounded-full text-[15px] font-medium transition-colors duration-300 cursor-pointer shadow-lg active:scale-95 select-none"
                      >
                        <span>{t.readArticle}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ALL PREVIOUS POSTS SECTION - Exact grid matching About.tsx (Title on left, articles on right) */}
        <section className="mb-12 sm:mb-16 md:mb-[128px] lg:mb-[128px] xl:mb-[176px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column: Eyebrow + Sticky Headline */}
            <div key={`arch-left-${language}`} className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
              <EyebrowReveal text={t.archiveEyebrow} delay={0.05} />
              <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-0.5px] text-white leading-[40px] md:leading-tight flex flex-wrap max-w-[360px] md:max-w-[380px]">
                <TextReveal text={t.archiveTitle} delay={0.2} wrapperClassName="inline-flex w-full" className="tracking-[-0.5px] md:tracking-[-0.5px]" />
              </h2>
            </div>

            {/* Right Column: Articles list */}
            <div className="lg:col-span-8">
              {/* Category Filter Pills (hidden for now per request) */}
              <div className="hidden flex-wrap items-center gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-light tracking-wide transition-all cursor-pointer ${
                      activeFilter === cat
                        ? 'bg-white text-black font-normal shadow-sm'
                        : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* OTHER ARTICLES - Stacked in rows from newest to oldest, separated by dividers (dividers hidden on mobile) */}
              <div className="flex flex-col divide-y-0 sm:divide-y divide-white/[0.08]">
                {filteredRegularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    onClick={() => openArticle(post)}
                    className="group py-10 sm:py-8 md:py-12 first:pt-0 last:pb-0 grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-12 items-start cursor-pointer relative"
                  >
                    {/* Left Column: Fixed 16:9 aspect ratio matching main featured image */}
                    <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#0f0f12] border border-white/[0.10] relative shadow-md self-start">
                      <img
                        src={post.image}
                        alt={post.title}
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

                      {/* Meta details: Date & Reading time (8px grid spacing: md:mb-4) */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-2.5 sm:mb-3 md:mb-4 text-xs font-light text-white/50">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-[#9F9F9F]" />
                          {post.date}
                        </span>
                        <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-[#9F9F9F]" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Article Title: 24/30 text */}
                      <h4 className="text-[24px] leading-[30px] font-dm-sans font-bold text-white group-hover:text-[#ff6900] transition-colors mb-2 sm:mb-3 md:mb-4">
                        {post.title}
                      </h4>

                      {/* Short Excerpt */}
                      <p className="text-[16px] leading-[24px] text-white/60 font-light max-w-2xl mb-3 sm:mb-4">
                        {post.excerpt}
                      </p>

                      {/* Horizontal Divider above tags (matching Selected Works / Featured post) */}
                      <div className="w-full h-[1px] bg-white/[0.12] mb-3 sm:mb-4" />

                      {/* 1-2 Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {(post.tags && post.tags.length > 0 ? post.tags.slice(0, 2) : [post.category]).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] sm:text-[12px] px-2.5 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {filteredRegularPosts.length === 0 && (
                <div className="text-center py-16 text-white/40 font-light">
                  No articles found in this category.
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

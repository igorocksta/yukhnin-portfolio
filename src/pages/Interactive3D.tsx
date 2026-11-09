import React, { useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { TextReveal, BlockReveal } from '../components/TextReveal';

// Lazy-load the heavy WebGL 3D component
const NotFound3DScene = lazy(() => import('../components/NotFound3DScene'));

export default function Interactive3D() {
  useEffect(() => {
    const prevTitle = document.title;
    const pageTitle = "404 - Page Not Found | Igor Yukhnin";
    const pageDescription = "The page you are looking for doesn't exist or has been moved. Explore Igor Yukhnin's Senior UX/UI Product Designer portfolio.";
    const currentUrl = window.location.href;

    document.title = pageTitle;

    // Helper to set or update meta tags while preserving prior values for cleanup
    const setMetaTag = (attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      let originalValue: string | null = null;
      let created = false;

      if (element) {
        originalValue = element.getAttribute('content');
        element.setAttribute('content', value);
      } else {
        created = true;
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        element.setAttribute('content', value);
        document.head.appendChild(element);
      }

      return () => {
        if (created && element?.parentNode) {
          element.parentNode.removeChild(element);
        } else if (element && originalValue !== null) {
          element.setAttribute('content', originalValue);
        }
      };
    };

    const cleanups: (() => void)[] = [
      setMetaTag('name', 'description', pageDescription),
      setMetaTag('name', 'robots', 'noindex, follow'),

      // Open Graph Tags
      setMetaTag('property', 'og:type', 'website'),
      setMetaTag('property', 'og:title', pageTitle),
      setMetaTag('property', 'og:description', pageDescription),
      setMetaTag('property', 'og:url', currentUrl),
      setMetaTag('property', 'og:site_name', 'Igor Yukhnin Portfolio'),

      // Twitter / X Card Tags
      setMetaTag('property', 'twitter:card', 'summary_large_image'),
      setMetaTag('property', 'twitter:title', pageTitle),
      setMetaTag('property', 'twitter:description', pageDescription),
      setMetaTag('name', 'twitter:card', 'summary_large_image'),
      setMetaTag('name', 'twitter:title', pageTitle),
      setMetaTag('name', 'twitter:description', pageDescription),
    ];

    return () => {
      document.title = prevTitle;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#080808] flex items-center justify-center overflow-hidden">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.14]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='124' height='124' viewBox='0 0 124 124' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M62 59v6M59 62h6' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '124px 124px'
        }} 
      />
      
      {/* Main 404 Scene Container (modeled on CaseStudyCta layout) */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* 3D Scene Wrapper with Centered Foreground Overlay */}
        <div className="relative w-full h-[580px] sm:h-[660px] md:h-[720px] flex items-center justify-center overflow-visible">
          
          {/* 3D Model Scene positioned behind and filling container (Lazy Loaded with Fallback) */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 overflow-visible">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  {/* Subtle pulsing ambient glow to prevent layout shift and match 3D atmosphere */}
                  <div className="w-[320px] sm:w-[480px] h-[160px] sm:h-[240px] rounded-full bg-blue-600/[0.08] blur-3xl animate-pulse" />
                </div>
              }
            >
              <NotFound3DScene height="100%" className="w-full h-full" />
            </Suspense>
          </div>

          {/* Foreground Centered Content Overlay (Directly on top of 3D object) */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none">
            
            {/* Status Badge with Pulsing Orange Dot: 404 */}
            <BlockReveal delay={0.1} className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6900] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6900]" />
                </span>
                <span className="text-[11px] sm:text-[12px] font-normal tracking-[0.14em] uppercase text-white/70 font-dm-sans">
                  404
                </span>
              </div>
            </BlockReveal>

            {/* Main Headline: Page Not Found (Page & Found in bold DM Sans, Not in italic serif orange) */}
            <h1 className="text-[44px] sm:text-[62px] md:text-[76px] lg:text-[84px] font-dm-sans font-extrabold tracking-[-2px] leading-[48px] sm:leading-[68px] md:leading-[80px] lg:leading-[88px] text-white mb-8 sm:mb-12 flex flex-wrap items-baseline justify-center relative isolate">
              <span className="inline-flex items-baseline justify-center relative">
                <TextReveal text="Page" delay={0.2} wrapperClassName="inline-flex justify-center mr-[0.25em] relative z-20 text-white" className="text-white" />
                <TextReveal text="Not" delay={0.38} wrapperClassName="text-[#ff6900] font-serif italic font-light tracking-[-3px] mr-[0.25em] glow-orange-italic relative z-[1]" className="tracking-[-3px]" />
                <TextReveal text="Found" delay={0.52} wrapperClassName="inline-flex justify-center relative z-20 text-white" className="text-white" />
              </span>
            </h1>

            {/* CTA Button: Take Me Home */}
            <BlockReveal delay={0.7} className="pointer-events-auto">
              <Link
                to="/"
                className="inline-flex w-[232px] h-[76px] sm:h-[80px] rounded-full bg-white hover:bg-[#ff6900] text-black hover:text-white transition-colors duration-300 shadow-2xl cursor-pointer select-none items-center justify-center px-4 group shrink-0"
              >
                <span className="text-[20px] md:text-[18px] font-normal font-dm-sans whitespace-nowrap text-black group-hover:text-white transition-colors duration-300">
                  Take Me Home
                </span>
              </Link>
            </BlockReveal>

          </div>
        </div>
      </div>

      {/* Subtitle at the Very Bottom of the Page */}
      <BlockReveal delay={0.85} className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
        <p className="text-[15px] leading-[22px] text-white/40 font-dm-sans font-light text-center whitespace-nowrap">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </BlockReveal>
    </div>
  );
}


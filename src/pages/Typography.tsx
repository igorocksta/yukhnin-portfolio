import React, { useState } from 'react';
import { 
  Type, 
  Copy, 
  Check, 
  Layers, 
  Sliders, 
  Sparkles, 
  Download, 
  ExternalLink,
  Code,
  ArrowRight,
  Maximize2,
  Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FontFamilySpec {
  id: string;
  name: string;
  category: string;
  role: string;
  weights: string;
  className: string;
  fontFamilyCSS: string;
  googleFontsUrl: string;
  usageDescription: string;
  whereUsed: string[];
  sampleText: string;
  features: string;
}

const FONT_FAMILIES: FontFamilySpec[] = [
  {
    id: 'dm-sans',
    name: 'DM Sans',
    category: 'Geometric Neo-Grotesque Display',
    role: 'Primary Display & Headings',
    weights: '400 (Regular), 500 (Medium), 700 (Bold), 800 (ExtraBold)',
    className: 'font-dm-sans',
    fontFamilyCSS: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.google.com/specimen/DM+Sans',
    usageDescription: 'Carries editorial scale, confidence, and character across the entire site. Used for major hero statements, section headings, card titles, and high-impact numerical stats.',
    whereUsed: [
      'Hero Display Titles (88px / 44px)',
      'Page Headings H1 (72px / 44px)',
      'Section Titles H2 (56px / 36px)',
      'Card Titles H3 (32px / 24px)',
      'FAQ Headings H4 (20px / 18px)',
      'Metric Stats & Big Numerals'
    ],
    sampleText: 'Systems that feel alive.',
    features: 'Tight tracking (-2px to -0.5px), wide round bowls, sharp geometric terminals, exceptional punch in ExtraBold.'
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Modern Neutral Interface Sans',
    role: 'Primary UI, Body & Navigation',
    weights: '300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)',
    className: 'font-inter',
    fontFamilyCSS: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.google.com/specimen/Inter',
    usageDescription: 'Keeps product interfaces neutral, compact, and highly legible across dark surfaces. Used for all long-form body copy, descriptive subtitles, form inputs, button labels, and metadata chips.',
    whereUsed: [
      'Hero Subtitles & Leads (20px / 28px)',
      'Project Descriptions (20px / 28px)',
      'Case Study Paragraphs (15px / 24px)',
      'Form Inputs & Labels (16px / 24px)',
      'Navigation Links & CTA Buttons (14px)',
      'Category Eyebrows (10px - 11px uppercase)'
    ],
    sampleText: 'Interface copy is calm, direct and built for long-form clarity across dark surfaces.',
    features: 'Tall x-height, open apertures, micro-optimized for dense data layouts, supreme legibility at 12px–16px.'
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'High-Contrast Transitional Serif',
    role: 'Editorial Serif Accent & Highlights',
    weights: '400 (Regular), 500 (Medium), 700 (Bold), 900 (Black), Italics',
    className: 'font-playfair',
    fontFamilyCSS: "'Playfair Display', serif",
    googleFontsUrl: 'https://fonts.google.com/specimen/Playfair+Display',
    usageDescription: 'Adds elegance, warmth, and artisanal editorial contrast against modern geometric sans. Used in the Hero heading for the signature italic accent word "experiences" and case study editorial pull-outs.',
    whereUsed: [
      'Hero Headline Accent ("experiences" in italic #ff6900)',
      'Editorial Case Highlights & Accents',
      'Artisanal Brand Touchpoints'
    ],
    sampleText: 'Crafting digital experiences that endure.',
    features: 'Delicate high contrast strokes, elegant ball terminals, distinctive italic flourish that elevates brutalist layouts.'
  },
  {
    id: 'hanken',
    name: 'Hanken Grotesk',
    category: 'Precision Modern Tech Neo-Grotesque',
    role: 'Editorial Quotes & Testimonials',
    weights: '300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), Italics',
    className: 'font-hanken',
    fontFamilyCSS: "'Hanken Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.google.com/specimen/Hanken+Grotesk',
    usageDescription: 'Specialized typeface for client recommendations and executive testimonials. Delivers an authoritative editorial tone in light italics (18px–20px) without feeling traditional.',
    whereUsed: [
      'Testimonial Quote Text (18px / 26px - 20px / 28px italic light)',
      'Executive Recommendations & Pull Quotes',
      'Case Study Impact Testimonials'
    ],
    sampleText: '“Igor consistently translated complex data structures into remarkably clean, actionable systems.”',
    features: 'Clean geometric proportions, distinctive curved strokes, relaxed rhythm, designed for editorial quote hierarchy.'
  },
  {
    id: 'space-mono',
    name: 'Space Mono',
    category: 'Fixed-Width Engineering Monospace',
    role: 'Technical Specs, Coordinates & Readouts',
    weights: '400 (Regular), 700 (Bold), Italics',
    className: 'font-space-mono',
    fontFamilyCSS: "'Space Mono', monospace",
    googleFontsUrl: 'https://fonts.google.com/specimen/Space+Mono',
    usageDescription: 'Brings precision engineering character to technical data. Used for step indicators (01 / 05), estimated reading times (6 MIN READ), timeline dates (2025–2026), and Figma design token specs.',
    whereUsed: [
      'Step Counters & Progress Indicators (01 / 05)',
      'Estimated Reading Time Badge (6 MIN READ)',
      'Technical Specs: HEIGHT 52 · RADIUS 16 · GAP 08',
      'Date Ranges & Metadata Index (2026)'
    ],
    sampleText: 'SPEC // 01 / 05 · HEIGHT 52 · RADIUS 16 · GAP 08',
    features: 'Mathematical monospace rhythm, retro-futuristic mechanical glyphs, unmistakable technical credibility.'
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    category: 'Proportional Tech & Digital Display',
    role: 'Tech Accents, Metrics & Digital Badges',
    weights: '400 (Regular), 500 (Medium), 700 (Bold)',
    className: 'font-space-grotesk',
    fontFamilyCSS: "'Space Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.google.com/specimen/Space+Grotesk',
    usageDescription: 'Derived from Space Mono but proportional. Retains tech quirks while providing fluid reading. Used for modern technology badges, interactive UI controls, and digital metrics.',
    whereUsed: [
      'Modern Tech Chips & Feature Badges',
      'Digital Metric Overlays',
      'Interactive Micro-UI Accents'
    ],
    sampleText: 'NEXT-GEN ARCHITECTURE · 220+ COMPONENTS SHIPPED',
    features: 'Idiosyncratic letterforms, mechanical charm, high impact in small caps and all-caps badge styling.'
  },
  {
    id: 'archivo',
    name: 'Archivo',
    category: 'Grotesque Heavy Display & High-Density Numbers',
    role: 'Ultra-Heavy Display Numerals & Bold Badges',
    weights: '700 (Bold), 800 (ExtraBold), 900 (Black)',
    className: 'font-archivo',
    fontFamilyCSS: "'Archivo', sans-serif",
    googleFontsUrl: 'https://fonts.google.com/specimen/Archivo',
    usageDescription: 'Engineered for maximum visual weight and industrial strength. Loaded for high-density stat counters, oversized percentage callouts, and heavy condensed labels.',
    whereUsed: [
      'High-Impact Stat Figures (30-40%, 220+, 12+)',
      'Heavy Condensed Data Callouts',
      'High-Density Industrial Badges'
    ],
    sampleText: '30—40% FASTER · 220+ UI TOKENS',
    features: 'Ultra-dense black weights, tight muscular geometry, optimized for high-impact numeric contrast.'
  }
];

interface TypeScaleItem {
  token: string;
  name: string;
  font: string;
  desktopSpec: string;
  mobileSpec: string;
  weight: string;
  tracking: string;
  tailwindClass: string;
  role: string;
  sample: string;
  isEditorialAccent?: boolean;
}

const TYPE_SCALE: TypeScaleItem[] = [
  {
    token: 'H0 / DISPLAY',
    name: 'Hero Display Title',
    font: 'DM Sans (+ Playfair Serif accent)',
    desktopSpec: '88px / 80px',
    mobileSpec: '44px / 44px (md: 72px / 72px)',
    weight: 'ExtraBold 800',
    tracking: 'Desktop: -3.5px / Mobile: -0.5px',
    tailwindClass: 'text-[44px] md:text-[72px] xl:text-[88px] leading-[44px] md:leading-[72px] xl:leading-[80px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] xl:tracking-[-3.5px]',
    role: 'Main portfolio title on the homepage hero fold',
    sample: 'Systems that feel alive.'
  },
  {
    token: 'H1 / PAGE TITLE',
    name: 'Case Study & Modal H1',
    font: 'DM Sans',
    desktopSpec: '72px / 72px (Case: 102px / 96px)',
    mobileSpec: '44px / 44px',
    weight: 'ExtraBold 800',
    tracking: 'Desktop: -2px / Mobile: -0.5px',
    tailwindClass: 'text-[44px] sm:text-[60px] md:text-[76px] lg:text-[90px] xl:text-[102px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] leading-[44px] sm:leading-[58px] md:leading-[72px] lg:leading-[84px] xl:leading-[96px]',
    role: 'Primary case study page header, Contact Me title',
    sample: 'Erwin Data Modeler'
  },
  {
    token: 'H2 / SECTION',
    name: 'Section Headings',
    font: 'DM Sans',
    desktopSpec: '56px / 56px (md: 48px / 48px)',
    mobileSpec: '36px / 40px',
    weight: 'ExtraBold 800',
    tracking: 'Desktop: -2px / Mobile: -0.5px',
    tailwindClass: 'text-[36px] md:text-5xl font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] leading-[40px] md:leading-none',
    role: 'Selected Works, Testimonials, FAQ, About headings',
    sample: 'Selected Works'
  },
  {
    token: 'H3 / CARD TITLE',
    name: 'Project Card & Form H3',
    font: 'DM Sans',
    desktopSpec: '32px / 38px',
    mobileSpec: '24px / 32px',
    weight: 'Bold 700 / ExtraBold 800',
    tracking: 'Desktop: -1px / Mobile: -0.2px',
    tailwindClass: 'text-2xl sm:text-[32px] sm:leading-tight font-dm-sans font-bold tracking-[-0.2px] sm:tracking-[-1px]',
    role: 'Project titles in grid, step questions in Contact',
    sample: 'Quest Software — Data Modeler'
  },
  {
    token: 'H4 / ACCORDION',
    name: 'FAQ & Subsection H4',
    font: 'DM Sans',
    desktopSpec: '20px / 28px',
    mobileSpec: '18px / 22px',
    weight: 'SemiBold 600',
    tracking: 'Normal (0)',
    tailwindClass: 'text-[18px] md:text-[20px] font-semibold tracking-normal leading-[22px] md:leading-[28px]',
    role: 'Accordion questions, challenge card titles',
    sample: 'What is your availability for new projects?'
  },
  {
    token: 'HERO SUBTITLE',
    name: 'Hero Subtitle & Intro Lead',
    font: 'Inter',
    desktopSpec: '20px / 28px',
    mobileSpec: '20px / 28px',
    weight: 'Light 300',
    tracking: 'Normal (0)',
    tailwindClass: 'text-[20px] leading-[28px] text-white/60 font-light font-inter',
    role: 'Lead intro beneath hero title, case study subtitles',
    sample: 'Tell me what you are building, and where you want it to go.'
  },
  {
    token: 'PROJECT DESC',
    name: 'Case Study Summary Text',
    font: 'Inter',
    desktopSpec: '20px / 28px',
    mobileSpec: '20px / 28px',
    weight: 'Light 300',
    tracking: 'Normal (0)',
    tailwindClass: 'text-[20px] leading-[28px] text-white/60 font-light max-w-2xl',
    role: 'Description under project title on Home page & Case header',
    sample: '220+ components. 30–40% faster delivery.'
  },
  {
    token: 'QUOTE / TESTIMONIAL',
    name: 'Client Recommendation Text',
    font: 'Hanken Grotesk',
    desktopSpec: '20px / 28px (lg: 20px / 28px)',
    mobileSpec: '18px / 26px',
    weight: 'Light 300 Italic',
    tracking: 'Normal (0)',
    tailwindClass: 'font-hanken text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    role: 'Testimonial quote text and executive endorsements',
    sample: '“Igor brought deep systems thinking to our enterprise platform.”'
  },
  {
    token: 'BODY / LARGE',
    name: 'Lead Narrative Body',
    font: 'Inter',
    desktopSpec: '18px / 28px',
    mobileSpec: '16px / 26px',
    weight: 'Light 300 / Regular 400',
    tracking: 'Normal (0)',
    tailwindClass: 'text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-white/70 font-light',
    role: 'About page biography leads, case study challenge intros',
    sample: 'Over 12 years designing SaaS, fintech and enterprise products at scale.'
  },
  {
    token: 'BODY / DEFAULT',
    name: 'Default Narrative Body',
    font: 'Inter',
    desktopSpec: '15px / 24px',
    mobileSpec: '15px / 24px',
    weight: 'Light 300 / Regular 400',
    tracking: 'Normal (0)',
    tailwindClass: 'text-[15px] leading-[24px] text-white/80 font-light font-inter',
    role: 'Case study narrative, FAQ answer disclosures, modal body copy',
    sample: 'Established the design system first — tokens, components, patterns — before touching a single screen.'
  },
  {
    token: 'INPUT / FORM',
    name: 'Form Inputs & Interactive Fields',
    font: 'Inter',
    desktopSpec: '16px / 24px',
    mobileSpec: '16px / 24px',
    weight: 'Light 300',
    tracking: 'Normal (0)',
    tailwindClass: 'text-[16px] leading-[24px] font-light placeholder-white/20 text-[#f5f5f5]',
    role: 'Inputs, textareas, selects in Contact and Password modals',
    sample: 'Your full name or email address'
  },
  {
    token: 'BUTTON / CTA',
    name: 'Button & Action Labels',
    font: 'Inter',
    desktopSpec: '14px / 14px',
    mobileSpec: '14px / 14px',
    weight: 'Medium 500',
    tracking: '0.02em',
    tailwindClass: 'text-[14px] leading-none font-medium tracking-[0.02em]',
    role: 'Primary orange pills, Continue, Submit, Download CV buttons',
    sample: 'Get in Touch →'
  },
  {
    token: 'EYEBROW / CATEGORY',
    name: 'Section Eyebrow Badges',
    font: 'Inter / Space Mono',
    desktopSpec: '10px / 15px (sm: 11px / 16px)',
    mobileSpec: '10px / 15px',
    weight: 'Light 300 / Medium 500',
    tracking: '0.14em uppercase',
    tailwindClass: 'text-[10px] sm:text-[11px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900]',
    role: '01 / SELECTED WORKS, 02 / UI KIT, GET IN TOUCH',
    sample: '01 / SELECTED WORKS'
  },
  {
    token: 'TAG / CHIP',
    name: 'Project Category Tags',
    font: 'Inter',
    desktopSpec: '12px / 16px',
    mobileSpec: '12px / 16px',
    weight: 'Light 300',
    tracking: 'Wider uppercase',
    tailwindClass: 'text-[12px] px-2 py-0.5 sm:py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/40 font-light',
    role: 'Tags in ProjectCard: B2C MOBILE, IOS, ANDROID, DESIGN SYSTEMS',
    sample: 'DESIGN SYSTEMS'
  },
  {
    token: 'MONO SPEC',
    name: 'Technical Specs & Counters',
    font: 'Space Mono',
    desktopSpec: '11px / 15px',
    mobileSpec: '10px / 14px',
    weight: 'Regular 400',
    tracking: '0.14em monospace',
    tailwindClass: 'font-space-mono text-[10px] sm:text-[11px] leading-[15px] uppercase tracking-[0.14em] text-white/50',
    role: 'Step counter 01 / 05, reading time 6 MIN, token annotations',
    sample: 'HEIGHT 52 · RADIUS 16 · GAP 08'
  },
  {
    token: 'STAT NUMERAL',
    name: 'High-Impact Stat Callout',
    font: 'DM Sans / Archivo',
    desktopSpec: '48px - 64px / 1.0',
    mobileSpec: '36px - 44px / 1.0',
    weight: 'ExtraBold 800',
    tracking: '-1px to -2px',
    tailwindClass: 'font-dm-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight',
    role: 'Metrics in case study stats and about highlights: 30-40%, 220+',
    sample: '30 — 40%'
  }
];

export default function Typography() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'board' | 'families' | 'scale' | 'tester'>('board');
  
  // Interactive Type Tester State
  const [testText, setTestText] = useState('Systems that feel alive.');
  const [testFont, setTestFont] = useState('font-dm-sans');
  const [testSize, setTestSize] = useState(56);
  const [testLineHeight, setTestLineHeight] = useState(56);
  const [testWeight, setTestWeight] = useState('font-extrabold');
  const [testTracking, setTestTracking] = useState('-1px');
  const [testItalic, setTestItalic] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2200);
  };

  return (
    <div className="pt-28 md:pt-36 pb-32 container-custom text-white min-h-screen">
      
      {/* Top Header & Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            to="/ui-kit" 
            className="text-[10px] uppercase tracking-[0.14em] text-white/40 hover:text-[#ff6900] transition-colors font-mono"
          >
            ← BACK TO UI KIT
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#ff6900] font-mono">
            02 / DESIGN SYSTEM REFERENCE
          </span>
          <div className="h-[1px] bg-white/[0.12] flex-grow hidden sm:block" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-[40px] sm:text-[54px] md:text-[68px] leading-[44px] sm:leading-[58px] md:leading-[68px] font-dm-sans font-extrabold tracking-[-1.5px] md:tracking-[-2.5px] text-white mb-4">
              Typography & Font System
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-3xl font-light font-inter leading-relaxed">
              Полная типографическая иерархия, все 7 семейств шрифтов проекта, адаптивная сетка (Desktop & Mobile) и спецификации для синхронизации дизайн-системы с Figma.
            </p>
          </div>

          {copiedToken && (
            <div className="shrink-0 bg-[#ff6900]/10 border border-[#ff6900]/40 text-[#ff6900] text-xs font-mono px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <Check size={14} /> Copied: {copiedToken}
            </div>
          )}
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] w-fit">
          {[
            { id: 'board', label: 'Figma UI Kit Board (Visual Replica)', icon: Bookmark },
            { id: 'families', label: 'All 7 Font Families & Roles', icon: Layers },
            { id: 'scale', label: 'Full Responsive Type Scale (15 Tiers)', icon: Type },
            { id: 'tester', label: 'Interactive Live Playground', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#ff6900] text-white shadow-[0_0_16px_rgba(255,105,0,0.35)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FIGMA UI KIT BOARD (EXACT ENHANCED REPLICA OF USER'S SCREENSHOT) */}
      {/* ========================================================================= */}
      {activeTab === 'board' && (
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <p className="text-xs text-white/50 font-light">
              <span className="text-[#ff6900] font-medium font-mono mr-2">FIGMA SYNC READY:</span>
              Этот борд в точности воспроизводит структуру карточки из вашей Figma, но теперь включает <span className="text-white font-medium">все семейств шрифтов</span> и <span className="text-white font-medium">все пропущенные уровни</span> (H3, H4, Quotes, Eyebrows, Specs, Buttons).
            </p>
            <button
              onClick={() => copyToClipboard('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=DM+Sans:ital,wght@0,100..1000;1,100..1000&family=Hanken+Grotesk:ital,wght@0,300..700;1,300..700&family=Inter:ital,wght@0,300..700;1,300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@400..700&family=Space+Mono:ital,wght@0,400..700;1,400..700&display=swap', 'Google Fonts @import URL')}
              className="text-xs font-mono px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Copy size={12} /> Copy All Google Fonts URL
            </button>
          </div>

          {/* Master Figma Card Board */}
          <div className="rounded-3xl bg-[#0a0a0c] border border-white/[0.12] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

            {/* Board Header (02 / UI KIT, Typography, System Reference) */}
            <div className="border-b border-white/[0.10] pb-8 mb-10">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-white/40 mb-3">
                <span className="text-[#ff6900] font-semibold">02 / UI KIT</span>
                <span>SYSTEM REFERENCE · 2026</span>
              </div>
              <h2 className="text-[44px] md:text-[56px] leading-[48px] md:leading-[56px] font-dm-sans font-extrabold tracking-[-2px] text-white mb-3">
                Typography
              </h2>
              <p className="text-white/60 text-base md:text-lg font-light font-inter max-w-3xl leading-relaxed">
                <span className="text-white font-normal">DM Sans</span> carries editorial scale and character. <span className="text-white font-normal">Inter</span> keeps product interfaces neutral, compact and highly legible. <span className="text-[#ff6900] font-normal italic font-serif">Playfair Display</span> adds bespoke elegance. <span className="text-white font-normal italic font-hanken">Hanken Grotesk</span> powers editorial quotes. <span className="text-white font-normal font-space-mono">Space Mono</span> anchors technical specifications.
              </p>
            </div>

            {/* Scale Items */}
            <div className="space-y-12">
              
              {/* 1. H0 Display */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">H0 / 88 · 80 / EXTRABOLD</span>
                  <button 
                    onClick={() => copyToClipboard('text-[44px] md:text-[72px] xl:text-[88px] leading-[44px] md:leading-[72px] xl:leading-[80px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] xl:tracking-[-3.5px]', 'H0 Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <div className="text-[40px] sm:text-[60px] md:text-[88px] leading-[1.0] md:leading-[80px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-3.5px] text-white relative isolate">
                  <span className="relative z-20 text-white">Systems that feel </span><span className="font-serif italic font-light text-[#ff6900] tracking-[-1px] xl:tracking-[-2px] glow-orange-italic relative z-[1]">alive.</span>
                </div>
                <p className="text-xs text-white/40 font-mono">Mobile: 44px / 44px · Tablet: 72px / 72px · Desktop: 88px / 80px</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 2. H1 Heading */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">H1 / 72 · 72 / EXTRABOLD</span>
                  <button 
                    onClick={() => copyToClipboard('text-[44px] md:text-[72px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px]', 'H1 Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <div className="text-[34px] sm:text-[50px] md:text-[72px] leading-[1.0] md:leading-[72px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] text-white">
                  Contact Me
                </div>
                <p className="text-xs text-white/40 font-mono">Mobile: 44px / 44px · Desktop: 72px / 72px</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 3. H2 Heading */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">H2 / 56 · 56 / BOLD</span>
                  <button 
                    onClick={() => copyToClipboard('text-[36px] md:text-[56px] font-dm-sans font-extrabold tracking-[-0.5px] md:tracking-[-2px] leading-[40px] md:leading-[56px]', 'H2 Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <div className="text-[28px] sm:text-[40px] md:text-[56px] leading-[1.0] md:leading-[56px] font-dm-sans font-bold tracking-[-0.5px] md:tracking-[-1.5px] text-white">
                  A precise dialogue
                </div>
                <p className="text-xs text-white/40 font-mono">Mobile: 36px / 40px · Desktop: 56px / 56px</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 4. H3 Card Title (Added tier) */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">H3 / 32 · 38 / BOLD</span>
                  <button 
                    onClick={() => copyToClipboard('text-2xl sm:text-[32px] sm:leading-tight font-dm-sans font-bold tracking-[-0.2px] sm:tracking-[-1px]', 'H3 Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <div className="text-[24px] sm:text-[32px] leading-[32px] sm:leading-[38px] font-dm-sans font-bold tracking-[-0.2px] sm:tracking-[-1px] text-white">
                  Erwin Data Modeler by Quest
                </div>
                <p className="text-xs text-white/40 font-mono">Mobile: 24px / 32px · Desktop: 32px / 38px</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 5. H4 Accordion / Subtitle (Added tier) */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">H4 / 20 · 28 (MOBILE: 18 · 22) / SEMIBOLD</span>
                  <button 
                    onClick={() => copyToClipboard('text-[18px] md:text-[20px] font-semibold tracking-normal leading-[22px] md:leading-[28px]', 'H4 Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <div className="text-[18px] md:text-[20px] leading-[22px] md:leading-[28px] font-dm-sans font-semibold text-[#f5f5f5]">
                  How quickly can we start the project and what are your rates?
                </div>
                <p className="text-xs text-white/40 font-mono">Mobile: 18px / 22px · Desktop: 20px / 28px</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 6. Hero Subtitle / Lead */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">HERO SUBTITLE / 20 · 28 / LIGHT</span>
                  <button 
                    onClick={() => copyToClipboard('text-[20px] leading-[28px] text-white/60 font-light font-inter', 'Subtitle Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <p className="text-[20px] leading-[28px] font-inter font-light text-white/60 max-w-4xl">
                  Tell me what you are building, and where you want it to go.
                </p>
                <p className="text-xs text-white/40 font-mono">Mobile & Desktop: 20px / 28px · font-light</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 7. Editorial Testimonial Quote (Hanken Grotesk) */}
              <div className="space-y-3 group">
                <div className="flex justify-between items-center text-[11px] font-mono text-white/40">
                  <span className="text-[#ff6900] font-semibold uppercase">QUOTE / HANKEN GROTESK 20 · 28 / LIGHT ITALIC</span>
                  <button 
                    onClick={() => copyToClipboard('font-hanken text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] italic font-light', 'Quote Tailwind Class')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} /> Copy class
                  </button>
                </div>
                <p className="font-hanken text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] italic font-light text-white/90 max-w-4xl">
                  “Igor redesigned critical workflows that drastically sped up delivery across our engineering and product teams.”
                </p>
                <p className="text-xs text-white/40 font-mono">Font: Hanken Grotesk · Mobile: 18px / 26px · Desktop: 20px / 28px</p>
              </div>

              <div className="h-[1px] bg-white/[0.08]" />

              {/* 8. Multi-Column Bottom Row (Eyebrow, Body, Mono Spec, Tags, Buttons) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
                
                {/* Eyebrow */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block">
                    EYEBROW / INTER 10-11 MEDIUM
                  </span>
                  <span className="text-[10px] sm:text-[11px] leading-[15px] font-medium tracking-[0.14em] uppercase text-[#ff6900] block">
                    GET IN TOUCH
                  </span>
                  <p className="text-[11px] text-white/40 font-mono">Letter-spacing: 0.14em</p>
                </div>

                {/* Body Regular */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block">
                    BODY / INTER 15 REGULAR
                  </span>
                  <p className="text-[15px] leading-[24px] text-white/80 font-light font-inter">
                    Interface copy is calm, direct and built for long-form clarity across dark surfaces.
                  </p>
                  <p className="text-[11px] text-white/40 font-mono">Line-height: 24px</p>
                </div>

                {/* Mono Spec */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block">
                    MONO SPEC / SPACE MONO 11
                  </span>
                  <p className="font-space-mono text-[11px] leading-[16px] text-white/70 uppercase tracking-[0.14em]">
                    HEIGHT 52 · RADIUS 16 · GAP 08
                  </p>
                  <p className="text-[11px] text-white/40 font-mono">Fixed-width tabular digits</p>
                </div>

                {/* Tag & Chip */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block">
                    TAG / INTER 12 UPPERCASE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[12px] px-2 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/60 font-light">
                      ENTERPRISE SAAS
                    </span>
                    <span className="text-[12px] px-2 py-1 border border-white/[0.12] rounded uppercase tracking-wider text-white/60 font-light">
                      DESIGN SYSTEM
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ALL 7 FONT FAMILIES SPECIMEN CARDS */}
      {/* ========================================================================= */}
      {activeTab === 'families' && (
        <div className="space-y-12">
          <div className="border-b border-white/[0.12] pb-4">
            <h2 className="text-[28px] md:text-[34px] font-dm-sans font-bold text-white mb-1">
              7 Font Families in the Portfolio
            </h2>
            <p className="text-white/60 text-sm font-light">
              Каждый шрифт выполняет чётко закреплённую роль в дизайне: от брутальных заголовков до моноспейс-координат и изящных засечек.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {FONT_FAMILIES.map((f, idx) => (
              <div 
                key={f.id}
                className="rounded-3xl bg-[#0a0a0c] border border-white/[0.12] p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all hover:border-white/20"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-xs text-[#ff6900]">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-white">{f.name}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ff6900]/10 text-[#ff6900] border border-[#ff6900]/30 font-mono">
                          {f.role}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 font-mono mt-0.5">{f.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyToClipboard(`font-family: ${f.fontFamilyCSS};`, `${f.name} CSS`)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy size={12} /> {f.className}
                    </button>
                    <a
                      href={f.googleFontsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      title="Open Google Fonts"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Big Live Specimen */}
                <div className="py-8">
                  <div className={`${f.className} text-[32px] sm:text-[44px] md:text-[54px] leading-tight text-white mb-4`}>
                    {f.sampleText}
                  </div>

                  {/* Character pangram & charset */}
                  <div className={`${f.className} text-base sm:text-lg text-white/40 tracking-wider space-y-1`}>
                    <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                    <div>abcdefghijklmnopqrstuvwxyz</div>
                    <div className="font-mono text-sm text-white/30">0123456789 — / · % + & $ # @ → ←</div>
                  </div>
                </div>

                {/* Spec Footprint Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block mb-1">
                      Available Weights
                    </span>
                    <p className="text-white/80 font-inter">{f.weights}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block mb-1">
                      Typographic Characteristics
                    </span>
                    <p className="text-white/70 font-inter leading-relaxed">{f.features}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 block mb-1">
                      Where Used in Portfolio
                    </span>
                    <ul className="text-white/60 space-y-1">
                      {f.whereUsed.slice(0, 3).map((w) => (
                        <li key={w} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#ff6900]" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FULL RESPONSIVE TYPE SCALE MATRIX (15 TIERS) */}
      {/* ========================================================================= */}
      {activeTab === 'scale' && (
        <div className="space-y-8">
          <div className="border-b border-white/[0.12] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[28px] md:text-[34px] font-dm-sans font-bold text-white mb-1">
                Design System Scale Matrix
              </h2>
              <p className="text-white/60 text-sm font-light">
                Все 15 уровней шрифтовой иерархии с точными значениями размера шрифта, интерлиньяжа, трекинга и Tailwind-классов для Desktop и Mobile.
              </p>
            </div>
            <span className="text-xs font-mono text-[#ff6900] bg-[#ff6900]/10 px-3 py-1.5 rounded-full border border-[#ff6900]/20 self-start sm:self-auto">
              15 Active Scale Tiers
            </span>
          </div>

          <div className="space-y-4">
            {TYPE_SCALE.map((item, idx) => (
              <div 
                key={item.token}
                className="rounded-2xl bg-[#0a0a0c] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  {/* Token & Font Label */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#ff6900] bg-[#ff6900]/10 px-2.5 py-1 rounded-lg border border-[#ff6900]/25">
                      {item.token}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.name}</h3>
                    <span className="text-xs text-white/40 font-mono hidden sm:inline-block">· {item.font}</span>
                  </div>

                  {/* Desktop vs Mobile Specs Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">
                      <span className="text-white/40 mr-1">Desktop:</span> {item.desktopSpec}
                    </div>
                    <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">
                      <span className="text-white/40 mr-1">Mobile:</span> {item.mobileSpec}
                    </div>
                    <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">
                      <span className="text-white/40 mr-1">Weight:</span> {item.weight}
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.tailwindClass, `${item.name} Tailwind`)}
                      className="px-2.5 py-1 rounded bg-[#ff6900]/10 hover:bg-[#ff6900] text-[#ff6900] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copy Tailwind Classes"
                    >
                      <Copy size={11} /> Copy
                    </button>
                  </div>
                </div>

                {/* Live Sample Text */}
                <div className="py-2 overflow-x-auto">
                  <p className={item.tailwindClass}>
                    {item.sample}
                  </p>
                </div>

                {/* Meta explanation */}
                <div className="mt-3 pt-3 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/40 gap-2">
                  <span><strong className="text-white/60 font-medium">Use case:</strong> {item.role}</span>
                  <span className="font-mono text-[11px]"><strong className="text-white/60">Tracking:</strong> {item.tracking}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INTERACTIVE TYPE TESTER & PLAYGROUND */}
      {/* ========================================================================= */}
      {activeTab === 'tester' && (
        <div className="space-y-10">
          <div className="border-b border-white/[0.12] pb-4">
            <h2 className="text-[28px] md:text-[34px] font-dm-sans font-bold text-white mb-1">
              Interactive Type Tester
            </h2>
            <p className="text-white/60 text-sm font-light">
              Протестируйте любой пользовательский текст с произвольными размерами, межстрочным расстоянием, трекингом и семейством шрифта.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Controls Panel */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0a0a0c] border border-white/[0.12] space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#ff6900] block">
                TYPOGRAPHY CONTROLS
              </span>

              {/* Font Family Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 block">Font Family</label>
                <select
                  value={testFont}
                  onChange={(e) => setTestFont(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#ff6900] cursor-pointer"
                >
                  <option value="font-dm-sans" className="bg-[#141414]">DM Sans (Headings & Stats)</option>
                  <option value="font-inter" className="bg-[#141414]">Inter (UI & Body Copy)</option>
                  <option value="font-playfair" className="bg-[#141414]">Playfair Display (Serif Accent)</option>
                  <option value="font-hanken" className="bg-[#141414]">Hanken Grotesk (Testimonial Quote)</option>
                  <option value="font-space-mono" className="bg-[#141414]">Space Mono (Specs & Counters)</option>
                  <option value="font-space-grotesk" className="bg-[#141414]">Space Grotesk (Tech Badges)</option>
                  <option value="font-archivo" className="bg-[#141414]">Archivo (Heavy Display)</option>
                </select>
              </div>

              {/* Font Weight */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 block">Font Weight</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Light 300', val: 'font-light' },
                    { label: 'Regular 400', val: 'font-normal' },
                    { label: 'Medium 500', val: 'font-medium' },
                    { label: 'SemiBold 600', val: 'font-semibold' },
                    { label: 'Bold 700', val: 'font-bold' },
                    { label: 'ExtraBold 800', val: 'font-extrabold' },
                  ].map((w) => (
                    <button
                      key={w.val}
                      onClick={() => setTestWeight(w.val)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        testWeight === w.val 
                          ? 'bg-[#ff6900] text-white' 
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">Font Size:</span>
                  <span className="text-[#ff6900] font-bold">{testSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="112" 
                  value={testSize} 
                  onChange={(e) => {
                    const s = Number(e.target.value);
                    setTestSize(s);
                    setTestLineHeight(Math.round(s * 1.15));
                  }}
                  className="w-full accent-[#ff6900] cursor-pointer"
                />
              </div>

              {/* Line Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">Line Height:</span>
                  <span className="text-[#ff6900] font-bold">{testLineHeight}px</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="130" 
                  value={testLineHeight} 
                  onChange={(e) => setTestLineHeight(Number(e.target.value))}
                  className="w-full accent-[#ff6900] cursor-pointer"
                />
              </div>

              {/* Tracking / Letter Spacing */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 block">Letter Spacing (Tracking)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '-2px', val: '-2px' },
                    { label: '-1px', val: '-1px' },
                    { label: '-0.5px', val: '-0.5px' },
                    { label: '0px', val: '0px' },
                    { label: '+1px', val: '1px' },
                    { label: '+0.14em', val: '0.14em' },
                  ].map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setTestTracking(t.val)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        testTracking === t.val 
                          ? 'bg-[#ff6900] text-white' 
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Italic Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-white/70">Italic Style:</span>
                <button
                  onClick={() => setTestItalic(!testItalic)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                    testItalic ? 'bg-[#ff6900] text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {testItalic ? 'ON' : 'OFF'}
                </button>
              </div>

            </div>

            {/* Right Column: Live Interactive Canvas */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-8 rounded-2xl bg-[#0a0a0c] border border-white/[0.12] min-h-[460px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-white/40 pb-4 border-b border-white/[0.08] mb-6">
                    <span className="text-[#ff6900]">LIVE SPECIMEN CANVAS</span>
                    <span>{testSize}px / {testLineHeight}px · Tracking: {testTracking}</span>
                  </div>

                  <div 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setTestText(e.currentTarget.textContent || '')}
                    className={`${testFont} ${testWeight} ${testItalic ? 'italic' : ''} text-white outline-none focus:ring-1 focus:ring-[#ff6900]/40 rounded-lg p-2 transition-all`}
                    style={{
                      fontSize: `${testSize}px`,
                      lineHeight: `${testLineHeight}px`,
                      letterSpacing: testTracking,
                    }}
                  >
                    {testText}
                  </div>
                </div>

                {/* Generated CSS / Tailwind snippet */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="font-mono text-xs text-white/50 truncate">
                    <span className="text-white/80">CSS:</span> font-family: {testFont.replace('font-', '')}; font-size: {testSize}px; line-height: {testLineHeight}px; letter-spacing: {testTracking};
                  </div>
                  <button
                    onClick={() => copyToClipboard(`font-size: ${testSize}px; line-height: ${testLineHeight}px; letter-spacing: ${testTracking};`, 'Spec CSS')}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
                  >
                    <Copy size={13} /> Copy Spec CSS
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-white/40">
        <div>
          <span>PORTFOLIO DESIGN SYSTEM · TYPOGRAPHY TOKENS</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/ui-kit" className="hover:text-white transition-colors">
            UI Kit & States
          </Link>
          <Link to="/" className="hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </div>

    </div>
  );
}

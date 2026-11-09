
export interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  description: string;
  mobileDescription?: string;
  image: string;
  cardImage?: string;
  bannerImage?: string;
  tags: string[];
  year: string;
  hidden?: boolean;
  readingTime?: string;
  subtitle?: string;
  client?: string;
  designer?: string;
  duration?: string;
  scope?: string;
  developer?: string;
  engagement?: string;
  website?: string;
  aboutParagraphs?: string[];
  stats?: { value: string; label: string }[];
  challengeText?: string;
  challengeQuote?: string;
  challengeFollowup?: string;
  challengeCards?: {
    title: string;
    desc: string;
  }[];
  designApproachText?: string;
  solutionText?: string;
  solutionCards?: {
    title: string;
    subtitle: string;
    text: string;
    actionText?: string;
  }[];
  contributionLabel?: string;
  contributionTitle?: string;
  contributionIntro?: string;
  contributionCards?: {
    title: string;
    desc: string;
  }[];
  resultsLabel?: string;
  resultsHeading?: string;
  resultsIntro?: string;
  resultsItems?: {
    num?: string;
    badge: string;
    tag?: string;
    text: string;
    mobileText?: string;
    image?: string;
  }[];
  learnings?: {
    num: string;
    tag: string;
    text: string;
  }[];
  testimonialIds?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  content: string | string[];
  avatar: string;
  fontName?: string;
  fontCategory?: string;
  fontFamily?: string;
  fontSizeStyle?: string;
}

export const ALL_PROJECTS: Project[] = [
  {
    id: 'erwin',
    title: 'Erwin Data Modeler',
    company: '',
    role: 'Lead Product Designer',
    description: 'Modernized a 30-year-old enterprise platform with a 220+ component design system, cutting design-to-development time by 30–40%.',
    mobileDescription: '220+ components. 30–40% faster delivery.',
    image: '/Scene 8.jpg',
    cardImage: '/Scene 8-card.jpg',
    bannerImage: '/Erwin/Pics/laptop static.png',
    tags: ['Enterprise SaaS', 'Data Management', 'Design Systems'],
    year: '2025-2026',
    readingTime: '6 min',
    subtitle: 'Senior designer, from legacy UI to a 220+ component design system — cutting delivery time by 30–40%',
    client: 'Quest Software',
    designer: 'Igor Yukhnin',
    duration: '10 months',
    scope: 'Desktop · Web · Cloud (future)',
    developer: 'EXADEL',
    website: 'https://www.quest.com/erwin/',
    aboutParagraphs: [
      'Erwin Data Modeler by Quest Software — 30+ year-old enterprise platform used by data architects at Fortune 500 companies to design, document, and govern complex data structures with thousands of entities, relationships, and metadata layers.',
      'The goal: Modernize the visual language and interaction patterns — without breaking 30 years of expert workflows — no full redesign, system-first, layer by layer.',
      'Users: data architects and engineers managing logical/physical models, metadata governance, and integrations with modern data platforms.'
    ],
    stats: [
      { value: '30 — 40%', label: 'Reduction in design-to-development time' },
      { value: '220+', label: 'Scalable UI components built from scratch' },
      { value: '6', label: 'Surface types unified across the product' }
    ],
    challengeText: "Erwin Data Modeler had been the backbone of Fortune 500 data teams for over 30 years — but the interface had never kept pace with the product. Decades of accumulated UI debt had left expert users slowed down not by their data, but by the tool itself.",
    resultsItems: [
      {
        num: "One",
        badge: "30 — 40%",
        tag: "Velocity",
        text: "Faster design-to-development time — modular component library reduced implementation time for new features across teams.",
        mobileText: "Faster design-to-dev time — modular components cut implementation time for new features across teams.",
        image: "/Erwin/Slider/Erwin/slider%20erwin%2030%20%E2%80%94%2040%25.png"
      },
      {
        num: "Two",
        badge: "Reduce Cognitive Load",
        tag: "Compliance",
        text: "Accessibility baselines covering contrast, keyboard navigation, and focus states are built into every component to meet enterprise compliance out of the box.",
        mobileText: "Accessibility baselines for contrast, keyboard navigation, and focus states are built into every component for enterprise compliance.",
        image: "/Erwin/Slider/Erwin/Reduce%20Cognitive%20Load.png"
      },
      {
        num: "Three",
        badge: "Less Time Lost to UI",
        tag: "Hierarchy",
        text: "Information hierarchy improvements made complex canvas views with 500+ entities faster to navigate — reducing daily friction for expert users.",
        mobileText: "Improved hierarchy made complex canvas views with 500+ entities faster to navigate — reducing friction for expert users.",
        image: "/Erwin/Slider/Erwin/Less%20Time%20Lost%20to%20UI.png"
      },
      {
        num: "Four",
        badge: "220+",
        tag: "Registry Scale",
        text: "Components across 6 surface types — canvases, dialogs, property panels, tables, toolbars, and admin screens.",
        mobileText: "Components across 6 surface types — canvases, dialogs, property panels, tables, toolbars, and admin screens.",
        image: "/Erwin/Slider/Erwin/220.png"
      },
      {
        num: "Five",
        badge: "Built to Scale",
        tag: "Templates",
        text: "The construction kit model let engineering ship new screens independently — no design handoff required for every sprint cycle.",
        mobileText: "Construction kits let engineering ship new screens independently — no design handoff needed for every sprint.",
        image: "/Erwin/Slider/Erwin/Built%20to%20Scale.png"
      }
    ],
    solutionText: "Modernizing a platform this complex required more than redesigning screens — it required building a scalable system from the ground up. With no existing design foundation and 30 years of fragmented UI to untangle, the only viable path was system-first: establish the rules before touching a single screen.",
    solutionCards: [
      {
        title: "System Before Screens",
        subtitle: "SCALABLE",
        text: "Established the design system first — tokens, components, patterns — before touching a single screen, preventing redesign churn and giving developers a reliable foundation from day one."
      },
      {
        title: "Construction Kit Approach",
        subtitle: "MODULAR",
        text: "Built modular blocks developers could assemble into new layouts without waiting on design handoff, eliminating the bottleneck in every sprint cycle."
      },
      {
        title: "Preserving Expert Workflows",
        subtitle: "ZERO DISRUPTION",
        text: "Modernized the visual layer on top while keeping the core information architecture intact — the interface got faster, not foreign."
      },
      {
        title: "Enterprise Compliance by Default",
        subtitle: "ACCESSIBLE",
        text: "Built accessibility baselines — contrast ratios, keyboard navigation, focus states — directly into every component, so compliance was part of the system architecture from the start."
      }
    ],
    contributionLabel: "MY CONTRIBUTION",
    contributionTitle: "What I Actually Did",
    contributionIntro: "I owned the design end-to-end — from system architecture to component delivery. No existing design system, no established patterns, no handoff process. I built the foundation from scratch while shipping features in parallel with engineering.",
    contributionCards: [
      {
        title: "Design Tokens",
        desc: "Color, spacing, and typography — the single source of truth for the entire visual system across desktop and future cloud surfaces."
      },
      {
        title: "Component Library",
        desc: "220+ reusable components across 6 surface types: canvases, dialogs, property panels, tables, toolbars, and admin screens."
      },
      {
        title: "Layout Templates",
        desc: "A “construction kit” I designed for engineering — preassembled screen templates developers could use directly, without waiting on design."
      },
      {
        title: "Accessibility Baselines",
        desc: "Contrast ratios, keyboard navigation, and focus states built into every component by default — not added after the fact."
      }
    ]
  },
  {
    id: 'nexus',
    title: 'TAG Radar Mobile App',
    company: '',
    role: 'Senior UX Designer',
    description: 'Sole product designer, from brand identity to final UI — shipped across iOS, Android and Apple Watch.',
    mobileDescription: 'Designed a sports-tech app from scratch — brand to final UI.',
    image: '/TAG splash1.png',
    cardImage: '/TAG splash1-card.png',
    tags: ['B2C Mobile', 'iOS', 'Android', 'Bluetooth Technology', 'Sports App'],
    year: '2024-2025',
    readingTime: '5 min',
    client: 'Ainstein',
    designer: 'Igor Yukhnin',
    duration: '6 months',
    scope: 'iOS · Android · Apple Watch',
    engagement: 'Freelance',
    website: 'https://tagsports.ai/',
    aboutParagraphs: [
      'TAG One is a compact radar sensor that tracks athlete performance in real time, measuring speed, distance, and trajectory. While the hardware team tested an early prototype, the software didn’t exist at all. Athletes had no way to connect to it, view their data, or share results. I designed the entire mobile experience from scratch, covering logic, flows, visual system, and brand, for iOS, Android, and Apple Watch.',
      'The goal: Turn a radar sensor into a training platform athletes would actually want to use — designing the app’s logic, flows, visual system, and brand identity from zero, with no existing reference product to build on.',
      'Users: Athletes and coaches who need instant, readable performance feedback during outdoor training sessions — often in motion, in bright daylight, and between reps.'
    ],
    stats: [
      { value: '0 → 1', label: 'Full product designed from scratch — brand, UX and UI' },
      { value: '3', label: 'Platforms shipped — iOS, Android and Apple Watch' },
      { value: '10 → 6', label: 'Onboarding screens, from the client’s original concept to what shipped' }
    ],
    challengeText: "TAG Sports had a radar prototype still under active testing, but no app to make it usable. Without software, athletes couldn’t connect to it, view their data, or share results. The hardware was still evolving. The product didn’t exist at all.",
    challengeQuote: "“The hardware existed. The product didn’t.”",
    challengeFollowup: "There was no reference product to copy the experience from. No existing session logic, no established patterns, no prior app to iterate on, and no fixed hardware spec to design against. Every flow, from pairing to live training data, had to be designed from a blank page.",
    challengeCards: [
      {
        title: "Build",
        desc: "Design the entire mobile experience from zero: logic, flows, visual system, and brand, with no existing product to reference."
      },
      {
        title: "Simplify",
        desc: "Turn complex, real-time radar data into something an athlete can read in a glance, mid-session."
      },
      {
        title: "Establish",
        desc: "Define a brand identity that felt like a sports product, not a tech dashboard, before designing a single screen."
      },
      {
        title: "Adapt",
        desc: "Design the software while the hardware itself was still evolving, an early prototype the dev team was actively testing, not a fixed spec."
      }
    ],
    designApproachText: "Designing an app with no reference product meant every decision had to be validated from first principles. I started with stakeholder-led discovery to identify the highest-risk assumptions: fast connection, instant feedback, a visual identity that felt like sport, not software. Brand came before UI. The client's original logo didn't match the energy of a sports-tech product, so I rebuilt the visual identity first and used it as the foundation for every screen that followed.",
    solutionText: "Designing an app with no reference product meant every decision had to be validated from first principles. I started with stakeholder-led discovery to identify the highest-risk assumptions: fast connection, instant feedback, a visual identity that felt like sport, not software. Brand came before UI. The client's original logo didn't match the energy of a sports-tech product, so I rebuilt the visual identity first and used it as the foundation for every screen that followed.",
    solutionCards: [
      {
        title: "Brand Before UI",
        subtitle: "FOUNDATIONAL",
        text: "Rebuilt the logo and visual identity before designing a single screen. The client's original concept didn't match the energy of a sports-tech product, so the new brand became the foundation everything else was built on."
      },
      {
        title: "One Screen, Many Signals",
        subtitle: "FOCUSED",
        text: "The dashboard had to show live speed data, device status, and session controls at once, without overwhelming the athlete. A central TAG button anchored the interaction, with supporting data layered around it by priority, collapsed by default and expandable on demand."
      },
      {
        title: "Session Flow From Scratch",
        subtitle: "ORIGINAL",
        text: "There was no existing product to model the session logic on. I designed the entire flow from research to final interaction: a coach sets up a session, selects players, configures radar direction and sport type, and shares results afterward."
      },
      {
        title: "Faster Onboarding",
        subtitle: "SIMPLIFIED",
        text: "The client's initial plan packed onboarding with detailed feature explanations. I proposed a shorter alternative focused on getting athletes into their first session faster, using AI-recreated device visuals since no professional photos existed yet."
      }
    ],
    contributionLabel: "MY CONTRIBUTION",
    contributionTitle: "What I Actually Did",
    contributionIntro: "I owned the design end-to-end, from brand identity to final UI. No existing app, no design system, no reference product. I built the experience from scratch while working directly with founders, a product manager, and developers.",
    contributionCards: [
      {
        title: "Brand Identity",
        desc: "Rebuilt the logo and visual language before touching a single screen. Simplified forms, refined typography, and a dynamic identity that communicates motion, precision, and performance."
      },
      {
        title: "Core UX Flows",
        desc: "Designed session logic from scratch. A coach sets up a session, selects players, configures radar direction and sport type, and shares results afterward, with no existing product to model it on."
      },
      {
        title: "Dashboard & Live Data",
        desc: "Structured the radar UI to show live speed, device status, and session controls around a central TAG button, keeping data cleanly layered by priority."
      },
      {
        title: "Simplified Onboarding",
        desc: "Replaced a complex onboarding with a fast-track flow for athletes, recreating device visuals with AI tools from technical specs before photos existed."
      }
    ],
    resultsLabel: "IMPACT",
    resultsHeading: "Results",
    resultsIntro: "The app shipped as a complete, multi-platform training experience: not a prototype, not a concept, a live product. Every result below reflects a decision made with no existing reference to fall back on.",
    resultsItems: [
      {
        num: "One",
        badge: "0 → 1",
        tag: "Launch",
        text: "Full product delivered from concept to launch, with no existing app to build on.",
        image: "/Slider/slider/Tag_slide_1.png"
      },
      {
        num: "Two",
        badge: "3 platforms",
        tag: "Platforms",
        text: "Shipped natively across iOS, Android, and Apple Watch.",
        image: "/Slider/slider/Tag_slide_2.png"
      },
      {
        num: "Three",
        badge: "< 1 min",
        tag: "Speed",
        text: "Session setup for coaches, even with multiple configuration parameters.",
        image: "/Slider/slider/Tag_slide_4.png?v=3"
      },
      {
        num: "Four",
        badge: "Design foundations",
        tag: "Foundations",
        text: "Established the visual foundations of the TAG app through color, typography, and core UI rules, creating a consistent baseline for the interface.",
        image: "/TAG/foundation.png"
      },
      {
        num: "Five",
        badge: "Core dashboard",
        tag: "Dashboard",
        text: "The central command hub designed for all ages — intuitive for young athletes to track stats, yet effortless for coaches to manage sessions.",
        image: "/Slider/slider/Tag_slide_5.png"
      }
    ],
    learnings: [
      {
        num: "01",
        tag: "HIERARCHY",
        text: "Complexity doesn't disappear. It needs to be managed through hierarchy and progressive disclosure, not hidden or simplified away."
      },
      {
        num: "02",
        tag: "SEQUENCE",
        text: "Brand and product can't run in parallel. Brand needs to come first, or the UI loses its character."
      },
      {
        num: "03",
        tag: "ALIGNMENT",
        text: "Leading collaboration with developers and stakeholders helped align design decisions with both technical constraints and business goals."
      },
      {
        num: "04",
        tag: "FLEXIBILITY",
        text: "Designing software against a hardware target that's still evolving means building for change, not for a fixed spec."
      }
    ],
    testimonialIds: ['4']
  },
  {
    id: 'velo',
    hidden: true,
    title: 'Velo Sustainable Luxury',
    company: 'Velo Fashion',
    role: 'Design Lead',
    description: 'Creating an editorial design system and e-commerce experience highlighting supply-chain transparency and fair trade.',
    image: '/Cat 1.png',
    tags: ['E-commerce', 'Brand Identity', 'Design Systems'],
    year: '2023',
    readingTime: '3 min',
    client: 'Velo Luxury',
    designer: 'Igor Yukhnin',
    duration: '8 weeks',
    scope: 'E-commerce · Design System · Editorial Content',
    developer: 'EXADEL',
    aboutParagraphs: [
      'Velo Sustainable Luxury is an upscale, editorial e-commerce experience designed for a cutting-edge fashion label focused on radical supply-chain transparency and zero-impact manufacturing.',
      'The goal: create a high-fidelity digital storytelling platform that feels like an art piece while showing users full documentation of raw material origins, transport carbon footprint, and fair-labor credentials.',
      'Users: conscious luxury consumers looking for high-quality, sustainably vetted fashion products with bespoke details.'
    ],
    designApproachText: "Aligning sustainable values with high-end luxury required an editorial-first storytelling approach. We used elegant, high-contrast serif-inspired display typography paired with generous white space and asymmetrical visual grids. The experience was treated not just as a store, but as an interactive brand exhibition where the journey to buying feels completely intentional and bespoke.",
    solutionText: "We developed a fluid on-screen supply-chain tracker that visualizes raw material origins (such as certified farms) through coordinates and carbon footprint logs. Consumers can delve as deep as they like into transparent sustainability metrics. This detailed transparency is paired with a streamlined checkout flow, celebrating low-impact, local delivery options."
  },
];

export const PROJECTS: Project[] = ALL_PROJECTS.filter((p) => !p.hidden);

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Margarita Tiurina',
    position: 'Senior Delivery Manager | PSM II | PSK I | SAFe RTE | SAFe SASM | SAFe PO/PM',
    avatar: '/turina.jpeg',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“Ihor is an experienced UI/UX designer who creates polished interfaces and collaborates closely with development teams.',
      'We worked together on a complex project involving numerous UI screens, themes, and icon sets. He consistently delivered thoughtful, high-quality designs under tight deadlines, helping the team stay on track throughout implementation.',
      'I highly recommend Ihor for any UI-focused project. He is skilled, reliable, and a pleasure to work with.”'
    ]
  },
  {
    id: '2',
    name: 'Denis Demidenko',
    position: 'Tech Founder | Building Products, Teams & Digital Success Stories',
    avatar: '/demidenko.png',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“Igor’s contribution as a UI/UX designer at our company was invaluable. His creativity, attention to detail, and ability to translate user requirements into user-friendly designs greatly enhanced the quality of our products.”'
    ]
  },
  {
    id: '3',
    name: 'Caitlin Steel, MBA, CPA',
    position: 'CFO & Product Management leader, focused on accounting and finance automation.',
    avatar: '/caitlin.jpeg',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“I found working with Igor to be a great experience, he delivered on some really complex UX for us and every time found a solid approach that was intuitive.',
      'He made a point to understand what the problem was, how the data would flow and what kind of experience we were working to achieve. I highly recommend Igor”'
    ]
  },
  {
    id: '4',
    name: 'Joshua Berkheimer',
    position: 'Software Consultant. Bushnell | RCBS | Ainstein grp.',
    avatar: '/josh.png',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“The level of detail and strategic thinking Ihor brought to our suite of mobile and web applications was exceptional. His UX restructuring directly led to a 40% increase in core user activation within the first quarter.',
      'He collaborated beautifully with our engineering team, translating complex workflows into highly intuitive interfaces. I highly recommend Ihor as a UI/UX designer.”'
    ]
  },
  {
    id: '5',
    name: 'Joe Dunning',
    position: 'Corporate Communications, Media Relations, Sustainability, Crisis and Issues Management',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“A rare designer who truly understands technical constraints as much as user needs.',
      'Ihor designed a comprehensive design system for our enterprise SaaS platform that transformed how our engineering teams build features, and the new dashboard UI is now our strongest selling point when presenting to enterprise clients.',
      'After reviewing his latest work, we all agreed it looks far more professional than our previous design and finally represents an RCBS-quality product.”'
    ]
  },
  {
    id: '6',
    name: 'Taylor Smith',
    position: 'Product Manager at ServiceMax',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“I worked closely with Ihor on the FieldFX EAM module. He transformed complex asset management and financial workflows into intuitive interfaces.',
      'What stood out was his strategic UX approach. He validated ideas through prototypes, mapped user flows, and streamlined the experience with thoughtful animations.',
      'I highly recommend Ihor to any team looking for a designer who bridges business logic and data-driven design.”'
    ]
  },
  {
    id: '7',
    name: 'Jen Rountree',
    position: 'User Research Leader in Strata (ex. Syntellis)',
    avatar: '/jen.png',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“I had the joy of working with Igor for several critical initiatives at Syntellis. He has a strong eye for detail, design best practices, and work ethic. Igor did a great job understanding requirements while also advocating for improvements when relevant.',
      'He delivered clean, thoughtful, and thorough design artifacts. One of Igor’s strengths is his ability to jump from various projects with minimal ramp up time.',
      'His contributions were critical for the successful implementation of our reporting, healthcare, and design system projects. Igor would be a wonderful addition to any team.”'
    ]
  },
  {
    id: '8',
    name: 'Thomas Boyer, MFA, MEd',
    position: 'Systems Thinking Designer | Human-Centric | Design Leadership | Product Strategy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“Igor is a rare combination of strategic thinker and meticulous craftsman, and I would recommend him to anyone who needs elite product design support. In our life-sciences enterprise software initiative at Aktana, he stepped in as a senior designer on our SaaS platform and quickly became a trusted partner to a global product team, communicating clearly across time zones and needing almost no oversight.',
      'His deliverables consistently exceeded expectations—not just in volume, but in the level of systems thinking, interaction detail, and polish he brought to every release.”'
    ]
  },
  {
    id: '9',
    name: 'Vani Mishra',
    position: 'Director of Product Management, erwin by Quest',
    avatar: '/vani.jpg',
    fontName: 'Hanken Grotesk',
    fontCategory: 'Precision Modern Tech Neo-Grotesque',
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontSizeStyle: 'text-[18px] sm:text-[19px] lg:text-[20px] leading-[26px] lg:leading-[28px] italic font-light tracking-normal',
    content: [
      '“As the Product Leader for erwin by Quest, I am very pleased with the recent redesign. The UI/UX designer was responsible for one of our core user flows, completely overhauling its interface and components.',
      'At this stage, the refactored flow and updated components completely satisfy our product vision and UX goals. Great contribution!”'
    ]
  },
];

export const SKILLS = [
  { category: 'Design', items: ['Product Design', 'Visual UI', 'UX Research', 'Interaction Design', 'Prototyping', 'Design Systems'] },
  { category: 'Tools', items: ['Figma', 'Adobe Creative Suite', 'Principle', 'Framer', 'Webflow', 'React/Tailwind'] },
  { category: 'Strategy', items: ['Product Strategy', 'Workshop Facilitation', 'User Testing', 'Accessibility (WCAG)', 'Competitive Analysis'] },
];

export const CONTACT_INFO = {
  email: 'igorocksta@gmail.com',
  phone: '+1 (555) 000-0000',
  linkedin: 'www.linkedin.com/in/igor-yukhnin/',
  behance: 'behance.net/designer',
  location: 'Berlin (available worldwide)',
};

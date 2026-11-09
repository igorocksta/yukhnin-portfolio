export interface JournalBulletItem {
  title?: string;
  text: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  featured?: boolean;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  image: string;
  content: {
    lead: string | string[];
    sections: {
      heading?: string;
      paragraphs: string[];
      quote?: string;
      bulletPoints?: (string | JournalBulletItem)[];
    }[];
    takeaways?: string[];
  };
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'post-1',
    slug: 'i-wanted-to-build-a-website-entirely-with-ai-then-i-opened-figma',
    featured: true,
    title: 'I wanted to build a website entirely with AI. Then I opened Figma.',
    subtitle: 'How I built my portfolio, used GitHub for the first time, and discovered that some things are simply faster to do by hand.',
    excerpt: 'How I built my portfolio, used GitHub for the first time, and discovered that some things are simply faster to do by hand.',
    date: 'October 24, 2026',
    readingTime: '7 min read',
    category: 'Product Design & AI',
    tags: ['AI Tools', 'Figma', 'Portfolio', 'Product Design', 'Vercel'],
    image: '/article_o.png',
    content: {
      lead: [
        'I already had a portfolio in Notion. But I’m currently looking for my next role, and I thought a website of my own would help me present my experience more clearly. Not just show a few projects, but explain what I do and the kinds of problems I work on.',
        'It also felt like a good opportunity to try AI on a real project. I wanted to see whether I could take it all the way from an idea to a live website myself.',
        'The plan was optimistic: generate a foundation, make a few adjustments, and publish. No detailed mockups or lengthy rounds of refinement in Figma.',
        'It turned out that generating a website and finishing one are two different tasks.'
      ],
      sections: [
        {
          heading: 'Why build a website when I already had Notion?',
          paragraphs: [
            'I’m a product designer with 12 years of experience in IT, including five in product design. Most of my work focuses on SaaS products and complex interfaces, alongside websites and mobile apps.',
            'Notion gave people a place to look at my work, but over the years, the structure of my portfolio had changed, and some of the older projects no longer felt as compelling in the way they were presented. I wanted to create a consistent structure for the website — one that would make my experience easier to understand and give me a clear format for adding future projects, so they would feel like parts of the same portfolio rather than separate case studies created at different times.',
            'A website also offered more freedom. I could change the structure, add articles, and experiment with how I presented projects. I created a logo and chose a visual style, too. Nothing as elaborate as a full branding exercise — just enough to give the site a look of its own.',
            'But what interested me most was the chance to take it through to launch myself. Previously, I would have needed developers to turn the design into a working website. This time, I wanted to try figuring it out on my own.'
          ],
          quote: 'Previously, I would have needed developers to turn the design into a working website. Before this project, I’d never even worked in GitHub.'
        },
        {
          heading: 'Claude wasn’t the right fit for me',
          paragraphs: [
            'I kept hearing about Claude Code in professional circles and on social media. Starting with Claude seemed like a reasonable choice.',
            'But for my project, the results felt too generic. I kept getting versions that looked recognisably AI-generated, while the idea I had in mind was much harder to recognise.',
            'I tried refining the requirements and asking for changes. The results were still a long way from what I wanted.',
            'I also missed being able to select a specific element and edit it directly. In the setup I was using, every adjustment had to be described in a prompt first. Then I had to check whether it had been understood correctly.',
            'That didn’t suit the way I work, so I decided to try another tool.'
          ]
        },
        {
          heading: 'Why I stayed with Google AI Studio',
          paragraphs: [
            'I came across a social media post showing someone building a decent landing page in Google AI Studio with Gemini in just three prompts. To me, it looked noticeably better than what I’d been getting from Claude’s Sonnet models.',
            'At the time, there was also a one-month free subscription offer for new users. I decided to give it a try.',
            'In Google AI Studio, I started getting a foundation I actually wanted to develop further. That was the main reason I stayed. I used ChatGPT alongside it for research and exploring ideas.',
            'Gradually, I found more approaches and details I wanted to try. I spent less time thinking about finishing quickly and more time thinking about how the site should look.',
            'At some point, it stopped being a test of what AI could do. I was building my portfolio, and I was going to send people to it. I no longer wanted to leave things I wasn’t happy with.'
          ],
          quote: 'At some point, it stopped being a test of what AI could do. I was building my portfolio, and I was going to send people to it.'
        },
        {
          heading: 'How many times can you explain the same change?',
          paragraphs: [
            'Some changes worked straight away. I described the task, checked the result, and moved on. Others turned into long conversations.',
            'I gave the AI rules, explained principles, and clarified constraints. I expected later generations to follow them. But sometimes it fell back on familiar patterns, lost track of requirements, or changed things I hadn’t asked it to change.',
            'I had to explain, check, and correct it again.',
            'The most frustrating situations were the ones where I already knew exactly what I wanted. I didn’t need another idea. I needed a specific change implemented.',
            'But instead of making that change, I kept looking for a better way to describe it. That used up time and tokens. And another generation didn’t necessarily bring me any closer.'
          ],
          quote: 'Eventually, I opened Figma.'
        },
        {
          heading: 'When it’s easier to do it yourself',
          paragraphs: [
            'I realised I was spending too much time explaining simple adjustments. Move an element, make it smaller, change its colour: in Figma, these things take seconds. Through chat, I had to describe the change, wait for the result, and check whether it matched what I meant.',
            'Using plugins, including HTML to Design, I brought the current version of the site and its components onto the Figma canvas.',
            'Then I could make those adjustments in a familiar way. I moved elements, changed sizes and colours, and sent screenshots back to Google AI Studio for implementation.',
            'I didn’t need to redesign the entire website. For these changes, working directly was simply faster and more precise than another round of prompts.',
            'The workflow eventually settled into three parts:'
          ],
          bulletPoints: [
            {
              title: 'ChatGPT',
              text: 'for research and exploring ideas.'
            },
            {
              title: 'Google AI Studio',
              text: 'for building the site and implementing changes.'
            },
            {
              title: 'Figma',
              text: 'for direct visual adjustments when prompts weren’t enough.'
            }
          ]
        },
        {
          paragraphs: [
            'At that point, I dropped the idea of doing everything entirely with AI. It had been an interesting constraint for an experiment, but it was getting in the way of finishing the website.'
          ]
        },
        {
          heading: 'From a page in the browser to a website I could use',
          paragraphs: [
            'I wanted to get the project to a point where I could send the link to recruiters and potential clients, show my work, and get feedback.',
            'Google AI Studio helped with more than implementation. I asked how to add features, what I would need, and which steps to take. I figured things out as I went.',
            'That’s how I worked through the mobile, tablet, and desktop layouts, added a contact form and call booking, connected Google Analytics, and set up SEO.',
            'Then I connected the project to GitHub, deployed it through Vercel, and attached a domain I’d purchased separately.',
            'Much of this was new to me. Previously, I could discuss with a developer what should happen on a website. Now I was trying to work out how to make it happen myself.'
          ]
        },
        {
          heading: 'What I can check myself',
          paragraphs: [
            'I review the visual design, interface behaviour, and main user journeys myself. That’s where I can rely on my experience: walk through the site, notice friction, and compare the result with the original intent.',
            'Code is a different matter. I don’t carry out a full code review because I don’t yet have the technical knowledge to assess the implementation confidently. I can open the editor, but that doesn’t mean I understand everything in it.',
            'For technical checks, I currently rely on AI. Before release, I also ask it to check the project for potential security issues.',
            'I don’t treat that as a guarantee. AI can miss an error, and I might not recognise it either. For more complex tasks, I understand the need to involve a technical specialist.'
          ],
          quote: 'This experience helped me understand more of the technical side. It didn’t replace a developer’s expertise.'
        },
        {
          heading: 'How I would approach it now',
          paragraphs: [
            'If I were starting again, I wouldn’t try to do everything through chat.',
            'First, I would describe the goal: who the website is for, what it needs to communicate, and which features it needs. I would establish the rules and constraints and provide references.',
            'Then I would generate a foundation. At that stage, I would focus on the structure and making sure all the necessary components were there, rather than trying to perfect every detail.',
            'As soon as I had a useful base, I would bring it into Figma, adjust the composition, and refine the visual decisions directly. Then I would send screenshots back to AI for implementation.',
            'That was the transition I put off for too long. I kept explaining things when I could already have shown the solution more quickly. Next time, I would decide earlier which parts are better handled by AI and which are easier to do myself.'
          ]
        },
        {
          heading: 'The website was only the beginning',
          paragraphs: [
            'I now have a portfolio I can keep expanding with projects and articles. But the more unexpected outcome was the independence I gained along the way.',
            'Previously, there was a stage between my mockup and a working product that belonged to other specialists. Now I understand more of what happens there, and I can handle some of those tasks myself.',
            'That has already helped me start my next project: an iPhone app.',
            'I still rely primarily on my UI/UX experience, and I’m aware of the limits of my technical knowledge. But now I can do more than design an interface. I can work towards launching a product, see how it behaves, and keep developing it.',
            'I started with a website that I hoped would help me find my next role. Along the way, I gained the ability to build things I would previously have needed a team to pursue.'
          ]
        }
      ],
      takeaways: [
        'Generating is not finishing: AI gave me a starting point. Turning it into a portfolio I was ready to share took iteration, visual refinement, and work beyond the interface.',
        'Some changes are faster by hand: Moving an element, resizing it, or changing its colour took seconds in Figma — and sometimes several rounds of prompts through chat.',
        'Show the change instead of explaining it again: When prompts stopped helping, I made the adjustments in Figma and sent screenshots back to AI Studio for implementation.',
        'Build a structure you can keep using: Beyond a new look, I wanted a consistent format for presenting my work — one I could reuse as I added future projects.',
        'More independence doesn’t mean knowing everything: I took the site from idea to launch, but that didn’t make me a developer. Understanding what I could check myself and where I needed technical help. This was part of the process.'
      ]
    }
  },
  {
    id: 'post-2',
    slug: 'ai-as-a-design-copilot-accelerating-workflows-beyond-the-hype',
    title: 'AI as a Design Co-Pilot: Accelerating Systems Research Beyond the Hype',
    subtitle: 'Practical patterns for component audits, edge-case generation, and documentation churn',
    excerpt: 'How AI automates mechanical component audits and documentation, freeing designers to focus on strategic decisions.',
    date: 'September 18, 2026',
    readingTime: '5 min read',
    category: 'AI & Workflow',
    tags: ['AI Tooling', 'Design Workflow', 'Automation', 'Productivity'],
    image: '/Free_M_Mockups_iMac_24_Inch.png',
    content: {
      lead: 'The conversation around AI in product design has swung wildly between breathless hype and existential anxiety. The reality in the trenches of senior product design is far more grounded: AI is the most effective workflow accelerator we have ever had for tedious, mechanical systems tasks.',
      sections: [
        {
          heading: 'Automating the Boring 80%',
          paragraphs: [
            'Designing high-scale enterprise applications requires accounting for hundreds of edge cases: empty states, localized string overflows, truncated metadata tags, server timeout states, and permission denials.',
            'Traditionally, documenting these states took days of tedious Figma variant cloning. Today, I use AI to rapidly generate comprehensive test matrices, synthesize realistic localization test strings, and audit token mappings before handoff.'
          ],
          quote: '“AI doesn’t make strategic product decisions. It frees the designer from manual production grunt work so they can actually focus on strategic product decisions.”'
        },
        {
          heading: 'Where AI Fails (And Why Human Judgment Remains King)',
          paragraphs: [
            'AI models have zero intuition for organizational politics, business context, or the emotional friction a user experiences when navigating an ambiguous financial workflow. It can generate twenty pretty dashboards in seconds, but it cannot tell you which metric actually drives retention or how the sales team handles customer onboarding.',
            'The highest leverage designers today are those who treat AI as an energetic junior researcher: giving it structured prompts, rigorously verifying its outputs, and applying human taste and architectural rigor to the final product.'
          ]
        }
      ],
      takeaways: [
        'Automate edge cases: Use AI for edge cases, localization matrices, and token auditing.',
        'Preserve human judgment: Never delegate core product strategy or user interview synthesis entirely to machines.',
        'Velocity is a multiplier: Saving 10 hours of variant setup means 10 more hours of user research and prototyping.'
      ]
    }
  },
  {
    id: 'post-3',
    slug: 'from-zero-to-hardware-sync-designing-bluetooth-experience-tag-sports',
    title: 'From Zero to Hardware Sync: Designing the Bluetooth Experience for TAG Sports',
    subtitle: 'Micro-interactions, sensory haptics, and outdoor sunlight readability on iOS & Apple Watch',
    excerpt: 'Designing seamless Bluetooth pairing, high-contrast sunlight UI, and haptic feedback for connected sports radar.',
    date: 'August 12, 2026',
    readingTime: '6 min read',
    category: 'Mobile & IoT',
    tags: ['Mobile UX', 'Hardware Pairing', 'iOS', 'Wearables'],
    image: '/TAG splash1-card.png',
    content: {
      lead: 'Designing companion software for physical hardware is one of the most unforgiving design challenges in tech. When software disconnects from hardware on a baseball field or driving range, the athlete blames the entire product, not the Bluetooth protocol.',
      sections: [
        {
          heading: 'Designing for Physical Motion and Harsh Sunlight',
          paragraphs: [
            'Athletes don’t look at an app the way someone looks at a spreadsheet at a desk. They are sweating, wearing gloves, standing in blazing 12:00 PM sunlight, and glancing at their screen for 1.5 seconds between explosive reps.',
            'For TAG One, this meant ultra-high-contrast typographic hierarchy, massive touch targets, and instant color-coded feedback states that are legible from 10 feet away without requiring the user to squint or navigate deep submenus.'
          ],
          quote: '“If an athlete has to take off their gloves or stop their training session to troubleshoot a pairing state, the design has failed.”'
        },
        {
          heading: 'The 3-Second Pairing Promise',
          paragraphs: [
            'Hardware pairing failure is the #1 churn driver in connected consumer IoT. We eliminated multi-step pairing wizards in favor of proximity-based passive discovery: turn on the radar sensor, hold the phone within 3 feet, and see an instant fluid radial ripple animation confirm the link in under 3 seconds.',
            'We added synced haptic feedback and distinct sound cues so coaches can hear connection confirmation while keeping their eyes on the players.'
          ]
        }
      ],
      takeaways: [
        'Ambient context dictates UI: Bright outdoor sun demands bold typographic weights and strict WCAG AAA contrast.',
        'Multimodal sensory feedback: Audio and haptic cues bridge the gap when visual attention is split.',
        'Self-healing connection states: Automatic background reconnection prevents user drop-off.'
      ]
    }
  },
  {
    id: 'post-4',
    slug: 'the-micro-friction-tax-how-small-ux-bottlenecks-bleed-saas-retention',
    title: 'The Micro-Friction Tax: How Small UX Bottlenecks Bleed Enterprise SaaS Retention',
    subtitle: 'Analyzing conversion drop-offs, table density issues, and keyboard navigation gaps',
    excerpt: 'How silent interaction bottlenecks accumulate into churn, and practical audits to remove daily enterprise friction.',
    date: 'July 03, 2026',
    readingTime: '5 min read',
    category: 'UX Strategy',
    tags: ['SaaS Metrics', 'Interaction Design', 'Usability Auditing'],
    image: '/Erwin/Pics/laptop static.png',
    content: {
      lead: 'In enterprise B2B software, users rarely churn because of one missing feature. They churn because every single day, completing their 10 core repetitive tasks takes 14 unnecessary clicks, 3 slow modal transitions, and unremembered filter states.',
      sections: [
        {
          heading: 'The Invisible Cost of Daily Friction',
          paragraphs: [
            'If an operations manager performs an action 40 times a day, and an interface introduces a 4-second delay or an unnecessary confirmation dialog, that amounts to hours of lost company time each quarter.',
            'When contract renewal time arrives, these micro-frustrations surface as qualitative complaints: “The software feels slow and clunky.” Decision-makers then open the door to competitor evaluations.'
          ],
          quote: '“Speed is a feature. Reducing interaction friction directly reduces churn risk in annual enterprise renewals.”'
        },
        {
          heading: 'Tactical Solutions: Keyboard First, State Persistence',
          paragraphs: [
            'The simplest fixes often yield the highest ROI: implementing global keyboard shortcuts (CMD+K search, arrow navigation across tables), persisting user column preferences in local storage, and removing redundant “Are you sure?” dialogs in favor of non-blocking toast undo notifications.'
          ]
        }
      ],
      takeaways: [
        'Audit high-frequency workflows: Optimize the top 5 actions users perform 90% of the time.',
        'Embrace optimistic UI: Use non-destructive undo notifications instead of modal interrupt confirmations.',
        'Persist user workspace states: Remembering filters, column widths, and zoom levels makes software feel intelligent.'
      ]
    }
  },
  {
    id: 'post-5',
    slug: 'architectural-thinking-in-interface-design-lessons-from-bim',
    title: 'Architectural Thinking in Interface Design: Lessons From BIM and 3D Modeling',
    subtitle: 'How building information modeling and structural discipline make digital products resilient',
    excerpt: 'Applying architectural rigor, spatial balance, and structural systems thinking to build resilient software interfaces.',
    date: 'May 22, 2026',
    readingTime: '8 min read',
    category: 'Perspective',
    tags: ['Systems Thinking', 'Architecture', 'Design Foundations'],
    image: '/Me-1.png',
    content: {
      lead: 'In 2010 I graduated with a degree in Architecture and worked with Building Information Modeling (BIM). When you design a physical building, you cannot simply “hotfix” a foundation beam after the concrete is poured. You must understand load distribution, material tolerances, and spatial flow before construction begins.',
      sections: [
        {
          heading: 'Digital Products as Structural Systems',
          paragraphs: [
            'When I transitioned into digital product design in 2013, I immediately recognized that software interfaces are essentially digital buildings: they have foundations (design tokens and data schemas), structural load-bearing walls (core information architecture and navigation), and decorative finishes (typography, motion, and color accents).',
            'When designers focus only on the surface aesthetics without respecting the underlying structural constraints, the digital product crumbles under the weight of feature expansion within 18 months.'
          ],
          quote: '“Architecture taught me to design from the foundation upward. A beautiful façade on a broken structure is just technical debt with nice paint.”'
        },
        {
          heading: 'Spatial Harmony and Cognitive Ergonomics',
          paragraphs: [
            'Just as physical doorways, sightlines, and natural light guide human foot traffic through a physical museum or airport terminal, negative space, visual hierarchy, and contrast guide human cognitive attention across a complex SaaS platform.',
            'By applying architectural rigor to interface layouts, we create software that feels grounded, permanent, and effortless to inhabit.'
          ]
        }
      ],
      takeaways: [
        'Design systems are structural engineering: Tokens and components must be built for load-bearing expansion.',
        'Negative space is not empty space: It is cognitive breathing room that defines the hierarchy of information.',
        'Understand technical constraints early: Collaborating closely with front-end engineers is like an architect collaborating with structural engineers on site.'
      ]
    }
  }
];

export type JournalLang = 'en' | 'ru' | 'uk';

export const UKRAINIAN_POST_TRANSLATIONS: Record<string, Partial<JournalPost>> = {
  'post-1': {
    title: 'Я хотів створити сайт повністю за допомогою AI. Потім я відкрив Figma.',
    subtitle: 'Як я створював своє портфоліо, вперше скористався GitHub і зрозумів, що деякі речі просто швидше зробити власноруч.',
    excerpt: 'Як я створював своє портфоліо, вперше скористався GitHub і зрозумів, що деякі речі просто швидше зробити власноруч.',
    readingTime: '7 хв читання',
    category: 'Продуктовий дизайн & AI',
    tags: ['AI Інструменти', 'Figma', 'Портфоліо', 'Продуктовий дизайн', 'Vercel'],
    image: '/article_o.png',
    date: '24 жовтня 2026',
    content: {
      lead: [
        'У мене вже було портфоліо в Notion. Але зараз я шукаю нову роль, і мені здалося, що власний сайт допоможе презентувати мій досвід чіткіше: не просто показати кілька проєктів, а пояснити мій підхід і типи проблем, які я вирішую.',
        'Це також була чудова нагода спробувати AI на реальному проєкті — пройти весь шлях від ідеї до живого сайту власноруч.',
        'План був оптимістичним: згенерувати базу, внести кілька правок і опублікувати. Без детальних макетів і довгих раундів доопрацювання у Figma.',
        'Виявилося, що згенерувати сайт і завершити його — це дві різні задачі.'
      ],
      sections: [
        {
          heading: 'Навіщо сайт, якщо вже був Notion?',
          paragraphs: [
            'Я продуктовий дизайнер з 12-річним досвідом в IT, з яких пʼять років — у продуктовому дизайні. Здебільшого я працюю над SaaS-продуктами та складними інтерфейсами, а також сайтами та мобільними додатками.',
            'Notion давав можливість переглядати мої роботи, але з роками структура змінювалася, і деякі старі проєкти вже не виглядали переконливо. Я хотів створити єдину послідовну структуру сайту, яка зробить мій досвід зрозумілішим і дасть чіткий формат для додавання майбутніх робіт, щоб вони відчувалися частинами єдиного портфоліо, а не окремими кейсами різних років.',
            'Сайт також дав більше свободи: змінювати структуру, публікувати статті та експериментувати з подачею. Я створив логотип і обрав візуальний стиль — без складного брендингу, але достатньо для власного впізнаваного характеру.',
            'Та найбільше мене цікавила можливість самостійно дійти до запуску. Раніше мені потрібні були розробники, щоб втілити дизайн у робочий сайт. Цього разу я хотів розібратися сам.'
          ],
          quote: 'Раніше мені були потрібні розробники, щоб втілити дизайн у робочий сайт. До цього проєкту я навіть ніколи не працював у GitHub.'
        },
        {
          heading: 'Чому Claude мені не підійшов',
          paragraphs: [
            'Я постійно чув про Claude Code у професійних спільнотах та соцмережах. Почати з нього здавалося логічним вибором.',
            'Але для мого проєкту результати виявилися занадто шаблонними. Я отримував версії, які явно виглядали згенерованими AI, тоді як мою власну задумку в них було складно впізнати.',
            'Я намагався уточнювати вимоги та вносити корективи, але результат все одно був далеким від того, що мені було потрібно.',
            'Мені також бракувало можливості виділити конкретний елемент і змінити його напряму. У тому сетапі кожне коригування доводилося спочатку описувати текстом, а потім перевіряти, чи правильно мене зрозуміли.',
            'Це не відповідало моєму підходу до роботи, і я вирішив спробувати інший інструмент.'
          ]
        },
        {
          heading: 'Чому я залишився в Google AI Studio',
          paragraphs: [
            'Я натрапив на допис у соцмережах, де дизайнер у Google AI Studio за допомогою Gemini лише за три промпти створив пристойний лендінг. Для мене це виглядало помітно краще, ніж те, що видавали моделі Sonnet від Claude.',
            'На той момент також діяла місячна безкоштовна підписка для нових користувачів. Я вирішив спробувати.',
            'У Google AI Studio у мене почала зʼявлятися основа, яку дійсно хотілося розвивати далі. Це стало головною причиною, чому я залишився. Поряд я використовував ChatGPT для досліджень та генерації ідей.',
            'Поступово зʼявлялося все більше прийомів і деталей, які хотілося втілити. Я став менше думати про те, як швидше закінчити, і більше — про те, як саме має виглядати сайт.',
            'У певний момент це перестало бути тестом можливостей AI. Я створював своє портфоліо, куди збирався запрошувати людей. І більше не хотів залишати речі, які мене не влаштовували.'
          ],
          quote: 'У певний момент це перестало бути тестом можливостей AI. Я створював своє портфоліо, куди збирався запрошувати людей.'
        },
        {
          heading: 'Скільки разів можна пояснювати ту саму правку?',
          paragraphs: [
            'Деякі зміни спрацьовували одразу: описав завдання, перевірив результат, пішов далі. Інші перетворювалися на довгі діалоги.',
            'Я задавав AI правила, пояснював принципи та фіксував обмеження. Очікував, що наступні генерації їх врахують. Але модель періодично поверталася до звичних шаблонів, губила вимоги або змінювала те, про що її не просили.',
            'Доводилося знову пояснювати, перевіряти та виправляти.',
            'Найбільше виснажували ситуації, коли я точно знав, чого хочу. Мені не потрібна була нова ідея — мені була потрібна конкретна зміна.',
            'Але замість її втілення я витрачав час на пошук кращих слів у чаті. Це спалювало час і токени, а нова генерація не обовʼязково наближала до результату.'
          ],
          quote: 'Зрештою я відкрив Figma.'
        },
        {
          heading: 'Коли простіше зробити власноруч',
          paragraphs: [
            'Я усвідомив, що витрачаю забагато часу на пояснення простих речей. Пересунути елемент, зменшити розмір, змінити колір: у Figma це забирає секунди. Через чат доводилося описувати зміну, чекати на відповідь і перевіряти, чи збіглася вона з моїм задумом.',
            'За допомогою плагінів, зокрема HTML to Design, я переніс актуальну версію сайту та її компоненти на полотно Figma.',
            'Після цього я зміг вносити ці правки звичним способом: рухав блоки, підбирав розміри та кольори, а потім повертав скріншоти в Google AI Studio для втілення в коді.',
            'Мені не потрібно було перемальовувати весь сайт. Для таких точкових правок пряма робота руками була набагато швидшою й точнішою за черговий раунд промптів.',
            'Згодом мій робочий процес розділився на три чіткі частини:'
          ],
          bulletPoints: [
            {
              title: 'ChatGPT',
              text: 'для досліджень та пошуку ідей.'
            },
            {
              title: 'Google AI Studio',
              text: 'для збірки сайту та впровадження змін.'
            },
            {
              title: 'Figma',
              text: 'для прямих візуальних правок руками, коли промптів недостатньо.'
            }
          ]
        },
        {
          paragraphs: [
            'Тоді я остаточно відмовився від ідеї робити все виключно через AI. Це було цікаве обмеження для експерименту, але воно заважало завершити сайт.'
          ]
        },
        {
          heading: 'Від сторінки в браузері до сайту, яким можна користуватися',
          paragraphs: [
            'Я хотів довести проєкт до стану, коли посилання можна надіслати рекрутерам і потенційним клієнтам, показати свої роботи та отримати фідбек.',
            'Google AI Studio допоміг не лише з імплементацією. Я запитував, як додати функції, що для цього потрібно і які кроки зробити. Я розбирався по ходу справи.',
            'Так я опрацював мобільний, планшетний і десктопний адаптив, додав форму зворотного звʼязку та бронювання дзвінків, підключив Google Analytics і налаштував SEO.',
            'Потім підключив проєкт до GitHub, задеплоїв через Vercel і привʼязав окремо придбаний домен.',
            'Багато чого було для мене новим. Раніше я міг обговорити з розробником, що має відбуватися на сайті. Тепер я шукав способи зробити це власноруч.'
          ]
        },
        {
          heading: 'Що я можу перевірити сам',
          paragraphs: [
            'Візуальний дизайн, поведінку інтерфейсу та основні користувацькі сценарії я тестую сам. Тут я можу спиратися на свій досвід: пройтися сайтом, помітити тертя і порівняти результат із задумом.',
            'З кодом інша справа. Я не роблю повноцінний code review, оскільки поки не маю достатніх технічних знань, щоб впевнено оцінити якість коду. Я можу відкрити редактор, але це не означає, що я розумію все всередині.',
            'У технічних перевірках я наразі покладаюся на AI. Перед релізом я також прошу його перевірити проєкт на потенційні вразливості.',
            'Я не сприймаю це як гарантію: AI може пропустити помилку, і я теж можу її не помітити. Для складніших завдань я розумію необхідність залучення технічного фахівця.'
          ],
          quote: 'Цей досвід допоміг мені глибше зрозуміти технічну сторону. Але він не замінив експертизу розробника.'
        },
        {
          heading: 'Як би я підійшов до цього зараз',
          paragraphs: [
            'Якби я починав знову, я б не намагався зробити абсолютно все через чат.',
            'Спочатку я б описав ціль: для кого цей сайт, що він має доносити та які функції потрібні. Зафіксував би правила, обмеження та надав референси.',
            'Потім згенерував би основу. На цьому етапі зосередився б на структурі та наявності всіх необхідних компонентів, а не на доведенні кожної деталі до ідеалу.',
            'Щойно зʼявилася б робоча база, я б одразу переніс її у Figma, підправив композицію та візуальні рішення напряму. А потім повернув би скріншоти в AI для реалізації.',
            'Саме цей перехід я занадто довго відкладав: продовжував пояснювати словами те, що міг швидше показати готовим рішенням. Наступного разу я б раніше вирішив, які частини краще довірити AI, а що простіше зробити самому.'
          ]
        },
        {
          heading: 'Сайт — це лише початок',
          paragraphs: [
            'Тепер у мене є портфоліо, яке можна продовжувати наповнювати проєктами та статтями. Але більш несподіваним результатом стала незалежність, яку я здобув у процесі.',
            'Раніше між моїм макетом і робочим продуктом був етап, який належав іншим спеціалістам. Тепер я краще розумію, що там відбувається, і можу виконувати частину цих завдань самостійно.',
            'Це вже допомогло мені розпочати наступний проєкт — додаток для iPhone.',
            'Я все ще спираюся насамперед на свій досвід в UI/UX та усвідомлюю межі технічних знань. Але тепер можу не просто намалювати інтерфейс, а рухатися до запуску продукту, бачити його поведінку та розвивати далі.',
            'Я починав із сайту, який мав допомогти мені знайти нову роль. А натомість отримав здатність створювати речі, для яких раніше була потрібна ціла команда.'
          ]
        }
      ],
      takeaways: [
        'Згенерувати — не означає закінчити: AI дав мені відправну точку, але щоб перетворити її на готове портфоліо, знадобилися ітерації, візуальне доопрацювання та робота поза межами інтерфейсу.',
        'Деякі зміни швидше зробити руками: Пересунути елемент, змінити розмір чи колір у Figma займає секунди, а в чаті часом вимагало кількох раундів промптів.',
        'Показуйте зміни замість того, щоб пояснювати знову: Коли промпти заходили в глухий кут, я робив правки у Figma і надсилав скріншоти в AI Studio для реалізації.',
        'Створюйте структуру для масштабування: Окрім нового вигляду, мені потрібен був сталий формат презентації робіт, який можна перевикористовувати для майбутніх проєктів.',
        'Більша незалежність не означає всезнання: Я довів сайт від ідеї до релізу, але це не зробило мене розробником. Розуміння своїх меж і того, де потрібен технічний фахівець — частина процесу.'
      ]
    }
  },
  'post-2': {
    title: 'AI як другий пілот у дизайні: прискорення системних процесів без зайвого гайпу',
    subtitle: 'Практичні підходи до аудиту компонентів, генерації крайових випадків та автоматизації документації',
    excerpt: 'Як штучний інтелект автоматизує рутинні аудити компонентів і документацію, дозволяючи дизайнерам зосередитися на стратегії.',
    readingTime: '5 хв читання',
    category: 'AI та процеси',
    tags: ['AI-інструменти', 'Дизайн-процес', 'Автоматизація', 'Продуктивність'],
    date: '18 вересня 2026',
    content: {
      lead: 'Дискусія навколо AI у продуктовому дизайні коливається між ейфорією та страхами. Реальність у роботі сеньйор-дизайнера значно прагматичніша: AI — це найефективніший прискорювач рутинних, механічних системних завдань.',
      sections: [
        {
          heading: 'Автоматизація нудних 80%',
          paragraphs: [
            'Проєктування масштабних додатків вимагає опрацювання сотень крайових станів: порожні екрани, переповнення перекладених рядків, довгі теги метаданих, таймаути сервера та заборони доступу.',
            'Раніше документування цих станів займало дні клонування варіантів у Figma. Сьогодні я використовую AI для швидкої генерації тестових матриць, локалізаційних рядків і перевірки мапінгу токенів перед передачею в розробку.'
          ],
          quote: '«AI не приймає стратегічних рішень. Він звільняє дизайнера від конвеєрної рутини, щоб той міг сфокусуватися на стратегії та користувачах».'
        },
        {
          heading: 'Де AI безсилий (і чому людське судження вирішує все)',
          paragraphs: [
            'Моделі не мають інтуїції щодо бізнес-контексту чи емоційного тертя, яке відчуває людина у заплутаному фінансовому процесі. AI може видати 20 красивих дашбордів за секунди, але не скаже, яка метрика справді утримує користувачів.',
            'Найефективніші дизайнери сьогодні ставляться до AI як до енергійного помічника: дають структуровані запити, суворо верифікують результати та застосовують власний досвід і відчуття смаку.'
          ]
        }
      ],
      takeaways: [
        'Автоматизація рутини: Використовуйте AI для крайових станів, матриць локалізації та перевірки токенів.',
        'Людське судження: Ніколи не делегуйте стратегію продукту чи глибинні інтервʼю алгоритмам.',
        'Швидкість як важіль: Економія 10 годин на варіантах означає 10 годин на дослідження.'
      ]
    }
  },
  'post-3': {
    title: 'Архітектурне мислення в дизайні інтерфейсів: уроки BIM та 3D-моделювання',
    subtitle: 'Як дисципліна інформаційного моделювання будівель робить цифрові продукти стійкими',
    excerpt: 'Застосування архітектурної строгості, просторового балансу та системного мислення для створення надійних інтерфейсів.',
    readingTime: '8 хв читання',
    category: 'Погляд',
    tags: ['Системне мислення', 'Архітектура', 'Основи дизайну'],
    date: '22 травня 2026',
    content: {
      lead: 'У 2010 році я закінчив архітектурний факультет і працював із технологіями BIM. Проєктуючи фізичну будівлю, ви не можете просто «виправити баг» у фундаменті після заливки бетону. Ви зобовʼязані прорахувати навантаження, властивості матеріалів і рух простору ще до початку робіт.',
      sections: [
        {
          heading: 'Цифрові продукти як конструктивні системи',
          paragraphs: [
            'Перейшовши в цифровий дизайн у 2013 році, я одразу помітив: інтерфейси — це цифрові будівлі. Вони мають фундамент (токени й схеми даних), опорні стіни (архітектуру інформації й навігацію) та оздоблення (типографіку, анімації, акцентні кольори).',
            'Коли дизайнери захоплюються лише естетикою без поваги до конструктиву, продукт руйнується під вагою нових функцій уже за 18 місяців.'
          ],
          quote: '«Архітектура навчила мене проєктувати від фундаменту вгору. Гарний фасад на хиткій конструкції — це просто технічний борг із гарною фарбою».'
        },
        {
          heading: 'Просторова гармонія та когнітивна ергономіка',
          paragraphs: [
            'Так само як дверні прорізи та природне світло спрямовують рух людей у будівлі, вільний простір, візуальна ієрархія й контраст керують увагою користувача в інтерфейсі.',
            'Архітектурна строгість дозволяє створювати додатки, які відчуваються надійними, логічними та легкими у взаємодії.'
          ]
        }
      ],
      takeaways: [
        'Дизайн-системи — це інженерія: токени та компоненти мають витримувати масштабування.',
        'Повітря в макеті — це не порожнеча: це когнітивний простір для фокусування уваги.',
        'Враховуйте технічні обмеження: тісна робота з розробниками схожа на взаємодію архітектора з конструктором на будівництві.'
      ]
    }
  }
};

export const RUSSIAN_POST_TRANSLATIONS: Record<string, Partial<JournalPost>> = {
  'post-1': {
    title: 'Я хотел создать сайт полностью с помощью AI. Затем я открыл Figma.',
    subtitle: 'Как я создавал портфолио, впервые воспользовался GitHub и понял, что некоторые вещи просто быстрее сделать вручную.',
    excerpt: 'Как я создавал портфолио, впервые воспользовался GitHub и понял, что некоторые вещи просто быстрее сделать вручную.',
    readingTime: '7 мин чтения',
    category: 'Продуктовый дизайн & AI',
    tags: ['AI Инструменты', 'Figma', 'Портфолио', 'Продуктовый дизайн', 'Vercel'],
    image: '/article_o.png',
    date: '24 октября 2026',
    content: {
      lead: [
        'У меня уже было портфолио в Notion. Но сейчас я нахожусь в поиске нового места работы, и мне показалось, что собственный сайт поможет подать опыт яснее: не просто показать несколько кейсов, а объяснить мой подход и типы задач, которые я решаю.',
        'Это также была отличная возможность протестировать AI на реальном проекте — от идеи до рабочего сайта своими силами.',
        'План был оптимистичным: сгенерировать основу, внести пару правок и опубликовать. Без детализированных макетов и долгих раундов полировки в Figma.',
        'Оказалось, что сгенерировать сайт и довести его до конца — две совершенно разные задачи.'
      ],
      sections: [
        {
          heading: 'Зачем сайт, если уже был Notion?',
          paragraphs: [
            'Я продуктовый дизайнер с 12-летним опытом в IT, из которых 5 лет — в продуктовом дизайне. В основном я работаю над SaaS-продуктами и сложными интерфейсами, а также веб-сайтами и мобильными приложениями.',
            'Notion давал возможность увидеть мои работы, но со временем структура портфолио менялась, и некоторые старые проекты выглядели уже не так убедительно. Я хотел создать единую стройную структуру сайта, которая сделает мой опыт понятнее и даст понятный формат для добавления будущих проектов — чтобы они ощущались частями единого целого, а не разрозненными кейсами разных лет.',
            'Сайт давал больше свободы: можно менять структуру, добавлять статьи и экспериментировать с подачей. Я разработал логотип и выбрал визуальный стиль — без избыточного брендинга, но достаточно, чтобы у сайта появился свой характер.',
            'Но главное — мне было интересно довести проект до релиза самому. Раньше, чтобы превратить дизайн в рабочий сайт, мне требовались разработчики. В этот раз я хотел разобраться во всём самостоятельно.'
          ],
          quote: 'Раньше мне требовались разработчики, чтобы превратить дизайн в рабочий сайт. До этого проекта я даже никогда не работал в GitHub.'
        },
        {
          heading: 'Почему Claude мне не подошёл',
          paragraphs: [
            'Я постоянно слышал о Claude Code в профессиональных кругах и соцсетях. Начать с Claude казалось логичным решением.',
            'Но в моём проекте результат получался слишком шаблонным. Я получал версии, которые отчетливо выглядели как сгенерированные AI, тогда как задуманная идея в них почти терялась.',
            'Я пробовал уточнять требования и формулировать правки, но результат всё равно был далёк от желаемого.',
            'Мне также не хватало возможности просто выделить конкретный элемент и сразу его изменить. В выбранном процессе каждую правку приходилось сначала описывать промптом, а затем проверять, правильно ли меня поняли.',
            'Это не подходило под мой стиль работы, и я решил попробовать другой инструмент.'
          ]
        },
        {
          heading: 'Почему я остался в Google AI Studio',
          paragraphs: [
            'В ленте мне попался пост, где дизайнер в Google AI Studio с помощью Gemini всего за три промпта собрал добротный лендинг. Для меня это выглядело заметно лучше того, что выдавали модели Sonnet от Claude.',
            'К тому же для новых пользователей действовал бесплатный месячный пробный период. Я решил попробовать.',
            'В Google AI Studio у меня начала получаться основа, которую действительно хотелось развивать. Это стало главной причиной, почему я остался. Параллельно я использовал ChatGPT для исследований и проверки идей.',
            'Постепенно находились новые приёмы и детали, которые хотелось внедрить. Я стал меньше думать о том, как бы закончить быстрее, и больше — о том, как именно должен выглядеть сайт.',
            'В какой-то момент это перестало быть тестом возможностей AI. Я создавал своё портфолио, куда буду приглашать людей. И больше не хотел оставлять компромиссы, которыми был недоволен.'
          ],
          quote: 'В какой-то момент это перестало быть тестом возможностей AI. Я создавал своё портфолио, куда буду приглашать людей.'
        },
        {
          heading: 'Сколько раз можно объяснять одну и ту же правку?',
          paragraphs: [
            'Некоторые изменения срабатывали мгновенно: описал задачу, проверил результат, пошёл дальше. Другие перерастали в бесконечные диалоги.',
            'Я задавал AI правила, объяснял принципы и фиксировал ограничения. Я ожидал, что последующие генерации будут их учитывать. Но модель периодически скатывалась в привычные паттерны, теряла контекст или меняла то, о чём её не просили.',
            'Приходилось заново объяснять, проверять и исправлять.',
            'Больше всего утомляли ситуации, когда я точно знал, чего хочу: мне не нужна была новая идея, нужно было внести конкретное изменение.',
            'Но вместо того чтобы сделать его, я тратил время на поиск более точной формулировки в чате. Это сжигало время и токены, а новая генерация не всегда приближала к цели.'
          ],
          quote: 'В конце концов я открыл Figma.'
        },
        {
          heading: 'Когда проще сделать самому',
          paragraphs: [
            'Я понял, что трачу слишком много времени на объяснение элементарных правок. Передвинуть элемент, уменьшить размер, скорректировать цвет — в Figma это занимает секунды. Через чат нужно описать правку словами, дождаться ответа и проверить, совпало ли это с задумкой.',
            'С помощью плагинов, включая HTML to Design, I перенёс актуальную версию сайта и его компоненты на холст Figma.',
            'После этого я стал вносить такие корректировки привычным способом: двигал элементы, подбирал размеры и цвета, а затем отправлял скриншоты обратно в Google AI Studio на реализацию.',
            'Мне не нужно было перерисовывать весь сайт целиком. Для подобных точечных правок работа руками оказалась в разы быстрее и точнее очередного раунда промптов.',
            'В итоге рабочий процесс разделился на три понятные роли:'
          ],
          bulletPoints: [
            {
              title: 'ChatGPT',
              text: 'для исследований и генерации идей.'
            },
            {
              title: 'Google AI Studio',
              text: 'для сборки сайта и реализации изменений.'
            },
            {
              title: 'Figma',
              text: 'для прямых визуальных правок руками, когда промптов недостаточно.'
            }
          ]
        },
        {
          paragraphs: [
            'Тогда я окончательно отказался от идеи сделать всё исключительно через AI. Это было интересное ограничение для эксперимента, но оно мешало закончить сайт.'
          ]
        },
        {
          heading: 'От страницы в браузере к живому сайту',
          paragraphs: [
            'Я хотел довести проект до состояния, когда ссылку можно отправить рекрутерам и потенциальным клиентам, показать работы и получить обратную связь.',
            'Google AI Studio помогал не только с кодом: я спрашивал, как подключить нужные функции, что для этого потребуется и какие шаги предпринять. Я разбирался по ходу дела.',
            'Так я проработал мобильную, планшетную и десктопную адаптивность, добавил форму контактов и бронирование звонков, подключил Google Analytics и настроил SEO.',
            'Затем связал проект с GitHub, настроил деплой через Vercel и подключил отдельно купленный домен.',
            'Многое из этого было в новинку. Раньше я мог обсудить с разработчиком, что должно происходить на сайте. Теперь я искал способ реализовать это сам.'
          ]
        },
        {
          heading: 'Что я могу проверить сам',
          paragraphs: [
            'Визуальный дизайн, поведение интерфейса и основные пользовательские сценарии я тестирую самостоятельно. Здесь я могу опереться на свой опыт: пройти по сайту, заметить шероховатости и сравнить результат с замыслом.',
            'С кодом всё иначе: полноценный code review я не провожу, так как у меня пока нет достаточных технических знаний для уверенной оценки реализации. Я могу открыть редактор, но это не значит, что я понимаю каждую строчку.',
            'В технических проверках я сейчас полагаюсь на AI. Перед релизом я также прошу его проверить проект на возможные уязвимости.',
            'Я не воспринимаю это как гарантию: AI может пропустить ошибку, и я тоже могу её не заметить. Для более сложных задач я понимаю необходимость привлекать технического специалиста.'
          ],
          quote: 'Этот опыт помог мне глубже понять техническую сторону. Но он не заменил экспертизу разработчика.'
        },
        {
          heading: 'Как бы я подошёл к этому сейчас',
          paragraphs: [
            'Если бы я начинал заново, я бы не пытался сделать всё через диалог в чате.',
            'Сначала я бы описал цель: для кого сайт, что он должен транслировать и какие функции в нём нужны. Задал бы правила, ограничения и подобрал референсы.',
            'Затем сгенерировал бы основу. На этом этапе я сосредоточился бы на структуре и наличии всех компонентов, а не на идеальной выверенности деталей.',
            'Как только появилась бы рабочая база, я сразу перенёс бы её в Figma, поправил композицию и визуальные решения руками. А затем отправил скриншоты обратно в AI для реализации.',
            'Именно этот переход я слишком долго откладывал: продолжал объяснять словами то, что мог быстрее показать готовым решением. В следующий раз я раньше разделю, какие задачи лучше доверить AI, а что проще сделать самому.'
          ]
        },
        {
          heading: 'Сайт — это только начало',
          paragraphs: [
            'Теперь у меня есть портфолио, которое можно развивать проектами и статьями. Но более неожиданным результатом стала независимость, которую я приобрёл в процессе.',
            'Раньше между моим макетом и работающим продуктом был этап, принадлежавший другим специалистам. Теперь я лучше понимаю, что там происходит, и могу часть этих задач решать сам.',
            'Это уже помогло мне начать следующий проект — приложение для iPhone.',
            'Я по-прежнему опираюсь главным образом на опыт в UI/UX и осознаю границы своих технических знаний. Но теперь я могу не просто нарисовать интерфейс, а двигаться к запуску продукта, наблюдать за его поведением и развивать дальше.',
            'Я начинал с сайта, который должен был помочь мне найти новую роль. А в процессе получил возможность создавать вещи, для которых раньше потребовалась бы целая команда.'
          ]
        }
      ],
      takeaways: [
        'Сгенерировать — не значит закончить: AI дал мне отличную отправную точку, но чтобы превратить её в портфолио, потребовались итерации, визуальная доводка и работа далеко за пределами интерфейса.',
        'Некоторые правки быстрее сделать руками: Передвинуть элемент, изменить размер или цвет в Figma занимает секунды, а в чате порой требовало нескольких раундов промптов.',
        'Показывайте правку вместо того, чтобы объяснять снова: Когда промпты заходили в тупик, я вносил правки в Figma и возвращал скриншоты в AI Studio для реализации.',
        'Создавайте структуру для масштабирования: Помимо свежего визуала, мне нужен был понятный формат презентации работ, который можно переиспользовать в будущих проектах.',
        'Большая независимость не означает всезнание: Я довёл сайт от идеи до продакшена, но это не сделало меня разработчиком. Понимание границ своих возможностей и того, где нужен профильный специалист — ключевая часть процесса.'
      ]
    }
  },
  'post-2': {
    title: 'AI как второй пилот в дизайне: ускорение системных процессов без лишнего хайпа',
    subtitle: 'Практические подходы к аудиту компонентов, генерации краевых кейсов и автоматизации документации',
    excerpt: 'Как искусственный интеллект автоматизирует рутинные аудиты компонентов и документацию, позволяя дизайнерам сосредоточиться на стратегии.',
    readingTime: '5 мин чтения',
    category: 'AI и процессы',
    tags: ['AI-инструменты', 'Дизайн-процесс', 'Автоматизация', 'Продуктивность'],
    date: '18 сентября 2026',
    content: {
      lead: 'Дискуссия вокруг AI в продуктовом дизайне колеблется между эйфорией и экзистенциальным страхом. Реальность в работе сеньор-дизайнера куда более прагматична: AI — это самый эффективный ускоритель рутинных, механических системных задач.',
      sections: [
        {
          heading: 'Автоматизация скучных 80%',
          paragraphs: [
            'Проектирование масштабных enterprise-приложений требует учета сотен краевых состояний: пустые экраны, переполнение переведенных строк, длинные теги метаданных, таймауты сервера и отказы в доступе.',
            'Раньше документирование этих состояний отнимало дни клонирования вариантов в Figma. Сегодня я использую AI для быстрой генерации тестовых матриц, реалистичных локализационных строк и аудита мапинга токенов перед передачей в разработку.'
          ],
          quote: 'AI не принимает стратегических решений. Он освобождает дизайнера от рутины, чтобы тот мог сфокусироваться на стратегии и пользователях.'
        },
        {
          heading: 'Где AI бессилен (и почему человеческое суждение решает всё)',
          paragraphs: [
            'У моделей нет интуиции относительно бизнес-контекста или эмоционального трения, которое испытывает человек в запутанном финансовом процессе. AI может выдать 20 красивых дашбордов за секунды, но не скажет, какая метрика действительно удерживает клиентов.',
            'Самые эффективные дизайнеры сегодня относятся к AI как к энергичному младшему исследователю: дают структурированные промпты, строго проверяют результаты и применяют собственный опыт, вкус и системную строгость.'
          ]
        }
      ],
      takeaways: [
        'Автоматизация рутины: Используйте AI для краевых состояний, матриц локализации и проверки токенов.',
        'Человеческое суждение: Никогда не делегируйте стратегию продукта или глубинные интервью алгоритмам.',
        'Скорость как рычаг: Экономия 10 часов на рутине означает 10 часов на исследования и прототипирование.'
      ]
    }
  },
  'post-3': {
    title: 'С нуля до синхронизации с «железом»: дизайн Bluetooth-опыта для TAG Sports',
    subtitle: 'Микровзаимодействия, тактильный отклик и читаемость на ярком солнце на iOS и Apple Watch',
    excerpt: 'Проектирование бесшовного Bluetooth-сопряжения, контрастного интерфейса для улицы и тактильного отклика для спортивного радара.',
    readingTime: '6 мин чтения',
    category: 'Mobile & IoT',
    tags: ['Mobile UX', 'Hardware Pairing', 'iOS', 'Wearables'],
    date: '12 августа 2026',
    content: {
      lead: 'Проектирование софта для физических устройств — один из самых бескомпромиссных вызовов в дизайне. Когда приложение теряет связь с радаром на поле, спортсмен винит весь продукт, а не Bluetooth-протокол.',
      sections: [
        {
          heading: 'Дизайн для движения и слепящего солнца',
          paragraphs: [
            'Спортсмены смотрят в телефон не так, как офисный сотрудник в монитор. Они потеют, носят перчатки, стоят под полуденным солнцем и бросают взгляд на экран на полторы секунды между подходами.',
            'Для TAG One это означало сверхвысокий типографический контраст, увеличенные зоны касания и цветовую индикацию, различимую с расстояния в три метра без вглядывания в мелкие детали.'
          ],
          quote: 'Если атлету нужно снимать перчатки или прерывать тренировку ради настройки сопряжения — дизайн провалился.'
        },
        {
          heading: 'Правило 3 секунд на подключение',
          paragraphs: [
            'Сложности сопряжения — главная причина оттока в потребительском IoT. Мы отказались от многошаговых мастеров настройки в пользу пассивного обнаружения: включаете радар, подносите телефон ближе метра — и плавная радиальная анимация подтверждает связь менее чем за 3 секунды.',
            'Мы добавили синхронизированный виброотклик и четкие звуковые сигналы, чтобы тренеры слышали подтверждение связи, не отрывая глаз от игроков.'
          ]
        }
      ],
      takeaways: [
        'Контекст диктует контраст: Яркое солнце требует плотных начертаний шрифта и строгого стандарта WCAG AAA.',
        'Мультимодальный отклик: Звук и тактильный отклик компенсируют нехватку визуального внимания.',
        'Самовосстановление связи: Автоматическое фоновое переподключение исключает раздражение пользователя.'
      ]
    }
  },
  'post-4': {
    title: 'Налог на микротрение: как мелкие UX-проблемы съедают удержание в enterprise SaaS',
    subtitle: 'Анализ провалов конверсии, плотности таблиц и пробелов клавиатурной навигации',
    excerpt: 'Как незаметные шероховатости интерфейса приводят к оттоку, и практический аудит для устранения ежедневного трения.',
    readingTime: '5 мин чтения',
    category: 'UX Стратегия',
    tags: ['SaaS Метрики', 'Interaction Design', 'UX Аудит'],
    date: '3 июля 2026',
    content: {
      lead: 'В корпоративном софте пользователи редко уходят из-за отсутствия одной функции. Они уходят потому, что каждый день выполнение их 10 базовых задач требует 14 лишних кликов, 3 медленных модальных окон и забытых фильтров.',
      sections: [
        {
          heading: 'Невидимая цена ежедневного трения',
          paragraphs: [
            'Если операционный менеджер выполняет действие 40 раз в день, и интерфейс добавляет 4-секундную задержку или лишнее окно подтверждения, за квартал компания теряет десятки часов рабочего времени.',
            'Когда приходит время продления контракта, эти микрораздражения превращаются в вывод руководства: «Софт медленный и неудобный». И открывается дверь для конкурентов.'
          ],
          quote: 'Скорость — это ключевая фича. Устранение трения в интерфейсе напрямую защищает от оттока при годовых продлениях.'
        },
        {
          heading: 'Тактические решения: клавиатура и сохранение состояний',
          paragraphs: [
            'Самые простые решения дают максимальную отдачу: глобальные горячие клавиши (поиск CMD+K, навигация стрелками в таблицах), сохранение настроек колонок в локальной памяти и замена блокирующих окон «Вы уверены?» на мягкие уведомления с возможностью отмены.'
          ]
        }
      ],
      takeaways: [
        'Аудит частых сценариев: Оптимизируйте 5 ключевых действий, выполняемых 90% времени.',
        'Оптимистичный UI: Заменяйте модальные окна подтверждения возможностью отмены действия.',
        'Сохранение контекста: Запоминание фильтров, ширин колонок и масштаба делает систему по-настоящему умной.'
      ]
    }
  },
  'post-5': {
    title: 'Архитектурное мышление в дизайне интерфейсов: уроки BIM и 3D-моделирования',
    subtitle: 'Как дисциплина информационного моделирования зданий делает цифровые продукты устойчивыми',
    excerpt: 'Применение архитектурной строгости, пространственного баланса и системного мышления для создания надежных интерфейсов.',
    readingTime: '8 мин чтения',
    category: 'Взгляд',
    tags: ['Системное мышление', 'Архитектура', 'Основы дизайна'],
    date: '22 мая 2026',
    content: {
      lead: 'В 2010 году я окончил архитектурный факультет и работал с технологиями BIM. Проектируя физическое здание, вы не можете «исправить баг» в фундаментной балке после заливки бетона. Вы обязаны рассчитать нагрузки, допуски материалов и потоки пространства до начала стройки.',
      sections: [
        {
          heading: 'Цифровые продукты как конструктивные системы',
          paragraphs: [
            'Перейдя в цифровой дизайн в 2013 году, я сразу понял: интерфейсы — это цифровые здания. У них есть фундамент (токены и схемы данных), несущие стены (информационная архитектура и навигация) и отделка (типографика, анимации, акцентные цвета).',
            'Когда дизайнеры увлекаются только внешней эстетикой без учета конструкции, продукт рушится под весом новых функций уже через 18 месяцев.'
          ],
          quote: 'Архитектура научила меня проектировать от фундамента вверх. Красивый фасад на ненадежной конструкции — это просто техдолг со свежей краской.'
        },
        {
          heading: 'Пространственная гармония и когнитивная эргономика',
          paragraphs: [
            'Так же как дверные проемы и естественный свет направляют движение людей в здании, свободное пространство, визуальная иерархия и контраст управляют вниманием пользователя в интерфейсе.',
            'Архитектурная строгость позволяет создавать приложения, которые ощущаются основательными, логичными и легкими в работе.'
          ]
        }
      ],
      takeaways: [
        'Дизайн-системы — это инженерия: Токены и компоненты должны выдерживать масштабирование.',
        'Воздух в макете — не пустота: Это когнитивное пространство для фокусировки внимания.',
        'Технические ограничения: Тесная работа с разработчиками похожа на сотрудничество архитектора с инженером на объекте.'
      ]
    }
  }
};

export function getLocalizedJournalPost(post: JournalPost, lang?: JournalLang): JournalPost {
  if (lang === 'uk' && UKRAINIAN_POST_TRANSLATIONS[post.id]) {
    const translation = UKRAINIAN_POST_TRANSLATIONS[post.id];
    return {
      ...post,
      ...translation,
      content: translation.content || post.content,
    };
  }
  if (lang === 'ru' && RUSSIAN_POST_TRANSLATIONS[post.id]) {
    const translation = RUSSIAN_POST_TRANSLATIONS[post.id];
    return {
      ...post,
      ...translation,
      content: translation.content || post.content,
    };
  }
  return post;
}

export function getLocalizedJournalPosts(lang?: JournalLang): JournalPost[] {
  return JOURNAL_POSTS.map((post) => getLocalizedJournalPost(post, lang));
}

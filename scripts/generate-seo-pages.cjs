const fs = require('fs');
const path = require('path');

const defaultBaseUrl = 'https://yukhnindesign.work';
const rawBaseUrl = process.env.SITE_URL || defaultBaseUrl;
const baseUrl = rawBaseUrl.replace(/\/+$/, '');

const projects = [
  {
    id: 'erwin',
    title: 'Erwin Data Modeler',
    role: 'Lead Product Designer',
    client: 'Quest Software',
    year: '2025-2026',
    description: 'Modernized a 30-year-old enterprise platform with a 220+ component design system, cutting design-to-development time by 30–40%.',
    image: '/Erwin/Pics/laptop static.png',
    tags: ['Enterprise SaaS', 'Data Management', 'Design Systems']
  },
  {
    id: 'nexus',
    title: 'TAG Radar Mobile App',
    role: 'Senior UX Designer',
    client: 'Ainstein',
    year: '2024-2025',
    description: 'Sole product designer, from brand identity to final UI — shipped across iOS, Android and Apple Watch.',
    image: '/TAG splash1.png',
    tags: ['B2C Mobile', 'iOS', 'Android', 'Bluetooth Technology', 'Sports App']
  },
  {
    id: 'velo',
    title: 'Velo Sustainable Luxury',
    role: 'Design Lead',
    client: 'Velo Luxury',
    year: '2023',
    description: 'Creating an editorial design system and e-commerce experience highlighting supply-chain transparency and fair trade.',
    image: '/Cat 1.png',
    tags: ['E-commerce', 'Brand Identity', 'Design Systems']
  }
];

function generateProjectHtml(baseHtml, project) {
  const canonicalUrl = `${baseUrl}/case-study/${project.id}`;
  const pageTitle = `${project.title} — Case Study | Igor Yukhnin`;
  const metaDescription = `Case Study: ${project.description}`;
  const imageUrl = `${baseUrl}${encodeURI(project.image)}`;
  const keywords = [
    project.title,
    ...project.tags,
    project.role,
    project.client,
    'Product Design',
    'UX Case Study',
    'UI Design',
    'Design System',
    'Igor Yukhnin'
  ].join(', ');

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "headline": pageTitle,
        "alternativeHeadline": `${project.role} · ${project.title}`,
        "description": project.description,
        "image": imageUrl,
        "inLanguage": "en",
        "mainEntityOfPage": canonicalUrl,
        "author": {
          "@type": "Person",
          "name": "Igor Yukhnin",
          "jobTitle": "Senior Product Designer",
          "url": "https://linkedin.com/in/igor-yukhnin"
        },
        "publisher": {
          "@type": "Person",
          "name": "Igor Yukhnin",
          "url": "https://linkedin.com/in/igor-yukhnin"
        },
        "datePublished": project.year ? `${project.year.split('-')[0]}-01-01` : "2024-01-01",
        "dateModified": "2026-10-12",
        "keywords": keywords,
        "articleSection": project.tags[0] || "Product Design",
        "about": project.tags.map((tag) => ({
          "@type": "Thing",
          "name": tag
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Selected Work",
            "item": `${baseUrl}/#work`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);

  // Replace meta name="title"
  html = html.replace(/<meta\s+name=["']title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="title" content="${pageTitle}" />`);

  // Replace meta name="description"
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${metaDescription}" />`);

  // Replace meta name="keywords"
  html = html.replace(/<meta\s+name=["']keywords["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="keywords" content="${keywords}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:type" content="article" />`);
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${pageTitle}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${metaDescription}" />`);
  html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:image" content="${imageUrl}" />\n    <meta property="og:url" content="${canonicalUrl}" />\n    <link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property=["']og:image:alt["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:image:alt" content="${project.title} — UX/UI Case Study Preview" />`);

  // Replace Twitter Tags
  html = html.replace(/<meta\s+property=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="twitter:title" content="${pageTitle}" />`);
  html = html.replace(/<meta\s+property=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="twitter:description" content="${metaDescription}" />`);
  html = html.replace(/<meta\s+property=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="twitter:image" content="${imageUrl}" />`);
  html = html.replace(/<meta\s+property=["']twitter:image:alt["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="twitter:image:alt" content="${project.title} — UX/UI Case Study Preview" />`);

  // Inject Project Specific JSON-LD before </head>
  const jsonLdScript = `\n    <script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n    </script>\n  </head>`;
  html = html.replace(/<\/head>/i, jsonLdScript);

  return html;
}

function processDirectory(targetDir) {
  const indexPath = path.join(targetDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn(`[seo-gen] No index.html found at ${indexPath}`);
    return;
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');

  projects.forEach((project) => {
    const projectHtml = generateProjectHtml(baseHtml, project);

    // Save to case-study/:id/index.html
    const caseStudyDir = path.join(targetDir, 'case-study', project.id);
    fs.mkdirSync(caseStudyDir, { recursive: true });
    fs.writeFileSync(path.join(caseStudyDir, 'index.html'), projectHtml, 'utf8');

    // Also save to work/:id/index.html
    const workDir = path.join(targetDir, 'work', project.id);
    fs.mkdirSync(workDir, { recursive: true });
    fs.writeFileSync(path.join(workDir, 'index.html'), projectHtml, 'utf8');

    console.log(`[seo-gen] Generated static OG & Schema.org HTML for ${project.id} at ${caseStudyDir}`);
  });
}

['dist', 'build'].forEach((dir) => {
  const targetDir = path.join(__dirname, '..', dir);
  if (fs.existsSync(targetDir)) {
    processDirectory(targetDir);
  }
});

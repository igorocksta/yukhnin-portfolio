import { useEffect } from 'react';
import type { Project } from '../data';

interface CaseStudySEOProps {
  project: Project;
}

const DEFAULT_TITLE = 'yukhnin_design | Senior Product Designer';
const DEFAULT_DESCRIPTION = 'Senior Product Designer with 12+ years of experience across B2B SaaS, B2C, fintech, and enterprise. Specializing in complex workflows, data-heavy products, and design systems.';
const DEFAULT_OG_IMAGE = '/og-image.png';

export default function CaseStudySEO({ project }: CaseStudySEOProps) {
  useEffect(() => {
    if (!project) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${origin}/case-study/${project.id}`;
    
    // Choose high-quality banner/hero image for Open Graph
    const projectImageRel = project.bannerImage || project.image || DEFAULT_OG_IMAGE;
    const projectImageUrl = projectImageRel.startsWith('http') 
      ? projectImageRel 
      : `${origin}${encodeURI(projectImageRel)}`;

    const pageTitle = `${project.title} — Case Study | Igor Yukhnin`;
    const metaDescription = `Case Study: ${project.description}`;
    const keywords = [
      project.title,
      ...(project.tags || []),
      project.role,
      project.client || 'Client',
      'Product Design',
      'UX Case Study',
      'UI Design',
      'Design System',
      'Igor Yukhnin',
      'yukhnin_design'
    ].filter(Boolean).join(', ');

    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = pageTitle;

    // Helper to safely set or create meta tags
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to get meta tag content
    const getMetaContent = (attribute: 'name' | 'property', key: string) => {
      const element = document.querySelector(`meta[${attribute}="${key}"]`);
      return element ? element.getAttribute('content') : null;
    };

    // Store original meta contents to restore on unmount
    const originalDesc = getMetaContent('name', 'description');
    const originalOgTitle = getMetaContent('property', 'og:title');
    const originalOgDesc = getMetaContent('property', 'og:description');
    const originalOgImage = getMetaContent('property', 'og:image');
    const originalOgUrl = getMetaContent('property', 'og:url');
    const originalOgType = getMetaContent('property', 'og:type');
    const originalTwTitle = getMetaContent('property', 'twitter:title') || getMetaContent('name', 'twitter:title');
    const originalTwDesc = getMetaContent('property', 'twitter:description') || getMetaContent('name', 'twitter:description');
    const originalTwImage = getMetaContent('property', 'twitter:image') || getMetaContent('name', 'twitter:image');

    // 2. Set Standard Meta Tags
    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Igor Yukhnin (yukhnin_design)');

    // 3. Set Open Graph Tags
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', projectImageUrl);
    setMetaTag('property', 'og:image:alt', `${project.title} — UX/UI Case Study Preview`);
    setMetaTag('property', 'og:site_name', 'yukhnin_design');
    setMetaTag('property', 'article:author', 'https://linkedin.com/in/igor-yukhnin');
    setMetaTag('property', 'article:section', project.tags?.[0] || 'Product Design');

    // 4. Set Twitter / X Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', projectImageUrl);
    setMetaTag('name', 'twitter:image:alt', `${project.title} — UX/UI Case Study Preview`);

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const originalCanonicalHref = canonicalLink ? canonicalLink.getAttribute('href') : null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Schema.org JSON-LD Structured Data
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
          "image": projectImageUrl,
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
          "articleSection": project.tags?.[0] || "Product Design",
          "about": (project.tags || []).map((tag) => ({
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
              "item": origin || "/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Selected Work",
              "item": `${origin}/#work`
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

    let scriptTag = document.getElementById('case-study-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'case-study-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);

    // Cleanup on unmount or project switch
    return () => {
      document.title = originalTitle || DEFAULT_TITLE;
      if (originalDesc) setMetaTag('name', 'description', originalDesc);
      if (originalOgTitle) setMetaTag('property', 'og:title', originalOgTitle);
      if (originalOgDesc) setMetaTag('property', 'og:description', originalOgDesc);
      if (originalOgImage) setMetaTag('property', 'og:image', originalOgImage);
      if (originalOgUrl) setMetaTag('property', 'og:url', originalOgUrl);
      if (originalOgType) setMetaTag('property', 'og:type', originalOgType);
      if (originalTwTitle) setMetaTag('name', 'twitter:title', originalTwTitle);
      if (originalTwDesc) setMetaTag('name', 'twitter:description', originalTwDesc);
      if (originalTwImage) setMetaTag('name', 'twitter:image', originalTwImage);

      if (canonicalLink) {
        if (originalCanonicalHref) {
          canonicalLink.setAttribute('href', originalCanonicalHref);
        } else {
          canonicalLink.remove();
        }
      }

      const existingScript = document.getElementById('case-study-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [project]);

  return null;
}

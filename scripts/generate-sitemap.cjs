/**
 * Automated Sitemap XML Generator
 * 
 * Crawls the application's internal route structure (src/App.tsx) and dynamic
 * project data (src/data.ts) to produce a valid, schema-compliant sitemap.xml
 * in the public/ directory (and mirrors to dist/ and build/ if present).
 *
 * Conforms to sitemaps.org protocol schema 0.9.
 */

const fs = require('fs');
const path = require('path');

// 1. Resolve Canonical Base URL
const defaultBaseUrl = 'https://yukhnindesign.work';
const rawBaseUrl = process.env.SITE_URL || defaultBaseUrl;
const baseUrl = rawBaseUrl.replace(/\/+$/, '');

const today = new Date().toISOString().split('T')[0];

// Excluded routes (internal test harnesses, disallows, wildcards, error pages)
const EXCLUDED_ROUTES = new Set([
  '*',
  '/404',
  '/splash',
  '/animation',
  '/blueprint',
  '/ui-kit' // Disallowed in robots.txt for search crawlers
]);

// Route configuration overrides (priority & changefreq by path pattern)
function getRouteMetadata(routePath, title) {
  if (routePath === '/' || routePath === '') {
    return { priority: '1.0', changefreq: 'weekly', title: 'Home — Senior Product Designer Portfolio' };
  }
  if (routePath.startsWith('/case-study/')) {
    return { priority: '0.9', changefreq: 'monthly', title: title || `Case Study: ${routePath.replace('/case-study/', '')}` };
  }
  if (routePath.startsWith('/work/')) {
    // Alternate alias route
    return { priority: '0.8', changefreq: 'monthly', title: title || `Work: ${routePath.replace('/work/', '')}` };
  }
  if (routePath === '/about') {
    return { priority: '0.85', changefreq: 'monthly', title: 'About Igor Yukhnin' };
  }
  if (routePath.includes('typography')) {
    return { priority: '0.7', changefreq: 'monthly', title: 'Design System Typography' };
  }
  if (routePath === '/privacy' || routePath === '/terms') {
    return { priority: '0.3', changefreq: 'yearly', title: 'Legal & Privacy' };
  }
  return { priority: '0.6', changefreq: 'monthly', title: title || routePath };
}

// 2. Discover Dynamic Projects from src/data.ts
function discoverProjects() {
  const projects = [];
  try {
    const dataPath = path.join(__dirname, '../src/data.ts');
    if (fs.existsSync(dataPath)) {
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      
      // Match objects inside ALL_PROJECTS array
      const projectRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?(?:hidden:\s*(true|false))?[\s\S]*?title:\s*['"]([^'"]+)['"]/g;
      let match;
      const seen = new Set();
      
      while ((match = projectRegex.exec(dataContent)) !== null) {
        const id = match[1];
        const isHidden = match[2] === 'true';
        const title = match[3];

        if (!seen.has(id) && !isHidden) {
          seen.add(id);
          projects.push({ id, title });
        }
      }
    }
  } catch (err) {
    console.warn('[sitemap] Notice: could not dynamically parse src/data.ts, using known defaults.', err.message);
  }

  // Fallback defaults if parsing was empty
  if (projects.length === 0) {
    projects.push(
      { id: 'erwin', title: 'Erwin Data Modeler' },
      { id: 'nexus', title: 'TAG Radar Mobile App' }
    );
  }

  return projects;
}

// 3. Crawl Route Structure from src/App.tsx
function crawlRoutes(projects) {
  const routes = [];
  const crawledPaths = new Set();

  try {
    const appPath = path.join(__dirname, '../src/App.tsx');
    if (fs.existsSync(appPath)) {
      const appContent = fs.readFileSync(appPath, 'utf8');
      
      // Extract <Route path="..." ... /> patterns
      const routeRegex = /<Route\s+[^>]*path=["']([^"']+)["']/g;
      let match;

      while ((match = routeRegex.exec(appContent)) !== null) {
        const rawPath = match[1];

        // Skip excluded paths
        if (EXCLUDED_ROUTES.has(rawPath)) {
          continue;
        }

        // Handle dynamic parameter routes (e.g. /case-study/:id or /work/:id)
        if (rawPath.includes(':id')) {
          projects.forEach((proj) => {
            const resolvedPath = rawPath.replace(':id', proj.id);
            if (!crawledPaths.has(resolvedPath)) {
              crawledPaths.add(resolvedPath);
              const meta = getRouteMetadata(resolvedPath, `Case Study: ${proj.title}`);
              routes.push({
                path: resolvedPath,
                ...meta
              });
            }
          });
        } else {
          const normalizedPath = rawPath === '/' ? '' : rawPath;
          if (!crawledPaths.has(normalizedPath)) {
            crawledPaths.add(normalizedPath);
            const meta = getRouteMetadata(normalizedPath);
            routes.push({
              path: normalizedPath,
              ...meta
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('[sitemap] Notice: could not crawl App.tsx, using default route list.', err.message);
  }

  // Fallback guarantee if App.tsx could not be crawled
  if (routes.length === 0) {
    routes.push(
      { path: '', ...getRouteMetadata('') },
      { path: '/about', ...getRouteMetadata('/about') },
      ...projects.map((p) => ({
        path: `/case-study/${p.id}`,
        ...getRouteMetadata(`/case-study/${p.id}`, `Case Study: ${p.title}`)
      }))
    );
  }

  // Ensure root '/' is always present first
  if (!routes.some((r) => r.path === '' || r.path === '/')) {
    routes.unshift({ path: '', ...getRouteMetadata('') });
  }

  return routes;
}

// 4. Generate Schema.org Compliant XML
function buildSitemapXml(routes) {
  const xmlItems = routes
    .map((r) => {
      const fullUrl = `${baseUrl}${r.path.startsWith('/') ? r.path : (r.path ? `/${r.path}` : '')}`;
      return `  <!-- ${r.title || r.path} -->
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlItems}
</urlset>
`;
}

// 5. Execution Pipeline
function main() {
  console.log('[sitemap] Crawling internal route structure...');
  const projects = discoverProjects();
  console.log(`[sitemap] Discovered ${projects.length} active project(s): ${projects.map((p) => p.id).join(', ')}`);

  const routes = crawlRoutes(projects);
  console.log(`[sitemap] Crawled ${routes.length} discoverable route(s) for sitemap generation.`);

  const sitemapXml = buildSitemapXml(routes);

  // Write to public/ directory
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  console.log(`[sitemap] Successfully wrote standard XML sitemap to ${publicSitemapPath}`);

  // Mirror to output directories (dist / build) if present
  ['dist', 'build'].forEach((dir) => {
    const targetDir = path.join(__dirname, '..', dir);
    if (fs.existsSync(targetDir)) {
      const targetPath = path.join(targetDir, 'sitemap.xml');
      fs.writeFileSync(targetPath, sitemapXml, 'utf8');
      console.log(`[sitemap] Mirrored sitemap to ${targetPath}`);
    }
  });

  // Verify / Sync robots.txt directive
  const robotsPath = path.join(publicDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    let robotsContent = fs.readFileSync(robotsPath, 'utf8');
    const sitemapDirective = `Sitemap: ${baseUrl}/sitemap.xml`;
    const sitemapRegex = /^Sitemap:.*$/m;

    if (sitemapRegex.test(robotsContent)) {
      robotsContent = robotsContent.replace(sitemapRegex, sitemapDirective);
    } else {
      robotsContent = robotsContent.trim() + `\n\n# Sitemap Location\n${sitemapDirective}\n`;
    }
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log(`[robots] Synced robots.txt with ${sitemapDirective}`);

    ['dist', 'build'].forEach((dir) => {
      const targetDir = path.join(__dirname, '..', dir);
      if (fs.existsSync(targetDir)) {
        fs.writeFileSync(path.join(targetDir, 'robots.txt'), robotsContent, 'utf8');
      }
    });
  }
}

main();

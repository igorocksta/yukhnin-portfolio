# Igor Yukhnin — Senior Product Designer Portfolio

Interactive portfolio showcasing high-impact product design case studies, design systems, and complex workflows across B2B SaaS, mobile, fintech, and enterprise.

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** for blazing fast bundling
- **Tailwind CSS v4** for clean, modern styling
- **Motion** (Framer Motion) for fluid interactions and page transitions
- **Three.js** for real-time 3D interactive graphics
- **Lucide Icons**
- **SEO & Structured Data** (JSON-LD, OpenGraph, dynamic sitemap & robots)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

```bash
npm install
```

### Development

Run the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Build for production with automated sitemap generation:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Type Checking & Lint

```bash
npm run lint
```

## 📁 Project Structure

```
├── public/              # Static assets, images, icons, and mockups
├── scripts/             # Build utilities (sitemap generation)
├── src/
│   ├── components/      # Modular UI components (Navbar, Hero, Showcase, etc.)
│   ├── pages/           # Route views (Home, CaseStudy, NotFound)
│   ├── context/         # App state & transition providers
│   ├── data.ts          # Portfolio data, case studies, and content
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global Tailwind styles
├── index.html           # HTML template with SEO & OpenGraph meta tags
└── vite.config.ts       # Vite configuration
```

## 🌐 Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Import your GitHub repository.
   - Vercel will automatically detect the **Vite** framework preset, output directory (`dist`), and build command (`npm run build`).
   - *(Optional)* In **Environment Variables**, add `SITE_URL` with your production domain (e.g., `https://yukhnin.design` or your `.vercel.app` URL) to generate canonical URLs and sitemap for your domain.
   - Click **Deploy**.

SPA routing, pre-rendered Open Graph tags, and edge asset caching are pre-configured via `vercel.json`.

## 📄 License

All rights reserved © Igor Yukhnin.

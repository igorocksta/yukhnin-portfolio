const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateHeroThumbnail() {
  console.log('[thumbnail-gen] Processing authentic social thumbnail from thumbnail.png...');

  // Look for thumbnail.png in public directory or project root
  let sourcePath = path.join(__dirname, '../public/thumbnail.png');
  if (!fs.existsSync(sourcePath)) {
    sourcePath = path.join(__dirname, '../thumbnail.png');
  }

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`[thumbnail-gen] Source thumbnail file not found at ${sourcePath}`);
  }

  const sourceBuffer = fs.readFileSync(sourcePath);
  console.log(`[thumbnail-gen] Found source thumbnail from ${path.basename(sourcePath)} (${sourceBuffer.length} bytes)`);

  // Ensure public/thumbnail.png and root thumbnail.png have the exact source file
  fs.writeFileSync(path.join(__dirname, '../public/thumbnail.png'), sourceBuffer);
  fs.writeFileSync(path.join(__dirname, '../thumbnail.png'), sourceBuffer);

  // Target paths in public - save pristine exact sourceBuffer
  const publicOg = path.join(__dirname, '../public/og-image.png');
  const publicHeroOg = path.join(__dirname, '../public/og-image-hero.png');
  const publicOg2x = path.join(__dirname, '../public/og-image-2x.png');

  fs.writeFileSync(publicOg, sourceBuffer);
  fs.writeFileSync(publicHeroOg, sourceBuffer);
  fs.writeFileSync(publicOg2x, sourceBuffer);
  console.log(`[thumbnail-gen] Saved authentic source to public/og-image.png & public/og-image-hero.png (${sourceBuffer.length} bytes)`);

  // Mirror to dist and build folders if they exist
  const targets = ['../dist', '../build'];
  for (const relDir of targets) {
    const dir = path.join(__dirname, relDir);
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'thumbnail.png'), sourceBuffer);
      fs.writeFileSync(path.join(dir, 'og-image.png'), sourceBuffer);
      fs.writeFileSync(path.join(dir, 'og-image-hero.png'), sourceBuffer);
      fs.writeFileSync(path.join(dir, 'og-image-2x.png'), sourceBuffer);
      console.log(`[thumbnail-gen] Mirrored thumbnails to ${relDir}/`);
    }
  }

  console.log('[thumbnail-gen] Complete! Authentic social share thumbnail replaced successfully.');
}

generateHeroThumbnail().catch(err => {
  console.error('[thumbnail-gen] Error generating hero thumbnail:', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_DIMENSION = 2560; // 4K/Retina display max dimension

async function getFiles(dir) {
  const subdirs = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    subdirs.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimize() {
  console.log('Scanning public directory:', PUBLIC_DIR);
  const allFiles = await getFiles(PUBLIC_DIR);
  
  const imageFiles = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to examine.`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;

  for (const filePath of imageFiles) {
    const stat = await fs.promises.stat(filePath);
    totalOriginalSize += stat.size;
    const relPath = path.relative(PUBLIC_DIR, filePath);

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      const ext = path.extname(filePath).toLowerCase();
      const isJpegExt = ext === '.jpg' || ext === '.jpeg';
      const isActuallyJpeg = metadata.format === 'jpeg';
      const hasAlpha = Boolean(metadata.hasAlpha);

      // Determine resize need
      const needsResize = (metadata.width && metadata.width > MAX_DIMENSION) || 
                          (metadata.height && metadata.height > MAX_DIMENSION);

      // If it's already tiny (< 80KB) and doesn't need resize, skip
      if (stat.size < 80 * 1024 && !needsResize) {
        totalOptimizedSize += stat.size;
        continue;
      }

      let pipeline = sharp(filePath);
      if (needsResize) {
        pipeline = pipeline.resize({
          width: MAX_DIMENSION,
          height: MAX_DIMENSION,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Configure high-quality encoding (visually indistinguishable from original)
      if (isJpegExt || (isActuallyJpeg && !hasAlpha)) {
        pipeline = pipeline.jpeg({
          quality: 86,
          mozjpeg: true,
          progressive: true,
        });
      } else {
        // PNG
        pipeline = pipeline.png({
          compressionLevel: 9,
          effort: 8,
          adaptiveFiltering: true,
        });
      }

      const tempFile = filePath + '.tmp_opt';
      const info = await pipeline.toFile(tempFile);

      if (info.size < stat.size) {
        await fs.promises.rename(tempFile, filePath);
        totalOptimizedSize += info.size;
        optimizedCount++;
        const savedPercent = (((stat.size - info.size) / stat.size) * 100).toFixed(1);
        console.log(
          `✓ ${relPath} [${metadata.width}x${metadata.height} -> ${info.width}x${info.height}]: ` +
          `${(stat.size / 1024 / 1024).toFixed(2)}MB -> ${(info.size / 1024 / 1024).toFixed(2)}MB (-${savedPercent}%)`
        );
      } else {
        // Optimization did not reduce size; keep original
        await fs.promises.unlink(tempFile);
        totalOptimizedSize += stat.size;
      }
    } catch (err) {
      console.error(`Error optimizing ${relPath}:`, err.message);
      totalOptimizedSize += stat.size;
    }
  }

  const savedTotalMB = (totalOriginalSize - totalOptimizedSize) / 1024 / 1024;
  const savedTotalPercent = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1);
  console.log('\n--- Optimization Summary ---');
  console.log(`Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${savedTotalMB.toFixed(2)} MB (-${savedTotalPercent}%) across ${optimizedCount} images.`);
}

optimize().catch((err) => {
  console.error('Fatal error during optimization:', err);
  process.exit(1);
});

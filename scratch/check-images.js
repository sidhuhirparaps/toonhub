import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature is 8 bytes. IHDR chunk starts at byte 12. Width is at 16, Height at 20 (4 bytes each, big-endian)
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  return { width, height };
}

const publicDir = path.join(__dirname, '..', 'public');
const images = ['webdev_jolly.png', 'edit_jolly.png', 'Automation.png', 'ecommerce.png'];

images.forEach(img => {
  try {
    const dims = getPngDimensions(path.join(publicDir, img));
    console.log(`${img}: ${dims.width}x${dims.height} (Aspect Ratio: ${(dims.width / dims.height).toFixed(3)})`);
  } catch (err) {
    console.log(`${img}: Error reading (${err.message})`);
  }
});

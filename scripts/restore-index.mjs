import { copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Restore index.html from source template
copyFileSync(join(root, 'index.source.html'), join(root, 'index.html'));
console.log('Restored index.html from template for local development.');

// Clean up duplicate build assets in root so they don't show up in git
const filesToClean = [
  'Automation.png',
  'ecommerce.png',
  'edit_jolly.png',
  'webdev_jolly.png',
  'favicon.svg',
];

for (const file of filesToClean) {
  const filePath = join(root, file);
  if (existsSync(filePath)) {
    rmSync(filePath, { force: true });
    console.log(`Cleaned up build duplicate: ${file}`);
  }
}

const assetsPath = join(root, 'assets');
if (existsSync(assetsPath)) {
  rmSync(assetsPath, { recursive: true, force: true });
  console.log('Cleaned up build assets directory.');
}

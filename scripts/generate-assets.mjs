/**
 * Renders the PNG icons and the Open Graph image from SVG sources.
 * Run with: npm run assets   (only needed when the artwork changes)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (file) => path.join(root, 'public', file);

async function render(svgPath, outFile, width, { pad = 0, background } = {}) {
  let svg = await readFile(svgPath, 'utf8');
  if (pad) {
    // Wrap the icon in safe-zone padding for maskable icons.
    const inner = svg.replace(/<\?xml[^>]*>/, '');
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${64 + pad * 2} ${64 + pad * 2}">
      <rect width="100%" height="100%" fill="${background}"/>
      <svg x="${pad}" y="${pad}" width="64" height="64">${inner}</svg></svg>`;
  }
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  })
    .render()
    .asPng();
  await writeFile(pub(outFile), png);
  console.log(`✓ ${outFile} (${(png.length / 1024).toFixed(1)} kB)`);
}

const icon = pub('favicon.svg');
await render(icon, 'apple-touch-icon.png', 180);
await render(icon, 'icon-192.png', 192);
await render(icon, 'icon-512.png', 512);
await render(icon, 'icon-512-maskable.png', 512, { pad: 14, background: '#0a0d12' });
await render(path.join(root, 'scripts/assets/og-image.svg'), 'og-image.png', 1200);

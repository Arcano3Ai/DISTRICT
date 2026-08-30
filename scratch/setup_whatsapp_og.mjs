import fs from 'fs';
import path from 'path';

const generatedOgImg = 'C:/Users/sergi/.gemini/antigravity-ide/brain/a942c1b9-1d78-44db-8a15-15c77d0ae03a/og_whatsapp_district_1788100435556.jpg';

const targets = [
  'public/og-image.png',
  'public/og-image.jpg',
  'public/whatsapp-logo.png',
  'public/whatsapp-share.png',
  'dist/og-image.png',
  'dist/og-image.jpg',
  'dist/whatsapp-logo.png',
  'dist/whatsapp-share.png'
];

targets.forEach(t => {
  const dest = path.resolve(t);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(generatedOgImg, dest);
  console.log(`Copied WhatsApp preview image to ${t}`);
});

console.log('WhatsApp OG assets configured successfully.');

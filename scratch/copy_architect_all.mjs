import fs from 'fs';
import path from 'path';

const userImg = 'C:/Users/sergi/Downloads/Imagen de Codex 30 ago 2026, 08_14_50.png';
const generatedImg = 'C:/Users/sergi/.gemini/antigravity-ide/brain/a942c1b9-1d78-44db-8a15-15c77d0ae03a/architect_jaime_facundo_1788099274668.jpg';

const targets = [
  'public/architect.png',
  'public/architect.jpg',
  'dist/architect.png',
  'dist/architect.jpg'
];

targets.forEach(t => {
  const dest = path.resolve(t);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  
  if (fs.existsSync(userImg)) {
    fs.copyFileSync(userImg, dest);
    console.log(`Copied user image to ${t}`);
  } else if (fs.existsSync(generatedImg)) {
    fs.copyFileSync(generatedImg, dest);
    console.log(`Copied generated image to ${t}`);
  }
});

console.log('Copy operation completed.');

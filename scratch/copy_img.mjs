import fs from 'fs';
import path from 'path';

const srcImg = 'C:/Users/sergi/.gemini/antigravity-ide/brain/a942c1b9-1d78-44db-8a15-15c77d0ae03a/architect_jaime_facundo_1788099274668.jpg';
const destPublic = path.resolve('public/architect.jpg');
const destDist = path.resolve('dist/architect.jpg');
const destSrc = path.resolve('src/assets/architect.jpg');

fs.mkdirSync(path.dirname(destSrc), { recursive: true });
fs.copyFileSync(srcImg, destPublic);
fs.copyFileSync(srcImg, destDist);
fs.copyFileSync(srcImg, destSrc);
console.log('Successfully copied architect portrait to public, dist, and src/assets!');

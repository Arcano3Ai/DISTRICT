import fs from 'fs';
import path from 'path';

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const distDir = path.resolve('dist');
const docsDir = path.resolve('docs');

if (fs.existsSync(distDir)) {
  copyDirSync(distDir, docsDir);
  console.log('Successfully synced dist build output to docs/ folder for GitHub Pages!');
} else {
  console.log('dist directory not found.');
}

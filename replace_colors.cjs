const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    const ext = path.extname(filePath);
    if (!['.tsx', '.ts', '.css', '.html'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Cyan rgb to Gold rgb
    content = content.replace(/0,163,196/g, '212,175,55');
    content = content.replace(/0, 163, 196/g, '212, 175, 55');
    
    // Light cyan rgb to Light gold rgb
    content = content.replace(/0,212,255/g, '226,194,117');
    content = content.replace(/0, 212, 255/g, '226, 194, 117');

    // Hex replacements
    content = content.replace(/#00d4ff/gi, '#e2c275');
    content = content.replace(/#00A3C4/gi, '#D4AF37');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else {
            replaceInFile(fullPath);
        }
    }
}

walkDir(path.join(__dirname, 'src'));
console.log('Color replacement complete.');

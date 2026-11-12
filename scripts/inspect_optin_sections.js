const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Find all image tags in index.html
const imgs = [...index.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi)];
console.log('Total images in index.html:', imgs.length);
imgs.forEach((m, idx) => {
    console.log(`${idx + 1}: src="${m[1]}" | alt="${m[2]}"`);
});

// Find all sections in index.html
const sections = [...index.matchAll(/<section[^>]*id=["']?([^"'\s>]+)?["']?[^>]*>/gi)];
console.log('\nSections in index.html:');
sections.forEach((s, idx) => {
    console.log(`${idx + 1}: id="${s[1] || 'no-id'}" -> ${s[0].substring(0, 80)}`);
});


const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');
const idx = html.indexOf('young_lady_hawking_corn');
console.log(html.slice(idx - 100, idx + 1200));

const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');
const idx = html.indexOf('alumni-showcase');
console.log(html.slice(idx - 150, idx + 400));


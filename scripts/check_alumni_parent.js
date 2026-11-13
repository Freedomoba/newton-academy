const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const idx = html.indexOf('id="alumni-showcase"');
console.log(html.slice(idx - 250, idx + 100));


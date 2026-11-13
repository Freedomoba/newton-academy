const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const idx = html.indexOf('const letter = document.getElementById');
console.log(html.slice(idx - 300, idx + 1500));


const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('Conference Pass Confirmed!');
console.log(html.slice(idx - 200, idx + 800));


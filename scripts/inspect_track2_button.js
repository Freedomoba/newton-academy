const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');
const lines = html.split('\n');
console.log(lines.slice(205, 235).join('\n'));


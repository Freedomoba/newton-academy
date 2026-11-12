const fs = require('fs');
const s = fs.readFileSync('scholarship.html', 'utf8');
const idx = s.indexOf('Classified Council Dispatch');
console.log(JSON.stringify(s.substring(idx - 150, idx + 100)));

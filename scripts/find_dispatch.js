const fs = require('fs');
const s = fs.readFileSync('scholarship.html', 'utf8');
const idx = s.indexOf('Classified Council Dispatch');
console.log(s.substring(idx - 100, idx + 200));

const fs = require('fs');

const s = fs.readFileSync('scholarship.html', 'utf8');
const lines = s.split('\n');
console.log('--- scholarship.html line 85-105 ---');
console.log(lines.slice(84, 105).join('\n'));
console.log('--- scholarship.html line 855-875 ---');
console.log(lines.slice(855, 875).join('\n'));

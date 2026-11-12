const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const pos1 = index.indexOf('Convened by Newton Academy');
const pos2 = index.indexOf('Real Experiences from');
const pos3 = index.indexOf('Student & Faculty Video Interviews');

console.log('pos1 (Convened by...):', pos1);
console.log('pos2 (Real Experiences...):', pos2);
console.log('pos3 (Student & Faculty...):', pos3);

// Let's print the 500 characters preceding pos1, pos2, and pos3
console.log('=== Preceding pos1 ===');
console.log(index.substring(Math.max(0, pos1 - 500), pos1 + 100));

console.log('=== Preceding pos2 ===');
console.log(index.substring(Math.max(0, pos2 - 500), pos2 + 100));

console.log('=== Preceding pos3 ===');
console.log(index.substring(Math.max(0, pos3 - 500), pos3 + 100));

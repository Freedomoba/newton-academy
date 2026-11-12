const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const t1 = index.indexOf('Convened by Newton Academy. Taught by');
const t2 = index.indexOf('Real Experiences from');
const t3 = index.indexOf('Student &amp; Faculty Video Interviews');

console.log('t1:', t1, 't2:', t2, 't3:', t3);

// Let's print the parent sections
const s1 = index.substring(t1 - 100, t1 + 300);
console.log('s1:\n', s1);

const s2 = index.substring(t2 - 100, t2 + 300);
console.log('s2:\n', s2);

const s3 = index.substring(t3 - 100, t3 + 300);
console.log('s3:\n', s3);

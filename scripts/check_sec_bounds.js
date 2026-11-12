const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const t1 = index.indexOf('Convened by Newton Academy. Taught by');
const t2 = index.indexOf('Real Experiences from');
const t3 = index.indexOf('Student &amp; Faculty Video Interviews');

// Find the <section tag before t1
const sec1Start = index.lastIndexOf('<section', t1);
const sec1End = index.indexOf('</section>', t1);

// Find the <section tag before t2
const sec2Start = index.lastIndexOf('<section', t2);
const sec2End = index.indexOf('</section>', t2);

// Find the <section tag before t3
const sec3Start = index.lastIndexOf('<section', t3);
const sec3End = index.indexOf('</section>', t3);

console.log('Section 1 (Faculty):', sec1Start, 'to', sec1End);
console.log('Section 2 (Reviews):', sec2Start, 'to', sec2End);
console.log('Section 3 (Videos):', sec3Start, 'to', sec3End);

// Check if section 1 ends BEFORE section 2 starts:
console.log('Does Sec 1 end before Sec 2 starts?', sec1End < sec2Start);
console.log('Does Sec 2 end before Sec 3 starts?', sec2End < sec3Start);

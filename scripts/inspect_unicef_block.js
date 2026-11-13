const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const unicefIdx = html.indexOf('Empowering Women & Girls In Tech');
// find the div that starts UNICEF
const unicefDivStart = html.lastIndexOf('<div class="relative rounded-3xl', unicefIdx);
const unicefDivEnd = html.indexOf('<!-- Curvy Bottom Wave Transition', unicefIdx);

console.log('UNICEF starts at:', unicefDivStart, 'ends around:', unicefDivEnd);
console.log(html.slice(unicefDivStart, unicefDivStart + 300));


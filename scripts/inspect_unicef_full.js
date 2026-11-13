const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const unicefIdx = html.indexOf('Empowering Women & Girls In Tech');
console.log(html.slice(unicefIdx - 200, unicefIdx + 2000));


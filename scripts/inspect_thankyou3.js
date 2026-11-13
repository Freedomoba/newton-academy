const fs = require('fs');
const html = fs.readFileSync('thank-you.html', 'utf8');
console.log(html.slice(4500));


const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const idx = html.indexOf('From Hawking Boiled Corn');
console.log('Story heading at:', idx);
console.log(html.slice(idx - 600, idx + 200));


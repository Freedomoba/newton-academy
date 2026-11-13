const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const aminatIdx = html.indexOf('young_lady_hawking_corn');
console.log('Context before young_lady_hawking_corn:');
console.log(html.slice(aminatIdx - 1000, aminatIdx));

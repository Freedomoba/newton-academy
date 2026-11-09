const fs = require('fs');
const c = fs.readFileSync('curriculum-de.html', 'utf8');
const idx = c.indexOf('Integrated Lumenvox AI');
console.log('Index:', idx);
console.log(c.slice(idx - 300, idx + 600));


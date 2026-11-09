const fs = require('fs');
const c = fs.readFileSync('thank-you.html', 'utf8');
const envIdx = c.indexOf('envelopeSection');
console.log(c.slice(envIdx - 50, envIdx + 1200));


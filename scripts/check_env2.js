const fs = require('fs');
const c = fs.readFileSync('thank-you.html', 'utf8');
console.log('scholarshipEnvelopeCard index:', c.indexOf('scholarshipEnvelopeCard'));
console.log('envelope index:', c.indexOf('envelope'));

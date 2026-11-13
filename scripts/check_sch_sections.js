const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

console.log('scholarship.html length:', html.length);
console.log('Contains alumni-showcase:', html.includes('id="alumni-showcase"'));
console.log('Contains confidentialEnvelope:', html.includes('id="confidentialEnvelope"'));
console.log('Contains officialScholarshipForm:', html.includes('id="officialScholarshipForm"'));

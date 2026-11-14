const fs = require('fs');
const c = fs.readFileSync('scholarship.html', 'utf8');

const fStart = c.indexOf('id="officialScholarshipForm"');
const fEnd = c.indexOf('</form>', fStart);
const formHtml = c.substring(fStart, fEnd);

const reqs = formHtml.match(/<[^>]+required[^>]*>/gi) || [];
console.log('Required fields in form:');
reqs.forEach(r => console.log('  ', r));

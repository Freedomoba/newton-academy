const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const regex = /officialSalesLetter|startScholarshipEvaluation|door/gi;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log('scholarship.html match at', m.index, ':', m[0]);
    console.log(html.slice(Math.max(0, m.index - 50), m.index + 120));
}


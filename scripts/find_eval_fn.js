const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const regex = /startScholarshipEvaluation/g;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log('Match at index:', m.index);
    console.log(html.slice(Math.max(0, m.index - 100), m.index + 200));
}


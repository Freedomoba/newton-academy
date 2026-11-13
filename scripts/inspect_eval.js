const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const evalIdx = html.indexOf('startScholarshipEvaluation');
if (evalIdx !== -1) {
    console.log(html.slice(evalIdx - 200, evalIdx + 3000));
}


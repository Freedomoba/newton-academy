const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const submitIdx = html.indexOf("addEventListener('submit'");
if (submitIdx !== -1) {
    console.log(html.slice(submitIdx - 100, submitIdx + 2500));
} else {
    const submitIdx2 = html.indexOf('officialScholarshipForm');
    const nextScript = html.indexOf('<script', submitIdx2);
    console.log(html.slice(nextScript, nextScript + 2500));
}


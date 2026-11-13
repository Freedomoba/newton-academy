const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const regex = /id=["']([^"']*(?:modal|eval|load|popup|prog)[^"']*)["']/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log('Found id:', match[1]);
}

// Find where form submission is handled in scholarship.html
const formScriptIdx = html.indexOf('officialScholarshipForm');
if (formScriptIdx !== -1) {
    console.log('\n--- Script around officialScholarshipForm ---');
    console.log(html.slice(formScriptIdx - 200, formScriptIdx + 1200));
}


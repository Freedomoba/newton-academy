const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const letterIdx = html.indexOf('Dear <span id="storyRecipientName"');
console.log('Letter intro at:', letterIdx);
console.log(html.slice(letterIdx - 400, letterIdx + 200));

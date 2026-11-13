const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const imgIdx = html.indexOf('unicef_women_tech_collaboration.jpg');
console.log(html.slice(imgIdx, imgIdx + 600));

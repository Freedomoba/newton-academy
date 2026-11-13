const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const submitIdx = html.indexOf("form.addEventListener('submit'");
console.log(html.slice(submitIdx + 2600, submitIdx + 3600));


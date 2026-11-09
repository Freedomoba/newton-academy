const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const formIdx = content.indexOf('</form>');
console.log(content.slice(formIdx, formIdx + 1200));


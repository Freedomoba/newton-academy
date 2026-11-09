const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const formIdx = content.indexOf('optinForm');
console.log('Optin form index:', formIdx);
console.log(content.slice(formIdx - 200, formIdx + 800));

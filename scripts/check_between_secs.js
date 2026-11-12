const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

console.log('=== Between Sec 1 and Sec 2 ===');
console.log(index.substring(29550, 29872));

console.log('=== Between Sec 2 and Sec 3 ===');
console.log(index.substring(35444, 35968));

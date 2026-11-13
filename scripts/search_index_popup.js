const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /modal|loading|screening|evaluat|progress|popup/gi;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log('index.html match at', m.index, ':', m[0]);
    console.log(html.slice(Math.max(0, m.index - 50), m.index + 100));
}

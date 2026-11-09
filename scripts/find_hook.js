const fs = require('fs');
const c = fs.readFileSync('thank-you.html', 'utf8');
const hookIdx = c.indexOf('In the next 5 minutes');
console.log('hookIdx:', hookIdx);
console.log(c.slice(hookIdx - 200, hookIdx + 400));

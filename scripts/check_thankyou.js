const fs = require('fs');
const c = fs.readFileSync('thank-you.html', 'utf8');
const idx = c.indexOf('Discover How You Can');
console.log('Discover index:', idx);
if (idx !== -1) {
    console.log(c.slice(idx - 200, idx + 400));
}

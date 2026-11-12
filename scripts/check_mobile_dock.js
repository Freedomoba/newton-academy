const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const p = index.indexOf('MOBILE STICKY APP DOCK');
if (p !== -1) {
    console.log(index.substring(p, p + 800));
} else {
    console.log('No MOBILE STICKY APP DOCK found');
}

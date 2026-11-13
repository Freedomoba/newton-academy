const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const unicefIdx = html.indexOf('Empowering Women & Girls In Tech');
const storyIdx = html.indexOf('Meet Aminat');
console.log('UNICEF section index:', unicefIdx);
console.log('Story section index:', storyIdx);

if (unicefIdx !== -1) {
    console.log('\n--- UNICEF Section snippet ---');
    console.log(html.slice(unicefIdx - 200, unicefIdx + 800));
}


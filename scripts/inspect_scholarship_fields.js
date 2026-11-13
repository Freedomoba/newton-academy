const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

// Find Mode of Learning
const modeIdx = html.indexOf('Preferred Mode of Learning');
if (modeIdx !== -1) {
    console.log('Mode of Learning found:');
    console.log(html.slice(modeIdx - 150, modeIdx + 500));
}

// Find UNICEF section
const unicefIdx = html.indexOf('Empowering Women & Girls In Tech');
console.log('\nUNICEF section found at:', unicefIdx);


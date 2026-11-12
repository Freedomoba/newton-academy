const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const matches = [...index.matchAll(/Championing Women, Girls &amp; Inclusive Digital Leadership/gi)];
console.log('UNICEF headings count in index.html:', matches.length);

if (matches.length > 1) {
    // Keep only the first one
    const firstPos = matches[0].index;
    const secondPos = matches[1].index;
    
    // Find section bounds of second
    const secStart = index.lastIndexOf('<section', secondPos);
    const secEnd = index.indexOf('</section>', secondPos) + '</section>'.length;
    
    const cleaned = index.substring(0, secStart) + index.substring(secEnd);
    fs.writeFileSync('index.html', cleaned, 'utf8');
    console.log('Removed duplicate UNICEF section from index.html!');
}


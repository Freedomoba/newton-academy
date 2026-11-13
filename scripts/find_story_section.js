const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const aminatIdx = html.indexOf('young_lady_hawking_corn');
console.log('young_lady_hawking_corn at:', aminatIdx);

// Look backwards from aminatIdx to find the enclosing section tag
const prevSection = html.lastIndexOf('<section', aminatIdx);
console.log('Enclosing section starts at:', prevSection);
console.log(html.slice(prevSection, prevSection + 400));

// Find where this story section ends
const nextSection = html.indexOf('</section>', aminatIdx);
console.log('Enclosing section ends at:', nextSection);
console.log(html.slice(nextSection - 100, nextSection + 50));


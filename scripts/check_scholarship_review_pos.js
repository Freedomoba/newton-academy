const fs = require('fs');

const s = fs.readFileSync('scholarship.html', 'utf8');

// Search for reviews or testimonials section
const idx = s.indexOf('id="videoInterviewsSection"');
console.log('videoInterviewsSection at:', idx);
const idx2 = s.indexOf('100 Documented Fellow Reviews');
console.log('100 Documented Fellow Reviews at:', idx2);
if (idx2 !== -1) {
    console.log(s.substring(idx2 - 100, idx2 + 400));
}


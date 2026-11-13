const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

// Find start of Story of Aminat
const storyStart = html.indexOf('<!-- THE STORY OF AMINAT');
const storyStart2 = html.indexOf('Story of Aminat');
console.log('Story comment at:', storyStart, 'text at:', storyStart2);

if (storyStart !== -1) {
    console.log('Story section start snippet:');
    console.log(html.slice(storyStart, storyStart + 400));
}

// Find UNICEF section start and end
const unicefStart = html.indexOf('<!-- UNICEF');
const unicefStart2 = html.indexOf('Empowering Women & Girls In Tech');
console.log('\nUNICEF comment at:', unicefStart, 'text at:', unicefStart2);

if (unicefStart !== -1) {
    console.log('UNICEF section start snippet:');
    console.log(html.slice(unicefStart, unicefStart + 500));
    const nextSection = html.indexOf('</section>', unicefStart);
    console.log('\nUNICEF section end snippet:');
    console.log(html.slice(nextSection - 100, nextSection + 50));
}


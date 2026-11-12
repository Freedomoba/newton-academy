const fs = require('fs');

function checkHtmlIntegrity(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\n');
    
    // Check unclosed tags for div, section, main, header, footer
    const tagsToCheck = ['div', 'section', 'main', 'header', 'footer', 'form'];
    const counts = {};
    
    tagsToCheck.forEach(tag => {
        const openRegex = new RegExp('<' + tag + '(\\s|>)[^>]*>', 'gi');
        const closeRegex = new RegExp('</' + tag + '>', 'gi');
        const openCount = (content.match(openRegex) || []).length;
        const closeCount = (content.match(closeRegex) || []).length;
        counts[tag] = { open: openCount, close: closeCount, diff: openCount - closeCount };
    });
    
    console.log(`=== ${filename} Integrity Check ===`);
    let allBalanced = true;
    for (const [tag, data] of Object.entries(counts)) {
        if (data.diff !== 0) {
            allBalanced = false;
            console.warn(`  Mismatch in <${tag}>: ${data.open} open vs ${data.close} close (diff: ${data.diff})`);
        }
    }
    if (allBalanced) {
        console.log('  All structural tags are perfectly balanced!');
    }
    return allBalanced;
}

const files = [
    'index.html',
    'scholarship.html',
    'special-offer.html',
    'upsell.html',
    'thank-you.html',
    'curriculum-de.html',
    'curriculum-dm.html'
];

files.forEach(checkHtmlIntegrity);

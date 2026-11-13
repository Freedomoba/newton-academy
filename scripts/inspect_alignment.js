const fs = require('fs');

function inspectPage(file) {
    console.log(`\n=================== ${file} ===================`);
    const c = fs.readFileSync(file, 'utf8');
    const lines = c.split('\n');

    lines.forEach((l, idx) => {
        if (/<section|<header|<footer|<main|<article/i.test(l)) {
            // Find the immediate next container with max-w
            let nextContainer = '';
            for (let j = idx; j < Math.min(idx + 15, lines.length); j++) {
                if (lines[j].includes('max-w-')) {
                    nextContainer = lines[j].trim();
                    break;
                }
            }
            console.log(`L${idx+1}: ${l.trim().substring(0, 60)}  ==>  ${nextContainer.substring(0, 70)}`);
        }
    });
}

['index.html', 'scholarship.html', 'curriculum-dm.html', 'curriculum-de.html', 'checkout.html'].forEach(inspectPage);

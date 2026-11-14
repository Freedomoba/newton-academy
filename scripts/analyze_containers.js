const fs = require('fs');

function analyzeFile(file) {
    console.log(`\n================== ${file} ==================`);
    const c = fs.readFileSync(file, 'utf8');
    const lines = c.split('\n');

    lines.forEach((l, i) => {
        if (/class="[^"]*max-w-[^"]*"/i.test(l)) {
            const match = l.match(/class="([^"]*max-w-[^"]*)"/i);
            // check if it's a section or main container
            if (/mx-auto/i.test(match[1])) {
                console.log(`Line ${i+1}: ${match[1]}`);
            }
        }
    });
}

['index.html', 'scholarship.html', 'curriculum-dm.html', 'curriculum-de.html', 'checkout.html'].forEach(analyzeFile);


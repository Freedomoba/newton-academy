const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

let depth = 0;
const stack = [];

lines.forEach((line, lineIdx) => {
    // Look for <div or </div>
    const divTokens = [...line.matchAll(/<\/?div\b[^>]*>/gi)];
    divTokens.forEach(t => {
        const token = t[0];
        if (token.startsWith('</')) {
            depth--;
            if (depth < 0) {
                console.log(`EXTRA </div> at line ${lineIdx + 1}: ${line.trim()}`);
                depth = 0; // reset
            }
        } else {
            // Check if self-closing (rare for div, e.g. <div/>)
            if (!token.endsWith('/>')) {
                depth++;
            }
        }
    });
});

console.log('Final div depth at end of file:', depth);

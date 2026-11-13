const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        // If line has a heading tag <h1, <h2, <h3
        if (/<h[1-4]/i.test(line)) {
            // Check previous 5 non-empty lines for pill/badge
            for (let j = Math.max(0, i - 6); j < i; j++) {
                const prev = lines[j];
                if (/(?:rounded-full|tracking-wid|uppercase text-\[10px\]|uppercase text-xs).*?(?:span|div)/i.test(prev)) {
                    console.log(`Preheading pill before heading in ${f}:${j + 1} -> ${prev.trim()}`);
                    console.log(`   Heading at ${i + 1}: ${line.trim()}`);
                }
            }
        }
    });
});


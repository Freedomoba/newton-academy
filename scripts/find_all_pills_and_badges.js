const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));

files.forEach(f => {
    const s = fs.readFileSync(f, 'utf8');
    const lines = s.split('\n');
    lines.forEach((line, i) => {
        if (/rounded-full|uppercase tracking-wider|tracking-widest/i.test(line) && /<span|<div/i.test(line) && !/<!--/.test(line)) {
            // Check if it looks like a pill or badge
            if (/bg-|border|text-xs|text-\[10px\]|text-\[11px\]/i.test(line)) {
                console.log(`${f}:${i+1} -> ${line.trim()}`);
            }
        }
    });
});


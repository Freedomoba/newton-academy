const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));
files.forEach(f => {
    const s = fs.readFileSync(f, 'utf8');
    const lines = s.split('\n');
    lines.forEach((line, i) => {
        if (/100%|FULL TUITION|SCHOLARSHIP ENDOWMENT|TRACK 01|TRACK 02/i.test(line) && /<span|<div|<p/i.test(line) && !/<!--/.test(line)) {
            console.log(`${f}:${i+1} -> ${line.trim()}`);
        }
    });
});


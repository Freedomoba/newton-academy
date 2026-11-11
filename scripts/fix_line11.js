const fs = require('fs');
const path = require('path');

['index.html', 'index.php'].forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    let raw = fs.readFileSync(fullPath, 'utf8');

    // Split on \n (handles both \r\n and \n)
    let lines = raw.split(/\r?\n/);

    // Find and replace og:title line
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('property="og:title"')) {
            lines[i] = '    <meta property="og:title" content="From Skills to Income: Virtual Conference by Newton Academy">';
            console.log(`Found og:title at line ${i + 1} in ${file} - replaced!`);
        }
    }

    // Find and remove Top Announcement Bar lines
    let newLines = [];
    let skipping = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Top Announcement Bar')) {
            skipping = true;
            continue;
        }
        if (skipping && lines[i].includes('<header')) {
            skipping = false;
        }
        if (!skipping) {
            newLines.push(lines[i]);
        }
    }

    fs.writeFileSync(fullPath, newLines.join('\r\n'), 'utf8');
    console.log(`Successfully updated ${file}`);
});


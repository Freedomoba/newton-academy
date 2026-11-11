const fs = require('fs');
const path = require('path');

['index.html', 'index.php'].forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    let c = fs.readFileSync(fullPath, 'utf8');

    // 1. Fix the broken og:title meta tag (replace with clean plain text)
    c = c.replace(
        /<meta property="og:title" content="From Skills to[\s\S]*?Get Ahead">/g,
        '<meta property="og:title" content="From Skills to Income: Virtual Conference by Newton Academy">'
    );

    // 2. Remove the top announcement bar section entirely
    const announcementBarPattern = /\s*<!-- Top Announcement Bar[\s\S]*?<\/div>\s*(?=<header)/m;
    c = c.replace(announcementBarPattern, '\n\n    ');

    fs.writeFileSync(fullPath, c, 'utf8');
    console.log(`Cleaned meta tag and removed announcement bar from ${file}`);
});


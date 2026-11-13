const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php') || f.endsWith('.js'));
files.forEach(f => {
    try {
        const c = fs.readFileSync(f, 'utf8');
        ['congrat', 'evaluat', 'screening', 'progress-bar', 'modal'].forEach(keyword => {
            if (c.toLowerCase().includes(keyword)) {
                console.log(f, 'contains:', keyword);
            }
        });
    } catch(e) {}
});


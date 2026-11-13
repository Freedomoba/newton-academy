const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));
files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes('Preferred Mode of Learning') || c.includes('Mode of Learning') || c.includes('learning_mode')) {
        console.log('File has learning mode field:', f);
    }
});


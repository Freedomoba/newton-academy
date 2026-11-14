const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));
files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const scriptRegex = /<script(?:\s+[^>]*?)?>([\s\S]*?)<\/script>/gi;
    let m;
    let sCount = 0;
    while ((m = scriptRegex.exec(c)) !== null) {
        sCount++;
        const isExternal = /src\s*=/i.test(m[0]);
        if (!isExternal && m[1].trim()) {
            // Strip PHP tags for testing syntax in PHP files
            let jsCode = m[1].replace(/<\?php[\s\S]*?\?>/g, '""');
            try {
                new Function(jsCode);
                // console.log(`[${f}] Script #${sCount} OK`);
            } catch (err) {
                console.error(`[${f}] Script #${sCount} has SYNTAX ERROR:`, err.message);
            }
        }
    }
});

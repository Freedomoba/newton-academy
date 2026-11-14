const fs = require('fs');

['scholarship.html', 'scholarship.php'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace the malformed envelope listener that has the duplicate });
    const oldBlock = `            if (envelope && letter) {
                envelope.addEventListener('click', function() {
                if (typeof window.triggerDoorOpeningAndRain === 'function') {
                    window.triggerDoorOpeningAndRain(null, function() {
                        letter.scrollIntoView({ behavior: 'smooth' });
                    });
                } else {
                    letter.scrollIntoView({ behavior: 'smooth' });
                }
            });
                });
            }`;

    const newBlock = `            if (envelope && letter) {
                envelope.addEventListener('click', function() {
                    if (typeof window.triggerDoorOpeningAndRain === 'function') {
                        window.triggerDoorOpeningAndRain(null, function() {
                            letter.scrollIntoView({ behavior: 'smooth' });
                        });
                    } else {
                        letter.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }`;

    // Normalize line endings for replacement
    const normalizedContent = content.replace(/\r\n/g, '\n');
    const normalizedOld = oldBlock.replace(/\r\n/g, '\n');
    const normalizedNew = newBlock.replace(/\r\n/g, '\n');

    if (normalizedContent.includes(normalizedOld)) {
        content = normalizedContent.replace(normalizedOld, normalizedNew);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`[${file}] Fixed duplicate }); syntax error successfully`);
    } else {
        console.log(`[${file}] Warning: could not find exact block, checking regex`);
        // Regex replacement
        const regex = /envelope\.addEventListener\('click',\s*function\(\)\s*\{[\s\S]*?letter\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\);\s*\}\s*else\s*\{[\s\S]*?letter\.scrollIntoView\(\{ behavior: 'smooth' \}\);\s*\}\s*\}\);\s*\}\);\s*\}/;
        if (regex.test(content)) {
            content = content.replace(regex, `envelope.addEventListener('click', function() {
                    if (typeof window.triggerDoorOpeningAndRain === 'function') {
                        window.triggerDoorOpeningAndRain(null, function() {
                            letter.scrollIntoView({ behavior: 'smooth' });
                        });
                    } else {
                        letter.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`[${file}] Fixed via regex`);
        }
    }
});

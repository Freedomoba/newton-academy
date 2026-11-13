const fs = require('fs');

function fixFiles() {
    // 1. scholarship.html and scholarship.php
    ['scholarship.html', 'scholarship.php'].forEach(file => {
        let content = fs.readFileSync(file, 'utf8');

        // Fix extra div after unicef
        content = content.replace(
            /(<\/div>\s*<\/div>)\s*<\/div>\s*(?=\s*<!-- INLINE NARRATIVE 1)/,
            '$1'
        );

        // Fix missing closing divs in evaluationModal
        content = content.replace(
            /(Please do not close this window\. Processing official certificate\.\.\.)\s*(?=\s*<\/body>)/,
            '$1\n            </div>\n        </div>\n    </div>\n'
        );

        fs.writeFileSync(file, content, 'utf8');
    });

    // 2. special-offer.html, special-offer.php, upsell.html, upsell.php
    ['special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(file => {
        let content = fs.readFileSync(file, 'utf8');

        // Check for extra divs after unicef
        content = content.replace(
            /(<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*(?=\s*<!-- INSPIRING MOMENTUM)/,
            '$1\n'
        );

        fs.writeFileSync(file, content, 'utf8');
    });
}

fixFiles();
console.log('Fixed tags');


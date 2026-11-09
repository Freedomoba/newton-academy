const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'thank-you.html', 'checkout.html',
    'curriculum-de.html', 'curriculum-dm.html', 'success.html'
];

let hasErrors = false;

files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(fullPath, 'utf8');

    // 1. Check for stray broken meta tag
    if (content.includes('Income: Building Your Brand, Growing Your Business & Using AI to Get Ahead">')) {
        console.error(`ERROR: Stray meta tag text found in ${file}`);
        hasErrors = true;
    }

    // 2. Check for long emdashes
    if (content.includes('—') || content.includes('&mdash;') || content.includes(' -- ')) {
        console.warn(`WARNING: Emdash found in ${file}`);
    }

    // 3. Check for preheadings before headings
    if (content.match(/<span class="inline-flex items-center gap-[^"]*?rounded-full[^"]*?mb-[^"]*?">[\s\S]*?<\/span>\s*<h[1-6]/)) {
        console.error(`ERROR: Preheading found in ${file}`);
        hasErrors = true;
    }

    // 4. Check for unclosed script tags
    const openScripts = (content.match(/<script/g) || []).length;
    const closeScripts = (content.match(/<\/script>/g) || []).length;
    if (openScripts !== closeScripts) {
        console.error(`ERROR: Mismatched script tags in ${file}: ${openScripts} open vs ${closeScripts} close`);
        hasErrors = true;
    }

    // 5. Test inline script syntax
    const scriptMatches = content.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
    scriptMatches.forEach((sm, i) => {
        const code = sm.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
        try {
            new Function(code);
        } catch (e) {
            console.error(`ERROR: JS syntax error in ${file} script #${i + 1}:`, e.message);
            hasErrors = true;
        }
    });

    console.log(`Verified ${file}: OK`);
});

if (!hasErrors) {
    console.log('ALL HTML FILES PASSED VALIDATION PERFECTLY!');
} else {
    process.exit(1);
}


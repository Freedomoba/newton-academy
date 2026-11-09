const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'index.php',
    'thank-you.html', 'thank-you.php',
    'checkout.html', 'checkout.php',
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php',
    'success.html', 'success.php'
];

files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Remove pill badge preheadings before headings (e.g. <span class="inline-flex ... mb-...">...</span>\s*<h[1-6])
    content = content.replace(
        /<span class="inline-flex items-center gap-[^"]*?rounded-full[^"]*?mb-[^"]*?">[\s\S]*?<\/span>\s*(<h[1-6])/g,
        '$1'
    );

    // 2. Remove uppercase tracking block spans immediately preceding h1, h2, h3
    content = content.replace(
        /<span class="[^"]*?uppercase tracking-(?:widest|wider)[^"]*?block[^"]*?">[\s\S]*?<\/span>\s*(<h[1-6])/g,
        '$1'
    );

    // 3. Remove text-[10px|11px|12px|xs] tracking spans preceding headings
    content = content.replace(
        /<span class="[^"]*?text-(?:\[1[0-2]px\]|xs)[^"]*?uppercase[^"]*?">[\s\S]*?<\/span>\s*(<h[1-6])/g,
        '$1'
    );

    // 4. Specific known preheadings from recent templates
    content = content.replace(
        /<span class="inline-flex items-center gap-2 px-3\.5 py-1\.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-\[#005f5a\] border border-\[#005f5a\]\/30 mb-4">[\s\S]*?<\/span>/g,
        ''
    );
    content = content.replace(
        /<span class="inline-flex items-center gap-2 px-3\.5 py-1\.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-\[#005f5a\] border border-\[#005f5a\]\/30 mb-3">[\s\S]*?<\/span>/g,
        ''
    );

    // Specific on checkout:
    content = content.replace(
        /<span class="text-\[10px\] sm:text-\[11px\] font-mono uppercase tracking-widest text-\[#005f5a\] font-bold block mb-1">[\s\S]*?<\/span>\s*<h1/g,
        '<h1'
    );

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Removed preheadings in ${file}`);
});

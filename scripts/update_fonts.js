const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'index.php',
    'thank-you.html', 'thank-you.php',
    'checkout.html', 'checkout.php',
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php',
    'success.html', 'success.php',
    'admin.php'
];

const oldFontPattern = /https:\/\/fonts\.googleapis\.com\/css2\?family=Montserrat[^"]+/g;
const newFontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';

files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Replace Google Font Link
    content = content.replace(oldFontPattern, newFontUrl);

    // 2. Replace Tailwind fontFamily config
    content = content.replace(/sans:\s*\[['"]Montserrat['"],\s*['"]Ubuntu['"][^\]]*\]/g, "sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']");
    content = content.replace(/heading:\s*\[['"]Montserrat['"],\s*['"]Ubuntu['"][^\]]*\]/g, "heading: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']");
    content = content.replace(/sans:\s*\[['"]Montserrat['"][^\]]*\]/g, "sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']");

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated fonts in ${file}`);
});


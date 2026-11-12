const fs = require('fs');

const files = ['index.html', 'scholarship.html', 'checkout.php', 'special-offer.html', 'upsell.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    const content = fs.readFileSync(f, 'utf8');
    console.log(`=== ${f} ===`);
    const lines = content.split('\n');
    lines.forEach((l, i) => {
        if ((l.includes('amber-') || l.includes('yellow-')) && (l.includes('<button') || l.includes('<a') || l.includes('fixed bottom') || l.includes('bottom-0'))) {
            console.log(`Line ${i + 1}: ${l.trim().substring(0, 120)}`);
        }
    });
});

const fs = require('fs');

['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let s = fs.readFileSync(file, 'utf8');

    // Remove the Classified Council Dispatch badge cleanly
    const idx = s.indexOf('Classified Council Dispatch');
    if (idx !== -1) {
        const spanStart = s.lastIndexOf('<span', idx);
        const spanEnd = s.indexOf('</span>', idx) + '</span>'.length;
        s = s.substring(0, spanStart) + s.substring(spanEnd);
        console.log(`Removed Classified Council Dispatch badge from ${file}`);
    }

    // Remove the Classified Dispatch #NA-2026-ADM badge cleanly
    const idx2 = s.indexOf('Classified Dispatch #NA-2026-ADM');
    if (idx2 !== -1) {
        const divStart = s.lastIndexOf('<div', idx2);
        const divEnd = s.indexOf('</div>', idx2) + '</div>'.length;
        s = s.substring(0, divStart) + s.substring(divEnd);
        console.log(`Removed Classified Dispatch #NA-2026-ADM badge from ${file}`);
    }

    fs.writeFileSync(file, s, 'utf8');
});

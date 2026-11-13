const fs = require('fs');

['special-offer.html', 'upsell.html'].forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const idx = html.indexOf('<!-- UNICEF FEMALE TECH EMPOWERMENT');
    console.log(file, 'around UNICEF:');
    console.log(html.slice(idx + 1800, idx + 2600));
});


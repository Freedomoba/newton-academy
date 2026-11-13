const fs = require('fs');

['special-offer.html', 'upsell.html'].forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const idx = html.indexOf('Women Collaborating on Tech Projects');
    console.log(file, 'after images:');
    console.log(html.slice(idx, idx + 400));
});


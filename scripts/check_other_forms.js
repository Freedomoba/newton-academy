const fs = require('fs');

['special-offer.html', 'upsell.html', 'curriculum-dm.html', 'curriculum-de.html'].forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const hasForm = c.includes('officialScholarshipForm');
    const hasSubmitBtn = c.includes('submitAppBtn');
    const hasSubmitListener = c.includes("addEventListener('submit'");
    console.log(f, { hasForm, hasSubmitBtn, hasSubmitListener });
});

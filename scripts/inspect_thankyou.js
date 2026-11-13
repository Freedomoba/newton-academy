const fs = require('fs');
if (fs.existsSync('thank-you.html')) {
    const html = fs.readFileSync('thank-you.html', 'utf8');
    console.log('thank-you.html length:', html.length);
    console.log(html.slice(0, 1500));
}


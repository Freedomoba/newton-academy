const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.php'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Floating WhatsApp button
    // Old: https://wa.me/2348053708909?text=Hello%20Newton%20Academy%20Support%2C%20I%20need%20help...
    content = content.replace(
        /https:\/\/wa\.me\/2348053708909\?text=Hello%20Newton%20Academy%20Support%2C%20I%20need%20help%20with%20my%20enrolment/g,
        'https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy'
    );

    // 2. Checkout fallback redirect in JS
    content = content.replace(
        /https:\/\/wa\.me\/2348053708909\?text=\$\{message\}/g,
        'https://wa.me/2347019602639?text=${message}'
    );

    // 3. Any general floating WhatsApp link
    content = content.replace(
        /aria-label="Chat with Newton Academy Support on WhatsApp">\s*<svg[\s\S]*?<\/svg>\s*<span class="sr-only">Support WhatsApp<\/span>\s*<\/a>/g,
        (match) => match
    );

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Updated floating WhatsApp buttons to Odunayo');

const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const envIdx = html.indexOf('confidentialEnvelope');
console.log('Envelope at:', envIdx);
if (envIdx !== -1) {
    console.log(html.slice(envIdx - 100, envIdx + 800));
}


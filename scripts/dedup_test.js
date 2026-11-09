const fs = require('fs');
const file = 'data/optin_leads.csv';
if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
    const header = lines[0];
    const map = new Map();
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        const email = (parts[2] || '').replace(/\"/g, '').toLowerCase().trim();
        if (email) {
            map.set(email, line);
        }
    }
    const out = [header, ...Array.from(map.values())].join('\n') + '\n';
    fs.writeFileSync(file, out, 'utf8');
    console.log('Deduplicated optin_leads.csv to ' + map.size + ' unique lead(s)');
}


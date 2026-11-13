const https = require('https');
const fs = require('fs');

function fetchUrl(url, dest) {
    https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return fetchUrl(res.headers.location, dest);
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                console.log(`Downloaded ${dest} (${fs.statSync(dest).size} bytes)`);
            });
        });
    }).on('error', (err) => {
        console.error('Download error:', err.message);
    });
}

fetchUrl('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js', 'assets/js/chart.umd.min.js');


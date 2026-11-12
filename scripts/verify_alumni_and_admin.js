const http = require('http');

['index.html', 'scholarship.html', 'admin.html'].forEach(path => {
    http.get('http://localhost:3000/' + path, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
            console.log(`=== ${path} === (Status: ${res.statusCode}, Length: ${d.length})`);
            console.log('  Has Alumni Showcase:', d.includes('alumni-showcase') || d.includes('Fakorede Pauline'));
            console.log('  Has Curvy Waves:', d.includes('M0,50 C320,38 780,15 1200,8'));
            if (path === 'admin.html') {
                console.log('  Has Clean Duplicates:', d.includes('Clean Duplicates'));
                console.log('  Has Mobile App Cards:', d.includes('delegatesCards'));
            }
        });
    });
});


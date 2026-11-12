const http = require('http');

http.get('http://localhost:3000/index.html', res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('--- Verification on http://localhost:3000/index.html ---');
        console.log('HTTP Status:', res.statusCode);
        console.log('Length:', data.length);
        console.log('Video interviews section:', data.includes('id="video-interviews"'));
        console.log('UNICEF section:', data.includes('UNICEF'));
        console.log('Dark footer (#003835):', data.includes('#003835'));
        console.log('Logo present in footer:', data.includes('assets/logo.png'));
        console.log('Faculty of text removed:', !data.includes('Faculty of Digital Technologies'));
        console.log('Childish emojis removed:', !data.includes('✉️') && !data.includes('🌐') && !data.includes('☎️'));
    });
}).on('error', err => console.error('Preview fetch error:', err.message));

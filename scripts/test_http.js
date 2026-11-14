const http = require('http');

http.get('http://localhost:3000/scholarship.html', res => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
        console.log('scholarship.html status:', res.statusCode, 'len:', d.length);
        console.log('has handleScholarshipSubmit:', d.includes('handleScholarshipSubmit'));
        console.log('has checkout.html target:', d.includes('checkout.html'));
    });
});

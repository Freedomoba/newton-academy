const fs = require('fs');
let code = fs.readFileSync('preview.js', 'utf8');

const needle = "if (pathname === '/thank-you.php' || pathname === '/thank-you') {";
const addition = `
    if (pathname === '/scholarship.php' || pathname === '/scholarship' || pathname === '/scholarship.html' || pathname === '/special-offer.html' || pathname === '/special-offer.php' || pathname === '/special-offer' || pathname === '/upsell.html' || pathname === '/upsell.php' || pathname === '/upsell') {
        const filePath = path.join(__dirname, 'scholarship.html');
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(renderPhpFile(filePath, parsedUrl.query));
        }
    }
    if (pathname === '/thank-you.html') {
        const filePath = path.join(__dirname, 'thank-you.html');
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(renderPhpFile(filePath, parsedUrl.query));
        }
    }
    if (pathname === '/checkout.html') {
        const filePath = path.join(__dirname, 'checkout.html');
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(renderPhpFile(filePath, parsedUrl.query));
        }
    }
    if (pathname === '/curriculum-dm.html') {
        const filePath = path.join(__dirname, 'curriculum-dm.html');
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(renderPhpFile(filePath, parsedUrl.query));
        }
    }
    if (pathname === '/curriculum-de.html') {
        const filePath = path.join(__dirname, 'curriculum-de.html');
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(renderPhpFile(filePath, parsedUrl.query));
        }
    }
`;

if (!code.includes('/scholarship.html')) {
    code = code.replace(needle, addition + '\n    ' + needle);
    fs.writeFileSync('preview.js', code, 'utf8');
    console.log('Successfully updated preview.js with HTML & scholarship routes');
} else {
    console.log('Routes already in preview.js');
}

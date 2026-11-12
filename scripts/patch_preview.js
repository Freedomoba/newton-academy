const fs = require('fs');

let code = fs.readFileSync('preview.js', 'utf8');

const target = "if (pathname === '/admin.php' || pathname === '/admin') {";
const replacement = `
    // Static admin.html route (same as GitHub Pages)
    if (pathname === '/admin.html') {
        const filePath = path.join(__dirname, 'admin.html');
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return fs.createReadStream(filePath).pipe(res);
        }
    }

    // Static data directory access for CSV files
    if (pathname.startsWith('/data/')) {
        const filePath = path.join(__dirname, pathname);
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8' });
            return fs.createReadStream(filePath).pipe(res);
        }
    }

    if (pathname === '/admin.php' || pathname === '/admin') {`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('preview.js', code, 'utf8');
    console.log('Successfully updated preview.js!');
} else {
    console.warn('Target string not found in preview.js');
}

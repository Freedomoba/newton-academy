const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

let balance = 0;
lines.forEach((line, i) => {
    const opens = (line.match(/<div(\s|>)/gi) || []).length;
    const closes = (line.match(/<\/div>/gi) || []).length;
    balance += opens - closes;
    if (balance < 0) {
        console.log(`Line ${i + 1}: balance dropped to ${balance}: ${line.trim()}`);
    }
});

console.log('Total line count:', lines.length, 'Final balance:', balance);

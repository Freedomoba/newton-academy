const fs = require('fs');

const c = fs.readFileSync('scholarship.html', 'utf8');

// Find form
const formIdx = c.indexOf('id="scholarshipAppForm"');
console.log('formIdx:', formIdx);
if (formIdx !== -1) {
    console.log('=== FORM HTML ===');
    console.log(c.substring(formIdx, formIdx + 1500));
}

// Find submit button
const btnIdx = c.indexOf('id="submitAppBtn"');
console.log('btnIdx:', btnIdx);
if (btnIdx !== -1) {
    console.log('=== BTN HTML ===');
    console.log(c.substring(btnIdx - 50, btnIdx + 200));
}

// Find event listener for form
const lines = c.split('\n');
lines.forEach((l, i) => {
    if (l.includes('scholarshipAppForm') || l.includes('submitAppBtn')) {
        console.log(`Line ${i+1}: ${l.trim()}`);
    }
});

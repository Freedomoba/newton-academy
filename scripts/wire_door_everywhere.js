const fs = require('fs');

console.log('--- Wiring 3D Door Opening & Confetti Rain across all pages ---');

// 1. Update scholarship.html and scholarship.php
['scholarship.html', 'scholarship.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Ensure application-evaluation.js script is included
    if (!content.includes('assets/js/application-evaluation.js')) {
        content = content.replace('</body>', '<script src="assets/js/application-evaluation.js"></script>\n</body>');
        console.log(`+ Added application-evaluation.js to ${file}`);
    }

    // Update envelope click to trigger door opening and congratulations rain before reading letter
    const oldEnvelopeHandler = /envelope\.addEventListener\('click',\s*function\(\)\s*\{[\s\S]*?\}\);/;
    const newEnvelopeHandler = `envelope.addEventListener('click', function() {
                if (typeof window.triggerDoorOpeningAndRain === 'function') {
                    window.triggerDoorOpeningAndRain(null, function() {
                        letter.scrollIntoView({ behavior: 'smooth' });
                    });
                } else {
                    letter.scrollIntoView({ behavior: 'smooth' });
                }
            });`;

    if (oldEnvelopeHandler.test(content)) {
        content = content.replace(oldEnvelopeHandler, newEnvelopeHandler);
        console.log(`+ Updated envelope click handler in ${file}`);
    }

    // Update form submission
    const formSubmitRegex = /form\.addEventListener\('submit',\s*function\(e\)\s*\{[\s\S]*?\}\);/;
    // We check where targetCheckoutUrl is handled
    if (content.includes('targetCheckoutUrl =')) {
        content = content.replace(
            /triggerEvaluationModal\(fullName,\s*targetCheckoutUrl\);/,
            `if (typeof window.startScholarshipEvaluation === 'function') {
                        window.startScholarshipEvaluation(fullName, targetCheckoutUrl);
                    } else {
                        window.location.href = targetCheckoutUrl;
                    }`
        );
        console.log(`+ Wired startScholarshipEvaluation in form submit in ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

// 2. Also update curriculum-dm and curriculum-de
['curriculum-dm.html', 'curriculum-dm.php', 'curriculum-de.html', 'curriculum-de.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Ensure application-evaluation.js script is included
    if (!content.includes('assets/js/application-evaluation.js')) {
        content = content.replace('</body>', '<script src="assets/js/application-evaluation.js"></script>\n</body>');
        console.log(`+ Added application-evaluation.js to ${file}`);
    }

    // Wire startScholarshipEvaluation
    if (content.includes('triggerEvaluationModal(name, targetUrl);')) {
        content = content.replace(
            'triggerEvaluationModal(name, targetUrl);',
            `if (typeof window.startScholarshipEvaluation === 'function') {
                        window.startScholarshipEvaluation(name, targetUrl);
                    } else {
                        window.location.href = targetUrl;
                    }`
        );
        console.log(`+ Wired startScholarshipEvaluation in ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Wiring completed successfully.');


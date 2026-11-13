const fs = require('fs');

let content = fs.readFileSync('scripts/generate_complete_curriculum.js', 'utf8');

// Replace triggerEvaluationModal call with window.startScholarshipEvaluation
content = content.replace(
    '// Trigger evaluation popup before redirecting\n                    triggerEvaluationModal(name, targetUrl);',
    `// Trigger evaluation popup, 3D door opening, and confetti rain before redirecting
                    if (typeof window.startScholarshipEvaluation === 'function') {
                        window.startScholarshipEvaluation(name, targetUrl);
                    } else {
                        window.location.href = targetUrl;
                    }`
);

// Include application-evaluation.js script
if (!content.includes('assets/js/application-evaluation.js')) {
    content = content.replace('</body>', '<script src="assets/js/application-evaluation.js"></script>\n</body>');
}

fs.writeFileSync('scripts/generate_complete_curriculum.js', content, 'utf8');
console.log('Updated scripts/generate_complete_curriculum.js');


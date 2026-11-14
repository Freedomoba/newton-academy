const fs = require('fs');

function fixScholarshipForm(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    const isPhp = file.endsWith('.php');
    const checkoutTarget = isPhp ? 'checkout.php' : 'checkout.html';

    // 1. Update form tag with action, method, and onsubmit handler
    content = content.replace(
        /<form id="officialScholarshipForm"([^>]*)>/,
        `<form id="officialScholarshipForm" method="POST" action="${checkoutTarget}" onsubmit="return handleScholarshipSubmit(event);"$1>`
    );

    // 2. Also add onclick to submitAppBtn
    content = content.replace(
        /<button type="submit" id="submitAppBtn"([^>]*)>/,
        `<button type="submit" id="submitAppBtn" onclick="return handleScholarshipSubmit(event);"$1>`
    );

    // 3. Inject robust handleScholarshipSubmit function in inline script
    const submitHandlerCode = `
        // Bulletproof scholarship application submit handler
        window.handleScholarshipSubmit = function(e) {
            if (e && e.preventDefault) e.preventDefault();

            const form = document.getElementById('officialScholarshipForm');
            if (form && !form.checkValidity()) {
                form.reportValidity();
                return false;
            }

            const fNameEl = document.getElementById('first_name');
            const lNameEl = document.getElementById('last_name');
            const fName = (fNameEl ? fNameEl.value : '').trim();
            const lName = (lNameEl ? lNameEl.value : '').trim();
            const fullName = (fName + ' ' + lName).trim() || 'Candidate';

            const emailEl = document.getElementById('email');
            const emailVal = (emailEl ? emailEl.value : '').trim();

            const phoneEl = document.getElementById('phone');
            const phoneVal = (phoneEl ? phoneEl.value : '').trim();

            const courseEl = document.getElementById('course_select');
            const courseVal = courseEl ? courseEl.value : 'Digital Marketing + Applied AI';

            const schemeEl = document.getElementById('scholarship_scheme');
            const schemeVal = schemeEl ? schemeEl.value : '100% Full Tuition Endowment (₦20,000 Admission Fee Only)';

            const appId = 'NA-' + Date.now().toString().slice(-6);

            try {
                localStorage.setItem('newton_name', fullName);
                localStorage.setItem('newton_email', emailVal);
                localStorage.setItem('newton_phone', phoneVal);
                localStorage.setItem('newton_track', courseVal);
                localStorage.setItem('newton_app_id', appId);
            } catch (err) {}

            try {
                if (form) {
                    const fd = new FormData(form);
                    fd.append('app_id', appId);
                    fetch('api/scholarship.php', { method: 'POST', body: fd }).catch(function() {});
                }
            } catch (err) {}

            const isPhp = window.location.pathname.endsWith('.php');
            const checkoutPage = isPhp ? 'checkout.php' : 'checkout.html';
            const chkParams = new URLSearchParams({
                app_id: appId,
                name: fullName,
                email: emailVal,
                phone: phoneVal,
                track: courseVal,
                scheme: schemeVal
            });
            const targetCheckoutUrl = checkoutPage + '?' + chkParams.toString();

            if (typeof window.startScholarshipEvaluation === 'function') {
                window.startScholarshipEvaluation(fullName, targetCheckoutUrl);
            } else {
                window.location.href = targetCheckoutUrl;
            }

            return false;
        };
    `;

    // Ensure handleScholarshipSubmit is available globally before DOMContentLoaded
    if (!content.includes('window.handleScholarshipSubmit')) {
        content = content.replace(
            /<script>\s*document\.addEventListener\('DOMContentLoaded'/,
            `<script>${submitHandlerCode}\n        document.addEventListener('DOMContentLoaded'`
        );
    }

    // Also remove the old duplicate triggerEvaluationModal and redundant #evaluationModal if present
    content = content.replace(
        /function triggerEvaluationModal[\s\S]*?}\s*\n\s*<\/script>/,
        '</script>'
    );

    content = content.replace(
        /<!-- EVALUATION \/ LOADING POPUP MODAL \(BEFORE CONGRATULATIONS\) -->\s*<div id="evaluationModal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
        ''
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`[${file}] Form submit handler updated successfully.`);
}

['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(fixScholarshipForm);

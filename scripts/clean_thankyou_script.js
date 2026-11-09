const fs = require('fs');
const path = require('path');

['thank-you.html', 'thank-you.php'].forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    let c = fs.readFileSync(fullPath, 'utf8');

    const isPhp = file.endsWith('.php');
    const targetPage = isPhp ? 'checkout.php' : 'checkout.html';

    const cleanScript = `<script>
        // Read URL query parameters or fallback to localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('name') || localStorage.getItem('newton_name') || '${isPhp ? '<?php echo addslashes($name); ?>' : 'Freedom Obanijesu'}';
        const userEmail = urlParams.get('email') || localStorage.getItem('newton_email') || '${isPhp ? '<?php echo addslashes($email); ?>' : 'freedom@lumenvoxai.com'}';
        const userPhone = urlParams.get('phone') || localStorage.getItem('newton_phone') || '+2348012345678';

        // Personalize Header & Pass
        const greetingEl = document.getElementById('userGreeting');
        if (greetingEl) greetingEl.textContent = userName;
        const passEmailEl = document.getElementById('passEmail');
        if (passEmailEl) passEmailEl.textContent = userEmail;

        const envNameEl = document.getElementById('envelopeRecipientName');
        if (envNameEl) envNameEl.textContent = userName;
        const storyNameEl = document.getElementById('storyRecipientName');
        if (storyNameEl) storyNameEl.textContent = userName;

        window.openScholarshipEnvelope = function() {
            const envCard = document.getElementById('scholarshipEnvelopeCard');
            if (envCard) envCard.classList.add('is-open');
            const target = document.getElementById('officialSalesLetter') || document.querySelector('article.bg-white');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Personalize form fields
        const sNameInput = document.getElementById('sName');
        if (sNameInput) sNameInput.value = userName;
        const sEmailInput = document.getElementById('sEmail');
        if (sEmailInput) sEmailInput.value = userEmail;
        const sPhoneInput = document.getElementById('sPhone');
        if (sPhoneInput) sPhoneInput.value = userPhone;

        // Wire curriculum buttons to carry forward parameters
        const queryParams = '?name=' + encodeURIComponent(userName) + 
                            '&email=' + encodeURIComponent(userEmail) + 
                            '&phone=' + encodeURIComponent(userPhone);

        const deLink = document.getElementById('deCurriculumLink');
        if (deLink) deLink.href = 'curriculum-de.${isPhp ? 'php' : 'html'}' + queryParams;
        const dmLink = document.getElementById('dmCurriculumLink');
        if (dmLink) dmLink.href = 'curriculum-dm.${isPhp ? 'php' : 'html'}' + queryParams;

        // Handle Scholarship Form Submission
        const sForm = document.getElementById('scholarshipForm');
        const sBtn = document.getElementById('scholarshipSubmitBtn');

        if (sForm) {
            sForm.addEventListener('submit', function(e) {
                e.preventDefault();

                if (sBtn) {
                    sBtn.disabled = true;
                    sBtn.textContent = 'Submitting Candidate Dossier...';
                }

                const nameVal = (document.getElementById('sName') ? document.getElementById('sName').value : userName).trim();
                const emailVal = (document.getElementById('sEmail') ? document.getElementById('sEmail').value : userEmail).trim();
                const phoneVal = (document.getElementById('sPhone') ? document.getElementById('sPhone').value : userPhone).trim();
                const selectEl = sForm.querySelector('select[name="programme"]');
                const trackVal = selectEl ? selectEl.value : 'Digital Entrepreneurship + Applied AI';
                const appId = 'NA-SCH-' + Math.floor(1000000 + Math.random() * 9000000);

                try {
                    localStorage.setItem('newton_name', nameVal);
                    localStorage.setItem('newton_email', emailVal);
                    localStorage.setItem('newton_phone', phoneVal);
                    localStorage.setItem('newton_track', trackVal);
                    localStorage.setItem('newton_app_id', appId);
                } catch (err) {}

                // Send background AJAX to server
                try {
                    const formData = new FormData(sForm);
                    formData.append('app_id', appId);
                    fetch('api/scholarship.php', { method: 'POST', body: formData }).catch(function() {});
                } catch (e) {}

                // Prepare checkout URL
                const chkQuery = '?app_id=' + encodeURIComponent(appId) + 
                                 '&name=' + encodeURIComponent(nameVal) + 
                                 '&email=' + encodeURIComponent(emailVal) + 
                                 '&phone=' + encodeURIComponent(phoneVal) + 
                                 '&track=' + encodeURIComponent(trackVal);
                const targetUrl = '${targetPage}' + chkQuery;

                // Launch 30-second evaluation with hurray celebration and 3D door unveiling
                if (typeof window.startScholarshipEvaluation === 'function') {
                    window.startScholarshipEvaluation(nameVal, targetUrl);
                } else {
                    window.location.href = targetUrl;
                }
            });
        }
    </script>`;

    // Replace the entire bottom script tag
    c = c.replace(/<script>\s*\/\/ Read URL query parameters[\s\S]*?<\/script>/, cleanScript);
    fs.writeFileSync(fullPath, c, 'utf8');
    console.log(`Cleaned script in ${file}`);
});

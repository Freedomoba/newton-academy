const fs = require('fs');
const path = require('path');

// 1. UPDATE THANK-YOU.HTML & THANK-YOU.PHP
function updateThankYou(file, isPhp) {
    const fullPath = path.join(__dirname, '..', file);
    let c = fs.readFileSync(fullPath, 'utf8');

    // A. Replace the Hook with Direct-Response Copywriting
    const oldHookTarget = `<h2 class="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]">\r\n                    In the next 5 minutes, we will reveal how a young lady who hawked corn on campus, and a graduate who worked dusty manual POP ceiling labor, escaped the brutal Nigerian dilemma to earn in stable US Dollars and British Pounds...\r\n                </h2>\r\n\r\n                <p class="text-base sm:text-lg text-slate-600 font-sans mt-4 leading-relaxed">\r\n                    ...and how the Newton Academy Academic Council has fully endowed your <span class="text-[#005f5a] font-bold not-italic">100% Full Tuition Scholarship (₦200,000 value completely covered)</span> so you can duplicate their exact commercial systems.\r\n                </p>`;
    
    // Normalize newlines for matching
    const oldHookPattern = /<h2 class="text-2xl sm:text-4xl lg:text-\[2\.65rem\] font-extrabold text-slate-900 tracking-tight leading-\[1\.18\]">[\s\S]*?<\/p>/m;

    const newHook = `<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.32]">
                    Discover How You Can Start Making Up To <span class="text-[#005f5a] underline decoration-[#e5a93c] underline-offset-8 font-extrabold">$1,000 Monthly</span> As A Young Graduate, Stay-At-Home Mom, Or Underpaid Professional In Nigeria
                </h2>

                <p class="text-base sm:text-lg text-slate-600 font-sans mt-4 leading-[1.65]">
                    ...Without relocating abroad, hawking cheap physical products on WhatsApp, or waiting endlessly for government jobs that pay less than monthly inflation.
                </p>

                <!-- Direct Personal Salutation & Story Hook -->
                <div class="mt-8 pt-6 border-t border-slate-200 text-left">
                    <p class="text-lg sm:text-xl text-slate-900 font-bold mb-3">
                        Dear <span id="storyRecipientName" class="text-[#005f5a] underline decoration-amber-400">${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Freedom Obanijesu'}</span>,
                    </p>
                    <div class="space-y-4 text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                        <p>
                            Let me share with you a quick, true story of two young Nigerians who were once completely trapped by the economic reality of this country...
                        </p>
                        <p>
                            The first was a brilliant university student who had to hawk boiled corn along campus pathways just to afford photocopies and feed herself through the semester. Despite graduating with top honors, the corporate world offered her nothing more than exploitative ₦40,000 monthly internships that barely covered transport fare.
                        </p>
                        <p>
                            The second was a graduate who left NYSC orientation with high hopes, only to spend long, dusty months doing backbreaking manual P.O.P ceiling work on construction sites under the scorching sun just to survive.
                        </p>
                        <p>
                            Today, both of them command thousands of dollars in international retainers every single month, working remotely with high-paying clients across North America, the UK, and Europe, right from their laptops here in Nigeria.
                        </p>
                        <p class="font-semibold text-slate-900">
                            And below, you will discover how the Newton Academy Academic Council has fully endowed your <span class="text-emerald-700 font-bold underline decoration-emerald-300 underline-offset-4">100% Full Tuition Scholarship (₦200,000 value covered)</span> so you can duplicate their exact commercial systems.
                        </p>
                    </div>
                </div>`;

    c = c.replace(oldHookPattern, newHook);

    // B. Insert Interactive Envelope with REAL ARROWS right above <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
    if (!c.includes('id="envelopeSection"')) {
        const envelopeSection = `
    <!-- ============================================================== -->
    <!-- INTERACTIVE CONFIDENTIAL SCHOLARSHIP ENVELOPE                   -->
    <!-- ============================================================== -->
    <section id="envelopeSection" class="max-w-4xl mx-auto px-4 sm:px-6 my-10 envelope-wrapper">
        
        <!-- Real Downward Arrow Indicators (No Redundant Text Pills) -->
        <div class="flex items-center justify-center gap-6 sm:gap-10 mb-4 select-none">
            <div class="text-amber-500 arrow-pulse-1">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
            <div class="text-amber-400 arrow-pulse-2">
                <svg class="w-10 h-10 sm:w-12 sm:h-12 fill-current drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
            <div class="text-amber-500 arrow-pulse-3">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
        </div>

        <!-- The 3D Interactive Envelope Container -->
        <div id="scholarshipEnvelopeCard" onclick="openScholarshipEnvelope()" class="envelope-card cursor-pointer bg-gradient-to-br from-[#003d3a] via-[#004d49] to-[#002d2a] text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden group">
            
            <!-- Subtle Gold Watermark Seal -->
            <div class="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border-4 border-amber-400/10 pointer-events-none flex items-center justify-center">
                <span class="text-amber-300/10 font-mono text-7xl font-black">NA</span>
            </div>

            <!-- Envelope Header Tag -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4 mb-6">
                <div class="flex items-center gap-2.5">
                    <span class="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
                    <span class="text-xs uppercase tracking-widest font-mono text-amber-300 font-bold">
                        CONFIDENTIAL ADMISSIONS DISPATCH
                    </span>
                </div>
                <span class="text-[11px] font-mono text-teal-200 bg-white/10 px-3 py-1 rounded-full self-start sm:self-auto border border-white/10">
                    Quota Allocation: Verified Delegate
                </span>
            </div>

            <!-- Envelope Content -->
            <div class="text-center max-w-xl mx-auto space-y-4 py-2">
                <p class="text-xs sm:text-sm font-mono uppercase tracking-wider text-teal-200">
                    Prepared Exclusively For Candidate:
                </p>
                <h3 class="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    <span id="envelopeRecipientName" class="text-amber-300 underline decoration-amber-400 underline-offset-8">${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Freedom Obanijesu'}</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-md mx-auto">
                    Contains your endowed <strong class="text-amber-300 font-bold">100% Full Tuition Scholarship (₦200,000 value covered)</strong> and priority orientation instructions.
                </p>

                <!-- Interactive Wax Seal Button -->
                <div class="pt-4">
                    <button type="button" class="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl wax-seal-pulse transform group-hover:scale-105 transition-all cursor-pointer">
                        <span class="text-xl">✉</span>
                        <span>TAP TO BREAK SEAL & REVEAL SCHOLARSHIP DOSSIER</span>
                        <span class="text-lg">→</span>
                    </button>
                    <p class="text-[11px] text-teal-200/80 mt-2 font-mono">
                        Tap anywhere on this envelope to open the official briefing
                    </p>
                </div>
            </div>

        </div>

    </section>
`;
        c = c.replace('<main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">', envelopeSection + '\n    <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">');
    }

    // C. Fix Financial Ledger Alignment (Strict Two-Column Table: Left is Left, Right is Right!)
    const oldLedgerPattern = /<!-- Ledger Table -->[\s\S]*?<!-- Global Pedigree Banner -->/m;
    const newLedgerTable = `<!-- Ledger Table (Strict Two-Column Alignment: Left is Left, Right is Right) -->
            <div class="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 font-sans max-w-2xl mx-auto my-8">
                <table class="w-full text-xs sm:text-sm border-collapse">
                    <tbody>
                        <tr class="border-b border-white/15">
                            <td class="py-3 text-left text-teal-200 font-medium pr-4">Standard International Tuition:</td>
                            <td class="py-3 text-right font-mono font-bold text-teal-300 line-through text-sm sm:text-base whitespace-nowrap">₦200,000</td>
                        </tr>
                        <tr class="border-b border-white/15">
                            <td class="py-3 text-left text-amber-300 font-semibold pr-4">Newton Academy Endowment Award:</td>
                            <td class="py-3 text-right font-mono font-bold text-amber-300 text-sm sm:text-base whitespace-nowrap">-₦200,000 <span class="text-[11px] font-sans font-normal text-amber-200">(100% Covered)</span></td>
                        </tr>
                        <tr class="border-b-2 border-white/25">
                            <td class="py-3 text-left text-white font-bold pr-4">Total Tuition Fee Payable:</td>
                            <td class="py-3 text-right font-mono font-black text-emerald-400 text-base sm:text-lg whitespace-nowrap">₦0.00 <span class="text-xs font-sans font-bold">(FREE)</span></td>
                        </tr>
                        <tr>
                            <td class="pt-4 pb-1 text-left pr-4">
                                <strong class="text-sm sm:text-base block text-white font-bold">Mandatory Application &amp; Seriousness Filter:</strong>
                                <span class="text-[11px] text-teal-200 block leading-normal mt-0.5">Non-refundable commitment fee to guarantee cohort completion</span>
                            </td>
                            <td class="pt-4 pb-1 text-right align-top shrink-0">
                                <span class="text-2xl sm:text-3xl font-black text-amber-400 font-mono whitespace-nowrap">₦20,000</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Global Pedigree Banner -->`;

    c = c.replace(oldLedgerPattern, newLedgerTable);

    // D. Connect evaluation script and remove preheadings
    if (!c.includes('assets/js/application-evaluation.js')) {
        c = c.replace(
            '<script src="assets/js/animations.js"></script>',
            '<script src="assets/js/application-evaluation.js"></script>\n    <script src="assets/js/animations.js"></script>'
        );
    }

    // Connect form submission to evaluation modal
    const oldSubmit = /sForm\.addEventListener\('submit', function\(e\) \{[\s\S]*?\}\);\s*\}/m;
    const newSubmit = `sForm.addEventListener('submit', function(e) {
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
                const targetPage = '${isPhp ? 'checkout.php' : 'checkout.html'}';
                const chkQuery = '?app_id=' + encodeURIComponent(appId) + 
                                 '&name=' + encodeURIComponent(nameVal) + 
                                 '&email=' + encodeURIComponent(emailVal) + 
                                 '&phone=' + encodeURIComponent(phoneVal) + 
                                 '&track=' + encodeURIComponent(trackVal);
                const targetUrl = targetPage + chkQuery;

                // Launch 30-second evaluation with hurray celebration and 3D door unveiling
                if (typeof window.startScholarshipEvaluation === 'function') {
                    window.startScholarshipEvaluation(nameVal, targetUrl);
                } else {
                    window.location.href = targetUrl;
                }
            });
        }`;

    c = c.replace(oldSubmit, newSubmit);

    // Add envelope open function and name sync
    if (!c.includes('openScholarshipEnvelope')) {
        const envelopeFunc = `
        window.openScholarshipEnvelope = function() {
            const envCard = document.getElementById('scholarshipEnvelopeCard');
            if (envCard) envCard.classList.add('is-open');
            const target = document.getElementById('officialSalesLetter') || document.querySelector('article.bg-white');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        const envNameEl = document.getElementById('envelopeRecipientName');
        if (envNameEl) envNameEl.textContent = userName;
        const storyNameEl = document.getElementById('storyRecipientName');
        if (storyNameEl) storyNameEl.textContent = userName;
        `;
        c = c.replace("const passEmailEl = document.getElementById('passEmail');", envelopeFunc + "\n        const passEmailEl = document.getElementById('passEmail');");
    }

    fs.writeFileSync(fullPath, c, 'utf8');
    console.log(`Successfully updated ${file}`);
}

updateThankYou('thank-you.html', false);
updateThankYou('thank-you.php', true);

// 2. UPDATE CURRICULUM-DE.HTML & CURRICULUM-DM.HTML (MOCKUP CAPTION & LUMENVOX PADDING)
function updateCurriculum(file) {
    const fullPath = path.join(__dirname, '..', file);
    let c = fs.readFileSync(fullPath, 'utf8');

    // Separate mockup overlay so caption sits cleanly below mockup image
    c = c.replace(
        /<div class="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white\/20 bg-slate-950 group">\s*<img src="([^"]+)" alt="([^"]+)" class="([^"]+)">\s*<div class="absolute bottom-4 left-4 right-4 bg-slate-900\/85 backdrop-blur-md border border-white\/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">/g,
        `<div class="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950">
                    <img src="$1" alt="$2" class="w-full h-auto object-cover">
                </div>
                <!-- Clean Separate Info Bar Below Mockup (Never covers image on mobile!) -->
                <div class="mt-3 bg-slate-900/90 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-white">`
    );

    // Fix Lumenvox Suite container so it has generous max-width and margins (not touching edges)
    // Replace: <div class="bg-gradient-to-br from-[#003835] via-[#004d49] to-[#002b28] rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-amber-500/40">
    c = c.replace(
        /<div class="bg-gradient-to-br from-\[#003835\] via-\[#004d49\] to-\[#002b28\] rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-amber-500\/40">/g,
        `<div class="my-16 max-w-6xl mx-auto px-4 sm:px-6">
            <div class="bg-gradient-to-br from-[#003330] via-[#004d49] to-[#002b28] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-500/40">`
    );
    // and close the outer container
    c = c.replace(
        /(AI-05[\s\S]*?<\/div>\s*<\/div>)\s*<\/section>/m,
        '$1\n            </div>\n        </div>\n    </section>'
    );

    fs.writeFileSync(fullPath, c, 'utf8');
    console.log(`Successfully updated ${file}`);
}

updateCurriculum('curriculum-de.html');
updateCurriculum('curriculum-de.php');
updateCurriculum('curriculum-dm.html');
updateCurriculum('curriculum-dm.php');


const fs = require('fs');
const path = require('path');

console.log('--- Starting comprehensive fix across Newton Academy ---');

// ==============================================================
// 1. FIX CHECKOUT.HTML & CHECKOUT.PHP LEDGER ALIGNMENT (TABLE)
// ==============================================================
function fixCheckoutLedger(file) {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    const oldLedgerRegex = /<!-- Financial Award Grant Ledger -->[\s\S]*?<!-- =+ -->\s*<!-- PAYMENT INTEGRATION/m;

    const newLedgerMarkup = `<!-- Financial Award Grant Ledger -->
            <div class="bg-[#f0f9f8] border border-[#005f5a]/30 rounded-2xl p-6 sm:p-7 mb-10 text-xs sm:text-sm font-sans">
                <div class="flex items-center justify-between border-b border-[#005f5a]/20 pb-3 mb-3">
                    <span class="font-bold text-[#004d49] uppercase tracking-wider text-xs">Official Financial Award Ledger</span>
                    <span class="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full font-bold">Endowment Applied</span>
                </div>
                
                <table class="w-full text-xs sm:text-sm border-collapse">
                    <tbody>
                        <tr class="border-b border-[#005f5a]/10">
                            <td class="py-2.5 text-left text-slate-600 font-medium pr-4">Standard Program Tuition Fee:</td>
                            <td class="py-2.5 text-right font-mono font-bold text-slate-400 line-through whitespace-nowrap">₦200,000</td>
                        </tr>
                        <tr class="border-b border-[#005f5a]/10">
                            <td class="py-2.5 text-left text-[#005f5a] font-semibold pr-4">Newton Academy Foundation Endowment:</td>
                            <td class="py-2.5 text-right font-mono font-bold text-[#005f5a] whitespace-nowrap">-₦200,000 <span class="text-[11px] font-sans font-normal text-emerald-700">(100% Covered)</span></td>
                        </tr>
                        <tr class="border-b-2 border-[#005f5a]/20">
                            <td class="py-2.5 text-left text-slate-900 font-bold pr-4">Remaining Tuition Payable:</td>
                            <td class="py-2.5 text-right font-mono font-black text-emerald-700 text-sm sm:text-base whitespace-nowrap">₦0.00 <span class="text-xs font-sans font-bold">(FREE)</span></td>
                        </tr>
                        <tr>
                            <td class="pt-4 pb-1 text-left pr-4">
                                <strong class="text-sm sm:text-base block font-bold text-slate-900">One-Time Application &amp; Seat Reservation Fee:</strong>
                                <span class="text-[11px] text-slate-500 block leading-normal mt-0.5">Due to extreme applicant volume, this single non-refundable fee filters for committed fellows and reserves your seat across live cohorts and LMS systems.</span>
                            </td>
                            <td class="pt-4 pb-1 text-right align-top shrink-0">
                                <span class="text-2xl sm:text-3xl font-extrabold text-[#005f5a] font-mono whitespace-nowrap">₦20,000</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- ============================================================== -->
            <!-- PAYMENT INTEGRATION`;

    content = content.replace(oldLedgerRegex, newLedgerMarkup);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ledger alignment table in ${file}`);
}

fixCheckoutLedger('checkout.html');
fixCheckoutLedger('checkout.php');

// ==============================================================
// 2. FIX THANK-YOU.HTML & THANK-YOU.PHP (LEDGER, ENVELOPE, HOOK)
// ==============================================================
function fixThankYouPage(file, isPhp) {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    // Fix ledger alignment inside thank-you
    const oldLedgerRegex = /<!-- Ledger Table -->[\s\S]*?<!-- Global Pedigree Banner -->/m;
    const newThankYouLedger = `<!-- Ledger Table (Strict Two-Column Alignment) -->
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

    content = content.replace(oldLedgerRegex, newThankYouLedger);

    // Replace the Hook with Copywriting-Driven headline & "Dear [Name]" story
    const oldHookRegex = /<h2 class="text-2xl sm:text-4xl lg:text-\[2\.65rem\] font-extrabold text-slate-900 tracking-tight leading-\[1\.18\]">[\s\S]*?<\/h2>\s*<p class="text-base sm:text-lg text-slate-600 font-sans mt-4 leading-relaxed">[\s\S]*?<\/p>/m;

    const newHookMarkup = `<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.32]">
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

    content = content.replace(oldHookRegex, newHookMarkup);

    // Insert the Interactive Envelope with REAL ARROWS before <main
    if (!content.includes('id="envelopeSection"')) {
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
        content = content.replace('<main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">', envelopeSection + '\n    <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">');
    }

    // Ensure scripts include evaluation and 100 testimonials
    if (!content.includes('assets/js/application-evaluation.js')) {
        content = content.replace(
            '<script src="assets/js/animations.js"></script>',
            '<script src="assets/js/application-evaluation.js"></script>\n    <script src="assets/js/animations.js"></script>'
        );
    }

    // Connect form submission to evaluation modal
    const oldFormSubmitRegex = /sForm\.addEventListener\('submit', function\(e\) \{[\s\S]*?\}\);\s*\}/m;
    const newFormSubmit = `sForm.addEventListener('submit', function(e) {
                e.preventDefault();

                sBtn.disabled = true;
                sBtn.textContent = 'Submitting Candidate Dossier...';

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

    content = content.replace(oldFormSubmitRegex, newFormSubmit);

    // Add envelope open function
    if (!content.includes('openScholarshipEnvelope')) {
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
        content = content.replace("const passEmailEl = document.getElementById('passEmail');", envelopeFunc + "\n        const passEmailEl = document.getElementById('passEmail');");
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated thank you page: ${file}`);
}

fixThankYouPage('thank-you.html', false);
fixThankYouPage('thank-you.php', true);

// ==============================================================
// 3. FIX LUMENVOX CONTRAST & MOCKUP OVERLAY IN CURRICULUM PAGES
// ==============================================================
const curriculumFiles = [
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php'
];

curriculumFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    // Fix Lumenvox section background and text contrast
    // If <div class="bg-white border-b border-slate-200 py-6"> wraps Lumenvox
    content = content.replace(
        /<div class="bg-white border-b border-slate-200 py-6">\s*<div class="max-w-5xl mx-auto px-4 text-center">\s*<h3 class="text-xl sm:text-3xl font-extrabold text-white tracking-tight">\s*Integrated Lumenvox AI Creator Suite \(5 Modules\)\s*<\/h3>\s*<p class="text-xs sm:text-sm text-teal-100 font-sans mt-1">/g,
        `<section class="bg-gradient-to-br from-[#002d2a] via-[#00403d] to-[#002624] text-white py-16 border-t border-b border-amber-400/20">
        <div class="max-w-5xl mx-auto px-4 text-center">
            <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Integrated Lumenvox AI Creator Suite (5 Modules)
            </h3>
            <p class="text-xs sm:text-sm text-teal-200 font-sans mt-2 max-w-2xl mx-auto">`
    );

    // Close with </section> instead of </div></div>
    content = content.replace(
        /(Integrated Lumenvox AI Creator Suite[\s\S]*?AI-05[\s\S]*?<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>/g,
        '$1\n        </div>\n    </section>'
    );

    // Fix Mockup Overlay so caption sits cleanly BELOW the image (not covering it on phone mode)
    content = content.replace(
        /<div class="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white\/20 bg-slate-950 group">\s*<img src="([^"]+)" alt="([^"]+)" class="([^"]+)">\s*<div class="absolute bottom-4 left-4 right-4 bg-slate-900\/85 backdrop-blur-md border border-white\/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">/g,
        `<div class="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950">
                    <img src="$1" alt="$2" class="w-full h-auto object-cover">
                </div>
                <!-- Clean Separate Info Bar Below Mockup (Never covers image on mobile!) -->
                <div class="mt-3 bg-slate-900/90 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-white">`
    );

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed Lumenvox contrast and mockup caption bar in ${file}`);
});

console.log('--- Comprehensive fix finished successfully ---');


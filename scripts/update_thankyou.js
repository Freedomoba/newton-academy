const fs = require('fs');
const path = require('path');

function updateThankYouFile(filename, isPhp) {
    const filePath = path.join(__dirname, '..', filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filename}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Ensure scripts are included before </body>
    if (!content.includes('assets/js/application-evaluation.js')) {
        content = content.replace(
            '<script src="assets/js/animations.js"></script>',
            '<script src="assets/js/application-evaluation.js"></script>\n    <script src="assets/js/animations.js"></script>'
        );
    }

    // 2. Insert Interactive Envelope right before <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
    const envelopeMarkup = `
    <!-- ============================================================== -->
    <!-- INTERACTIVE CONFIDENTIAL SCHOLARSHIP ENVELOPE                   -->
    <!-- ============================================================== -->
    <section id="envelopeSection" class="max-w-4xl mx-auto px-4 sm:px-6 my-10 envelope-wrapper">
        
        <!-- 3 Pulsing Attention Arrows -->
        <div class="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#005f5a] mb-4 select-none flex-wrap">
            <span class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-sm arrow-pulse-1">
                <span>↓</span>
                <span>READ THIS NOW</span>
            </span>
            <span class="inline-flex items-center gap-1.5 bg-teal-100 text-teal-950 px-3.5 py-1.5 rounded-full border border-teal-300 shadow-sm arrow-pulse-2">
                <span>↓</span>
                <span>READ THIS NOW</span>
            </span>
            <span class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-sm arrow-pulse-3">
                <span>↓</span>
                <span>READ THIS NOW</span>
            </span>
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
                    <span id="envelopeRecipientName" class="text-amber-300 underline decoration-amber-400 underline-offset-8">Freedom Obanijesu</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-md mx-auto">
                    Contains your endowed <strong class="text-amber-300 font-bold">100% Full Tuition Scholarship (₦200,000 value covered)</strong> and priority orientation instructions.
                </p>

                <!-- Interactive Wax Seal Button -->
                <div class="pt-4">
                    <button type="button" class="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl wax-seal-pulse transform group-hover:scale-105 transition-all">
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

    if (!content.includes('id="envelopeSection"')) {
        content = content.replace(
            '<main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">',
            envelopeMarkup + '\n    <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">'
        );
    }

    // 3. Replace the Hook Section with Copywriting-driven letter opening
    const oldHookRegex = /<!-- =+ -->\s*<!-- 1\. ATTENTION: The 5-Minute Revelation[\s\S]*?<!-- Centralized "What You Will Discover In 5 Minutes" Card -->/m;
    
    const newHookMarkup = `<!-- ========================================================== -->
        <!-- 1. ATTENTION: Direct-Response Copywriting & Story Hook     -->
        <!-- ========================================================== -->
        <article id="officialSalesLetter" class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 brand-shadow mb-12">
            
            <div class="text-center max-w-3xl mx-auto mb-8">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-[#005f5a] border border-[#005f5a]/30 mb-4">
                    <span class="w-2 h-2 rounded-full bg-[#005f5a] animate-ping"></span>
                    <span>Official Newton Academy Admissions Briefing</span>
                </span>

                <h2 class="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold text-slate-900 tracking-tight leading-[1.32]">
                    Discover How You Can Start Making Up To <span class="text-[#005f5a] underline decoration-[#e5a93c] underline-offset-8 font-extrabold">$1,000 Monthly</span> As A Young Graduate, Stay-At-Home Mom, Or Underpaid Professional In Nigeria
                </h2>

                <p class="text-base sm:text-lg text-slate-600 font-sans mt-4 leading-[1.65]">
                    ...Without relocating abroad, hawking cheap physical products on WhatsApp, or waiting endlessly for government jobs that pay less than monthly inflation.
                </p>
            </div>

            <!-- Direct Personal Address -->
            <div class="border-t border-b border-slate-200/80 py-6 my-6 bg-slate-50/70 -mx-6 sm:-mx-12 px-6 sm:px-12">
                <p class="text-base sm:text-lg text-slate-900 font-bold mb-2">
                    Dear <span id="storyRecipientName" class="text-[#005f5a] underline decoration-amber-400">Freedom Obanijesu</span>,
                </p>
                <p class="text-sm sm:text-base text-slate-700 font-sans leading-[1.7]">
                    Let me share with you a quick, true story of two young Nigerians who were once completely trapped by the economic reality of this country...
                </p>
            </div>

            <!-- Story Body -->
            <div class="space-y-5 text-sm sm:text-base text-slate-700 font-sans leading-relaxed mb-8">
                <p>
                    The first was a brilliant university student who had to hawk boiled corn along campus pathways just to afford photocopies and feed herself through the semester. Despite graduating with top honors, the corporate world offered her nothing more than exploitative ₦40,000 monthly internships that barely covered transport fare.
                </p>
                <p>
                    The second was a graduate who left NYSC orientation with high hopes, only to spend long, dusty months doing backbreaking manual P.O.P ceiling work on construction sites under the scorching sun just to survive.
                </p>
                <p>
                    Today, both of them command thousands of dollars in international retainers every single month, working remotely with high-paying clients across North America, the UK, and Europe, right from their laptops here in Nigeria.
                </p>
                <p class="text-base sm:text-lg font-semibold text-slate-900 leading-[1.65]">
                    And below, you will discover how the Newton Academy Academic Council has fully endowed your <span class="text-emerald-700 font-bold underline decoration-emerald-300 underline-offset-4">100% Full Tuition Scholarship (₦200,000 value covered)</span> so you can duplicate their exact commercial systems.
                </p>
            </div>

            <!-- Centralized "What You Will Discover In 5 Minutes" Card -->`;

    content = content.replace(oldHookRegex, newHookMarkup);

    // 4. Update the envelope opener function and scholarship form handler
    const oldSubmitLogic = /sForm\.addEventListener\('submit', function\(e\) \{[\s\S]*?\}\);\s*\}/;
    
    const newSubmitLogic = `sForm.addEventListener('submit', function(e) {
                e.preventDefault();

                sBtn.disabled = true;
                sBtn.textContent = 'Submitting to Academic Council...';

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

    content = content.replace(oldSubmitLogic, newSubmitLogic);

    // 5. Add envelope opener function and name synchronizer in script
    const syncScript = `
        // Synchronize personalized recipient names across envelope and letter
        const envNameEl = document.getElementById('envelopeRecipientName');
        if (envNameEl) envNameEl.textContent = userName;
        const storyNameEl = document.getElementById('storyRecipientName');
        if (storyNameEl) storyNameEl.textContent = userName;

        window.openScholarshipEnvelope = function() {
            const envCard = document.getElementById('scholarshipEnvelopeCard');
            if (envCard) envCard.classList.add('is-open');
            const target = document.getElementById('officialSalesLetter') || document.getElementById('videoBriefing');
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        };
    `;

    if (!content.includes('openScholarshipEnvelope')) {
        content = content.replace(
            "const passEmailEl = document.getElementById('passEmail');",
            syncScript + "\n        const passEmailEl = document.getElementById('passEmail');"
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filename}`);
}

updateThankYouFile('thank-you.html', false);
updateThankYouFile('thank-you.php', true);


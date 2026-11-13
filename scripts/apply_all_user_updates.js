const fs = require('fs');

console.log('--- Applying All User Updates Across the Codebase ---');

// ========================================================
// 1. Define Updated Support Banner HTML (Odunayo Primary + Real Photos)
// ========================================================
const supportBannerHtml = `
    <!-- SUPPORT BANNER (WITH REAL PHOTOS OF ODUNAYO & FREEDOM) -->
    <section class="relative bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] text-slate-950 overflow-hidden border-b-8 border-[#003835]">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                <!-- Left: Headline & Support Contact Action -->
                <div class="md:col-span-7 space-y-4 text-center md:text-left">
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight">
                        Need Help? Contact us
                    </h2>
                    <p class="text-sm sm:text-base font-semibold text-slate-900 font-sans">
                        For more enquiries reach out to us. Available 24/7
                    </p>

                    <!-- Contact Cards (Odunayo Prioritized) -->
                    <div class="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                        
                        <!-- Odunayo (Lead Admissions Advisor - Prioritized) -->
                        <div class="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-[#005f5a] shadow-lg text-left flex items-center gap-3 relative">
                            <div class="relative">
                                <img src="assets/images/odunayo_support.jpg" alt="Odunayo - Lead Admissions Advisor" class="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm">
                                <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                            </div>
                            <div>
                                <div class="flex items-center gap-1.5">
                                    <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Lead Advisor</span>
                                    <span class="text-[10px] text-slate-500 font-semibold hidden sm:inline">Fast Response</span>
                                </div>
                                <span class="block text-sm sm:text-base font-black text-slate-950 mt-0.5">Odunayo</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <a href="https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 rounded-md shadow-sm transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        WhatsApp
                                    </a>
                                    <a href="tel:+2347019602639" class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md border border-slate-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"></path></svg>
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Freedom (Student Support Lead) -->
                        <div class="bg-white/95 rounded-2xl p-3.5 sm:p-4 border border-amber-600/30 shadow-md text-left flex items-center gap-3">
                            <div class="relative">
                                <img src="assets/images/freedom_support.jpg" alt="Freedom - Student Support Lead" class="w-12 h-12 rounded-full object-cover border-2 border-slate-300 shadow-sm">
                                <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                            </div>
                            <div>
                                <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Student Support Lead</span>
                                <span class="block text-sm sm:text-base font-black text-slate-900 mt-0.5">Freedom</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <a href="https://wa.me/2348053708909?text=Hello%20Freedom%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        WhatsApp
                                    </a>
                                    <a href="tel:+2348053708909" class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md border border-slate-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"></path></svg>
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Right: Large Authentic Portrait Card of Odunayo -->
                <div class="md:col-span-5 flex justify-center md:justify-end">
                    <div class="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#003835] group">
                        <img src="assets/images/odunayo_support.jpg" alt="Odunayo - Newton Academy Lead Admissions Advisor" class="w-full h-auto object-cover max-h-80 sm:max-h-96">
                        <div class="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-amber-400/40 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-white">
                            <div>
                                <span class="block text-xs font-bold text-white">Odunayo</span>
                                <span class="block text-[10px] text-emerald-400 font-medium">Lead Admissions Advisor</span>
                            </div>
                            <span class="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-300 font-bold bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/30">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                24/7 Active
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- FLOATING WHATSAPP BUTTON (DIRECTED TO ODUNAYO) -->
    <a href="https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group" aria-label="Chat with Odunayo on WhatsApp">
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span class="sr-only">Support WhatsApp with Odunayo</span>
    </a>
`;

// ========================================================
// 2. Define the Loading / Evaluation Popup Modal HTML
// ========================================================
const evaluationModalHtml = `
    <!-- EVALUATION / LOADING POPUP MODAL (BEFORE CONGRATULATIONS) -->
    <div id="evaluationModal" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border border-slate-200 transform transition-all">
            
            <div class="mx-auto w-16 h-16 rounded-full bg-teal-50 border-2 border-[#005f5a] flex items-center justify-center relative">
                <svg class="w-8 h-8 text-[#005f5a] animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>

            <div class="space-y-2">
                <span class="text-[11px] font-black uppercase tracking-widest text-[#005f5a] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                    Admissions Council Live Screening
                </span>
                <h3 id="evalModalHeading" class="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Evaluating Candidate File...
                </h3>
                <p id="evalModalStatus" class="text-xs sm:text-sm text-slate-600 font-sans">
                    Verifying applicant profile &amp; scholarship quota allocation...
                </p>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-2">
                <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div id="evalProgressBar" class="h-full bg-gradient-to-r from-[#005f5a] via-teal-500 to-amber-500 rounded-full transition-all duration-300" style="width: 15%"></div>
                </div>
                <div class="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>File Evaluation</span>
                    <span id="evalPercent">15%</span>
                </div>
            </div>

            <!-- Checklist Animation -->
            <div class="bg-slate-50 rounded-2xl p-4 text-left space-y-2.5 text-xs text-slate-700 font-sans border border-slate-100">
                <div id="evalStep1" class="flex items-center gap-2 text-slate-400">
                    <span class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">&#10003;</span>
                    <span>Identity and contact verification</span>
                </div>
                <div id="evalStep2" class="flex items-center gap-2 text-slate-400">
                    <span class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">&#10003;</span>
                    <span>Checking regional cohort quota allocation</span>
                </div>
                <div id="evalStep3" class="flex items-center gap-2 text-slate-400">
                    <span class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">&#10003;</span>
                    <span>Faculty Council ratification &amp; waiver grant</span>
                </div>
            </div>

            <div class="text-[11px] text-slate-400 italic">
                Please do not close this window. Processing official certificate...
            </div>
        </div>
    </div>
`;

// ========================================================
// 3. Define the Evaluation Modal Trigger Script
// ========================================================
const evaluationScript = `
    function triggerEvaluationModal(candidateName, targetUrl) {
        const modal = document.getElementById('evaluationModal');
        if (!modal) {
            window.location.href = targetUrl;
            return;
        }

        modal.classList.remove('hidden');
        const heading = document.getElementById('evalModalHeading');
        const status = document.getElementById('evalModalStatus');
        const pBar = document.getElementById('evalProgressBar');
        const pPercent = document.getElementById('evalPercent');
        const s1 = document.getElementById('evalStep1');
        const s2 = document.getElementById('evalStep2');
        const s3 = document.getElementById('evalStep3');

        if (heading) heading.textContent = 'Screening Candidate: ' + candidateName;

        // Step 1: 0 - 35%
        setTimeout(function() {
            if (pBar) pBar.style.width = '35%';
            if (pPercent) pPercent.textContent = '35%';
            if (status) status.textContent = 'Identity verified. Checking cohort seat availability...';
            if (s1) {
                s1.className = 'flex items-center gap-2 text-emerald-700 font-bold';
                s1.querySelector('span').className = 'w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]';
            }
        }, 800);

        // Step 2: 35 - 75%
        setTimeout(function() {
            if (pBar) pBar.style.width = '75%';
            if (pPercent) pPercent.textContent = '75%';
            if (status) status.textContent = 'Quota available. Ratifying 100% full tuition grant...';
            if (s2) {
                s2.className = 'flex items-center gap-2 text-emerald-700 font-bold';
                s2.querySelector('span').className = 'w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]';
            }
        }, 1800);

        // Step 3: 75 - 100% -> Congratulations!
        setTimeout(function() {
            if (pBar) pBar.style.width = '100%';
            if (pPercent) pPercent.textContent = '100%';
            if (heading) heading.innerHTML = '🎉 Congratulations, ' + candidateName + '!';
            if (status) status.innerHTML = '<strong class="text-emerald-700">100% Full Tuition Scholarship Officially Approved!</strong><br><span class="text-xs text-slate-500">Redirecting to your official award dossier...</span>';
            if (s3) {
                s3.className = 'flex items-center gap-2 text-emerald-700 font-bold';
                s3.querySelector('span').className = 'w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]';
            }
        }, 2900);

        // Forward to target URL
        setTimeout(function() {
            window.location.href = targetUrl;
        }, 4100);
    }
`;

// Export for other scripts if required
module.exports = {
    supportBannerHtml,
    evaluationModalHtml,
    evaluationScript
};
console.log('Template blocks prepared successfully.');

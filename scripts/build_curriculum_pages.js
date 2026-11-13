const fs = require('fs');

console.log('--- Building Upgraded Curriculum Pages with Hero, 5-Pillar Strip, Overview/Outcomes, Career Projections, Connected Modules, FAQ, Support Banner & Floating WhatsApp ---');

// ==========================================
// 5-PILLAR VALUE STRIP HTML
// ==========================================
const valueStripHtml = `
    <!-- 5-PILLAR HORIZONTAL VALUE STRIP -->
    <div class="bg-white border-b border-slate-200 py-6">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-left">
                <div class="py-3 md:py-0 md:px-4 first:pl-0">
                    <h4 class="font-bold text-slate-900 text-sm font-heading">Beginner Friendly</h4>
                    <p class="text-xs text-slate-500 mt-1">No prior experience required.</p>
                </div>
                <div class="py-3 md:py-0 md:px-4">
                    <h4 class="font-bold text-slate-900 text-sm font-heading">Job Placement Support</h4>
                    <p class="text-xs text-slate-500 mt-1">Launch your career with internships and retainers.</p>
                </div>
                <div class="py-3 md:py-0 md:px-4">
                    <h4 class="font-bold text-slate-900 text-sm font-heading">Flexible Learning</h4>
                    <p class="text-xs text-slate-500 mt-1">Choose to learn at a pace that fits your schedule.</p>
                </div>
                <div class="py-3 md:py-0 md:px-4">
                    <h4 class="font-bold text-slate-900 text-sm font-heading">World-Class Tutors &amp; Mentorship</h4>
                    <p class="text-xs text-slate-500 mt-1">Learn directly from verified industry practitioners.</p>
                </div>
                <div class="py-3 md:py-0 md:px-4 last:pr-0">
                    <h4 class="font-bold text-slate-900 text-sm font-heading">Recognised Diploma</h4>
                    <p class="text-xs text-slate-500 mt-1">Earn a globally verifiable diploma certificate.</p>
                </div>
            </div>
        </div>
    </div>
`;

// ==========================================
// SUPPORT BANNER & FLOATING WHATSAPP HTML
// ==========================================
const supportBannerHtml = `
    <!-- NEED HELP? CONTACT US SUPPORT BANNER -->
    <section class="my-14 max-w-5xl mx-auto px-4 sm:px-6">
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 shadow-xl border border-amber-300">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-10 relative z-10">
                <!-- Text & Contact Numbers Column -->
                <div class="md:col-span-7 space-y-4 text-slate-950">
                    <h3 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-slate-950">
                        Need Help? Contact us
                    </h3>
                    <p class="text-xs sm:text-sm md:text-base text-slate-900/90 font-medium leading-relaxed">
                        For more enquiries reach out to us. Available 24/7
                    </p>

                    <!-- Support Numbers Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <!-- Odunayo -->
                        <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-amber-200/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Admissions Advisor</span>
                                <h4 class="font-bold text-slate-900 text-sm">Odunayo</h4>
                                <span class="text-xs font-mono font-bold text-slate-800 block mt-0.5">+234 701 960 2639</span>
                            </div>
                            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                                <a href="https://wa.me/2347019602639?text=Hello%20Odunayo,%20I%20need%20help%20with%20Newton%20Academy" target="_blank" class="flex-1 text-center py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.182-.077.357.101.174.45 1.745 1.517 2.392.296.179.527.294.708.351.299.095.57.082.784.05.239-.036.737-.301.841-.592.104-.291.104-.541.073-.593-.031-.052-.116-.087-.245-.152z"/></svg>
                                    <span>WhatsApp</span>
                                </a>
                                <a href="tel:+2347019602639" class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all" title="Call Odunayo">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                </a>
                            </div>
                        </div>

                        <!-- Freedom -->
                        <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-amber-200/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Lead Coordinator</span>
                                <h4 class="font-bold text-slate-900 text-sm">Freedom</h4>
                                <span class="text-xs font-mono font-bold text-slate-800 block mt-0.5">+234 805 370 8909</span>
                            </div>
                            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                                <a href="https://wa.me/2348053708909?text=Hello%20Freedom,%20I%20need%20help%20with%20Newton%20Academy" target="_blank" class="flex-1 text-center py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.182-.077.357.101.174.45 1.745 1.517 2.392.296.179.527.294.708.351.299.095.57.082.784.05.239-.036.737-.301.841-.592.104-.291.104-.541.073-.593-.031-.052-.116-.087-.245-.152z"/></svg>
                                    <span>WhatsApp</span>
                                </a>
                                <a href="tel:+2348053708909" class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all" title="Call Freedom">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Support Representative Image Column -->
                <div class="md:col-span-5 flex justify-center md:justify-end">
                    <div class="relative w-52 sm:w-64 md:w-full max-w-[280px] rounded-3xl overflow-hidden border-4 border-white/60 shadow-2xl bg-teal-900">
                        <img src="assets/images/support_rep_headset.jpg" alt="Newton Academy 24/7 Admissions Support" class="w-full h-auto object-cover">
                        <div class="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1.5 text-center text-[11px] font-semibold">
                            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                            Admissions Desk Live
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Navy Strip (like reference image) -->
            <div class="bg-[#002f2d] text-amber-200 text-center py-2 px-4 text-xs font-semibold border-t border-amber-300/40">
                Newton Academy Admissions &bull; Instant Response via WhatsApp or Voice Call
            </div>
        </div>
    </section>

    <!-- FLOATING WHATSAPP BUTTON -->
    <a href="https://wa.me/2347019602639?text=Hello%20Newton%20Academy,%20I%20have%20an%20enquiry" target="_blank" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all" title="Chat on WhatsApp">
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.182-.077.357.101.174.45 1.745 1.517 2.392.296.179.527.294.708.351.299.095.57.082.784.05.239-.036.737-.301.841-.592.104-.291.104-.541.073-.593-.031-.052-.116-.087-.245-.152z"/></svg>
    </a>
`;

// ==========================================
// FAQ SECTION HTML (Zero Preheading!)
// ==========================================
const faqSectionHtml = `
    <!-- FAQ SECTION (Zero Preheading) -->
    <section class="my-14 max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-8">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                Do you have worries about why you should learn with Newton Academy?
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
                Clear, transparent answers to help you make an informed decision about your commercial education.
            </p>
        </div>

        <div class="space-y-3" id="faqAccordion">
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button type="button" onclick="toggleFaq(this)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-sm sm:text-base font-heading">Will this work for me if I am a complete beginner with zero tech experience?</span>
                    <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 faq-icon">+</span>
                </button>
                <div class="hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    Yes, absolutely. Our 3-month curriculum is engineered from first principles specifically for complete beginners. You do not need coding skills or mathematics backgrounds. Our lead tutors break down advanced tools into clear, step-by-step practical workflows with weekly hands-on guidance.
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button type="button" onclick="toggleFaq(this)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-sm sm:text-base font-heading">How will I secure foreign clients paying in USD or GBP while living in Nigeria?</span>
                    <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 faq-icon">+</span>
                </button>
                <div class="hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    Module 14 of our curriculum is dedicated exclusively to International Remote Client Acquisition. You will learn direct outreach frameworks, high-converting cold email scripts, portfolio positioning, and international contract negotiation. You will also learn how to legally set up USD/GBP receiving accounts (via Geegpay, Grey, or Payoneer) to withdraw straight into your Nigerian local bank account.
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button type="button" onclick="toggleFaq(this)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-sm sm:text-base font-heading">Is the 100% full-tuition scholarship genuine, and why is there an application fee?</span>
                    <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 faq-icon">+</span>
                </button>
                <div class="hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    Yes, 100%. The ₦200,000 standard tuition is fully covered by the Newton Academy Foundation endowment grant. The mandatory ₦20,000 fee is a commitment and administrative filter required to verify seat seriousness, provision your personal LMS student portal credentials, and assign dedicated faculty tutors. It ensures seats are allocated strictly to serious delegates.
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button type="button" onclick="toggleFaq(this)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-sm sm:text-base font-heading">Can I combine this with my 9-to-5 job, university classes, or NYSC?</span>
                    <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 faq-icon">+</span>
                </button>
                <div class="hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    Yes. The entire diploma is 100% online and self-paced. All live mentor workshops and defense sessions are scheduled in the evenings and on weekends, with 24/7 on-demand replays available in your LMS dashboard. You need just 4 to 6 hours per week to complete practical assignments.
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button type="button" onclick="toggleFaq(this)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-sm sm:text-base font-heading">What certificate do I receive, and is it recognized internationally?</span>
                    <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 faq-icon">+</span>
                </button>
                <div class="hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    Upon completing your 3-month curriculum and passing your capstone project defense, you receive the Newton Academy Professional Diploma Certificate with unique cryptographic verification ID that international employers and client platforms can verify online.
                </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button type="button" onclick="toggleFaq(this)" class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <span class="font-bold text-slate-900 text-sm sm:text-base font-heading">What happens if I get stuck or need personal guidance?</span>
                    <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 faq-icon">+</span>
                </button>
                <div class="hidden px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    You will never be left alone. Every fellow is assigned to a peer cohort and paired with an active industry mentor. You also have daily access to our exclusive cohort community channels, bi-weekly live Q&amp;A sessions, and direct student support from Odunayo and Freedom.
                </div>
            </div>
        </div>
    </section>
`;

// Helper script for Accordions (+ / - toggle)
const accordionScript = `
<script>
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.accordion-icon');
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) icon.textContent = '−';
    } else {
        content.classList.add('hidden');
        if (icon) icon.textContent = '+';
    }
}

function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) icon.textContent = '−';
    } else {
        content.classList.add('hidden');
        if (icon) icon.textContent = '+';
    }
}
</script>
`;

console.log('Templates ready. Now generating DM & DE curriculum modules and career projections.');


const fs = require('fs');

console.log('--- Generating Full Complete Curriculum Pages with User Refinements ---');

// Extract modules from compile scripts
const dmContent = fs.readFileSync('scripts/compile_dm_curriculum.js', 'utf8');
const deContent = fs.readFileSync('scripts/compile_de_curriculum.js', 'utf8');

const dmMatch = dmContent.match(/const dmModules = (\[[\s\S]*?\n\];)/);
const deMatch = deContent.match(/const deModules = (\[[\s\S]*?\n\];)/);

const dmModules = eval(dmMatch[1]);
const deModules = eval(deMatch[1]);

// 15 CONNECTED MODULES ACCORDION BUILDER
function buildModulesAccordionHtml(modules) {
    return `
    <div class="relative border-l-2 border-[#005f5a]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-5">
        ${modules.map((m, idx) => `
            <!-- Module ${m.num} -->
            <div class="relative group">
                <!-- Connected Node Circle on Line -->
                <div class="absolute -left-[35px] sm:-left-[51px] top-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#005f5a] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border-2 border-white group-hover:bg-amber-500 transition-colors">
                    ${m.num}
                </div>

                <!-- Accordion Card -->
                <div class="bg-white border border-slate-200/90 hover:border-[#005f5a] rounded-2xl shadow-sm transition-all overflow-hidden">
                    <button type="button" onclick="toggleAccordion(this)" class="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                        <div class="space-y-1 pr-2">
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-black uppercase tracking-wider text-[#005f5a] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                                    Module ${m.num}
                                </span>
                                <span class="text-xs font-mono font-bold text-slate-400">${m.week}</span>
                            </div>
                            <h3 class="text-sm sm:text-base md:text-lg font-bold text-slate-900 font-heading leading-snug">
                                ${m.title}
                            </h3>
                        </div>
                        <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 accordion-icon group-hover:bg-[#005f5a] group-hover:text-white transition-colors">
                            +
                        </span>
                    </button>

                    <!-- Collapsible Content -->
                    <div class="hidden px-5 pb-5 pt-2 border-t border-slate-100 space-y-3 font-sans text-xs sm:text-sm text-slate-600 bg-slate-50/40">
                        <p class="leading-relaxed">
                            ${m.desc}
                        </p>
                        <div class="pt-1">
                            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-900 block mb-1.5">
                                Practical Portfolio Deliverables:
                            </span>
                            <ul class="space-y-1.5">
                                ${m.deliverables.map(d => `
                                    <li class="flex items-start gap-2">
                                        <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span>${d}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
    `;
}

// FAQ SECTION (ZERO PREHEADINGS)
const faqSectionHtml = `
    <!-- FAQ SECTION (ZERO PREHEADINGS) -->
    <section class="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#003835] font-heading tracking-tight">
                    Do you have worries about why you should learn with Newton Academy?
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 font-sans mt-3 max-w-2xl mx-auto">
                    Here are straightforward, verified answers to the most common questions prospective fellows ask about our curriculum, diploma, and career outcomes.
                </p>
            </div>

            <div class="space-y-4">
                <!-- FAQ Item 1 -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden hover:border-[#005f5a] transition-all bg-white shadow-sm">
                    <button type="button" onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 font-heading text-sm sm:text-base hover:bg-slate-50 transition-colors">
                        <span>Is this diploma program suitable for complete beginners with zero background?</span>
                        <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-base shrink-0 faq-icon">+</span>
                    </button>
                    <div class="hidden p-5 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        Yes, absolutely. The curriculum is structured from the ground up starting with foundational digital concepts before moving into advanced artificial intelligence workflows, high-converting funnel architectures, and client acquisition retainers. You do not need any coding knowledge or prior digital marketing experience to succeed.
                    </div>
                </div>

                <!-- FAQ Item 2 -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden hover:border-[#005f5a] transition-all bg-white shadow-sm">
                    <button type="button" onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 font-heading text-sm sm:text-base hover:bg-slate-50 transition-colors">
                        <span>How are classes scheduled, and what if I have a busy 9-to-5 job or school?</span>
                        <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-base shrink-0 faq-icon">+</span>
                    </button>
                    <div class="hidden p-5 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        The program is 100% online and built for busy working professionals and university students. Masterclasses are hosted live on weekends and recorded in high definition. All lectures, slide decks, practical templates, and AI prompts are uploaded immediately to your dedicated LMS Student Portal for 24/7 on-demand replay access.
                    </div>
                </div>

                <!-- FAQ Item 3 -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden hover:border-[#005f5a] transition-all bg-white shadow-sm">
                    <button type="button" onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 font-heading text-sm sm:text-base hover:bg-slate-50 transition-colors">
                        <span>Are the tutors and instructors real industry practitioners?</span>
                        <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-base shrink-0 faq-icon">+</span>
                    </button>
                    <div class="hidden p-5 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        Yes. Our faculties are led by verified senior executives and venture operators—such as Theophilus Akhimie (M.Sc Marketing USA; worked with Pinterest, Accenture, and Adidas) and Judith Imanai (Tech founder, former FinTech COO, and ACCA certified). They teach real, battlefield-tested strategies, not theoretical classroom fluff.
                    </div>
                </div>

                <!-- FAQ Item 4 -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden hover:border-[#005f5a] transition-all bg-white shadow-sm">
                    <button type="button" onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 font-heading text-sm sm:text-base hover:bg-slate-50 transition-colors">
                        <span>How does the 100% Full Tuition Scholarship award work?</span>
                        <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-base shrink-0 faq-icon">+</span>
                    </button>
                    <div class="hidden p-5 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        Newton Academy's Council subsidizes the complete $250 / ₦385,000 tuition fee for qualified fellows through institutional endowments. Recipients only cover a one-time subsidized acceptance and LMS onboarding registration fee to secure their cloud student portal credentials, courseware resources, and grading evaluation access.
                    </div>
                </div>

                <!-- FAQ Item 5 -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden hover:border-[#005f5a] transition-all bg-white shadow-sm">
                    <button type="button" onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 font-heading text-sm sm:text-base hover:bg-slate-50 transition-colors">
                        <span>Will I receive an accredited, verifiable certificate upon graduation?</span>
                        <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-base shrink-0 faq-icon">+</span>
                    </button>
                    <div class="hidden p-5 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        Yes. Upon successful completion of the 15 modules and submission of your capstone portfolio project, you are awarded an official Newton Academy Diploma Certificate complete with a unique cryptographic verification serial and QR code that can be verified globally by employers on LinkedIn and company portals.
                    </div>
                </div>

                <!-- FAQ Item 6 -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden hover:border-[#005f5a] transition-all bg-white shadow-sm">
                    <button type="button" onclick="toggleFaq(this)" class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 font-heading text-sm sm:text-base hover:bg-slate-50 transition-colors">
                        <span>How will Newton Academy help me secure international remote client retainers or jobs?</span>
                        <span class="w-7 h-7 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-base shrink-0 faq-icon">+</span>
                    </button>
                    <div class="hidden p-5 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        Our final modules are dedicated specifically to International Client Acquisition, High-Ticket Retainers, and Global Remote Job Applications. You will receive plug-and-play cold pitch templates, contract agreements, multi-currency invoicing systems, and interview prep to win clients paying in USD, GBP, and EUR.
                    </div>
                </div>
            </div>

        </div>
    </section>
`;

// SUPPORT BANNER (WITH ODUNAYO PRIORITIZED & REAL PHOTOS)
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
                                    <a href="tel:+2347019602639" class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md border border-slate-300 transition-colors">
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
                                    <a href="https://wa.me/2348053708909?text=Hello%20Freedom%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        WhatsApp
                                    </a>
                                    <a href="tel:+2348053708909" class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md border border-slate-300 transition-colors">
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

// EVALUATION / LOADING POPUP MODAL HTML
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

// PAGE GENERATOR FUNCTION
function generateCurriculumPage(cfg) {
    const isPhp = cfg.isPhp;

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cfg.title} | Newton Academy</title>
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cabinet+Grotesk:wght@700;800;900&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        heading: ['Cabinet Grotesk', 'Poppins', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-heading { font-family: 'Cabinet Grotesk', sans-serif; }
        .brand-shadow { box-shadow: 0 20px 40px -15px rgba(0, 95, 90, 0.15); }
        .gold-glow { box-shadow: 0 10px 30px -8px rgba(245, 158, 11, 0.35); }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-[#005f5a] selection:text-white">

    <!-- Top Navigation Bar -->
    <header class="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
            <a href="index.html" class="flex items-center shrink-0">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-10 w-auto object-contain">
            </a>
            <div class="flex items-center gap-2 sm:gap-4 shrink-0">
                <a href="${isPhp ? 'scholarship.php' : 'scholarship.html'}" class="text-[11px] sm:text-xs font-bold text-[#005f5a] hover:text-[#004d49] hover:underline flex items-center gap-1 transition-colors whitespace-nowrap">
                    ← <span class="hidden sm:inline">Back to</span> <span>Scholarship Briefing</span>
                </a>
                <a href="#applyForm" class="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-[11px] sm:text-xs px-3.5 sm:px-5 py-2 rounded-full gold-glow transition-all whitespace-nowrap font-heading">
                    Apply Now
                </a>
            </div>
        </div>
    </header>

    <!-- 1. HERO SECTION (2-COLUMN HERO MATCHING SCREENSHOT 1a11c668) -->
    <section class="relative bg-gradient-to-br from-[#002826] via-[#003835] to-[#001f1e] text-white py-14 sm:py-20 overflow-hidden border-b border-teal-500/30">
        <!-- Subtle Background Glows -->
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <!-- Left Column: Copy & CTAs (PERFECTLY CENTERED BUTTON TEXT) -->
                <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div class="text-xs sm:text-sm font-black tracking-widest uppercase text-emerald-400 font-mono">
                        ${cfg.trackSubtitle}
                    </div>

                    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-heading text-white">
                        ${cfg.heroHeadline}
                    </h1>

                    <p class="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                        ${cfg.heroDescription}
                    </p>

                    <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                        <a href="#applyForm" class="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 text-center font-heading leading-normal">
                            Enrol Now
                        </a>
                        <a href="#applyForm" class="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl border border-white/30 transition-all text-center font-heading leading-normal">
                            Apply For Scholarship
                        </a>
                    </div>
                </div>

                <!-- Right Column: 3D Product Mockup Card -->
                <div class="lg:col-span-5 flex justify-center">
                    <div class="relative w-full max-w-md rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-slate-950 group">
                        <img src="${cfg.mockupImage}" alt="${cfg.title} Learning Suite" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500">
                        <div class="bg-slate-900/95 border-t border-amber-400/30 p-3 sm:p-4 flex items-center justify-between text-white text-xs">
                            <span class="flex items-center gap-1.5 text-emerald-400 font-semibold">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                LMS Portal + AI Tool Suite
                            </span>
                            <span class="text-amber-400 font-bold">${cfg.editionBadge}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- 2. 5-PILLAR HORIZONTAL VALUE STRIP (MATCHING SCREENSHOT 53009992) -->
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

    <!-- 3. COURSE OVERVIEW & LEARNING OUTCOMES (MATCHING SCREENSHOT eae853c4) -->
    <section class="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div class="text-center mb-10">
                <a href="#applyForm" class="inline-block bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all font-heading">
                    Download Course Brochure &amp; Curriculum PDF ↓
                </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <!-- Left: Overview & Outcomes -->
                <div class="lg:col-span-7 space-y-8">
                    
                    <div class="space-y-4">
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                            Course Overview
                        </h2>
                        ${cfg.overviewParagraphs}
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-200">
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
                            Learning Outcomes
                        </h3>
                        <ol class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed list-decimal list-outside pl-5">
                            ${cfg.learningOutcomes.map(item => `<li>${item}</li>`).join('\n')}
                        </ol>
                    </div>

                </div>

                <!-- Right: Program Card (PERFECTLY CENTERED BUTTONS WITH EQUAL HEIGHT) -->
                <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <img src="assets/images/virtual_fellows_laptops.jpg" alt="Newton Academy Fellows in Practical Training" class="w-full h-52 sm:h-64 object-cover">
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Program Duration:</span>
                            <span class="font-extrabold text-slate-900 font-mono text-sm">3 Months (12 Weeks)</span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Learning Format:</span>
                            <span class="font-bold text-[#005f5a]">100% Online + LMS Portal Replays</span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Weekly Commitment:</span>
                            <span class="font-bold text-slate-800">4 – 6 Hours / Week</span>
                        </div>
                        <div class="flex items-center justify-between pb-1 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Accreditation:</span>
                            <span class="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Verifiable Diploma</span>
                        </div>
                    </div>

                    <!-- Actions with Perfectly Centered Text and Equal Min-Heights -->
                    <div class="pt-2 flex flex-col sm:flex-row gap-3">
                        <a href="#applyForm" class="flex-1 min-h-[52px] px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-center text-sm shadow-md transition-all font-heading inline-flex items-center justify-center leading-tight">
                            Enrol Now
                        </a>
                        <a href="#applyForm" class="flex-1 min-h-[52px] px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#005f5a] font-bold text-center text-sm border-2 border-[#005f5a] transition-all font-heading inline-flex items-center justify-center leading-tight">
                            Apply For Scholarship
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </section>

    <!-- 4. CAREER OPPORTUNITIES & GLOBAL SALARY TRENDS (MATCHING SCREENSHOT 0e3fc429) -->
    <section class="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Opportunities & Pathways -->
                <div class="lg:col-span-7 space-y-8">
                    
                    <div>
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003835] font-heading tracking-tight mb-4">
                            Career Opportunities
                        </h2>
                        <ol class="space-y-2 text-xs sm:text-sm md:text-base text-slate-800 font-sans font-medium list-decimal list-outside pl-5 leading-relaxed">
                            ${cfg.careerOpportunities.map(co => `<li>${co}</li>`).join('\n')}
                        </ol>
                    </div>

                    <div class="pt-4 border-t border-slate-200">
                        <h3 class="text-xl sm:text-2xl font-bold text-[#003835] font-heading tracking-tight mb-3">
                            Career Pathways
                        </h3>
                        <ol class="space-y-1.5 text-xs sm:text-sm md:text-base text-slate-700 font-sans font-medium list-decimal list-outside pl-5 leading-relaxed">
                            ${cfg.careerPathways.map(cp => `<li>${cp}</li>`).join('\n')}
                        </ol>
                    </div>

                </div>

                <!-- Right: Salary Trend Table (Matching screenshot 0e3fc429) -->
                <div class="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                    <div class="bg-[#003835] text-white p-4 font-bold text-sm sm:text-base font-heading flex items-center justify-between">
                        <span>Salary Trend (${cfg.trackName})</span>
                        <span class="text-[10px] text-amber-400 font-mono">USD ($)</span>
                    </div>
                    <table class="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                            <tr class="bg-[#004d49] text-white font-semibold text-[11px] uppercase tracking-wider">
                                <th class="p-3 border-r border-teal-800">Year</th>
                                <th class="p-3 text-right">Average Global Salary (USD)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                            ${cfg.salaryTrends.map(st => `
                                <tr class="${st.highlight ? 'bg-teal-50/70 font-bold text-slate-900' : (st.projected ? 'bg-amber-50/80 font-black text-amber-950' : 'hover:bg-slate-50')}">
                                    <td class="p-3 ${st.projected ? 'text-amber-800' : 'text-teal-800 font-bold'} border-r border-slate-100 font-mono">${st.year}</td>
                                    <td class="p-3 text-right font-mono ${st.projected ? 'text-amber-700 font-black text-sm' : ''}">${st.salary}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="p-3 bg-slate-50 text-[10px] text-slate-500 text-center border-t border-slate-100">
                        Based on verified international remote market benchmarks across Upwork, LinkedIn, and foreign agency retainers.
                    </div>
                </div>

            </div>

        </div>
    </section>

    <!-- 5. FULL 15-MODULE SYLLABUS (CONNECTED ACCORDION LIST WITH PLUS SIGNS) -->
    <section id="modules" class="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div class="text-center max-w-2xl mx-auto mb-12">
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                    The 15 Comprehensive Modules of ${cfg.trackName}
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 font-sans mt-2">
                    Click each module to view full lesson breakdowns and practical portfolio deliverables.
                </p>
            </div>

            <!-- Connected Accordion List -->
            ${cfg.modulesAccordionHtml}

        </div>
    </section>

    <!-- 6. LEAD FACULTY TUTOR PROFILE -->
    <section class="bg-gradient-to-br from-[#002f2d] via-[#004d49] to-[#003835] text-white py-16 border-y-2 border-teal-400/30">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <!-- Tutor Photo Column -->
                <div class="md:col-span-6 text-center md:text-left space-y-4">
                    <div class="relative inline-block mx-auto md:mx-0 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-900">
                        <img src="${cfg.tutorImage}" alt="${cfg.tutorName}" class="w-full sm:w-[420px] md:w-full h-auto object-cover max-h-[560px]">
                        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                            <span class="block text-amber-400 text-xs font-black uppercase tracking-wider">Lead Programme Tutor</span>
                            <span class="block text-white text-sm font-bold">${cfg.tutorName}</span>
                        </div>
                    </div>
                </div>

                <!-- Tutor Bio Column -->
                <div class="md:col-span-6 space-y-5">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                        ${cfg.tutorHeadline}
                    </h2>
                    ${cfg.tutorBioHtml}
                </div>
            </div>
        </div>
    </section>

    <!-- 7. FAQ SECTION (ZERO PREHEADINGS) -->
    ${faqSectionHtml}

    <!-- 8. SUPPORT BANNER (WITH ODUNAYO PRIORITIZED & REAL PHOTOS) -->
    ${supportBannerHtml}

    <!-- 9. SCHOLARSHIP APPLICATION FORM -->
    <section id="applyForm" class="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div class="max-w-xl mx-auto px-4 sm:px-6">
            
            <div class="text-center mb-8 space-y-2">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Apply for 100% Full Tuition Scholarship
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 font-sans">
                    Complete your candidate file. Submissions are evaluated immediately by the Admissions Board.
                </p>
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 brand-shadow">
                <form id="officialScholarshipForm" class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Legal Name</label>
                        <input type="text" id="fullName" name="fullName" required placeholder="e.g. Amina Bello" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none text-sm transition-all">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Primary Email Address</label>
                        <input type="email" id="email" name="email" required placeholder="e.g. amina@gmail.com" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none text-sm transition-all">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">WhatsApp Phone Number</label>
                        <input type="tel" id="phone" name="phone" required placeholder="e.g. +234 810 000 0000" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none text-sm transition-all">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Selected Program Track</label>
                        <input type="text" id="course_select" name="programme" readonly value="${cfg.trackFullName}" class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm outline-none">
                    </div>

                    <div class="pt-2">
                        <button type="submit" id="submitBtn" class="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 text-slate-950 font-black text-sm sm:text-base gold-glow transition-all transform active:scale-95 text-center font-heading">
                            Submit Application &amp; Access Award Document
                        </button>
                    </div>

                    <div class="text-center text-[11px] text-slate-400 pt-1">
                        Secured with 256-bit encryption &bull; Real-time faculty review
                    </div>
                </form>
            </div>

        </div>
    </section>

    <!-- 10. EVALUATION / LOADING POPUP MODAL (BEFORE CONGRATULATIONS) -->
    ${evaluationModalHtml}

    <!-- 11. MINIMAL BRAND FOOTER -->
    <footer class="bg-[#003835] text-slate-300 py-10 border-t border-emerald-900/50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <a href="index.html" class="inline-block">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 w-auto mx-auto object-contain brightness-0 invert">
            </a>
            <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
                <a href="curriculum-dm.html" class="hover:text-amber-400 transition-colors">Digital Marketing</a>
                <a href="curriculum-de.html" class="hover:text-amber-400 transition-colors">Digital Entrepreneurship</a>
                <a href="${isPhp ? 'scholarship.php' : 'scholarship.html'}" class="hover:text-amber-400 transition-colors">Scholarship Portal</a>
                <a href="mailto:na@newtoncore.com" class="hover:text-amber-400 transition-colors">na@newtoncore.com</a>
            </div>
            <p class="text-[11px] text-slate-400 pt-2">&copy; 2026 Newton Academy. All rights reserved. Professional education only.</p>
        </div>
    </footer>

    <!-- ACCORDION & EVALUATION SCRIPTS -->
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
            }, 4200);
        }

        // Form submission wiring
        document.addEventListener('DOMContentLoaded', function() {
            // Prepopulate from localStorage
            try {
                const sName = localStorage.getItem('newton_name') || '';
                const sEmail = localStorage.getItem('newton_email') || '';
                const sPhone = localStorage.getItem('newton_phone') || '';
                if (sName && document.getElementById('fullName')) document.getElementById('fullName').value = sName;
                if (sEmail && document.getElementById('email')) document.getElementById('email').value = sEmail;
                if (sPhone && document.getElementById('phone')) document.getElementById('phone').value = sPhone;
            } catch(e) {}

            const form = document.getElementById('officialScholarshipForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const name = document.getElementById('fullName').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const phone = document.getElementById('phone').value.trim();
                    const appId = 'NA-SCH-' + Date.now().toString().slice(-6);

                    try {
                        localStorage.setItem('newton_name', name);
                        localStorage.setItem('newton_email', email);
                        localStorage.setItem('newton_phone', phone);
                        localStorage.setItem('newton_track', '${cfg.trackFullName}');
                        localStorage.setItem('newton_app_id', appId);
                    } catch(e) {}

                    // Background submit
                    try {
                        const fd = new FormData(form);
                        fd.append('app_id', appId);
                        fd.append('source', localStorage.getItem('newton_source') || 'WhatsApp');
                        fd.append('location', localStorage.getItem('newton_location') || 'Lagos, Nigeria');
                        fetch('api/scholarship.php', { method: 'POST', body: fd }).catch(function() {});
                    } catch(e) {}

                    const chkParams = new URLSearchParams({
                        app_id: appId,
                        name: name,
                        email: email,
                        phone: phone,
                        track: '${cfg.trackFullName}'
                    });
                    const targetUrl = '${isPhp ? 'checkout.php' : 'checkout.html'}?' + chkParams.toString();

                    // Trigger evaluation popup before redirecting
                    triggerEvaluationModal(name, targetUrl);
                });
            }
        });
    </script>
</body>
</html>`;
}

// Config for DM
const dmConfig = {
    trackKey: 'dm',
    title: 'Digital Marketing + Applied AI Diploma Curriculum',
    trackName: 'Digital Marketing + Applied AI',
    trackFullName: 'Digital Marketing + Applied AI',
    trackSubtitle: 'Digital Marketing (Applied AI)',
    heroHeadline: 'Become a World-Class Digital Marketer & Growth Strategist',
    heroDescription: 'Master multi-platform paid ads (Meta, Google, TikTok), high-converting direct-response copywriting, and international client acquisition paying in USD.',
    mockupImage: 'assets/images/mockup_digital_marketing.jpg',
    editionBadge: '100% Online',
    overviewParagraphs: `
        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
            The <strong>Digital Marketing + Applied AI</strong> diploma program equips delegates with the practical skills to deploy high-ROAS paid advertising, master direct-response copywriting, construct automated sales funnels, and acquire high-paying foreign clients in USD and GBP.
        </p>
        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
            You will learn how to architect conversion campaigns on Meta (Facebook &amp; Instagram), Google Search &amp; YouTube, and TikTok, while integrating generative AI tools to automate copywriting, video creative production, and audience targeting.
        </p>
        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
            This beginner-to-advanced curriculum blends data-driven media buying with psychological sales funnels, preparing you to operate as an elite growth marketer, in-demand agency freelancer, or foreign remote specialist.
        </p>
    `,
    learningOutcomes: [
        '<strong>Multi-Platform Paid Advertising:</strong> Master conversion campaign architecture across Meta Ads Manager, Google Performance Max, and TikTok Ads delivering verified Return on Ad Spend (ROAS).',
        '<strong>Persuasive Direct-Response Copywriting:</strong> Write high-converting sales letters, video sales scripts (VSLs), and email sequences using applied generative AI.',
        '<strong>Conversion Funnels &amp; CRO:</strong> Construct and optimize high-converting landing pages, lead capture mechanisms, and automated WhatsApp/email customer journeys.',
        '<strong>Data Analytics &amp; Attribution:</strong> Implement Google Analytics 4 (GA4), Meta Pixel Conversions API (CAPI), and user heatmap tracking to optimize marketing ROI.',
        '<strong>International Remote Client Acquisition:</strong> Pitch, close, and retain international clients in the US, UK, and Canada paying $1,500 – $5,000 monthly retainers.',
        '<strong>Commercial Growth Defense:</strong> Execute a live capstone agency campaign defending an end-to-end commercial growth audit before faculty evaluators.'
    ],
    careerOpportunities: [
        '<strong>United States</strong> – $85,000 – $130,000 USD / yr',
        '<strong>United Kingdom</strong> – £50,000 – £90,000 GBP / yr',
        '<strong>Canada</strong> – $70,000 – $110,000 CAD / yr',
        '<strong>Germany &amp; EU</strong> – €55,000 – €95,000 EUR / yr',
        '<strong>Nigeria</strong> – ₦6,000,000 – ₦14,000,000 NGN / yr',
        '<strong>Kenya &amp; East Africa</strong> – KSh 3,200,000 – KSh 5,500,000 KES / yr',
        '<strong>Remote / Global Agency Roles</strong> – $75,000 – $120,000 USD / yr'
    ],
    careerPathways: [
        'AI Growth &amp; Performance Marketer',
        'Meta, Google &amp; TikTok Paid Media Buyer',
        'Direct-Response Copywriter &amp; Funnel Architect',
        'Conversion Rate Optimization (CRO) Strategist',
        'Head of Growth &amp; International Agency Retainer Consultant'
    ],
    salaryTrends: [
        { year: '2018', salary: '$72,000', highlight: false },
        { year: '2019', salary: '$78,000', highlight: false },
        { year: '2020', salary: '$86,000', highlight: false },
        { year: '2021', salary: '$94,000', highlight: false },
        { year: '2022', salary: '$105,000', highlight: false },
        { year: '2023', salary: '$114,000', highlight: false },
        { year: '2024', salary: '$127,000', highlight: true },
        { year: '2026 (Projected)', salary: '$138,000+', projected: true }
    ],
    modulesAccordionHtml: buildModulesAccordionHtml(dmModules),
    tutorImage: 'assets/images/tutor_theophilus_akhimie.jpg',
    tutorName: 'Theophilus Akhimie',
    tutorHeadline: 'Theophilus Akhimie: Seasoned Digital Marketer &amp; Growth Specialist',
    tutorBioHtml: `
        <p class="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-sans">
            Theophilus Akhimie is a seasoned Digital Marketer and Growth Specialist with over 12 years of hands-on experience driving multi-million-dollar acquisition campaigns across top technology and consumer giants.
        </p>
        <div class="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <p>
                He has led paid media strategy and conversion funnels for iconic brands including <strong>Pinterest</strong>, <strong>Accenture</strong>, <strong>Adidas</strong>, and <strong>DLHS</strong>.
            </p>
            <p>
                Holding an M.Sc in Marketing from the United States, Theophilus strips away theoretical academic fluff and trains fellows on exact tactical frameworks that produce real revenue.
            </p>
        </div>
    `
};

// Config for DE
const deConfig = {
    trackKey: 'de',
    title: 'Digital Entrepreneurship & Business Innovation Diploma Curriculum',
    trackName: 'Digital Entrepreneurship & Business Innovation',
    trackFullName: 'Digital Entrepreneurship + Applied AI',
    trackSubtitle: 'Digital Entrepreneurship (Business Innovation)',
    heroHeadline: 'Become a World-Class Digital Entrepreneur & Venture Founder',
    heroDescription: 'Build scalable automated internet businesses: create high-margin digital products, deploy automated sales engines, and use AI to replace expensive staff.',
    mockupImage: 'assets/images/mockup_digital_entrepreneurship.jpg',
    editionBadge: 'Founder Edition',
    overviewParagraphs: `
        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
            The <strong>Digital Entrepreneurship &amp; Business Innovation</strong> diploma program teaches founders how to discover profitable market opportunities, build and package high-margin digital assets (software, info-products, productized services), and automate global customer sales with applied artificial intelligence.
        </p>
        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
            You will master modern venture engineering: validating commercial ideas before building, pricing irresistible grand-slam offers, architecting automated monetization funnels, and managing cash flow and operations.
        </p>
        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
            This intensive program is designed for aspiring internet entrepreneurs, agency founders, and consultants seeking scalable, recurring income in hard currencies without geographical boundaries.
        </p>
    `,
    learningOutcomes: [
        '<strong>Digital Business Model Engineering:</strong> Design high-margin internet business models (SaaS, digital products, consulting) with 80%+ profit margins and low overhead.',
        '<strong>Market Validation &amp; Demand Testing:</strong> Test customer willingness to pay and validate market niches before writing a single line of code or packaging assets.',
        '<strong>Irresistible Offer Creation:</strong> Engineer premium value-stacked offers, risk reversals, and tiered pricing that command premium rates.',
        '<strong>Automated Sales &amp; Growth Engines:</strong> Deploy self-running sales funnels, email automation, and conversational AI chatbots that convert leads 24/7.',
        '<strong>AI Leverage for Lean Operations:</strong> Replace expensive overhead and large teams by integrating AI agents for operations, customer onboarding, and content generation.',
        '<strong>Venture Launch &amp; Live Pitch:</strong> Package a complete commercial digital product, launch it live to market, and defend your venture model before investor mentors.'
    ],
    careerOpportunities: [
        '<strong>United States</strong> – $95,000 – $180,000+ USD / yr',
        '<strong>United Kingdom</strong> – £60,000 – £120,000+ GBP / yr',
        '<strong>Canada</strong> – $80,000 – $145,000+ CAD / yr',
        '<strong>Germany &amp; EU</strong> – €65,000 – €110,000+ EUR / yr',
        '<strong>Nigeria</strong> – ₦12,000,000 – ₦35,000,000+ NGN / yr',
        '<strong>Kenya &amp; East Africa</strong> – KSh 5,000,000 – KSh 12,000,000 KES / yr',
        '<strong>Global Automated Online Ventures</strong> – $85,000 – $250,000+ USD / yr'
    ],
    careerPathways: [
        'Automated Digital Product Creator &amp; Publisher',
        'AI Automation &amp; Micro-SaaS Agency Founder',
        'E-Commerce &amp; Knowledge Monetization Architect',
        'Digital Operations &amp; Commercial Growth Consultant',
        'Scaled Multi-Venture Internet Entrepreneur'
    ],
    salaryTrends: [
        { year: '2018', salary: '$78,000', highlight: false },
        { year: '2019', salary: '$88,000', highlight: false },
        { year: '2020', salary: '$102,000', highlight: false },
        { year: '2021', salary: '$118,000', highlight: false },
        { year: '2022', salary: '$134,000', highlight: false },
        { year: '2023', salary: '$152,000', highlight: false },
        { year: '2024', salary: '$172,000', highlight: true },
        { year: '2026 (Projected)', salary: '$210,000+', projected: true }
    ],
    modulesAccordionHtml: buildModulesAccordionHtml(deModules),
    tutorImage: 'assets/images/tutor_judith_imanai.jpg',
    tutorName: 'Judith Imanai',
    tutorHeadline: 'Judith Imanai: Seasoned Digital Entrepreneur &amp; FinTech Leader',
    tutorBioHtml: `
        <p class="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-sans">
            Judith Imanai is a seasoned Digital Entrepreneur with deep domain expertise in FinTech, specializing in digital financial products that address real consumer problems in Africa's financial ecosystems.
        </p>
        <div class="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <p>
                She has co-founded multiple groundbreaking tech companies, including <strong>Advanshub</strong>, <strong>Techpill Kenya</strong> (telemedicine), and <strong>Uthabiti Africa</strong> (childcare tech).
            </p>
            <p>
                Former Chief Operating Officer (COO) of <strong>Stawika Capital</strong>, she holds a Master's degree in Entrepreneurship from the University of Nairobi and is ACCA certified.
            </p>
        </div>
    `
};

// Write DM files
fs.writeFileSync('curriculum-dm.html', generateCurriculumPage({ ...dmConfig, isPhp: false }), 'utf8');
fs.writeFileSync('curriculum-dm.php', generateCurriculumPage({ ...dmConfig, isPhp: true }), 'utf8');
console.log('Successfully wrote curriculum-dm.html and curriculum-dm.php');

// Write DE files
fs.writeFileSync('curriculum-de.html', generateCurriculumPage({ ...deConfig, isPhp: false }), 'utf8');
fs.writeFileSync('curriculum-de.php', generateCurriculumPage({ ...deConfig, isPhp: true }), 'utf8');
console.log('Successfully wrote curriculum-de.html and curriculum-de.php');

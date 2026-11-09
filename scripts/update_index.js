const fs = require('fs');
const path = require('path');

function updateIndexFile(filename, isPhp) {
    const filePath = path.join(__dirname, '..', filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filename}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix the broken og:title meta tag at line 11
    content = content.replace(
        /<meta property="og:title" content="From Skills to[\s\S]*?AI to Get Ahead">/g,
        '<meta property="og:title" content="From Skills to Income: Building Your Brand, Growing Your Business &amp; Using AI to Get Ahead | Newton Academy">'
    );

    // 2. Add Facebook / Google disclaimer directly inside the opt-in card beneath the form
    const formEndMarker = '</form>';
    const disclaimerMarkup = `</form>
                    <div class="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-400 text-center leading-normal font-sans">
                        <p>This site is not a part of the Facebook™ website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook™ or Meta Platforms, Inc. in any way. FACEBOOK™ is a trademark of META PLATFORMS, INC. This site is also not a part of Google™ or Alphabet Inc.</p>
                    </div>`;

    if (!content.includes('This site is not a part of the Facebook™ website') && content.includes(formEndMarker)) {
        content = content.replace(formEndMarker, disclaimerMarkup);
    }

    // 3. Add Conference Features & Attendee Fast-Action Bonuses Section before Faculty Section
    const featuresAndBonusesSection = `
    <!-- ============================================================== -->
    <!-- CONFERENCE FEATURES & ATTENDEE FAST-ACTION BONUSES              -->
    <!-- ============================================================== -->
    <section id="features-bonuses" class="border-t border-slate-200 bg-white py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div class="text-center max-w-3xl mx-auto mb-12">
                <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-[#005f5a] border border-[#005f5a]/30 mb-3">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>100% Free Virtual Access Endowed by Newton Academy</span>
                </span>
                <h2 class="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                    Conference Features &amp; Exclusive Attendee Bonuses
                </h2>
                <p class="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
                    Every registered delegate receives full virtual access to our live masterclasses, plus fast-action bonuses valued at over <strong>₦390,000</strong> completely free.
                </p>
            </div>

            <!-- CORE CONFERENCE FEATURES GRID -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                
                <div class="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 brand-shadow card-hover-lift">
                    <div class="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-[#005f5a] flex items-center justify-center font-black text-xl mb-4">
                        01
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2">Live Interactive Masterclasses</h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        3 power-packed days covering high-income skill commercialization, high-ticket brand positioning, and enterprise AI workflows that command foreign currency.
                    </p>
                </div>

                <div class="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 brand-shadow card-hover-lift">
                    <div class="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-xl mb-4">
                        02
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2">Live Real-World Case Breakdowns</h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        Watch faculty mentors dissect live product positioning, high-converting offer structures, and client acquisition pipelines live on screen.
                    </p>
                </div>

                <div class="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 brand-shadow card-hover-lift">
                    <div class="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-[#005f5a] flex items-center justify-center font-black text-xl mb-4">
                        03
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2">Live Q&amp;A With Global Faculty</h3>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        Get your specific business, career, and income questions answered directly by tutors with leadership experience at Meta, Microsoft, and Accenture.
                    </p>
                </div>

            </div>

            <!-- EXCLUSIVE FAST-ACTION BONUSES CONTAINER -->
            <div class="bg-gradient-to-br from-[#003330] via-[#004d49] to-[#002f2d] text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400/50 shadow-2xl relative overflow-hidden">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6 mb-8">
                    <div>
                        <span class="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
                            Valued at Over ₦390,000 &bull; Yours 100% Free
                        </span>
                        <h3 class="text-xl sm:text-3xl font-black text-white tracking-tight">
                            Included Attendee Fast-Action Bonuses
                        </h3>
                    </div>
                    <span class="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl uppercase tracking-wider self-start sm:self-auto shadow-lg">
                        Free With Your Pass
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm font-sans">
                    
                    <!-- Bonus 1: 100% Scholarship Entry -->
                    <div class="bg-white/10 backdrop-blur-sm border border-amber-400/40 p-5 rounded-2xl flex items-start gap-3.5">
                        <span class="text-amber-400 font-black text-lg shrink-0">★</span>
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h4 class="font-bold text-white text-sm sm:text-base">100% Full Tuition Scholarship Access</h4>
                                <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">₦200,000 Value</span>
                            </div>
                            <p class="text-teal-100 text-xs leading-relaxed">
                                Automatic entry to win an official 100% Full Tuition Scholarship into the Newton Academy 3-Month International Diploma Programme (Digital Entrepreneurship or Digital Marketing).
                            </p>
                        </div>
                    </div>

                    <!-- Bonus 2: Global Certification -->
                    <div class="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl flex items-start gap-3.5">
                        <span class="text-amber-400 font-black text-lg shrink-0">★</span>
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h4 class="font-bold text-white text-sm sm:text-base">Globally Recognized Certification</h4>
                                <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">₦50,000 Value</span>
                            </div>
                            <p class="text-teal-100 text-xs leading-relaxed">
                                Receive an official, verifiable Professional Certificate of Attendance issued by Newton Academy to enhance your LinkedIn credential and professional portfolio.
                            </p>
                        </div>
                    </div>

                    <!-- Bonus 3: Direct Global Tutors Mentorship -->
                    <div class="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl flex items-start gap-3.5">
                        <span class="text-amber-400 font-black text-lg shrink-0">★</span>
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h4 class="font-bold text-white text-sm sm:text-base">Direct Access to Global Tutors</h4>
                                <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">₦75,000 Value</span>
                            </div>
                            <p class="text-teal-100 text-xs leading-relaxed">
                                Unfiltered access to industry leaders and tutors with enterprise backgrounds at Microsoft, Meta, Accenture, and 7Up Bottling Company.
                            </p>
                        </div>
                    </div>

                    <!-- Bonus 4: AI Prompt Vault -->
                    <div class="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl flex items-start gap-3.5">
                        <span class="text-amber-400 font-black text-lg shrink-0">★</span>
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h4 class="font-bold text-white text-sm sm:text-base">2026 AI Prompt Vault &amp; Toolkit</h4>
                                <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">₦35,000 Value</span>
                            </div>
                            <p class="text-teal-100 text-xs leading-relaxed">
                                The exact commercial prompts, proposal templates, and marketing frameworks used by our faculty to generate revenue in foreign currency.
                            </p>
                        </div>
                    </div>

                    <!-- Bonus 5: Private Delegate WhatsApp Room -->
                    <div class="bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-2xl flex items-start gap-3.5 md:col-span-2">
                        <span class="text-amber-400 font-black text-lg shrink-0">★</span>
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <h4 class="font-bold text-white text-sm sm:text-base">Private Delegate WhatsApp Community Room</h4>
                                <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">₦30,000 Value</span>
                            </div>
                            <p class="text-teal-100 text-xs leading-relaxed">
                                Network directly with 500+ ambitious women, executives, and business builders across Nigeria, the UK, the US, and the African diaspora.
                            </p>
                        </div>
                    </div>

                </div>

                <div class="mt-8 pt-6 border-t border-white/15 text-center">
                    <a href="#register" class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl hover:from-amber-300 hover:to-amber-400 transform active:scale-95 transition-all">
                        <span>Reserve Your Free Delegate Pass &amp; Claim All Bonuses</span>
                        <span>→</span>
                    </a>
                </div>

            </div>

        </div>
    </section>
`;

    if (!content.includes('id="features-bonuses"')) {
        content = content.replace(
            '<!-- GLOBAL FACULTY & TUTORS SECTION -->',
            featuresAndBonusesSection + '\n    <!-- GLOBAL FACULTY & TUTORS SECTION -->'
        );
    }

    // 4. Fix testimonials in index.html / index.php:
    // Remove inline 32-item array and replace slider with full 100 review slider
    const inlineTestimonialsPattern = /const testimonialsData = \[[\s\S]*?\];\s*(?:let currentIndex = 0;[\s\S]*?\}\s*initTestimonialSlider\(\);)?/m;
    
    // Replace with clean external script calls
    if (content.includes('const testimonialsData = [')) {
        content = content.replace(inlineTestimonialsPattern, '// Testimonials loaded from assets/js/testimonials.js (100 verified reviews)');
    }

    // Ensure external scripts are loaded at bottom of page
    if (!content.includes('src="assets/js/testimonials.js"')) {
        content = content.replace(
            '<script src="assets/js/animations.js"></script>',
            '<script src="assets/js/testimonials.js"></script>\n    <script src="assets/js/testimonial-slider.js"></script>\n    <script src="assets/js/animations.js"></script>\n    <script>document.addEventListener("DOMContentLoaded", function() { if (typeof initTestimonialSlider === "function") initTestimonialSlider(); });</script>'
        );
    }

    // 5. Update footer with legal compliance disclaimers
    const fullLegalDisclaimer = `
    <!-- Comprehensive Legal & Platform Disclaimer -->
    <div class="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-slate-200 text-[10px] text-slate-400 text-center leading-normal space-y-2">
        <p>
            <strong>FACEBOOK / META DISCLAIMER:</strong> This site is not a part of the Facebook™ website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook™ or Meta Platforms, Inc. in any way. FACEBOOK™ is a trademark of META PLATFORMS, INC.
        </p>
        <p>
            <strong>GOOGLE DISCLAIMER:</strong> This site is not a part of Google™ or Alphabet Inc. Additionally, this site is NOT endorsed by Google™ in any way. GOOGLE™ is a trademark of GOOGLE, LLC.
        </p>
        <p>
            <strong>EARNINGS &amp; EDUCATIONAL DISCLOSURE:</strong> Newton Academy provides professional training and educational systems. We cannot and do not make any guarantees about your ability to earn money with our ideas, information, or strategies. Your results depend completely on your dedication, skills, and commercial execution.
        </p>
    </div>`;

    if (!content.includes('FACEBOOK / META DISCLAIMER') && content.includes('</footer>')) {
        content = content.replace('</footer>', fullLegalDisclaimer + '\n    </footer>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filename}`);
}

updateIndexFile('index.html', false);
updateIndexFile('index.php', true);


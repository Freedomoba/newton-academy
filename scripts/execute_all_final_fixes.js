const fs = require('fs');

console.log('--- Executing All Final User Fixes ---');

// =========================================================================
// 1. FULL-WIDTH (UNBOXED) DARK PINE TEAL UNICEF SECTION
// (w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] so it's 100% full bleed, edge-to-edge)
// =========================================================================
const fullWidthUnicefSectionHtml = `
    <!-- UNICEF FEMALE TECH EMPOWERMENT (FULL WIDTH BACKGROUND - NOT BOXED) -->
    <div class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-[#002826] via-[#003835] to-[#001f1e] text-white py-16 sm:py-20 border-y-2 border-teal-500/30 overflow-hidden my-12">
        <!-- Background Watermark Image -->
        <div class="absolute inset-0 z-0 pointer-events-none">
            <img src="assets/images/unicef_girls_coding_classroom.jpg" alt="UNICEF Digital Empowerment for Women &amp; Girls" class="w-full h-full object-cover opacity-20 mix-blend-overlay">
            <div class="absolute inset-0 bg-gradient-to-r from-[#002826] via-[#003835]/95 to-[#001f1e]"></div>
        </div>

        <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 z-10">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                Empowering Women &amp; Girls In Tech To Lead The Global AI Economy
            </h2>

            <p class="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-sans">
                In alignment with UNICEF's global vision for female education, digital inclusion, and economic emancipation, Newton Academy champions the education and elevation of women, ladies, and the girl child. We equip females across Africa and the diaspora with practical commercial skills in digital marketing, enterprise automation, and applied artificial intelligence.
            </p>

            <div class="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-teal-100 font-sans">
                <span class="font-bold text-amber-300 block mb-1">Inclusivity Commitment:</span>
                While our primary institutional focus is closing the digital gender divide and uplifting female builders, <strong class="text-white">ambitious male delegates are warmly welcome</strong> to apply and learn side by side in our transformative cohorts.
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                <div class="rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                    <img src="assets/images/unicef_women_laptops_joy.jpg" alt="Joyful Female Fellows with Laptops" class="w-full h-32 sm:h-44 object-cover transform group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                    <img src="assets/images/unicef_girl_child_laptop.jpg" alt="Girl Child Learning on Laptop" class="w-full h-32 sm:h-44 object-cover transform group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="rounded-2xl overflow-hidden border border-white/20 shadow-xl col-span-2 sm:col-span-1 group">
                    <img src="assets/images/unicef_women_tech_collaboration.jpg" alt="Women Collaborating on Tech Projects" class="w-full h-32 sm:h-44 object-cover transform group-hover:scale-105 transition-transform duration-300">
                </div>
            </div>
        </div>
    </div>
`;

// =========================================================================
// 2. SINGLE CLOSE-SHOT AMINAT STORY
// =========================================================================
const singleCloseShotAminatHtml = `
            <!-- INLINE NARRATIVE 1: AMINAT'S JOURNEY (SINGLE REALISTIC CLOSE SHOT) -->
            <div class="py-10 border-y border-slate-200 space-y-8">
                <div class="max-w-3xl">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading leading-snug">
                        From Hawking Boiled Corn On Campus To Earning $1,200/Month From Her Living Room
                    </h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <!-- Single Close Shot Image Column -->
                    <div class="md:col-span-5 flex justify-center">
                        <div class="relative w-full max-w-sm rounded-3xl overflow-hidden border-2 border-emerald-600/30 shadow-xl bg-slate-900 group">
                            <img src="assets/images/aminat_story.jpg" alt="Aminat - Newton Academy Fellow" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500">
                            <div class="bg-slate-950/95 border-t border-emerald-500/30 p-3 sm:p-4 text-center">
                                <span class="block text-xs font-bold text-white">Aminat Bello</span>
                                <span class="block text-[11px] text-emerald-400 font-medium">Newton Academy Fellow • Earning $1,200/mo Remote</span>
                            </div>
                        </div>
                    </div>

                    <!-- Story Text Column -->
                    <div class="md:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                        <p>
                            Meet Aminat. In her university days, she had zero wealthy uncles or political godfathers. To buy semester handouts, photocopies, and feed herself, she stood by the campus main gate every evening hawking boiled and roasted corn with a heavy tray balanced on her head.
                        </p>
                        <p>
                            Despite bone-crushing fatigue, she gave her studies everything she had &mdash; graduating with a coveted <strong>First-Class Honours degree in Economics</strong>. She finished NYSC full of hope, believing the corporate world would celebrate her brilliance. Instead, after submitting over 80 CVs across Lagos and Abuja, the only job offer she received was an ₦85,000/month administrative role where third-party bus fares alone would gobble up ₦50,000 every 30 days!
                        </p>
                        <p>
                            Refusing to accept a life of quiet desperation, Aminat secured a seat in Newton Academy. Within 90 days of applying our practical frameworks in high-ROAS paid ads and AI-assisted copywriting, she landed her first international remote client on a $1,200 monthly retainer (over ₦1.8 Million Naira).
                        </p>
                        <p class="font-bold text-[#005f5a] pt-1">
                            Today, Aminat works comfortably from her home in Lagos, provides for her aging parents, and earns in hard currency &mdash; all built on verifiable digital skills, not theoretical certificates.
                        </p>
                    </div>
                </div>
            </div>
`;

// =========================================================================
// 3. FULL-WIDTH (UNBOXED) ALUMNI TESTIMONIALS SECTION
// (w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] so it's 100% full bleed, edge-to-edge)
// =========================================================================
function makeAlumniSectionFullWidth(html) {
    // Check if #alumni-showcase exists
    const showcaseIdx = html.indexOf('id="alumni-showcase"');
    if (showcaseIdx === -1) return html;

    const sectionStart = html.lastIndexOf('<section id="alumni-showcase"', showcaseIdx);
    const sectionEnd = html.indexOf('</section>', showcaseIdx) + 10;
    if (sectionStart === -1 || sectionEnd === -1) return html;

    let sectionContent = html.slice(sectionStart, sectionEnd);

    // Replace <section id="alumni-showcase" ...> with full-bleed wrapper
    // We change its container class so it breaks out 100% full width
    sectionContent = sectionContent.replace(
        /<section id="alumni-showcase"[^>]*>/,
        `<section id="alumni-showcase" class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 sm:py-20 relative overflow-hidden bg-gradient-to-br from-[#003835] via-[#004d49] to-[#002f2d] text-white border-y-2 border-teal-500/30 my-10">`
    );

    return html.slice(0, sectionStart) + sectionContent + html.slice(sectionEnd);
}

// =========================================================================
// 4. ADD SUBTEXT "100% FULLY FUNDED SCHOLARSHIP" TO BOTH TRACK BUTTONS
// =========================================================================
function addSubtextToTrackButtons(html) {
    // 1. Digital Marketing Button
    const dmBtnRegex = /<a href="#scholarshipForm" onclick="selectTrack\('Digital Marketing \+ Applied AI'\)"[^>]*>[\s\S]*?Apply For Digital Marketing Track[\s\S]*?<\/a>/i;
    const newDmBtn = `<a href="#scholarshipForm" onclick="selectTrack('Digital Marketing + Applied AI')" class="w-full min-h-[58px] py-3 px-4 rounded-xl bg-[#005f5a] hover:bg-[#004d49] text-white shadow-md transition-all font-heading flex flex-col items-center justify-center text-center">
                                <span class="block text-sm sm:text-base font-extrabold leading-snug">Apply For Digital Marketing Track</span>
                                <span class="block text-[11px] font-bold text-emerald-200 uppercase tracking-wider mt-0.5">100% Fully Funded Scholarship</span>
                            </a>`;

    // 2. Entrepreneurship Button
    const deBtnRegex = /<a href="#scholarshipForm" onclick="selectTrack\('Digital Entrepreneurship & Business Innovation \+ Applied AI'\)"[^>]*>[\s\S]*?Apply For Entrepreneurship Track[\s\S]*?<\/a>/i;
    const newDeBtn = `<a href="#scholarshipForm" onclick="selectTrack('Digital Entrepreneurship & Business Innovation + Applied AI')" class="w-full min-h-[58px] py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 transition-all font-heading flex flex-col items-center justify-center text-center">
                                <span class="block text-sm sm:text-base font-black leading-snug uppercase tracking-wide">Apply For Entrepreneurship Track</span>
                                <span class="block text-[11px] font-black text-slate-900/80 uppercase tracking-wider mt-0.5">100% Fully Funded Scholarship</span>
                            </a>`;

    if (dmBtnRegex.test(html)) {
        html = html.replace(dmBtnRegex, newDmBtn);
    }
    if (deBtnRegex.test(html)) {
        html = html.replace(deBtnRegex, newDeBtn);
    }

    return html;
}

// =========================================================================
// Apply to scholarship.html, scholarship.php, special-offer.*, upsell.*
// =========================================================================
const targetPages = [
    'scholarship.html', 'scholarship.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php'
];

targetPages.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add subtext to buttons
    content = addSubtextToTrackButtons(content);
    console.log(`+ Added button subtexts to ${file}`);

    // 2. Make alumni section full width (not boxed)
    content = makeAlumniSectionFullWidth(content);
    console.log(`+ Made alumni section full-width in ${file}`);

    // 3. Make UNICEF section full width and position before story
    // First remove any existing UNICEF block
    const unicefRegex = /<!-- UNICEF FEMALE TECH EMPOWERMENT[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    if (unicefRegex.test(content)) {
        content = content.replace(unicefRegex, fullWidthUnicefSectionHtml.trim());
        console.log(`+ Replaced UNICEF with full-width dark section in ${file}`);
    } else {
        const storyMarker = '<!-- INLINE NARRATIVE 1: AMINAT\'S JOURNEY';
        if (content.includes(storyMarker)) {
            content = content.replace(storyMarker, fullWidthUnicefSectionHtml.trim() + '\n\n            ' + storyMarker);
            console.log(`+ Inserted full-width dark UNICEF section before story in ${file}`);
        }
    }

    // 4. Update Aminat story to single close-shot
    const storyRegex = /<!-- INLINE NARRATIVE 1: AMINAT'S JOURNEY[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    if (storyRegex.test(content)) {
        content = content.replace(storyRegex, singleCloseShotAminatHtml.trim());
        console.log(`+ Updated Aminat story to single close shot in ${file}`);
    }

    // Fix any unbalanced div tags if present
    const openDivs = (content.match(/<div(\s|>|$)/gi) || []).length;
    const closeDivs = (content.match(/<\/div>/gi) || []).length;
    if (closeDivs > openDivs) {
        const diff = closeDivs - openDivs;
        console.log(`Fixing ${diff} extra </div> in ${file}`);
        for (let i = 0; i < diff; i++) {
            const lastClose = content.lastIndexOf('</div>');
            if (lastClose !== -1) {
                content = content.slice(0, lastClose) + content.slice(lastClose + 6);
            }
        }
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('All final fixes successfully applied.');

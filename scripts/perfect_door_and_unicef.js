const fs = require('fs');

console.log('--- Perfecting UNICEF Full-Width Background and 3D Door Opening with Confetti Rain ---');

// =========================================================================
// 1. FULL-WIDTH (UNBOXED) DARK PINE TEAL UNICEF SECTION
// =========================================================================
const fullWidthUnicefHtml = `
            <!-- UNICEF FEMALE TECH EMPOWERMENT & INCLUSIVITY (FULL-WIDTH DARK BACKGROUND - NOT BOXED) -->
            <div class="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-[#002826] via-[#003835] to-[#001f1e] text-white py-16 sm:py-20 border-y-2 border-teal-500/30 overflow-hidden my-10">
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

// Update scholarship.html and scholarship.php
['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Replace whatever unboxed UNICEF version is currently there with the full-width dark background version
    const unicefRegex = /<!-- UNICEF FEMALE TECH EMPOWERMENT[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    if (unicefRegex.test(content)) {
        content = content.replace(unicefRegex, fullWidthUnicefHtml.trim());
        console.log(`+ Replaced UNICEF section with Full-Width Dark Background in ${file}`);
    } else {
        // If not found, insert before the story of Aminat
        const storyMarker = '<!-- INLINE NARRATIVE 1: AMINAT\'S JOURNEY -->';
        if (content.includes(storyMarker)) {
            content = content.replace(storyMarker, fullWidthUnicefHtml.trim() + '\n\n            ' + storyMarker);
            console.log(`+ Inserted Full-Width Dark Background UNICEF section before story in ${file}`);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('UNICEF Full-Width section applied successfully.');


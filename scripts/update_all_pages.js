const fs = require('fs');

console.log('--- Applying Comprehensive Page Updates ---');

const { supportBannerHtml, evaluationModalHtml, evaluationScript } = require('./apply_all_user_updates.js');

// 1. Process scholarship.html and scholarship.php
['scholarship.html', 'scholarship.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Remove Preferred Mode of Learning dropdown
    const modePattern = /<div class="space-y-1\.5">\s*<label[^>]*>\s*Preferred Mode of Learning[\s\S]*?<\/select>\s*<\/div>/gi;
    if (modePattern.test(content)) {
        content = content.replace(modePattern, '');
        console.log(`+ Removed Preferred Mode of Learning from ${file}`);
    }

    // Extract UNICEF section
    const unicefStartComment = '<!-- UNICEF SECTION -->';
    const unicefDivStart = content.indexOf('<div class="relative rounded-3xl overflow-hidden my-12 border-2 border-teal-500/30');
    
    if (unicefDivStart !== -1) {
        const unicefEndMarker = '<!-- INSPIRING MOMENTUM & MOTIVATION POSTERS -->';
        const unicefDivEnd = content.indexOf(unicefEndMarker);

        if (unicefDivEnd !== -1) {
            const rawUnicefBlock = content.slice(unicefDivStart, unicefDivEnd);
            
            // Remove it from its current position
            content = content.slice(0, unicefDivStart) + content.slice(unicefDivEnd);

            // Create unboxed version of UNICEF section
            const unboxedUnicefHtml = `
            <!-- UNICEF FEMALE TECH EMPOWERMENT & INCLUSIVITY SECTION (UNBOXED) -->
            <div class="py-10 border-b border-slate-200 space-y-6">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003835] font-heading tracking-tight leading-tight">
                    Empowering Women &amp; Girls In Tech To Lead The Global AI Economy
                </h2>

                <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                    In alignment with UNICEF's global vision for female education, digital inclusion, and economic emancipation, Newton Academy champions the education and elevation of women, ladies, and the girl child. We equip females across Africa and the diaspora with practical commercial skills in digital marketing, enterprise automation, and applied artificial intelligence.
                </p>

                <div class="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs sm:text-sm text-slate-800 font-sans">
                    <span class="font-bold text-[#005f5a] block mb-1">Inclusivity Commitment:</span>
                    While our primary institutional focus is closing the digital gender divide and uplifting female builders, <strong class="text-slate-900">ambitious male delegates are warmly welcome</strong> to apply and learn side by side in our transformative cohorts.
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <img src="assets/images/unicef_women_laptops_joy.jpg" alt="Joyful Female Fellows with Laptops" class="w-full h-32 sm:h-44 object-cover">
                    </div>
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <img src="assets/images/unicef_girl_child_laptop.jpg" alt="Girl Child Learning on Laptop" class="w-full h-32 sm:h-44 object-cover">
                    </div>
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md col-span-2 sm:col-span-1">
                        <img src="assets/images/unicef_women_tech_collaboration.jpg" alt="Women Collaborating on Tech Projects" class="w-full h-32 sm:h-44 object-cover">
                    </div>
                </div>
            </div>
            `;

            // Insert unboxed UNICEF section BEFORE the story of Aminat
            const storyMarker = '<!-- INLINE NARRATIVE 1: AMINAT\'S JOURNEY -->';
            if (content.includes(storyMarker)) {
                content = content.replace(storyMarker, unboxedUnicefHtml + '\n\n            ' + storyMarker);
                console.log(`+ Moved unboxed UNICEF section before story in ${file}`);
            }
        }
    }

    // Add evaluation popup modal if not present
    if (!content.includes('id="evaluationModal"')) {
        content = content.replace('</body>', evaluationModalHtml + '\n</body>');
        console.log(`+ Added Evaluation Modal to ${file}`);
    }

    // Update form submission to use triggerEvaluationModal
    if (content.includes('targetCheckoutUrl =')) {
        content = content.replace(/if\s*\(typeof window\.startScholarshipEvaluation === 'function'\)\s*\{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}/, `triggerEvaluationModal(fullName, targetCheckoutUrl);`);
        console.log(`+ Wired triggerEvaluationModal in ${file}`);
    }

    // Ensure evaluationScript is inside <script> tag
    if (!content.includes('function triggerEvaluationModal')) {
        const lastScriptClose = content.lastIndexOf('</script>');
        if (lastScriptClose !== -1) {
            content = content.slice(0, lastScriptClose) + '\n' + evaluationScript + '\n' + content.slice(lastScriptClose);
            console.log(`+ Added triggerEvaluationModal script to ${file}`);
        }
    }

    // Replace Support Banner with updated banner
    const bannerRegex = /<!-- SUPPORT BANNER[\s\S]*?<\/section>/;
    if (bannerRegex.test(content)) {
        content = content.replace(bannerRegex, supportBannerHtml.trim());
        console.log(`+ Updated Support Banner in ${file}`);
    }

    // Update floating WhatsApp to Odunayo
    const waRegex = /<!-- FLOATING WHATSAPP BUTTON[\s\S]*?<\/a>/;
    if (waRegex.test(content)) {
        const floatingWaHtml = `
    <!-- FLOATING WHATSAPP BUTTON (DIRECTED TO ODUNAYO) -->
    <a href="https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group" aria-label="Chat with Odunayo on WhatsApp">
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span class="sr-only">Support WhatsApp with Odunayo</span>
    </a>`;
        content = content.replace(waRegex, floatingWaHtml.trim());
        console.log(`+ Updated Floating WhatsApp to Odunayo in ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

// 2. Also update other pages (checkout, special-offer, upsell, index)
const otherPages = [
    'checkout.html', 'checkout.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php',
    'index.html', 'index.php'
];

otherPages.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Remove Mode of learning if present
    const modePattern = /<div class="space-y-1\.5">\s*<label[^>]*>\s*Preferred Mode of Learning[\s\S]*?<\/select>\s*<\/div>/gi;
    if (modePattern.test(content)) {
        content = content.replace(modePattern, '');
        console.log(`+ Removed Preferred Mode of Learning from ${file}`);
    }

    // Replace Support Banner with updated banner
    const bannerRegex = /<!-- SUPPORT BANNER[\s\S]*?<\/section>/;
    if (bannerRegex.test(content)) {
        content = content.replace(bannerRegex, supportBannerHtml.trim());
        console.log(`+ Updated Support Banner in ${file}`);
    }

    // Update floating WhatsApp to Odunayo
    const waRegex = /<!-- FLOATING WHATSAPP BUTTON[\s\S]*?<\/a>/;
    if (waRegex.test(content)) {
        const floatingWaHtml = `
    <!-- FLOATING WHATSAPP BUTTON (DIRECTED TO ODUNAYO) -->
    <a href="https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group" aria-label="Chat with Odunayo on WhatsApp">
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span class="sr-only">Support WhatsApp with Odunayo</span>
    </a>`;
        content = content.replace(waRegex, floatingWaHtml.trim());
        console.log(`+ Updated Floating WhatsApp to Odunayo in ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('All page updates successfully executed.');

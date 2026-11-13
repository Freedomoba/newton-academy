const fs = require('fs');

const files = [
    'scholarship.html',
    'scholarship.php',
    'special-offer.html',
    'special-offer.php',
    'upsell.html',
    'upsell.php'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove duplicate Aminat text block
    // The duplicate occurs right after the single realistic close shot section
    const duplicateAminatRegex = /<\/div>\s*<\/div>\s*<\/div>\s*<!-- Story Text Column -->\s*<div class="md:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">\s*<p>\s*Meet Aminat[\s\S]*?not theoretical certificates\.\s*<\/p>\s*<\/div>\s*<\/div>\s*<\/div>/;
    
    if (duplicateAminatRegex.test(content)) {
        content = content.replace(duplicateAminatRegex, '</div>\n                </div>\n            </div>');
        console.log(`[${file}] Removed duplicate Aminat text block`);
    } else {
        // Fallback search by string index if regex spacing differs
        const firstMeet = content.indexOf('Meet Aminat');
        if (firstMeet !== -1) {
            const secondMeet = content.indexOf('Meet Aminat', firstMeet + 11);
            if (secondMeet !== -1) {
                // Find start of the parent div for this second column
                const colStart = content.lastIndexOf('<!-- Story Text Column -->', secondMeet);
                const colEnd = content.indexOf('<!-- INLINE NARRATIVE 2: FREEDOM', secondMeet);
                if (colStart !== -1 && colEnd !== -1) {
                    content = content.substring(0, colStart) + content.substring(colEnd);
                    console.log(`[${file}] Removed duplicate Aminat text block via substring`);
                }
            }
        }
    }

    // 2. Remove "LEAD CURRICULUM ARCHITECT" badge from Freedom's photo overlay
    content = content.replace(/<span class="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-\[10px\] font-black uppercase tracking-wider mb-1">\s*Lead Curriculum Architect\s*<\/span>\s*/g, '');
    console.log(`[${file}] Purged Lead Curriculum Architect badge`);

    // 3. Remove "Verifiable Proof & National Recognition:" label
    content = content.replace(/<p class="text-xs font-bold uppercase tracking-wider text-teal-900 mb-4 text-center sm:text-left">\s*Verifiable Proof &amp; National Recognition:\s*<\/p>\s*/g, '');
    content = content.replace(/<p class="text-xs font-bold uppercase tracking-wider text-teal-800 mb-4 text-center sm:text-left">\s*Verifiable Proof &amp; National Recognition:\s*<\/p>\s*/g, '');
    console.log(`[${file}] Purged Verifiable Proof label`);

    // 4. Update the Admissions & Portal Evaluation (₦20,000) card to vibrant yellow background with dark text
    const oldYellowCardRegex = /<div class="relative bg-gradient-to-br from-amber-500\/20 via-slate-900 to-\[#002f2d\] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl overflow-hidden">[\s\S]*?Only paid if your 30-second live evaluation is successful\.<\/p>\s*<\/div>/;

    const newYellowCard = `<div class="relative bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 text-slate-950 space-y-4 shadow-xl overflow-hidden">
                        <div class="flex items-center justify-between">
                            <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950 text-amber-300 shadow-sm">
                                Candidate Commitment
                            </span>
                            <span class="text-xs text-slate-950 font-black font-mono tracking-wide">ONE-TIME FEE</span>
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-xl sm:text-2xl font-black font-heading text-slate-950">Admissions & Portal Evaluation</h3>
                            <p class="text-xs font-semibold text-slate-900/90">Tamper-proof academy verification & ID issuance</p>
                        </div>
                        <div class="pt-4 border-t border-slate-950/20 flex items-baseline justify-between">
                            <span class="text-xs font-bold text-slate-900">Candidate Investment:</span>
                            <span class="text-3xl sm:text-4xl font-black text-slate-950 font-mono">₦20,000</span>
                        </div>
                        <p class="text-[11px] text-slate-900 font-bold italic">Only paid if your 30-second live evaluation is successful.</p>
                    </div>`;

    if (oldYellowCardRegex.test(content)) {
        content = content.replace(oldYellowCardRegex, newYellowCard);
        console.log(`[${file}] Updated ₦20,000 card to yellow background`);
    } else {
        console.log(`[${file}] Warning: oldYellowCardRegex did not match directly, checking fallback`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

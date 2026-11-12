const fs = require('fs');

const files = [
    'index.html', 'index.php',
    'scholarship.html', 'scholarship.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php',
    'thank-you.html', 'thank-you.php',
    'checkout.php',
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Reduce text size for huge submit buttons on phone mode
    // text-base sm:text-lg -> text-xs sm:text-sm md:text-base (or lg)
    content = content.replace(/text-base\s+sm:text-lg/g, 'text-xs sm:text-sm md:text-base lg:text-lg');
    content = content.replace(/text-lg\s+sm:text-xl/g, 'text-xs sm:text-base md:text-lg');
    content = content.replace(/text-sm\s+sm:text-base/g, 'text-xs sm:text-sm md:text-base');

    // 2. Specific fix for #submitAppBtn
    content = content.replace(
        /id="submitAppBtn"\s+class="([^"]*)"/g,
        (match, classes) => {
            let updated = classes
                .replace(/\bpy-4\b/g, 'py-3 sm:py-4')
                .replace(/\bpx-6\b/g, 'px-4 sm:px-6')
                .replace(/text-(?:base|lg|xl)/g, 'text-xs sm:text-sm md:text-base');
            return `id="submitAppBtn" class="${updated}"`;
        }
    );

    // 3. Header CTA button in index
    content = content.replace(
        /text-xs\s+sm:text-sm\s+px-4\s+sm:px-6\s+py-2\s+sm:py-2\.5/g,
        'text-[11px] sm:text-xs md:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5'
    );

    // 4. Mobile sticky dock button
    content = content.replace(
        /class="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs px-5 py-2\.5 rounded-full/g,
        'class="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-full'
    );

    // 5. Open Dispatch envelope button in scholarship
    content = content.replace(
        /px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500[^"]*text-xs sm:text-sm/g,
        'px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-[11px] sm:text-xs md:text-sm'
    );

    // 6. Track selection button in scholarship
    content = content.replace(
        /py-3\.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm/g,
        'py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 font-bold text-[11px] sm:text-xs md:text-sm'
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Optimized mobile button sizes in ${file}`);
});

console.log('Finished updating yellow button phone text sizes across all files!');


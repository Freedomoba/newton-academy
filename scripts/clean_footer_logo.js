const fs = require('fs');

// Ensure assets/images/logo.png is always an exact copy of assets/logo.png
if (fs.existsSync('assets/logo.png')) {
    fs.copyFileSync('assets/logo.png', 'assets/images/logo.png');
}

const darkBrandFooter = `
    <!-- Newton Official Dark Brand Footer (Not Black) -->
    <footer class="bg-[#003835] text-slate-300 py-14 border-t border-emerald-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/40">
                <div class="md:col-span-2 space-y-4">
                    <a href="index.html" class="inline-block">
                        <img src="assets/logo.png" alt="Newton Academy" class="h-10 w-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                    </a>
                    <p class="text-sm text-slate-300/90 leading-relaxed max-w-lg">
                        Newton Academy is Africa's premier institution for executive digital skills, applied artificial intelligence, and wealth-generative careers. Convening the From Skills to Income Virtual Conference.
                    </p>
                    <div class="pt-2 text-xs text-slate-400 space-y-1">
                        <p><strong class="text-white">Expression of Interest &amp; Inquiries:</strong> na@newtoncore.com</p>
                        <p><strong class="text-white">Executive Admissions Hotline:</strong> +234 - 810 555 8593</p>
                        <p><strong class="text-white">Official Portal:</strong> academy.newtoncore.com</p>
                    </div>
                </div>

                <div>
                    <h4 class="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">Official Programs</h4>
                    <ul class="text-xs space-y-2.5 text-slate-300">
                        <li><a href="curriculum-dm.html" class="hover:text-white transition-colors">Digital Marketing + Applied AI</a></li>
                        <li><a href="curriculum-de.html" class="hover:text-white transition-colors">Digital Entrepreneurship + Applied AI</a></li>
                        <li><a href="scholarship.html" class="hover:text-white transition-colors">70% Scholarship Matriculation</a></li>
                        <li><a href="index.html" class="hover:text-white transition-colors">Main Conference Registration</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">Accreditation &amp; Standards</h4>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        All diploma programs are overseen by Newton Academic Advisory Council with strict practical project defenses, verified mentor access, and lifetime resource updates.
                    </p>
                    <div class="mt-4 flex items-center gap-2 text-[11px] text-emerald-300">
                        <span class="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Accredited 2026 Cohort</span>
                    </div>
                </div>
            </div>

            <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center md:text-left">
                <p>&copy; 2026 Newton Academy. All rights reserved. Convened by Newton Academy. From Skills to Income Virtual Conference.</p>
                <p class="text-[11px] text-slate-400 max-w-xl">
                    This site is not affiliated with or endorsed by Meta Platforms, Inc. or Google LLC. Newton Academy provides professional educational training only, and all individual results depend completely on personal dedication, skill mastery, and commercial execution.
                </p>
            </div>
        </div>
    </footer>
`;

const targetFiles = [
    'index.html', 'index.php',
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php',
    'scholarship.html', 'scholarship.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php',
    'thank-you.html', 'thank-you.php',
    'checkout.php'
];

targetFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove any occurrence of "Faculty of Digital Technologies & Enterprise" or "Faculty of"
    content = content.replace(/<div class="text-\[11px\] uppercase tracking-widest text-emerald-400 font-semibold">Faculty of Digital Technologies &amp; Enterprise<\/div>/gi, '');
    content = content.replace(/<div class="text-\[11px\] uppercase tracking-widest text-emerald-400 font-semibold">Faculty of Digital Technologies & Enterprise<\/div>/gi, '');
    content = content.replace(/Faculty of Digital Technologies &amp; Enterprise/gi, '');
    content = content.replace(/Faculty of Digital Technologies & Enterprise/gi, '');

    // 2. Remove the specific redundant block if present
    content = content.replace(/<div>\s*<div class="font-black text-white text-lg tracking-tight">NEWTON ACADEMY<\/div>\s*<\/div>/gi, '');

    // 3. Ensure the footer uses our darkBrandFooter
    const footerStart = content.indexOf('<footer');
    if (footerStart !== -1) {
        const footerEnd = content.indexOf('</footer>', footerStart) + '</footer>'.length;
        content = content.substring(0, footerStart) + darkBrandFooter + content.substring(footerEnd);
        console.log(`Updated footer in ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

// Also update the build script so any rebuild doesn't re-introduce it
const buildScript = 'scripts/build_clean_pages.js';
if (fs.existsSync(buildScript)) {
    let bs = fs.readFileSync(buildScript, 'utf8');
    bs = bs.replace(/Faculty of Digital Technologies &amp; Enterprise/gi, '');
    bs = bs.replace(/Faculty of Digital Technologies & Enterprise/gi, '');
    fs.writeFileSync(buildScript, bs, 'utf8');
}

const updateScript = 'scripts/update_index.js';
if (fs.existsSync(updateScript)) {
    let us = fs.readFileSync(updateScript, 'utf8');
    us = us.replace(/<div class="text-\[11px\] uppercase tracking-widest text-emerald-400 font-semibold">Faculty of Digital Technologies &amp; Enterprise<\/div>/gi, '');
    us = us.replace(/<div class="text-\[11px\] uppercase tracking-widest text-emerald-400 font-semibold">Faculty of Digital Technologies & Enterprise<\/div>/gi, '');
    us = us.replace(/<div>\s*<div class="font-black text-white text-lg tracking-tight">NEWTON ACADEMY<\/div>\s*<\/div>/gi, '');
    fs.writeFileSync(updateScript, us, 'utf8');
}

console.log('Successfully cleaned logo and removed "Faculty of" + text across all files!');

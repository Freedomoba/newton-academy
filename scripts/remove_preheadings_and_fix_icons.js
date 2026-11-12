const fs = require('fs');

// Ensure assets/images/logo.png exists
if (fs.existsSync('assets/logo.png')) {
    fs.copyFileSync('assets/logo.png', 'assets/images/logo.png');
}

// Ultra-professional SVG icons for contact info (crisp vector strokes, elegant amber accent)
const mailIconSvg = `<svg class="w-4 h-4 text-amber-400 shrink-0 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const globeIconSvg = `<svg class="w-4 h-4 text-emerald-400 shrink-0 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
const phoneIconSvg = `<svg class="w-4 h-4 text-amber-400 shrink-0 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

// The clean dark brand footer:
// - Shows clean logo.png with brightness-0 invert (crisp white)
// - NO "Faculty of..." anywhere
// - NO emoji icons; uses sleek SVG vector icons
// - 4 columns on desktop, responsive, max-w-7xl
const cleanDarkFooter = `
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
                    <div class="pt-2 text-xs text-slate-300 space-y-2.5">
                        <div class="flex items-center">
                            ${mailIconSvg}
                            <span><strong class="text-white">Inquiries:</strong> na@newtoncore.com</span>
                        </div>
                        <div class="flex items-center">
                            ${globeIconSvg}
                            <span><strong class="text-white">Portal:</strong> academy.newtoncore.com</span>
                        </div>
                        <div class="flex items-center">
                            ${phoneIconSvg}
                            <span><strong class="text-white">Admissions:</strong> +234 - 810 555 8593</span>
                        </div>
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

const allFiles = [
    'index.html', 'index.php',
    'scholarship.html', 'scholarship.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php',
    'thank-you.html', 'thank-you.php',
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php',
    'checkout.php'
];

allFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove all preheadings before headings:
    // Any pill, badge or preheading div right before an <h1, <h2, <h3
    // E.g. <div class="inline-flex ...">...</div> immediately before <h1 / <h2 / <h3
    content = content.replace(/<div class="[^"]*inline-flex[^"]*">[\s\S]*?<\/div>\s*(<h[1-3])/gi, '$1');
    content = content.replace(/<span class="[^"]*inline-flex[^"]*">[\s\S]*?<\/span>\s*(<h[1-3])/gi, '$1');
    content = content.replace(/<div class="[^"]*rounded-full[^"]*">[\s\S]*?<\/div>\s*(<h[1-3])/gi, '$1');
    content = content.replace(/<div class="[^"]*tracking-wider[^"]*uppercase[^"]*">[\s\S]*?<\/div>\s*(<h[1-3])/gi, '$1');
    content = content.replace(/<p class="[^"]*tracking-widest[^"]*uppercase[^"]*">[\s\S]*?<\/p>\s*(<h[1-3])/gi, '$1');
    content = content.replace(/<div class="[^"]*text-emerald-800[^"]*font-bold[^"]*">[\s\S]*?<\/div>\s*(<h[1-3])/gi, '$1');

    // Specific user requested preheadings:
    content = content.replace(/15 Modules\s*•\s*3 Months/gi, '');
    content = content.replace(/15 Modules\s*•\s*High-Ticket Track/gi, '');
    content = content.replace(/TRUE CASE STUDY 01\s*•\s*Verified Student Journey/gi, '');
    content = content.replace(/TRUE CASE STUDY 02\s*•\s*Faculty Co-Director & Convener/gi, '');
    content = content.replace(/TRUE CASE STUDY 01/gi, '');
    content = content.replace(/TRUE CASE STUDY 02/gi, '');
    content = content.replace(/Faculty of Digital Technologies &amp; Enterprise/gi, '');
    content = content.replace(/Faculty of Digital Technologies & Enterprise/gi, '');
    content = content.replace(/<div class="font-black text-white text-lg tracking-tight">NEWTON ACADEMY<\/div>/gi, '');

    // Replace childish emoji icons in footer or elsewhere
    content = content.replace(/✉️\s*/g, mailIconSvg + ' ');
    content = content.replace(/🌐\s*/g, globeIconSvg + ' ');
    content = content.replace(/📞\s*/g, phoneIconSvg + ' ');
    content = content.replace(/☎️\s*/g, phoneIconSvg + ' ');
    content = content.replace(/📧\s*/g, mailIconSvg + ' ');

    // 2. Replace the footer with cleanDarkFooter
    const footerStart = content.indexOf('<footer');
    if (footerStart !== -1) {
        const footerEnd = content.indexOf('</footer>', footerStart) + '</footer>'.length;
        content = content.substring(0, footerStart) + cleanDarkFooter + content.substring(footerEnd);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Processed ${file}`);
});

console.log('All preheadings removed, SVG icons applied, and clean footer installed!');

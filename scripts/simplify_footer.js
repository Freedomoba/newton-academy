const fs = require('fs');

const minimalCleanFooter = `
    <!-- Clean Minimal Brand Footer -->
    <footer class="bg-[#003835] text-slate-300 py-8 border-t border-emerald-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-5 pb-5 border-b border-emerald-800/40 text-center sm:text-left">
                <!-- Logo -->
                <a href="index.html" class="inline-block">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-8 w-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>

                <!-- Quick Links & Contact -->
                <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-slate-300 font-medium">
                    <a href="curriculum-dm.html" class="hover:text-amber-400 transition-colors">Digital Marketing</a>
                    <a href="curriculum-de.html" class="hover:text-amber-400 transition-colors">Digital Entrepreneurship</a>
                    <a href="scholarship.html" class="hover:text-amber-400 transition-colors">Scholarship</a>
                    <a href="mailto:na@newtoncore.com" class="hover:text-amber-400 transition-colors">na@newtoncore.com</a>
                </div>
            </div>

            <!-- Copyright & Minimal Disclaimer -->
            <div class="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-400">
                <p>&copy; 2026 Newton Academy. All rights reserved.</p>
                <p class="text-slate-400/80">
                    Professional education only. Not affiliated with Meta Platforms, Inc. or Google LLC.
                </p>
            </div>
        </div>
    </footer>
`;

const files = [
    'index.html', 'index.php',
    'scholarship.html', 'scholarship.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php',
    'thank-you.html', 'thank-you.php',
    'curriculum-de.html', 'curriculum-de.php',
    'curriculum-dm.html', 'curriculum-dm.php',
    'checkout.php'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    const fStart = content.indexOf('<footer');
    if (fStart !== -1) {
        const fEnd = content.indexOf('</footer>', fStart) + '</footer>'.length;
        content = content.substring(0, fStart) + minimalCleanFooter + content.substring(fEnd);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated footer to clean minimal layout in ${file}`);
    }
});

console.log('Successfully simplified footer contents across all pages!');

const fs = require('fs');
const path = require('path');

console.log('--- Applying All Comprehensive Funnel Updates ---');

// Official #004d49 Pine Teal Footer matching user uploaded image media_1794482033514_c9a89953.png
const NEW_FOOTER_HTML = `
    <!-- OFFICIAL BRAND FOOTER (Solid Newton Pine Teal #004d49) -->
    <footer class="bg-[#004d49] text-white border-t border-teal-800/80 pt-12 pb-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-teal-700/50">
                <!-- Col 1: Brand & Tagline -->
                <div class="space-y-4">
                    <a href="index.html" class="inline-block">
                        <img src="assets/logo.png" alt="Newton Academy" class="h-10 w-auto object-contain brightness-0 invert">
                    </a>
                    <p class="text-xs sm:text-sm text-teal-100 font-sans leading-relaxed max-w-sm">
                        Empowering women and girls with digital skills for a brighter future. Bridging the digital divide across Africa and the diaspora through high-income skills and applied artificial intelligence.
                    </p>
                    <div class="pt-1 flex items-center gap-2 text-xs text-amber-300 font-medium">
                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>UNICEF-Aligned Female Tech Empowerment Initiative</span>
                    </div>
                </div>

                <!-- Col 2: Expression of Interest -->
                <div class="space-y-3">
                    <h4 class="text-sm sm:text-base font-bold text-white font-heading uppercase tracking-wider">
                        Expression of Interest
                    </h4>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-teal-100">
                        <li class="flex items-center gap-2.5">
                            <span class="text-amber-400 font-bold">&#9993;</span>
                            <a href="mailto:na@newtoncore.com" class="hover:text-white transition-colors">na@newtoncore.com</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <span class="text-amber-400 font-bold">&#127760;</span>
                            <a href="https://academy.newtoncore.com" target="_blank" class="hover:text-white transition-colors">academy.newtoncore.com</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <span class="text-amber-400 font-bold">&#9742;</span>
                            <a href="tel:+2348105558593" class="hover:text-white transition-colors">+234 - 810 555 8593</a>
                        </li>
                    </ul>
                </div>

                <!-- Col 3: Quick Links -->
                <div class="space-y-3">
                    <h4 class="text-sm sm:text-base font-bold text-white font-heading uppercase tracking-wider">
                        Quick Links
                    </h4>
                    <ul class="space-y-2 text-xs sm:text-sm text-teal-100">
                        <li><a href="index.html#solution" class="hover:text-white transition-colors">&rarr; Our Solution</a></li>
                        <li><a href="index.html#tracks" class="hover:text-white transition-colors">&rarr; What We Offer</a></li>
                        <li><a href="curriculum-dm.html" class="hover:text-white transition-colors">&rarr; Digital Marketing + Applied AI</a></li>
                        <li><a href="curriculum-de.html" class="hover:text-white transition-colors">&rarr; Why Digital Entrepreneurship</a></li>
                        <li><a href="scholarship.html" class="hover:text-white transition-colors">&rarr; 100% Tuition Scholarship Endowment</a></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar: Copyright & Single-Sentence Legal Disclaimer -->
            <div class="pt-6 space-y-3 text-center">
                <p class="text-xs text-teal-200">
                    &copy; 2026 Newton Academy. All rights reserved. Convened strictly by Newton Academy.
                </p>
                <p class="text-[11px] text-teal-300/80 max-w-4xl mx-auto leading-relaxed">
                    This site is not a part of or endorsed by Facebook, Google, Meta Platforms, Inc., or Alphabet Inc., and Newton Academy makes no income guarantees as earnings depend entirely on individual dedication, skills, and commercial execution.
                </p>
            </div>
        </div>
    </footer>
`;

// Helper to replace footer in HTML/PHP files
function replaceFooterInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const footerRegex = /<footer[\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, NEW_FOOTER_HTML.trim());
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Replaced footer in:', path.basename(filePath));
    } else {
        console.log('No footer found in:', path.basename(filePath));
    }
}

// Update footers in all existing pages
['index.html', 'index.php', 'curriculum-de.html', 'curriculum-de.php', 'curriculum-dm.html', 'curriculum-dm.php', 'checkout.html', 'checkout.php'].forEach(f => {
    replaceFooterInFile(path.join(__dirname, '..', f));
});

console.log('Done replacing static footers.');


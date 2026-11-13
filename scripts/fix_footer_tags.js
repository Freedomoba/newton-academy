const fs = require('fs');

const goodFooter = `                <!-- Quick Links & Contact -->
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
    </footer>`;

const brokenFooterRegex = /<!-- Quick Links & Contact -->[\s\S]*?<\/footer>/;

['special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (brokenFooterRegex.test(content)) {
        content = content.replace(brokenFooterRegex, goodFooter);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`[${file}] Fixed footer tag structure`);
    }
});


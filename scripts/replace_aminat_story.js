const fs = require('fs');

console.log('--- Replacing Aminat 3 Images with Single Close Shot ---');

const singleAminatStoryHtml = `
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

['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Replace the old 3-beat narrative
    const storyRegex = /<!-- INLINE NARRATIVE 1: AMINAT'S JOURNEY[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    if (storyRegex.test(content)) {
        content = content.replace(storyRegex, singleAminatStoryHtml.trim());
        console.log(`+ Replaced Aminat story with single close shot in ${file}`);
    } else {
        const fallbackRegex = /<h3[^>]*>\s*From Hawking Boiled Corn On Campus[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
        if (fallbackRegex.test(content)) {
            content = content.replace(fallbackRegex, singleAminatStoryHtml.trim());
            console.log(`+ Replaced Aminat story (fallback) in ${file}`);
        } else {
            console.log(`- Could not find Aminat story in ${file}`);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Finished updating Aminat story.');


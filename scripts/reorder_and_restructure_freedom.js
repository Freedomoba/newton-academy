const fs = require('fs');

function restructureFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Identify Endowment Block
    const endowmentRegex = /<!-- ENDOWMENT VOUCHERS -->[\s\S]*?(?=(<!-- STANDALONE VIDEO TESTIMONIALS|<!-- Curvy Organic Background Wave Transition|<div class="w-full overflow-hidden leading-none -mb-px))/;
    const endowmentMatch = content.match(endowmentRegex);
    if (!endowmentMatch) {
        console.log(`Could not find endowment vouchers in ${filePath}`);
        return;
    }

    const rawEndowment = endowmentMatch[0];
    // Remove the endowment block from its current location
    content = content.replace(rawEndowment, '');

    // Refined endowment HTML
    const cleanedEndowment = `<!-- ENDOWMENT BREAKDOWN (PLACED BEFORE 'WHY WE ARE AWARDING') -->
            <div class="border-t border-slate-200 pt-10 pb-6 space-y-6">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        Newton Academy Foundation Endowment Breakdown
                    </h2>
                    <p class="text-slate-600 text-xs sm:text-sm">
                        Official Newton Academy financial allocation certificate for 2026/2027 fellows:
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div class="relative bg-gradient-to-br from-[#003e3b] to-[#002f2d] border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl overflow-hidden">
                        <div class="flex items-center justify-between">
                            <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-400 text-slate-950">
                                Endowment Applied
                            </span>
                            <span class="text-xs text-emerald-300 font-mono">100% COVERED</span>
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-xl sm:text-2xl font-bold font-heading text-white">Full Tuition Waiver Grant</h3>
                            <p class="text-xs text-teal-100">Newton Academy Endowment Fund</p>
                        </div>
                        <div class="pt-4 border-t border-teal-600/50 flex items-baseline justify-between">
                            <span class="text-xs text-slate-300">Official Tuition Value:</span>
                            <span class="text-2xl sm:text-3xl font-black text-emerald-400 font-mono line-through decoration-red-400">₦200,000</span>
                        </div>
                        <p class="text-[11px] text-teal-200 italic">Zero monthly tuition charged for the full 3-month duration.</p>
                    </div>

                    <div class="relative bg-gradient-to-br from-amber-500/20 via-slate-900 to-[#002f2d] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl overflow-hidden">
                        <div class="flex items-center justify-between">
                            <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950">
                                Candidate Commitment
                            </span>
                            <span class="text-xs text-amber-300 font-mono">ONE-TIME FEE</span>
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-xl sm:text-2xl font-bold font-heading text-white">Admissions & Portal Evaluation</h3>
                            <p class="text-xs text-amber-200">Tamper-proof academy verification & ID issuance</p>
                        </div>
                        <div class="pt-4 border-t border-amber-500/40 flex items-baseline justify-between">
                            <span class="text-xs text-slate-300">Candidate Investment:</span>
                            <span class="text-3xl sm:text-4xl font-black text-amber-400 font-mono">₦20,000</span>
                        </div>
                        <p class="text-[11px] text-amber-200/90 italic">Only paid if your 30-second live evaluation is successful.</p>
                    </div>
                </div>
            </div>\n\n`;

    // 2. Insert Endowment Breakdown immediately BEFORE the "Why We Are Awarding" section
    const whyHeaderRegex = /<div class="border-t border-slate-200 pt-10 pb-4 space-y-3">[\s\S]*?Why We Are Awarding 100% Full Tuition Endowments/;
    if (!whyHeaderRegex.test(content)) {
        console.log(`Could not find 'Why We Are Awarding' header in ${filePath}`);
        return;
    }

    content = content.replace(whyHeaderRegex, (match) => {
        return cleanedEndowment + match;
    });

    // 3. Restructure Freedom Obanijesu's Story
    // Old narrative 2 structure:
    const freedomStoryRegex = /<!-- INLINE NARRATIVE 2: FREEDOM OBANIJESU -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*(?=(\s*<!-- (UNICEF SECTION|INSPIRING MOMENTUM)|\s*<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">))/;

    const newFreedomStory = `<!-- INLINE NARRATIVE 2: FREEDOM OBANIJESU -->
            <div class="bg-teal-50/50 border-2 border-[#005f5a]/30 rounded-3xl p-6 sm:p-10 space-y-8 my-10">
                <div class="max-w-3xl">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading leading-snug">
                        From Manual POP Ceiling Laborer Inhaling Dust To AI Product Marketer &amp; Go-To-Market Strategist
                    </h3>
                </div>

                <!-- Profile Picture Alongside Story Text -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <!-- Profile Picture Column (Read alongside the story) -->
                    <div class="md:col-span-5 flex justify-center">
                        <div class="relative w-full max-w-sm rounded-3xl overflow-hidden border-2 border-[#005f5a]/40 shadow-2xl bg-slate-900 group">
                            <img src="assets/images/freedom_profile.jpg" alt="Freedom Obanijesu - AI Product Marketer &amp; Go-to-Market Strategist" class="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-4 text-center">
                                <span class="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-1">
                                    Lead Curriculum Architect
                                </span>
                                <p class="text-xs font-bold text-white">Freedom Obanijesu &bull; AI Product Marketer &amp; Go-to-Market Strategist</p>
                            </div>
                        </div>
                    </div>

                    <!-- Story Text Column -->
                    <div class="md:col-span-7 space-y-4 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                        <p>
                            This is not theory. Freedom Obanijesu spent years mixing plaster of Paris under scorching heat on dusty Nigerian construction sites, inhaling gypsum powder, and installing POP ceilings just to put food on the table. He knew that physical sweat without leverage leads to poverty. He spent late nights in cybercafes studying direct-response customer acquisition, copywriting, and practical applied AI tools.
                        </p>
                        <p>
                            His deep dedication to tech-driven enterprise bore fruit during his National Youth Service Corps year. Competing against thousands of corps members, his digital venture was awarded <strong>1st Place in the NYSC Corpreneurship Challenge</strong> &mdash; earning state recognition, an official grant, and proof that digital leverage beats manual labor every time.
                        </p>
                        <p class="font-medium text-slate-900 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            Today, Freedom learned practical high-income skills, is doing exceptionally well in the digital economy as an AI Product Marketer and Go-to-Market Strategist, was recognized among the Top 100 Under 40 Young Builders by Jamie Pajoel International, and has architected the exact practical blueprints taught inside Newton Academy.
                        </p>
                    </div>
                </div>

                <!-- Last Two Award & Proof Images Brought Down (Seen after reading the story) -->
                <div class="border-t border-teal-200/60 pt-6">
                    <p class="text-xs font-bold uppercase tracking-wider text-teal-900 mb-4 text-center sm:text-left">
                        Verifiable Proof &amp; National Recognition:
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Award 1: NYSC Corpreneurship Challenge -->
                        <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
                            <img src="assets/images/freedom_nysc_award.jpg" alt="Freedom Obanijesu 1st Place NYSC Corpreneurship Award Winner Check" class="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300">
                            <span class="block bg-slate-900 text-white text-[11px] sm:text-xs p-3 text-center italic font-sans border-t border-slate-800">
                                Service Honor &bull; 1st Place NYSC Corpreneurship Award
                            </span>
                        </div>
                        <!-- Award 2: 100 Under 40 Young Builders Award -->
                        <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
                            <img src="assets/images/freedom_honoree_award.jpg" alt="Freedom Obanijesu Honoree 100 Under 40 Award" class="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300">
                            <span class="block bg-slate-900 text-white text-[11px] sm:text-xs p-3 text-center italic font-sans border-t border-slate-800">
                                Honoree &bull; 100 Under 40 Young Builders Award
                            </span>
                        </div>
                    </div>
                </div>
            </div>`;

    if (freedomStoryRegex.test(content)) {
        content = content.replace(freedomStoryRegex, newFreedomStory);
        console.log(`Replaced Freedom story in ${filePath}`);
    } else {
        console.log(`Could not match freedomStoryRegex in ${filePath}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath} successfully.`);
}

['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(restructureFile);

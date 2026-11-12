const fs = require('fs');

const alumniTestimonialsBlock = `
    <!-- Curvy Organic Background Wave Transition (Matches User Sample) -->
    <div class="w-full overflow-hidden leading-none -mb-px block pointer-events-none select-none">
        <svg class="w-full h-8 sm:h-14 lg:h-20 block" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C320,38 780,15 1200,8 L1200,120 L0,120 Z" fill="#4d9b96" opacity="0.65"></path>
            <path d="M0,78 C380,72 820,82 1200,76 L1200,120 L0,120 Z" fill="#0b1320"></path>
        </svg>
    </div>

    <!-- AMAZING ALUMNI TESTIMONIALS (Exact Visual Recreation from User Asset) -->
    <!-- STRICTLY NO PREHEADINGS ABOVE HEADING -->
    <section id="alumni-showcase" class="py-16 sm:py-20 relative overflow-hidden bg-[#0b1320] text-white">
        <!-- Subtle dark curved watermark background -->
        <div class="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none" style="background-image: url('assets/images/dark_curved_bg.jpg');"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#0b1320]/90 via-[#0b1320]/95 to-[#0b1320] pointer-events-none"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <!-- Section Header (NO PREHEADING) -->
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                    Here's what people are saying about the program
                </h2>
            </div>

            <!-- 3 Alumni Cards Grid (1 col on mobile, 3 cols on desktop) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
                <!-- Card 1: Fakorede Pauline -->
                <div class="relative bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-teal-400/40 rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-teal-400/60 shadow-lg shrink-0">
                                <img src="assets/images/alumni_fakorede_pauline.jpg" alt="Fakorede Pauline" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                            </div>
                            <div>
                                <h3 class="text-base sm:text-lg font-bold text-teal-400 font-heading">Fakorede Pauline</h3>
                                <p class="text-[11px] text-slate-400 font-medium">Newton Academy Fellow</p>
                            </div>
                        </div>
                        <div class="bg-black/40 border border-white/5 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            &ldquo;The foundation I gained from Newton Academy helped me get selected to work on a gig with Data Science Nigeria. I have also tutored undergraduates in machine learning, Python programming, and more.&rdquo;
                        </div>
                    </div>
                </div>

                <!-- Card 2: Bryan Bot -->
                <div class="relative bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-teal-400/40 rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-teal-400/60 shadow-lg shrink-0">
                                <img src="assets/images/alumni_bryan_bot.jpg" alt="Bryan Bot" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                            </div>
                            <div>
                                <h3 class="text-base sm:text-lg font-bold text-teal-400 font-heading">Bryan Bot</h3>
                                <p class="text-[11px] text-slate-400 font-medium">Newton Academy Fellow</p>
                            </div>
                        </div>
                        <div class="bg-black/40 border border-white/5 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            &ldquo;After joining Newton Academy program as a newbie, I got my first internship and applied all I learnt.&rdquo;
                        </div>
                    </div>
                </div>

                <!-- Card 3: Bukola Ilori -->
                <div class="relative bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-teal-400/40 rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-teal-400/60 shadow-lg shrink-0">
                                <img src="assets/images/alumni_bukola_ilori.jpg" alt="Bukola Ilori" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                            </div>
                            <div>
                                <h3 class="text-base sm:text-lg font-bold text-teal-400 font-heading">Bukola Ilori</h3>
                                <p class="text-[11px] text-slate-400 font-medium">Executive Professional</p>
                            </div>
                        </div>
                        <div class="bg-black/40 border border-white/5 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            &ldquo;As an experienced executive professional, I chose Newton Academy to break into tech and become a global professional. Learning from one of their tutors has inspired me to pursue my career in tech further.&rdquo;
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Curvy Bottom Wave Transition back to content -->
    <div class="w-full overflow-hidden leading-none -mt-px block pointer-events-none select-none">
        <svg class="w-full h-8 sm:h-14 lg:h-20 block rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C320,38 780,15 1200,8 L1200,120 L0,120 Z" fill="#4d9b96" opacity="0.65"></path>
            <path d="M0,78 C380,72 820,82 1200,76 L1200,120 L0,120 Z" fill="#0b1320"></path>
        </svg>
    </div>
`;

// Insert into index.html and index.php right before <section id="video-interviews"
['index.html', 'index.php'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('id="alumni-showcase"')) {
        const vPos = content.indexOf('<section id="video-interviews"');
        if (vPos !== -1) {
            content = content.substring(0, vPos) + alumniTestimonialsBlock + '\n' + content.substring(vPos);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Added Amazing Alumni showcase with curvy waves to ${file}`);
        }
    }
});

// Insert into scholarship.html and scholarship.php right before <div id="videoInterviewsSection"
['scholarship.html', 'scholarship.php'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('id="alumni-showcase"')) {
        const vPos = content.indexOf('id="videoInterviewsSection"');
        if (vPos !== -1) {
            const secStart = content.lastIndexOf('<div', vPos);
            content = content.substring(0, secStart) + alumniTestimonialsBlock + '\n' + content.substring(secStart);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Added Amazing Alumni showcase with curvy waves to ${file}`);
        }
    }
});

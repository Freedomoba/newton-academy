const fs = require('fs');

const unicefSection = `
    <!-- UNICEF Female Tech Empowerment & Inclusive Future Section -->
    <section class="py-16 relative overflow-hidden bg-[#002624] text-white border-y border-emerald-900/60">
        <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity" style="background-image: url('assets/images/unicef_girls_coding_classroom.jpg');"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#001e1c] via-[#002e2b]/95 to-[#001e1c]/90"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7 space-y-5">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                        <span>Global Impact Initiative</span>
                        <span class="text-slate-400">&bull;</span>
                        <span>UNICEF 2026 Aligned</span>
                    </div>
                    
                    <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-heading leading-tight">
                        Championing Women, Girls &amp; Inclusive Digital Leadership
                    </h2>
                    
                    <p class="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                        In alignment with <strong class="text-amber-300 font-semibold">UNICEF’s global mandate for adolescent girls and young women in technology</strong>, Newton Academy prioritizes intentional pathways for female secondary school graduates, university scholars, and working professionals to achieve high-income digital sovereignty.
                    </p>
                    
                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                        <p class="text-xs text-slate-300 leading-relaxed">
                            <strong class="text-white font-semibold">Inclusive Excellence:</strong> While we deliberately create scholarships, dedicated mentorship pods, and safe learning circles for women and the girl child, <strong class="text-amber-300 font-semibold">forward-thinking male students and professionals are fully embraced and warmly welcomed</strong> across all tracks. We build a collaborative future together.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                        <div class="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
                            <div class="text-xl font-black text-amber-400 font-mono">60%+</div>
                            <div class="text-[11px] text-slate-300 mt-0.5">Female Fellowship Target</div>
                        </div>
                        <div class="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
                            <div class="text-xl font-black text-emerald-400 font-mono">1-on-1</div>
                            <div class="text-[11px] text-slate-300 mt-0.5">Executive Mentorship</div>
                        </div>
                        <div class="bg-white/10 rounded-xl p-3 border border-white/10 text-center col-span-2 sm:col-span-1">
                            <div class="text-xl font-black text-white font-mono">100%</div>
                            <div class="text-[11px] text-slate-300 mt-0.5">Gender-Inclusive Faculty</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 grid grid-cols-2 gap-3.5">
                    <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/5] group">
                        <img src="assets/images/unicef_women_laptops_joy.jpg" alt="African Women in Tech" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                            <p class="text-[11px] font-medium text-white leading-tight">Joyful Tech Mastery &amp; Applied Innovation</p>
                        </div>
                    </div>
                    <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/5] group mt-6">
                        <img src="assets/images/unicef_girl_child_laptop.jpg" alt="Girl Child Digital Education" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                            <p class="text-[11px] font-medium text-white leading-tight">From Grassroots Potential to Global Skill</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const cleanVideoSection = `
    <!-- Student & Faculty Video Testimonials Section (Clean Responsive Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop) -->
    <section id="video-interviews" class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div class="text-center max-w-3xl mx-auto space-y-2">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    <span>Verified Fellows &amp; Faculty</span>
                </div>
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                    Student &amp; Faculty Video Interviews
                </h2>
                <p class="text-sm sm:text-base text-slate-600 font-sans">
                    Authentic, unedited feedback from verified fellows and educators. Click play on any video below:
                </p>
            </div>

            <!-- Page 1 (4 Videos) -->
            <div id="videoGridPage1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Video: Chukwunonso -->
                <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-700">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Verified Fellow</span>
                        </div>
                        <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">1m 25s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537104?h=cfef4b1fb4&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Chukwunonso">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Chukwunonso</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            Practical hands-on tech training experience &amp; cohort mentorship.
                        </p>
                    </div>
                </div>

                <!-- Video: Clemson -->
                <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-700">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Verified Fellow</span>
                        </div>
                        <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">2m 44s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537113?h=1e8bb3076b&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Clemson">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Clemson</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            From zero experience to building live client-ready projects.
                        </p>
                    </div>
                </div>

                <!-- Video: Emmanuel -->
                <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-700">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Verified Fellow</span>
                        </div>
                        <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">1m 15s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537116?h=2cbba86e8a&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Emmanuel">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Emmanuel</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            Mastering digital workflows and real enterprise execution.
                        </p>
                    </div>
                </div>

                <!-- Video: Olawale -->
                <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-700">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Verified Fellow</span>
                        </div>
                        <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">1m 45s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537093?h=bc9d63c5ef&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Olawale">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Olawale</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            High-impact portfolio development and mentor feedback.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Page 2 (3 Videos, hidden by default, toggled via pagination) -->
            <div id="videoGridPage2" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Video: Maryann -->
                <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-700">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Verified Fellow</span>
                        </div>
                        <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">1m 02s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537098?h=3f3366c820&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Maryann">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Maryann</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            Empowered with skills that compete and earn internationally.
                        </p>
                    </div>
                </div>

                <!-- Video: Teacher Mr. Adedokun -->
                <div class="bg-white border-2 border-amber-400 rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-amber-800">
                            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span>DLHS Faculty Educator</span>
                        </div>
                        <span class="font-mono text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full">4m 38s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537121?h=8a0c5f7baf&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Teacher Mr. Adedokun">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Teacher Mr. Adedokun</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            Educator's perspective on student transformation and impact.
                        </p>
                    </div>
                </div>

                <!-- Video: Paul -->
                <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-4 shadow-lg transition-all flex flex-col justify-between">
                    <div class="flex items-center justify-between pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold text-slate-700">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Verified Fellow</span>
                        </div>
                        <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">1m 56s</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/1245537096?h=3c42521ef7&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - Paul">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">Paul</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            Mastering practical applications and real career readiness.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Clean Pagination Controls (Page 1 & Page 2) -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <span class="text-xs text-slate-500 font-medium">Viewing 4 videos per page:</span>
                <div class="inline-flex rounded-xl shadow-sm border border-slate-300 bg-white p-1 gap-1">
                    <button type="button" id="btnVidPage1" onclick="switchVideoPage(1)" class="px-4 py-2 text-xs font-bold rounded-lg transition-all bg-[#005f5a] text-white shadow-sm">
                        Page 1 (Fellows 1-4)
                    </button>
                    <button type="button" id="btnVidPage2" onclick="switchVideoPage(2)" class="px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                        Page 2 (Fellows &amp; Educator)
                    </button>
                </div>
            </div>

            <script>
                function switchVideoPage(pageNum) {
                    const page1 = document.getElementById('videoGridPage1');
                    const page2 = document.getElementById('videoGridPage2');
                    const btn1 = document.getElementById('btnVidPage1');
                    const btn2 = document.getElementById('btnVidPage2');
                    if (!page1 || !page2) return;

                    if (pageNum === 1) {
                        page1.classList.remove('hidden');
                        page2.classList.add('hidden');
                        btn1.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-[#005f5a] text-white shadow-sm';
                        btn2.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100';
                    } else {
                        page1.classList.add('hidden');
                        page2.classList.remove('hidden');
                        btn2.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-[#005f5a] text-white shadow-sm';
                        btn1.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100';
                    }
                }
            </script>
        </div>
    </section>
`;

const darkFooter = `
    <!-- Newton Official Dark Brand Footer (Not Black) -->
    <footer class="bg-[#003835] text-slate-300 py-16 border-t border-emerald-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/40">
                <div class="md:col-span-2 space-y-4">
                    <div class="flex items-center gap-3">
                        <img src="assets/images/logo.png" alt="Newton Academy" class="h-10 w-auto brightness-0 invert">
                        <div>
                            <div class="font-black text-white text-lg tracking-tight">NEWTON ACADEMY</div>
                            <div class="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold">Faculty of Digital Technologies &amp; Enterprise</div>
                        </div>
                    </div>
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

['index.html', 'index.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace the old video interviews section with clean responsive grid + pagination
    const vidStart = content.indexOf('<section id="video-interviews"');
    if (vidStart !== -1) {
        const vidEnd = content.indexOf('</section>', vidStart) + '</section>'.length;
        content = content.substring(0, vidStart) + cleanVideoSection + '\n' + unicefSection + '\n' + content.substring(vidEnd);
        console.log(`Updated video interviews and added UNICEF section in ${file}`);
    } else {
        console.warn(`Could not find video interviews section in ${file}`);
    }

    // 2. Replace the old white footer with the dark #003835 brand footer
    const footerStart = content.indexOf('<footer');
    if (footerStart !== -1) {
        const footerEnd = content.indexOf('</footer>', footerStart) + '</footer>'.length;
        content = content.substring(0, footerStart) + darkFooter + content.substring(footerEnd);
        console.log(`Updated footer to dark #003835 in ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Finished updating index.html and index.php successfully!');

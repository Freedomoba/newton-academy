const fs = require('fs');
const path = require('path');

const VIMEO_VIDEOS = [
  { id: '1245537104', name: 'Chukwunonso', role: 'Verified Fellow', duration: '1m 25s', hash: 'cfef4b1fb4', quote: 'Practical hands-on tech training experience & cohort mentorship.', isEducator: false },
  { id: '1245537113', name: 'Clemson', role: 'Verified Fellow', duration: '2m 44s', hash: '1e8bb3076b', quote: 'From zero experience to building live client-ready projects.', isEducator: false },
  { id: '1245537116', name: 'Emmanuel', role: 'Verified Fellow', duration: '2m 40s', hash: '52775ed3e6', quote: 'Why this curriculum is completely different from traditional school.', isEducator: false },
  { id: '1245537093', name: 'Fernanda', role: 'Verified Fellow', duration: '2m 06s', hash: 'fdaaca5d75', quote: 'The quality of direct mentorship and personal growth gained.', isEducator: false },
  { id: '1245537098', name: 'Mercy', role: 'Verified Fellow', duration: '1m 40s', hash: '845f352b05', quote: 'Empowered with skills that compete and earn internationally.', isEducator: false },
  { id: '1245537121', name: 'Teacher Mr. Adedokun', role: 'DLHS Faculty Educator', duration: '4m 38s', hash: '8a0c5f7baf', quote: "Educator's perspective on student transformation and impact.", isEducator: true },
  { id: '1245537096', name: 'Paul', role: 'Verified Fellow', duration: '1m 56s', hash: '3c42521ef7', quote: 'Mastering practical applications and real career readiness.', isEducator: false }
];

const cards = VIMEO_VIDEOS.map(v => `
                <!-- Video: ${v.name} -->
                <div class="w-[270px] sm:w-auto shrink-0 bg-white border-2 ${v.isEducator ? 'border-amber-400' : 'border-slate-200 hover:border-[#005f5a]'} rounded-3xl p-3 sm:p-4 shadow-lg transition-all group flex flex-col justify-between">
                    <div class="flex items-center justify-between px-1.5 pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                        <div class="flex items-center gap-1.5 font-bold ${v.isEducator ? 'text-amber-800' : 'text-slate-700'}">
                            <span class="w-2 h-2 rounded-full ${v.isEducator ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
                            <span>${v.role}</span>
                        </div>
                        <span class="font-mono text-[10px] ${v.isEducator ? 'bg-amber-50 text-amber-800' : 'bg-slate-100'} px-2 py-0.5 rounded-full">${v.duration}</span>
                    </div>
                    
                    <div class="relative w-full aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-900">
                        <iframe 
                            src="https://player.vimeo.com/video/${v.id}?h=${v.hash}&badge=0&autopause=0&player_id=0&app_id=58479" 
                            class="absolute inset-0 w-full h-full" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                            title="Newton Academy Interview - ${v.name}">
                        </iframe>
                    </div>
                    
                    <div class="pt-3 px-1 space-y-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-slate-900 font-heading">${v.name}</h4>
                            <div class="text-amber-400 text-xs">★★★★★</div>
                        </div>
                        <p class="text-[11px] text-slate-500 font-sans leading-normal">
                            ${v.quote}
                        </p>
                    </div>
                </div>`).join('\n');

const videoSectionHtml = `
    <!-- ============================================================== -->
    <!-- STANDALONE STUDENT & FACULTY VIDEO INTERVIEWS SECTION          -->
    <!-- (COMPLETELY SEPARATED FROM WRITTEN REVIEWS - NO PREHEADINGS)   -->
    <!-- ============================================================== -->
    <section id="video-interviews" class="py-16 bg-white border-t border-slate-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div class="text-center max-w-3xl mx-auto space-y-2">
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                    Student &amp; Faculty Video Interviews
                </h2>
                <p class="text-sm sm:text-base text-slate-600 font-sans">
                    Click any portrait video below to watch authentic, unedited feedback from verified fellows and educators:
                </p>
            </div>

            <!-- Horizontal swipe on mobile, responsive grid on tablet/desktop -->
            <div class="overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
                <div class="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-w-[280px]">
${cards}
                </div>
            </div>

            <div class="text-center">
                <p class="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Playable directly on this page &bull; No external redirects</span>
                </p>
            </div>
        </div>
    </section>`;

['index.html', 'index.php'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('id="video-interviews"')) {
    const target = '<section id="convener"';
    content = content.replace(target, videoSectionHtml + '\n\n    ' + target);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Injected standalone video interviews section in', file);
  }
});

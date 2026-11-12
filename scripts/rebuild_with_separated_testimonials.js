const fs = require('fs');
const path = require('path');

console.log('--- Separating Video Testimonials & Eliminating Blank Page Issue ---');

// 1. Update scripts/build_clean_pages.js:
let buildScript = fs.readFileSync(path.join(__dirname, 'build_clean_pages.js'), 'utf8');

// A. Ensure #officialSalesLetter has explicit opacity: 1 and visibility: visible
buildScript = buildScript.replace(
    '<article id="officialSalesLetter" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 brand-shadow space-y-10">',
    '<article id="officialSalesLetter" style="opacity: 1 !important; visibility: visible !important;" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 brand-shadow space-y-10">'
);

// B. Remove the preheading badge pill from the video section in build script
buildScript = buildScript.replace(
    `<span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">\n                        Real Student & Faculty Video Reviews\n                    </span>\n                    `,
    ''
);
buildScript = buildScript.replace(
    `<span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">Real Student & Faculty Video Reviews</span>`,
    ''
);

// C. Ensure openDispatchLetter scrolls cleanly without blank screen
const cleanScrollFn = `
        function openDispatchLetter(e) {
            if (e && e.preventDefault) e.preventDefault();
            const letter = document.getElementById('officialSalesLetter');
            if (letter) {
                letter.style.opacity = '1';
                letter.style.visibility = 'visible';
                letter.scrollIntoView({ behavior: 'smooth', block: 'start' });
                letter.classList.add('ring-4', 'ring-amber-400/50');
                setTimeout(() => letter.classList.remove('ring-4', 'ring-amber-400/50'), 2000);
            }
        }
`;

if (buildScript.includes('function openDispatchLetter')) {
    buildScript = buildScript.replace(/function openDispatchLetter[\s\S]*?\}\s*\}/m, cleanScrollFn.trim());
}

fs.writeFileSync(path.join(__dirname, 'build_clean_pages.js'), buildScript, 'utf8');
console.log('Updated scripts/build_clean_pages.js');

// 2. Re-run build_clean_pages.js to regenerate scholarship.html, scholarship.php, special-offer, upsell
require('./build_clean_pages.js');

// 3. Separate Video Testimonials in index.html & index.php
const VIMEO_VIDEOS = [
  { id: "1245537104", name: "Chukwunonso", role: "Verified Fellow", duration: "1m 25s", hash: "cfef4b1fb4", quote: "Practical hands-on tech training experience & cohort mentorship.", isEducator: false },
  { id: "1245537113", name: "Clemson", role: "Verified Fellow", duration: "2m 44s", hash: "1e8bb3076b", quote: "From zero experience to building live client-ready projects.", isEducator: false },
  { id: "1245537116", name: "Emmanuel", role: "Verified Fellow", duration: "2m 40s", hash: "52775ed3e6", quote: "Why this curriculum is completely different from traditional school.", isEducator: false },
  { id: "1245537093", name: "Fernanda", role: "Verified Fellow", duration: "2m 06s", hash: "fdaaca5d75", quote: "The quality of direct mentorship and personal growth gained.", isEducator: false },
  { id: "1245537098", name: "Mercy", role: "Verified Fellow", duration: "1m 40s", hash: "845f352b05", quote: "Empowered with skills that compete and earn internationally.", isEducator: false },
  { id: "1245537121", name: "Teacher Mr. Adedokun", role: "DLHS Faculty Educator", duration: "4m 38s", hash: "8a0c5f7baf", quote: "Educator's perspective on student transformation and impact.", isEducator: true },
  { id: "1245537096", name: "Paul", role: "Verified Fellow", duration: "1m 56s", hash: "3c42521ef7", quote: "Mastering practical applications and real career readiness.", isEducator: false }
];

function buildSeparateVimeoSection() {
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
                    
                    <!-- 9:16 Portrait Phone Video Frame (Directly Playable on Page) -->
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

    return `
    <!-- ============================================================== -->
    <!-- STANDALONE STUDENT & FACULTY VIDEO INTERVIEWS SECTION          -->
    <!-- (SEPARATE FROM WRITTEN TESTIMONIALS SLIDER - NO PREHEADINGS)   -->
    <!-- ============================================================== -->
    <section id="video-interviews" class="py-16 bg-[#f8fafc] border-t border-slate-200">
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
}

['index.html', 'index.php'].forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any previously inserted video section inside testimonials
    content = content.replace(/<!-- ============================================================== -->\s*<!-- REAL STUDENT & FACULTY VIDEO INTERVIEWS[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');

    // Now insert as a SEPARATE standalone section before #testimonials section
    if (!content.includes('id="video-interviews"')) {
        const testimonialsMarker = '<!-- TESTIMONIALS & RESULTS SECTION -->';
        if (content.includes(testimonialsMarker)) {
            content = content.replace(testimonialsMarker, buildSeparateVimeoSection() + '\n\n    ' + testimonialsMarker);
        } else {
            const secMarker = '<section id="testimonials"';
            if (content.includes(secMarker)) {
                content = content.replace(secMarker, buildSeparateVimeoSection() + '\n\n    ' + secMarker);
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${file}] Separated Video Testimonials into distinct section with zero preheadings`);
});

// Also remove preheading pill from scholarship.html, scholarship.php, etc.
['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove preheading badge
    content = content.replace(/<span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">\s*Real Student & Faculty Video Reviews\s*<\/span>\s*/gi, '');

    // Ensure #officialSalesLetter has inline opacity: 1 and visibility: visible
    content = content.replace(
        '<article id="officialSalesLetter" class="',
        '<article id="officialSalesLetter" style="opacity: 1 !important; visibility: visible !important;" class="'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${file}] Cleaned preheading and guaranteed opacity`);
});

console.log('All updates completed successfully!');


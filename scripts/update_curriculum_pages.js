const fs = require('fs');
const path = require('path');

console.log('--- Updating Curriculum Pages with Official Tutors, Detailed Modules & Media ---');

// Read existing curriculum-de.html and curriculum-dm.html as base templates
let deHtml = fs.readFileSync(path.join(__dirname, '..', 'curriculum-de.html'), 'utf8');
let dmHtml = fs.readFileSync(path.join(__dirname, '..', 'curriculum-dm.html'), 'utf8');

// 1. TUTOR SPOTLIGHT FOR DIGITAL ENTREPRENEURSHIP: JUDITH IMANAI
const judithSection = `
    <!-- LEAD FACULTY TUTOR SPOTLIGHT: JUDITH IMANAI -->
    <section class="bg-gradient-to-br from-[#002f2d] via-[#00403c] to-[#002624] text-white py-16 border-y-2 border-amber-400/40">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <!-- Tutor Photo Column -->
                <div class="md:col-span-5 text-center md:text-left space-y-4">
                    <div class="relative inline-block mx-auto md:mx-0 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-900">
                        <img src="assets/images/tutor_judith_imanai.jpg" alt="Judith Imanai - Seasoned Digital Entrepreneur" class="w-72 sm:w-80 h-auto object-cover max-h-[420px]">
                        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                            <span class="block text-amber-400 text-xs font-black uppercase tracking-wider">Lead Programme Tutor</span>
                            <span class="block text-white text-sm font-bold">Judith Imanai</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                        <span class="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">ACCA Certified</span>
                        <span class="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-bold">FinTech Innovator</span>
                        <span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">Multi-Venture Founder</span>
                    </div>
                </div>

                <!-- Tutor Bio Column -->
                <div class="md:col-span-7 space-y-5">
                    <span class="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md inline-block">
                        Faculty Profile &bull; Meet Your Lead Tutor
                    </span>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                        Judith Imanai: Seasoned Digital Entrepreneur & FinTech Leader
                    </h2>
                    <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                        Judith Imanai is a seasoned Digital Entrepreneur with deep domain expertise in FinTech, specializing in digital financial products that address real consumer problems in Africa's financial ecosystems.
                    </p>
                    <div class="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        <p>
                            She has co-founded multiple groundbreaking tech companies, including <strong>Advanshub</strong>, <strong>Techpill Kenya</strong> (telemedicine), and <strong>Uthabiti Africa</strong> (childcare tech).
                        </p>
                        <p>
                            Judith has served as <strong>Chief Operating Officer (COO) at Stawika</strong>, <strong>Chief Technology Officer (CTO) at Uthabiti Africa</strong>, and <strong>Entrepreneur in Residence (EIR)</strong> at The Micropoint Systems and Badili Africa, steering innovations in health tech, childcare tech, and green tech.
                        </p>
                        <p class="p-3.5 rounded-xl bg-[#002826] border border-amber-400/30 text-amber-200 font-medium">
                            Highly skilled in digital finance, scalable business systems, and operational efficiencies, Judith holds elite professional certifications in digital finance and ACCA.
                        </p>
                    </div>

                    <!-- Course Flyers Grid -->
                    <div class="pt-2 grid grid-cols-2 gap-3 sm:gap-4">
                        <div class="rounded-2xl overflow-hidden border border-amber-400/30 shadow-md">
                            <img src="assets/images/flyer_digital_entrepreneurship_1.jpg" alt="A Diploma for Digital Entrepreneurs" class="w-full h-auto object-cover">
                        </div>
                        <div class="rounded-2xl overflow-hidden border border-amber-400/30 shadow-md">
                            <img src="assets/images/flyer_digital_entrepreneurship_2.jpg" alt="Diploma in Digital Entrepreneurship" class="w-full h-auto object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

// 2. TUTOR SPOTLIGHT FOR DIGITAL MARKETING: THEOPHILUS AKHIMIE
const theophilusSection = `
    <!-- LEAD FACULTY TUTOR SPOTLIGHT: THEOPHILUS AKHIMIE -->
    <section class="bg-gradient-to-br from-[#002f2d] via-[#004d49] to-[#003835] text-white py-16 border-y-2 border-teal-400/30">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <!-- Tutor Photo Column -->
                <div class="md:col-span-5 text-center md:text-left space-y-4">
                    <div class="relative inline-block mx-auto md:mx-0 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-900">
                        <img src="assets/images/tutor_theophilus_akhimie.jpg" alt="Theophilus Akhimie - Seasoned Digital Marketer" class="w-72 sm:w-80 h-auto object-cover max-h-[420px]">
                        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                            <span class="block text-amber-400 text-xs font-black uppercase tracking-wider">Lead Programme Tutor</span>
                            <span class="block text-white text-sm font-bold">Theophilus Akhimie</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                        <span class="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">12 Years Global Exp</span>
                        <span class="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-bold">M.Sc Marketing (USA)</span>
                        <span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">Fortune 500 Strategist</span>
                    </div>
                </div>

                <!-- Tutor Bio Column -->
                <div class="md:col-span-7 space-y-5">
                    <span class="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md inline-block">
                        Faculty Profile &bull; Meet Your Lead Tutor
                    </span>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                        Theophilus Akhimie: Seasoned Digital Marketer & Global Strategist
                    </h2>
                    <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                        Theophilus Akhimie is a seasoned Digital Marketer with 12 years of hands-on experience driving exponential organizational growth and high-ticket consumer value across multinational markets.
                    </p>
                    <div class="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        <p>
                            He has architected campaigns and consulted for premier global brands including <strong>Pinterest</strong>, <strong>Accenture</strong>, <strong>Gannett</strong>, <strong>Swish Interactive</strong>, <strong>Nautica</strong>, <strong>Adidas</strong>, <strong>FCMB</strong>, <strong>GTBank</strong>, and <strong>Jumia</strong>.
                        </p>
                        <p>
                            His core mastery spans enterprise brand management, precision market research, conversion analytics, high-ROAS multi-channel paid acquisition, and commercial business development.
                        </p>
                        <p class="p-3.5 rounded-xl bg-[#002826] border border-teal-400/30 text-teal-200 font-medium">
                            Theophilus holds a Master's Degree in Marketing Management from <strong>Maryland University, Baltimore, USA</strong>, bringing world-class American marketing execution directly to your screen.
                        </p>
                    </div>

                    <!-- Motivational AI Poster Preview -->
                    <div class="pt-2">
                        <div class="rounded-2xl overflow-hidden border border-teal-400/30 shadow-md max-w-sm">
                            <img src="assets/images/inspire_ai_marketing.jpg" alt="Is Digital Marketing still relevant in an AI-driven world?" class="w-full h-auto object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

// Insert the tutor sections right before <!-- MOUTH-WATERING BENEFITS SECTION -->
if (!deHtml.includes('JUDITH IMANAI')) {
  deHtml = deHtml.replace('<!-- MOUTH-WATERING BENEFITS SECTION -->', judithSection + '\n    <!-- MOUTH-WATERING BENEFITS SECTION -->');
}
if (!dmHtml.includes('THEOPHILUS AKHIMIE')) {
  dmHtml = dmHtml.replace('<!-- MOUTH-WATERING BENEFITS SECTION -->', theophilusSection + '\n    <!-- MOUTH-WATERING BENEFITS SECTION -->');
}

// Write back curriculum-de.html, curriculum-de.php, curriculum-dm.html, curriculum-dm.php
fs.writeFileSync(path.join(__dirname, '..', 'curriculum-de.html'), deHtml, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'curriculum-de.php'), deHtml.replace(/href="checkout\.html/g, 'href="checkout.php'), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'curriculum-dm.html'), dmHtml, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'curriculum-dm.php'), dmHtml.replace(/href="checkout\.html/g, 'href="checkout.php'), 'utf8');

console.log('Successfully updated curriculum-de and curriculum-dm (.html and .php) with Judith Imanai and Theophilus Akhimie!');


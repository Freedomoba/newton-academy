<?php
require_once __DIR__ . '/config.php';

$name = htmlspecialchars($_GET['name'] ?? 'Candidate', ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_GET['email'] ?? '', ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($_GET['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$track = 'de';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Entrepreneurship + Applied AI | Full Curriculum & Scholarship Syllabus | <?php echo ACADEMY_NAME; ?></title>
    <!-- Favicon & Social Meta -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                        heading: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            bg: '#f1f5f9',
                            50: '#f0f9f8',
                            100: '#d9f0ee',
                            500: '#007771',
                            600: '#005f5a',
                            700: '#004d49',
                            800: '#003e3b',
                            900: '#002f2d',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .brand-shadow {
            box-shadow: 0 20px 40px -15px rgba(0, 95, 90, 0.15);
        }
        .gold-glow {
            box-shadow: 0 10px 30px -8px rgba(245, 158, 11, 0.35);
        }
    
        p {
            line-height: 1.65 !important;
        }
        .prose-readable {
            line-height: 1.65 !important;
        }
        .heading-highlight {
            text-decoration-color: #f59e0b;
            text-underline-offset: 8px;
        }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] font-sans antialiased selection:bg-[#005f5a] selection:text-white">

    <!-- Top Navigation Bar -->
    <header class="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
            <!-- Left: Logo -->
            <a href="index.php" class="flex items-center shrink-0">
                <img src="assets/logo.png" alt="<?php echo ACADEMY_NAME; ?>" class="h-8 sm:h-11 w-auto max-w-[130px] sm:max-w-none object-contain">
            </a>

            <!-- Right: Back to Briefing Link & Apply Action -->
            <div class="flex items-center gap-2 sm:gap-4 shrink-0">
                <a id="backToBriefingLink" href="thank-you.php?name=<?php echo urlencode($name); ?>&email=<?php echo urlencode($email); ?>&phone=<?php echo urlencode($phone); ?>" class="text-[11px] sm:text-xs font-bold text-[#005f5a] hover:text-[#004d49] hover:underline flex items-center gap-1 transition-colors whitespace-nowrap">
                    ← <span class="hidden sm:inline">Back to</span> <span>Briefing</span>
                </a>
                <a href="#applyForm" class="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 text-slate-950 font-black text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full gold-glow transition-all whitespace-nowrap">
                    Apply Now
                </a>
            </div>
        </div>
    </header>

    <!-- HERO HEADER: Program Track & Scholarship Status -->
    <section class="bg-gradient-to-br from-[#003330] via-[#005f5a] to-[#00433f] text-white py-14 sm:py-20 border-b border-amber-500/30">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-4">
                Digital Entrepreneurship + Applied AI
            </h1>

            <p class="text-base sm:text-xl text-teal-100 max-w-3xl mx-auto font-sans leading-relaxed mb-8">
                Master the art of building, launching, and scaling profitable digital businesses, automated sales pipelines, and high-margin AI video workflows.
            </p>

            <!-- Financial Award Summary Box -->
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-xl mx-auto text-left space-y-3 font-sans">
                <div class="flex justify-between text-xs sm:text-sm text-teal-200">
                    <span>Standard Program Tuition:</span>
                    <span class="line-through font-mono">₦<?php echo number_format(ORIGINAL_PRICE); ?></span>
                </div>
                <div class="flex justify-between text-xs sm:text-sm text-amber-300 font-bold">
                    <span>Newton Academy Foundation Grant:</span>
                    <span class="font-mono">-₦<?php echo number_format(ORIGINAL_PRICE); ?> (100% Covered)</span>
                </div>
                <div class="border-t border-white/15 pt-2 flex justify-between items-center text-white">
                    <div>
                        <strong class="text-sm block">Tuition Payable by Fellow:</strong>
                        <span class="text-[11px] text-emerald-300">100% Full Tuition Free</span>
                    </div>
                    <span class="text-2xl font-black text-emerald-400 font-mono">₦0.00</span>
                </div>
                <div class="border-t border-white/15 pt-2 flex justify-between items-center text-white">
                    <div>
                        <strong class="text-sm block">One-Time Application Fee:</strong>
                        <span class="text-[11px] text-teal-200">Mandatory Seriousness & Commitment Filter</span>
                    </div>
                    <span class="text-2xl font-black text-amber-400 font-mono">₦<?php echo number_format(SCHOLARSHIP_APPLICATION_FEE); ?></span>
                </div>
            </div>

            <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#applyForm" class="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-xl gold-glow transition-all transform active:scale-95 text-center">
                    Claim 100% Scholarship & Fill Application Form
                </a>
                <a href="#modules" class="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl border border-white/25 transition-all text-center">
                    Explore All 15 Modules Below ↓
                </a>
            </div>

        
            <div class="mt-12 max-w-4xl mx-auto px-2">
                <div class="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950">
                    <img src="assets/images/mockup_digital_entrepreneurship.jpg" alt="Digital Entrepreneurship Multi-Device Learning Suite" class="w-full h-auto object-cover">
                </div>
                <!-- Clean Separate Info Bar Below Mockup (Never covers image on mobile!) -->
                <div class="mt-3 bg-slate-900/90 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-white">
                        <div class="flex items-center gap-3">
                            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span class="text-xs sm:text-sm font-bold">100% Cross-Platform Access: Desktop, Laptop, Tablet & Mobile</span>
                        </div>
                        <span class="text-[11px] font-mono text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                            Includes Lumenvox AI Suite + LMS Portal
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FACULTY CREDENTIALS BANNER -->
    <section class="bg-gradient-to-br from-[#002d2a] via-[#00403d] to-[#002624] text-white py-16 border-t border-b border-amber-400/20">
        <div class="max-w-5xl mx-auto px-4 text-center">
            <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Integrated Lumenvox AI Creator Suite (5 Modules)
            </h3>
            <p class="text-xs sm:text-sm text-teal-200 font-sans mt-2 max-w-2xl mx-auto">
                        Never purchase separate prompt engineering or video editing courses. The full Lumenvox suite is integrated directly into your diploma.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
            <div class="bg-[#003835]/40 border border-amber-500/30 rounded-2xl p-6 text-white hover:border-amber-400 transition-all">
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        AI-01
                    </span>
                    <span class="text-[11px] font-mono text-amber-300 font-bold">Integrated Suite</span>
                </div>
                <h4 class="text-base font-bold text-white tracking-tight mb-2">
                    Generative AI Prompt Engineering Architecture
                </h4>
                <p class="text-xs sm:text-sm text-teal-100 font-sans leading-relaxed">
                    Master advanced structured prompting with GPT-4o, Claude 3.5 Sonnet, and deep research agents. Automated market research, customer psychographics, and instantaneous commercial copy generation.
                </p>
            </div>
  

            <div class="bg-[#003835]/40 border border-amber-500/30 rounded-2xl p-6 text-white hover:border-amber-400 transition-all">
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        AI-02
                    </span>
                    <span class="text-[11px] font-mono text-amber-300 font-bold">Integrated Suite</span>
                </div>
                <h4 class="text-base font-bold text-white tracking-tight mb-2">
                    Cinematic AI Video Creation (Runway Gen-3 & Kling AI)
                </h4>
                <p class="text-xs sm:text-sm text-teal-100 font-sans leading-relaxed">
                    Create broadcast-quality commercial ads, cinematic brand films, and social video ads from text prompts and still imagery without physical camera crews, expensive studios, or studio sets.
                </p>
            </div>
  

            <div class="bg-[#003835]/40 border border-amber-500/30 rounded-2xl p-6 text-white hover:border-amber-400 transition-all">
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        AI-03
                    </span>
                    <span class="text-[11px] font-mono text-amber-300 font-bold">Integrated Suite</span>
                </div>
                <h4 class="text-base font-bold text-white tracking-tight mb-2">
                    Synthetic Voice Cloning & Hyper-Realistic Audio (ElevenLabs)
                </h4>
                <p class="text-xs sm:text-sm text-teal-100 font-sans leading-relaxed">
                    Synthesize flawless human narrations in British, American, and native African accents. Voice cloning for international video sales letters, multi-lingual translations, and podcast automation.
                </p>
            </div>
  

            <div class="bg-[#003835]/40 border border-amber-500/30 rounded-2xl p-6 text-white hover:border-amber-400 transition-all">
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        AI-04
                    </span>
                    <span class="text-[11px] font-mono text-amber-300 font-bold">Integrated Suite</span>
                </div>
                <h4 class="text-base font-bold text-white tracking-tight mb-2">
                    Faceless Video Ad Channels & Kinetic VSL Production
                </h4>
                <p class="text-xs sm:text-sm text-teal-100 font-sans leading-relaxed">
                    Building automated video ad engines: automated B-roll sourcing, auto-caption kinetic typography in CapCut and Premiere Pro, and producing 30 video ads weekly in under 3 hours.
                </p>
            </div>
  

            <div class="bg-[#003835]/40 border border-amber-500/30 rounded-2xl p-6 text-white hover:border-amber-400 transition-all">
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        AI-05
                    </span>
                    <span class="text-[11px] font-mono text-amber-300 font-bold">Integrated Suite</span>
                </div>
                <h4 class="text-base font-bold text-white tracking-tight mb-2">
                    AI Service Packaging & Foreign Client Monetization
                </h4>
                <p class="text-xs sm:text-sm text-teal-100 font-sans leading-relaxed">
                    Packaging your AI creation skills into high-ticket service retainers. Delivering commercial video ads to international agencies in the US and UK who gladly pay $500 to $1,500 per video.
                </p>
            </div>
  
                </div>
        </div>
    </section>
    </section>

    <!-- EMBEDDED APPLICATION FORM: APPLY DIRECTLY FROM THIS PAGE -->
    <section id="applyForm" class="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <div class="bg-white border-2 border-[#005f5a] rounded-3xl p-6 sm:p-10 brand-shadow">
            
            <div class="text-center mb-8">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Apply for 100% Full Tuition Scholarship
                </h3>
                <p class="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Selected Track: <strong class="text-[#005f5a]">Digital Entrepreneurship + Applied AI</strong>
                </p>
            </div>

            <!-- The Transparency Box: The ₦20,000 Filter -->
            <div class="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-8 text-xs text-amber-950 font-sans leading-relaxed">
                <strong>Why is there a ₦20,000 application fee?</strong>
                Because free programs suffer a 95% dropout rate. We have thousands of applicants and limited mentor capacity. The ₦20,000 is not tuition - it is a non-refundable commitment filter that ensures every seat goes to a fellow who will finish the full 3-month curriculum.
            </div>

            <div id="cAlert" class="hidden mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium"></div>

            <form id="curriculumApplyForm" class="space-y-5">
                <input type="hidden" name="programme" value="Digital Entrepreneurship + Applied AI">

                <!-- Full Legal Name -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Candidate Full Legal Name
                    </label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value="<?php echo $name !== 'Candidate' ? $name : ''; ?>" 
                        required 
                        placeholder="e.g. Samuel Adeyemi"
                        class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005f5a] focus:bg-white transition-all"
                    >
                </div>

                <!-- Email Address -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Primary Email Address
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        value="<?php echo $email; ?>" 
                        required 
                        placeholder="e.g. samuel@example.com"
                        class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005f5a] focus:bg-white transition-all"
                    >
                </div>

                <!-- Phone -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        WhatsApp Contact Number
                    </label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value="<?php echo $phone; ?>" 
                        required 
                        placeholder="e.g. 08012345678"
                        class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005f5a] focus:bg-white transition-all"
                    >
                </div>

                <!-- Agreement -->
                <div class="p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
                    <input type="checkbox" id="cAgree" required class="mt-0.5 rounded text-[#005f5a] focus:ring-[#005f5a] shrink-0">
                    <label for="cAgree" class="cursor-pointer">
                        I agree to pay the mandatory ₦20,000 application fee if accepted and commit to completing all 15 modules and the capstone project.
                    </label>
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                    <button 
                        type="submit" 
                        id="cSubmitBtn"
                        class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-4 px-6 rounded-xl text-base gold-glow transform active:scale-95 transition-all cursor-pointer text-center"
                    >
                        Submit Application & Access Award Document
                    </button>
                </div>

                <p class="text-center text-[11px] text-slate-500">
                    Secured by 256-bit SSL encryption. Evaluated by Admissions Committee.
                </p>
            </form>

        </div>
    </section>

    <!-- FOOTER -->
    
    <!-- TESTIMONIALS SHOWCASE (100 VERIFIED FELLOW EXPERIENCES) -->
    <section id="reviews" class="border-t border-slate-200 bg-[#f1f5f9] py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            
            <!-- Section Header -->
            <div class="text-center max-w-2xl mx-auto mb-10">
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    Real Experiences from <span class="text-[#005f5a] underline decoration-amber-400 decoration-4 underline-offset-8">Ambitious Women & Founders</span>
                </h2>
                <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    Verified feedback from 100 fellows and alumni across Nigeria, Africa, the UK, and the diaspora who transitioned into high-income digital enterprise.
                </p>
            </div>

            <!-- Single Full-Width Card Showcase (Every Word Fully Readable!) -->
            <div class="bg-white border-2 border-[#005f5a]/30 rounded-3xl p-7 sm:p-10 brand-shadow relative transition-all duration-300" id="testimonialCard">
                
                <!-- Card Header: Rating & Badge -->
                <div class="flex items-center justify-between gap-2 mb-6">
                    <div class="flex items-center text-amber-500 text-sm tracking-wide">
                        <span id="tStars">★★★★★</span>
                        <span id="tRating" class="text-slate-900 text-xs font-bold ml-2">5.0 / 5.0</span>
                    </div>
                    <span id="tBadge" class="text-[10px] font-extrabold text-[#005f5a] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
                        Verified Fellow
                    </span>
                </div>

                <!-- Full Quote Body (100% visible, natural text wrap, no horizontal cutoff!) -->
                <div class="min-h-[140px] sm:min-h-[120px] flex items-center">
                    <p id="tQuote" class="text-base sm:text-lg text-slate-800 font-sans leading-[1.65] italic">
                        "The caliber of tutors here is unmatched. Having tutors who actually led campaigns at Meta and Accenture review my offer positioning changed everything. Within 6 weeks of applying their high-ticket packaging principles, I closed two foreign consulting retainers paying in USD."
                    </p>
                </div>

                <!-- Card Footer: Author Profile & Navigation Controls -->
                <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div class="flex items-center gap-3.5">
                        <div id="tAvatar" class="w-11 h-11 rounded-full bg-[#005f5a] text-white flex items-center justify-center font-black text-sm shrink-0">
                            OO
                        </div>
                        <div>
                            <h4 id="tName" class="text-sm font-bold text-slate-900">Oluwaseun O.</h4>
                            <p id="tRole" class="text-xs text-slate-500 leading-normal">Brand Strategist & Independent Consultant &bull; Lagos</p>
                        </div>
                    </div>

                    <!-- Slide Controls & Review Index Counter -->
                    <div class="flex items-center gap-3 self-end sm:self-auto">
                        <span id="tCounter" class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                            Review 1 of 100
                        </span>
                        <div class="flex items-center gap-1.5">
                            <button 
                                type="button" 
                                id="btnPrevT" 
                                aria-label="Previous review"
                                class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 flex items-center justify-center font-bold text-base transition-all cursor-pointer"
                            >
                                ←
                            </button>
                            <button 
                                type="button" 
                                id="btnNextT" 
                                aria-label="Next review"
                                class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 flex items-center justify-center font-bold text-base transition-all cursor-pointer"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Animated Auto-Rotate Progress Bar -->
                <div class="w-full bg-slate-100 h-1 rounded-full mt-6 overflow-hidden">
                    <div id="tProgressBar" class="h-full bg-[#005f5a] transition-all duration-100" style="width: 0%"></div>
                </div>
            </div>

            <!-- Review Notice -->
            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span class="font-bold text-[#005f5a]">Average 4.9 / 5.0 Rating Across 100 Documented Graduate Reviews</span>
                <span>Reviews rotate automatically every 4 seconds. Tap arrows or hover to pause and read.</span>
            </div>

        </div>
    </section>

<footer class="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div class="max-w-5xl mx-auto px-4">
            <p>&copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?>. All rights reserved.</p>
            <p class="mt-1 text-slate-400">Convened by Newton Academy. Professional Diplomas in Technology, Marketing & Business Systems.</p>
        </div>
    </footer>

    <!-- Form Script -->
    <script>
        const cForm = document.getElementById('curriculumApplyForm');
        const cBtn = document.getElementById('cSubmitBtn');
        const cAlert = document.getElementById('cAlert');

        cForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            cBtn.disabled = true;
            cBtn.textContent = 'Filing Candidate Record...';
            cAlert.classList.add('hidden');

            const formData = new FormData(cForm);

            try {
                const response = await fetch('api/scholarship.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    cAlert.className = 'mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200';
                    cAlert.textContent = 'Application Verified! Directing to official award document...';
                    cAlert.classList.remove('hidden');

                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 500);
                } else {
                    throw new Error(data.message || 'An error occurred during submission.');
                }
            } catch (err) {
                cAlert.className = 'mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium bg-rose-50 text-rose-800 border border-rose-200';
                cAlert.textContent = err.message;
                cAlert.classList.remove('hidden');

                cBtn.disabled = false;
                cBtn.textContent = 'Submit Application & Access Award Document';
            }
        });
    </script>

    <!-- 100 Verified Testimonials Data & Slider Controller -->
    <script src="assets/js/testimonials.js"></script>
    <script src="assets/js/testimonial-slider.js"></script>
    <script src="assets/js/animations.js"></script>
</body>
</html>

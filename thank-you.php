<?php
require_once __DIR__ . '/config.php';

$name = htmlspecialchars($_GET['name'] ?? 'Candidate', ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_GET['email'] ?? '', ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($_GET['phone'] ?? '', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waitlist Status & Faculty Scholarship Briefing | <?php echo ACADEMY_NAME; ?></title>
    <!-- Favicon & Social Meta -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <meta property="og:image" content="assets/favicon.jpg">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Montserrat', 'Ubuntu', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                        heading: ['Montserrat', 'Ubuntu', 'sans-serif'],
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
            box-shadow: 0 10px 30px -10px rgba(245, 158, 11, 0.35);
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
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] font-sans antialiased selection:bg-[#005f5a] selection:text-white pb-20 sm:pb-0">

    <!-- Top Alert Banner -->
    <div class="bg-gradient-to-r from-[#003835] via-[#005f5a] to-[#004d49] text-white text-xs sm:text-sm py-3 px-4 text-center font-medium tracking-wide border-b border-amber-500/30">
        <span class="inline-flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <strong>Important Notice:</strong> Do not close or refresh this page. Your delegate pass is confirmed below.
        </span>
    </div>

    <!-- Header Navigation -->
    <header class="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <a href="index.php" class="flex items-center gap-2.5">
                <img src="assets/logo.png" alt="<?php echo ACADEMY_NAME; ?>" class="h-9 sm:h-11 w-auto object-contain">
            </a>
            <div class="flex items-center gap-3">
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#005f5a] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full hidden sm:inline-block">
                    Official Admissions Desk
                </span>
                <div class="text-xs text-slate-500 font-mono">
                    ID: <strong class="text-slate-800">#<?php echo strtoupper(substr(md5($email . 'newton'), 0, 8)); ?></strong>
                </div>
            </div>
        </div>
    </header>

    <!-- STEP 1: CONGRATULATIONS & WHATSAPP ACCESS (Centralized Card) -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div class="bg-white border-2 border-[#005f5a]/30 rounded-3xl p-6 sm:p-10 brand-shadow text-center">
            
            <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome to the Virtual Conference, <?php echo $name; ?>.
            </h1>
            
            <p class="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
                Your delegate pass for <strong>From Skills to <span class="text-[#005f5a] underline decoration-amber-400 decoration-4 underline-offset-8">Income</span>: Building Your Brand, Growing Your Business &amp; Using <span class="text-amber-600 underline decoration-[#005f5a]/40 decoration-4 underline-offset-8">AI to Get Ahead</span></strong> is officially recorded under <span class="font-bold text-slate-900"><?php echo $email ? $email : 'your email address'; ?></span>.
            </p>

            <div class="mt-6 p-6 sm:p-8 bg-gradient-to-br from-[#f0f9f8] to-[#e6f4f2] border border-[#005f5a]/25 rounded-2xl max-w-2xl mx-auto text-center">
                <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    Access the Private Conference Delegates WhatsApp Room
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-sans">
                    The live stream broadcast links, keynote speaker slides, session replays, and delegate workbooks are delivered exclusively inside the private WhatsApp room. Join immediately to complete your orientation.
                </p>

                <a 
                    href="<?php echo WHATSAPP_WAITLIST_LINK; ?>" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-block w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-xl gold-glow transition-all transform active:scale-95 text-center"
                >
                    Enter Conference Delegates WhatsApp Room
                </a>

                <p class="text-[11px] text-slate-500 mt-3">
                    Encrypted WhatsApp group link. Tap once to join instantly.
                </p>
            </div>

        </div>
    </section>

    <!-- SECTION DIVIDER WITH SALES HOOK -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center">
        <div class="inline-block h-px w-24 bg-slate-300"></div>
    </div>

    <!-- ============================================================== -->
    <!-- THE COMPLETE AIDA FORMULA SALES LETTER                         -->
    <!-- ============================================================== -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">

        <!-- ========================================================== -->
        <!-- 1. ATTENTION: The 5-Minute Revelation & The Raw Hook       -->
        <!-- ========================================================== -->
        <article class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 brand-shadow mb-12">
            
            <div class="text-center max-w-3xl mx-auto mb-8">
                <h2 class="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                    In the next 5 minutes, we will reveal how a young lady who hawked corn on campus, and a graduate who worked dusty manual POP ceiling labor, escaped the brutal Nigerian dilemma to earn in stable US Dollars and British Pounds...
                </h2>

                <p class="text-base sm:text-lg text-slate-600 font-sans mt-4 leading-relaxed">
                    ...and how the Newton Academy Academic Council has fully endowed your <span class="text-[#005f5a] font-bold not-italic">100% Full Tuition Scholarship (₦200,000 value completely covered)</span> so you can duplicate their exact commercial systems.
                </p>
            </div>

            <!-- Centralized "What You Will Discover In 5 Minutes" Card -->
            <div class="bg-gradient-to-br from-[#003d3a] to-[#002d2a] text-white rounded-2xl p-6 sm:p-8 my-8 shadow-xl border border-amber-500/30">
                <div class="text-center mb-6">
                    <h3 class="text-xl sm:text-2xl font-extrabold mt-1">Here Is What You Are About To Uncover:</h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-teal-100 font-sans">
                    <div class="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                        <span class="text-amber-400 font-black text-base shrink-0">✓</span>
                        <span><strong>The Post-NYSC Deception:</strong> Why degrees and ₦33k monthly stipends leave brilliant graduates completely stranded at P.O.P.</span>
                    </div>

                    <div class="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                        <span class="text-amber-400 font-black text-base shrink-0">✓</span>
                        <span><strong>The Corn Seller to US Tech Journey:</strong> How a First Class student moved from hawking food on campus to earning $2,800/month remotely.</span>
                    </div>

                    <div class="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                        <span class="text-amber-400 font-black text-base shrink-0">✓</span>
                        <span><strong>From Dusty POP Scaffolding to UK AI:</strong> Freedom Obanijesu's verified transition to international technology partnerships.</span>
                    </div>

                    <div class="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                        <span class="text-amber-400 font-black text-base shrink-0">✓</span>
                        <span><strong>100% Full Tuition Scholarship:</strong> How your ₦200,000 fee is covered, and why a ₦20,000 filter is mandatory to protect seats.</span>
                    </div>
                </div>
            </div>

            <!-- Hook Statement from Newton Academy -->
            <div class="border-l-4 border-amber-500 pl-5 py-2 my-8 bg-[#f1f5f9] rounded-r-2xl">
                <p class="text-sm sm:text-base text-slate-800 font-sans mt-1 leading-relaxed">
                    "Newton Academy was established on one undeniable principle: Education without commercial leverage in today's Nigeria is slow economic suicide. We do not teach theories from 1995. We teach the high-income systems demanded by global employers in 2026."
                </p>
            </div>

            <!-- ====================================================== -->
            <!-- 2. INTEREST: The Nigerian Dilemma & Proof Case Studies  -->
            <!-- ====================================================== -->
            <div class="border-t border-slate-200 pt-10 mt-10">
                <div class="text-center max-w-2xl mx-auto mb-8">
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        The Nigerian Dilemma: Why Brilliant Minds End Up Stranded
                    </h3>
                </div>

                <div class="space-y-5 text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                    <p>
                        Let us confront the raw, uncomfortable truth about the reality of building a life in Nigeria today.
                    </p>
                    <p>
                        Think about how hard you have worked. Think about the years spent in school: navigating endless strikes, sleepless nights reading for exams, and the exhausting daily hustle. Maybe you had to hawk corn, snacks, or thrift clothes on campus just to pay handouts and hostel fees. Or maybe you had to take on grueling manual labor on dusty construction sites in the scorching heat just to buy books and stay in school.
                    </p>
                    <p>
                        You endured all of it with one single belief: <em>"Once I graduate, my story will change."</em>
                    </p>
                    <p>
                        You graduated with pride - perhaps with a 2:1 or even a First Class. You wore the NYSC khaki, served your country in a distant state, and squeezed every kobo out of a monthly ₦33,000 stipend that barely lasted past the first seven days of the month.
                    </p>
                    <p class="font-bold text-slate-900 not-italic">
                        And then came the cliff: Passing Out Parade (P.O.P).
                    </p>
                    <p>
                        The monthly allowance stopped. The congratulations faded. You submitted 50, 100, 200 job applications. Total silence. You watched the Naira lose value week after week. Living costs exploded. Food prices tripled. And you were left sitting at home, deeply confused - educated on paper, brilliant in character, but completely broke in reality.
                    </p>
                </div>

                <!-- Proof Visual: Post-NYSC Dilemma -->
                <div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                    <img src="assets/images/young_lady_graduate_nysc.jpg" alt="The Nigerian Graduate Dilemma" class="w-full h-64 sm:h-80 object-cover">
                    <div class="p-4 bg-[#f8fafc] text-xs text-slate-600 border-t border-slate-200 flex items-center justify-between">
                        <span><strong>The Nigerian Dilemma:</strong> Over 70% of graduates face total joblessness after NYSC P.O.P.</span>
                        <span class="text-[#005f5a] font-bold">Degrees Don't Guarantee Income</span>
                    </div>
                </div>

            </div>

            <!-- ------------------------------------------------------ -->
            <!-- CASE STUDY 1: The Young Lady Who Hawked Corn on Campus -->
            <!-- ------------------------------------------------------ -->
            <div class="border-t border-slate-200 pt-10 mt-10">
                <div class="text-center max-w-2xl mx-auto mb-8">
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        From Hawking Corn on Campus to $2,800/Month US Remote Tech
                    </h3>
                </div>

                <div class="space-y-4 text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                    <p>
                        Consider the real journey of a young Nigerian lady who entered university with virtually zero financial backing. Her parents could not afford handouts, textbooks, or hostel rent.
                    </p>
                    <p>
                        Every afternoon between lectures, while other students were resting, she carried a tray of boiled and roasted corn, groundnuts, and snacks around campus hostels to raise money for school fees. Through grit and unyielding discipline, she graduated with a <strong>First Class Degree</strong>.
                    </p>
                    <p>
                        She completed NYSC with high hopes. Yet for 14 grueling months, she could not find a single job paying more than ₦45,000 in Lagos. She was frustrated, broke, and on the verge of total despair.
                    </p>
                    <p>
                        Then she made a defining decision: She enrolled in Newton Academy's digital marketing and AI growth program. She learned how to run high-ROI ad funnels, conduct market research with advanced AI prompting, and position herself for international remote roles.
                    </p>
                    <p class="font-bold text-slate-900">
                        Today, she works as a Remote Growth Marketing Associate for a premier agency in the United States, earning $2,800 every month - earning in stable foreign currency right from her home in Nigeria.
                    </p>
                </div>

                <!-- 3-Image Proof Grid: Campus Hawker to US Remote Role -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
                    <div class="rounded-2xl overflow-hidden border border-slate-200 bg-[#f1f5f9]">
                        <img src="assets/images/young_lady_hawking_corn.jpg" alt="Young Nigerian Student Hawking Corn on Campus" class="w-full h-52 object-cover">
                        <div class="p-4 bg-white border-t border-slate-100">
                            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">The Hard Beginning</span>
                            <h4 class="text-xs font-bold text-slate-900 mt-0.5">Hawking Corn on Campus</h4>
                            <p class="text-[11px] text-slate-500 mt-1">Selling boiled and roasted corn between lectures to sponsor tuition and campus handouts.</p>
                        </div>
                    </div>

                    <div class="rounded-2xl overflow-hidden border border-slate-200 bg-[#f1f5f9]">
                        <img src="assets/images/young_lady_graduate_nysc.jpg" alt="First Class Degree Convocation" class="w-full h-52 object-cover">
                        <div class="p-4 bg-white border-t border-slate-100">
                            <span class="text-[10px] font-bold text-[#005f5a] uppercase tracking-wider block">Academic Excellence</span>
                            <h4 class="text-xs font-bold text-slate-900 mt-0.5">First Class Graduate</h4>
                            <p class="text-[11px] text-slate-500 mt-1">Beaming with pride at convocation - only to face 14 months of post-NYSC unemployment.</p>
                        </div>
                    </div>

                    <div class="rounded-2xl overflow-hidden border border-slate-200 bg-[#f1f5f9]">
                        <img src="assets/images/young_lady_remote_office.jpg" alt="Remote AI Marketer in Lagos" class="w-full h-52 object-cover">
                        <div class="p-4 bg-white border-t border-slate-100">
                            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Global Breakthrough</span>
                            <h4 class="text-xs font-bold text-slate-900 mt-0.5">$2,800/Month US Remote Role</h4>
                            <p class="text-[11px] text-slate-500 mt-1">Working comfortably from home with premier US tech teams, paid in stable USD.</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ------------------------------------------------------ -->
            <!-- CASE STUDY 2: Freedom Emmanuel Obanijesu               -->
            <!-- ------------------------------------------------------ -->
            <div class="border-t border-slate-200 pt-10 mt-10">
                <div class="text-center max-w-2xl mx-auto mb-8">
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        From Manual POP Ceiling Installation to UK AI Product Marketer
                    </h3>
                </div>

                <div class="space-y-4 text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                    <p>
                        This is the documented journey of our lead growth architect, <strong>Freedom Emmanuel Obanijesu</strong>.
                    </p>
                    <p>
                        At age 16, Freedom had to take on heavy manual construction labor. He learned POP (Plaster of Paris) ceiling installation - mixing heavy white powder, climbing rickety wooden scaffolding in the scorching heat, and working with blistered hands and plaster dust in his lungs just to feed himself and stay in school.
                    </p>
                    <p>
                        Even while studying Building Technology at the Federal University of Technology, Akure (FUTA), he painted residential houses and installed POP ceilings off-campus to survive.
                    </p>
                    <p>
                        During NYSC, he made a radical realization: <em>"Physical trade labor in a crumbling economy will exhaust your body while keeping you poor. Digital leverage is the only true escape."</em>
                    </p>
                    <p>
                        He immersed himself in direct-response marketing, automated customer acquisition funnels, and modern Artificial Intelligence.
                    </p>
                </div>

                <!-- 3-Image Grid: Freedom's Real Authentic Proof (NO stock/fake photos) -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
                    <div class="rounded-2xl overflow-hidden border border-slate-200 bg-[#f1f5f9]">
                        <img src="assets/images/freedom_nysc_award.jpg" alt="Freedom Obanijesu winning 1st Place Bayelsa NYSC Corpreneurship Award" class="w-full h-56 object-cover">
                        <div class="p-4 bg-white border-t border-slate-100">
                            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">State Honor &bull; Bayelsa</span>
                            <h4 class="text-xs font-bold text-slate-900 mt-0.5">1st Place NYSC Corpreneurship</h4>
                            <p class="text-[11px] text-slate-500 mt-1">Honored on stage for tech-driven innovation and digital enterprise execution during NYSC.</p>
                        </div>
                    </div>

                    <div class="rounded-2xl overflow-hidden border border-slate-200 bg-[#f1f5f9]">
                        <img src="assets/images/freedom_speaking.jpg" alt="Freedom Obanijesu Keynote on Youth Entrepreneurship" class="w-full h-56 object-cover">
                        <div class="p-4 bg-white border-t border-slate-100">
                            <span class="text-[10px] font-bold text-[#005f5a] uppercase tracking-wider block">Keynote Address &bull; Lagos</span>
                            <h4 class="text-xs font-bold text-slate-900 mt-0.5">Keynote Speaker & 100 Under 40</h4>
                            <p class="text-[11px] text-slate-500 mt-1">Addressing ambitious builders on digital marketing systems at True Independence Lagos.</p>
                        </div>
                    </div>

                    <div class="rounded-2xl overflow-hidden border border-slate-200 bg-[#f1f5f9]">
                        <img src="assets/images/freedom_profile.jpg" alt="Freedom Emmanuel Obanijesu AI Product Marketer" class="w-full h-56 object-cover">
                        <div class="p-4 bg-white border-t border-slate-100">
                            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Global Growth Architect</span>
                            <h4 class="text-xs font-bold text-slate-900 mt-0.5">Partnering with UK AI Startups</h4>
                            <p class="text-[11px] text-slate-500 mt-1">Leading AI product marketing and growth campaigns for tech firms in the United Kingdom.</p>
                        </div>
                    </div>
                </div>

                <div class="p-5 bg-[#f0f9f8] border border-[#005f5a]/25 rounded-2xl text-xs sm:text-sm text-slate-700 font-sans leading-relaxed text-center">
                    Freedom and our student alumni were not born into generational wealth. They did not have foreign passports. They simply refused to remain trapped in the Nigerian dilemma. They acquired high-leverage commercial skills and mastered Artificial Intelligence.
                </div>

            </div>

        </article>

        <!-- ========================================================== -->
        <!-- 3. DESIRE: The 100% Full Tuition Scholarship Endowment     -->
        <!-- ========================================================== -->
        <section class="bg-gradient-to-br from-[#003835] via-[#004d49] to-[#002b28] text-white rounded-3xl p-6 sm:p-12 shadow-2xl mb-12 border-2 border-amber-500/40 relative overflow-hidden">
            
            <div class="text-center max-w-2xl mx-auto mb-8 relative z-10">
                <h3 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    The Newton Academy Foundation <span class="text-amber-300 underline decoration-amber-400 decoration-4 underline-offset-8">100% Tuition Endowment</span>
                </h3>

                <p class="text-sm sm:text-base text-teal-100 font-sans mt-3 leading-relaxed">
                    How Newton Academy and our alumni foundation completely cover your ₦200,000 tuition fee for the upcoming 3-month diploma session.
                </p>
            </div>

            <!-- Ledger Table -->
            <div class="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 font-sans max-w-2xl mx-auto my-8">
                <div class="space-y-4 text-xs sm:text-sm">
                    <div class="flex justify-between items-center text-teal-200">
                        <span>Standard International Tuition:</span>
                        <span class="line-through font-mono text-base text-teal-300">₦<?php echo number_format(ORIGINAL_PRICE); ?></span>
                    </div>

                    <div class="flex justify-between items-center text-amber-300 font-bold">
                        <span>Newton Academy Endowment Award:</span>
                        <span class="font-mono text-base">-₦<?php echo number_format(ORIGINAL_PRICE); ?> (100% Full Tuition Covered)</span>
                    </div>

                    <div class="flex justify-between items-center text-emerald-400 font-black text-sm sm:text-base border-t border-white/15 pt-3">
                        <span>Total Tuition Fee Payable:</span>
                        <span class="text-xl font-mono">₦0.00 (FREE)</span>
                    </div>

                    <div class="flex justify-between items-center text-white border-t border-white/20 pt-3">
                        <div>
                            <strong class="block text-sm">Mandatory Application & Seriousness Filter:</strong>
                            <span class="text-[11px] text-teal-200 block">Non-refundable commitment fee to guarantee cohort completion</span>
                        </div>
                        <span class="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                            ₦<?php echo number_format(SCHOLARSHIP_APPLICATION_FEE); ?>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Global Pedigree Banner -->
            <div class="bg-black/30 border border-white/15 rounded-2xl p-5 max-w-2xl mx-auto text-center mt-6">
                <span class="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-2">
                    Taught by Global Industry Tutors with Enterprise Backgrounds At:
                </span>
                <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white font-extrabold text-xs sm:text-sm">
                    <span>Microsoft</span>
                    <span>Meta (Facebook)</span>
                    <span>Accenture</span>
                    <span>7Up Bottling Company</span>
                </div>
            </div>

        </section>

        <!-- The Two Diploma Tracks (Curriculum & Lumenvox AI Suite) -->
        <section class="space-y-8 mb-12">
            
            <div class="text-center max-w-2xl mx-auto mb-8">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Select Your Specialized 3-Month Diploma Program
                </h3>
            </div>

            <!-- Track 1: Digital Entrepreneurship -->
            <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 brand-shadow">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
                    <div>
                        <span class="text-xs font-bold text-[#005f5a] uppercase tracking-wider">Option One</span>
                        <h4 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                            Digital Entrepreneurship + Applied AI
                        </h4>
                    </div>
                    <span class="text-xs bg-teal-50 text-[#005f5a] font-bold px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                        3-Month Diploma & Certification
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                    <img src="assets/images/entrepreneurship.jpg" alt="Digital Entrepreneurship Track" class="w-full h-56 rounded-2xl object-cover border border-slate-200">
                    <div class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans">
                        <div class="p-3 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong>1. Offer Packaging & High-Ticket Positioning:</strong> How to charge 5x to 10x your current rates by selling business outcomes instead of commodity hours.
                        </div>
                        <div class="p-3 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong>2. Automated Sales Systems:</strong> Building funnels that acquire customers and collect payments internationally without 24/7 manual chats.
                        </div>
                        <div class="p-3 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong>3. Integrated Lumenvox AI Creator Suite:</strong> Creating viral marketing video ads with Runway Gen-3 and Kling AI, plus voice cloning with ElevenLabs.
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a 
                        href="curriculum-de.php?name=<?php echo urlencode($name); ?>&email=<?php echo urlencode($email); ?>&phone=<?php echo urlencode($phone); ?>" 
                        class="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#005f5a] hover:text-[#004d49] underline decoration-2 underline-offset-4"
                    >
                        <span>Read Full 15-Module Syllabus & Benefits</span>
                        <span>→</span>
                    </a>
                    <a 
                        href="#scholarshipApplication" 
                        class="bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all text-center"
                    >
                        Apply for This Track
                    </a>
                </div>
            </div>

            <!-- Track 2: Digital Marketing -->
            <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 brand-shadow">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
                    <div>
                        <span class="text-xs font-bold text-[#005f5a] uppercase tracking-wider">Option Two</span>
                        <h4 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                            Digital Marketing + Applied AI
                        </h4>
                    </div>
                    <span class="text-xs bg-teal-50 text-[#005f5a] font-bold px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                        3-Month Diploma & Certification
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                    <img src="assets/images/marketing_analytics.jpg" alt="Digital Marketing & AI Track" class="w-full h-56 rounded-2xl object-cover border border-slate-200">
                    <div class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans">
                        <div class="p-3 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong>1. Multi-Platform Paid Advertising:</strong> Meta Ads, Google PPC, and TikTok advertising with positive ROAS and zero wasted ad spend.
                        </div>
                        <div class="p-3 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong>2. Direct-Response Copywriting:</strong> Crafting sales pages, email newsletters, and video scripts that convert cold traffic into paid buyers.
                        </div>
                        <div class="p-3 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong>3. Remote Client Acquisition:</strong> How to pitch and secure foreign businesses in the US, UK, and Europe paying on monthly retainers in USD.
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a 
                        href="curriculum-dm.php?name=<?php echo urlencode($name); ?>&email=<?php echo urlencode($email); ?>&phone=<?php echo urlencode($phone); ?>" 
                        class="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#005f5a] hover:text-[#004d49] underline decoration-2 underline-offset-4"
                    >
                        <span>Read Full 15-Module Syllabus & Benefits</span>
                        <span>→</span>
                    </a>
                    <a 
                        href="#scholarshipApplication" 
                        class="bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all text-center"
                    >
                        Apply for This Track
                    </a>
                </div>
            </div>

        </section>

        <!-- ========================================================== -->
        <!-- 4. ACTION: The Seriousness Filter & Application Form       -->
        <!-- ========================================================== -->
        <section id="scholarshipApplication" class="bg-white border-2 border-[#005f5a] rounded-3xl p-6 sm:p-12 brand-shadow relative">
            
            <!-- Centralized Transparency Box: The ₦20,000 Filter -->
            <div class="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-6 sm:p-8 mb-8 text-center max-w-2xl mx-auto">
                <span class="text-xs font-black text-amber-900 uppercase tracking-widest block mb-1">
                    Admissions Council Transparency Note
                </span>
                <h4 class="text-lg sm:text-xl font-extrabold text-amber-950 mb-2">
                    Why Is There A ₦20,000 Application Fee For A 100% Scholarship?
                </h4>
                <p class="text-xs sm:text-sm text-amber-900 font-sans leading-relaxed">
                    Because 100% free programs suffer a 95% dropout rate. When people pay zero, they treat world-class training like a casual PDF download and abandon their seats midway. We receive over 2,000 applications each session and our mentor capacity is strictly limited. The ₦20,000 fee is <strong>not tuition</strong> - it is a mandatory seriousness filter to ensure that only dedicated fellows who will complete the entire 3-month curriculum take up our endowed seats.
                </p>
            </div>

            <!-- Form Header -->
            <div class="text-center max-w-xl mx-auto mb-8">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Submit Candidate File for 100% Scholarship
                </h3>
                <p class="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Seats are held for <strong>24 hours</strong>. Upon submission, you will be redirected to your official scholarship award document to finalize your admission.
                </p>
            </div>

            <div id="scholarshipAlert" class="hidden mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium"></div>

            <form id="scholarshipForm" class="space-y-6 max-w-xl mx-auto">
                
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

                <!-- Preferred Program Track -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Approved 3-Month Diploma Track
                    </label>
                    <select 
                        name="programme" 
                        required 
                        class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#005f5a] focus:bg-white transition-all"
                    >
                        <option value="Digital Entrepreneurship + Applied AI" selected>Digital Entrepreneurship + Applied AI (3 Months)</option>
                        <option value="Digital Marketing + Applied AI">Digital Marketing + Applied AI (3 Months)</option>
                    </select>
                </div>

                <!-- Commitment Filter Agreement -->
                <div class="p-4 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-3">
                    <input type="checkbox" id="commitCheck" required class="mt-0.5 rounded text-[#005f5a] focus:ring-[#005f5a] shrink-0">
                    <label for="commitCheck" class="leading-relaxed cursor-pointer">
                        I confirm that if awarded this 100% Full Tuition Scholarship (₦200,000 value covered), I will pay the mandatory ₦20,000 application fee and commit to completing the entire 3-month curriculum.
                    </label>
                </div>

                <!-- Big Gold CTA Button -->
                <div class="pt-2">
                    <button 
                        type="submit" 
                        id="scholarshipSubmitBtn"
                        class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-4 px-6 rounded-xl text-base gold-glow transform active:scale-95 transition-all cursor-pointer text-center"
                    >
                        Submit Application & Access Award Document
                    </button>
                </div>

                <div class="text-center text-[11px] text-slate-500 space-y-1 pt-1">
                    <p>Secured with 256-bit SSL encryption. Direct evaluation by Admissions Council.</p>
                </div>

            </form>

        </section>

    </main>

    
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

<!-- Footer -->
    <footer class="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div class="max-w-4xl mx-auto px-4">
            <p>&copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?>. All rights reserved.</p>
            <p class="mt-1 text-slate-400">Convened by Newton Academy. Professional Diplomas in Technology, Marketing & Business Systems.</p>
        </div>
    </footer>

    <!-- Form Script -->
    <script>
        const sForm = document.getElementById('scholarshipForm');
        const sBtn = document.getElementById('scholarshipSubmitBtn');
        const sAlert = document.getElementById('scholarshipAlert');

        sForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            sBtn.disabled = true;
            sBtn.textContent = 'Filing Candidate File...';
            sAlert.classList.add('hidden');

            const formData = new FormData(sForm);

            try {
                const response = await fetch('api/scholarship.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    sAlert.className = 'mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200';
                    sAlert.textContent = 'Scholarship Candidate File Verified. Directing to official award document...';
                    sAlert.classList.remove('hidden');

                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 500);
                } else {
                    throw new Error(data.message || 'An error occurred during submission.');
                }
            } catch (err) {
                sAlert.className = 'mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium bg-rose-50 text-rose-800 border border-rose-200';
                sAlert.textContent = err.message;
                sAlert.classList.remove('hidden');

                sBtn.disabled = false;
                sBtn.textContent = 'Submit Application & Access Award Document';
            }
        });
    </script>

    <!-- 100 Verified Testimonials Data & Slider Controller -->
    <script src="assets/js/testimonials.js"></script>
    <script src="assets/js/testimonial-slider.js"></script>
</body>
</html>

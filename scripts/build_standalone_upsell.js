const fs = require('fs');
const path = require('path');

console.log('--- Building Standalone Upsell & Dedicated Thank You Pages ---');

function createStandaloneUpsell(isPhp) {
    const filename = isPhp ? 'scholarship.php' : 'scholarship.html';
    const checkoutTarget = isPhp ? 'checkout.php' : 'checkout.html';
    const indexTarget = isPhp ? 'index.php' : 'index.html';

    const phpHeader = isPhp ? `<?php
require_once __DIR__ . '/config.php';

$name = trim($_GET['name'] ?? 'Freedom Obanijesu');
$email = filter_var(trim($_GET['email'] ?? 'freedom@lumenvoxai.com'), FILTER_VALIDATE_EMAIL) ? trim($_GET['email']) : 'freedom@lumenvoxai.com';
$phone = trim($_GET['phone'] ?? '+2348012345678');
?>\n` : '';

    return `${phpHeader}<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>100% Full Tuition Scholarship Briefing | ${isPhp ? '<?php echo ACADEMY_NAME; ?>' : 'Newton Academy'}</title>
    <!-- Favicon & Social Meta -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <meta property="og:image" content="assets/favicon.jpg">
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
                            600: '#005f5a',     // Official Dark Pine Teal
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
        body, p, li {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.625;
        }
        h1, h2, h3, h4, button, .font-heading {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .brand-shadow {
            box-shadow: 0 20px 40px -15px rgba(0, 95, 90, 0.15);
        }
        .gold-glow {
            box-shadow: 0 10px 30px -10px rgba(245, 158, 11, 0.35);
        }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] font-sans antialiased selection:bg-[#005f5a] selection:text-white pb-20 sm:pb-0">

    <!-- Header Navigation -->
    <header class="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <a href="${indexTarget}" class="flex items-center shrink-0">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-11 w-auto max-w-[135px] sm:max-w-none object-contain">
            </a>
            <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-[#005f5a] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full whitespace-nowrap">
                    Scholarship Council
                </span>
            </div>
        </div>
    </header>

    <!-- ============================================================== -->
    <!-- INTERACTIVE CONFIDENTIAL SCHOLARSHIP ENVELOPE                   -->
    <!-- ============================================================== -->
    <section id="envelopeSection" class="max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12 envelope-wrapper">
        
        <!-- Real Downward Arrow Indicators (No Redundant Text Pills) -->
        <div class="flex items-center justify-center gap-6 sm:gap-10 mb-4 select-none">
            <div class="text-amber-500 arrow-pulse-1">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
            <div class="text-amber-400 arrow-pulse-2">
                <svg class="w-10 h-10 sm:w-12 sm:h-12 fill-current drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
            <div class="text-amber-500 arrow-pulse-3">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
        </div>

        <!-- The 3D Interactive Envelope Container -->
        <div id="scholarshipEnvelopeCard" onclick="openScholarshipEnvelope()" class="envelope-card cursor-pointer bg-gradient-to-br from-[#003d3a] via-[#004d49] to-[#002d2a] text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden group">
            
            <!-- Subtle Gold Watermark Seal -->
            <div class="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border-4 border-amber-400/10 pointer-events-none flex items-center justify-center">
                <span class="text-amber-300/10 font-mono text-7xl font-black">NA</span>
            </div>

            <!-- Envelope Header Tag -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4 mb-6">
                <div class="flex items-center gap-2.5">
                    <span class="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
                    <span class="text-xs uppercase tracking-widest font-mono text-amber-300 font-bold">
                        CONFIDENTIAL ADMISSIONS DISPATCH
                    </span>
                </div>
                <span class="text-[11px] font-mono text-teal-200 bg-white/10 px-3 py-1 rounded-full self-start sm:self-auto border border-white/10">
                    Quota Allocation: Verified Candidate
                </span>
            </div>

            <!-- Envelope Content -->
            <div class="text-center max-w-xl mx-auto space-y-4 py-2">
                <p class="text-xs sm:text-sm font-mono uppercase tracking-wider text-teal-200">
                    Prepared Exclusively For Candidate:
                </p>
                <h3 class="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    <span id="envelopeRecipientName" class="text-amber-300 underline decoration-amber-400 underline-offset-8">${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Freedom Obanijesu'}</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-md mx-auto">
                    Contains your endowed <strong class="text-amber-300 font-bold">100% Full Tuition Scholarship (₦200,000 value covered)</strong> and priority orientation instructions.
                </p>

                <!-- Interactive Wax Seal Button -->
                <div class="pt-4">
                    <button type="button" class="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl wax-seal-pulse transform group-hover:scale-105 transition-all cursor-pointer">
                        <span class="text-xl">✉</span>
                        <span>TAP TO BREAK SEAL & REVEAL SCHOLARSHIP DOSSIER</span>
                        <span class="text-lg">→</span>
                    </button>
                    <p class="text-[11px] text-teal-200/80 mt-2 font-mono">
                        Tap anywhere on this envelope to open the official briefing
                    </p>
                </div>
            </div>

        </div>

    </section>

    <!-- ============================================================== -->
    <!-- THE COMPLETE DIRECT-RESPONSE SALES LETTER                      -->
    <!-- ============================================================== -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 pb-24">

        <!-- ========================================================== -->
        <!-- 1. ATTENTION: Direct-Response Copywriting & Story Hook     -->
        <!-- ========================================================== -->
        <article id="officialSalesLetter" class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 brand-shadow mb-12">
            
            <div class="text-center max-w-3xl mx-auto mb-8">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.32]">
                    Discover How You Can Start Making Up To <span class="text-[#005f5a] underline decoration-[#e5a93c] underline-offset-8 font-extrabold">$1,000 Monthly</span> As A Young Graduate, Stay-At-Home Mom, Or Underpaid Professional In Nigeria
                </h2>

                <p class="text-base sm:text-lg text-slate-600 font-sans mt-4 leading-[1.65]">
                    ...Without relocating abroad, hawking cheap physical products on WhatsApp, or waiting endlessly for government jobs that pay less than monthly inflation.
                </p>
            </div>

            <!-- Direct Personal Salutation & Story Hook -->
            <div class="mt-8 pt-6 border-t border-slate-200 text-left">
                <p class="text-lg sm:text-xl text-slate-900 font-bold mb-3">
                    Dear <span id="storyRecipientName" class="text-[#005f5a] underline decoration-amber-400">${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Freedom Obanijesu'}</span>,
                </p>
                <div class="space-y-4 text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                    <p>
                        Let me share with you a quick, true story of two young Nigerians who were once completely trapped by the economic reality of this country...
                    </p>
                    <p>
                        The first was a brilliant university student who had to hawk boiled corn along campus pathways just to afford photocopies and feed herself through the semester. Despite graduating with top honors, the corporate world offered her nothing more than exploitative ₦40,000 monthly internships that barely covered transport fare.
                    </p>
                    <p>
                        The second was a graduate who left NYSC orientation with high hopes, only to spend long, dusty months doing backbreaking manual P.O.P ceiling work on construction sites under the scorching sun just to survive.
                    </p>
                    <p>
                        Today, both of them command thousands of dollars in international retainers every single month, working remotely with high-paying clients across North America, the UK, and Europe, right from their laptops here in Nigeria.
                    </p>
                    <p class="font-semibold text-slate-900">
                        And below, you will discover how the Newton Academy Academic Council has fully endowed your <span class="text-emerald-700 font-bold underline decoration-emerald-300 underline-offset-4">100% Full Tuition Scholarship (₦200,000 value covered)</span> so you can duplicate their exact commercial systems.
                    </p>
                </div>
            </div>

            <!-- 5-Minute Video Briefing Container -->
            <div id="videoBriefing" class="my-10 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#005f5a]/30 relative">
                <div class="relative pb-[56.25%] h-0">
                    <iframe 
                        class="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" 
                        title="Newton Academy Scholarship Briefing"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                </div>
                <div class="p-4 bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span class="font-bold">Official Admissions Video Briefing (5 Mins)</span>
                    </div>
                    <span class="text-slate-400 font-mono">Watch completely before submitting candidate file below</span>
                </div>
            </div>

            <!-- Centralized "What You Will Discover In 5 Minutes" Card -->
            <div class="bg-gradient-to-br from-[#003d3a] to-[#002d2a] text-white rounded-2xl p-6 sm:p-8 my-8 shadow-xl border border-amber-500/30">
                <div class="text-center mb-6">
                    <h3 class="text-xl sm:text-2xl font-bold mt-1">Here Is What You Are About To Uncover:</h3>
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

        </article>

        <!-- ============================================================== -->
        <!-- 2. THE DIPLOMA TRACKS & 3D MULTI-DEVICE MOCKUPS                -->
        <!-- ============================================================== -->
        <section class="space-y-10 mb-12">
            <div class="text-center max-w-2xl mx-auto mb-6">
                <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Select Your Specialized 3-Month Diploma Track
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
                    Both tracks are fully covered by the Newton Academy Foundation 100% Tuition Scholarship endowment.
                </p>
            </div>

            <!-- Track 1: Digital Entrepreneurship -->
            <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 brand-shadow">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
                    <div>
                        <h4 class="text-xl sm:text-2xl font-bold text-slate-900">
                            Digital Entrepreneurship + Applied AI
                        </h4>
                    </div>
                    <span class="text-xs bg-teal-50 text-[#005f5a] font-bold px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                        3-Month Diploma &amp; Certification
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                    <!-- Clean Mockup Box -->
                    <div>
                        <div class="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950">
                            <img src="assets/images/mockup_digital_entrepreneurship.jpg" alt="Digital Entrepreneurship Learning Suite" class="w-full h-auto object-cover">
                        </div>
                        <div class="mt-2.5 bg-slate-900/90 rounded-xl p-3 text-white flex items-center justify-between text-xs">
                            <span class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Desktop, Tablet &amp; Mobile</span>
                            </span>
                            <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">Includes LMS + Lumenvox AI</span>
                        </div>
                    </div>

                    <div class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans">
                        <div class="p-3.5 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong class="text-slate-900 block mb-0.5">1. Offer Creation &amp; Packaging:</strong> How to package high-ticket commercial services that foreign clients eagerly pay $500 to $2,500 for.
                        </div>
                        <div class="p-3.5 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong class="text-slate-900 block mb-0.5">2. Multi-Currency Infrastructure:</strong> Setting up foreign accounts to legally receive US Dollars ($), British Pounds (£), and Euros (€) directly to Nigeria.
                        </div>
                        <div class="p-3.5 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong class="text-slate-900 block mb-0.5">3. Commercial AI Systems:</strong> Deploying generative AI to automate client research, commercial proposals, and business workflows.
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a href="curriculum-de.${isPhp ? 'php' : 'html'}" class="text-xs sm:text-sm font-bold text-[#005f5a] hover:text-[#004d49] underline decoration-2 underline-offset-4">
                        Read Full 15-Module Syllabus &amp; Benefits →
                    </a>
                    <a href="#scholarshipApplication" class="bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all text-center">
                        Apply for This Track
                    </a>
                </div>
            </div>

            <!-- Track 2: Digital Marketing -->
            <div class="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 brand-shadow">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
                    <div>
                        <h4 class="text-xl sm:text-2xl font-bold text-slate-900">
                            Digital Marketing + Applied AI
                        </h4>
                    </div>
                    <span class="text-xs bg-teal-50 text-[#005f5a] font-bold px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                        3-Month Diploma &amp; Certification
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                    <!-- Clean Mockup Box -->
                    <div>
                        <div class="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950">
                            <img src="assets/images/mockup_digital_marketing.jpg" alt="Digital Marketing Learning Suite" class="w-full h-auto object-cover">
                        </div>
                        <div class="mt-2.5 bg-slate-900/90 rounded-xl p-3 text-white flex items-center justify-between text-xs">
                            <span class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Desktop, Tablet &amp; Mobile</span>
                            </span>
                            <span class="text-[10px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">Includes LMS + Lumenvox AI</span>
                        </div>
                    </div>

                    <div class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans">
                        <div class="p-3.5 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong class="text-slate-900 block mb-0.5">1. Multi-Platform Paid Advertising:</strong> Meta Ads, Google PPC, and TikTok campaigns engineered for high ROAS with zero wasted ad spend.
                        </div>
                        <div class="p-3.5 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong class="text-slate-900 block mb-0.5">2. Direct-Response Copywriting:</strong> Crafting sales pages, email funnels, and video scripts that convert cold traffic into paid buyers.
                        </div>
                        <div class="p-3.5 bg-[#f1f5f9] rounded-xl border border-slate-200">
                            <strong class="text-slate-900 block mb-0.5">3. Remote Client Acquisition:</strong> Pitching and retaining foreign businesses in the US, UK, and Europe paying monthly retainers in USD.
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a href="curriculum-dm.${isPhp ? 'php' : 'html'}" class="text-xs sm:text-sm font-bold text-[#005f5a] hover:text-[#004d49] underline decoration-2 underline-offset-4">
                        Read Full 15-Module Syllabus &amp; Benefits →
                    </a>
                    <a href="#scholarshipApplication" class="bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all text-center">
                        Apply for This Track
                    </a>
                </div>
            </div>

        </section>

        <!-- ============================================================== -->
        <!-- 3. THE NEW ENDOWMENT GRANT & SEAT CONFIRMATION VOUCHER          -->
        <!-- ============================================================== -->
        <section class="space-y-4 mb-12">
            
            <!-- Card 1: 100% Scholarship Endowment Certificate -->
            <div class="bg-gradient-to-br from-[#003835] via-[#004d49] to-[#002f2d] text-white rounded-2xl p-6 sm:p-7 shadow-lg border-2 border-emerald-400/40 relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border-4 border-white/5 pointer-events-none flex items-center justify-center">
                    <span class="text-white/10 font-mono text-5xl font-black">100%</span>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4 mb-5">
                    <div class="flex items-center gap-2.5">
                        <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span class="text-xs uppercase tracking-widest font-mono text-emerald-300 font-bold">
                            Newton Academy Foundation Endowment
                        </span>
                    </div>
                    <span class="text-xs font-bold text-emerald-950 bg-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shadow-sm">
                        Tuition: 100% Fully Covered
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                        <span class="text-xs text-teal-200 uppercase tracking-wider font-mono block mb-1">Standard 3-Month Tuition</span>
                        <span class="line-through text-slate-300 text-lg sm:text-xl font-mono font-bold">₦200,000</span>
                        <span class="block text-xs text-emerald-300 font-semibold mt-1">Paid in full by Academic Foundation Reserve</span>
                    </div>
                    <div class="sm:text-right bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/10 sm:border-0">
                        <span class="text-xs text-teal-200 uppercase tracking-wider font-mono block mb-1">Your Remaining Tuition Balance</span>
                        <span class="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">₦0.00</span>
                        <span class="block text-[11px] text-teal-100 font-sans mt-0.5">Zero tuition payable throughout your 3 months</span>
                    </div>
                </div>
            </div>

            <!-- Card 2: Seat Allocation & Application Fee Filter -->
            <div class="bg-white border-2 border-amber-400/50 rounded-2xl p-6 sm:p-7 shadow-md">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="space-y-1.5 max-w-md">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                            <h4 class="text-sm sm:text-base font-bold text-slate-900">
                                One-Time Application &amp; Seat Reservation Fee
                            </h4>
                        </div>
                        <p class="text-xs text-slate-600 font-sans leading-relaxed">
                            Due to extreme applicant volume and strictly capped cohort capacity, this single commitment fee secures your seat, provisions your LMS portal credentials, and assigns your faculty mentors.
                        </p>
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-500 font-medium">
                            <span>✓ Guaranteed Cohort Seat</span>
                            <span>✓ LMS &amp; AI Suite Provisioning</span>
                            <span>✓ 24h Reservation Window</span>
                        </div>
                    </div>

                    <div class="text-left sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Total Payable Now</span>
                        <span class="text-3xl sm:text-4xl font-extrabold text-[#005f5a] font-mono block">
                            ₦20,000
                        </span>
                        <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full inline-block mt-1">
                            Saves You ₦200,000
                        </span>
                    </div>
                </div>
            </div>

        </section>

        <!-- ============================================================== -->
        <!-- 4. ACTION: SCHOLARSHIP APPLICATION FORM                        -->
        <!-- ============================================================== -->
        <section id="scholarshipApplication" class="bg-white border-2 border-[#005f5a] rounded-3xl p-6 sm:p-12 brand-shadow relative mb-12">
            
            <div class="text-center max-w-xl mx-auto mb-8">
                <h3 class="text-2xl sm:text-3xl font-bold text-slate-900">
                    Submit Candidate File for 100% Scholarship
                </h3>
                <p class="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed font-sans">
                    Upon submission, our Academic Admissions Council will evaluate your file in real time to provision your official award document.
                </p>
            </div>

            <form id="scholarshipForm" class="space-y-6 max-w-xl mx-auto">
                <!-- Full Legal Name -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Candidate Full Legal Name
                    </label>
                    <input 
                        type="text" 
                        id="sName"
                        name="fullName" 
                        value="${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Freedom Obanijesu'}" 
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
                        id="sEmail" 
                        name="email" 
                        value="${isPhp ? '<?php echo htmlspecialchars($email); ?>' : 'freedom@lumenvoxai.com'}" 
                        required 
                        placeholder="e.g. samuel@example.com"
                        class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005f5a] focus:bg-white transition-all"
                    >
                </div>

                <!-- WhatsApp Phone Number -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Active WhatsApp Phone Number
                    </label>
                    <input 
                        type="tel" 
                        id="sPhone" 
                        name="phone" 
                        value="${isPhp ? '<?php echo htmlspecialchars($phone); ?>' : '+2348012345678'}" 
                        required 
                        placeholder="e.g. 08012345678"
                        class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005f5a] focus:bg-white transition-all"
                    >
                </div>

                <!-- Select Program Track -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Select Admitted Track
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
                    <label for="commitCheck" class="leading-relaxed cursor-pointer font-sans">
                        I confirm that if awarded this 100% Full Tuition Scholarship (₦200,000 value covered), I will pay the mandatory ₦20,000 seat filter fee and commit to completing the entire 3-month curriculum.
                    </label>
                </div>

                <!-- Big Gold CTA Button -->
                <div class="pt-2">
                    <button 
                        type="submit" 
                        id="scholarshipSubmitBtn"
                        class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-4 px-6 rounded-xl text-base shadow-xl gold-glow transform active:scale-95 transition-all cursor-pointer text-center"
                    >
                        Submit Application &amp; Access Award Document
                    </button>
                </div>

                <div class="text-center text-[11px] text-slate-500 space-y-1 pt-1 font-mono">
                    <p>Secured with 256-bit SSL encryption. Direct evaluation by Admissions Council.</p>
                </div>
            </form>

        </section>

    </main>

    <!-- 100 VERIFIED FELLOW REVIEWS SECTION -->
    <section id="reviews" class="border-t border-slate-200 bg-[#f1f5f9] py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div class="text-center max-w-2xl mx-auto mb-10">
                <h3 class="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                    Real Experiences from <span class="text-[#005f5a] underline decoration-amber-400 decoration-4 underline-offset-8">Ambitious Women &amp; Founders</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-sans">
                    Verified feedback from 100 fellows and alumni across Nigeria, Africa, the UK, and the diaspora who transitioned into high-income digital enterprise.
                </p>
            </div>

            <!-- Single Full-Width Card Showcase -->
            <div class="bg-white border-2 border-[#005f5a]/30 rounded-3xl p-7 sm:p-10 brand-shadow relative transition-all duration-300" id="testimonialCard">
                <div class="flex items-center justify-between gap-2 mb-6">
                    <div class="flex items-center text-amber-500 text-sm tracking-wide">
                        <span id="tStars">★★★★★</span>
                        <span id="tRating" class="text-slate-900 text-xs font-bold ml-2">5.0 / 5.0</span>
                    </div>
                    <span id="tBadge" class="text-[10px] font-extrabold text-[#005f5a] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
                        Verified Fellow
                    </span>
                </div>

                <div class="min-h-[140px] sm:min-h-[120px] flex items-center">
                    <p id="tQuote" class="text-base sm:text-lg text-slate-800 font-sans leading-[1.65] italic">
                        "The caliber of tutors here is unmatched. Having tutors who actually led campaigns at Meta and Accenture review my offer positioning changed everything. Within 6 weeks of applying their high-ticket packaging principles, I closed two foreign consulting retainers paying in USD."
                    </p>
                </div>

                <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-3.5">
                        <div id="tAvatar" class="w-11 h-11 rounded-full bg-[#005f5a] text-white flex items-center justify-center font-black text-sm shrink-0">
                            OO
                        </div>
                        <div>
                            <h4 id="tName" class="text-sm font-bold text-slate-900">Oluwaseun O.</h4>
                            <p id="tRole" class="text-xs text-slate-500 leading-normal">Brand Strategist &amp; Independent Consultant &bull; Lagos</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 self-end sm:self-auto">
                        <span id="tCounter" class="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                            Review 1 of 100
                        </span>
                        <div class="flex items-center gap-1.5">
                            <button type="button" id="btnPrevT" aria-label="Previous review" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 flex items-center justify-center font-bold text-base transition-all cursor-pointer">
                                ←
                            </button>
                            <button type="button" id="btnNextT" aria-label="Next review" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 flex items-center justify-center font-bold text-base transition-all cursor-pointer">
                                →
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-full bg-slate-100 h-1 rounded-full mt-6 overflow-hidden">
                    <div id="tProgressBar" class="h-full bg-[#005f5a] transition-all duration-100" style="width: 0%"></div>
                </div>
            </div>

            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span class="font-bold text-[#005f5a]">Average 4.9 / 5.0 Rating Across 100 Documented Graduate Reviews</span>
                <span>Reviews rotate automatically every 4 seconds. Tap arrows or hover to pause and read.</span>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div class="max-w-4xl mx-auto px-4">
            <p>&copy; 2026 Newton Academy. All rights reserved.</p>
            <p class="mt-1 text-slate-400">Convened by Newton Academy &bull; Professional Diplomas in Technology, Marketing &amp; Business Systems.</p>
        </div>
    </footer>

    <!-- Form Script, Dynamic Personalizer & 30-Second Evaluation Modal Connector -->
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('name') || localStorage.getItem('newton_name') || '${isPhp ? '<?php echo addslashes($name); ?>' : 'Freedom Obanijesu'}';
        const userEmail = urlParams.get('email') || localStorage.getItem('newton_email') || '${isPhp ? '<?php echo addslashes($email); ?>' : 'freedom@lumenvoxai.com'}';
        const userPhone = urlParams.get('phone') || localStorage.getItem('newton_phone') || '+2348012345678';

        // Personalize Envelope & Story
        const envNameEl = document.getElementById('envelopeRecipientName');
        if (envNameEl) envNameEl.textContent = userName;
        const storyNameEl = document.getElementById('storyRecipientName');
        if (storyNameEl) storyNameEl.textContent = userName;

        window.openScholarshipEnvelope = function() {
            const envCard = document.getElementById('scholarshipEnvelopeCard');
            if (envCard) envCard.classList.add('is-open');
            const target = document.getElementById('officialSalesLetter');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Personalize form fields
        const sNameInput = document.getElementById('sName');
        if (sNameInput) sNameInput.value = userName;
        const sEmailInput = document.getElementById('sEmail');
        if (sEmailInput) sEmailInput.value = userEmail;
        const sPhoneInput = document.getElementById('sPhone');
        if (sPhoneInput) sPhoneInput.value = userPhone;

        // Handle Scholarship Form Submission
        const sForm = document.getElementById('scholarshipForm');
        const sBtn = document.getElementById('scholarshipSubmitBtn');

        if (sForm) {
            sForm.addEventListener('submit', function(e) {
                e.preventDefault();

                if (sBtn) {
                    sBtn.disabled = true;
                    sBtn.textContent = 'Submitting Candidate Dossier...';
                }

                const nameVal = (document.getElementById('sName') ? document.getElementById('sName').value : userName).trim();
                const emailVal = (document.getElementById('sEmail') ? document.getElementById('sEmail').value : userEmail).trim();
                const phoneVal = (document.getElementById('sPhone') ? document.getElementById('sPhone').value : userPhone).trim();
                const selectEl = sForm.querySelector('select[name="programme"]');
                const trackVal = selectEl ? selectEl.value : 'Digital Entrepreneurship + Applied AI';
                const appId = 'NA-SCH-' + Math.floor(1000000 + Math.random() * 9000000);

                try {
                    localStorage.setItem('newton_name', nameVal);
                    localStorage.setItem('newton_email', emailVal);
                    localStorage.setItem('newton_phone', phoneVal);
                    localStorage.setItem('newton_track', trackVal);
                    localStorage.setItem('newton_app_id', appId);
                } catch (err) {}

                // Send background AJAX to server
                try {
                    const formData = new FormData(sForm);
                    formData.append('app_id', appId);
                    fetch('api/scholarship.php', { method: 'POST', body: formData }).catch(function() {});
                } catch (e) {}

                // Prepare checkout URL
                const chkQuery = '?app_id=' + encodeURIComponent(appId) + 
                                 '&name=' + encodeURIComponent(nameVal) + 
                                 '&email=' + encodeURIComponent(emailVal) + 
                                 '&phone=' + encodeURIComponent(phoneVal) + 
                                 '&track=' + encodeURIComponent(trackVal);
                const targetUrl = '${checkoutTarget}' + chkQuery;

                // Launch 30-second evaluation with hurray celebration and 3D door unveiling
                if (typeof window.startScholarshipEvaluation === 'function') {
                    window.startScholarshipEvaluation(nameVal, targetUrl);
                } else {
                    window.location.href = targetUrl;
                }
            });
        }
    </script>
    <script src="assets/js/testimonials.js"></script>
    <script src="assets/js/testimonial-slider.js"></script>
    <script src="assets/js/application-evaluation.js"></script>
    <script src="assets/js/animations.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof initTestimonialSlider === 'function') {
                initTestimonialSlider();
            }
        });
    </script>
</body>
</html>`;
}

// Write scholarship.html & scholarship.php
fs.writeFileSync(path.join(__dirname, '..', 'scholarship.html'), createStandaloneUpsell(false), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'scholarship.php'), createStandaloneUpsell(true), 'utf8');
console.log('Successfully created scholarship.html and scholarship.php');

// Also create aliases special-offer.html and upsell.html
fs.writeFileSync(path.join(__dirname, '..', 'special-offer.html'), createStandaloneUpsell(false), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'special-offer.php'), createStandaloneUpsell(true), 'utf8');
console.log('Successfully created special-offer.html and special-offer.php');


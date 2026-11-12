const fs = require('fs');
const path = require('path');

console.log('--- Generating High-Converting Newton Funnel Pages (with Logo & Vimeo Portrait Videos) ---');

// 7 Verified Vimeo Testimonials
const VIMEO_VIDEOS = [
  {
    id: "1245537104",
    name: "Chukwunonso",
    role: "Verified Fellow",
    duration: "1m 25s",
    hash: "cfef4b1fb4",
    quote: "Practical hands-on tech training experience & cohort mentorship.",
    isEducator: false
  },
  {
    id: "1245537113",
    name: "Clemson",
    role: "Verified Fellow",
    duration: "2m 44s",
    hash: "1e8bb3076b",
    quote: "From zero experience to building live client-ready projects.",
    isEducator: false
  },
  {
    id: "1245537116",
    name: "Emmanuel",
    role: "Verified Fellow",
    duration: "2m 40s",
    hash: "52775ed3e6",
    quote: "Why this curriculum is completely different from traditional school.",
    isEducator: false
  },
  {
    id: "1245537093",
    name: "Fernanda",
    role: "Verified Fellow",
    duration: "2m 06s",
    hash: "fdaaca5d75",
    quote: "The quality of direct mentorship and personal growth gained.",
    isEducator: false
  },
  {
    id: "1245537098",
    name: "Mercy",
    role: "Verified Fellow",
    duration: "1m 40s",
    hash: "845f352b05",
    quote: "Empowered with skills that compete and earn internationally.",
    isEducator: false
  },
  {
    id: "1245537121",
    name: "Teacher Mr. Adedokun",
    role: "DLHS Faculty Educator",
    duration: "4m 38s",
    hash: "8a0c5f7baf",
    quote: "Educator's perspective on student transformation and impact.",
    isEducator: true
  },
  {
    id: "1245537096",
    name: "Paul",
    role: "Verified Fellow",
    duration: "1m 56s",
    hash: "3c42521ef7",
    quote: "Mastering practical applications and real career readiness.",
    isEducator: false
  }
];

function renderVimeoCardsHtml() {
  return VIMEO_VIDEOS.map(v => `
                        <!-- Video: ${v.name} -->
                        <div class="w-[270px] sm:w-auto shrink-0 bg-white border-2 ${v.isEducator ? 'border-amber-400/90' : 'border-slate-200 hover:border-[#005f5a]'} rounded-3xl p-3 sm:p-4 shadow-lg transition-all group flex flex-col justify-between">
                            <div class="flex items-center justify-between px-1.5 pb-2 text-[11px] text-slate-500 border-b border-slate-100 mb-2">
                                <div class="flex items-center gap-1.5 font-bold ${v.isEducator ? 'text-amber-800' : 'text-slate-700'}">
                                    <span class="w-2 h-2 rounded-full ${v.isEducator ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
                                    <span>${v.role}</span>
                                </div>
                                <span class="font-mono text-[10px] ${v.isEducator ? 'bg-amber-50 text-amber-800' : 'bg-slate-100'} px-2 py-0.5 rounded-full">${v.duration}</span>
                            </div>
                            
                            <!-- 9:16 Portrait Phone Video Frame -->
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
                        </div>
  `).join('\n');
}

// ============================================================================
// 1. DEDICATED THANK-YOU PAGE (Conference Pass Confirmation + 15s Urgency Gift)
// ============================================================================
function generateThankYou(isPhp) {
    const scholarshipTarget = isPhp ? 'scholarship.php' : 'scholarship.html';

    const phpHeader = isPhp ? `<?php
require_once __DIR__ . '/config.php';

$name = trim($_GET['name'] ?? 'Conference Delegate');
$email = filter_var(trim($_GET['email'] ?? 'delegate@newton.ng'), FILTER_VALIDATE_EMAIL) ? trim($_GET['email']) : 'delegate@newton.ng';
$phone = trim($_GET['phone'] ?? '+2348000000000');
?>\n` : '';

    return `${phpHeader}<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmed | Virtual Conference Delegate Pass</title>
    <!-- Favicon & Social Meta -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <meta property="og:image" content="assets/favicon.jpg">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800;900&display=swap" rel="stylesheet">
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
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.625;
            background-color: #f8fafc;
        }
        h1, h2, h3, h4, button, .font-heading {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .pass-shadow {
            box-shadow: 0 25px 50px -12px rgba(0, 95, 90, 0.25);
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.4); }
            50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.8); }
        }
        .urgent-glow {
            animation: pulseGlow 2s infinite ease-in-out;
        }
    </style>
</head>
<body class="text-slate-800 antialiased min-h-screen flex flex-col justify-between">

    <!-- Top Security Bar -->
    <div class="bg-gradient-to-r from-[#002f2d] via-[#005f5a] to-[#002f2d] text-white text-xs py-2 px-4 text-center border-b border-amber-400/30">
        <div class="max-w-5xl mx-auto flex items-center justify-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="font-medium">Important: Do not close or refresh this page. Your delegate pass is confirmed below.</span>
        </div>
    </div>

    <!-- Main Navigation / Header (Using Official Logo) -->
    <header class="bg-white border-b border-slate-200 py-3 sm:py-4 px-4 sm:px-6">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
            <a href="${isPhp ? 'index.php' : 'index.html'}" class="flex items-center">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-11 w-auto object-contain">
            </a>
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Virtual Seat Reserved</span>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">

        <!-- Personalized Success Greeting -->
        <div class="text-center space-y-3">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-300">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Seat Confirmed • Registration #2026-CONF</span>
            </div>

            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                Welcome to the Virtual Conference, <span id="delegateNameDisplay" class="text-[#005f5a]">${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Conference Delegate'}</span>!
            </h1>
            <p class="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
                Your delegate profile has been accepted into the <strong>"From Skills to Income" Virtual Conference</strong>. Please review your pass details and complete the 2 required orientation steps below.
            </p>
        </div>

        <!-- Confirmed Delegate VIP Pass Card -->
        <div class="relative bg-gradient-to-br from-[#003e3b] via-[#005f5a] to-[#002f2d] rounded-3xl p-6 sm:p-8 text-white pass-shadow border-2 border-amber-400/60 overflow-hidden">
            <!-- Background Watermark -->
            <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl font-black select-none pointer-events-none font-heading">
                NEWTON
            </div>

            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/20 pb-6 mb-6">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2.5 py-1 rounded bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider">Official Delegate Pass</span>
                        <span class="text-amber-200 text-xs font-mono">#NA-CONF-2026</span>
                    </div>
                    <h3 id="passName" class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                        ${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Conference Delegate'}
                    </h3>
                    <p id="passEmail" class="text-teal-100 text-xs sm:text-sm font-sans mt-0.5">
                        ${isPhp ? '<?php echo htmlspecialchars($email); ?>' : 'delegate@newton.ng'}
                    </p>
                </div>

                <div class="flex flex-col items-center sm:items-end text-center sm:text-right">
                    <span class="text-[11px] uppercase tracking-wider text-teal-200 font-semibold">Admission Tier</span>
                    <span class="text-xl sm:text-2xl font-black text-amber-300 font-heading">VIP Virtual Pass</span>
                    <span class="text-xs text-emerald-300 font-semibold flex items-center gap-1.5 mt-1">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        100% Free Access Granted
                    </span>
                </div>
            </div>

            <div class="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left text-xs">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span class="block text-[10px] text-teal-200 uppercase font-semibold">Event Format</span>
                    <span class="font-bold text-white text-sm">Virtual Live Broadcast</span>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span class="block text-[10px] text-teal-200 uppercase font-semibold">Access Platform</span>
                    <span class="font-bold text-white text-sm">Private Zoom / Web</span>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span class="block text-[10px] text-teal-200 uppercase font-semibold">Convener</span>
                    <span class="font-bold text-white text-sm">Newton Academy</span>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span class="block text-[10px] text-teal-200 uppercase font-semibold">Pass Status</span>
                    <span class="font-bold text-emerald-300 text-sm">ACTIVE & CONFIRMED</span>
                </div>
            </div>
        </div>

        <!-- Primary Action: Join Conference Delegates WhatsApp Room -->
        <div class="bg-white border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-5 brand-shadow">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-1">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
            </div>
            
            <h2 class="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Step 1: Join the Official Delegates WhatsApp Room
            </h2>
            <p class="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
                All live broadcast links, speaker slide decks, fast-action bonus materials (₦390,000 value), and session reminders are posted directly inside this private WhatsApp room.
            </p>

            <div class="pt-2">
                <a href="https://chat.whatsapp.com/GzF68x50l6Z7a3gq2o2FqX" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 font-heading">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Enter Conference Delegates WhatsApp Room</span>
                </a>
            </div>

            <p class="text-xs text-slate-500">
                Encrypted &bull; Strictly for verified delegates &bull; Zero spam tolerated
            </p>
        </div>

        <!-- ========================================================== -->
        <!-- URGENT SPECIAL ENDOWMENT GIFT BANNER (15-SECOND AUTO BRIDGE) -->
        <!-- ========================================================== -->
        <div id="urgentGiftBox" class="relative bg-gradient-to-r from-amber-950 via-slate-900 to-[#002f2d] border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-white text-center space-y-5 urgent-glow">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>Confidential Academic Gift &bull; Only Available Now</span>
            </div>

            <div class="space-y-2 max-w-2xl mx-auto">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-300 font-heading leading-tight">
                    We Have A ₦200,000 Scholarship Endowment Gift For You!
                </h2>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                    The Academic Admissions Council has pre-qualified your registration for a <strong class="text-white">100% Full Tuition Endowment Grant</strong>. This exclusive opportunity disappears when the timer reaches zero:
                </p>
            </div>

            <!-- Animated 15-Second Progress Countdown -->
            <div class="max-w-md mx-auto space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-amber-200">
                    <span>Private Reservation Active</span>
                    <span>Disappearing in <span id="countdownTimer" class="text-amber-400 font-mono text-lg font-black">15</span>s</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden border border-amber-400/40">
                    <div id="timerProgressBar" class="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000 w-full"></div>
                </div>
            </div>

            <!-- Claim Button -->
            <div class="pt-2">
                <a id="claimGiftBtn" href="${scholarshipTarget}" class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/30 transition-all transform hover:scale-105 font-heading">
                    <span>Claim Your ₦200,000 Scholarship Endowment Gift Now</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </a>
            </div>

            <p class="text-xs text-amber-200/70 font-mono">
                Auto-redirecting you to your scholarship briefing in <span id="timerSmall">15</span> seconds...
            </p>
        </div>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <p>&copy; 2026 Newton Academy. All rights reserved. Convened strictly by Newton Academy.</p>
        <p class="text-[10px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This site is not affiliated with or endorsed by Meta Platforms, Inc. or Google LLC; Newton Academy provides professional educational training only, and all individual results depend completely on your personal dedication, skill mastery, and commercial execution.
        </p>
        <p class="mt-1">Dr. Ade Braimoh is an Advisory Trustee & Keynote Speaker.</p>
    </footer>

    <!-- Client-Side Script: Preserves query parameters and runs 15s auto-redirect -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const params = new URLSearchParams(window.location.search);
            const name = params.get('name') || '${isPhp ? '<?php echo addslashes($name); ?>' : 'Conference Delegate'}';
            const email = params.get('email') || '${isPhp ? '<?php echo addslashes($email); ?>' : 'delegate@newton.ng'}';
            const phone = params.get('phone') || '${isPhp ? '<?php echo addslashes($phone); ?>' : '+2348000000000'}';

            const nameEl = document.getElementById('delegateNameDisplay');
            const passNameEl = document.getElementById('passName');
            const passEmailEl = document.getElementById('passEmail');

            if (nameEl && name) nameEl.textContent = name;
            if (passNameEl && name) passNameEl.textContent = name;
            if (passEmailEl && email) passEmailEl.textContent = email;

            // Target URL for upsell page with preserved query parameters
            const targetUrl = '${scholarshipTarget}?' + params.toString();
            const claimBtn = document.getElementById('claimGiftBtn');
            if (claimBtn) {
                claimBtn.href = targetUrl;
            }

            // 15-Second Urgent Countdown & Auto-Redirect
            let secondsRemaining = 15;
            const timerEl = document.getElementById('countdownTimer');
            const timerSmall = document.getElementById('timerSmall');
            const barEl = document.getElementById('timerProgressBar');

            const countdownInterval = setInterval(function() {
                secondsRemaining--;
                if (timerEl) timerEl.textContent = secondsRemaining;
                if (timerSmall) timerSmall.textContent = secondsRemaining;
                if (barEl) {
                    const pct = Math.max(0, (secondsRemaining / 15) * 100);
                    barEl.style.width = pct + '%';
                }

                if (secondsRemaining <= 0) {
                    clearInterval(countdownInterval);
                    window.location.href = targetUrl;
                }
            }, 1000);
        });
    </script>
</body>
</html>`;
}

// ============================================================================
// 2. STANDALONE UPSELL & SCHOLARSHIP APPLICATION PAGE
// ============================================================================
function generateScholarship(isPhp) {
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
    <title>100% Full Tuition Scholarship Briefing | Newton Academy</title>
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
            box-shadow: 0 0 35px rgba(229, 169, 60, 0.35);
        }
        @keyframes arrowBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
        }
        .animate-arrow-bounce {
            animation: arrowBounce 1.5s infinite ease-in-out;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f1f5f9] text-slate-800 antialiased selection:bg-[#005f5a] selection:text-white">

    <!-- Top Confidential Banner -->
    <div class="bg-gradient-to-r from-[#002f2d] via-[#005f5a] to-[#002f2d] text-white text-xs py-2.5 px-4 text-center border-b border-amber-400/40">
        <div class="max-w-5xl mx-auto flex items-center justify-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span class="font-medium tracking-wide">Official 100% Full Tuition Scholarship Endowment Briefing &bull; Academic Year 2026/2027</span>
        </div>
    </div>

    <!-- Navigation Header (Using Official Logo) -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
            <a href="${indexTarget}" class="flex items-center">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-11 w-auto object-contain">
            </a>
            <div class="flex items-center gap-2">
                <span class="hidden md:inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    Council Quota: 50 Award Seats
                </span>
                <a href="#scholarshipForm" class="px-4 py-2 rounded-xl bg-[#005f5a] hover:bg-[#004d49] text-white text-xs sm:text-sm font-bold shadow-md transition-all">
                    Apply Now &darr;
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">

        <!-- ========================================================== -->
        <!-- 3D INTERACTIVE CONFIDENTIAL WAX-SEAL ENVELOPE              -->
        <!-- ========================================================== -->
        <div id="confidentialEnvelope" class="relative max-w-3xl mx-auto bg-gradient-to-br from-[#003e3b] via-[#005f5a] to-[#002f2d] border-2 border-amber-400/70 rounded-3xl p-6 sm:p-10 text-white text-center brand-shadow overflow-hidden cursor-pointer group transition-all duration-300 hover:border-amber-400">
            
            <div class="flex items-center justify-center gap-6 mb-4">
                <!-- Real Downward Arrow 1 -->
                <svg class="w-6 h-6 text-amber-400 animate-arrow-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <!-- Real Downward Arrow 2 -->
                <svg class="w-7 h-7 text-amber-300 animate-arrow-bounce delay-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <!-- Real Downward Arrow 3 -->
                <svg class="w-6 h-6 text-amber-400 animate-arrow-bounce delay-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>

            <!-- Official Seal & Title (Using Official Brand Logo Inside Badge) -->
            <div class="space-y-3">
                <div class="inline-flex items-center justify-center w-36 h-16 sm:w-44 sm:h-20 rounded-2xl bg-white p-2.5 shadow-2xl border-2 border-amber-400 transform group-hover:scale-105 transition-transform">
                    <img src="assets/logo.png" alt="Newton Academy Official Crest" class="w-full h-full object-contain">
                </div>
                <h3 class="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
                    CONFIDENTIAL ADMISSIONS DISPATCH &bull; ACADEMIC COUNCIL
                </h3>
                <p class="text-xs sm:text-sm text-teal-100 max-w-lg mx-auto font-sans leading-relaxed">
                    Strictly for pre-screened delegates. Click the official dispatch seal to break the tamper-proof ribbon and unroll the full direct-response scholarship briefing.
                </p>
                <div class="pt-2">
                    <button type="button" class="px-6 py-2.5 rounded-full bg-amber-400 group-hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all">
                        Click Here To Open Dispatch &darr;
                    </button>
                </div>
            </div>
        </div>

        <!-- ========================================================== -->
        <!-- DIRECT-RESPONSE HEADLINE & SALES LETTER                   -->
        <!-- ========================================================== -->
        <article id="officialSalesLetter" style="opacity: 1 !important; visibility: visible !important;" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 brand-shadow space-y-10">
            
            <!-- Headline: No preheadings, pure high-converting copy -->
            <div class="text-center max-w-3xl mx-auto space-y-4">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.3] font-heading">
                    Discover How You Can Start Making Up To <span class="text-[#005f5a] underline decoration-[#e5a93c] underline-offset-8 font-black">$1,000 Monthly</span> As A Young Graduate, Stay-At-Home Mom, Or Underpaid Professional In Nigeria...
                </h1>

                <p class="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
                    ...Without relocating abroad, hawking cheap physical products on WhatsApp, or waiting endlessly for government jobs that pay less than monthly inflation.
                </p>
            </div>

            <!-- Direct Personal Salutation -->
            <div class="border-t border-slate-200 pt-8 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p class="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    Dear <span id="storyRecipientName" class="text-[#005f5a] underline decoration-amber-400">${isPhp ? '<?php echo htmlspecialchars($name); ?>' : 'Candidate'}</span>,
                </p>

                <p>
                    Let me share with you a quick, true story of what is actually possible when you stop trading sweat for peanuts and start trading high-income digital and AI skills...
                </p>

                <!-- ================================================== -->
                <!-- STORY 1: THE CAMPUS CORN HAWKER TO $1,200/MO REMOTE -->
                <!-- ================================================== -->
                <div class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
                    <div class="flex items-center gap-2">
                        <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">True Case Study 01</span>
                        <span class="text-slate-500 text-xs">&bull; Verified Student Journey</span>
                    </div>

                    <h2 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                        From Hawking Boiled Corn On Campus To Earning $1,200/Month From Her Living Room
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                        <div class="space-y-1.5 text-center">
                            <div class="h-56 rounded-xl overflow-hidden shadow-md border border-slate-200">
                                <img src="assets/images/young_lady_hawking_corn.jpg" alt="Aminat hawking corn on campus to pay tuition" class="w-full h-full object-cover">
                            </div>
                            <span class="block text-[11px] text-slate-500 font-medium italic">Hawking corn on campus to survive university</span>
                        </div>
                        <div class="space-y-1.5 text-center">
                            <div class="h-56 rounded-xl overflow-hidden shadow-md border border-slate-200">
                                <img src="assets/images/young_lady_graduate_nysc.jpg" alt="Graduated First Class and NYSC but jobless" class="w-full h-full object-cover">
                            </div>
                            <span class="block text-[11px] text-slate-500 font-medium italic">First-Class & NYSC complete &mdash; but stranded</span>
                        </div>
                        <div class="space-y-1.5 text-center">
                            <div class="h-56 rounded-xl overflow-hidden shadow-md border border-slate-200">
                                <img src="assets/images/young_lady_remote_office.jpg" alt="Now working remotely for US organization" class="w-full h-full object-cover">
                            </div>
                            <span class="block text-[11px] text-slate-500 font-medium italic">Now working remotely in USD for a US firm</span>
                        </div>
                    </div>

                    <div class="space-y-3 text-slate-700">
                        <p>
                            Meet Aminat. In her university days, she had zero wealthy uncles or political godfathers. To buy semester handouts, photocopies, and feed herself, she stood by the campus main gate every evening hawking boiled and roasted corn with a heavy tray balanced on her head.
                        </p>
                        <p>
                            Despite bone-crushing fatigue, she gave her studies everything she had &mdash; graduating with a coveted <strong>First-Class Honours degree in Economics</strong>. She finished NYSC full of hope, believing the corporate world would celebrate her brilliance.
                        </p>
                        <p>
                            Instead, after submitting over 80 CVs across Lagos and Abuja, the only job offer she received was an ₦85,000/month administrative assistant role &mdash; where third-party bus fares alone would gobble up ₦50,000 every 30 days!
                        </p>
                        <p class="font-medium text-slate-900 bg-white p-4 rounded-xl border border-slate-200">
                            Everything changed when Aminat secured a Newton Academy scholarship seat. Within 90 days of mastering high-converting Digital Marketing and Generative AI workflows, she landed her first international contract. Today, she works as a remote Digital Growth Specialist for a US-based health-tech company, earning over <strong>$1,200 monthly</strong> from the comfort of her bedroom in Nigeria!
                        </p>
                    </div>
                </div>

                <!-- ================================================== -->
                <!-- STORY 2: FREEDOM OBANIJESU - FROM POP TO UK AI FIRM -->
                <!-- ================================================== -->
                <div class="bg-teal-50/50 border-2 border-[#005f5a]/30 rounded-2xl p-6 sm:p-8 space-y-5">
                    <div class="flex items-center gap-2">
                        <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">True Case Study 02</span>
                        <span class="text-slate-500 text-xs">&bull; Faculty Co-Director & Convener</span>
                    </div>

                    <h2 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                        From Manual POP Ceiling Laborer Inhaling Dust To Working With An AI Firm In The UK
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                        <div class="space-y-1.5 text-center">
                            <div class="h-56 rounded-xl overflow-hidden shadow-md border border-slate-200">
                                <img src="assets/images/freedom_speaking.jpg" alt="Freedom Obanijesu keynote speaking" class="w-full h-full object-cover">
                            </div>
                            <span class="block text-[11px] text-slate-500 font-medium italic">Keynote speaking on digital wealth creation</span>
                        </div>
                        <div class="space-y-1.5 text-center">
                            <div class="h-56 rounded-xl overflow-hidden shadow-md border border-slate-200">
                                <img src="assets/images/freedom_profile.jpg" alt="Freedom Obanijesu professional profile" class="w-full h-full object-cover">
                            </div>
                            <span class="block text-[11px] text-slate-500 font-medium italic">From construction sites to international strategist</span>
                        </div>
                        <div class="space-y-1.5 text-center">
                            <div class="h-56 rounded-xl overflow-hidden shadow-md border border-slate-200">
                                <img src="assets/images/foreign_earnings_dashboard.jpg" alt="Foreign currency earnings dashboard proof" class="w-full h-full object-cover">
                            </div>
                            <span class="block text-[11px] text-slate-500 font-medium italic">Proof: Consistent USD client payouts deposited</span>
                        </div>
                    </div>

                    <div class="space-y-3 text-slate-700">
                        <p>
                            This is not theory. Freedom Obanijesu spent years mixing plaster of Paris under scorching heat on dusty Nigerian construction sites, inhaling toxic gypsum powder, and installing POP ceilings just to put food on the table.
                        </p>
                        <p>
                            He knew that physical sweat without leverage leads to poverty. He spent late nights in cybercafes studying direct-response copywriting, digital acquisition architecture, and applied AI automation.
                        </p>
                        <p class="font-medium text-slate-900 bg-white p-4 rounded-xl border border-slate-200">
                            Today, Freedom consults for an advanced artificial intelligence technology firm in the <strong>United Kingdom</strong>, leads campaigns generating tens of millions in revenue, and has architected the exact practical blueprints taught inside Newton Academy.
                        </p>
                    </div>
                </div>

            </div>

            <!-- ========================================================== -->
            <!-- 2 FLAGSHIP DIPLOMA TRACKS WITH 3D MULTI-DEVICE MOCKUPS      -->
            <!-- ========================================================== -->
            <div class="border-t border-slate-200 pt-10 space-y-8">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        Two Industry-Accredited 3-Month Diploma Programs
                    </h2>
                    <p class="text-slate-600 text-sm sm:text-base">
                        Select the track that matches your professional career goals and earning aspirations:
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <!-- Track 1: Digital Marketing + Applied AI -->
                    <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all brand-shadow">
                        <div class="space-y-4">
                            <!-- Clean Mockup Presentation: Never covers design on mobile -->
                            <div class="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md">
                                <img src="assets/images/mockup_digital_marketing.jpg" alt="3D Multi-Device Digital Marketing Mockup" class="w-full h-auto object-cover">
                                <div class="bg-slate-900/90 text-white px-3 py-1.5 text-xs flex items-center justify-between border-t border-slate-800">
                                    <span class="flex items-center gap-1.5 text-emerald-400 font-medium">
                                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        LMS Portal + Lumenvox AI Suite Included
                                    </span>
                                    <span class="text-amber-400 font-bold">15 Modules</span>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#005f5a] border border-[#005f5a]/30">
                                    Flagship Diploma Track 01
                                </span>
                                <h3 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                                    Digital Marketing + Applied AI
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600">
                                    Master multi-platform paid ads (Meta, Google, TikTok), high-converting direct-response copywriting, and international client acquisition paying in USD.
                                </p>
                            </div>

                            <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>High-ROAS Meta, Google & TikTok Ad Campaign Systems</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Direct-Response Copywriting & High-Converting Funnels</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>US/UK Foreign Client Acquisition & Monthly Retainers</span>
                                </li>
                            </ul>
                        </div>

                        <div class="pt-6 space-y-3">
                            <a href="curriculum-dm.html" target="_blank" class="block text-center text-xs font-bold text-[#005f5a] hover:underline">
                                Read Full 15-Module Syllabus & Benefits &rarr;
                            </a>
                            <a href="#scholarshipForm" onclick="selectTrack('Digital Marketing + Applied AI')" class="block w-full py-3.5 rounded-xl bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-center text-sm shadow-md transition-all font-heading">
                                Apply For Digital Marketing Track
                            </a>
                        </div>
                    </div>

                    <!-- Track 2: Digital Entrepreneurship + Applied AI -->
                    <div class="bg-white border-2 border-slate-200 hover:border-[#005f5a] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all brand-shadow">
                        <div class="space-y-4">
                            <div class="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md">
                                <img src="assets/images/mockup_digital_entrepreneurship.jpg" alt="3D Multi-Device Digital Entrepreneurship Mockup" class="w-full h-auto object-cover">
                                <div class="bg-slate-900/90 text-white px-3 py-1.5 text-xs flex items-center justify-between border-t border-slate-800">
                                    <span class="flex items-center gap-1.5 text-emerald-400 font-medium">
                                        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        LMS Portal + Lumenvox AI Suite Included
                                    </span>
                                    <span class="text-amber-400 font-bold">15 Modules</span>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300">
                                    Flagship Diploma Track 02
                                </span>
                                <h3 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                                    Digital Entrepreneurship & Business Innovation
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600">
                                    Build scalable automated internet businesses: create high-margin digital products, deploy automated sales engines, and use AI to replace expensive staff.
                                </p>
                            </div>

                            <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>High-Ticket Digital Products & Knowledge Monetization</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Automated Sales Funnel Infrastructure & Upsells</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    <span>Autonomous AI Agent Business Operations</span>
                                </li>
                            </ul>
                        </div>

                        <div class="pt-6 space-y-3">
                            <a href="curriculum-de.html" target="_blank" class="block text-center text-xs font-bold text-[#005f5a] hover:underline">
                                Read Full 15-Module Syllabus & Benefits &rarr;
                            </a>
                            <a href="#scholarshipForm" onclick="selectTrack('Digital Entrepreneurship & Business Innovation + Applied AI')" class="block w-full py-3.5 rounded-xl bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-center text-sm shadow-md transition-all font-heading">
                                Apply For Entrepreneurship Track
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ========================================================== -->
            <!-- INTEGRATED LUMENVOX AI CREATOR SUITE (5 MODULES)           -->
            <!-- ========================================================== -->
            <div class="bg-gradient-to-br from-[#002f2d] via-[#005f5a] to-[#003e3b] rounded-3xl p-6 sm:p-10 text-white space-y-6">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                        Integrated Value &bull; Worth ₦250,000 Included Free
                    </span>
                    <h2 class="text-2xl sm:text-3xl font-bold font-heading text-white">
                        Integrated Lumenvox AI Creator Suite (5 Modules)
                    </h2>
                    <p class="text-xs sm:text-sm text-teal-100 font-sans">
                        Never buy a separate prompt engineering or video editing course. The complete Lumenvox AI Suite is integrated directly into your diploma.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 space-y-2">
                        <div class="flex items-center justify-between text-xs font-bold text-amber-300">
                            <span>AI-01</span>
                            <span>Prompt Architecture</span>
                        </div>
                        <h4 class="text-sm font-bold text-white font-heading">Generative AI Prompt Systems</h4>
                        <p class="text-xs text-teal-100 leading-relaxed">
                            Master structured prompting with GPT-4o, Claude 3.5 Sonnet, and autonomous research agents for instant commercial campaigns.
                        </p>
                    </div>

                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 space-y-2">
                        <div class="flex items-center justify-between text-xs font-bold text-amber-300">
                            <span>AI-02</span>
                            <span>Video Generation</span>
                        </div>
                        <h4 class="text-sm font-bold text-white font-heading">Cinematic AI Video Creation</h4>
                        <p class="text-xs text-teal-100 leading-relaxed">
                            Generate broadcast-quality video ads using Runway Gen-3 and Kling AI without cameras, studio sets, or actors.
                        </p>
                    </div>

                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 space-y-2">
                        <div class="flex items-center justify-between text-xs font-bold text-amber-300">
                            <span>AI-03</span>
                            <span>Voice & Audio</span>
                        </div>
                        <h4 class="text-sm font-bold text-white font-heading">Synthetic Voice Cloning</h4>
                        <p class="text-xs text-teal-100 leading-relaxed">
                            Synthesize flawless human narrations in British, American, and native African accents with ElevenLabs audio engines.
                        </p>
                    </div>

                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 space-y-2">
                        <div class="flex items-center justify-between text-xs font-bold text-amber-300">
                            <span>AI-04</span>
                            <span>Faceless Channels</span>
                        </div>
                        <h4 class="text-sm font-bold text-white font-heading">Kinetic VSL & Faceless Videos</h4>
                        <p class="text-xs text-teal-100 leading-relaxed">
                            Automate viral short-form video creation, auto-captions in CapCut, and produce 30 commercial video ads weekly in under 3 hours.
                        </p>
                    </div>

                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 space-y-2 sm:col-span-2 lg:col-span-2">
                        <div class="flex items-center justify-between text-xs font-bold text-amber-300">
                            <span>AI-05</span>
                            <span>USD Monetization</span>
                        </div>
                        <h4 class="text-sm font-bold text-white font-heading">AI Service Packaging & Foreign Monetization</h4>
                        <p class="text-xs text-teal-100 leading-relaxed">
                            Package your AI creation skills into high-ticket foreign retainers. Deliver commercial video ads to international agencies in the US and UK who gladly pay $500 to $1,500 per deliverable.
                        </p>
                    </div>
                </div>
            </div>

            <!-- ========================================================== -->
            <!-- NEW HIGH-CONVERTING ENDOWMENT VOUCHER CONCEPT               -->
            <!-- ========================================================== -->
            <div class="border-t border-slate-200 pt-10 space-y-6">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        Newton Academy Foundation Endowment Breakdown
                    </h2>
                    <p class="text-slate-600 text-xs sm:text-sm">
                        Official Academic Council financial allocation certificate for 2026/2027 fellows:
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    
                    <!-- Voucher Card 1: 100% Tuition Endowment Grant -->
                    <div class="relative bg-gradient-to-br from-[#003e3b] to-[#002f2d] border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl overflow-hidden">
                        <div class="flex items-center justify-between">
                            <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-400 text-slate-950">
                                Endowment Applied
                            </span>
                            <span class="text-xs text-emerald-300 font-mono">100% COVERED</span>
                        </div>
                        
                        <div class="space-y-1">
                            <span class="block text-xs text-teal-200 uppercase font-semibold">Standard Tuition Fee</span>
                            <span class="text-xl sm:text-2xl font-bold text-slate-400 line-through">₦200,000</span>
                        </div>

                        <div class="space-y-1 pt-2 border-t border-white/10">
                            <span class="block text-xs text-emerald-300 uppercase font-semibold">Foundation Grant Coverage</span>
                            <span class="text-xl sm:text-2xl font-bold text-emerald-400">-₦200,000</span>
                        </div>

                        <div class="pt-3 border-t border-white/20 flex items-center justify-between">
                            <span class="text-xs text-white uppercase font-bold">Remaining Tuition:</span>
                            <span class="text-2xl sm:text-3xl font-black text-amber-300 font-mono">₦0.00 (FREE)</span>
                        </div>

                        <div class="p-3 bg-white/10 rounded-xl text-[11px] text-teal-100">
                            ✓ Full 3-Month Faculty Instruction Waived &bull; Certificate Included
                        </div>
                    </div>

                    <!-- Voucher Card 2: One-Time Application & Seat Reservation Fee -->
                    <div class="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950">
                                    Seat Allocation Filter
                                </span>
                                <span class="text-xs text-amber-600 font-bold">SAVES YOU ₦200,000</span>
                            </div>

                            <div class="space-y-1">
                                <span class="block text-xs text-slate-500 uppercase font-semibold">One-Time Non-Refundable Fee</span>
                                <span class="text-3xl sm:text-4xl font-black text-[#005f5a] font-mono">₦20,000</span>
                            </div>

                            <p class="text-xs text-slate-600 leading-relaxed">
                                Due to extreme applicant volume, this single commitment fee filters for serious candidates and activates your LMS dashboard, mentor access, and course materials.
                            </p>
                        </div>

                        <div class="pt-4 border-t border-slate-100 space-y-2">
                            <div class="flex items-center gap-2 text-xs text-slate-700">
                                <span class="text-emerald-600 font-bold">✓</span>
                                <span>Zero extra tuition or hidden fees during the 3 months</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs text-slate-700">
                                <span class="text-emerald-600 font-bold">✓</span>
                                <span>Direct Nigerian Bank Transfer & Card Checkout Available</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ========================================================== -->
            <!-- REAL STUDENT & FACULTY VIDEO INTERVIEWS (PORTRAIT FRAMES)   -->
            <!-- ========================================================== -->
            <div class="border-t border-slate-200 pt-10 space-y-6">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        Watch Real Students & Educators Speak
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-600">
                        Direct video feedback from verified fellows and educators who experienced Newton Academy:
                    </p>
                </div>

                <!-- Horizontal scroll on mobile, responsive grid on tablet/desktop -->
                <div class="overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
                    <div class="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-w-[280px]">
${renderVimeoCardsHtml()}
                    </div>
                </div>

                <div class="text-center">
                    <p class="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Click any video above to play directly inside the frame &bull; 100% Unedited Authentic Feedback</span>
                    </p>
                </div>
            </div>

            <!-- ========================================================== -->
            <!-- 100 VERIFIED AFRICAN GRADUATE TESTIMONIALS SLIDER          -->
            <!-- ========================================================== -->
            <div class="border-t border-slate-200 pt-10 space-y-6">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        100 Verified African Graduate Reviews
                    </span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        Real Graduates. Real Incomes. Real Transformations.
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-600">
                        Read verified reviews from graduates across Nigeria, Ghana, Kenya, and remote workers:
                    </p>
                </div>

                <!-- Testimonial Slider Card Container -->
                <div id="testimonialSliderCard" class="relative bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto brand-shadow">
                    
                    <div class="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                        <div class="flex items-center gap-1 text-amber-400">
                            ★★★★★
                        </div>
                        <span id="reviewCounter" class="text-xs font-mono font-bold text-slate-500">
                            Review <span id="currentReviewIdx">1</span> of 100
                        </span>
                    </div>

                    <div id="testimonialContentArea" class="min-h-[140px] flex flex-col justify-between space-y-4">
                        <p id="reviewQuote" class="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                            "Before Newton Academy, I was making ₦70,000 monthly as an administrative clerk in Lagos. Within 60 days of mastering digital advertising and AI copywriting, I closed my first UK client on a $700 monthly retainer. This scholarship literally changed my entire family's financial story."
                        </p>
                        
                        <div class="flex items-center justify-between pt-2">
                            <div>
                                <h4 id="reviewAuthor" class="text-sm font-bold text-slate-900 font-heading">Chidinma Okeke</h4>
                                <p id="reviewRole" class="text-xs text-slate-500">Remote Growth Specialist &bull; Lagos, Nigeria</p>
                            </div>
                            <span class="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                                Verified Fellow
                            </span>
                        </div>
                    </div>

                    <!-- Slider Controls -->
                    <div class="flex items-center justify-between pt-6 border-t border-slate-200 mt-4">
                        <button type="button" id="prevReviewBtn" class="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all">
                            &larr; Previous Review
                        </button>
                        <button type="button" id="nextReviewBtn" class="px-4 py-2 rounded-xl bg-[#005f5a] text-white text-xs font-bold hover:bg-[#004d49] transition-all">
                            Next Review &rarr;
                        </button>
                    </div>
                </div>
            </div>

            <!-- ========================================================== -->
            <!-- THE NEW OFFICIAL SCHOLARSHIP APPLICATION FORM              -->
            <!-- ========================================================== -->
            <div id="scholarshipForm" class="border-t border-slate-200 pt-10 space-y-8">
                
                <div class="text-center max-w-2xl mx-auto space-y-3">
                    <span class="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                        Academic Admissions Council &bull; Official Form
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                        Candidate Scholarship Application Form
                    </h2>
                    <p class="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
                        Please provide accurate information. Submissions are screened in real time by the Admissions Council for full-tuition endowment approval.
                    </p>
                </div>

                <form id="officialScholarshipForm" class="max-w-3xl mx-auto bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 brand-shadow">
                    
                    <!-- 1. Select Scholarship Scheme -->
                    <div class="space-y-2">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            Select Scholarship Scheme <span class="text-red-500">*</span>
                        </label>
                        <select name="scholarship_scheme" id="scholarship_scheme" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm font-medium">
                            <option value="Ade Braimoh Scholarship Scheme (up to 100%)">Ade Braimoh Scholarship Scheme (up to 100% Tuition Covered)</option>
                            <option value="Newton Core Scholarship Scheme (up to 100%)" selected>Newton Core Scholarship Scheme (up to 100% Tuition Covered)</option>
                            <option value="Newton Academy Scholarship Scheme (up to 100%)">Newton Academy Scholarship Scheme (up to 100% Tuition Covered)</option>
                            <option value="I don't want a scholarship">I don't want a scholarship (Self-Funded)</option>
                        </select>
                    </div>

                    <!-- 2. First & Last Name -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                First Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="first_name" id="first_name" required placeholder="e.g. Aminat" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Last Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="last_name" id="last_name" required placeholder="e.g. Adeleke" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                        </div>
                    </div>

                    <!-- 3. Email & Phone -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Email Address <span class="text-red-500">*</span>
                            </label>
                            <input type="email" name="email" id="email" required placeholder="e.g. candidate@gmail.com" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Phone Number (WhatsApp preferred) <span class="text-red-500">*</span>
                            </label>
                            <input type="tel" name="phone" id="phone" required placeholder="e.g. +234 801 234 5678" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                        </div>
                    </div>

                    <!-- 4. Gender & Country -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Gender <span class="text-red-500">*</span>
                            </label>
                            <select name="gender" id="gender" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                                <option value="">- Select Gender -</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Country <span class="text-red-500">*</span>
                            </label>
                            <select name="country" id="country" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                                <option value="Nigeria" selected>Nigeria</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Canada">Canada</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <!-- 5. State / City -->
                    <div class="space-y-1.5">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            State / City (Choose "Other" if you are based outside Nigeria) <span class="text-red-500">*</span>
                        </label>
                        <select name="state_city" id="state_city" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                            <option value="">- Select State / City -</option>
                            <option value="Lagos" selected>Lagos</option>
                            <option value="FCT (Abuja)">FCT (Abuja)</option>
                            <option value="Abia">Abia</option>
                            <option value="Adamawa">Adamawa</option>
                            <option value="Akwa Ibom">Akwa Ibom</option>
                            <option value="Anambra">Anambra</option>
                            <option value="Bauchi">Bauchi</option>
                            <option value="Bayelsa">Bayelsa</option>
                            <option value="Benue">Benue</option>
                            <option value="Borno">Borno</option>
                            <option value="Cross River">Cross River</option>
                            <option value="Delta">Delta</option>
                            <option value="Ebonyi">Ebonyi</option>
                            <option value="Edo">Edo</option>
                            <option value="Ekiti">Ekiti</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Gombe">Gombe</option>
                            <option value="Imo">Imo</option>
                            <option value="Jigawa">Jigawa</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Kano">Kano</option>
                            <option value="Katsina">Katsina</option>
                            <option value="Kebbi">Kebbi</option>
                            <option value="Kogi">Kogi</option>
                            <option value="Kwara">Kwara</option>
                            <option value="Nassarawa">Nassarawa</option>
                            <option value="Niger">Niger</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Ondo">Ondo</option>
                            <option value="Osun">Osun</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Plateau">Plateau</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Sokoto">Sokoto</option>
                            <option value="Taraba">Taraba</option>
                            <option value="Yobe">Yobe</option>
                            <option value="Zamfara">Zamfara</option>
                            <option value="Others">Others (Outside Nigeria)</option>
                        </select>
                    </div>

                    <!-- 6. Employment Status & Educational Level -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Current Employment / Study Status <span class="text-red-500">*</span>
                            </label>
                            <select name="employment_status" id="employment_status" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                                <option value="">- Select Status -</option>
                                <option value="Student">Student</option>
                                <option value="Graduate" selected>Graduate</option>
                                <option value="NYSC Corper">NYSC Corper</option>
                                <option value="Working Professional (Employed)">Working Professional (Employed)</option>
                                <option value="Self Employed">Self Employed</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-xs sm:text-sm font-bold text-slate-900">
                                Educational Level <span class="text-red-500">*</span>
                            </label>
                            <select name="educational_level" id="educational_level" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                                <option value="">- Select Level -</option>
                                <option value="Degree" selected>Degree (B.Sc / B.A / B.Tech)</option>
                                <option value="HND">HND</option>
                                <option value="Masters">Masters</option>
                                <option value="OND">OND</option>
                                <option value="Diploma">Diploma</option>
                                <option value="High School">High School</option>
                                <option value="Mphil / PhD">Mphil / PhD</option>
                                <option value="NCE">NCE</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <!-- 7. Which course would you like to apply for? -->
                    <div class="space-y-1.5">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            Which course would you like to apply for? <span class="text-red-500">*</span>
                        </label>
                        <select name="course" id="course_select" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm font-medium">
                            <option value="">- Select Course -</option>
                            <option value="Digital Marketing + Applied AI" selected>Digital Marketing + Applied AI (Flagship Diploma)</option>
                            <option value="Digital Entrepreneurship & Business Innovation + Applied AI">Digital Entrepreneurship & Business Innovation + Applied AI (Flagship Diploma)</option>
                            <option value="AI & Automation">AI & Automation</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Product Design (UI & UX)">Product Design (UI & UX)</option>
                            <option value="Product Management">Product Management</option>
                            <option value="Becoming an Influencer (Content Creation)">Becoming an Influencer (Content Creation & Video AI)</option>
                            <option value="Graphics Design">Graphics Design & Brand Identity</option>
                            <option value="Software Development">Software Development (Frontend / Fullstack)</option>
                            <option value="Virtual Assistant">Virtual Assistant & Executive Support</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="DevOps Engineering">DevOps Engineering</option>
                            <option value="Social Media Marketing">Social Media Marketing</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Product Marketing">Product Marketing</option>
                        </select>
                    </div>

                    <!-- 8. Preferred Mode of Learning -->
                    <div class="space-y-1.5">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            Preferred Mode of Learning (Select the option that best fits your schedule) <span class="text-red-500">*</span>
                        </label>
                        <select name="learning_mode" id="learning_mode" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#005f5a] focus:ring-2 focus:ring-[#005f5a]/20 bg-white text-slate-900 text-sm">
                            <option value="Online" selected>Online (Self-Paced Portal + Live Weekly Coaching)</option>
                            <option value="Physical (In-person)">Physical (In-person Hub Session)</option>
                            <option value="Hybrid (Mix of online & physical)">Hybrid (Mix of online & physical)</option>
                        </select>
                    </div>

                    <!-- 9. Would you like to apply for a scholarship? -->
                    <div class="space-y-1.5">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            Would you like to apply for a scholarship? <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-2 pt-1 text-sm text-slate-800">
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="apply_scholarship" value="Yes, I’d like to apply for a scholarship" checked class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>Yes, I’d like to apply for a scholarship (up to 100% tuition grant)</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="apply_scholarship" value="No, I’ll self-fund my tuition" class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>No, I’ll self-fund my tuition</span>
                            </label>
                        </div>
                    </div>

                    <!-- 10. Prior Tech Experience -->
                    <div class="space-y-1.5">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            Do you have any prior tech experience? <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-2 pt-1 text-sm text-slate-800">
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="prior_experience" value="No, I’m completely new to tech" checked class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>No, I’m completely new to tech (Beginner friendly)</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="prior_experience" value="A little, but I want to deepen my knowledge" class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>A little, but I want to deepen my knowledge</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="prior_experience" value="Yes, I already have some experience" class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>Yes, I already have some experience</span>
                            </label>
                        </div>
                    </div>

                    <!-- 11. Support with job placement -->
                    <div class="space-y-1.5">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            Would you like Newton Academy to support you with job placement after completing your course? <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-2 pt-1 text-sm text-slate-800">
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="job_placement" value="Yes, definitely" checked class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>Yes, definitely (USD client & remote internship network)</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="job_placement" value="Not at the moment" class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>Not at the moment</span>
                            </label>
                        </div>
                    </div>

                    <!-- 12. Terms & Conditions -->
                    <div class="space-y-1.5 pt-2 border-t border-slate-200">
                        <label class="block text-xs sm:text-sm font-bold text-slate-900">
                            By submitting this form, you confirm that you have read and accepted Newton Academy's Terms and Conditions. <span class="text-red-500">*</span>
                        </label>
                        <div class="space-y-2 pt-1 text-sm text-slate-800">
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="terms_acceptance" value="I accept" checked required class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span class="font-medium text-slate-900">I accept</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer">
                                <input type="radio" name="terms_acceptance" value="I don't accept" class="text-[#005f5a] focus:ring-[#005f5a]">
                                <span>I don't accept</span>
                            </label>
                        </div>
                    </div>

                    <!-- Submit CTA Button -->
                    <div class="pt-4">
                        <button type="submit" id="submitAppBtn" class="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.01] font-heading flex items-center justify-center gap-3">
                            <span>Submit Application & Start Live Evaluation</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                        <p class="text-[11px] text-center text-slate-500 mt-2">
                            🔒 Evaluated live in 30 seconds by the Admissions Council &bull; Zero spam
                        </p>
                    </div>

                </form>

            </div>

        </article>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div class="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-slate-600 mb-2 font-medium">
            <a href="terms.html" class="hover:underline">Terms & Conditions</a>
            <a href="privacy.html" class="hover:underline">Privacy Policy</a>
            <a href="disclaimer.html" class="hover:underline">Earnings Disclaimer</a>
        </div>
        <p>&copy; 2026 Newton Academy. All rights reserved. Convened strictly by Newton Academy.</p>
        <p class="text-[10px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This site is not affiliated with or endorsed by Meta Platforms, Inc. or Google LLC; Newton Academy provides professional educational training only, and all individual results depend completely on your personal dedication, skill mastery, and commercial execution.
        </p>
        
    </footer>

    <!-- Scripts -->
    <script src="assets/js/testimonials.js"></script>
    <script src="assets/js/testimonial-slider.js"></script>
    <script src="assets/js/application-evaluation.js"></script>
    <script src="assets/js/animations.js"></script>

    <script>
        // Envelope unroll interaction
        document.addEventListener('DOMContentLoaded', function() {
            const envelope = document.getElementById('confidentialEnvelope');
            const letter = document.getElementById('officialSalesLetter');
            
            if (envelope && letter) {
                envelope.addEventListener('click', function() {
                    letter.scrollIntoView({ behavior: 'smooth' });
                });
            }

            // Populate form with existing URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const pName = urlParams.get('name') || '';
            const pEmail = urlParams.get('email') || '';
            const pPhone = urlParams.get('phone') || '';
            const pTrack = urlParams.get('track') || '';

            if (pName) {
                const nameParts = pName.trim().split(' ');
                const fNameEl = document.getElementById('first_name');
                const lNameEl = document.getElementById('last_name');
                const recipientEl = document.getElementById('storyRecipientName');
                if (fNameEl && nameParts[0]) fNameEl.value = nameParts[0];
                if (lNameEl && nameParts.length > 1) lNameEl.value = nameParts.slice(1).join(' ');
                if (recipientEl) recipientEl.textContent = pName;
            }

            if (pEmail) {
                const emailEl = document.getElementById('email');
                if (emailEl) emailEl.value = pEmail;
            }

            if (pPhone) {
                const phoneEl = document.getElementById('phone');
                if (phoneEl) phoneEl.value = pPhone;
            }

            if (pTrack) {
                const courseSel = document.getElementById('course_select');
                if (courseSel) {
                    for (let i = 0; i < courseSel.options.length; i++) {
                        if (courseSel.options[i].value.toLowerCase().includes(pTrack.toLowerCase())) {
                            courseSel.selectedIndex = i;
                            break;
                        }
                    }
                }
            }

            // Initialize testimonial slider
            if (typeof initTestimonialSlider === 'function') {
                initTestimonialSlider();
            }

            // Wire up scholarship form submission -> 30-Second Evaluation Modal
            const form = document.getElementById('officialScholarshipForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const fName = document.getElementById('first_name').value.trim();
                    const lName = document.getElementById('last_name').value.trim();
                    const fullName = (fName + ' ' + lName).trim() || 'Candidate';
                    const emailVal = document.getElementById('email').value.trim();
                    const phoneVal = document.getElementById('phone').value.trim();
                    const courseVal = document.getElementById('course_select').value;
                    const schemeVal = document.getElementById('scholarship_scheme').value;
                    const appId = 'NA-' + Date.now().toString().slice(-6);

                    // Save to localStorage
                    try {
                        localStorage.setItem('newton_name', fullName);
                        localStorage.setItem('newton_email', emailVal);
                        localStorage.setItem('newton_phone', phoneVal);
                        localStorage.setItem('newton_track', courseVal);
                        localStorage.setItem('newton_app_id', appId);
                    } catch (err) {}

                    // Background async submit
                    try {
                        const fd = new FormData(form);
                        fd.append('app_id', appId);
                        fetch('api/scholarship.php', { method: 'POST', body: fd }).catch(function() {});
                    } catch (e) {}

                    // Target checkout URL
                    const chkParams = new URLSearchParams({
                        app_id: appId,
                        name: fullName,
                        email: emailVal,
                        phone: phoneVal,
                        track: courseVal,
                        scheme: schemeVal
                    });
                    const targetCheckoutUrl = '${checkoutTarget}?' + chkParams.toString();

                    // Trigger 30-Second Live Evaluation Modal with Confetti & 3D Doors
                    if (typeof window.startScholarshipEvaluation === 'function') {
                        window.startScholarshipEvaluation(fullName, targetCheckoutUrl);
                    } else {
                        window.location.href = targetCheckoutUrl;
                    }
                });
            }
        });

        // Quick track selection helper
        function selectTrack(trackName) {
            const courseSel = document.getElementById('course_select');
            if (courseSel) {
                for (let i = 0; i < courseSel.options.length; i++) {
                    if (courseSel.options[i].value === trackName || courseSel.options[i].value.includes(trackName)) {
                        courseSel.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    </script>
</body>
</html>`;
}

// Write thank-you.html & thank-you.php
fs.writeFileSync(path.join(__dirname, '..', 'thank-you.html'), generateThankYou(false), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'thank-you.php'), generateThankYou(true), 'utf8');
console.log('Successfully written streamlined thank-you.html and thank-you.php with official logo');

// Write scholarship.html & scholarship.php
fs.writeFileSync(path.join(__dirname, '..', 'scholarship.html'), generateScholarship(false), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'scholarship.php'), generateScholarship(true), 'utf8');
console.log('Successfully written standalone scholarship.html and scholarship.php with logo & vimeo videos');

// Write aliases special-offer and upsell
fs.writeFileSync(path.join(__dirname, '..', 'special-offer.html'), generateScholarship(false), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'special-offer.php'), generateScholarship(true), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'upsell.html'), generateScholarship(false), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'upsell.php'), generateScholarship(true), 'utf8');
console.log('Successfully written aliases special-offer and upsell');

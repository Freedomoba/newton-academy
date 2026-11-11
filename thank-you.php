<?php
require_once __DIR__ . '/config.php';

$name = trim($_GET['name'] ?? 'Conference Delegate');
$email = filter_var(trim($_GET['email'] ?? 'delegate@newton.ng'), FILTER_VALIDATE_EMAIL) ? trim($_GET['email']) : 'delegate@newton.ng';
$phone = trim($_GET['phone'] ?? '+2348000000000');
?>
<!DOCTYPE html>
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

    <!-- Main Navigation / Header -->
    <header class="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
            <a href="index.php" class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-[#005f5a] text-white flex items-center justify-center font-heading font-black text-lg shadow-md">
                    NA
                </div>
                <div>
                    <span class="block text-lg font-extrabold text-[#005f5a] tracking-tight font-heading leading-tight">Newton Academy</span>
                    <span class="block text-[11px] text-slate-500 font-medium tracking-wide">Empowering African Innovators & Leaders</span>
                </div>
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
                Welcome to the Virtual Conference, <span id="delegateNameDisplay" class="text-[#005f5a]"><?php echo htmlspecialchars($name); ?></span>!
            </h1>
            <p class="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
                Your delegate profile has been accepted into the <strong>"From Skills to Income" Virtual Conference</strong>. Please review your pass details and complete the 2 required orientation steps below.
            </p>
        </div>

        <!-- Confirmed Delegate VIP Pass Card -->
        <div class="relative bg-gradient-to-br from-[#003e3b] via-[#005f5a] to-[#002f2d] rounded-3xl p-6 sm:p-8 text-white pass-shadow border-2 border-amber-400/60 overflow-hidden">
            <!-- Background Decorative Watermark -->
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
                        <?php echo htmlspecialchars($name); ?>
                    </h3>
                    <p id="passEmail" class="text-teal-100 text-xs sm:text-sm font-sans mt-0.5">
                        <?php echo htmlspecialchars($email); ?>
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
                    <a id="claimGiftBtn" href="scholarship.php" class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-amber-500/30 transition-all transform hover:scale-105 font-heading">
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
            <p class="mt-1">Dr. Ade Braimoh is an Advisory Trustee & Keynote Speaker.</p>
        </footer>

        <!-- Client-Side Script: Preserves query parameters and runs 15s auto-redirect -->
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const params = new URLSearchParams(window.location.search);
                const name = params.get('name') || '<?php echo addslashes($name); ?>';
                const email = params.get('email') || '<?php echo addslashes($email); ?>';
                const phone = params.get('phone') || '<?php echo addslashes($phone); ?>';

                const nameEl = document.getElementById('delegateNameDisplay');
                const passNameEl = document.getElementById('passName');
                const passEmailEl = document.getElementById('passEmail');

                if (nameEl && name) nameEl.textContent = name;
                if (passNameEl && name) passNameEl.textContent = name;
                if (passEmailEl && email) passEmailEl.textContent = email;

                // Target URL for upsell page with preserved query parameters
                const targetUrl = 'scholarship.php?' + params.toString();
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
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmed | Newton Academy</title>
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <meta property="og:image" content="assets/favicon.jpg">
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
                            800: '#003835',
                            900: '#002f2d',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body, p, li { font-family: 'Inter', sans-serif; line-height: 1.625; }
        h1, h2, h3, h4, button, .font-heading { font-family: 'Poppins', sans-serif; }
        .brand-shadow { box-shadow: 0 20px 40px -15px rgba(0, 95, 90, 0.15); }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f1f5f9] text-slate-800 antialiased selection:bg-[#005f5a] selection:text-white">

    <header class="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <a href="index.html" class="flex items-center">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-11 w-auto object-contain">
            </a>
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                &check; VIP Pass Confirmed
            </span>
        </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">

        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 brand-shadow text-center space-y-6">
            <div class="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-black">
                &check;
            </div>

            <div class="space-y-2">
                <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                    Registration Confirmed, <span id="attendeeName">Delegate</span>!
                </h1>
                <p class="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
                    Your delegate access pass for the <strong class="text-slate-900">Digital and Financial Literacy</strong> Virtual Conference is reserved.
                </p>
            </div>

            <div class="p-4 sm:p-6 rounded-2xl bg-teal-50 border border-teal-200 max-w-xl mx-auto space-y-3">
                <h3 class="text-xs sm:text-sm md:text-base font-bold text-[#005f5a] font-heading">Step 1: Join The Official Delegate WhatsApp Hub</h3>
                <p class="text-xs sm:text-sm text-slate-600">
                    Get conference live links, speaker materials, and immediate notification when session doors open:
                </p>
                <a href="https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all">
                    <span>Join Official WhatsApp Community &rarr;</span>
                </a>
            </div>

            <div class="border-t border-slate-200 pt-6 space-y-4">
                <div class="p-5 rounded-2xl bg-gradient-to-r from-[#003e3b] via-[#005f5a] to-[#002f2d] text-white max-w-xl mx-auto space-y-3">
                    <span class="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider inline-block">
                        Urgent Admissions Notice
                    </span>
                    <h3 class="text-lg font-bold font-heading">
                        You Have Been Pre-Screened For A 100% Tuition Scholarship
                    </h3>
                    <p class="text-xs text-teal-100">
                        Redirecting you to the Confidential Scholarship Briefing in <span id="countdown" class="font-mono text-amber-400 font-bold">15</span> seconds...
                    </p>
                    <a id="redirectBtn" href="scholarship.php" class="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all">
                        Open Scholarship Briefing Immediately &rarr;
                    </a>
                </div>
            </div>
        </div>

    </main>

    
    <!-- OFFICIAL BRAND FOOTER (Newton Academy Dark Brand Colour #003835) -->
    
    <!-- Newton Official Dark Brand Footer (Not Black) -->
    
    <!-- Clean Minimal Brand Footer -->
    <footer class="bg-[#003835] text-slate-300 py-8 border-t border-emerald-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-5 pb-5 border-b border-emerald-800/40 text-center sm:text-left">
                <!-- Logo -->
                <a href="index.html" class="inline-block">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-8 w-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>

                <!-- Quick Links & Contact -->
                <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-slate-300 font-medium">
                    <a href="curriculum-dm.html" class="hover:text-amber-400 transition-colors">Digital Marketing</a>
                    <a href="curriculum-de.html" class="hover:text-amber-400 transition-colors">Digital Entrepreneurship</a>
                    <a href="scholarship.html" class="hover:text-amber-400 transition-colors">Scholarship</a>
                    <a href="mailto:na@newtoncore.com" class="hover:text-amber-400 transition-colors">na@newtoncore.com</a>
                </div>
            </div>

            <!-- Copyright & Minimal Disclaimer -->
            <div class="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-400">
                <p>&copy; 2026 Newton Academy. All rights reserved.</p>
                <p class="text-slate-400/80">
                    Professional education only. Not affiliated with Meta Platforms, Inc. or Google LLC.
                </p>
            </div>
        </div>
    </footer>




    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const storedName = localStorage.getItem('newton_name') || '';
            if (storedName) {
                const nameEl = document.getElementById('attendeeName');
                if (nameEl) nameEl.textContent = storedName.split(' ')[0];
            }

            const urlParams = new URLSearchParams(window.location.search);
            const targetUrl = 'scholarship.php?' + urlParams.toString();
            const redBtn = document.getElementById('redirectBtn');
            if (redBtn) redBtn.href = targetUrl;

            let seconds = 15;
            const cdEl = document.getElementById('countdown');
            const timer = setInterval(function() {
                seconds--;
                if (cdEl) cdEl.textContent = seconds;
                if (seconds <= 0) {
                    clearInterval(timer);
                    window.location.href = targetUrl;
                }
            }, 1000);
        });
    </script>
    <script src="assets/js/animations.js"></script>
</body>
</html>
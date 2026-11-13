<?php
require_once __DIR__ . '/config.php';

$appId = trim($_GET['app_id'] ?? 'NA-SCH-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8)));
$name = trim($_GET['name'] ?? 'Freedom Obanijesu');
$email = filter_var(trim($_GET['email'] ?? 'freedom@lumenvoxai.com'), FILTER_VALIDATE_EMAIL) ? trim($_GET['email']) : 'freedom@lumenvoxai.com';
$phone = trim($_GET['phone'] ?? '+2348012345678');
$programme = trim($_GET['programme'] ?? $_GET['track'] ?? 'Digital Entrepreneurship + Applied AI');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Award of Scholarship | <?php echo ACADEMY_NAME; ?></title>
    <!-- Favicon & Social Meta -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <meta property="og:image" content="assets/favicon.jpg">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Paystack Inline JS -->
    <script src="https://js.paystack.co/v1/inline.js"></script>
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
                            500: '#007771',
                            600: '#005f5a',     // Official Dark Pine Teal
                            700: '#004d49',
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
            box-shadow: 0 25px 50px -15px rgba(0, 95, 90, 0.15);
        }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-[#005f5a] selection:text-white min-h-screen">

    <!-- Top Celebration Announcement Bar -->
    <div class="bg-gradient-to-r from-[#003d3a] via-[#005f5a] to-[#003d3a] text-white py-2.5 px-4 text-center text-xs font-sans border-b border-amber-400/30">
        <div class="max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Admissions Board Decision: <strong class="text-amber-300">100% Full Tuition Scholarship Officially Ratified</strong> for <span id="announcementName" class="font-bold underline decoration-amber-400"><?php echo htmlspecialchars($name); ?></span></span>
        </div>
    </div>

    <!-- Official Header -->
    <header class="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <a href="index.php" class="flex items-center shrink-0">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-10 w-auto max-w-[130px] sm:max-w-none object-contain">
            </a>
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Admission Granted</span>
                </span>
            </div>
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        <!-- Reservation Timer -->
        <div class="bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-sm">
            <div class="flex items-center gap-2.5">
                <span class="text-amber-600 font-bold text-base shrink-0">⏱</span>
                <span>
                    <strong>Seat Guarantee Window:</strong> Your scholarship seat reservation is locked for <strong class="underline decoration-amber-400">24 hours</strong>. Please confirm your enrollment to secure your faculty mentor allocation.
                </span>
            </div>
            <span class="font-mono font-bold bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-xl border border-amber-300 shrink-0 self-start sm:self-auto text-xs" id="timer">
                23:59:45
            </span>
        </div>

        <!-- ============================================================== -->
        <!-- THE OFFICIAL SCHOLARSHIP AWARD DOSSIER (EXECUTIVE LETTERHEAD)  -->
        <!-- ============================================================== -->
        <article class="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-12 brand-shadow relative overflow-hidden">
            
            <!-- Letterhead Header -->
            <div class="border-b-2 border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                        Official Award of 100% Full Tuition Scholarship
                    </h1>
                    <p class="text-xs text-slate-500 font-mono mt-1.5">
                        Dossier Reference: <span id="awardeeAppId" class="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded"><?php echo htmlspecialchars($appId); ?></span>
                    </p>
                </div>
                <div class="shrink-0 self-start">
                    <span class="inline-block bg-teal-50 border border-teal-200 text-[#005f5a] text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        100% Endowed
                    </span>
                </div>
            </div>

            <!-- Letter Body -->
            <div class="text-xs sm:text-sm md:text-base text-slate-700 font-sans leading-[1.75] space-y-4 mb-8">
                <p>
                    Dear <strong id="greetingRecipient" class="text-slate-900 font-bold"><?php echo htmlspecialchars($name); ?></strong>,
                </p>
                <p>
                    We are pleased to inform you that upon formal evaluation of your candidate profile, the Admissions Committee of Newton Academy has officially ratified and awarded you a <strong class="text-emerald-700 font-bold underline decoration-emerald-300 underline-offset-4">100% Full Tuition Scholarship</strong> for the upcoming 3-Month International Fellowship.
                </p>
                <p>
                    This foundation award completely covers your standard tuition fee (<strong class="text-slate-900">valued at ₦200,000</strong>), granting you unhindered access to our international faculty and practitioners (with enterprise leadership track records at Microsoft, Meta, Accenture, and 7Up Bottling Company), comprehensive hands-on masterclasses, and our complete suite of applied artificial intelligence commercial workflows.
                </p>
            </div>

            <!-- Candidate Profile Dossier Card -->
            <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-8 text-xs font-sans">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Candidate Full Name</span>
                        <strong class="text-slate-900 text-xs sm:text-sm md:text-base font-bold" id="awardeeName"><?php echo htmlspecialchars($name); ?></strong>
                    </div>
                    <div>
                        <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Registered Contact</span>
                        <strong class="text-slate-900 text-xs sm:text-sm md:text-base font-bold font-mono" id="awardeeEmail"><?php echo htmlspecialchars($email); ?></strong>
                    </div>
                    <div class="sm:col-span-2 pt-3 border-t border-slate-200">
                        <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Admitted Program Track</span>
                        <strong class="text-[#005f5a] text-xs sm:text-sm md:text-base font-bold" id="awardeeTrack"><?php echo htmlspecialchars($programme); ?></strong>
                    </div>
                </div>
            </div>

            <!-- ============================================================== -->
            <!-- THE ENDOWMENT GRANT & SEAT CONFIRMATION VOUCHER (NEW CONCEPT)  -->
            <!-- ============================================================== -->
            <div class="space-y-4 mb-10">
                
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
                            <span class="line-through text-slate-300 text-xs sm:text-base md:text-lg font-mono font-bold">₦200,000</span>
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
                                <h4 class="text-xs sm:text-sm md:text-base font-bold text-slate-900">
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

            </div>

            <!-- ============================================================== -->
            <!-- PAYMENT INTEGRATION: CHOOSE METHOD (ONLINE OR BANK TRANSFER)  -->
            <!-- ============================================================== -->
            <div class="space-y-6">
                
                <div class="text-center max-w-md mx-auto mb-2">
                    <h3 class="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-slate-900">
                        Finalize Your Enrollment &bull; Select Payment Method
                    </h3>
                    <p class="text-xs text-slate-500 mt-1">
                        Both methods grant immediate verification and LMS portal onboarding.
                    </p>
                </div>

                <!-- METHOD 1: INSTANT ONLINE PAYMENT VIA PAYSTACK -->
                <div class="bg-white border-2 border-amber-400/60 rounded-2xl p-5 sm:p-6 shadow-md hover:border-amber-400 transition-all">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                            Method 1: Instant Online Payment
                        </span>
                        <span class="text-[11px] font-mono text-slate-500">Card / USSD / Bank</span>
                    </div>

                    <button 
                        type="button" 
                        id="payNowBtn"
                        class="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-4 px-6 rounded-xl text-base shadow-lg shadow-amber-500/20 transform active:scale-[0.99] transition-all cursor-pointer text-center"
                    >
                        Pay ₦20,000 Online & Activate Admission Instantly
                    </button>

                    <div class="text-center text-[11px] text-slate-500 space-y-0.5 mt-2.5">
                        <p>Secured with 256-bit SSL encryption via Paystack.</p>
                    </div>
                </div>

                <!-- METHOD 2: DIRECT NIGERIAN BANK TRANSFER -->
                <div class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                        <div>
                            <h4 class="text-sm font-bold text-slate-900">Transfer ₦20,000 to Any Designated Account Below</h4>
                        </div>
                        <span class="text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
                            Beneficiary: <strong>Newton OS Limited</strong>
                        </span>
                    </div>

                    <!-- 3 Bank Cards with 1-Click Copy -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <!-- UBA -->
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Bank</span>
                                <strong class="text-xs font-bold text-slate-900 block">UBA</strong>
                                <span class="text-[10px] font-mono text-slate-500 block mt-1">Account Number</span>
                                <span class="text-base font-extrabold font-mono text-slate-900 tracking-wider block">1027518730</span>
                            </div>
                            <button type="button" onclick="copyAccount('1027518730', this)" class="mt-3 w-full bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer">
                                Copy Account
                            </button>
                        </div>

                        <!-- ZENITH -->
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Bank</span>
                                <strong class="text-xs font-bold text-slate-900 block">Zenith Bank</strong>
                                <span class="text-[10px] font-mono text-slate-500 block mt-1">Account Number</span>
                                <span class="text-base font-extrabold font-mono text-slate-900 tracking-wider block">1229109189</span>
                            </div>
                            <button type="button" onclick="copyAccount('1229109189', this)" class="mt-3 w-full bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer">
                                Copy Account
                            </button>
                        </div>

                        <!-- UNION BANK -->
                        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Bank</span>
                                <strong class="text-xs font-bold text-slate-900 block">Union Bank</strong>
                                <span class="text-[10px] font-mono text-slate-500 block mt-1">Account Number</span>
                                <span class="text-base font-extrabold font-mono text-slate-900 tracking-wider block">0204007446</span>
                            </div>
                            <button type="button" onclick="copyAccount('0204007446', this)" class="mt-3 w-full bg-slate-100 hover:bg-[#005f5a] hover:text-white text-slate-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer">
                                Copy Account
                            </button>
                        </div>
                    </div>

                    <!-- Account Name Reminder -->
                    <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span>Account Name (All Banks): <strong class="text-slate-900">Newton OS Limited</strong></span>
                        <span class="font-bold text-[#005f5a]">Amount: ₦20,000</span>
                    </div>

                    <!-- Transfer Confirmation Button -->
                    <div class="pt-2">
                        <button 
                            type="button" 
                            onclick="confirmBankTransfer()"
                            class="w-full bg-[#005f5a] hover:bg-[#004d49] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                        >
                            <span>I Have Transferred ₦20,000 &bull; Confirm My Enrollment via WhatsApp Desk</span>
                            <span>→</span>
                        </button>
                        <p class="text-[11px] text-slate-500 text-center mt-2 font-sans">
                            Click immediately after transferring. You will be connected to the Admissions Registrar to provision your LMS student portal.
                        </p>
                    </div>
                </div>

            </div>

        </article>

    </main>

    <!-- Footer -->
    
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



    <!-- Paystack Integration & Dynamic Funnel Connector -->
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('name') || localStorage.getItem('newton_name') || '<?php echo addslashes($name); ?>';
        const userEmail = urlParams.get('email') || localStorage.getItem('newton_email') || '<?php echo addslashes($email); ?>';
        const userPhone = urlParams.get('phone') || localStorage.getItem('newton_phone') || '+2348012345678';
        const programme = urlParams.get('track') || urlParams.get('programme') || localStorage.getItem('newton_track') || '<?php echo addslashes($programme); ?>';
        const appId = urlParams.get('app_id') || localStorage.getItem('newton_app_id') || '<?php echo addslashes($appId); ?>';
        const amountKobo = 2000000;
        const paystackPublicKey = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

        // Update Award Document DOM dynamically
        const elAnnouncement = document.getElementById('announcementName');
        if (elAnnouncement) elAnnouncement.textContent = userName;
        const elGreeting = document.getElementById('greetingRecipient');
        if (elGreeting) elGreeting.textContent = userName;
        const elName = document.getElementById('awardeeName');
        if (elName) elName.textContent = userName;
        const elEmail = document.getElementById('awardeeEmail');
        if (elEmail) elEmail.textContent = userEmail;
        const elAppId = document.getElementById('awardeeAppId');
        if (elAppId) elAppId.textContent = appId;
        const elTrack = document.getElementById('awardeeTrack');
        if (elTrack) elTrack.textContent = programme;

        const payBtn = document.getElementById('payNowBtn');

        if (payBtn) {
            payBtn.addEventListener('click', function() {
                // If in demo or test key without live configuration
                if (!paystackPublicKey || paystackPublicKey.includes('xxxxxxxx')) {
                    const demoRef = 'DEMO_NA_' + Math.floor(Math.random() * 1000000000);
                    verifyAndRedirect(demoRef);
                    return;
                }

                if (typeof PaystackPop !== 'undefined') {
                    let handler = PaystackPop.setup({
                        key: paystackPublicKey,
                        email: userEmail,
                        amount: amountKobo,
                        currency: 'NGN',
                        ref: 'NA_' + Math.floor((Math.random() * 1000000000) + 1),
                        metadata: {
                            custom_fields: [
                                { display_name: "Applicant Name", variable_name: "applicant_name", value: userName },
                                { display_name: "Application ID", variable_name: "app_id", value: appId },
                                { display_name: "Programme", variable_name: "programme", value: programme }
                            ]
                        },
                        callback: function(response) {
                            verifyAndRedirect(response.reference);
                        },
                        onClose: function() {
                            alert('Your transaction was cancelled. Your scholarship seat reservation remains held for 24 hours.');
                        }
                    });
                    handler.openIframe();
                } else {
                    const demoRef = 'DEMO_NA_' + Math.floor(Math.random() * 1000000000);
                    verifyAndRedirect(demoRef);
                }
            });
        }

        async function verifyAndRedirect(reference) {
            if (payBtn) {
                payBtn.disabled = true;
                payBtn.textContent = 'Verifying Payment & Activating Admission...';
            }

            try {
                const res = await fetch(`api/verify_payment.php?reference=${encodeURIComponent(reference)}&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&programme=${encodeURIComponent(programme)}&app_id=${encodeURIComponent(appId)}`);
                const data = await res.json();
                
                if (data.success && data.redirect) {
                    window.location.href = data.redirect;
                    return;
                }
            } catch (e) {}

            window.location.href = `success.php?reference=${encodeURIComponent(reference)}&name=${encodeURIComponent(userName)}&programme=${encodeURIComponent(programme)}`;
        }

        // Copy Account Helper with instant feedback
        window.copyAccount = function(accountNumber, btn) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(accountNumber).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    btn.classList.add('bg-emerald-600', 'text-white');
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.remove('bg-emerald-600', 'text-white');
                    }, 2200);
                });
            } else {
                const tempInput = document.createElement('input');
                tempInput.value = accountNumber;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                btn.textContent = '✓ Copied!';
                setTimeout(() => { btn.textContent = 'Copy Account'; }, 2200);
            }
        };

        // Bank Transfer WhatsApp Confirmation
        window.confirmBankTransfer = function() {
            const message = encodeURIComponent(
                `Hello Admissions Registrar, I have completed my ₦20,000 Bank Transfer to Newton OS Limited.\n\n` +
                `• Candidate Name: ${userName}\n` +
                `• Email: ${userEmail}\n` +
                `• Track: ${programme}\n` +
                `• Reference ID: ${appId}\n\n` +
                `Kindly verify my payment and provision my LMS Portal orientation credentials.`
            );
            window.location.href = `https://wa.me/2348053708909?text=${message}`;
        };

        // 24-Hour Urgency Timer
        let timeRemaining = 23 * 3600 + 59 * 60 + 45;
        const timerEl = document.getElementById('timer');
        if (timerEl) {
            setInterval(() => {
                if (timeRemaining <= 0) return;
                timeRemaining--;
                const hours = String(Math.floor(timeRemaining / 3600)).padStart(2, '0');
                const minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, '0');
                const seconds = String(timeRemaining % 60).padStart(2, '0');
                timerEl.textContent = `${hours}:${minutes}:${seconds}`;
            }, 1000);
        }
    </script>
    <script src="assets/js/animations.js"></script>
</body>
</html>
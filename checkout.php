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
            <span>Admissions Council Decision: <strong class="text-amber-300">100% Full Tuition Scholarship Officially Ratified</strong> for <span id="announcementName" class="font-bold underline decoration-amber-400"><?php echo htmlspecialchars($name); ?></span></span>
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
            <div class="text-sm sm:text-base text-slate-700 font-sans leading-[1.75] space-y-4 mb-8">
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
                        <strong class="text-slate-900 text-sm sm:text-base font-bold" id="awardeeName"><?php echo htmlspecialchars($name); ?></strong>
                    </div>
                    <div>
                        <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Registered Contact</span>
                        <strong class="text-slate-900 text-sm sm:text-base font-bold font-mono" id="awardeeEmail"><?php echo htmlspecialchars($email); ?></strong>
                    </div>
                    <div class="sm:col-span-2 pt-3 border-t border-slate-200">
                        <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Admitted Program Track</span>
                        <strong class="text-[#005f5a] text-sm sm:text-base font-bold" id="awardeeTrack"><?php echo htmlspecialchars($programme); ?></strong>
                    </div>
                </div>
            </div>

            <!-- Financial Award Grant Ledger -->
            <div class="bg-[#f0f9f8] border border-[#005f5a]/30 rounded-2xl p-6 sm:p-7 mb-10 text-xs sm:text-sm font-sans">
                <div class="flex items-center justify-between border-b border-[#005f5a]/20 pb-3 mb-3">
                    <span class="font-bold text-[#004d49] uppercase tracking-wider text-xs">Official Financial Award Ledger</span>
                    <span class="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full font-bold">Endowment Applied</span>
                </div>
                
                <table class="w-full text-xs sm:text-sm border-collapse">
                    <tbody>
                        <tr class="border-b border-[#005f5a]/10">
                            <td class="py-2.5 text-left text-slate-600 font-medium pr-4">Standard Program Tuition Fee:</td>
                            <td class="py-2.5 text-right font-mono font-bold text-slate-400 line-through whitespace-nowrap">₦200,000</td>
                        </tr>
                        <tr class="border-b border-[#005f5a]/10">
                            <td class="py-2.5 text-left text-[#005f5a] font-semibold pr-4">Newton Academy Foundation Endowment:</td>
                            <td class="py-2.5 text-right font-mono font-bold text-[#005f5a] whitespace-nowrap">-₦200,000 <span class="text-[11px] font-sans font-normal text-emerald-700">(100% Covered)</span></td>
                        </tr>
                        <tr class="border-b-2 border-[#005f5a]/20">
                            <td class="py-2.5 text-left text-slate-900 font-bold pr-4">Remaining Tuition Payable:</td>
                            <td class="py-2.5 text-right font-mono font-black text-emerald-700 text-sm sm:text-base whitespace-nowrap">₦0.00 <span class="text-xs font-sans font-bold">(FREE)</span></td>
                        </tr>
                        <tr>
                            <td class="pt-4 pb-1 text-left pr-4">
                                <strong class="text-sm sm:text-base block font-bold text-slate-900">One-Time Application &amp; Seat Reservation Fee:</strong>
                                <span class="text-[11px] text-slate-500 block leading-normal mt-0.5">Due to extreme applicant volume, this single non-refundable fee filters for committed fellows and reserves your seat across live cohorts and LMS systems.</span>
                            </td>
                            <td class="pt-4 pb-1 text-right align-top shrink-0">
                                <span class="text-2xl sm:text-3xl font-extrabold text-[#005f5a] font-mono whitespace-nowrap">₦20,000</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- ============================================================== -->
            <!-- PAYMENT INTEGRATION: CHOOSE METHOD (ONLINE OR BANK TRANSFER)  -->
            <!-- ============================================================== -->
            <div class="space-y-6">
                
                <div class="text-center max-w-md mx-auto mb-2">
                    <h3 class="text-base sm:text-lg font-bold text-slate-900">
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
    <footer class="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 mt-12">
        <p>&copy; 2026 Newton Academy. All rights reserved.</p>
        <p class="mt-1 text-slate-400">Convened by Newton Academy &bull; Empowering High-Income African Digital Leaders.</p>
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
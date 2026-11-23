<?php
require_once __DIR__ . '/config.php';

$appId = trim($_GET['app_id'] ?? 'NA-SCH-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8)));
$name = trim($_GET['name'] ?? 'Freedom Obanijesu');
$email = filter_var(trim($_GET['email'] ?? 'freedom@lumenvoxai.com'), FILTER_VALIDATE_EMAIL) ? trim($_GET['email']) : 'freedom@lumenvoxai.com';
$phone = trim($_GET['phone'] ?? '+2348012345678');
$programme = trim($_GET['programme'] ?? $_GET['track'] ?? 'Digital Marketing + Applied AI');
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
            box-shadow: 0 25px 50px -15px rgba(0, 95, 90, 0.12);
        }
    </style>
    <link rel="stylesheet" href="assets/css/animations.css">
</head>
<body class="bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-[#005f5a] selection:text-white min-h-screen">

    <!-- URGENT PSYCHOLOGICAL RED COUNTDOWN BAR (TIME SENSITIVITY) -->
    <div class="bg-red-600 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-sans shadow-md sticky top-0 z-50">
        <div class="max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span class="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0"></span>
            <span class="font-extrabold uppercase tracking-wider text-red-100">Seat Hold Warning:</span>
            <span>Your 100% Scholarship (₦200,000 waiver) is held for <strong id="topTimer" class="bg-white text-red-700 px-2 py-0.5 rounded font-mono font-black tracking-wider">23:59:45</strong>. Unclaimed seats will be transferred to waitlisted applicants.</span>
        </div>
    </div>

    <!-- Official Clean Header -->
    <header class="border-b border-slate-200 bg-white shadow-sm">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <a href="index.php" class="flex items-center shrink-0">
                <img src="assets/logo.png" alt="Newton Academy" class="h-8 sm:h-10 w-auto max-w-[130px] sm:max-w-none object-contain">
            </a>
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>100% Scholarship Approved</span>
                </span>
            </div>
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        <!-- MAIN REVAMPED PAYMENT CONTAINER (CLEAN, STRAIGHTFORWARD, NO NESTED BOXES) -->
        <div class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 brand-shadow">
            
            <!-- Headline & Candidate Salutation -->
            <div class="border-b border-slate-100 pb-6 mb-6">
                <span class="text-xs font-bold uppercase tracking-wider text-[#005f5a] font-mono block mb-1">
                    Official Candidate Dossier &bull; Ref: <span id="awardeeAppId" class="text-slate-900"><?php echo htmlspecialchars($appId); ?></span>
                </span>
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                    Finalize Your Enrolment &amp; Secure Your Seat
                </h1>
                <p class="text-sm text-slate-600 mt-2 font-sans">
                    Dear <strong id="greetingRecipient" class="text-slate-900"><?php echo htmlspecialchars($name); ?></strong>, following review of your candidate application, you have been approved for a <strong>100% Full Tuition Scholarship</strong> for the <strong><?php echo htmlspecialchars($programme); ?></strong>.
                </p>
            </div>

            <!-- Candidate Metadata (Clean Linear List, Not Boxed) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100 text-xs font-sans">
                <div>
                    <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Candidate Name</span>
                    <strong class="text-slate-900 text-sm font-bold" id="awardeeName"><?php echo htmlspecialchars($name); ?></strong>
                </div>
                <div>
                    <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Contact Email</span>
                    <strong class="text-slate-900 text-sm font-bold font-mono" id="awardeeEmail"><?php echo htmlspecialchars($email); ?></strong>
                </div>
                <div>
                    <span class="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Approved Specialization</span>
                    <strong class="text-[#005f5a] text-sm font-bold" id="awardeeTrack"><?php echo htmlspecialchars($programme); ?></strong>
                </div>
            </div>

            <!-- Award Letter Quick Action Link -->
            <div class="py-3 px-4 my-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                <div class="flex items-center gap-2">
                    <span class="text-base">📄</span>
                    <span class="text-slate-700">Official Signed Award Letter has been generated for your candidate file.</span>
                </div>
                <a id="downloadAwardPdfBtn" href="api/download_award_letter.php?app_id=<?php echo urlencode($appId); ?>&name=<?php echo urlencode($name); ?>&track=<?php echo urlencode($programme); ?>" target="_blank" class="font-bold text-[#005f5a] hover:text-[#004d49] hover:underline flex items-center gap-1">
                    <span>Download Award Letter (PDF)</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <!-- Structured Two-Column Financial Ledger with Column & Row Dividers -->
            <div class="my-6 font-sans">
                <div class="flex items-center justify-between mb-2">
                    <h2 class="text-xs uppercase tracking-wider font-bold text-slate-500">
                        Official Fee Breakdown &amp; Valuation
                    </h2>
                    <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        100% Tuition Waived
                    </span>
                </div>

                <!-- Structured Table / Grid with Column Divider and Row Dividers -->
                <div class="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 shadow-sm">
                    
                    <!-- Table Header -->
                    <div class="grid grid-cols-12 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        <div class="col-span-7 sm:col-span-8 p-3 sm:px-4 border-r border-slate-200">
                            Description / Item
                        </div>
                        <div class="col-span-5 sm:col-span-4 p-3 sm:px-4 text-right">
                            Fee (NGN)
                        </div>
                    </div>

                    <!-- Row 1: Standard Tuition -->
                    <div class="grid grid-cols-12 border-b border-slate-200 bg-white items-center">
                        <div class="col-span-7 sm:col-span-8 p-3 sm:px-4 border-r border-slate-200 text-sm text-slate-700">
                            Standard 3-Month Diploma Tuition
                        </div>
                        <div class="col-span-5 sm:col-span-4 p-3 sm:px-4 text-right font-mono text-sm line-through text-slate-400 font-bold">
                            ₦200,000
                        </div>
                    </div>

                    <!-- Row 2: 100% Endowment -->
                    <div class="grid grid-cols-12 border-b border-slate-200 bg-emerald-50/40 items-center">
                        <div class="col-span-7 sm:col-span-8 p-3 sm:px-4 border-r border-slate-200 text-sm text-emerald-800 font-semibold">
                            Newton Academy 100% Tuition Endowment
                        </div>
                        <div class="col-span-5 sm:col-span-4 p-3 sm:px-4 text-right font-mono text-sm text-emerald-700 font-bold">
                            -₦200,000 <span class="hidden sm:inline text-xs font-sans font-bold">(100% Waived)</span>
                        </div>
                    </div>

                    <!-- Row 3: Remaining Tuition Balance -->
                    <div class="grid grid-cols-12 border-b border-slate-200 bg-white items-center">
                        <div class="col-span-7 sm:col-span-8 p-3 sm:px-4 border-r border-slate-200 text-sm font-semibold text-slate-800">
                            Remaining Tuition Balance
                        </div>
                        <div class="col-span-5 sm:col-span-4 p-3 sm:px-4 text-right font-mono text-sm font-black text-emerald-700">
                            ₦0.00 <span class="text-xs font-sans font-bold text-emerald-600">(FREE)</span>
                        </div>
                    </div>

                    <!-- Row 4: One-Time Admissions Fee -->
                    <div class="grid grid-cols-12 border-b border-slate-200 bg-white items-center">
                        <div class="col-span-7 sm:col-span-8 p-3 sm:px-4 border-r border-slate-200">
                            <span class="text-sm font-bold text-slate-900 block">One-Time Admissions &amp; Portal Evaluation Fee</span>
                            <span class="text-xs text-slate-500 block leading-tight mt-0.5">Covers student ID verification, personalized LMS access, and mentor allocation.</span>
                        </div>
                        <div class="col-span-5 sm:col-span-4 p-3 sm:px-4 text-right font-mono text-base font-bold text-slate-900">
                            ₦20,000
                        </div>
                    </div>

                    <!-- Row 5: Total Amount Payable Today (Highlighted) -->
                    <div class="grid grid-cols-12 bg-amber-50/60 items-center border-t-2 border-slate-300">
                        <div class="col-span-7 sm:col-span-8 p-3 sm:px-4 border-r border-slate-200">
                            <span class="text-sm sm:text-base font-black text-slate-900 block font-heading">Total Amount Payable Today</span>
                            <span class="text-xs text-red-600 font-bold flex items-center gap-1 mt-0.5">
                                <span>Saves you ₦200,000</span>
                                <span>&bull;</span>
                                <span>Expires in: <span class="timerText font-mono font-black">23:59:45</span></span>
                            </span>
                        </div>
                        <div class="col-span-5 sm:col-span-4 p-3 sm:px-4 text-right">
                            <span class="text-2xl sm:text-3xl font-black text-[#005f5a] font-mono block">₦20,000</span>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Official Direct Bank Transfer Payment Method -->
            <div class="pt-6 space-y-6">
                
                <!-- Beneficiary Card & Official Corporate Accounts -->
                <div class="bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                    
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-200">
                        <div>
                            <span class="text-[11px] font-black uppercase tracking-wider text-[#005f5a] flex items-center gap-1.5 font-heading">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                Direct Bank Transfer Payment
                            </span>
                            <h3 class="text-base sm:text-lg font-black text-slate-900 mt-0.5 font-heading">
                                Official Corporate Accounts
                            </h3>
                        </div>
                        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-emerald-600 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            Verified Institution
                        </span>
                    </div>

                    <div class="flex items-center justify-between text-xs sm:text-sm bg-slate-100/70 p-3 rounded-xl border border-slate-200/80">
                        <span class="text-slate-600 font-medium">Beneficiary Account Name:</span>
                        <strong class="text-slate-950 font-black tracking-wide font-heading">Newton OS Limited</strong>
                    </div>

                    <!-- Clean Bank Account List (No Nested Clutter) -->
                    <div class="space-y-2.5">
                        <!-- Zenith Bank -->
                        <div class="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-[#005f5a]/40 shadow-sm transition-all">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-black text-xs border border-red-200 font-mono">
                                    ZEN
                                </div>
                                <div>
                                    <span class="text-xs text-slate-500 font-semibold block">Zenith Bank</span>
                                    <span class="text-base sm:text-lg font-black font-mono text-slate-900 tracking-wider">1229109189</span>
                                </div>
                            </div>
                            <button type="button" onclick="copyAccount('1229109189', this)" class="text-xs font-bold bg-slate-50 hover:bg-[#005f5a] hover:text-white text-slate-700 border border-slate-300 py-2 px-3 sm:px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                                <span>Copy Account</span>
                            </button>
                        </div>

                        <!-- UBA -->
                        <div class="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-[#005f5a]/40 shadow-sm transition-all">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-black text-xs border border-red-200 font-mono">
                                    UBA
                                </div>
                                <div>
                                    <span class="text-xs text-slate-500 font-semibold block">UBA (United Bank for Africa)</span>
                                    <span class="text-base sm:text-lg font-black font-mono text-slate-900 tracking-wider">1027518730</span>
                                </div>
                            </div>
                            <button type="button" onclick="copyAccount('1027518730', this)" class="text-xs font-bold bg-slate-50 hover:bg-[#005f5a] hover:text-white text-slate-700 border border-slate-300 py-2 px-3 sm:px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                                <span>Copy Account</span>
                            </button>
                        </div>

                        <!-- Union Bank -->
                        <div class="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-[#005f5a]/40 shadow-sm transition-all">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs border border-blue-200 font-mono">
                                    UBN
                                </div>
                                <div>
                                    <span class="text-xs text-slate-500 font-semibold block">Union Bank</span>
                                    <span class="text-base sm:text-lg font-black font-mono text-slate-900 tracking-wider">0204007446</span>
                                </div>
                            </div>
                            <button type="button" onclick="copyAccount('0204007446', this)" class="text-xs font-bold bg-slate-50 hover:bg-[#005f5a] hover:text-white text-slate-700 border border-slate-300 py-2 px-3 sm:px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
                                <span>Copy Account</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 3-Step Clear Action Guide -->
                <div class="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-3">
                    <span class="text-xs font-black uppercase tracking-wider text-[#005f5a] block font-heading">
                        Mandatory Steps to Finalize Your Enrollment:
                    </span>
                    <ol class="space-y-3 text-xs sm:text-sm text-slate-800">
                        <li class="flex items-start gap-2.5">
                            <span class="w-5 h-5 rounded-full bg-[#005f5a] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 font-mono">1</span>
                            <span><strong>Transfer ₦20,000</strong> to any of the official Newton OS Limited accounts above via your mobile banking app or USSD.</span>
                        </li>
                        <li class="flex items-start gap-2.5">
                            <span class="w-5 h-5 rounded-full bg-[#005f5a] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 font-mono">2</span>
                            <span>
                                <strong>Sign up &amp; create your account</strong> on the Academy Portal at <a href="https://academy.newtoncore.com/auth/register" target="_blank" class="text-[#005f5a] font-bold underline hover:text-teal-900">academy.newtoncore.com/auth/register</a> using your <strong>exact same name &amp; email</strong> for immediate course approval.
                            </span>
                        </li>
                        <li class="flex items-start gap-2.5">
                            <span class="w-5 h-5 rounded-full bg-[#005f5a] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 font-mono">3</span>
                            <span><strong>Confirm with Odunayo:</strong> Click the button below to send your transfer receipt on WhatsApp. Odunayo will verify your payment and grant you instant VIP room admission.</span>
                        </li>
                    </ol>
                </div>

                <!-- Primary Confirmation Button leading to Odunayo -->
                <div class="space-y-2 pt-1">
                    <button 
                        type="button" 
                        onclick="confirmBankTransfer()"
                        class="w-full bg-[#005f5a] hover:bg-[#004d49] text-white font-black py-4 px-6 rounded-xl text-base sm:text-lg shadow-lg shadow-teal-900/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>I Have Transferred ₦20,000 &bull; Confirm on WhatsApp</span>
                        <span>&rarr;</span>
                    </button>
                    <p class="text-center text-[11px] text-slate-500 font-sans">
                        Instant human verification &bull; Direct access to Lead Admissions Advisor Odunayo
                    </p>
                </div>

                <!-- PSYCHOLOGICAL RED SCARCITY NOTICE -->
                <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-3">
                    <span class="text-red-600 font-bold text-base leading-none mt-0.5">⚠️</span>
                    <div class="space-y-1">
                        <strong class="font-bold text-red-950 block">Important Allocation Policy:</strong>
                        <p class="leading-relaxed">
                            Cohort capacity is strictly limited to 50 candidates to preserve personalized faculty mentorship. Currently, <strong>42 seats have been claimed</strong> and only 8 seats remain. If your seat confirmation of ₦20,000 is not finalized before the timer expires, your ₦200,000 scholarship discount will be surrendered to the next applicant on the waiting list.
                        </p>
                    </div>
                </div>

            </div>

        </div>

    </main>

    <!-- SUPPORT BANNER (WITH ODUNAYO & FREEDOM) -->
    <section class="relative bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] text-slate-950 overflow-hidden border-b-8 border-[#003835]">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                <!-- Left: Headline & Support Contact Action -->
                <div class="md:col-span-7 space-y-4 text-center md:text-left">
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight">
                        Need Help? Contact us
                    </h2>
                    <p class="text-sm sm:text-base font-semibold text-slate-900 font-sans">
                        For more enquiries reach out to us. Available 24/7
                    </p>

                    <!-- Contact Cards (Odunayo Prioritized) -->
                    <div class="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                        
                        <!-- Odunayo (Lead Admissions Advisor - Prioritized) -->
                        <div class="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-[#005f5a] shadow-lg text-left flex items-center gap-3 relative">
                            <div class="relative">
                                <img src="assets/images/odunayo_support.jpg" alt="Odunayo - Lead Admissions Advisor" class="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm">
                                <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                            </div>
                            <div>
                                <div class="flex items-center gap-1.5">
                                    <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Lead Advisor</span>
                                    <span class="text-[10px] text-slate-500 font-semibold hidden sm:inline">Fast Response</span>
                                </div>
                                <span class="block text-sm sm:text-base font-black text-slate-950 mt-0.5">Odunayo</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <a href="https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 rounded-md shadow-sm transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        WhatsApp
                                    </a>
                                    <a href="tel:+2347019602639" class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md border border-slate-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"></path></svg>
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Freedom (Student Support Lead) -->
                        <div class="bg-white/95 rounded-2xl p-3.5 sm:p-4 border border-amber-600/30 shadow-md text-left flex items-center gap-3">
                            <div class="relative">
                                <img src="assets/images/freedom_support.jpg" alt="Freedom - Student Support Lead" class="w-12 h-12 rounded-full object-cover border-2 border-slate-300 shadow-sm">
                                <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                            </div>
                            <div>
                                <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Student Support Lead</span>
                                <span class="block text-sm sm:text-base font-black text-slate-900 mt-0.5">Freedom</span>
                                <div class="flex items-center gap-2 mt-1">
                                    <a href="https://wa.me/2348053708909?text=Hello%20Freedom%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        WhatsApp
                                    </a>
                                    <a href="tel:+2348053708909" class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md border border-slate-300 transition-colors">
                                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"></path></svg>
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Right: Large Authentic Portrait Card of Odunayo -->
                <div class="md:col-span-5 flex justify-center md:justify-end">
                    <div class="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#003835] group">
                        <img src="assets/images/odunayo_support.jpg" alt="Odunayo - Newton Academy Lead Admissions Advisor" class="w-full h-auto object-cover max-h-80 sm:max-h-96">
                        <div class="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-amber-400/40 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-white">
                            <div>
                                <span class="block text-xs font-bold text-white">Odunayo</span>
                                <span class="block text-[10px] text-emerald-400 font-medium">Lead Admissions Advisor</span>
                            </div>
                            <span class="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-300 font-bold bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/30">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                24/7 Active
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Clean Minimal Brand Footer -->
    <footer class="bg-[#003835] text-slate-300 py-8 border-t border-emerald-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-5 pb-5 border-b border-emerald-800/40 text-center sm:text-left">
                <!-- Logo -->
                <a href="index.php" class="inline-block">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-8 w-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>
                
                <!-- Quick Credentials -->
                <div class="text-xs text-slate-300 space-y-1">
                    <p class="font-bold text-white tracking-wide">Newton Academy Admissions Secretariat</p>
                    <p class="text-slate-400 font-sans">Official Email: <a href="mailto:na@newtoncore.com" class="text-teal-300 hover:underline">na@newtoncore.com</a></p>
                </div>
            </div>

            <div class="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
                <p>&copy; 2026 Newton Academy. All rights reserved.</p>
                <p class="font-mono text-emerald-400 font-bold">Newton OS Limited</p>
            </div>
        </div>
    </footer>

    <!-- Direct Bank Transfer Onboarding Logic -->
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('name') || "<?php echo addslashes($name); ?>";
        const userEmail = urlParams.get('email') || "<?php echo addslashes($email); ?>";
        const userPhone = urlParams.get('phone') || "<?php echo addslashes($phone); ?>";
        const programme = urlParams.get('programme') || urlParams.get('track') || "<?php echo addslashes($programme); ?>";
        const appId = urlParams.get('app_id') || "<?php echo addslashes($appId); ?>";

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

        const downloadPdfBtn = document.getElementById('downloadAwardPdfBtn');
        if (downloadPdfBtn) {
            downloadPdfBtn.href = 'api/download_award_letter.php?app_id=' + encodeURIComponent(appId) + '&name=' + encodeURIComponent(userName) + '&track=' + encodeURIComponent(programme);
        }

        // Copy Account Helper with instant feedback
        window.copyAccount = function(accountNumber, btn) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(accountNumber).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    btn.classList.add('bg-[#005f5a]', 'text-white');
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.remove('bg-[#005f5a]', 'text-white');
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

        // Bank Transfer WhatsApp Confirmation with Odunayo
        window.confirmBankTransfer = function() {
            const message = encodeURIComponent(
                `Hello Odunayo, I have completed my ₦20,000 Bank Transfer to Newton OS Limited.\n\n` +
                `• Candidate Name: ${userName}\n` +
                `• Email: ${userEmail}\n` +
                `• Track: ${programme}\n` +
                `• Reference ID: ${appId}\n\n` +
                `I am also signing up on academy.newtoncore.com/auth/register with my same name and email. Kindly verify my payment and approve my course access in the VIP Enrolled Fellows Room.`
            );
            window.location.href = `https://wa.me/2347019602639?text=${message}`;
        };

        // 24-Hour Urgency Countdown Timer (Updates top bar and inline notice)
        let timeRemaining = 23 * 3600 + 59 * 60 + 45;
        const topTimerEl = document.getElementById('topTimer');
        const timerTextEls = document.querySelectorAll('.timerText');

        setInterval(() => {
            if (timeRemaining <= 0) return;
            timeRemaining--;
            const hours = String(Math.floor(timeRemaining / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, '0');
            const seconds = String(timeRemaining % 60).padStart(2, '0');
            const formatted = `${hours}:${minutes}:${seconds}`;

            if (topTimerEl) topTimerEl.textContent = formatted;
            timerTextEls.forEach(el => el.textContent = formatted);
        }, 1000);
    </script>
    <script src="assets/js/animations.js"></script>

    <!-- FLOATING WHATSAPP BUTTON (ROUTED TO ODUNAYO) -->
    <a href="https://wa.me/2347019602639?text=Hello%20Odunayo%2C%20I%20need%20assistance%20with%20Newton%20Academy" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group" aria-label="Chat with Odunayo on WhatsApp">
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span class="sr-only">Support WhatsApp with Odunayo</span>
    </a>

</body>
</html>

<?php
require_once __DIR__ . '/config.php';

$reference = htmlspecialchars($_GET['reference'] ?? 'NA-PAY-' . strtoupper(substr(md5(time()), 0, 8)), ENT_QUOTES, 'UTF-8');
$name = htmlspecialchars($_GET['name'] ?? 'Fellow', ENT_QUOTES, 'UTF-8');
$programme = htmlspecialchars($_GET['programme'] ?? 'Flagship Professional Track', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admission Finalized & Fellow Onboarding | <?php echo ACADEMY_NAME; ?></title>
    <!-- Favicon & Social Meta -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <link rel="apple-touch-icon" href="assets/favicon.jpg">
    <meta property="og:image" content="assets/favicon.jpg">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                        serif: ['Newsreader', 'serif'],
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
        .brand-shadow {
            box-shadow: 0 20px 40px -15px rgba(0, 95, 90, 0.12);
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
<body class="bg-[#f1f5f9] text-[#1e293b] font-sans antialiased selection:bg-[#005f5a] selection:text-white min-h-screen flex flex-col justify-between">

    <!-- Header -->
    <header class="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
            <a href="index.php" class="flex items-center shrink-0">
                <img src="assets/logo.png" alt="<?php echo ACADEMY_NAME; ?>" class="h-8 sm:h-11 w-auto max-w-[135px] sm:max-w-none object-contain">
            </a>
            <span class="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                Enrollment Confirmed
            </span>
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-grow flex items-center w-full">
        <div class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 brand-shadow w-full">
            
            <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome to Newton Academy, <?php echo $name; ?>.
            </h1>

            <p class="text-sm sm:text-base text-slate-600 mt-2 font-sans leading-relaxed">
                Your admission fee has been verified and your fellowship record is officially active for <strong class="text-slate-900"><?php echo $programme; ?></strong>.
            </p>
            <p class="text-xs text-slate-400 font-mono mt-1">Receipt Reference: <?php echo $reference; ?></p>

            <!-- Action Card for Portal Sign Up & Course Approval -->
            <div class="my-8 bg-[#f0f9f8] border border-[#005f5a]/25 rounded-2xl p-6 sm:p-8">
                <span class="text-[11px] font-extrabold uppercase tracking-wider text-[#005f5a] bg-teal-100/70 border border-teal-200 px-3 py-1 rounded-full inline-block mb-3">
                    Immediate Action Required
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                    Two Steps to Activate Your Course &amp; Enter VIP Group
                </h3>
                
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-sans">
                    Your ₦20,000 admission fee is verified. To have your selected specialization provisioned on our student portal and gain access to the private cohort room, complete these 2 steps in order:
                </p>

                <!-- STEP 1: Sign Up on Portal -->
                <div class="bg-white border-2 border-amber-300 rounded-xl p-5 mb-5 shadow-sm">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">1</span>
                        <h4 class="font-bold text-slate-900 text-sm sm:text-base">
                            Create Your Student Account on the Portal
                        </h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                        Sign up by creating an account on our official academy portal so that your course of choice can be approved:
                    </p>
                    <div class="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 font-semibold mb-4 leading-relaxed">
                        ⚠️ <strong>IMPORTANT:</strong> You must sign up with the <u>exact same email address</u> and <u>same full name</u> you used during admission. This ensures your course of choice is automatically matched and approved faster.
                    </div>
                    <a 
                        href="https://academy.newtoncore.com/auth/register" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 bg-[#005f5a] hover:bg-[#004d49] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shadow-[#005f5a]/20 transition-all cursor-pointer"
                    >
                        <span>Step 1: Sign Up at academy.newtoncore.com/auth/register</span>
                        <span>&rarr;</span>
                    </a>
                </div>

                <!-- STEP 2: Message Odunayo -->
                <div class="bg-white border-2 border-emerald-300 rounded-xl p-5 shadow-sm">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
                        <h4 class="font-bold text-slate-900 text-sm sm:text-base">
                            Message Odunayo on WhatsApp to Approve Your Course &amp; Enter VIP Group
                        </h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                        After creating your portal account, message <strong>Odunayo</strong> (Lead Admissions Advisor) on WhatsApp. She will verify your portal registration, approve your course enrollment, and grant you instant entry into the private <strong>VIP Enrolled Fellows WhatsApp Room</strong>.
                    </p>
                    <?php
                    $whatsappMsg = rawurlencode("Hello Odunayo, I have officially secured my seat for Newton Academy and created my portal account on academy.newtoncore.com!\n\n*Name:* {$name}\n*Track:* {$programme}\n*Reference:* {$reference}\n\nPlease approve my course of choice on the portal and add me to the private VIP Enrolled Fellows Room.");
                    ?>
                    <a 
                        id="odunayoWhatsAppBtn"
                        href="https://wa.me/2347019602639?text=<?php echo $whatsappMsg; ?>" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                        <span>Step 2: Message Odunayo on WhatsApp (+2347019602639)</span>
                        <span>&rarr;</span>
                    </a>
                </div>

            </div>

            <p class="text-xs text-slate-500">
                Need direct help with your registration? Contact Odunayo directly on WhatsApp:
                <a href="https://wa.me/2347019602639" target="_blank" class="text-[#005f5a] underline font-semibold ml-1">
                    +2347019602639
                </a>
            </p>

        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>&copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?>. All rights reserved.</p>
    </footer>

    <script src="assets/js/animations.js"></script>
</body>
</html>

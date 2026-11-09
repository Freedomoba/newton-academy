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
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Montserrat', 'Ubuntu', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] font-sans antialiased selection:bg-[#005f5a] selection:text-white min-h-screen flex flex-col justify-between">

    <!-- Header -->
    <header class="border-b border-slate-200 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <a href="index.php">
                <img src="assets/logo.png" alt="<?php echo ACADEMY_NAME; ?>" class="h-10 sm:h-12 w-auto object-contain">
            </a>
            <span class="text-xs font-semibold text-slate-500">
                Enrollment Confirmed
            </span>
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-grow flex items-center w-full">
        <div class="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 brand-shadow w-full">
            
            <span class="text-xs font-bold text-[#005f5a] uppercase tracking-widest block mb-1">
                Office of Fellow Onboarding
            </span>
            
            <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome to Newton Academy, <?php echo $name; ?>.
            </h1>

            <p class="text-sm sm:text-base text-slate-600 mt-2 font-sans leading-relaxed">
                Your admission fee has been verified and your fellowship record is officially active for <strong class="text-slate-900"><?php echo $programme; ?></strong>.
            </p>
            <p class="text-xs text-slate-400 font-mono mt-1">Receipt Reference: <?php echo $reference; ?></p>

            <!-- Action Card for LMS Activation -->
            <div class="my-8 bg-[#f0f9f8] border border-[#005f5a]/25 rounded-2xl p-6 sm:p-8">
                <h3 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2">
                    Required Final Step: Student LMS Account Activation
                </h3>
                
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-sans">
                    To have your learning portal provisioned and access your cohort syllabus, please complete the following steps immediately:
                </p>

                <ol class="space-y-3 text-xs sm:text-sm text-slate-800 list-decimal pl-5 leading-relaxed">
                    <li>
                        Click the button below to enter the <strong>Official Enrolled Fellows WhatsApp Room</strong>.
                    </li>
                    <li>
                        Once inside the room, locate and read the <strong>PINNED MESSAGE</strong> at the top of the chat.
                    </li>
                    <li>
                        Follow the pinned prompt to send in your <strong>Full Legal Name</strong>, <strong>Primary Email Address</strong>, and a screenshot or reference of your <strong>Payment Receipt</strong>.
                    </li>
                    <li>
                        The Admissions Officer will issue your unique LMS student portal credentials and cohort calendar within the hour.
                    </li>
                </ol>

                <div class="mt-8 text-center sm:text-left">
                    <a 
                        href="<?php echo WHATSAPP_VIP_ENROLLED_LINK; ?>" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-block bg-[#005f5a] hover:bg-[#004d49] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg shadow-[#005f5a]/25 transition-all cursor-pointer"
                    >
                        Join the Official Enrolled Fellows WhatsApp Room
                    </a>
                </div>
            </div>

            <p class="text-xs text-slate-500">
                If you encounter any administrative delays, you can reach our Admissions Helpdesk directly on WhatsApp:
                <a href="https://wa.me/<?php echo WHATSAPP_SUPPORT_PHONE; ?>" target="_blank" class="text-[#005f5a] underline font-semibold ml-1">
                    +<?php echo WHATSAPP_SUPPORT_PHONE; ?>
                </a>
            </p>

        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>&copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?>. All rights reserved.</p>
    </footer>

</body>
</html>

<?php
/**
 * Newton Academy - Admissions & Leads Management Dashboard
 * Secure, password-protected portal to monitor conference delegates,
 * scholarship applications, and verified enrolled fellows.
 */

require_once __DIR__ . '/config.php';

session_start();

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    unset($_SESSION['newton_admin_auth']);
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Handle Login Form
$loginError = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === (defined('ADMIN_PASSWORD') ? ADMIN_PASSWORD : 'Newton2026!')) {
        $_SESSION['newton_admin_auth'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $loginError = 'Invalid administrator password. Please try again.';
    }
}

// Check Authentication
$isAuthenticated = !empty($_SESSION['newton_admin_auth']);

// CSV Export Handler
if ($isAuthenticated && isset($_GET['export'])) {
    $exportType = $_GET['export'];
    $leadsDir = __DIR__ . '/data';
    
    $fileMap = [
        'conference' => ['file' => $leadsDir . '/optin_leads.csv', 'name' => 'conference_delegates_' . date('Y-m-d') . '.csv'],
        'scholarship' => ['file' => $leadsDir . '/scholarship_applications.csv', 'name' => 'scholarship_applicants_' . date('Y-m-d') . '.csv'],
        'enrolled' => ['file' => $leadsDir . '/enrolled_students.csv', 'name' => 'enrolled_fellows_' . date('Y-m-d') . '.csv']
    ];

    if (isset($fileMap[$exportType]) && file_exists($fileMap[$exportType]['file'])) {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $fileMap[$exportType]['name'] . '"');
        readfile($fileMap[$exportType]['file']);
        exit;
    }
}

// Helper to read CSV rows
function readCsvData($filePath) {
    if (!file_exists($filePath)) {
        return [];
    }
    $rows = [];
    if (($handle = fopen($filePath, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if ($header && count($header) === count($data)) {
                $rows[] = array_combine($header, $data);
            } else {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
    return array_reverse($rows); // Newest first
}

$leadsDir = __DIR__ . '/data';
$optinLeads = $isAuthenticated ? readCsvData($leadsDir . '/optin_leads.csv') : [];
$scholarshipApps = $isAuthenticated ? readCsvData($leadsDir . '/scholarship_applications.csv') : [];
$enrolledStudents = $isAuthenticated ? readCsvData($leadsDir . '/enrolled_students.csv') : [];

// Compute statistics
$totalDelegates = count($optinLeads);
$totalScholarships = count($scholarshipApps);
$totalPaid = count($enrolledStudents);
$totalRevenue = $totalPaid * SCHOLARSHIP_APPLICATION_FEE;

$trackDeCount = 0;
$trackDmCount = 0;
foreach ($scholarshipApps as $app) {
    $prog = $app['Programme'] ?? ($app[5] ?? '');
    if (strpos($prog, 'Entrepreneurship') !== false) $trackDeCount++;
    if (strpos($prog, 'Marketing') !== false) $trackDmCount++;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admissions & Leads Portal | <?php echo ACADEMY_NAME; ?></title>
    <!-- Favicon -->
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    },
                    colors: {
                        teal: {
                            50: '#f0fdfa',
                            700: '#008080',
                            800: '#006666',
                            900: '#004d4d',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen">

    <?php if (!$isAuthenticated): ?>
    <!-- LOGIN SCREEN -->
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl max-w-md w-full">
            <div class="text-center mb-8">
                <img src="assets/logo.png" alt="<?php echo ACADEMY_NAME; ?>" class="h-10 w-auto mx-auto object-contain mb-3">
                <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">Admissions Portal Login</h1>
                <p class="text-xs text-slate-500 mt-1">Authorized access for admissions directors only.</p>
            </div>

            <?php if ($loginError): ?>
            <div class="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                <?php echo htmlspecialchars($loginError); ?>
            </div>
            <?php endif; ?>

            <form method="POST" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Administrator Password
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        placeholder="Enter admin password"
                        class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                    >
                </div>
                <button 
                    type="submit" 
                    class="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md transition-all cursor-pointer"
                >
                    Authenticate & Access Dashboard
                </button>
            </form>
            <p class="text-[11px] text-slate-400 text-center mt-6">Configured in config.php (ADMIN_PASSWORD)</p>
        </div>
    </div>

    <?php else: ?>
    <!-- AUTHENTICATED DASHBOARD -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="assets/logo.png" alt="<?php echo ACADEMY_NAME; ?>" class="h-9 w-auto object-contain">
                <span class="text-xs font-bold text-slate-500 pl-3 border-l border-slate-200 hidden sm:inline-block">Admissions Control Desk</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-xs text-slate-500 font-medium">Signed in as Administrator</span>
                <a href="admin.php?action=logout" class="text-xs font-bold text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 px-3 py-1.5 rounded-lg transition-colors">
                    Log Out
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Summary Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Conference Delegates</span>
                <span class="text-3xl font-extrabold text-slate-900 mt-1 block"><?php echo number_format($totalDelegates); ?></span>
                <span class="text-[11px] text-teal-700 font-medium mt-1 block">From Skills to Income Opt-ins</span>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Scholarship Applications</span>
                <span class="text-3xl font-extrabold text-slate-900 mt-1 block"><?php echo number_format($totalScholarships); ?></span>
                <span class="text-[11px] text-slate-500 mt-1 block"><?php echo $trackDeCount; ?> DE track &bull; <?php echo $trackDmCount; ?> DM track</span>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Verified Enrolled Fellows</span>
                <span class="text-3xl font-extrabold text-emerald-600 mt-1 block"><?php echo number_format($totalPaid); ?></span>
                <span class="text-[11px] text-emerald-700 font-medium mt-1 block">₦20,000 Application Fee Confirmed</span>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Fees Collected</span>
                <span class="text-3xl font-extrabold text-[#008080] mt-1 block">₦<?php echo number_format($totalRevenue); ?></span>
                <span class="text-[11px] text-slate-500 mt-1 block">Verified via Paystack / Bank</span>
            </div>
        </div>

        <!-- Tabbed Tables -->
        <div class="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden" x-data="{ tab: 'delegates' }">
            
            <!-- Table Header Bar -->
            <div class="border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <button 
                        onclick="showTab('delegates')" 
                        id="tab-btn-delegates"
                        class="px-4 py-2 text-xs font-bold rounded-xl bg-[#008080] text-white transition-all cursor-pointer"
                    >
                        Conference Delegates (<?php echo $totalDelegates; ?>)
                    </button>
                    <button 
                        onclick="showTab('scholarships')" 
                        id="tab-btn-scholarships"
                        class="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                    >
                        Scholarship Applicants (<?php echo $totalScholarships; ?>)
                    </button>
                    <button 
                        onclick="showTab('enrolled')" 
                        id="tab-btn-enrolled"
                        class="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                    >
                        Enrolled Fellows (<?php echo $totalPaid; ?>)
                    </button>
                </div>

                <!-- Export Action -->
                <div id="export-actions">
                    <a href="admin.php?export=conference" id="export-link" class="inline-flex items-center gap-2 text-xs font-bold text-[#008080] hover:text-[#006666] border border-[#008080]/30 hover:border-[#008080] px-3.5 py-2 rounded-xl transition-colors">
                        Download Delegates CSV
                    </a>
                </div>
            </div>

            <!-- Content Panel 1: Conference Delegates -->
            <div id="tab-delegates" class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Timestamp</th>
                            <th class="p-4">Full Name</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">WhatsApp Phone</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (empty($optinLeads)): ?>
                        <tr><td colspan="4" class="p-8 text-center text-slate-400">No conference delegates registered yet.</td></tr>
                        <?php else: foreach ($optinLeads as $lead): ?>
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($lead['Full Name'] ?? ($lead[1] ?? '-')); ?></td>
                            <td class="p-4 text-slate-700"><?php echo htmlspecialchars($lead['Email'] ?? ($lead[2] ?? '-')); ?></td>
                            <td class="p-4 font-mono text-[#008080] font-semibold"><?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></td>
                        </tr>
                        <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

            <!-- Content Panel 2: Scholarship Applications -->
            <div id="tab-scholarships" class="overflow-x-auto hidden">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Application ID</th>
                            <th class="p-4">Candidate Name</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">WhatsApp</th>
                            <th class="p-4">Selected Programme</th>
                            <th class="p-4">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (empty($scholarshipApps)): ?>
                        <tr><td colspan="6" class="p-8 text-center text-slate-400">No scholarship applications submitted yet.</td></tr>
                        <?php else: foreach ($scholarshipApps as $app): ?>
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500 font-bold"><?php echo htmlspecialchars($app['Application ID'] ?? ($app[1] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($app['Full Name'] ?? ($app[2] ?? '-')); ?></td>
                            <td class="p-4 text-slate-700"><?php echo htmlspecialchars($app['Email'] ?? ($app[3] ?? '-')); ?></td>
                            <td class="p-4 font-mono"><?php echo htmlspecialchars($app['Phone'] ?? ($app[4] ?? '-')); ?></td>
                            <td class="p-4 font-semibold text-[#008080]"><?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?></td>
                            <td class="p-4"><span class="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-bold">Pending</span></td>
                        </tr>
                        <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

            <!-- Content Panel 3: Enrolled Fellows -->
            <div id="tab-enrolled" class="overflow-x-auto hidden">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Timestamp</th>
                            <th class="p-4">Payment Reference</th>
                            <th class="p-4">Fellow Name</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">Enrolled Track</th>
                            <th class="p-4">Amount Paid</th>
                            <th class="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (empty($enrolledStudents)): ?>
                        <tr><td colspan="7" class="p-8 text-center text-slate-400">No verified fellows recorded yet.</td></tr>
                        <?php else: foreach ($enrolledStudents as $enrolled): ?>
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($enrolled['Timestamp'] ?? ($enrolled[0] ?? '-')); ?></td>
                            <td class="p-4 font-mono font-bold text-emerald-700"><?php echo htmlspecialchars($enrolled['Reference'] ?? ($enrolled[1] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($enrolled['Full Name'] ?? ($enrolled[3] ?? '-')); ?></td>
                            <td class="p-4 text-slate-700"><?php echo htmlspecialchars($enrolled['Email'] ?? ($enrolled[4] ?? '-')); ?></td>
                            <td class="p-4 font-semibold text-[#008080]"><?php echo htmlspecialchars($enrolled['Programme'] ?? ($enrolled[5] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-slate-900">₦<?php echo number_format((float)($enrolled['Amount Paid'] ?? ($enrolled[6] ?? 20000))); ?></td>
                            <td class="p-4"><span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">Verified & Enrolled</span></td>
                        </tr>
                        <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

        </div>

    </main>

    <script>
        function showTab(tabName) {
            const tabs = ['delegates', 'scholarships', 'enrolled'];
            tabs.forEach(t => {
                document.getElementById('tab-' + t).classList.add('hidden');
                document.getElementById('tab-btn-' + t).className = 'px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer';
            });

            document.getElementById('tab-' + tabName).classList.remove('hidden');
            document.getElementById('tab-btn-' + tabName).className = 'px-4 py-2 text-xs font-bold rounded-xl bg-[#008080] text-white transition-all cursor-pointer';

            const exportMap = {
                'delegates': { url: 'admin.php?export=conference', label: 'Download Delegates CSV' },
                'scholarships': { url: 'admin.php?export=scholarship', label: 'Download Scholarship CSV' },
                'enrolled': { url: 'admin.php?export=enrolled', label: 'Download Enrolled CSV' }
            };

            const link = document.getElementById('export-link');
            link.href = exportMap[tabName].url;
            link.textContent = exportMap[tabName].label;
        }
    </script>
    <?php endif; ?>

</body>
</html>


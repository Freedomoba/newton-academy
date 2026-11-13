<?php
/**
 * Newton Academy - Admissions & Leads Management Dashboard
 * Fully Mobile-Responsive (App-style Cards on Phone, Full Table on Desktop)
 * Automatic Email Deduplication ("Clean Duplicates" Leaves Exactly 1 Unique Record)
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

$isAuthenticated = !empty($_SESSION['newton_admin_auth']);
$leadsDir = __DIR__ . '/data';
$alertMessage = '';
$alertType = 'success';

// Helper to write CSV rows safely
function writeCsvData($filePath, $header, $rows) {
    if (($handle = fopen($filePath, 'w')) !== false) {
        if (!empty($header)) {
            fputcsv($handle, $header);
        }
        foreach ($rows as $row) {
            fputcsv($handle, $row);
        }
        fclose($handle);
        return true;
    }
    return false;
}

// Helper to purge duplicate emails from a CSV file on disk (leaves exactly ONE unique record - the latest one)
function cleanDuplicatesFromDisk($filePath, $emailKey = 'Email', $emailIndex = 2) {
    if (!file_exists($filePath)) {
        return 0;
    }
    $header = [];
    $rows = [];
    if (($handle = fopen($filePath, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if (!empty($data)) {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
    if (empty($rows)) {
        return 0;
    }

    $emailCol = $emailIndex;
    if (!empty($header)) {
        foreach ($header as $idx => $colName) {
            if (strcasecmp(trim($colName), $emailKey) === 0) {
                $emailCol = $idx;
                break;
            }
        }
    }

    $uniqueRows = [];
    $seenEmails = [];
    $duplicatesCount = 0;

    // Loop newest to oldest (so we keep the latest entry)
    $reversed = array_reverse($rows);
    foreach ($reversed as $row) {
        $rawEmail = $row[$emailCol] ?? '';
        $email = strtolower(trim($rawEmail));
        if (!empty($email)) {
            if (isset($seenEmails[$email])) {
                $duplicatesCount++;
                continue; // Skip duplicate, keeping only the first seen (which is newest)
            }
            $seenEmails[$email] = true;
            $uniqueRows[] = $row;
        } else {
            $uniqueRows[] = $row;
        }
    }

    $finalRows = array_reverse($uniqueRows);
    writeCsvData($filePath, $header, $finalRows);
    return $duplicatesCount;
}

// Helper to delete a specific entry by email
function deleteEmailFromDisk($filePath, $targetEmail, $emailKey = 'Email', $emailIndex = 2) {
    if (!file_exists($filePath) || empty($targetEmail)) {
        return 0;
    }
    $header = [];
    $rows = [];
    if (($handle = fopen($filePath, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if (!empty($data)) {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }

    $emailCol = $emailIndex;
    if (!empty($header)) {
        foreach ($header as $idx => $colName) {
            if (strcasecmp(trim($colName), $emailKey) === 0) {
                $emailCol = $idx;
                break;
            }
        }
    }

    $filtered = [];
    $deletedCount = 0;
    $targetNorm = strtolower(trim($targetEmail));

    foreach ($rows as $row) {
        $rowEmail = strtolower(trim($row[$emailCol] ?? ''));
        if ($rowEmail === $targetNorm) {
            $deletedCount++;
        } else {
            $filtered[] = $row;
        }
    }

    if ($deletedCount > 0) {
        writeCsvData($filePath, $header, $filtered);
    }
    return $deletedCount;
}

// Handle Actions (Clean Duplicates / Delete Row)
if ($isAuthenticated && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'clean_duplicates') {
        $delDupes = cleanDuplicatesFromDisk($leadsDir . '/optin_leads.csv', 'Email', 2);
        $schDupes = cleanDuplicatesFromDisk($leadsDir . '/scholarship_applications.csv', 'Email', 3);
        $totalCleaned = $delDupes + $schDupes;
        
        if ($totalCleaned > 0) {
            $alertMessage = "Cleaned {$totalCleaned} duplicate record(s) automatically! Kept exactly 1 unique record per email on disk.";
            $alertType = 'success';
        } else {
            $alertMessage = "Database is already clean. Every email record is 100% unique.";
            $alertType = 'info';
        }
    } elseif ($_POST['action'] === 'delete_single' && !empty($_POST['target_email']) && !empty($_POST['target_table'])) {
        $targetEmail = $_POST['target_email'];
        $targetTable = $_POST['target_table'];
        $file = $targetTable === 'conference' ? $leadsDir . '/optin_leads.csv' : $leadsDir . '/scholarship_applications.csv';
        $emailIdx = $targetTable === 'conference' ? 2 : 3;
        $deleted = deleteEmailFromDisk($file, $targetEmail, 'Email', $emailIdx);

        if ($deleted > 0) {
            $alertMessage = "Deleted record for {$targetEmail} successfully.";
            $alertType = 'success';
        } else {
            $alertMessage = "Record not found.";
            $alertType = 'error';
        }
    }
}

// CSV Export Handler
if ($isAuthenticated && isset($_GET['export'])) {
    $exportType = $_GET['export'];
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
    if (!file_exists($filePath)) return [];
    $rows = [];
    if (($handle = fopen($filePath, 'r')) !== false) {
        $header = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== false) {
            if (empty($data)) continue;
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

// Count duplicates for reporting
function countDuplicates($rows, $emailKey, $emailCol) {
    $seen = [];
    $dupes = 0;
    foreach ($rows as $r) {
        $email = strtolower(trim($r[$emailKey] ?? ($r[$emailCol] ?? '')));
        if (!empty($email)) {
            if (isset($seen[$email])) $dupes++;
            else $seen[$email] = true;
        }
    }
    return $dupes;
}

$optinLeads = $isAuthenticated ? readCsvData($leadsDir . '/optin_leads.csv') : [];
$scholarshipApps = $isAuthenticated ? readCsvData($leadsDir . '/scholarship_applications.csv') : [];
$enrolledStudents = $isAuthenticated ? readCsvData($leadsDir . '/enrolled_students.csv') : [];

$optinDuplicatesCount = countDuplicates($optinLeads, 'Email', 2);
$scholarshipDuplicatesCount = countDuplicates($scholarshipApps, 'Email', 3);
$totalDuplicatesDetected = $optinDuplicatesCount + $scholarshipDuplicatesCount;

$totalDelegates = count($optinLeads);
$totalScholarships = count($scholarshipApps);
$totalPaid = count($enrolledStudents);
$totalRevenue = $totalPaid * SCHOLARSHIP_APPLICATION_FEE;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admissions & Leads Portal | <?php echo ACADEMY_NAME; ?></title>
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
        .font-heading { font-family: 'Cabinet Grotesk', sans-serif; }
    </style>
    <script src="assets/js/chart.umd.min.js"></script>
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] min-h-screen flex flex-col antialiased">

<?php if (!$isAuthenticated): ?>
    <!-- LOGIN INTERFACE (Optimized for Mobile Screens) -->
    <div class="flex-1 flex items-center justify-center p-4">
        <div class="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div class="bg-[#003835] p-6 text-center text-white">
                <a href="index.html" class="inline-block mb-3">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-9 w-auto mx-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>
                <h1 class="text-lg sm:text-xl font-bold font-heading">Admissions &amp; Leads Portal</h1>
                <p class="text-xs text-emerald-200/90 mt-1">Authorized Executive Access Only</p>
            </div>
            
            <form method="POST" action="admin.php" class="p-5 sm:p-8 space-y-4">
                <?php if ($loginError): ?>
                    <div class="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-medium">
                        <?php echo htmlspecialchars($loginError); ?>
                    </div>
                <?php endif; ?>

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Administrator Password</label>
                    <input type="password" name="password" required autofocus placeholder="Enter password" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none text-sm transition-all">
                </div>

                <button type="submit" class="w-full bg-[#005f5a] hover:bg-[#004d49] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm tracking-wide active:scale-95">
                    Authenticate &amp; Access Portal
                </button>
            </form>
            <div class="bg-slate-50 px-6 py-4 text-center border-t border-slate-100 text-[11px] text-slate-400">
                &copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?> &bull; Internal Systems
            </div>
        </div>
    </div>

<?php else: ?>
    <!-- AUTHENTICATED DASHBOARD (Mobile App-style Layout) -->
    <header class="bg-[#003835] text-white border-b border-emerald-900/50 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <a href="index.html" class="flex items-center">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-7 sm:h-8 w-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>
                <span class="text-[10px] sm:text-xs uppercase tracking-widest text-emerald-300 font-bold bg-white/10 px-2 py-0.5 rounded-full">
                    Admin
                </span>
            </div>
            <div class="flex items-center gap-2">
                <a href="index.html" target="_blank" class="text-[11px] sm:text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-white/10">
                    Live Site
                </a>
                <a href="admin.php?action=logout" class="text-[11px] sm:text-xs text-rose-300 hover:text-rose-100 bg-rose-500/20 px-2.5 py-1 rounded font-bold border border-rose-500/30">
                    Logout
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex-1 space-y-4 sm:space-y-6">

        <?php if ($alertMessage): ?>
            <div class="p-3.5 sm:p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm <?php echo $alertType === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : ($alertType === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'bg-rose-50 text-rose-800 border border-rose-200'); ?>">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full <?php echo $alertType === 'success' ? 'bg-emerald-500' : ($alertType === 'info' ? 'bg-blue-500' : 'bg-rose-500'); ?>"></span>
                    <span><?php echo htmlspecialchars($alertMessage); ?></span>
                </div>
                <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 text-sm ml-2">&times;</button>
            </div>
        <?php endif; ?>

        <!-- MOBILE-RESPONSIVE STATS (2 cols on phone, 4 on desktop) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div class="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delegates</div>
                <div class="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-0.5"><?php echo number_format($totalDelegates); ?></div>
                <div class="text-[10px] text-slate-500"><?php echo $optinDuplicatesCount; ?> dupes</div>
            </div>

            <div class="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scholarships</div>
                <div class="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-0.5"><?php echo number_format($totalScholarships); ?></div>
                <div class="text-[10px] text-slate-500"><?php echo $scholarshipDuplicatesCount; ?> dupes</div>
            </div>

            <div class="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Enrolled</div>
                <div class="text-xl sm:text-2xl font-black text-emerald-600 font-heading mt-0.5"><?php echo number_format($totalPaid); ?></div>
                <div class="text-[10px] text-emerald-600 font-bold">100% Verified</div>
            </div>

            <div class="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div class="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fee Pool</div>
                <div class="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-0.5">₦<?php echo number_format($totalRevenue); ?></div>
                <div class="text-[10px] text-slate-500">₦<?php echo number_format(SCHOLARSHIP_APPLICATION_FEE); ?> / seat</div>
            </div>
        </div>

        
        <!-- PERFORMANCE & TRAFFIC ANALYTICS (CLICKS, FLOWS, DIRECTIONS & PLACES) -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                    <h2 class="text-sm sm:text-base font-bold text-slate-900 font-heading">Clicks, Funnel Flows &amp; Traffic Attribution</h2>
                </div>
                <div class="text-[11px] text-slate-500 font-medium hidden sm:block">
                    Attribution by Direction &amp; Geographic Place Name
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                <!-- Card 1: Clicks & Funnel Flows -->
                <div class="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <div class="space-y-2">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Funnel Clicks &amp; Conversion Flow</h3>
                                <p class="text-[11px] text-slate-500">Impressions &rarr; Opt-ins &rarr; Scholarship Briefings &rarr; Applications &rarr; Enrolled</p>
                            </div>
                            <span id="funnelConversionRateBadge" class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                                0% Conversion
                            </span>
                        </div>

                        <!-- Funnel Stage Progression Badges -->
                        <div class="grid grid-cols-5 gap-1.5 pt-2 text-center text-[10px] font-bold">
                            <div class="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                                <span class="block text-slate-400 font-normal">1. Clicks</span>
                                <span id="flowVisits" class="text-slate-900 font-mono">0</span>
                            </div>
                            <div class="bg-teal-50 p-1.5 rounded-lg border border-teal-200 text-[#005f5a]">
                                <span class="block text-teal-600 font-normal">2. Opt-ins</span>
                                <span id="flowOptins" class="font-mono"><?php echo $totalDelegates; ?></span>
                            </div>
                            <div class="bg-amber-50 p-1.5 rounded-lg border border-amber-200 text-amber-900">
                                <span class="block text-amber-600 font-normal">3. Briefing</span>
                                <span id="flowBriefing" class="font-mono">0</span>
                            </div>
                            <div class="bg-indigo-50 p-1.5 rounded-lg border border-indigo-200 text-indigo-900">
                                <span class="block text-indigo-600 font-normal">4. Applied</span>
                                <span id="flowApplied" class="font-mono"><?php echo $totalScholarships; ?></span>
                            </div>
                            <div class="bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 text-emerald-900">
                                <span class="block text-emerald-600 font-normal">5. Enrolled</span>
                                <span id="flowEnrolled" class="font-mono"><?php echo $totalPaid; ?></span>
                            </div>
                        </div>
                    </div>

                    <!-- Chart Canvas -->
                    <div class="mt-4 relative h-56 sm:h-64">
                        <canvas id="funnelFlowChart"></canvas>
                    </div>
                </div>

                <!-- Card 2: Traffic Directions / Sources -->
                <div class="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <div>
                                <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Traffic Directions</h3>
                                <p class="text-[11px] text-slate-500">Incoming channel attribution (WhatsApp, Meta, Direct, etc.)</p>
                            </div>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                Channels
                            </span>
                        </div>
                        <div class="relative h-48 sm:h-52 flex items-center justify-center">
                            <canvas id="trafficDirectionsChart"></canvas>
                        </div>
                    </div>

                    <!-- Legend Pills -->
                    <div id="directionLegendPills" class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mt-2 text-[10px]"></div>
                </div>

                <!-- Card 3: Leads by Places & Cities -->
                <div class="lg:col-span-12 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                            <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Leads by Places &amp; Cities</h3>
                            <p class="text-[11px] text-slate-500">Real geographic distribution of recorded leads with verified place names</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Place:</span>
                            <span id="topPlaceBadge" class="px-2.5 py-1 rounded-full text-xs font-black bg-teal-50 text-[#005f5a] border border-teal-200">
                                -
                            </span>
                        </div>
                    </div>

                    <div class="relative h-60 sm:h-72">
                        <canvas id="leadsByPlacesChart"></canvas>
                    </div>
                </div>

            </div>
        </div>

        <!-- DEDUPLICATION CLEAN ACTION BAR -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full <?php echo $totalDuplicatesDetected > 0 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'; ?>"></span>
                    <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Delete Duplicate Emails</h3>
                </div>
                <p class="text-[11px] sm:text-xs text-slate-500">
                    <?php if ($totalDuplicatesDetected > 0): ?>
                        <strong class="text-amber-600"><?php echo $totalDuplicatesDetected; ?> duplicate email(s) found.</strong> Click to keep the latest record and delete all duplicate entries.
                    <?php else: ?>
                        <span class="text-emerald-700 font-semibold">Zero duplicate emails.</span> All data unique.
                    <?php endif; ?>
                </p>
            </div>

            <form method="POST" action="admin.php" onsubmit="return confirm('Permanently delete all duplicate emails? Only ONE newest record per person will remain on disk.');" class="shrink-0">
                <input type="hidden" name="action" value="clean_duplicates">
                <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm <?php echo $totalDuplicatesDetected > 0 ? 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'; ?>">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span>Delete Duplicates (<?php echo $totalDuplicatesDetected; ?>)</span>
                </button>
            </form>
        </div>

        <!-- MAIN DATA CONTAINER -->
        <div class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            
            <!-- Controls Bar -->
            <div class="p-3 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto text-[11px] sm:text-xs">
                    <button onclick="switchTab('delegates')" id="tabBtn-delegates" class="flex-1 py-1.5 px-3 rounded-lg font-bold bg-white text-[#005f5a] shadow-sm transition-all whitespace-nowrap">
                        Delegates (<?php echo $totalDelegates; ?>)
                    </button>
                    <button onclick="switchTab('scholarships')" id="tabBtn-scholarships" class="flex-1 py-1.5 px-3 rounded-lg font-bold text-slate-500 hover:text-slate-800 transition-all whitespace-nowrap">
                        Scholarships (<?php echo $totalScholarships; ?>)
                    </button>
                    <button onclick="switchTab('enrolled')" id="tabBtn-enrolled" class="flex-1 py-1.5 px-3 rounded-lg font-bold text-slate-500 hover:text-slate-800 transition-all whitespace-nowrap">
                        Enrolled (<?php echo $totalPaid; ?>)
                    </button>
                </div>

                <a href="admin.php?export=conference" id="export-link" class="text-center text-xs font-bold text-[#005f5a] border border-[#005f5a]/30 hover:bg-teal-50 px-3.5 py-2 rounded-xl transition-colors">
                    Download CSV
                </a>
            </div>

            <!-- TAB 1: DELEGATES -->
            <div id="tab-delegates">
                <!-- Phone App-style Cards (Visible on mobile screens) -->
                <div class="block sm:hidden divide-y divide-slate-100">
                    <?php if (empty($optinLeads)): ?>
                        <div class="p-6 text-center text-xs text-slate-400">No conference delegates registered yet.</div>
                    <?php else: foreach ($optinLeads as $lead): 
                        $leadEmail = $lead['Email'] ?? ($lead[2] ?? '');
                    ?>
                        <div class="p-3.5 space-y-2">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <h4 class="font-bold text-slate-900 text-sm"><?php echo htmlspecialchars($lead['Full Name'] ?? ($lead[1] ?? '-')); ?></h4>
                                    <div class="text-xs text-slate-600 font-mono break-all"><?php echo htmlspecialchars($leadEmail); ?></div>
                                </div>
                                <form method="POST" action="admin.php" onsubmit="return confirm('Delete <?php echo htmlspecialchars($leadEmail); ?>?');" class="shrink-0">
                                    <input type="hidden" name="action" value="delete_single">
                                    <input type="hidden" name="target_table" value="conference">
                                    <input type="hidden" name="target_email" value="<?php echo htmlspecialchars($leadEmail); ?>">
                                    <button type="submit" class="text-rose-600 bg-rose-50 border border-rose-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">Delete</button>
                                </form>
                            </div>
                            <div class="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">📍 <?php echo htmlspecialchars($lead['Location'] ?? ($lead[6] ?? 'Lagos, Nigeria')); ?></span>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-[#005f5a] border border-teal-200 font-bold">🔗 <?php echo htmlspecialchars($lead['Source'] ?? ($lead[5] ?? 'WhatsApp')); ?></span>
                            </div>
                            <div class="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                                <span>Phone: <?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></span>
                                <span><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></span>
                            </div>
                        </div>
                    <?php endforeach; endif; ?>
                </div>

                <!-- Desktop Table (Hidden on mobile screens) -->
                <div class="hidden sm:block overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-3.5">Timestamp</th>
                                <th class="p-3.5">Full Name</th>
                                <th class="p-3.5">Email</th>
                                <th class="p-3.5">Phone</th>
                                <th class="p-3.5">Place Name</th>
                                <th class="p-3.5">Direction</th>
                                <th class="p-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php foreach ($optinLeads as $lead): 
                                $leadEmail = $lead['Email'] ?? ($lead[2] ?? '');
                            ?>
                            <tr class="hover:bg-slate-50/70">
                                <td class="p-3.5 font-mono text-slate-500 text-[11px]"><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></td>
                                <td class="p-3.5 font-bold text-slate-900"><?php echo htmlspecialchars($lead['Full Name'] ?? ($lead[1] ?? '-')); ?></td>
                                <td class="p-3.5 text-slate-600 font-mono"><?php echo htmlspecialchars($leadEmail); ?></td>
                                <td class="p-3.5 text-slate-600 font-mono"><?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">📍 <?php echo htmlspecialchars($lead['Location'] ?? ($lead[6] ?? 'Lagos, Nigeria')); ?></span></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-50 text-[#005f5a] border border-teal-200">🔗 <?php echo htmlspecialchars($lead['Source'] ?? ($lead[5] ?? 'WhatsApp')); ?></span></td>
                                <td class="p-3.5 text-right">
                                    <form method="POST" action="admin.php" onsubmit="return confirm('Delete <?php echo htmlspecialchars($leadEmail); ?>?');" class="inline">
                                        <input type="hidden" name="action" value="delete_single">
                                        <input type="hidden" name="target_table" value="conference">
                                        <input type="hidden" name="target_email" value="<?php echo htmlspecialchars($leadEmail); ?>">
                                        <button type="submit" class="text-rose-600 hover:text-rose-800 text-[11px] font-bold">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- TAB 2: SCHOLARSHIPS -->
            <div id="tab-scholarships" class="hidden">
                <!-- Mobile Phone Cards -->
                <div class="block sm:hidden divide-y divide-slate-100">
                    <?php if (empty($scholarshipApps)): ?>
                        <div class="p-6 text-center text-xs text-slate-400">No scholarship applications submitted yet.</div>
                    <?php else: foreach ($scholarshipApps as $app): 
                        $appEmail = $app['Email'] ?? ($app[3] ?? '');
                    ?>
                        <div class="p-3.5 space-y-2">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <div class="text-[10px] font-mono font-bold text-[#005f5a]"><?php echo htmlspecialchars($app['Application ID'] ?? ($app[1] ?? '-')); ?></div>
                                    <h4 class="font-bold text-slate-900 text-sm"><?php echo htmlspecialchars($app['Full Name'] ?? ($app[2] ?? '-')); ?></h4>
                                    <div class="text-xs text-slate-600 font-mono break-all"><?php echo htmlspecialchars($appEmail); ?></div>
                                </div>
                                <form method="POST" action="admin.php" onsubmit="return confirm('Delete <?php echo htmlspecialchars($appEmail); ?>?');" class="shrink-0">
                                    <input type="hidden" name="action" value="delete_single">
                                    <input type="hidden" name="target_table" value="scholarship">
                                    <input type="hidden" name="target_email" value="<?php echo htmlspecialchars($appEmail); ?>">
                                    <button type="submit" class="text-rose-600 bg-rose-50 border border-rose-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">Delete</button>
                                </form>
                            </div>
                            <div class="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">📍 <?php echo htmlspecialchars($app['Location'] ?? ($app[9] ?? 'Lagos, Nigeria')); ?></span>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-[#005f5a] border border-teal-200 font-bold">🔗 <?php echo htmlspecialchars($app['Source'] ?? ($app[8] ?? 'WhatsApp')); ?></span>
                                <span class="px-2 py-0.5 rounded font-bold <?php echo strpos(($app['Programme'] ?? ($app[5] ?? '')), 'Entrepreneurship') !== false ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'; ?>">
                                    <?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?>
                                </span>
                            </div>
                            <div class="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                                <span>Phone: <?php echo htmlspecialchars($app['Phone'] ?? ($app[4] ?? '-')); ?></span>
                                <span><?php echo htmlspecialchars($app['Timestamp'] ?? ($app[0] ?? '-')); ?></span>
                            </div>
                        </div>
                    <?php endforeach; endif; ?>
                </div>

                <!-- Desktop Table -->
                <div class="hidden sm:block overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-3.5">Timestamp</th>
                                <th class="p-3.5">App ID</th>
                                <th class="p-3.5">Candidate</th>
                                <th class="p-3.5">Programme</th>
                                <th class="p-3.5">Place Name</th>
                                <th class="p-3.5">Direction</th>
                                <th class="p-3.5 text-center">Status</th>
                                <th class="p-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php foreach ($scholarshipApps as $app): 
                                $appEmail = $app['Email'] ?? ($app[3] ?? '');
                            ?>
                            <tr class="hover:bg-slate-50/70">
                                <td class="p-3.5 font-mono text-slate-500 text-[11px]"><?php echo htmlspecialchars($app['Timestamp'] ?? ($app[0] ?? '-')); ?></td>
                                <td class="p-3.5 font-mono font-bold text-[#005f5a]"><?php echo htmlspecialchars($app['Application ID'] ?? ($app[1] ?? '-')); ?></td>
                                <td class="p-3.5 font-bold text-slate-900"><?php echo htmlspecialchars($app['Full Name'] ?? ($app[2] ?? '-')); ?></td>
                                <td class="p-3.5"><span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800"><?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?></span></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">📍 <?php echo htmlspecialchars($app['Location'] ?? ($app[9] ?? 'Lagos, Nigeria')); ?></span></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-50 text-[#005f5a] border border-teal-200">🔗 <?php echo htmlspecialchars($app['Source'] ?? ($app[8] ?? 'WhatsApp')); ?></span></td>
                                <td class="p-3.5 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600"><?php echo htmlspecialchars($app['Payment Status'] ?? ($app[7] ?? 'Pending')); ?></span></td>
                                <td class="p-3.5 text-right">
                                    <form method="POST" action="admin.php" onsubmit="return confirm('Delete <?php echo htmlspecialchars($appEmail); ?>?');" class="inline">
                                        <input type="hidden" name="action" value="delete_single">
                                        <input type="hidden" name="target_table" value="scholarship">
                                        <input type="hidden" name="target_email" value="<?php echo htmlspecialchars($appEmail); ?>">
                                        <button type="submit" class="text-rose-600 hover:text-rose-800 text-[11px] font-bold">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- TAB 3: ENROLLED -->
            <div id="tab-enrolled" class="hidden">
                <div class="block sm:hidden divide-y divide-slate-100">
                    <?php if (empty($enrolledStudents)): ?>
                        <div class="p-6 text-center text-xs text-slate-400">No paid fellowship matriculations recorded yet.</div>
                    <?php else: foreach ($enrolledStudents as $enrolled): ?>
                        <div class="p-3.5 space-y-1.5">
                            <div class="flex items-center justify-between">
                                <span class="font-mono text-xs font-bold text-slate-900"><?php echo htmlspecialchars($enrolled['Payment Reference'] ?? ($enrolled[1] ?? '-')); ?></span>
                                <span class="font-bold text-emerald-600 text-xs">₦<?php echo number_format((float)($enrolled['Amount Paid'] ?? ($enrolled[2] ?? 0))); ?></span>
                            </div>
                            <div class="text-xs text-slate-600 font-mono break-all"><?php echo htmlspecialchars($enrolled['Customer Email'] ?? ($enrolled[3] ?? '-')); ?></div>
                            <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span><?php echo htmlspecialchars($enrolled['Timestamp'] ?? ($enrolled[0] ?? '-')); ?></span>
                                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Success</span>
                            </div>
                        </div>
                    <?php endforeach; endif; ?>
                </div>

                <div class="hidden sm:block overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-4">Enrolled At</th>
                                <th class="p-4">Reference</th>
                                <th class="p-4">Amount Paid</th>
                                <th class="p-4">Customer Email</th>
                                <th class="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php foreach ($enrolledStudents as $enrolled): ?>
                            <tr class="hover:bg-slate-50/70">
                                <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($enrolled['Timestamp'] ?? ($enrolled[0] ?? '-')); ?></td>
                                <td class="p-4 font-mono font-bold text-slate-900"><?php echo htmlspecialchars($enrolled['Payment Reference'] ?? ($enrolled[1] ?? '-')); ?></td>
                                <td class="p-4 font-bold text-emerald-600">₦<?php echo number_format((float)($enrolled['Amount Paid'] ?? ($enrolled[2] ?? 0))); ?></td>
                                <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($enrolled['Customer Email'] ?? ($enrolled[3] ?? '-')); ?></td>
                                <td class="p-4"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Success</span></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </main>

    <footer class="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>&copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?> &bull; Internal Admissions</p>
    </footer>

    <script>
        function switchTab(tabName) {
            document.getElementById('tab-delegates').classList.add('hidden');
            document.getElementById('tab-scholarships').classList.add('hidden');
            document.getElementById('tab-enrolled').classList.add('hidden');

            const activeClass = 'bg-white text-[#005f5a] shadow-sm';
            const inactiveClass = 'text-slate-500 hover:text-slate-800';
            
            const btnDelegates = document.getElementById('tabBtn-delegates');
            const btnScholarships = document.getElementById('tabBtn-scholarships');
            const btnEnrolled = document.getElementById('tabBtn-enrolled');
            const exportLink = document.getElementById('export-link');

            btnDelegates.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold transition-all whitespace-nowrap ' + inactiveClass;
            btnScholarships.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold transition-all whitespace-nowrap ' + inactiveClass;
            btnEnrolled.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold transition-all whitespace-nowrap ' + inactiveClass;

            if (tabName === 'delegates') {
                document.getElementById('tab-delegates').classList.remove('hidden');
                btnDelegates.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold transition-all whitespace-nowrap ' + activeClass;
                exportLink.href = 'admin.php?export=conference';
                exportLink.textContent = 'Download Delegates CSV';
            } else if (tabName === 'scholarships') {
                document.getElementById('tab-scholarships').classList.remove('hidden');
                btnScholarships.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold transition-all whitespace-nowrap ' + activeClass;
                exportLink.href = 'admin.php?export=scholarship';
                exportLink.textContent = 'Download Scholarships CSV';
            } else if (tabName === 'enrolled') {
                document.getElementById('tab-enrolled').classList.remove('hidden');
                btnEnrolled.className = 'flex-1 py-1.5 px-3 rounded-lg font-bold transition-all whitespace-nowrap ' + activeClass;
                exportLink.href = 'admin.php?export=enrolled';
                exportLink.textContent = 'Download Enrolled CSV';
            }
        }
    </script>
<?php endif; ?>

</body>
</html>

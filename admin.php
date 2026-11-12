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

$leadsDir = __DIR__ . '/data';
$alertMessage = '';
$alertType = 'success';

// Helper to write rows to CSV safely
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

// Helper to purge duplicate emails from a CSV file on disk
function purgeDuplicateEmailsFromDisk($filePath, $emailKey = 'Email', $emailIndex = 2) {
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
                continue; // Skip duplicate
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
        return false;
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

// Handle Purge Duplicates Action
if ($isAuthenticated && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'purge_duplicates') {
        $optinDuplicates = purgeDuplicateEmailsFromDisk($leadsDir . '/optin_leads.csv', 'Email', 2);
        $scholarshipDuplicates = purgeDuplicateEmailsFromDisk($leadsDir . '/scholarship_applications.csv', 'Email', 3);
        $totalPurged = $optinDuplicates + $scholarshipDuplicates;
        
        if ($totalPurged > 0) {
            $alertMessage = "Successfully removed and purged {$totalPurged} duplicate record(s) recognized by email from disk ({$optinDuplicates} delegate duplicates, {$scholarshipDuplicates} scholarship duplicates).";
            $alertType = 'success';
        } else {
            $alertMessage = "No duplicate email records found. Database is 100% clean and unique.";
            $alertType = 'info';
        }
    } elseif ($_POST['action'] === 'delete_single' && !empty($_POST['target_email']) && !empty($_POST['target_table'])) {
        $targetEmail = $_POST['target_email'];
        $targetTable = $_POST['target_table'];
        
        if ($targetTable === 'conference') {
            $deleted = deleteEmailFromDisk($leadsDir . '/optin_leads.csv', $targetEmail, 'Email', 2);
        } elseif ($targetTable === 'scholarship') {
            $deleted = deleteEmailFromDisk($leadsDir . '/scholarship_applications.csv', $targetEmail, 'Email', 3);
        } else {
            $deleted = 0;
        }

        if ($deleted > 0) {
            $alertMessage = "Deleted record for {$targetEmail} from {$targetTable} records.";
            $alertType = 'success';
        } else {
            $alertMessage = "Could not find record for {$targetEmail}.";
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

// Helper to read raw CSV rows
function readCsvData($filePath) {
    if (!file_exists($filePath)) {
        return [];
    }
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
function countDuplicatesInCsv($filePath, $emailKey = 'Email', $emailCol = 2) {
    if (!file_exists($filePath)) return 0;
    $rows = readCsvData($filePath);
    $seen = [];
    $dupCount = 0;
    foreach ($rows as $r) {
        $email = strtolower(trim($r[$emailKey] ?? ($r[$emailCol] ?? '')));
        if (!empty($email)) {
            if (isset($seen[$email])) {
                $dupCount++;
            } else {
                $seen[$email] = true;
            }
        }
    }
    return $dupCount;
}

$optinLeads = $isAuthenticated ? readCsvData($leadsDir . '/optin_leads.csv') : [];
$scholarshipApps = $isAuthenticated ? readCsvData($leadsDir . '/scholarship_applications.csv') : [];
$enrolledStudents = $isAuthenticated ? readCsvData($leadsDir . '/enrolled_students.csv') : [];

$optinDuplicatesCount = countDuplicatesInCsv($leadsDir . '/optin_leads.csv', 'Email', 2);
$scholarshipDuplicatesCount = countDuplicatesInCsv($leadsDir . '/scholarship_applications.csv', 'Email', 3);
$totalDuplicatesDetected = $optinDuplicatesCount + $scholarshipDuplicatesCount;

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
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-heading { font-family: 'Cabinet Grotesk', sans-serif; }
    </style>
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] min-h-screen flex flex-col">

<?php if (!$isAuthenticated): ?>
    <!-- LOGIN INTERFACE -->
    <div class="flex-1 flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div class="bg-[#003835] p-6 text-center text-white">
                <a href="index.html" class="inline-block mb-3">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-10 w-auto mx-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>
                <h1 class="text-xl font-bold font-heading">Admissions &amp; Leads Portal</h1>
                <p class="text-xs text-emerald-200/90 mt-1">Authorized Executive Access Only</p>
            </div>
            
            <form method="POST" action="admin.php" class="p-6 sm:p-8 space-y-4">
                <?php if ($loginError): ?>
                    <div class="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl font-medium">
                        <?php echo htmlspecialchars($loginError); ?>
                    </div>
                <?php endif; ?>

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Administrator Password</label>
                    <input type="password" name="password" required autofocus placeholder="Enter password" class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none text-sm transition-all">
                </div>

                <button type="submit" class="w-full bg-[#005f5a] hover:bg-[#004d49] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm tracking-wide">
                    Authenticate &amp; Access Portal
                </button>
            </form>
            <div class="bg-slate-50 px-6 py-4 text-center border-t border-slate-100 text-[11px] text-slate-400">
                &copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?> &bull; Internal Systems
            </div>
        </div>
    </div>

<?php else: ?>
    <!-- AUTHENTICATED DASHBOARD -->
    <header class="bg-[#003835] text-white border-b border-emerald-900/50 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <a href="index.html" class="flex items-center">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-8 w-auto object-contain brightness-0 invert" onerror="this.src='assets/images/logo.png'">
                </a>
                <span class="text-xs uppercase tracking-widest text-emerald-300 font-bold bg-white/10 px-2.5 py-1 rounded-full">
                    Executive Admin
                </span>
            </div>
            <div class="flex items-center gap-3">
                <a href="index.html" target="_blank" class="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                    View Live Site &rarr;
                </a>
                <a href="admin.php?action=logout" class="text-xs text-rose-300 hover:text-rose-100 bg-rose-500/20 hover:bg-rose-500/30 px-3.5 py-1.5 rounded-lg font-bold border border-rose-500/30 transition-colors">
                    Logout
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">

        <?php if ($alertMessage): ?>
            <div class="p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-sm <?php echo $alertType === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : ($alertType === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'bg-rose-50 text-rose-800 border border-rose-200'); ?>">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full <?php echo $alertType === 'success' ? 'bg-emerald-500' : ($alertType === 'info' ? 'bg-blue-500' : 'bg-rose-500'); ?>"></span>
                    <span><?php echo htmlspecialchars($alertMessage); ?></span>
                </div>
                <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 text-sm">&times;</button>
            </div>
        <?php endif; ?>

        <!-- METRICS ROW -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Metric 1 -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-xl">
                    👥
                </div>
                <div>
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conference Delegates</div>
                    <div class="text-2xl font-black text-slate-900 font-heading"><?php echo number_format($totalDelegates); ?></div>
                    <div class="text-[10px] text-slate-500"><?php echo $optinDuplicatesCount; ?> duplicate(s) detected</div>
                </div>
            </div>

            <!-- Metric 2 -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
                    🎓
                </div>
                <div>
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scholarship Applicants</div>
                    <div class="text-2xl font-black text-slate-900 font-heading"><?php echo number_format($totalScholarships); ?></div>
                    <div class="text-[10px] text-slate-500"><?php echo $scholarshipDuplicatesCount; ?> duplicate(s) detected</div>
                </div>
            </div>

            <!-- Metric 3 -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                    💳
                </div>
                <div>
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified Enrolled (Paid)</div>
                    <div class="text-2xl font-black text-slate-900 font-heading"><?php echo number_format($totalPaid); ?></div>
                    <div class="text-[10px] text-emerald-600 font-bold">100% Verified Admissions</div>
                </div>
            </div>

            <!-- Metric 4 -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    ₦
                </div>
                <div>
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Application Fee Pool</div>
                    <div class="text-2xl font-black text-slate-900 font-heading">₦<?php echo number_format($totalRevenue); ?></div>
                    <div class="text-[10px] text-slate-500">₦<?php echo number_format(SCHOLARSHIP_APPLICATION_FEE); ?> per candidate</div>
                </div>
            </div>
        </div>

        <!-- DEDUPLICATION MANAGEMENT BAR -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="space-y-1 text-center sm:text-left">
                <div class="flex items-center gap-2 justify-center sm:justify-start">
                    <span class="w-2.5 h-2.5 rounded-full <?php echo $totalDuplicatesDetected > 0 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'; ?>"></span>
                    <h3 class="text-sm font-bold text-slate-900 font-heading">Database Email Deduplication Engine</h3>
                </div>
                <p class="text-xs text-slate-500">
                    <?php if ($totalDuplicatesDetected > 0): ?>
                        <strong class="text-amber-600"><?php echo $totalDuplicatesDetected; ?> duplicate email record(s)</strong> detected across your databases. Click the button to purge them and retain only the newest entry per person.
                    <?php else: ?>
                        <span class="text-emerald-700 font-semibold">Zero duplicate emails found.</span> All records are unique.
                    <?php endif; ?>
                </p>
            </div>

            <form method="POST" action="admin.php" onsubmit="return confirm('Are you sure you want to permanently delete all duplicate records recognized by email? The newest unique record for each person will be safely preserved.');" class="shrink-0">
                <input type="hidden" name="action" value="purge_duplicates">
                <button type="submit" class="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm <?php echo $totalDuplicatesDetected > 0 ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'; ?>">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span>Purge Duplicate Emails (<?php echo $totalDuplicatesDetected; ?>)</span>
                </button>
            </form>
        </div>

        <!-- MAIN DATA TABLE CONTAINER -->
        <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            
            <!-- Controls & Tab Nav -->
            <div class="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <!-- Tab Buttons -->
                <div class="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
                    <button onclick="switchTab('delegates')" id="tabBtn-delegates" class="flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg bg-white text-[#005f5a] shadow-sm transition-all">
                        Delegates (<?php echo $totalDelegates; ?>)
                    </button>
                    <button onclick="switchTab('scholarships')" id="tabBtn-scholarships" class="flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-all">
                        Scholarships (<?php echo $totalScholarships; ?>)
                    </button>
                    <button onclick="switchTab('enrolled')" id="tabBtn-enrolled" class="flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg text-slate-500 hover:text-slate-800 transition-all">
                        Enrolled Fellows (<?php echo $totalPaid; ?>)
                    </button>
                </div>

                <!-- Export Action -->
                <div id="export-actions">
                    <a href="admin.php?export=conference" id="export-link" class="inline-flex items-center gap-2 text-xs font-bold text-[#005f5a] hover:text-[#004d49] border border-[#005f5a]/30 hover:border-[#005f5a] px-3.5 py-2 rounded-xl transition-colors">
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
                            <th class="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (empty($optinLeads)): ?>
                        <tr><td colspan="5" class="p-8 text-center text-slate-400">No conference delegates registered yet.</td></tr>
                        <?php else: foreach ($optinLeads as $lead): 
                            $leadEmail = $lead['Email'] ?? ($lead[2] ?? '');
                        ?>
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($lead['Full Name'] ?? ($lead[1] ?? '-')); ?></td>
                            <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($leadEmail); ?></td>
                            <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></td>
                            <td class="p-4 text-right">
                                <form method="POST" action="admin.php" onsubmit="return confirm('Delete this delegate record (<?php echo htmlspecialchars($leadEmail); ?>)?');" class="inline">
                                    <input type="hidden" name="action" value="delete_single">
                                    <input type="hidden" name="target_table" value="conference">
                                    <input type="hidden" name="target_email" value="<?php echo htmlspecialchars($leadEmail); ?>">
                                    <button type="submit" class="text-rose-600 hover:text-rose-800 text-[11px] font-bold hover:underline">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

            <!-- Content Panel 2: Scholarship Applicants -->
            <div id="tab-scholarships" class="overflow-x-auto hidden">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Timestamp</th>
                            <th class="p-4">App ID</th>
                            <th class="p-4">Candidate</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">Phone</th>
                            <th class="p-4">Track</th>
                            <th class="p-4">Status</th>
                            <th class="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (empty($scholarshipApps)): ?>
                        <tr><td colspan="8" class="p-8 text-center text-slate-400">No scholarship applications submitted yet.</td></tr>
                        <?php else: foreach ($scholarshipApps as $app): 
                            $appEmail = $app['Email'] ?? ($app[3] ?? '');
                        ?>
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($app['Timestamp'] ?? ($app[0] ?? '-')); ?></td>
                            <td class="p-4 font-mono font-bold text-[#005f5a]"><?php echo htmlspecialchars($app['Application ID'] ?? ($app[1] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($app['Full Name'] ?? ($app[2] ?? '-')); ?></td>
                            <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($appEmail); ?></td>
                            <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($app['Phone'] ?? ($app[4] ?? '-')); ?></td>
                            <td class="p-4">
                                <span class="px-2.5 py-1 rounded-md text-[10px] font-bold <?php echo strpos(($app['Programme'] ?? ($app[5] ?? '')), 'Entrepreneurship') !== false ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'; ?>">
                                    <?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?>
                                </span>
                            </td>
                            <td class="p-4">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                    <?php echo htmlspecialchars($app['Payment Status'] ?? ($app[7] ?? 'Pending')); ?>
                                </span>
                            </td>
                            <td class="p-4 text-right">
                                <form method="POST" action="admin.php" onsubmit="return confirm('Delete this scholarship application (<?php echo htmlspecialchars($appEmail); ?>)?');" class="inline">
                                    <input type="hidden" name="action" value="delete_single">
                                    <input type="hidden" name="target_table" value="scholarship">
                                    <input type="hidden" name="target_email" value="<?php echo htmlspecialchars($appEmail); ?>">
                                    <button type="submit" class="text-rose-600 hover:text-rose-800 text-[11px] font-bold hover:underline">
                                        Delete
                                    </button>
                                </form>
                            </td>
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
                            <th class="p-4">Enrolled At</th>
                            <th class="p-4">Reference</th>
                            <th class="p-4">Amount Paid</th>
                            <th class="p-4">Customer Email</th>
                            <th class="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <?php if (empty($enrolledStudents)): ?>
                        <tr><td colspan="5" class="p-8 text-center text-slate-400">No paid fellowship matriculations recorded yet.</td></tr>
                        <?php else: foreach ($enrolledStudents as $enrolled): ?>
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($enrolled['Timestamp'] ?? ($enrolled[0] ?? '-')); ?></td>
                            <td class="p-4 font-mono font-bold text-slate-900"><?php echo htmlspecialchars($enrolled['Payment Reference'] ?? ($enrolled[1] ?? '-')); ?></td>
                            <td class="p-4 font-bold text-emerald-600">₦<?php echo number_format((float)($enrolled['Amount Paid'] ?? ($enrolled[2] ?? 0))); ?></td>
                            <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($enrolled['Customer Email'] ?? ($enrolled[3] ?? '-')); ?></td>
                            <td class="p-4">
                                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                    <?php echo htmlspecialchars($enrolled['Status'] ?? ($enrolled[4] ?? 'Success')); ?>
                                </span>
                            </td>
                        </tr>
                        <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

        </div>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>&copy; <?php echo date('Y'); ?> <?php echo ACADEMY_NAME; ?> &bull; Admissions &amp; Enterprise Operations</p>
    </footer>

    <script>
        function switchTab(tabName) {
            // Hide all tabs
            document.getElementById('tab-delegates').classList.add('hidden');
            document.getElementById('tab-scholarships').classList.add('hidden');
            document.getElementById('tab-enrolled').classList.add('hidden');

            // Reset buttons
            const activeClass = 'bg-white text-[#005f5a] shadow-sm';
            const inactiveClass = 'text-slate-500 hover:text-slate-800';
            
            const btnDelegates = document.getElementById('tabBtn-delegates');
            const btnScholarships = document.getElementById('tabBtn-scholarships');
            const btnEnrolled = document.getElementById('tabBtn-enrolled');
            const exportLink = document.getElementById('export-link');

            btnDelegates.className = 'flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition-all ' + inactiveClass;
            btnScholarships.className = 'flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition-all ' + inactiveClass;
            btnEnrolled.className = 'flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition-all ' + inactiveClass;

            if (tabName === 'delegates') {
                document.getElementById('tab-delegates').classList.remove('hidden');
                btnDelegates.className = 'flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition-all ' + activeClass;
                exportLink.href = 'admin.php?export=conference';
                exportLink.textContent = 'Download Delegates CSV';
            } else if (tabName === 'scholarships') {
                document.getElementById('tab-scholarships').classList.remove('hidden');
                btnScholarships.className = 'flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition-all ' + activeClass;
                exportLink.href = 'admin.php?export=scholarship';
                exportLink.textContent = 'Download Scholarships CSV';
            } else if (tabName === 'enrolled') {
                document.getElementById('tab-enrolled').classList.remove('hidden');
                btnEnrolled.className = 'flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg transition-all ' + activeClass;
                exportLink.href = 'admin.php?export=enrolled';
                exportLink.textContent = 'Download Enrolled CSV';
            }
        }
    </script>
<?php endif; ?>

</body>
</html>

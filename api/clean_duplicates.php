<?php
/**
 * API Endpoint: Deduplicate CSV Leads on Disk
 * Automatically removes duplicate email submissions and keeps exactly ONE newest record.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$leadsDir = dirname(__DIR__) . '/data';

function deduplicateCsvFile($filePath, $emailIndex = 2) {
    if (!file_exists($filePath)) {
        return 0;
    }
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (empty($lines) || count($lines) <= 1) {
        return 0;
    }

    $header = array_shift($lines);
    $seen = [];
    $uniqueRows = [];
    $removedCount = 0;

    // Traverse in reverse so the newest record is encountered first
    for ($i = count($lines) - 1; $i >= 0; $i--) {
        $row = $lines[$i];
        $fields = str_getcsv($row);
        $email = isset($fields[$emailIndex]) ? strtolower(trim($fields[$emailIndex])) : '';

        if (!empty($email)) {
            if (!isset($seen[$email])) {
                $seen[$email] = true;
                array_unshift($uniqueRows, $row);
            } else {
                $removedCount++;
            }
        } else {
            array_unshift($uniqueRows, $row);
        }
    }

    if ($removedCount > 0) {
        $out = $header . "\n" . implode("\n", $uniqueRows) . "\n";
        file_put_contents($filePath, $out, LOCK_EX);
    }

    return $removedCount;
}

$delRemoved = deduplicateCsvFile($leadsDir . '/optin_leads.csv', 2);
$schRemoved = deduplicateCsvFile($leadsDir . '/scholarship_applications.csv', 3);
$totalRemoved = $delRemoved + $schRemoved;

echo json_encode([
    'success' => true,
    'total_removed' => $totalRemoved,
    'delegates_removed' => $delRemoved,
    'scholarships_removed' => $schRemoved,
    'message' => "Successfully purged {$totalRemoved} duplicate email entries. Exactly 1 record per email remains on disk."
]);


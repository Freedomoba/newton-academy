<?php
/**
 * Newton Academy - Scholarship Application Processor
 * Validates scholarship application, records details, sends acceptance email, 
 * and redirects to checkout.php for ₦20,000 application fee.
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/mail_helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$fullName = trim($_POST['fullName'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = trim($_POST['phone'] ?? '');
$programme = trim($_POST['programme'] ?? '');
$motivation = trim($_POST['motivation'] ?? '');

$validProgrammes = [
    'Digital Entrepreneurship + AI',
    'Digital Marketing + AI'
];

if (empty($fullName) || !$email || empty($phone) || !in_array($programme, $validProgrammes)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields and select a valid programme.'
    ]);
    exit;
}

$createdAt = date('Y-m-d H:i:s');
$applicationId = 'NA-SCH-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8));

// 1. Record Application in CSV storage (De-duplicated by Email)
$leadsDir = __DIR__ . '/../data';
if (!is_dir($leadsDir)) {
    @mkdir($leadsDir, 0755, true);
}

$csvFile = $leadsDir . '/scholarship_applications.csv';
$normalizedEmail = strtolower($email);
$header = ['Timestamp', 'Application ID', 'Full Name', 'Email', 'Phone', 'Programme', 'Motivation', 'Payment Status'];
$rows = [];
$found = false;

if (file_exists($csvFile)) {
    if (($handle = @fopen($csvFile, 'r')) !== false) {
        $first = fgetcsv($handle);
        if ($first && count($first) >= 7) {
            $header = $first;
        }
        while (($data = fgetcsv($handle)) !== false) {
            if (empty($data) || count($data) < 4) continue;
            // Check email column (index 3)
            $existingEmail = strtolower(trim($data[3] ?? ''));
            if ($existingEmail === $normalizedEmail) {
                // Keep original application ID if already assigned, or update with latest
                $existingAppId = !empty($data[1]) ? $data[1] : $applicationId;
                $applicationId = $existingAppId;
                $existingPaymentStatus = !empty($data[7]) ? $data[7] : 'Pending Payment';
                $rows[] = [$createdAt, $existingAppId, $fullName, $email, $phone, $programme, $motivation, $existingPaymentStatus];
                $found = true;
            } else {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
}

if (!$found) {
    // Append as new unique application
    $rows[] = [$createdAt, $applicationId, $fullName, $email, $phone, $programme, $motivation, 'Pending Payment'];
}

// Write back deduplicated data
if (($fp = @fopen($csvFile, 'w')) !== false) {
    fputcsv($fp, $header);
    foreach ($rows as $row) {
        fputcsv($fp, $row);
    }
    fclose($fp);
}

// 2. Prepare checkout URL
$checkoutParams = [
    'app_id' => $applicationId,
    'name' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'programme' => $programme
];

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$dir = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/\\');
$checkoutUrl = $scheme . '://' . $host . $dir . '/checkout.php?' . http_build_query($checkoutParams);

// 3. Dispatch Instant Scholarship Award / Acceptance Email via cPanel SMTP
$emailHtml = NewtonMailer::getScholarshipApprovalTemplate($fullName, $programme, $checkoutUrl);
$subject = "CONGRATULATIONS: Your Scholarship at Newton Academy Has Been Granted!";
NewtonMailer::send($email, $fullName, $subject, $emailHtml);

// 4. Return response with redirect to checkout page
echo json_encode([
    'success' => true,
    'message' => 'Scholarship Approved! Redirecting to seat confirmation...',
    'redirect' => 'checkout.php?' . http_build_query($checkoutParams)
]);
exit;


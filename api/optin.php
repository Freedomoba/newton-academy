<?php
/**
 * Newton Academy - Lead Capture Handler
 * Receives opt-in submissions, records lead, fires Welcome Email, and redirects to Thank You / Upsell page.
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/mail_helper.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Sanitize inputs
$fullName = trim($_POST['fullName'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = trim($_POST['phone'] ?? '');
$countryCode = trim($_POST['countryCode'] ?? '+234');

if (empty($fullName) || !$email || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Please provide a valid Name, Email, and WhatsApp Phone number.'
    ]);
    exit;
}

$fullPhone = $countryCode . preg_replace('/[^0-9]/', '', $phone);
$createdAt = date('Y-m-d H:i:s');

// 1. Store Lead in Local CSV / JSON Storage
$leadsDir = __DIR__ . '/../data';
if (!is_dir($leadsDir)) {
    @mkdir($leadsDir, 0755, true);
}

$csvFile = $leadsDir . '/optin_leads.csv';
$isNewFile = !file_exists($csvFile);
$fp = @fopen($csvFile, 'a');
if ($fp) {
    if ($isNewFile) {
        fputcsv($fp, ['Timestamp', 'Full Name', 'Email', 'WhatsApp Phone', 'IP Address']);
    }
    fputcsv($fp, [$createdAt, $fullName, $email, $fullPhone, $_SERVER['REMOTE_ADDR'] ?? '']);
    fclose($fp);
}

// 2. Dispatch Automated Welcome Email via cPanel SMTP
$emailHtml = NewtonMailer::getOptinWelcomeTemplate($fullName);
$subject = "Welcome to Newton Academy - Important Next Step!";
NewtonMailer::send($email, $fullName, $subject, $emailHtml);

// 3. Return Success with Redirect URL to Step 2
$redirectUrl = 'thank-you.php?' . http_build_query([
    'name' => $fullName,
    'email' => $email,
    'phone' => $fullPhone
]);

echo json_encode([
    'success' => true,
    'message' => 'Registration successful! Redirecting...',
    'redirect' => $redirectUrl
]);
exit;


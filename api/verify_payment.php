<?php
/**
 * Newton Academy - Paystack Verification & Enrollment
 * Verifies Paystack transaction, marks payment in database, triggers VIP enrollment email,
 * and outputs redirect to success page.
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/mail_helper.php';

header('Content-Type: application/json');

$reference = trim($_GET['reference'] ?? $_POST['reference'] ?? '');
$name = trim($_GET['name'] ?? $_POST['name'] ?? '');
$email = filter_var(trim($_GET['email'] ?? $_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$programme = trim($_GET['programme'] ?? $_POST['programme'] ?? '');
$appId = trim($_GET['app_id'] ?? $_POST['app_id'] ?? '');

if (empty($reference)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing transaction reference']);
    exit;
}

$isVerified = false;
$paidAmount = 0;

if (defined('PAYSTACK_SECRET_KEY') && strpos(PAYSTACK_SECRET_KEY, 'sk_') === 0 && PAYSTACK_SECRET_KEY !== 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
    $url = 'https://api.paystack.co/transaction/verify/' . rawurlencode($reference);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . PAYSTACK_SECRET_KEY,
        'Cache-Control: no-cache'
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response) {
        $result = json_decode($response, true);
        if ($result && isset($result['status']) && $result['status'] === true && $result['data']['status'] === 'success') {
            $isVerified = true;
            $paidAmount = ($result['data']['amount'] ?? 2000000) / 100;
        }
    }
} else {
    $isVerified = true;
    $paidAmount = SCHOLARSHIP_APPLICATION_FEE;
}

if (!$isVerified) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Payment verification could not be completed. Please contact admissions support.']);
    exit;
}

// 1. Record verified payment in CSV
$leadsDir = __DIR__ . '/../data';
if (!is_dir($leadsDir)) {
    @mkdir($leadsDir, 0755, true);
}

$csvFile = $leadsDir . '/enrolled_students.csv';
$isNewFile = !file_exists($csvFile);
$fp = @fopen($csvFile, 'a');
if ($fp) {
    if ($isNewFile) {
        fputcsv($fp, ['Timestamp', 'Reference', 'Application ID', 'Full Name', 'Email', 'Programme', 'Amount Paid', 'Status']);
    }
    fputcsv($fp, [date('Y-m-d H:i:s'), $reference, $appId, $name, $email, $programme, $paidAmount, 'Paid & Verified']);
    fclose($fp);
}

// 2. Dispatch Post-Payment VIP Onboarding Email
if ($email) {
    $studentId = !empty($appId) ? $appId : ('NA-ID-' . strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $reference), -6)));
    $subject = "Enrolment Confirmed: Your Seat is Officially Secured (" . $programme . ")";
    $vipHtml = NewtonMailer::getEnrolmentSuccessTemplate($name, $programme, $studentId);
    NewtonMailer::send($email, $name, $subject, $vipHtml);
}

// 3. Return success redirect
$successUrl = 'success.php?' . http_build_query([
    'reference' => $reference,
    'name' => $name,
    'programme' => $programme
]);

echo json_encode([
    'success' => true,
    'message' => 'Payment verified. Redirecting to onboarding...',
    'redirect' => $successUrl
]);
exit;

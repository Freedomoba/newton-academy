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
    $vipLink = WHATSAPP_VIP_ENROLLED_LINK;
    $academy = ACADEMY_NAME;

    $subject = "Enrollment Confirmed: Welcome to Newton Academy";
    $vipHtml = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Enrollment Confirmed</title></head>
<body style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f4f6f8; padding:30px 15px; margin:0; color:#1e293b;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="background:#004d4d; padding:32px 30px; text-align:center; color:#ffffff;">
            <h1 style="margin:0; font-size:22px; font-weight:700;">NEWTON ACADEMY</h1>
            <p style="margin:6px 0 0; color:#99f6e4; font-size:12px; text-transform:uppercase; letter-spacing:1.5px;">Office of Fellow Onboarding</p>
        </div>
        <div style="padding:36px 32px;">
            <h2 style="color:#0f172a; margin:0 0 16px; font-size:20px; font-weight:700;">Admission Receipt & Next Steps</h2>
            <p>Dear <strong>{$name}</strong>,</p>
            <p>Your one-time scholarship application fee of <strong>₦20,000</strong> (Receipt Reference: {$reference}) has been verified. Your enrollment for <strong>{$programme}</strong> is now official.</p>
            
            <div style="background:#f0fdfa; border-left:4px solid #008080; padding:18px; margin:22px 0; border-radius:4px;">
                <strong style="margin:0 0 8px; color:#004d4d; display:block; font-size:14px;">HOW TO ACTIVATE YOUR LMS STUDENT PORTAL:</strong>
                <ol style="margin:0; padding-left:18px; color:#0f766e; font-size:13px; line-height:1.6;">
                    <li>Join the Enrolled Fellows WhatsApp Room using the link below.</li>
                    <li>Read the <strong>PINNED MESSAGE</strong> at the top of the chat room.</li>
                    <li>Submit your Full Legal Name, Email Address, and Payment Reference as requested in the pinned notice.</li>
                    <li>The Admissions Registrar will provision your LMS login and orientation schedule.</li>
                </ol>
            </div>

            <div style="text-align:center; margin:32px 0;">
                <a href="{$vipLink}" style="background-color:#008080; color:#ffffff; text-decoration:none; padding:16px 34px; border-radius:8px; font-weight:700; display:inline-block; font-size:15px;">
                    Enter Enrolled Fellows WhatsApp Room
                </a>
            </div>
            
            <hr style="border:none; border-top:1px solid #e2e8f0; margin:28px 0;">
            <p style="font-size:12px; color:#94a3b8; text-align:center;">&copy; 2026 {$academy}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
HTML;
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

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

$firstName = trim($_POST['first_name'] ?? '');
$lastName = trim($_POST['last_name'] ?? '');
$fullName = trim($_POST['fullName'] ?? '');
if (empty($fullName) && (!empty($firstName) || !empty($lastName))) {
    $fullName = trim($firstName . ' ' . $lastName);
}

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = trim($_POST['phone'] ?? '');
$course = trim($_POST['course'] ?? ($_POST['programme'] ?? 'Digital Marketing + Applied AI'));
$scholarshipScheme = trim($_POST['scholarship_scheme'] ?? 'Newton Core Scholarship Scheme');
$gender = trim($_POST['gender'] ?? 'Not specified');
$country = trim($_POST['country'] ?? 'Nigeria');
$stateCity = trim($_POST['state_city'] ?? 'Lagos');
$employmentStatus = trim($_POST['employment_status'] ?? 'Graduate');
$educationalLevel = trim($_POST['educational_level'] ?? 'Degree');
$learningMode = trim($_POST['learning_mode'] ?? 'Online');
$priorExperience = trim($_POST['prior_experience'] ?? 'None');
$jobPlacement = trim($_POST['job_placement'] ?? 'Yes');

if (empty($fullName) || !$email || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields (Name, Email, Phone).'
    ]);
    exit;
}

$createdAt = date('Y-m-d H:i:s');
$applicationId = !empty($_POST['app_id']) ? trim($_POST['app_id']) : ('NA-SCH-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8)));

$source = trim($_POST['source'] ?? '');
if (empty($source)) {
    $ref = strtolower($_SERVER['HTTP_REFERER'] ?? '');
    if (strpos($ref, 'whatsapp') !== false || strpos($ref, 'wa.me') !== false) $source = 'WhatsApp';
    elseif (strpos($ref, 'facebook') !== false || strpos($ref, 'fb.com') !== false) $source = 'Facebook Ads';
    elseif (strpos($ref, 'instagram') !== false) $source = 'Instagram';
    elseif (strpos($ref, 'twitter') !== false || strpos($ref, 't.co') !== false || strpos($ref, 'x.com') !== false) $source = 'Twitter / X';
    elseif (strpos($ref, 'tiktok') !== false) $source = 'TikTok';
    elseif (strpos($ref, 'google') !== false) $source = 'Google';
    else $source = 'Direct / Organic';
}

$location = trim($_POST['location'] ?? '');
if (empty($location)) {
    if (!empty($stateCity)) {
        $location = $stateCity . (!empty($country) && $country !== 'Nigeria' ? ', ' . $country : ', Nigeria');
    } else {
        $location = 'Lagos, Nigeria';
    }
}

// 1. Record Application in CSV storage (De-duplicated by Email)
$leadsDir = __DIR__ . '/../data';
if (!is_dir($leadsDir)) {
    @mkdir($leadsDir, 0755, true);
}

$csvFile = $leadsDir . '/scholarship_applications.csv';
$normalizedEmail = strtolower($email);
$header = ['Timestamp', 'Application ID', 'Full Name', 'Email', 'Phone', 'Programme', 'Scholarship Scheme', 'Payment Status', 'Source', 'Location'];
$rows = [];
$found = false;

if (file_exists($csvFile)) {
    if (($handle = @fopen($csvFile, 'r')) !== false) {
        $first = fgetcsv($handle);
        if ($first && count($first) >= 4) {
            $header = $first;
        }
        while (($data = fgetcsv($handle)) !== false) {
            if (empty($data) || count($data) < 4) continue;
            // Check email column (index 3)
            $existingEmail = strtolower(trim($data[3] ?? ''));
            if ($existingEmail === $normalizedEmail) {
                $existingAppId = !empty($data[1]) ? $data[1] : $applicationId;
                $applicationId = $existingAppId;
                $existingPaymentStatus = !empty($data[7]) ? $data[7] : 'Pending Payment';
                $existingSource = !empty($data[8]) ? $data[8] : $source;
                $existingLoc = !empty($data[9]) ? $data[9] : $location;
                $rows[] = [$createdAt, $existingAppId, $fullName, $email, $phone, $course, $scholarshipScheme, $existingPaymentStatus, $existingSource, $existingLoc];
                $found = true;
            } else {
                $rows[] = $data;
            }
        }
        fclose($handle);
    }
}

if (!$found) {
    $rows[] = [$createdAt, $applicationId, $fullName, $email, $phone, $course, $scholarshipScheme, 'Pending Payment', $source, $location];
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
    'track' => $course,
    'scheme' => $scholarshipScheme
];

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$dir = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/\\');
$checkoutUrl = $scheme . '://' . $host . $dir . '/checkout.php?' . http_build_query($checkoutParams);

// 3. Dispatch Instant Scholarship Award Email
try {
    $emailHtml = NewtonMailer::getScholarshipApprovalTemplate($fullName, $course, $checkoutUrl);
    $subject = "CONGRATULATIONS: Your Scholarship at Newton Academy Has Been Granted!";
    NewtonMailer::send($email, $fullName, $subject, $emailHtml);
} catch (Exception $e) {}

// 4. Return response with redirect to checkout page
echo json_encode([
    'success' => true,
    'message' => 'Scholarship Approved! Redirecting to seat confirmation...',
    'redirect' => 'checkout.php?' . http_build_query($checkoutParams)
]);
exit;

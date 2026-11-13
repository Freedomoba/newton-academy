<?php
/**
 * Newton Academy - Automated Resend Follow-Up Engine
 * Handles twice-a-week follow-up sequences for conference delegates.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once dirname(__DIR__) . '/config.php';

if (file_exists(dirname(__DIR__) . '/config.local.php')) {
    require_once dirname(__DIR__) . '/config.local.php';
}

// Resend Configuration
$resendApiKey = defined('RESEND_API_KEY') ? RESEND_API_KEY : (getenv('RESEND_API_KEY') ?: '');
$resendFrom = defined('RESEND_FROM_EMAIL') ? RESEND_FROM_EMAIL : 'Newton Academy <na@newtoncore.com>';
$whatsappLink = defined('WHATSAPP_WAITLIST_LINK') ? WHATSAPP_WAITLIST_LINK : 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi';
$scholarshipUrl = 'https://freedomoba.github.io/newton-academy/scholarship.html';

$leadsFile = dirname(__DIR__) . '/data/optin_leads.csv';
$logsFile = dirname(__DIR__) . '/data/followup_logs.csv';

// Initialize logs file if not present
if (!file_exists($logsFile)) {
    file_put_contents($logsFile, "Timestamp,Email,FullName,Step,Status,ResendId\n", LOCK_EX);
}

/**
 * Helper: Read CSV
 */
function getLeads($file) {
    if (!file_exists($file)) return [];
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (empty($lines) || count($lines) <= 1) return [];

    $leads = [];
    $seen = [];
    foreach (array_slice($lines, 1) as $line) {
        $data = str_getcsv($line);
        $email = isset($data[2]) ? strtolower(trim($data[2])) : '';
        if ($email && !isset($seen[$email])) {
            $seen[$email] = true;
            $leads[] = [
                'timestamp' => $data[0] ?? '',
                'name' => $data[1] ?? 'Delegate',
                'email' => $email,
                'phone' => $data[3] ?? ''
            ];
        }
    }
    return $leads;
}

/**
 * Helper: Read Logs
 */
function getSentLogs($file) {
    if (!file_exists($file)) return [];
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (empty($lines) || count($lines) <= 1) return [];

    $logs = []; // [email => [step1 => true, step2 => true]]
    foreach (array_slice($lines, 1) as $line) {
        $row = str_getcsv($line);
        $email = isset($row[1]) ? strtolower(trim($row[1])) : '';
        $step = isset($row[3]) ? (int)$row[3] : 0;
        $status = isset($row[4]) ? $row[4] : '';
        if ($email && $step && $status === 'SENT') {
            if (!isset($logs[$email])) $logs[$email] = [];
            $logs[$email][$step] = true;
        }
    }
    return $logs;
}

/**
 * Helper: Send via Resend REST API
 */
function sendViaResend($apiKey, $from, $to, $subject, $html) {
    $payload = json_encode([
        'from' => $from,
        'to' => [$to],
        'subject' => $subject,
        'html' => $html
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        return ['success' => false, 'error' => $curlError, 'httpCode' => $httpCode];
    }

    $json = json_decode($response, true);
    if ($httpCode >= 200 && $httpCode < 300 && isset($json['id'])) {
        return ['success' => true, 'id' => $json['id']];
    }

    return [
        'success' => false,
        'error' => $json['message'] ?? 'Failed to send',
        'httpCode' => $httpCode,
        'response' => $json
    ];
}

/**
 * Generate Email Copy for each step
 */
function getFollowupEmail($step, $name, $waLink, $schLink) {
    $firstName = explode(' ', trim($name))[0];

    // Shared branded responsive template wrapper
    $wrap = function($headline, $subject, $bodyHtml) use ($firstName, $waLink, $schLink) {
        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#1e293b; line-height:1.65;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding:30px 15px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #cbd5e1; max-width:600px; width:100%; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color:#003835; padding:32px 30px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:800; letter-spacing:1px;">NEWTON ACADEMY</h1>
                            <p style="color:#2dd4bf; margin:6px 0 0; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:1.5px;">Digital and Financial Literacy Initiative</p>
                        </td>
                    </tr>
                    <!-- Body Content -->
                    <tr>
                        <td style="padding:36px 32px;">
                            <h2 style="color:#0f172a; margin:0 0 16px; font-size:20px; font-weight:800; line-height:1.3;">
                                {$headline}
                            </h2>
                            {$bodyHtml}
                            
                            <!-- WhatsApp Action Box -->
                            <div style="background-color:#f0fdfa; border:2px solid #99f6e4; border-radius:12px; padding:20px; margin:28px 0; text-align:center;">
                                <h3 style="margin:0 0 8px; color:#005f5a; font-size:16px; font-weight:700;">Action 1: Enter The Delegates WhatsApp Hub</h3>
                                <p style="margin:0 0 16px; font-size:13px; color:#475569;">
                                    This is where the live streaming broadcast links, speaker slide decks, and live Q&A breaks will be hosted:
                                </p>
                                <a href="{$waLink}" style="display:inline-block; background-color:#16a34a; color:#ffffff; font-weight:700; font-size:14px; text-decoration:none; padding:14px 28px; border-radius:10px; box-shadow:0 4px 12px rgba(22,163,74,0.3);">
                                    Join Official WhatsApp Group &rarr;
                                </a>
                            </div>

                            <!-- Scholarship Action Box -->
                            <div style="background-color:#fffbeb; border:2px solid #fde68a; border-radius:12px; padding:20px; margin:28px 0; text-align:center;">
                                <h3 style="margin:0 0 8px; color:#92400e; font-size:16px; font-weight:700;">Action 2: Claim Your 100% Tuition Scholarship</h3>
                                <p style="margin:0 0 16px; font-size:13px; color:#475569;">
                                    Your delegate pass includes pre-screened eligibility for a <strong>₦200,000 full tuition endowment</strong> (Digital Marketing or Digital Entrepreneurship). Only 50 seats are allocated:
                                </p>
                                <a href="{$schLink}" style="display:inline-block; background-color:#d97706; color:#ffffff; font-weight:800; font-size:14px; text-decoration:none; padding:14px 28px; border-radius:10px; box-shadow:0 4px 12px rgba(217,119,6,0.3);">
                                    Review & Claim Scholarship Seat &rarr;
                                </a>
                            </div>

                            <p style="font-size:13px; color:#64748b; margin:28px 0 0; line-height:1.6; border-top:1px solid #e2e8f0; pt-20;">
                                Warm regards,<br>
                                <strong>Admissions &amp; Academic Board</strong><br>
                                Newton Academy &bull; <a href="mailto:na@newtoncore.com" style="color:#005f5a; text-decoration:none;">na@newtoncore.com</a>
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f8fafc; padding:20px 30px; text-align:center; border-top:1px solid #e2e8f0; font-size:11px; color:#94a3b8;">
                            &copy; 2026 Newton Academy. All rights reserved.<br>
                            You received this email because you registered for the Digital and Financial Literacy Virtual Conference.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    };

    switch ($step) {
        case 1:
            $headline = "Important Notice: Confirm Your Virtual Seat & Scholarship Allocation";
            $subject = "[Action Required] Your Digital & Financial Literacy room link and 100% scholarship notice";
            $body = <<<HTML
<p style="font-size:15px; color:#334155; margin-bottom:16px;">Dear <strong>{$firstName}</strong>,</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    We recently received your registration for the <strong>Digital and Financial Literacy Virtual Conference</strong>. Because room bandwidth for our live interactive masterclasses is strictly capped, we need to ensure every delegate receives their credentials smoothly.
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    To prevent broadcast links from being buried in spam folders, all live stream rooms and speaker workbooks are delivered directly into the <strong>Official Conference WhatsApp Hub</strong>. If you haven't joined yet, please do so below immediately.
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    Additionally, the Academic Board has pre-allocated <strong>100% Full Tuition Endowments (worth ₦200,000 each)</strong> to 50 delegates. Review the 2 flagship tracks (*Digital Marketing + AI* & *Digital Entrepreneurship + AI*) and claim your seat before the quota closes.
</p>
HTML;
            return ['subject' => $subject, 'html' => $wrap($headline, $subject, $body)];

        case 2:
            $headline = "Why First-Class Graduates Are Stranded (And How 50 Fellows Escape It)";
            $subject = "Why theoretical degrees produce zero income (and your 100% scholarship)";
            $body = <<<HTML
<p style="font-size:15px; color:#334155; margin-bottom:16px;">Dear <strong>{$firstName}</strong>,</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    Here is a hard reality facing hundreds of thousands of graduates across Africa today: <em>You can spend 4 to 5 years earning a First-Class degree, complete NYSC, and still be offered an ₦85,000/month job where transportation eats up 60% of your salary.</em>
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    That was Aminat's exact story. She hawked boiled corn on campus to pay for handouts, graduated at the top of her class in Economics, but was completely stranded. Everything changed when she gained access to Newton Academy's practical performance marketing and AI workflows. Within 90 days, she landed a remote US health-tech contract earning <strong>$1,200 monthly</strong> from home.
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    This is why Newton Academy is awarding 100% full tuition scholarships into our 3-Month International Diploma. If you are ready to transition from theoretical certificates to high-margin digital income, review your briefing below.
</p>
HTML;
            return ['subject' => $subject, 'html' => $wrap($headline, $subject, $body)];

        case 3:
            $headline = "Admissions Quota Update: Only 14 Scholarship Seats Remaining";
            $subject = "Urgent: 14 seats left for the 100% full tuition endowment";
            $body = <<<HTML
<p style="font-size:15px; color:#334155; margin-bottom:16px;">Dear <strong>{$firstName}</strong>,</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    This is a quick time-sensitive update from the Newton Academy Admissions Board.
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    Over the past few days, <strong>36 of the 50 full-tuition endowment seats</strong> have been claimed and ratified by candidate delegates who completed their 30-second admissions evaluation.
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    If you intend to participate in either the <em>Performance Marketing &amp; AI Video Channel Track</em> or the <em>Automated Digital Entrepreneurship Track</em>, please finalize your evaluation today before the 50-seat quota is locked and standard ₦200,000 tuition resumes.
</p>
HTML;
            return ['subject' => $subject, 'html' => $wrap($headline, $subject, $body)];

        case 4:
            $headline = "Delegate Materials & Orientation Schedules Released in WhatsApp";
            $subject = "Final Notice: Download your delegate workbook & finalize orientation";
            $body = <<<HTML
<p style="font-size:15px; color:#334155; margin-bottom:16px;">Dear <strong>{$firstName}</strong>,</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    Preparations for the <strong>Digital and Financial Literacy</strong> masterclasses are now in their final phase. The official speaker schedule, case-study swipe files, and digital workbook have now been pinned at the top of the Private WhatsApp Room.
</p>
<p style="font-size:14px; color:#475569; margin-bottom:16px;">
    Please enter the group immediately to review the orientation timetable and meet your fellow delegates from across Nigeria, Ghana, the UK, and the diaspora.
</p>
HTML;
            return ['subject' => $subject, 'html' => $wrap($headline, $subject, $body)];
    }

    return null;
}

// ==============================================================
// REQUEST HANDLING
// ==============================================================

$action = $_GET['action'] ?? ($_POST['action'] ?? 'status');

$leads = getLeads($leadsFile);
$sentLogs = getSentLogs($logsFile);

// 1. STATUS REPORT
if ($action === 'status') {
    $now = time();
    $stats = [
        'total_leads' => count($leads),
        'total_sent_logs' => 0,
        'step1_due' => 0,
        'step2_due' => 0,
        'step3_due' => 0,
        'step4_due' => 0
    ];

    foreach ($sentLogs as $email => $steps) {
        $stats['total_sent_logs'] += count($steps);
    }

    foreach ($leads as $lead) {
        $email = $lead['email'];
        $optinTime = strtotime($lead['timestamp']);
        if (!$optinTime) $optinTime = $now - (86400 * 2); // Default to 2 days ago if unparseable
        $daysSince = ($now - $optinTime) / 86400;

        $hasStep1 = !empty($sentLogs[$email][1]);
        $hasStep2 = !empty($sentLogs[$email][2]);
        $hasStep3 = !empty($sentLogs[$email][3]);
        $hasStep4 = !empty($sentLogs[$email][4]);

        if (!$hasStep1 && $daysSince >= 1.5) $stats['step1_due']++;
        elseif ($hasStep1 && !$hasStep2 && $daysSince >= 4.5) $stats['step2_due']++;
        elseif ($hasStep2 && !$hasStep3 && $daysSince >= 8.5) $stats['step3_due']++;
        elseif ($hasStep3 && !$hasStep4 && $daysSince >= 13.5) $stats['step4_due']++;
    }

    echo json_encode([
        'success' => true,
        'stats' => $stats,
        'from_email' => $resendFrom,
        'whatsapp_link' => $whatsappLink
    ]);
    exit;
}

// 2. DISPATCH BATCH
if ($action === 'dispatch_batch') {
    $now = time();
    $dispatched = [];
    $errors = [];
    $maxPerBatch = isset($_POST['limit']) ? (int)$_POST['limit'] : 50;
    $count = 0;

    foreach ($leads as $lead) {
        if ($count >= $maxPerBatch) break;

        $email = $lead['email'];
        $name = $lead['name'];
        $optinTime = strtotime($lead['timestamp']);
        if (!$optinTime) $optinTime = $now - (86400 * 2);
        $daysSince = ($now - $optinTime) / 86400;

        $hasStep1 = !empty($sentLogs[$email][1]);
        $hasStep2 = !empty($sentLogs[$email][2]);
        $hasStep3 = !empty($sentLogs[$email][3]);
        $hasStep4 = !empty($sentLogs[$email][4]);

        $stepToSend = 0;
        if (!$hasStep1 && $daysSince >= 1.5) {
            $stepToSend = 1;
        } elseif ($hasStep1 && !$hasStep2 && $daysSince >= 4.5) {
            $stepToSend = 2;
        } elseif ($hasStep2 && !$hasStep3 && $daysSince >= 8.5) {
            $stepToSend = 3;
        } elseif ($hasStep3 && !$hasStep4 && $daysSince >= 13.5) {
            $stepToSend = 4;
        }

        if ($stepToSend > 0) {
            $emailData = getFollowupEmail($stepToSend, $name, $whatsappLink, $scholarshipUrl);
            if ($emailData) {
                $res = sendViaResend($resendApiKey, $resendFrom, $email, $emailData['subject'], $emailData['html']);
                
                $dateStr = date('Y-m-d H:i:s');
                if ($res['success']) {
                    $logLine = sprintf('"%s","%s","%s",%d,"SENT","%s"' . "\n", $dateStr, $email, str_replace('"', '""', $name), $stepToSend, $res['id']);
                    file_put_contents($logsFile, $logLine, FILE_APPEND | LOCK_EX);
                    $sentLogs[$email][$stepToSend] = true;
                    $dispatched[] = ['email' => $email, 'step' => $stepToSend, 'id' => $res['id']];
                    $count++;
                } else {
                    $logLine = sprintf('"%s","%s","%s",%d,"FAILED","%s"' . "\n", $dateStr, $email, str_replace('"', '""', $name), $stepToSend, substr(json_encode($res['error']), 0, 100));
                    file_put_contents($logsFile, $logLine, FILE_APPEND | LOCK_EX);
                    $errors[] = ['email' => $email, 'step' => $stepToSend, 'error' => $res['error']];
                }
            }
        }
    }

    echo json_encode([
        'success' => true,
        'batch_count' => $count,
        'dispatched' => $dispatched,
        'errors' => $errors,
        'remaining_due' => count($leads) - $count
    ]);
    exit;
}


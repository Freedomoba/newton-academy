<?php
/**
 * Newton Academy - Mail Helper
 * Sends rich transactional emails using cPanel SMTP or standard mail fallback.
 * Formatted with institutional Deep Teal branding and zero emojis.
 */

require_once __DIR__ . '/../config.php';

class NewtonMailer {

    public static function send($toEmail, $toName, $subject, $htmlContent, $attachments = []) {
        if (defined('RESEND_API_KEY') && !empty(RESEND_API_KEY)) {
            $resendResult = self::sendViaResend($toEmail, $toName, $subject, $htmlContent, $attachments);
            if ($resendResult === true) {
                return true;
            }
        }
        if (defined('SMTP_HOST') && SMTP_HOST !== 'mail.newtonacademy.co' && !empty(SMTP_PASS)) {
            $smtpResult = self::sendViaSmtp($toEmail, $toName, $subject, $htmlContent);
            if ($smtpResult === true) {
                return true;
            }
        }

        return self::sendViaNativeMail($toEmail, $toName, $subject, $htmlContent);
    }

    private static function sendViaResend($toEmail, $toName, $subject, $htmlContent, $attachments = []) {
        $apiKey = defined('RESEND_API_KEY') ? RESEND_API_KEY : '';
        if (empty($apiKey)) return false;

        $senderEmail = defined('RESEND_SENDER_EMAIL') ? RESEND_SENDER_EMAIL : 'na@newtoncore.com';
        $senderName = defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : 'Newton Academy';
        $from = "{$senderName} <{$senderEmail}>";

        $payloadData = [
            'from' => $from,
            'to' => [$toEmail],
            'subject' => $subject,
            'html' => $htmlContent
        ];

        if (!empty($attachments) && is_array($attachments)) {
            $payloadData['attachments'] = $attachments;
        }

        $payload = json_encode($payloadData);

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
        curl_close($ch);

        return ($httpCode >= 200 && $httpCode < 300);
    }

    private static function sendViaNativeMail($toEmail, $toName, $subject, $htmlContent) {
        $fromEmail = defined('ACADEMY_EMAIL') ? ACADEMY_EMAIL : 'admissions@' . ($_SERVER['SERVER_NAME'] ?? 'localhost');
        $fromName = defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : 'Newton Academy Admissions';

        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode($fromName), $fromEmail);
        $headers[] = 'Reply-To: ' . $fromEmail;
        $headers[] = 'X-Mailer: PHP/' . phpversion();

        $encodedSubject = sprintf('=?UTF-8?B?%s?=', base64_encode($subject));

        return @mail($toEmail, $encodedSubject, $htmlContent, implode("\r\n", $headers));
    }

    private static function sendViaSmtp($toEmail, $toName, $subject, $htmlContent) {
        $host = SMTP_HOST;
        $port = SMTP_PORT;
        $username = SMTP_USER;
        $password = SMTP_PASS;
        $fromEmail = SMTP_USER;
        $fromName = SMTP_FROM_NAME;
        $timeout = 10;

        $socketHost = (SMTP_SECURE === 'ssl' ? 'ssl://' : '') . $host;
        $socket = @fsockopen($socketHost, $port, $errno, $errstr, $timeout);

        if (!$socket) {
            error_log("NewtonMailer: SMTP connection failed to $host:$port ($errno: $errstr)");
            return false;
        }

        $res = fgets($socket, 512);

        fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
        while ($line = fgets($socket, 512)) {
            if (substr($line, 3, 1) === ' ') break;
        }

        if (SMTP_SECURE === 'tls') {
            fputs($socket, "STARTTLS\r\n");
            $res = fgets($socket, 512);
            if (substr($res, 0, 3) !== '220') {
                fclose($socket);
                return false;
            }
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            fputs($socket, "EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n");
            while ($line = fgets($socket, 512)) {
                if (substr($line, 3, 1) === ' ') break;
            }
        }

        fputs($socket, "AUTH LOGIN\r\n");
        $res = fgets($socket, 512);
        if (substr($res, 0, 3) !== '334') { fclose($socket); return false; }

        fputs($socket, base64_encode($username) . "\r\n");
        $res = fgets($socket, 512);
        if (substr($res, 0, 3) !== '334') { fclose($socket); return false; }

        fputs($socket, base64_encode($password) . "\r\n");
        $res = fgets($socket, 512);
        if (substr($res, 0, 3) !== '235') { fclose($socket); return false; }

        fputs($socket, "MAIL FROM: <$fromEmail>\r\n");
        $res = fgets($socket, 512);
        if (substr($res, 0, 3) !== '250') { fclose($socket); return false; }

        fputs($socket, "RCPT TO: <$toEmail>\r\n");
        $res = fgets($socket, 512);
        if (substr($res, 0, 3) !== '250') { fclose($socket); return false; }

        fputs($socket, "DATA\r\n");
        $res = fgets($socket, 512);
        if (substr($res, 0, 3) !== '354') { fclose($socket); return false; }

        $encodedFromName = sprintf('=?UTF-8?B?%s?=', base64_encode($fromName));
        $encodedToName = sprintf('=?UTF-8?B?%s?=', base64_encode($toName));
        $encodedSubject = sprintf('=?UTF-8?B?%s?=', base64_encode($subject));

        $emailHeaders = "From: $encodedFromName <$fromEmail>\r\n" .
                        "To: $encodedToName <$toEmail>\r\n" .
                        "Subject: $encodedSubject\r\n" .
                        "MIME-Version: 1.0\r\n" .
                        "Content-Type: text/html; charset=UTF-8\r\n" .
                        "X-Mailer: NewtonAcademyMailer/1.0\r\n\r\n";

        fputs($socket, $emailHeaders . $htmlContent . "\r\n.\r\n");
        $res = fgets($socket, 512);
        fputs($socket, "QUIT\r\n");
        fclose($socket);

        return substr($res, 0, 3) === '250';
    }

    /**
     * Clean, Editorial Master Layout (NO tables, NO boxed containers)
     * Pure, readable typography, logo at top, and high inbox deliverability.
     */
    public static function wrapCleanEmail($title, $bodyHtml, $ctaText = '', $ctaUrl = '', $secondaryLink = null) {
        $logoUrl = 'https://freedomoba.github.io/newton-academy/assets/logo.png';
        $founderName = 'Ade Braimoh';
        $officialEmail = 'na@newtoncore.com';

        $ctaBlock = '';
        if (!empty($ctaText) && !empty($ctaUrl)) {
            $ctaBlock = <<<HTML
            <div style="margin:32px 0 24px;">
                <a href="{$ctaUrl}" style="display:inline-block; background-color:#005f5a; color:#ffffff; font-weight:700; font-size:15px; text-decoration:none; padding:14px 28px; border-radius:8px;">
                    {$ctaText} &rarr;
                </a>
            </div>
HTML;
        }

        $secondaryBlock = '';
        if (!empty($secondaryLink) && isset($secondaryLink['text']) && isset($secondaryLink['url'])) {
            $secondaryBlock = <<<HTML
            <div style="margin:16px 0 28px; font-size:14px;">
                <a href="{$secondaryLink['url']}" style="color:#005f5a; font-weight:700; text-decoration:underline;">
                    {$secondaryLink['text']}
                </a>
            </div>
HTML;
        }

        return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title}</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b; line-height:1.7; -webkit-font-smoothing:antialiased;">
    <div style="max-width:600px; margin:0 auto; padding:32px 20px 48px;">
        
        <!-- Top Logo -->
        <div style="padding-bottom:24px; border-bottom:1px solid #e2e8f0; margin-bottom:28px;">
            <a href="https://freedomoba.github.io/newton-academy/" style="text-decoration:none; display:inline-block;">
                <img src="{$logoUrl}" alt="Newton Academy" width="160" style="width:160px; height:auto; display:block;" />
            </a>
        </div>

        <!-- Heading -->
        <h1 style="font-size:22px; font-weight:800; color:#003835; margin:0 0 20px; line-height:1.35; letter-spacing:-0.2px;">
            {$title}
        </h1>

        <!-- Body Content (Clean text, no box containers, no tables) -->
        <div style="font-size:15px; color:#334155; line-height:1.75;">
            {$bodyHtml}
        </div>

        <!-- Primary Action Button -->
        {$ctaBlock}

        <!-- Secondary Link -->
        {$secondaryBlock}

        <!-- Clean Sign-off -->
        <div style="margin-top:36px; padding-top:24px; border-top:1px solid #e2e8f0; font-size:14px; color:#475569; line-height:1.6;">
            <p style="margin:0 0 4px; font-weight:700; color:#0f172a;">Warm regards,</p>
            <p style="margin:0; font-weight:800; color:#003835; font-size:15px;">{$founderName}</p>
            <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Founder, Newton Academy</p>
            <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Official Email: <a href="mailto:{$officialEmail}" style="color:#005f5a; text-decoration:none;">{$officialEmail}</a></p>
        </div>

        <!-- Simple Legal Footer -->
        <div style="margin-top:40px; font-size:11px; color:#94a3b8; line-height:1.6;">
            <p style="margin:0;">&copy; 2026 Newton Academy. All rights reserved.</p>
            <p style="margin:4px 0 0;">Lagos, Nigeria &bull; {$officialEmail}</p>
        </div>

    </div>
</body>
</html>
HTML;
    }

    /**
     * Email Template 1: Virtual Conference Pass Confirmation
     */
    public static function getOptinWelcomeTemplate($name) {
        $waitlistLink = defined('WHATSAPP_WAITLIST_LINK') ? WHATSAPP_WAITLIST_LINK : 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi';
        $scholarshipUrl = 'https://freedomoba.github.io/newton-academy/scholarship.html';
        $officialEmail = 'na@newtoncore.com';
        $firstName = explode(' ', trim($name))[0] ?: 'Delegate';

        $bodyHtml = <<<HTML
        <p style="margin:0 0 16px;">Dear {$firstName},</p>
        
        <p style="margin:0 0 16px; font-size:16px; font-weight:700; color:#005f5a;">
            Congratulations! Your registration for the Digital and Financial Literacy Virtual Conference is confirmed.
        </p>

        <p style="margin:0 0 16px;">
            We are excited to have you join us for this high-impact gathering featuring seasoned global tutors and leaders with experience from Microsoft, Meta, Accenture, and 7Up.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Important — Please Move Us to Your Primary Inbox:</strong><br>
            To ensure you don't miss our official session workbooks, live conference links, and practical AI templates:
        </p>
        <p style="margin:0 0 16px; padding-left:12px;">
            &bull; <strong>On Gmail (Desktop):</strong> Drag this email to your <strong>Primary</strong> tab and click "Yes" when prompted.<br>
            &bull; <strong>On Mobile:</strong> Tap the 3 dots at the top right and select <strong>"Move to Primary"</strong>.<br>
            &bull; Add <strong>{$officialEmail}</strong> to your email contact list.
        </p>

        <p style="margin:0 0 16px; font-size:15px; font-weight:700; color:#003835;">
            Apply for a 100% Full Tuition Scholarship (DM &amp; DE):
        </p>
        <p style="margin:0 0 16px;">
            As a registered conference delegate, you are eligible to apply for our <strong>100% Full Tuition Scholarship (worth ₦200,000)</strong> to study either of our two premier VIP courses:
        </p>
        <p style="margin:0 0 16px; padding-left:12px;">
            1. <strong>Digital Marketing + Applied AI (DM):</strong> Master high-converting funnels, performance advertising, and AI-driven growth.<br>
            2. <strong>Data Engineering + AI Systems (DE):</strong> Master cloud data architectures, modern data stacks, SQL/Python analytics, and enterprise AI workflows.
        </p>
        <p style="margin:0 0 20px;">
            Scholarship allocations are limited. You can take the 30-second live evaluation right now:<br>
            <a href="{$scholarshipUrl}" style="color:#005f5a; font-weight:700; text-decoration:underline;">Click here to apply for the 100% Scholarship (DM or DE) &rarr;</a>
        </p>

        <p style="margin:0 0 16px;">
            Please tap the button below to join the Private Conference Delegates WhatsApp Room where schedules and live session links will be shared:
        </p>
HTML;

        return self::wrapCleanEmail(
            'Your Virtual Conference Pass is Confirmed',
            $bodyHtml,
            'Enter Conference WhatsApp Room',
            $waitlistLink,
            [
                'text' => 'Apply for 100% Full Tuition Scholarship (DM or DE) →',
                'url' => $scholarshipUrl
            ]
        );
    }

    /**
     * Email Template 2: Scholarship Award Letter
     */
    public static function getScholarshipApprovalTemplate($name, $programmeName, $checkoutUrl) {
        $firstName = explode(' ', trim($name))[0] ?: 'Candidate';

        $bodyHtml = <<<HTML
        <p style="margin:0 0 16px;">Dear {$firstName},</p>

        <p style="margin:0 0 16px; font-size:16px; font-weight:700; color:#005f5a;">
            Congratulations! You have been approved for a 100% Full Tuition Scholarship.
        </p>

        <p style="margin:0 0 16px;">
            Following the review of your candidate application, the Academic Board of Newton Academy has formally accepted your candidacy for the <strong>{$programmeName} (Flagship Diploma)</strong>.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Official Award Breakdown:</strong><br>
            &bull; Standard Program Tuition: <span style="text-decoration:line-through; color:#94a3b8;">₦200,000</span><br>
            &bull; Newton Academy 100% Endowment: <strong>-₦200,000 (Fully Waived)</strong><br>
            &bull; Tuition Payable: <strong style="color:#059669;">₦0.00 (FREE)</strong><br>
            &bull; One-Time Admissions &amp; Evaluation Fee: <strong>₦20,000 Only</strong>
        </p>

        <p style="margin:0 0 16px;">
            Your scholarship completely eliminates all tuition expenses for the entire 3 months. The one-time ₦20,000 admissions fee covers your student portal registration, verified student ID, and live LMS setup.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Official Award PDF Attached:</strong><br>
            Your formal signed Scholarship Award Letter with your full name has been generated and attached to this email as a PDF document for your records.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Next Step — 24-Hour Seat Hold:</strong><br>
            Due to strict tutor-to-student coaching ratios, your scholarship award is reserved for exactly <strong>24 hours</strong>. Please click the button below to access your official admissions file and finalize your seat before your allocation expires.
        </p>
HTML;

        return self::wrapCleanEmail(
            'Official Award of 100% Full Tuition Scholarship',
            $bodyHtml,
            'Access Award Document & Finalize Seat',
            $checkoutUrl
        );
    }

    /**
     * Email Template 3: Follow-Up ("Seat Not Yet Secured")
     */
    public static function getScholarshipFollowupTemplate($name, $programmeName, $checkoutUrl) {
        $firstName = explode(' ', trim($name))[0] ?: 'Candidate';

        $bodyHtml = <<<HTML
        <p style="margin:0 0 16px;">Dear {$firstName},</p>

        <p style="margin:0 0 16px; font-size:16px; font-weight:700; color:#003835;">
            Quick reminder: Your 100% Scholarship Seat has not yet been secured.
        </p>

        <p style="margin:0 0 16px;">
            This is a priority notification from the Admissions Board regarding your approved scholarship for the <strong>{$programmeName}</strong>.
        </p>

        <p style="margin:0 0 16px;">
            Our records indicate that your candidate application was unanimously approved for a <strong>100% Full Tuition Waiver (worth ₦200,000)</strong>, but you have not yet completed the one-time ₦20,000 admissions fee to secure your seat.
        </p>

        <p style="margin:0 0 16px; color:#b91c1c; font-weight:700;">
            Admissions Quota Warning: 42 of 50 Seats Taken.
        </p>
        <p style="margin:0 0 16px;">
            Over the past 48 hours, 42 candidates have finalized their admissions files. Only <strong>8 remaining scholarship allocations</strong> are available before the quota closes permanently and standard ₦200,000 tuition resumes.
        </p>

        <p style="margin:0 0 16px;">
            Please do not let this commercial opportunity slip away. Your evaluation file and checkout portal remain open. Tap the button below to secure your seat now:
        </p>
HTML;

        return self::wrapCleanEmail(
            'Your Scholarship Seat Has Not Yet Been Secured',
            $bodyHtml,
            'Secure My 100% Scholarship Seat Now',
            $checkoutUrl
        );
    }

    /**
     * Email Template 4: Enrolment Confirmed ("Seat Secured")
     * Leads directly to Odunayo on WhatsApp with prefilled verification text
     */
    public static function getEnrolmentSuccessTemplate($name, $programmeName, $studentId) {
        $firstName = explode(' ', trim($name))[0] ?: 'Fellow';
        
        $customMessage = rawurlencode("Hello Odunayo, I have officially secured my seat for Newton Academy!\n\n*Name:* {$name}\n*Student ID:* {$studentId}\n*Course:* {$programmeName}\n*Status:* 100% Full Tuition Scholarship (Admission Fee Verified)\n\nPlease verify my admission file and add me to the private VIP Enrolled Fellows WhatsApp Room.");
        $odunayoWhatsAppUrl = "https://wa.me/2347019602639?text={$customMessage}";

        $bodyHtml = <<<HTML
        <p style="margin:0 0 16px;">Dear {$firstName},</p>

        <p style="margin:0 0 16px; font-size:17px; font-weight:700; color:#059669;">
            Congratulations and welcome to Newton Academy!
        </p>

        <p style="margin:0 0 16px;">
            Your one-time admissions commitment fee of <strong>₦20,000</strong> has been officially received and verified.
        </p>

        <p style="margin:0 0 16px;">
            Your status is now upgraded to <strong>Verified Newton Academy Fellow</strong>. Your 100% full-tuition scholarship (worth ₦200,000) is locked in, and your seat in the upcoming cohort is officially guaranteed.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Your Official Enrollment Credentials:</strong><br>
            &bull; Student ID: <strong style="color:#005f5a; font-family:monospace;">{$studentId}</strong><br>
            &bull; Enrolled Track: <strong>{$programmeName}</strong><br>
            &bull; Scholarship Status: <strong style="color:#059669;">100% Tuition Fully Covered (₦0 Balance)</strong><br>
            &bull; Admission Fee: <strong>₦20,000 (Paid &amp; Verified)</strong>
        </p>

        <p style="margin:0 0 16px; font-size:15px; font-weight:700; color:#003835;">
            Final Step — Message Odunayo on WhatsApp to Enter the VIP Group:
        </p>
        <p style="margin:0 0 16px;">
            To ensure the absolute privacy and security of our enrolled cohort, group entry is granted manually. Please message <strong>Odunayo</strong> (Lead Admissions Advisor) on WhatsApp by tapping the button below.
        </p>
        <p style="margin:0 0 16px; color:#64748b; font-size:13.5px;">
            A pre-filled verification message containing your Student ID and name will be ready for you to send. Once received, Odunayo will verify your record and grant you instant access to the private <strong>VIP Enrolled Fellows WhatsApp Room</strong> and LMS portal orientation.
        </p>
HTML;

        return self::wrapCleanEmail(
            'Enrolment Confirmed: Your Seat is Officially Secured',
            $bodyHtml,
            'Message Odunayo to Enter VIP Group',
            $odunayoWhatsAppUrl
        );
    }
}

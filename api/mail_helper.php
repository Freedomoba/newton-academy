<?php
/**
 * Newton Academy - Mail Helper
 * Sends rich transactional emails using cPanel SMTP or standard mail fallback.
 * Formatted with institutional Deep Teal branding and zero emojis.
 */

require_once __DIR__ . '/../config.php';

class NewtonMailer {

    public static function send($toEmail, $toName, $subject, $htmlContent) {
        if (defined('RESEND_API_KEY') && !empty(RESEND_API_KEY)) {
            $resendResult = self::sendViaResend($toEmail, $toName, $subject, $htmlContent);
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

        private static function sendViaResend($toEmail, $toName, $subject, $htmlContent) {
        $apiKey = defined('RESEND_API_KEY') ? RESEND_API_KEY : '';
        if (empty($apiKey)) return false;

        $senderEmail = defined('RESEND_SENDER_EMAIL') ? RESEND_SENDER_EMAIL : 'na@newtoncore.com';
        $senderName = defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : 'Newton Academy';
        $from = "{$senderName} <{$senderEmail}>";

        $payload = json_encode([
            'from' => $from,
            'to' => [$toEmail],
            'subject' => $subject,
            'html' => $htmlContent
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
     * Master Email HTML Layout Wrapper
     */
    public static function wrapEmail($category, $title, $bodyHtml, $ctaText = '', $ctaUrl = '', $noticeHtml = '') {
        $ctaBlock = '';
        if (!empty($ctaText) && !empty($ctaUrl)) {
            $ctaBlock = <<<HTML
            <div style="text-align:center; margin:30px 0 20px;">
                <a href="{$ctaUrl}" style="display:inline-block; background:linear-gradient(135deg, #005f5a 0%, #004d49 100%); color:#ffffff; font-weight:800; font-size:14px; text-decoration:none; padding:15px 32px; border-radius:10px; box-shadow:0 4px 14px rgba(0,95,90,0.25); letter-spacing:0.3px;">
                    {$ctaText} &rarr;
                </a>
            </div>
HTML;
        }

        $noticeBlock = !empty($noticeHtml) ? "<div style=\"margin:22px 0;\">{$noticeHtml}</div>" : '';

        return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#0f172a; -webkit-font-smoothing:antialiased; line-height:1.6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding:28px 12px;">
        <tr>
            <td align="center">
                <!-- Container Card -->
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px -4px rgba(0,0,0,0.06);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg, #002826 0%, #003835 50%, #001f1e 100%); padding:24px 28px; text-align:center; border-bottom:3px solid #f59e0b;">
                            <div style="font-size:19px; font-weight:900; letter-spacing:1px; color:#ffffff; text-transform:uppercase;">
                                NEWTON ACADEMY
                            </div>
                            <div style="font-size:10px; font-weight:700; color:#fbbf24; text-transform:uppercase; letter-spacing:2px; margin-top:3px;">
                                {$category}
                            </div>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding:32px 28px 24px;">
                            <h1 style="margin:0 0 16px; font-size:20px; font-weight:800; color:#0f172a; line-height:1.35; letter-spacing:-0.2px;">
                                {$title}
                            </h1>

                            <div style="font-size:14px; color:#334155; line-height:1.65;">
                                {$bodyHtml}
                            </div>

                            {$noticeBlock}

                            {$ctaBlock}

                            <hr style="border:none; border-top:1px solid #e2e8f0; margin:26px 0;">

                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <div style="font-size:13px; font-weight:800; color:#0f172a;">Admissions &amp; Academic Directorate</div>
                                        <div style="font-size:12px; color:#64748b; margin-top:2px;">Newton Academy &bull; Empowering Global Tech Leaders</div>
                                    </td>
                                    <td align="right" style="vertical-align:top;">
                                        <div style="font-size:11px; font-weight:700; color:#005f5a; background-color:#f0fdfa; border:1px solid #ccfbf1; padding:4px 10px; border-radius:6px; display:inline-block;">
                                            Verified Dispatch
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f8fafc; padding:20px 28px; text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #e2e8f0; line-height:1.6;">
                            <div>&copy; 2026 Newton Academy. All rights reserved.</div>
                            <div style="margin-top:4px;">You received this email because you registered for Newton Academy programs.</div>
                            <div style="margin-top:4px; color:#cbd5e1;">Newton OS Limited &bull; Lagos, Nigeria &bull; na@newtoncore.com</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }

    /**
     * Email Template 1: Virtual Conference Pass Confirmation (with Primary Inbox Tip)
     */
    public static function getOptinWelcomeTemplate($name) {
        $waitlistLink = defined('WHATSAPP_WAITLIST_LINK') ? WHATSAPP_WAITLIST_LINK : 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi';
        $firstName = explode(' ', trim($name))[0] ?: 'Delegate';

        $bodyHtml = <<<HTML
        <p style="margin:0 0 14px;">Dear <strong>{$firstName}</strong>,</p>
        
        <p style="margin:0 0 14px;">
            Congratulations. Your registration for the upcoming premier virtual gathering: <strong>Digital and Financial Literacy: Building Your Brand, Growing Your Business and Using AI to Get Ahead</strong> has been successfully confirmed.
        </p>

        <p style="margin:0 0 14px;">
            This masterclass brings together seasoned practitioners with executive experience at Microsoft, Meta, Accenture, and 7Up to deliver an intensive, battle-tested operational blueprint for monetizing your skills in today's digital economy.
        </p>

        <!-- Primary Inbox Deliverability Tip Box -->
        <div style="background-color:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:10px; padding:16px 18px; margin:22px 0;">
            <div style="font-size:12px; font-weight:800; color:#92400e; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">
                Important: Move Us To Your Primary Inbox
            </div>
            <p style="margin:0; font-size:13px; color:#78350f; line-height:1.55;">
                To guarantee that our official conference workbook, live session access links, and downloadable AI prompt packs do not get lost in your <strong>Promotions</strong> or <strong>Spam</strong> tabs:
            </p>
            <ul style="margin:8px 0 0; padding-left:18px; font-size:12px; color:#78350f; line-height:1.55;">
                <li><strong>In Gmail:</strong> Drag this email over to your <strong>Primary</strong> tab right now, and click <em>"Yes"</em> when asked to do this for future emails.</li>
                <li><strong>On Mobile:</strong> Tap the 3 dots at the top right of your screen and select <strong>"Move to Primary"</strong>.</li>
                <li>Add <strong>na@newtoncore.com</strong> to your VIP contacts list.</li>
            </ul>
        </div>

        <p style="margin:0 0 14px;">
            All live breakout links, session orientation notes, and speaker Q&amp;A sessions will be coordinated directly inside the <strong>Private Conference Delegates WhatsApp Room</strong>. Please tap below to join your fellow delegates.
        </p>
HTML;

        return self::wrapEmail(
            'Conference Admissions Secretariat',
            'Your Virtual Conference Pass is Confirmed',
            $bodyHtml,
            'Enter Private Conference WhatsApp Room',
            $waitlistLink
        );
    }

    /**
     * Email Template 2: Scholarship Award Letter
     */
    public static function getScholarshipApprovalTemplate($name, $programmeName, $checkoutUrl) {
        $firstName = explode(' ', trim($name))[0] ?: 'Candidate';
        $originalPrice = number_format(defined('ORIGINAL_PRICE') ? ORIGINAL_PRICE : 200000);
        $appFee = number_format(defined('SCHOLARSHIP_APPLICATION_FEE') ? SCHOLARSHIP_APPLICATION_FEE : 20000);

        $bodyHtml = <<<HTML
        <p style="margin:0 0 14px;">Dear <strong>{$firstName}</strong>,</p>

        <p style="margin:0 0 14px;">
            Following the live review of your application file, the Faculty Council and Admissions Board of Newton Academy have officially approved your candidacy and awarded you a <strong>100% Full Tuition Scholarship</strong> into our accredited 3-Month International Professional Diploma.
        </p>

        <!-- Official Financial Breakdown Table -->
        <div style="background-color:#f0f9f8; border:1px solid #ccfbf1; border-radius:12px; padding:18px 20px; margin:20px 0;">
            <div style="font-size:11px; font-weight:800; color:#005f5a; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">
                Approved Specialization:
            </div>
            <div style="font-size:16px; font-weight:800; color:#003835; margin-bottom:14px;">
                {$programmeName} (Flagship Diploma)
            </div>

            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:13px; color:#1e293b; border-top:1px solid #ccfbf1;">
                <tr>
                    <td>Standard Institutional Tuition:</td>
                    <td align="right" style="text-decoration:line-through; color:#94a3b8; font-weight:600;">₦{$originalPrice}</td>
                </tr>
                <tr>
                    <td>Newton Academy Endowment:</td>
                    <td align="right" style="color:#005f5a; font-weight:800;">- ₦{$originalPrice} (100% Full Tuition Covered)</td>
                </tr>
                <tr style="border-top:1px solid #ccfbf1;">
                    <td style="font-weight:700; color:#059669;">Tuition Balance Payable:</td>
                    <td align="right" style="color:#059669; font-weight:800; font-size:14px;">₦0.00 (FREE)</td>
                </tr>
                <tr style="border-top:2px solid #005f5a; font-weight:800; font-size:14px;">
                    <td style="color:#003835; padding-top:10px;">One-Time Admissions &amp; Evaluation Fee:</td>
                    <td align="right" style="color:#005f5a; padding-top:10px; font-size:16px;">₦{$appFee}</td>
                </tr>
            </table>
        </div>

        <p style="margin:0 0 14px;">
            Your scholarship completely eliminates all tuition expenses for the entire 3 months. The one-time <strong>₦{$appFee}</strong> commitment fee covers your verified student identity portal, live LMS access, and acts as an essential seriousness filter so fully funded seats are reserved for dedicated delegates.
        </p>

        <!-- Seat Hold Notice -->
        <div style="background-color:#fffbeb; border-left:4px solid #d97706; padding:12px 16px; border-radius:6px; margin:20px 0;">
            <div style="font-size:11px; font-weight:800; color:#92400e; text-transform:uppercase; letter-spacing:0.5px;">
                24-Hour Allocation Policy
            </div>
            <p style="margin:4px 0 0; font-size:12px; color:#78350f;">
                To maintain our tutor-to-student coaching ratio, your 100% full-tuition endowment is reserved for exactly <strong>24 hours</strong>. Unclaimed allocations are automatically transferred to the next candidate on the waiting list.
            </p>
        </div>
HTML;

        return self::wrapEmail(
            'Office of Academic Affairs & Awards',
            'Official Award of 100% Full Tuition Scholarship',
            $bodyHtml,
            'Access Official Award Dossier & Finalize Seat',
            $checkoutUrl
        );
    }

    /**
     * Email Template 3: Follow-Up ("Seat Not Yet Secured")
     */
    public static function getScholarshipFollowupTemplate($name, $programmeName, $checkoutUrl) {
        $firstName = explode(' ', trim($name))[0] ?: 'Candidate';

        $bodyHtml = <<<HTML
        <p style="margin:0 0 14px;">Dear <strong>{$firstName}</strong>,</p>

        <p style="margin:0 0 14px;">
            This is a priority notification from the Newton Academy Admissions Board regarding your approved scholarship for the <strong>{$programmeName}</strong>.
        </p>

        <p style="margin:0 0 14px;">
            Our records indicate that your candidate application was unanimously approved for a <strong>100% Full Tuition Waiver (worth ₦200,000)</strong>, but you have <strong>not yet secured your seat</strong> by finalizing the one-time ₦20,000 admissions fee.
        </p>

        <!-- Quota Alert Box -->
        <div style="background-color:#fef2f2; border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:10px; padding:16px 18px; margin:22px 0;">
            <div style="font-size:12px; font-weight:800; color:#991b1b; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">
                Admissions Quota Warning: 42 of 50 Seats Taken
            </div>
            <p style="margin:0; font-size:13px; color:#7f1d1d; line-height:1.55;">
                Over the past 48 hours, 42 candidates have finalized their admissions files. Only <strong>8 remaining scholarship allocations</strong> are available before the quota closes permanently and standard ₦200,000 tuition applies.
            </p>
        </div>

        <p style="margin:0 0 14px;">
            Do not let this commercial opportunity slip away. Within 90 days, you will master the same practical high-ROAS advertising, AI automation, and client acquisition blueprints that helped past fellows land international remote roles and high-paying consulting contracts.
        </p>

        <p style="margin:0 0 14px;">
            Your official evaluation file and payment checkout portal remain open for your final confirmation. Tap below to secure your seat before your allocation expires.
        </p>
HTML;

        return self::wrapEmail(
            'Admissions Council & Enrollment Secretariat',
            'Your Scholarship Seat Has Not Yet Been Secured',
            $bodyHtml,
            'Secure My 100% Scholarship Seat Now',
            $checkoutUrl
        );
    }

    /**
     * Email Template 4: Enrolment Confirmed ("Seat Secured")
     */
    public static function getEnrolmentSuccessTemplate($name, $programmeName, $studentId, $whatsappGroupLink = '') {
        $firstName = explode(' ', trim($name))[0] ?: 'Fellow';
        $vipLink = !empty($whatsappGroupLink) ? $whatsappGroupLink : (defined('WHATSAPP_VIP_ENROLLED_LINK') ? WHATSAPP_VIP_ENROLLED_LINK : 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi');

        $bodyHtml = <<<HTML
        <p style="margin:0 0 14px;">Dear <strong>{$firstName}</strong>,</p>

        <p style="margin:0 0 14px;">
            Congratulations and welcome to Newton Academy! Your one-time admissions commitment fee of <strong>₦20,000</strong> has been officially received and verified.
        </p>

        <p style="margin:0 0 14px;">
            Your status is now upgraded to <strong>Verified Newton Academy Fellow</strong>. Your 100% full-tuition scholarship (worth ₦200,000) is locked in, and your seat in the upcoming cohort is officially guaranteed.
        </p>

        <!-- Official Enrollment Pass Box -->
        <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; margin:22px 0;">
            <div style="font-size:11px; font-weight:800; color:#15803d; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                Official Enrollment Credentials
            </div>
            <table width="100%" cellpadding="4" cellspacing="0" style="font-size:13px; color:#0f172a;">
                <tr>
                    <td style="font-weight:700; color:#166534; width:140px;">Student ID:</td>
                    <td style="font-family:monospace; font-weight:800; color:#005f5a;">{$studentId}</td>
                </tr>
                <tr>
                    <td style="font-weight:700; color:#166534;">Enrolled Track:</td>
                    <td style="font-weight:800;">{$programmeName}</td>
                </tr>
                <tr>
                    <td style="font-weight:700; color:#166534;">Scholarship Status:</td>
                    <td><span style="font-weight:800; color:#15803d;">100% Tuition Fully Covered (₦0 Balance)</span></td>
                </tr>
                <tr>
                    <td style="font-weight:700; color:#166534;">Admission Fee:</td>
                    <td>₦20,000 (Paid &amp; Verified)</td>
                </tr>
            </table>
        </div>

        <h3 style="font-size:15px; font-weight:800; color:#0f172a; margin:24px 0 10px;">
            Next Step: Join the VIP Enrolled Fellows Room
        </h3>
        
        <p style="margin:0 0 14px;">
            As an enrolled fellow, you now have access to our private <strong>VIP Enrolled Fellows WhatsApp Room</strong> where course materials, live workshop links, tutor office hours, and collaborative projects are coordinated.
        </p>
HTML;

        return self::wrapEmail(
            'Office of Fellow Onboarding',
            'Enrolment Confirmed: Your Seat is Officially Secured',
            $bodyHtml,
            'Access VIP Enrolled Fellows WhatsApp Room',
            $vipLink
        );
    }
}

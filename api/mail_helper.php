<?php
/**
 * Newton Academy - Mail Helper
 * Sends rich transactional emails using cPanel SMTP or standard mail fallback.
 * Formatted with institutional Deep Teal branding and zero emojis.
 */

require_once __DIR__ . '/../config.php';

class NewtonMailer {

    public static function send($toEmail, $toName, $subject, $htmlContent) {
        if (defined('SMTP_HOST') && SMTP_HOST !== 'mail.newtonacademy.co' && !empty(SMTP_PASS)) {
            $smtpResult = self::sendViaSmtp($toEmail, $toName, $subject, $htmlContent);
            if ($smtpResult === true) {
                return true;
            }
        }

        return self::sendViaNativeMail($toEmail, $toName, $subject, $htmlContent);
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
     * Email Template 1: Virtual Conference Pass & Waitlist Confirmation
     */
    public static function getOptinWelcomeTemplate($name) {
        $waitlistLink = WHATSAPP_WAITLIST_LINK;
        $academyName = ACADEMY_NAME;

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Virtual Conference Pass is Confirmed</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#1e293b; line-height:1.6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 15px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0; max-width:600px; width:100%;">
                    <tr>
                        <td style="background-color:#004d4d; padding:32px 30px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700; letter-spacing:0.5px;">NEWTON ACADEMY</h1>
                            <p style="color:#99f6e4; margin:6px 0 0; font-size:12px; text-transform:uppercase; letter-spacing:1.5px;">Virtual Conference Admissions</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 32px;">
                            <span style="font-size:11px; font-weight:700; color:#008080; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:8px;">
                                Official Delegate Confirmation
                            </span>
                            <h2 style="color:#0f172a; margin:0 0 16px; font-size:20px; font-weight:700;">
                                Your Virtual Conference Pass is Confirmed
                            </h2>
                            <p style="margin:0 0 16px; font-size:15px; color:#475569;">
                                Dear {$name},
                            </p>
                            <p style="margin:0 0 16px; font-size:15px; color:#475569;">
                                We are pleased to confirm your seat for the upcoming virtual conference: <strong>Digital and Financial Literacy: Building Your Brand, Growing Your Business and Using AI to Get Ahead</strong>.
                            </p>
                            
                            <div style="background-color:#f0fdfa; border-left:4px solid #008080; padding:18px; border-radius:4px; margin:24px 0;">
                                <strong style="color:#004d4d; font-size:14px; display:block; margin-bottom:6px;">REQUIRED NEXT ACTION:</strong>
                                <p style="margin:0; font-size:13px; color:#0f766e; line-height:1.5;">
                                    The conference live stream link, speaker workbooks, panel schedules, and breakout links are shared directly inside the <strong>Private Conference Delegates WhatsApp Room</strong>. Please enter the room today to confirm your attendance.
                                </p>
                            </div>

                            <div style="text-align:center; margin:32px 0;">
                                <a href="{$waitlistLink}" style="display:inline-block; background-color:#008080; color:#ffffff; font-weight:700; font-size:15px; text-decoration:none; padding:15px 34px; border-radius:8px;">
                                    Enter Conference Delegates WhatsApp Room
                                </a>
                            </div>

                            <p style="font-size:13px; color:#64748b; margin:24px 0 0;">
                                Keep an eye on your inbox for upcoming speaker announcements and your official conference agenda.
                            </p>

                            <hr style="border:none; border-top:1px solid #e2e8f0; margin:28px 0;">

                            <p style="margin:0; font-size:13px; color:#0f172a; font-weight:700;">Conference Organizing Secretariat</p>
                            <p style="margin:2px 0 0; font-size:12px; color:#94a3b8;">{$academyName}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#fafbfc; padding:20px; text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #e2e8f0;">
                            &copy; 2026 {$academyName}. All rights reserved.
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
     * Email Template 2: Scholarship Award Letter
     */
    public static function getScholarshipApprovalTemplate($name, $programmeName, $checkoutUrl) {
        $academyName = ACADEMY_NAME;
        $appFee = number_format(SCHOLARSHIP_APPLICATION_FEE);
        $originalPrice = number_format(ORIGINAL_PRICE);

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Official Award of 100% Full Tuition Scholarship</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#1e293b; line-height:1.6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 15px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0; max-width:600px; width:100%;">
                    <tr>
                        <td style="background-color:#005f5a; padding:32px 30px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700; letter-spacing:0.5px;">NEWTON ACADEMY</h1>
                            <p style="color:#99f6e4; margin:6px 0 0; font-size:12px; text-transform:uppercase; letter-spacing:1.5px;">Office of Academic Affairs & Awards</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 32px;">
                            <span style="font-size:11px; font-weight:700; color:#005f5a; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:8px;">
                                Formal Notification
                            </span>
                            <h2 style="color:#0f172a; margin:0 0 16px; font-size:20px; font-weight:700;">
                                Official Award of 100% Full Tuition Scholarship
                            </h2>

                            <p style="margin:0 0 16px; font-size:15px; color:#475569;">
                                Dear <strong>{$name}</strong>,
                            </p>
                            <p style="margin:0 0 18px; font-size:15px; color:#475569;">
                                Following review of your candidate application, the Academic Board of {$academyName} has formally granted you a <strong>100% Full Tuition Scholarship</strong> for the following flagship program:
                            </p>

                            <div style="background-color:#f0f9f8; border:1px solid #ccfbf1; border-radius:8px; padding:20px; margin:22px 0;">
                                <div style="font-size:11px; font-weight:700; color:#005f5a; text-transform:uppercase; letter-spacing:1px;">Approved Track:</div>
                                <div style="font-size:17px; font-weight:700; color:#004d49; margin:4px 0 14px;">{$programmeName}</div>

                                <table width="100%" cellpadding="4" cellspacing="0" style="font-size:13px; color:#334155; border-top:1px solid #ccfbf1; padding-top:8px;">
                                    <tr>
                                        <td>Standard Program Tuition:</td>
                                        <td align="right" style="text-decoration:line-through; color:#94a3b8;">₦{$originalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Newton Academy Endowment:</td>
                                        <td align="right" style="color:#005f5a; font-weight:700;">- ₦{$originalPrice} (100% Full Tuition Covered)</td>
                                    </tr>
                                    <tr>
                                        <td>Tuition Payable:</td>
                                        <td align="right" style="color:#059669; font-weight:700;">₦0.00 (FREE)</td>
                                    </tr>
                                    <tr style="font-weight:700; font-size:15px; border-top:1px solid #ccfbf1;">
                                        <td style="color:#004d49; padding-top:8px;">Mandatory Application & Commitment Fee:</td>
                                        <td align="right" style="color:#005f5a; padding-top:8px;">₦{$appFee} Only</td>
                                    </tr>
                                </table>
                            </div>

                            <p style="font-size:14px; color:#475569; margin:18px 0;">
                                Your scholarship completely covers tuition, granting full unhindered access to our international faculty, the complete accredited 3-month curriculum, hands-on masterclasses, and AI tools. Because of unprecedented demand and limited cohort bandwidth, the ₦{$appFee} application fee serves as a vital commitment filter to guarantee our seats go to candidates who will complete the entire programme.
                            </p>

                            <div style="background-color:#fffbeb; border-left:4px solid #d97706; padding:14px; border-radius:4px; margin:22px 0;">
                                <p style="margin:0; font-size:12px; color:#92400e;">
                                    <strong>Seat Hold Policy:</strong> Due to mentor-to-student bandwidth ratios, your scholarship award is reserved for <strong>24 hours</strong>. Please finalize your enrollment to secure your place.
                                </p>
                            </div>

                            <div style="text-align:center; margin:32px 0;">
                                <a href="{$checkoutUrl}" style="display:inline-block; background-color:#008080; color:#ffffff; font-weight:700; font-size:15px; text-decoration:none; padding:16px 36px; border-radius:8px;">
                                    Access Award Document & Finalize Admission
                                </a>
                            </div>

                            <hr style="border:none; border-top:1px solid #e2e8f0; margin:28px 0;">

                            <p style="margin:0; font-size:13px; color:#0f172a; font-weight:700;">Admissions & Scholarship Committee</p>
                            <p style="margin:2px 0 0; font-size:12px; color:#94a3b8;">{$academyName}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#fafbfc; padding:20px; text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #e2e8f0;">
                            &copy; 2026 {$academyName}. Official Admissions Portal.
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
}

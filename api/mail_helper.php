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
     * Clean, Harmonized Master Layout (Refined Width, Brand Yellow Touches, Editorial Elegance)
     * Centered: Top stripe, Logo, Tagline Pill, Main Page Headline, CTA Button, and Footer.
     * Left-Aligned: Body copy, subheadings, paragraphs, bullet lists, and Founder Sign-off.
     */
    public static function wrapCleanEmail($title, $bodyHtml, $ctaText = '', $ctaUrl = '', $secondaryLink = null) {
        $logoUrl = 'https://freedomoba.github.io/newton-academy/assets/logo.png';
        $founderName = 'Ade Braimoh';
        $officialEmail = 'na@newtoncore.com';

        $ctaBlock = '';
        if (!empty($ctaText) && !empty($ctaUrl)) {
            $ctaBlock = <<<HTML
            <div style="margin:30px 0 16px; text-align:center;">
                <a href="{$ctaUrl}" style="display:inline-block; background-color:#f59e0b; background:linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%); color:#0f172a; font-weight:800; font-size:15px; text-decoration:none; padding:14px 30px; border-radius:8px; border:1px solid #d97706; box-shadow:0 3px 8px rgba(245, 158, 11, 0.25);">
                    {$ctaText} &rarr;
                </a>
            </div>
HTML;
        }

        $secondaryBlock = '';
        if (!empty($secondaryLink) && isset($secondaryLink['text']) && isset($secondaryLink['url'])) {
            $secondaryBlock = <<<HTML
            <div style="margin:12px 0 24px; font-size:13.5px; text-align:center;">
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
<body style="margin:0; padding:24px 12px; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b; line-height:1.75; -webkit-font-smoothing:antialiased;">
    
    <!-- Outer Card: Compact 520px Max Width -->
    <div style="max-width:520px; margin:0 auto; background-color:#ffffff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; box-shadow:0 4px 14px rgba(0,0,0,0.03);">
        
        <!-- Signature Brand Yellow & Deep Teal Top Accent Stripe -->
        <div style="height:5px; background:linear-gradient(90deg, #005f5a 0%, #f59e0b 60%, #eab308 100%); width:100%;"></div>

        <div style="padding:30px 24px 36px;">
            
            <!-- Centered Logo -->
            <div style="text-align:center; margin-bottom:12px;">
                <a href="https://freedomoba.github.io/newton-academy/" style="text-decoration:none; display:inline-block;">
                    <img src="{$logoUrl}" alt="Newton Academy" width="150" style="width:150px; height:auto; display:block; margin:0 auto;" />
                </a>
            </div>

            <!-- Newton Academy Yellow Tagline Pill -->
            <div style="text-align:center; margin-bottom:18px;">
                <span style="display:inline-block; background-color:#fef3c7; color:#92400e; font-size:10.5px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; padding:3px 10px; border-radius:20px; border:1px solid #fde68a;">Newton Academy &bull; Official Dispatch</span>
            </div>

            <div style="height:1px; background-color:#f1f5f9; margin-bottom:24px;"></div>

            <!-- Centered Main Headline -->
            <h1 style="font-size:21px; font-weight:800; color:#003835; margin:0 0 22px; line-height:1.35; letter-spacing:-0.2px; text-align:center;">
                {$title}
            </h1>

            <!-- Natural Left-Aligned Body Content -->
            <div style="font-size:14.5px; color:#334155; line-height:1.75; text-align:left;">
                {$bodyHtml}
            </div>

            <!-- Centered Primary Action Button (Touch of Yellow) -->
            {$ctaBlock}

            <!-- Centered Secondary Link -->
            {$secondaryBlock}

            <!-- Natural Left-Aligned Sign-off -->
            <div style="margin-top:32px; padding-top:20px; border-top:1px solid #f1f5f9; font-size:14px; color:#475569; line-height:1.6; text-align:left;">
                <p style="margin:0 0 4px; font-weight:700; color:#0f172a;">Warm regards,</p>
                <p style="margin:0; font-weight:800; color:#003835; font-size:15px;">{$founderName}</p>
                <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Founder, Newton Academy</p>
                <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Official Email: <a href="mailto:{$officialEmail}" style="color:#005f5a; text-decoration:none;">{$officialEmail}</a></p>
            </div>

            <!-- Centered Legal Footer -->
            <div style="margin-top:28px; padding-top:16px; border-top:1px solid #f8fafc; font-size:11px; color:#94a3b8; line-height:1.6; text-align:center;">
                <p style="margin:0;">&copy; 2026 Newton Academy. All rights reserved.</p>
                <p style="margin:4px 0 0;">Lagos, Nigeria &bull; {$officialEmail}</p>
            </div>

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
        
        <p style="margin:0 0 16px; font-size:16.5px; font-weight:800; color:#005f5a; line-height:1.4;">
            🎉 Congratulations! Your registration for the Digital and Financial Literacy Virtual Conference is confirmed.
        </p>

        <p style="margin:0 0 16px;">
            We are excited to welcome you to this premier virtual conference featuring seasoned global practitioners with experience from Microsoft, Meta, Accenture, and 7Up.
        </p>

        <!-- Boxed & Highlighted Notice: Move Us to Primary (Yellow & Red Accents) -->
        <div style="background-color:#fffbeb; border:1.5px solid #fde047; border-left:4px solid #eab308; border-radius:8px; padding:16px 18px; margin:22px 0;">
            <div style="margin-bottom:8px;">
                <span style="display:inline-block; background-color:#ef4444; color:#ffffff; font-size:10.5px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; padding:3px 8px; border-radius:4px; margin-right:6px; vertical-align:middle;">Action Required</span>
                <strong style="color:#78350f; font-size:14px; vertical-align:middle;">Move Us to Your Primary Inbox</strong>
            </div>
            <p style="margin:0 0 10px; font-size:13.5px; color:#78350f; line-height:1.55;">
                Email systems often route conference materials to the <strong>Promotions</strong> or <strong>Spam</strong> tab. To ensure you receive session workbooks, live conference links, and practical AI templates:
            </p>
            <ul style="margin:0; padding-left:18px; font-size:13px; color:#78350f; line-height:1.65;">
                <li style="margin-bottom:5px;"><strong>On Gmail (Desktop):</strong> Drag this email to your <strong>Primary</strong> tab and click &ldquo;Yes&rdquo; when prompted.</li>
                <li style="margin-bottom:5px;"><strong>On Mobile:</strong> Tap the <strong>&bull;&bull;&bull; (three dots)</strong> at the top right and select <strong>&ldquo;Move to Primary&rdquo;</strong>.</li>
                <li>Add our official address <strong style="color:#0f172a; text-decoration:underline;">{$officialEmail}</strong> to your email contacts list.</li>
            </ul>
        </div>

        <p style="margin:0 0 8px; font-size:15px; font-weight:700; color:#003835;">
            Apply for a 100% Full Tuition Scholarship (DM &amp; DE):
        </p>
        <p style="margin:0 0 12px;">
            As an official conference delegate, you are invited to apply for our <strong>100% Full Tuition Scholarship (valued at ₦200,000)</strong> to study either of our two premier VIP courses:
        </p>
        <ul style="margin:0 0 16px; padding-left:20px; line-height:1.7;">
            <li style="margin-bottom:8px;"><strong>1. Digital Marketing + Applied AI (DM):</strong> Master high-converting funnels, performance advertising, content automation, and AI-driven growth.</li>
            <li><strong>2. Digital Entrepreneurship &amp; Business Innovation + Applied AI (DE):</strong> Master commercial ideation, high-margin digital product packaging, and AI-automated business scaling.</li>
        </ul>
        <p style="margin:0 0 20px;">
            Scholarship allocations are limited. You can take the 30-second live evaluation right now:<br>
            <a href="{$scholarshipUrl}" style="color:#005f5a; font-weight:700; text-decoration:underline;">Click here to apply for the 100% Scholarship (DM or DE) &rarr;</a>
        </p>

        <p style="margin:0 0 16px;">
            Please tap the button below to enter the Private Conference Delegates WhatsApp Room where schedules and live session links will be shared:
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
     * Email Template 2: Scholarship Award Letter (Copywriter Edition)
     */
    public static function getScholarshipApprovalTemplate($name, $programmeName, $checkoutUrl) {
        $firstName = explode(' ', trim($name))[0] ?: 'Candidate';

        $bodyHtml = <<<HTML
        <p style="margin:0 0 16px;">Dear {$firstName},</p>

        <p style="margin:0 0 16px; font-size:17px; font-weight:800; color:#005f5a; line-height:1.4;">
            🎉 Congratulations! You have been officially awarded a 100% Full Tuition Scholarship.
        </p>

        <p style="margin:0 0 16px;">
            We have exceptional news for you.
        </p>

        <p style="margin:0 0 16px;">
            Following a rigorous evaluation of your candidate profile, the Academic Board of Newton Academy has formally approved your candidacy for the <strong>{$programmeName} (Flagship Diploma)</strong>.
        </p>

        <p style="margin:0 0 16px;">
            Out of hundreds of applications reviewed across the continent this week, your ambition, background, and commitment stood out. You have been selected into an elite cohort of emerging digital operators and business leaders.
        </p>

        <!-- Official Award Breakdown Box (Yellow Accent) -->
        <div style="background-color:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:16px 18px; margin:20px 0;">
            <p style="margin:0 0 8px; font-weight:800; color:#92400e; font-size:13.5px; text-transform:uppercase; letter-spacing:0.5px;">
                Official Scholarship Allocation Summary
            </p>
            <ul style="margin:0; padding-left:18px; font-size:14px; color:#78350f; line-height:1.7;">
                <li style="margin-bottom:4px;">Standard 3-Month Tuition: <span style="text-decoration:line-through; color:#94a3b8;">₦200,000</span></li>
                <li style="margin-bottom:4px;">Newton Academy 100% Endowment: <strong>-₦200,000 (100% Waived)</strong></li>
                <li style="margin-bottom:4px;">Tuition Balance Payable: <strong style="color:#059669;">₦0.00 (Zero Tuition for 3 Months)</strong></li>
                <li>One-Time Admissions &amp; LMS Portal Fee: <strong>₦20,000 Only</strong></li>
            </ul>
        </div>

        <p style="margin:0 0 16px;">
            This endowment completely wipes out your tuition costs for the entire three-month curriculum. Over the course of the programme, you will receive direct mentorship from seasoned practitioners with experience at Microsoft, Meta, Accenture, and 7Up — mastering real-world, high-income digital competencies.
        </p>

        <p style="margin:0 0 16px;">
            Your one-time ₦20,000 admissions fee covers your student ID issuance, cloud LMS infrastructure, personalized dashboard provisioning, and lifetime access to our alumni network.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Official Award Document Attached:</strong><br>
            Attached directly to this email is your official, signed <strong>Scholarship Award Letter (PDF)</strong> bearing your name, credentials, and institutional reference code for your records.
        </p>

        <p style="margin:0 0 16px;">
            <strong style="color:#b91c1c;">Strict 24-Hour Allocation Policy:</strong><br>
            To maintain our high tutor-to-student coaching standards, seats are strictly capped. Your scholarship seat and ₦200,000 tuition waiver are held for exactly <strong>24 hours</strong>. If your seat is not claimed within this period, your allocation will be automatically released to waitlisted applicants.
        </p>

        <p style="margin:0 0 16px;">
            Do not let this commercial opportunity pass you by. Tap the button below to review your admissions dossier and finalize your seat right now:
        </p>
HTML;

        return self::wrapCleanEmail(
            'Official Award of 100% Full Tuition Scholarship',
            $bodyHtml,
            'Claim Your 100% Scholarship Seat Now',
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

        <!-- Psychological Red & Yellow Urgency Callout -->
        <div style="background-color:#fef2f2; border:1.5px solid #fecaca; border-left:4px solid #ef4444; border-radius:8px; padding:14px 16px; margin:18px 0;">
            <div style="margin-bottom:6px;">
                <span style="display:inline-block; background-color:#ef4444; color:#ffffff; font-size:10px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; padding:2px 7px; border-radius:4px; margin-right:6px;">Urgent</span>
                <strong style="color:#991b1b; font-size:13.5px;">Admissions Quota Warning: 42 of 50 Seats Claimed</strong>
            </div>
            <p style="margin:0; font-size:13px; color:#7f1d1d; line-height:1.5;">
                Over the past 48 hours, 42 candidates have finalized their admissions files. Only <strong>8 remaining scholarship allocations</strong> are available before the quota closes permanently and standard ₦200,000 tuition resumes.
            </p>
        </div>

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
     * Email Template 4: Enrolment Confirmed ("Seat Secured") (Copywriter Edition)
     */
    public static function getEnrolmentSuccessTemplate($name, $programmeName, $studentId) {
        $firstName = explode(' ', trim($name))[0] ?: 'Fellow';
        
        $customMessage = rawurlencode("Hello Odunayo, I have officially secured my seat for Newton Academy and created my portal account on academy.newtoncore.com!\n\n*Name:* {$name}\n*Student ID:* {$studentId}\n*Course:* {$programmeName}\n*Status:* Admission Fee Verified & Portal Account Created\n\nPlease approve my course of choice and add me to the private VIP Enrolled Fellows WhatsApp Room.");
        $odunayoWhatsAppUrl = "https://wa.me/2347019602639?text={$customMessage}";

        $bodyHtml = <<<HTML
        <p style="margin:0 0 16px;">Dear {$firstName},</p>

        <p style="margin:0 0 16px; font-size:18px; font-weight:800; color:#059669; line-height:1.4;">
            🎉 Congratulations — You Are Officially In!
        </p>

        <p style="margin:0 0 16px;">
            Your one-time admissions commitment fee of <strong>₦20,000</strong> has been received, verified, and officially cleared by Admissions.
        </p>

        <p style="margin:0 0 16px;">
            Your status has been upgraded to <strong>Verified Newton Academy Fellow</strong>. Your 100% full-tuition scholarship (₦200,000 endowment) is locked in permanently, and your seat in the upcoming cohort is officially guaranteed with zero tuition balance (₦0.00).
        </p>

        <p style="margin:0 0 16px;">
            By taking decisive action today, you've separated yourself from the crowd of passive observers. You are now part of a driven community of founders, marketers, and digital operators who don't just study the future — they build it.
        </p>

        <!-- Official Credentials Box (Green & Yellow Accents) -->
        <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-left:4px solid #10b981; border-radius:8px; padding:16px 18px; margin:20px 0;">
            <p style="margin:0 0 8px; font-weight:800; color:#166534; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">
                Verified Fellowship Credentials
            </p>
            <ul style="margin:0; padding-left:18px; font-size:14px; color:#14532d; line-height:1.7;">
                <li style="margin-bottom:4px;">Student ID: <strong style="color:#005f5a; font-family:monospace; font-size:15.5px;">{$studentId}</strong></li>
                <li style="margin-bottom:4px;">Enrolled Specialization: <strong>{$programmeName}</strong></li>
                <li style="margin-bottom:4px;">Tuition Coverage: <strong style="color:#059669;">100% Waived by Endowment (₦0 Balance)</strong></li>
                <li>Admission Status: <strong>Verified &amp; Active</strong></li>
            </ul>
        </div>

        <!-- Next Steps to Activate LMS & Course Approval -->
        <p style="margin:24px 0 10px; font-size:16px; font-weight:800; color:#003835;">
            Follow These 2 Steps Immediately for Course Approval:
        </p>

        <!-- Step 1: Sign up on academy.newtoncore.com -->
        <div style="background-color:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:16px 18px; margin:14px 0;">
            <p style="margin:0 0 6px; font-weight:800; color:#92400e; font-size:14px;">
                STEP 1: Create Your Account on the Academy Portal
            </p>
            <p style="margin:0 0 10px; font-size:13.5px; color:#78350f; line-height:1.6;">
                Sign up by creating an account on our official academy portal so that your course of choice can be approved:
            </p>
            <div style="margin:10px 0 12px; text-align:left;">
                <a href="https://academy.newtoncore.com/auth/register" target="_blank" style="display:inline-block; background-color:#005f5a; color:#ffffff; font-weight:800; font-size:13.5px; text-decoration:none; padding:10px 22px; border-radius:6px;">
                    Sign Up at academy.newtoncore.com/auth/register &rarr;
                </a>
            </div>
            <p style="margin:0; font-size:13px; color:#92400e; font-weight:700; line-height:1.55;">
                ⚠️ CRITICAL: You must use the EXACT SAME email address and the SAME NAME ({$name}) you used during your admission. This allows the system to match your file and approve your course faster.
            </p>
        </div>

        <!-- Step 2: Message Odunayo -->
        <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-left:4px solid #10b981; border-radius:8px; padding:16px 18px; margin:14px 0;">
            <p style="margin:0 0 6px; font-weight:800; color:#166534; font-size:14px;">
                STEP 2: Message Odunayo on WhatsApp to Finalize Course Approval
            </p>
            <p style="margin:0 0 10px; font-size:13.5px; color:#14532d; line-height:1.6;">
                After creating your portal account, message <strong>Odunayo</strong> (Lead Admissions Advisor) on WhatsApp. She will verify your portal registration, approve your course enrollment, and add you to the private <strong>VIP Enrolled Fellows WhatsApp Room</strong>.
            </p>
            <p style="margin:0; font-size:12.5px; color:#166534; font-style:italic;">
                A pre-filled verification message containing your Student ID ({$studentId}) will be loaded automatically when you click the button below.
            </p>
        </div>
HTML;

        return self::wrapCleanEmail(
            'Enrolment Confirmed: Your Seat is Officially Secured',
            $bodyHtml,
            'Step 2: Message Odunayo on WhatsApp',
            $odunayoWhatsAppUrl,
            [
                'text' => 'Step 1: Create Your Account at academy.newtoncore.com/auth/register →',
                'url' => 'https://academy.newtoncore.com/auth/register'
            ]
        );
    }
}

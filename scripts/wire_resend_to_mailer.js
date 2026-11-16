const fs = require('fs');

// 1. Update config.php to include config.local.php
let config = fs.readFileSync('config.php', 'utf8');
if (!config.includes('config.local.php')) {
    config = config.replace(
        /<\?php\s*\n/,
        `<?php\n// Load local private environment overrides if present\nif (file_exists(__DIR__ . '/config.local.php')) {\n    require_once __DIR__ . '/config.local.php';\n}\n\n`
    );
    fs.writeFileSync('config.php', config, 'utf8');
    console.log('Updated config.php to include config.local.php');
}

// 2. Update api/mail_helper.php to support Resend
let mailHelper = fs.readFileSync('api/mail_helper.php', 'utf8');
if (!mailHelper.includes('sendViaResend')) {
    const resendMethod = `    private static function sendViaResend($toEmail, $toName, $subject, $htmlContent) {
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
`;

    // Inject in send method
    mailHelper = mailHelper.replace(
        /public static function send\(\$toEmail, \$toName, \$subject, \$htmlContent\) \{/,
        `public static function send($toEmail, $toName, $subject, $htmlContent) {
        if (defined('RESEND_API_KEY') && !empty(RESEND_API_KEY)) {
            $resendResult = self::sendViaResend($toEmail, $toName, $subject, $htmlContent);
            if ($resendResult === true) {
                return true;
            }
        }`
    );

    // Inject method definition before private static function sendViaNativeMail
    mailHelper = mailHelper.replace(
        /private static function sendViaNativeMail/,
        `${resendMethod}\n    private static function sendViaNativeMail`
    );

    fs.writeFileSync('api/mail_helper.php', mailHelper, 'utf8');
    console.log('Updated api/mail_helper.php with Resend API support');
}

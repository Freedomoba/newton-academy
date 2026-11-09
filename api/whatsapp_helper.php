<?php
/**
 * Newton Academy - WhatsApp Automation Dispatcher
 * Dispatches automated WhatsApp messages using UltraMsg, Wassenger, Meta Cloud API,
 * or custom webhook endpoints.
 */

require_once __DIR__ . '/../config.php';

class NewtonWhatsApp {

    /**
     * Sends an automated WhatsApp text message to a recipient.
     */
    public static function send($toPhone, $message) {
        // Clean phone number (international digits only)
        $cleanPhone = preg_replace('/[^0-9]/', '', $toPhone);
        if (empty($cleanPhone)) {
            return false;
        }

        // 1. UltraMsg Integration (if configured)
        if (defined('ULTRAMSG_INSTANCE_ID') && !empty(ULTRAMSG_INSTANCE_ID) && defined('ULTRAMSG_TOKEN') && !empty(ULTRAMSG_TOKEN)) {
            return self::sendViaUltraMsg($cleanPhone, $message);
        }

        // 2. Wassenger Integration (if configured)
        if (defined('WASSENGER_API_KEY') && !empty(WASSENGER_API_KEY)) {
            return self::sendViaWassenger($cleanPhone, $message);
        }

        // 3. Custom Webhook (e.g. Make.com, Zapier, n8n, Meta Cloud API)
        if (defined('WHATSAPP_WEBHOOK_URL') && !empty(WHATSAPP_WEBHOOK_URL)) {
            return self::sendViaCustomWebhook($cleanPhone, $message);
        }

        // Default: Log message for reference if no active API key is set yet
        error_log("NewtonWhatsApp [Simulated]: To: {$cleanPhone} | Message: " . substr($message, 0, 80) . "...");
        return true;
    }

    private static function sendViaUltraMsg($phone, $message) {
        $instanceId = ULTRAMSG_INSTANCE_ID;
        $token = ULTRAMSG_TOKEN;
        $url = "https://api.ultramsg.com/{$instanceId}/messages/chat";

        $params = [
            'token' => $token,
            'to' => $phone,
            'body' => $message,
            'priority' => 10
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response ? true : false;
    }

    private static function sendViaWassenger($phone, $message) {
        $apiKey = WASSENGER_API_KEY;
        $url = "https://api.wassenger.com/v1/messages";

        $payload = json_encode([
            'phone' => '+' . $phone,
            'message' => $message
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Token: ' . $apiKey
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response ? true : false;
    }

    private static function sendViaCustomWebhook($phone, $message) {
        $payload = json_encode([
            'event' => 'whatsapp_dispatch',
            'phone' => $phone,
            'message' => $message,
            'timestamp' => date('Y-m-d H:i:s')
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, WHATSAPP_WEBHOOK_URL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response ? true : false;
    }

    /**
     * WhatsApp Template: Virtual Conference Confirmation
     */
    public static function getConferenceWelcomeMessage($name) {
        $roomLink = WHATSAPP_WAITLIST_LINK;
        return "Hello {$name},\n\nYour delegate pass for 'From Skills to Income: Building Your Brand, Growing Your Business and Using AI to Get Ahead' by Newton Academy is officially confirmed.\n\nPlease join the Private Conference WhatsApp Room now to access your live stream link, speaker workbook, and schedules:\n\n{$roomLink}\n\nWe look forward to hosting you.\n— Newton Academy Secretariat";
    }

    /**
     * WhatsApp Template: Scholarship Approval Notice
     */
    public static function getScholarshipAwardMessage($name, $programme, $checkoutUrl) {
        $fee = number_format(SCHOLARSHIP_APPLICATION_FEE);
        return "Dear {$name},\n\nCongratulations! The Academic Council of Newton Academy has approved your 90% Partial Scholarship for {$programme}.\n\nYour tuition has been subsidized from ₦200,000 down to a one-time application fee of ₦{$fee}.\n\nPlease access your official award letter and finalize your admission here:\n{$checkoutUrl}\n\nNote: Scholarship seat hold expires in 24 hours.\n— Newton Academy Admissions";
    }
}


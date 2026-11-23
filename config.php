<?php
// Load local private environment overrides if present
if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
}

/**
 * Newton Academy - Funnel Configuration
 * Update the values below with your credentials and WhatsApp links.
 */

// Academy Details
define('ACADEMY_NAME', 'Newton Academy');
define('ACADEMY_TAGLINE', 'Empowering Tomorrow\'s Global Leaders in Tech & Business');
define('ACADEMY_EMAIL', 'admissions@newtonacademy.co'); // Replace with your cPanel email

// WhatsApp Community Links
define('WHATSAPP_WAITLIST_LINK', 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi');
define('WHATSAPP_VIP_ENROLLED_LINK', 'https://chat.whatsapp.com/YOUR_VIP_ENROLLED_GROUP_LINK');

// WhatsApp Direct Support Number (international format without +)
define('WHATSAPP_SUPPORT_PHONE', '2348000000000');

// Pricing & Currency
define('CURRENCY_SYMBOL', '₦');
define('ORIGINAL_PRICE', 200000);
define('SCHOLARSHIP_APPLICATION_FEE', 20000); // ₦20,000 application fee

// Nigerian Bank Accounts for Manual Transfer
define('BANK_ACCOUNT_NAME', 'Newton OS Limited');
define('BANK_UBA_ACCOUNT', '1027518730');
define('BANK_ZENITH_ACCOUNT', '1229109189');
define('BANK_UNION_ACCOUNT', '0204007446');

// cPanel SMTP Email Configuration
define('SMTP_HOST', 'mail.newtonacademy.co');      // e.g. mail.yourdomain.com
define('SMTP_PORT', 465);                         // Usually 465 (SSL) or 587 (TLS)
define('SMTP_SECURE', 'ssl');                     // 'ssl' or 'tls'
define('SMTP_USER', 'admissions@newtonacademy.co'); // cPanel email account
define('SMTP_PASS', 'YOUR_CPANEL_EMAIL_PASSWORD');  // cPanel email password
define('SMTP_FROM_NAME', 'Newton Academy Admissions');

// Payment Mode: Manual Bank Transfer Only (Paystack Disabled)
define('PAYSTACK_PUBLIC_KEY', '');
define('PAYSTACK_SECRET_KEY', '');

// Admin Dashboard Password (change to your preferred secure password)
define('ADMIN_PASSWORD', 'Newton2026!');

// Base URL (leave empty to auto-detect)
define('BASE_URL', '');


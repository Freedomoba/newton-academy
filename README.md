# Newton Academy — Full-Stack Scholarship Admissions & Enrollment Funnel

[![PHP 7.4+](https://img.shields.io/badge/PHP-7.4%20%7C%208.x-blue.svg?logo=php)](https://www.php.net/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen.svg)](https://freedomoba.github.io/newton-academy/)

A high-converting, commercial scholarship admissions and student onboarding funnel engineered for **Newton Academy** (powered by **Newton OS Limited**), convened by **Dr. Ade Braimoh**.

---

## 🌟 Funnel Architecture & User Journey

```
[ Paid Ads / Organic Social / Email Marketing / WhatsApp Communities ]
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 1. ADMISSIONS & SCHOLARSHIP PORTAL (index.php / scholarship.php)        │
│    • Academic Specializations: Digital Marketing & Applied AI          │
│    • 100% Full Tuition Endowment Valuation (₦200,000 Waived)          │
│    • Real-time candidate eligibility evaluation & qualification modal  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
       ┌─────────────────────────┐     ┌────────────────────────────┐
       │ Instant Award Letter    │     │ Resend API / SMTP Mailer   │
       │ Native Pure-PHP PDF     │     │ Formatted Decision Notice  │
       │ (Zero External Libs)    │     │ + Attached Formal PDF      │
       └─────────────────────────┘     └────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. OFFICIAL FEE BREAKDOWN & SEAT CONFIRMATION (checkout.php)           │
│    • Structured 2-column financial valuation ledger                    │
│    • ₦20,000 one-time admission & LMS evaluation commitment fee        │
│    • Verified Corporate Bank Accounts (Zenith, UBA, Union Bank)        │
│    • 1-Click "Copy Account" with instant visual clipboard feedback     │
│    • 24-Hour countdown urgency mechanism                               │
│    • WhatsApp direct verification handoff to Lead Admissions Advisor   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. FELLOW ONBOARDING & VIP ADMISSION (success.php / WhatsApp)          │
│    • Verified payment confirmation & candidate file reference ID       │
│    • Instant registration link on Academy LMS: academy.newtoncore.com  │
│    • VIP Enrolled Fellows Room admission via Odunayo (+2347019602639)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Technical Features

1. **High-Converting Financial Ledger & Checkout**
   * Two-column structured valuation table showing tuition waiver (-₦200,000) and net payable commitment (₦20,000).
   * 100% manual bank transfer mode tailored for African fintech realities (Zenith Bank, UBA, Union Bank).
   * Pre-encoded, one-click WhatsApp confirmation links routed directly to **Odunayo (Lead Admissions Advisor)**.

2. **Native Pure-PHP PDF Generator (`api/award_letter_pdf.php`)**
   * Produces authentic, tamper-evident PDF 1.4 scholarship award documents dynamically on the server.
   * **Zero external dependencies**: No Composer, Node.js, Puppeteer, or wkhtmltopdf required. Runs out of the box on standard cPanel shared hosting.

3. **Hybrid Email Dispatcher (`api/mail_helper.php`)**
   * Multi-driver architecture supporting **Resend API**, **cPanel SMTP**, and native PHP mail fallback.
   * Fail-safe execution: Asynchronous error-handling guarantees that email network delays will never interrupt candidate checkout flow.

4. **CSV Lead Recording & De-duplication**
   * Automatically tracks candidate files in `data/scholarship_applications.csv` and `data/enrolled_students.csv`.
   * Intelligently de-duplicates re-submissions by email while maintaining updated applicant metadata.

5. **Dual Environment Parity (PHP + Static HTML)**
   * Complete PHP backend (`*.php`) for cPanel production hosting.
   * Companion static distribution (`*.html`) for instant serverless previews and staging on **GitHub Pages**.

---

## 📁 Repository Structure

```
.
├── api/
│   ├── award_letter_pdf.php       # Standalone pure-PHP PDF generator
│   ├── download_award_letter.php  # Public award letter download endpoint
│   ├── mail_helper.php            # Transactional email dispatcher (Resend / SMTP)
│   ├── optin.php                  # Delegate & prospect opt-in handler
│   └── scholarship.php            # Scholarship intake, validation & CSV logging
├── assets/
│   ├── images/                    # Faculty, advisory, and student proof imagery
│   ├── js/                        # Animation controllers & evaluation modal logic
│   └── logo.png                   # Institutional brand identity
├── data/
│   ├── enrolled_students.csv      # Verified payment & matriculation records
│   └── scholarship_applications.csv # Scholarship applicant pipeline
├── checkout.php                   # Production manual bank transfer & ledger
├── checkout.html                  # Static demo checkout page
├── config.php                     # Central application configuration & bank accounts
├── config.local.php               # Private environment overrides (Resend API key)
├── index.php                      # Main institutional landing page
├── scholarship.php                # Dedicated scholarship application portal
└── README.md
```

---

## 🛠️ cPanel Deployment Guide

1. Clone repository directly into your subdomain document root (e.g. `public_html/apply`):
   ```bash
   git clone https://github.com/Freedomoba/newton-academy.git .
   ```
2. Create `config.local.php` in the root folder with your Resend API credentials:
   ```php
   <?php
   define('RESEND_API_KEY', 'your_resend_api_key_here');
   define('RESEND_SENDER_EMAIL', 'na@newtoncore.com');
   ```
3. Set write permissions on the data directory:
   ```bash
   chmod -R 755 data/
   ```
4. Verify PHP version is set to **PHP 7.4** or **PHP 8.x** with `cURL` and `JSON` enabled.

---

## 👨‍💻 Author

**Freedom Obanijesu Emmanuel**  
Product Engineer & Technical Growth Builder  
* GitHub: [@Freedomoba](https://github.com/Freedomoba)  
* Organization: Lumenvox AI / Newton Academy

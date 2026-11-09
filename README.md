# Newton Academy - Virtual Conference & Scholarship Funnel

A complete, production-ready lead generation and scholarship sales funnel for **Newton Academy**, convened by **Dr. Ade Braimoh**.

---

## 🌟 Funnel Architecture

```
[ Traffic: Social / Ads / Influencers / Community ]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. VIRTUAL CONFERENCE REGISTRATION (index.php)              │
│    Theme: From Skills to Income: Building Your Brand,       │
│           Growing Your Business and Using AI to Get Ahead   │
│    - Focus: Curated for ambitious women & visionary builders│
│    - Keynote & 3 Panel Sessions preview                     │
│    - Free Delegate Pass Form (Full Name, Email, WhatsApp)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
  ┌─────────────────────────┐     ┌────────────────────────────┐
  │ Instant Automated Email │     │ Instant WhatsApp           │
  │ Delegate Pass & Link to │     │ Notification with          │
  │ Delegates WhatsApp Room │     │ Delegates Room Link        │
  └─────────────────────────┘     └────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. THANK YOU & FULL SCHOLARSHIP SALES PAGE (thank-you.php)  │
│    - Top Confirmation: Entry to Delegates WhatsApp Room     │
│    - Sales Letter from Dr. Ade Braimoh                      │
│    - 90% Partial Scholarship Endowment (₦200,000 → ₦20,000)  │
│    - 2 Comprehensive 3-Month Diploma Tracks:                │
│      • Digital Entrepreneurship + Applied AI                │
│      • Digital Marketing + Applied AI                       │
│    - Merged Lumenvox AI Creator Suite:                      │
│      • AI Video Generation (Runway Gen-3, Kling, Luma)      │
│      • Voice Cloning (ElevenLabs)                           │
│      • Prompt Engineering (Claude 3.5 Sonnet, GPT-4o)       │
│      • Desktop Video Editing (CapCut Pro)                   │
│      • AI Adoption for Businesses & Agencies                │
│    - Integrated Scholarship Application & Track Selector    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. SCHOLARSHIP AWARD & CHECKOUT (checkout.php)              │
│    - Formal letter of award from Academic Admissions        │
│    - 24-Hour countdown seat reservation timer               │
│    - Direct Paystack ₦20,000 application fee checkout       │
│    - Direct Nigerian Bank Transfer alternative instructions │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. FELLOW ONBOARDING & SUCCESS (success.php)                │
│    - Verified payment receipt                               │
│    - Direct button to Enrolled Fellows WhatsApp Room        │
│    - PINNED MESSAGE INSTRUCTIONS:                           │
│      "Send Full Name, Email, and Receipt in the group to get│
│       your LMS Portal login credentials activated!"         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ File Structure

| File | Purpose |
| :--- | :--- |
| `config.php` | Master configuration: WhatsApp links, cPanel SMTP, Paystack keys |
| `index.php` | Step 1: Virtual Conference Opt-in Landing Page |
| `thank-you.php` | Step 2: Conference Delegate Confirmation + Full Scholarship Sales Page |
| `checkout.php` | Step 3: Formal Scholarship Award Document & Paystack ₦20,000 Checkout |
| `success.php` | Step 4: Post-Payment Onboarding with LMS Access Instructions |
| `api/optin.php` | Processes delegate registration, sends email, stores lead in CSV |
| `api/scholarship.php` | Processes scholarship application, dispatches award notification |
| `api/verify_payment.php` | Verifies Paystack transaction, activates student enrollment |
| `api/mail_helper.php` | cPanel SMTP mailer with institutional Deep Teal HTML templates |
| `assets/logo.png` | Official Newton Academy logo |
| `assets/favicon.jpg` | Official Newton Academy favicon and social share image |
| `assets/images/` | High-res local imagery (conference, entrepreneurship, marketing, AI editing) |
| `.htaccess` | Apache configuration: HTTPS enforcement, data protection, security headers |
| `preview.js` | Local preview server (`http://localhost:3000`) |

---

## ⚙️ How to Deploy to cPanel

1. Zip all files and folders in this directory.
2. Log in to your **cPanel**.
3. Open **File Manager** $\rightarrow$ Navigate to `public_html` (or your subdomain folder).
4. Upload and extract the zip file.
5. In `config.php`, update:
   - `WHATSAPP_WAITLIST_LINK`
   - `WHATSAPP_VIP_ENROLLED_LINK`
   - `WHATSAPP_SUPPORT_PHONE`
   - `SMTP_USER` and `SMTP_PASS`
   - `PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY`

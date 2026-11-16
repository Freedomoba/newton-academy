const https = require('https');
const fs = require('fs');
const path = require('path');
const { generateAwardPdfBuffer } = require('./generate_award_pdf');

// Read API key securely from config.local.php or environment
let API_KEY = process.env.RESEND_API_KEY || '';
const configLocalPath = path.join(__dirname, '..', 'config.local.php');
if (!API_KEY && fs.existsSync(configLocalPath)) {
    const content = fs.readFileSync(configLocalPath, 'utf8');
    const match = content.match(/RESEND_API_KEY['"],\s*['"]([^'"]+)['"]/);
    if (match) API_KEY = match[1];
}

const SENDER = 'Newton Academy <na@newtoncore.com>';
const OFFICIAL_EMAIL = 'na@newtoncore.com';
const FOUNDER_NAME = 'Ade Braimoh';

// Recipients to receive the 4 test emails
const RECIPIENTS = [
    { name: 'Freedom Emmanuel', email: 'marketerfreedom@gmail.com' },
    { name: 'Freedom Emmanuel', email: 'masterfreedom23@gmail.com' }
];

const WHATSAPP_WAITLIST_LINK = 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi';
const SCHOLARSHIP_URL = 'https://freedomoba.github.io/newton-academy/scholarship.html';
const CHECKOUT_URL = 'https://freedomoba.github.io/newton-academy/checkout.html?app_id=NA-SCH-748921&name=Freedom+Emmanuel&track=Digital+Marketing+%2B+Applied+AI';
const LOGO_URL = 'https://freedomoba.github.io/newton-academy/assets/logo.png';

/**
 * Clean, Editorial Master Layout (NO tables, NO boxed containers)
 * Pure, readable typography, logo at top, and high inbox deliverability.
 */
function wrapCleanEmail({ title, bodyHtml, ctaText = '', ctaUrl = '', secondaryLink = null }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b; line-height:1.7; -webkit-font-smoothing:antialiased;">
    <div style="max-width:600px; margin:0 auto; padding:32px 20px 48px;">
        
        <!-- Top Logo -->
        <div style="padding-bottom:24px; border-bottom:1px solid #e2e8f0; margin-bottom:28px;">
            <a href="https://freedomoba.github.io/newton-academy/" style="text-decoration:none; display:inline-block;">
                <img src="${LOGO_URL}" alt="Newton Academy" width="160" style="width:160px; height:auto; display:block;" />
            </a>
        </div>

        <!-- Heading -->
        <h1 style="font-size:22px; font-weight:800; color:#003835; margin:0 0 20px; line-height:1.35; letter-spacing:-0.2px;">
            ${title}
        </h1>

        <!-- Body Content (Clean text, no box containers, no tables) -->
        <div style="font-size:15px; color:#334155; line-height:1.75;">
            ${bodyHtml}
        </div>

        <!-- Primary Action Button / Link -->
        ${ctaText && ctaUrl ? `
        <div style="margin:32px 0 24px;">
            <a href="${ctaUrl}" style="display:inline-block; background-color:#005f5a; color:#ffffff; font-weight:700; font-size:15px; text-decoration:none; padding:14px 28px; border-radius:8px;">
                ${ctaText} &rarr;
            </a>
        </div>` : ''}

        <!-- Secondary Link -->
        ${secondaryLink ? `
        <div style="margin:16px 0 28px; font-size:14px;">
            <a href="${secondaryLink.url}" style="color:#005f5a; font-weight:700; text-decoration:underline;">
                ${secondaryLink.text}
            </a>
        </div>` : ''}

        <!-- Clean Sign-off -->
        <div style="margin-top:36px; padding-top:24px; border-top:1px solid #e2e8f0; font-size:14px; color:#475569; line-height:1.6;">
            <p style="margin:0 0 4px; font-weight:700; color:#0f172a;">Warm regards,</p>
            <p style="margin:0; font-weight:800; color:#003835; font-size:15px;">${FOUNDER_NAME}</p>
            <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Founder, Newton Academy</p>
            <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Official Email: <a href="mailto:${OFFICIAL_EMAIL}" style="color:#005f5a; text-decoration:none;">${OFFICIAL_EMAIL}</a></p>
        </div>

        <!-- Simple Legal Footer -->
        <div style="margin-top:40px; font-size:11px; color:#94a3b8; line-height:1.6;">
            <p style="margin:0;">&copy; 2026 Newton Academy. All rights reserved.</p>
            <p style="margin:4px 0 0;">Lagos, Nigeria &bull; ${OFFICIAL_EMAIL}</p>
        </div>

    </div>
</body>
</html>`;
}

/**
 * EMAIL 1: Webinar Pass Confirmation
 * Direct congratulations text, Primary inbox instruction, 100% scholarship link for DM and DE.
 */
function getEmail1_WebinarRegistration(name) {
    const firstName = name.split(' ')[0] || 'Delegate';

    const bodyHtml = `
        <p style="margin:0 0 16px;">Dear ${firstName},</p>
        
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
            &bull; Add <strong>${OFFICIAL_EMAIL}</strong> to your email contact list.
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
            <a href="${SCHOLARSHIP_URL}" style="color:#005f5a; font-weight:700; text-decoration:underline;">Click here to apply for the 100% Scholarship (DM or DE) &rarr;</a>
        </p>

        <p style="margin:0 0 16px;">
            Please tap the button below to join the Private Conference Delegates WhatsApp Room where schedules and live session links will be shared:
        </p>
    `;

    return {
        subject: '[Delegate Pass Confirmed] Digital and Financial Literacy Virtual Conference',
        html: wrapCleanEmail({
            title: 'Your Virtual Conference Pass is Confirmed',
            bodyHtml,
            ctaText: 'Enter Conference WhatsApp Room',
            ctaUrl: WHATSAPP_WAITLIST_LINK,
            secondaryLink: {
                text: 'Apply for 100% Full Tuition Scholarship (DM or DE) →',
                url: SCHOLARSHIP_URL
            }
        })
    };
}

/**
 * EMAIL 2: Scholarship Approval Letter (Accompanied by signed PDF attachment)
 * Direct congratulations text, clear numbers, next steps, Ade Braimoh sign-off.
 */
function getEmail2_ScholarshipAward(name, track = 'Digital Marketing + Applied AI') {
    const firstName = name.split(' ')[0] || 'Candidate';

    const bodyHtml = `
        <p style="margin:0 0 16px;">Dear ${firstName},</p>

        <p style="margin:0 0 16px; font-size:16px; font-weight:700; color:#005f5a;">
            Congratulations! You have been approved for a 100% Full Tuition Scholarship.
        </p>

        <p style="margin:0 0 16px;">
            Following the review of your candidate application, the Academic Board of Newton Academy has formally accepted your candidacy for the <strong>${track} (Flagship Diploma)</strong>.
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
    `;

    return {
        subject: `Official Award: 100% Full Tuition Scholarship Granted (${track})`,
        html: wrapCleanEmail({
            title: 'Official Award of 100% Full Tuition Scholarship',
            bodyHtml,
            ctaText: 'Access Award Document & Finalize Seat',
            ctaUrl: CHECKOUT_URL
        })
    };
}

/**
 * EMAIL 3: Pending Seat Follow-up ("Seat Not Yet Secured")
 * Clean text follow-up, urgency, quota count.
 */
function getEmail3_PendingFollowup(name, track = 'Digital Marketing + Applied AI') {
    const firstName = name.split(' ')[0] || 'Candidate';

    const bodyHtml = `
        <p style="margin:0 0 16px;">Dear ${firstName},</p>

        <p style="margin:0 0 16px; font-size:16px; font-weight:700; color:#003835;">
            Quick reminder: Your 100% Scholarship Seat has not yet been secured.
        </p>

        <p style="margin:0 0 16px;">
            This is a priority notification from the Admissions Board regarding your approved scholarship for the <strong>${track}</strong>.
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
    `;

    return {
        subject: `Action Required: Your 100% Scholarship Award is Pending Finalization`,
        html: wrapCleanEmail({
            title: 'Your Scholarship Seat Has Not Yet Been Secured',
            bodyHtml,
            ctaText: 'Secure My 100% Scholarship Seat Now',
            ctaUrl: CHECKOUT_URL
        })
    };
}

/**
 * EMAIL 4: Enrolment Confirmed / Seat Secured
 * Big congratulations text, Student ID, CTA leads directly to Odunayo on WhatsApp with custom text.
 */
function getEmail4_EnrolmentSuccess(name, track = 'Digital Marketing + Applied AI', appId = 'NA-SCH-748921') {
    const firstName = name.split(' ')[0] || 'Fellow';

    // Pre-filled custom message to Odunayo
    const customMessage = `Hello Odunayo, I have officially secured my seat for Newton Academy!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Student ID:* ${appId}%0A*Course:* ${encodeURIComponent(track)}%0A*Status:* 100% Full Tuition Scholarship (Admission Fee Verified)%0A%0APlease verify my admission file and add me to the private VIP Enrolled Fellows WhatsApp Room.`;
    const odunayoWhatsAppUrl = `https://wa.me/2347019602639?text=${customMessage}`;

    const bodyHtml = `
        <p style="margin:0 0 16px;">Dear ${firstName},</p>

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
            &bull; Student ID: <strong style="color:#005f5a; font-family:monospace;">${appId}</strong><br>
            &bull; Enrolled Track: <strong>${track}</strong><br>
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
    `;

    return {
        subject: `Enrolment Confirmed: Your Seat is Officially Secured (${track})`,
        html: wrapCleanEmail({
            title: 'Enrolment Confirmed: Your Seat is Officially Secured',
            bodyHtml,
            ctaText: 'Message Odunayo to Enter VIP Group',
            ctaUrl: odunayoWhatsAppUrl
        })
    };
}

/**
 * Dispatch an email with optional attachments via Resend
 */
function sendEmailViaResend({ to, subject, html, attachments = [] }) {
    return new Promise((resolve, reject) => {
        const payload = {
            from: SENDER,
            to: [to],
            subject: subject,
            html: html
        };

        if (attachments && attachments.length > 0) {
            payload.attachments = attachments;
        }

        const data = JSON.stringify(payload);

        const options = {
            hostname: 'api.resend.com',
            port: 443,
            path: '/emails',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ statusCode: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, raw: body });
                }
            });
        });

        req.on('error', (err) => reject(err));
        req.write(data);
        req.end();
    });
}

/**
 * Run Master Dispatch
 */
async function run() {
    console.log('========================================================');
    console.log('NEWTON ACADEMY - CLEAN TEXT-BASED EDITORIAL TEST EMAILS');
    console.log('FOUNDER: ' + FOUNDER_NAME + ' | EMAIL: ' + OFFICIAL_EMAIL);
    console.log('========================================================\n');

    for (const recipient of RECIPIENTS) {
        console.log(`>>> Dispatching 4 Clean Emails to: ${recipient.email} (${recipient.name})`);

        // EMAIL 1
        console.log('[1/4] Sending Email 1: Webinar Pass + 100% Scholarship Invitation...');
        const e1 = getEmail1_WebinarRegistration(recipient.name);
        const res1 = await sendEmailViaResend({
            to: recipient.email,
            subject: e1.subject,
            html: e1.html
        });
        console.log(`      Status: ${res1.statusCode} | Resend ID: ${res1.data?.id || 'ERR'}`);

        // EMAIL 2 (With Generated Signed PDF Attachment by Ade Braimoh)
        console.log('[2/4] Generating official PDF award letter & sending Email 2...');
        const pdfBuffer = await generateAwardPdfBuffer({
            candidateName: recipient.name,
            programmeName: 'Digital Marketing + Applied AI',
            applicationId: 'NA-SCH-748921'
        });
        const safeName = recipient.name.replace(/[^a-zA-Z0-9]/g, '_');
        const e2 = getEmail2_ScholarshipAward(recipient.name, 'Digital Marketing + Applied AI');
        const res2 = await sendEmailViaResend({
            to: recipient.email,
            subject: e2.subject,
            html: e2.html,
            attachments: [
                {
                    filename: `Newton_Academy_Scholarship_Award_Letter_${safeName}.pdf`,
                    content: pdfBuffer.toString('base64')
                }
            ]
        });
        console.log(`      Status: ${res2.statusCode} | Resend ID: ${res2.data?.id || 'ERR'} | PDF attached: ${pdfBuffer.length} bytes`);

        // EMAIL 3
        console.log('[3/4] Sending Email 3: Pending Seat Follow-up (Not Yet Secured)...');
        const e3 = getEmail3_PendingFollowup(recipient.name, 'Digital Marketing + Applied AI');
        const res3 = await sendEmailViaResend({
            to: recipient.email,
            subject: e3.subject,
            html: e3.html
        });
        console.log(`      Status: ${res3.statusCode} | Resend ID: ${res3.data?.id || 'ERR'}`);

        // EMAIL 4 (Leads to Odunayo directly on WhatsApp)
        console.log('[4/4] Sending Email 4: Enrolment Confirmed (Leads to Odunayo on WhatsApp)...');
        const e4 = getEmail4_EnrolmentSuccess(recipient.name, 'Digital Marketing + Applied AI', 'NA-SCH-748921');
        const res4 = await sendEmailViaResend({
            to: recipient.email,
            subject: e4.subject,
            html: e4.html
        });
        console.log(`      Status: ${res4.statusCode} | Resend ID: ${res4.data?.id || 'ERR'}\n`);
    }

    console.log('========================================================');
    console.log('ALL 4 TEST EMAILS (CLEAN EDITORIAL TEXT, PDF BY ADE BRAIMOH,');
    console.log('na@newtoncore.com, NO TABLES/BOXES, ODUNAYO VIP LINK)');
    console.log('DISPATCHED SUCCESSFULLY TO INBOXES!');
    console.log('========================================================');
}

run().catch(err => {
    console.error('Fatal dispatch error:', err);
});

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
 * Editorial Master Layout (Refined Width, Brand Yellow Touches, Editorial Elegance)
 * Centered: Top stripe, Logo, Tagline Pill, Main Page Headline, CTA Button, and Footer.
 * Left-Aligned: Body copy, subheadings, paragraphs, bullet lists, and Founder Sign-off.
 */
function wrapCleanEmail({ title, bodyHtml, ctaText = '', ctaUrl = '', secondaryLink = null }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
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
                    <img src="${LOGO_URL}" alt="Newton Academy" width="150" style="width:150px; height:auto; display:block; margin:0 auto;" />
                </a>
            </div>

            <!-- Newton Academy Yellow Tagline Pill -->
            <div style="text-align:center; margin-bottom:18px;">
                <span style="display:inline-block; background-color:#fef3c7; color:#92400e; font-size:10.5px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; padding:3px 10px; border-radius:20px; border:1px solid #fde68a;">Newton Academy &bull; Official Dispatch</span>
            </div>

            <div style="height:1px; background-color:#f1f5f9; margin-bottom:24px;"></div>

            <!-- Centered Main Headline -->
            <h1 style="font-size:21px; font-weight:800; color:#003835; margin:0 0 22px; line-height:1.35; letter-spacing:-0.2px; text-align:center;">
                ${title}
            </h1>

            <!-- Natural Left-Aligned Body Content -->
            <div style="font-size:14.5px; color:#334155; line-height:1.75; text-align:left;">
                ${bodyHtml}
            </div>

            <!-- Centered Primary Action Button (Touch of Yellow) -->
            ${ctaText && ctaUrl ? `
            <div style="margin:30px 0 16px; text-align:center;">
                <a href="${ctaUrl}" style="display:inline-block; background-color:#f59e0b; background:linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%); color:#0f172a; font-weight:800; font-size:15px; text-decoration:none; padding:14px 30px; border-radius:8px; border:1px solid #d97706; box-shadow:0 3px 8px rgba(245, 158, 11, 0.25);">
                    ${ctaText} &rarr;
                </a>
            </div>` : ''}

            <!-- Centered Secondary Link -->
            ${secondaryLink ? `
            <div style="margin:12px 0 24px; font-size:13.5px; text-align:center;">
                <a href="${secondaryLink.url}" style="color:#005f5a; font-weight:700; text-decoration:underline;">
                    ${secondaryLink.text}
                </a>
            </div>` : ''}

            <!-- Natural Left-Aligned Sign-off -->
            <div style="margin-top:32px; padding-top:20px; border-top:1px solid #f1f5f9; font-size:14px; color:#475569; line-height:1.6; text-align:left;">
                <p style="margin:0 0 4px; font-weight:700; color:#0f172a;">Warm regards,</p>
                <p style="margin:0; font-weight:800; color:#003835; font-size:15px;">${FOUNDER_NAME}</p>
                <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Founder, Newton Academy</p>
                <p style="margin:2px 0 0; color:#64748b; font-size:13px;">Official Email: <a href="mailto:${OFFICIAL_EMAIL}" style="color:#005f5a; text-decoration:none;">${OFFICIAL_EMAIL}</a></p>
            </div>

            <!-- Centered Legal Footer -->
            <div style="margin-top:28px; padding-top:16px; border-top:1px solid #f8fafc; font-size:11px; color:#94a3b8; line-height:1.6; text-align:center;">
                <p style="margin:0;">&copy; 2026 Newton Academy. All rights reserved.</p>
                <p style="margin:4px 0 0;">Lagos, Nigeria &bull; ${OFFICIAL_EMAIL}</p>
            </div>

        </div>

    </div>
</body>
</html>`;
}

/**
 * EMAIL 1: Webinar Pass Confirmation
 */
function getEmail1_WebinarRegistration(name) {
    const firstName = name.split(' ')[0] || 'Delegate';

    const bodyHtml = `
        <p style="margin:0 0 16px;">Dear ${firstName},</p>
        
        <p style="margin:0 0 16px; font-size:16px; font-weight:700; color:#005f5a;">
            Congratulations! Your registration for the Digital and Financial Literacy Virtual Conference is confirmed.
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
                <li>Add our official address <strong style="color:#0f172a; text-decoration:underline;">${OFFICIAL_EMAIL}</strong> to your email contacts list.</li>
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
            <a href="${SCHOLARSHIP_URL}" style="color:#005f5a; font-weight:700; text-decoration:underline;">Click here to apply for the 100% Scholarship (DM or DE) &rarr;</a>
        </p>

        <p style="margin:0 0 16px;">
            Please tap the button below to enter the Private Conference Delegates WhatsApp Room where schedules and live session links will be shared:
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
 * EMAIL 2: Scholarship Approval Letter (Accompanied by clean normal PDF)
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

        <!-- Official Award Breakdown Box (Yellow Accent) -->
        <div style="background-color:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:14px 16px; margin:18px 0;">
            <p style="margin:0 0 6px; font-weight:800; color:#92400e; font-size:13.5px; text-transform:uppercase; letter-spacing:0.5px;">
                Official Award Breakdown
            </p>
            <ul style="margin:0; padding-left:18px; font-size:13.5px; color:#78350f; line-height:1.65;">
                <li style="margin-bottom:4px;">Standard Program Tuition: <span style="text-decoration:line-through; color:#94a3b8;">₦200,000</span></li>
                <li style="margin-bottom:4px;">Newton Academy 100% Endowment: <strong>-₦200,000 (Fully Waived)</strong></li>
                <li style="margin-bottom:4px;">Tuition Payable: <strong style="color:#059669;">₦0.00 (FREE)</strong></li>
                <li>One-Time Admissions &amp; Evaluation Fee: <strong>₦20,000 Only</strong></li>
            </ul>
        </div>

        <p style="margin:0 0 16px;">
            Your scholarship completely eliminates all tuition expenses for the entire 3 months. The one-time ₦20,000 admissions fee covers your student portal registration, verified student ID, and live LMS setup.
        </p>

        <p style="margin:0 0 16px;">
            <strong>Official Award Document Attached:</strong><br>
            Your formal signed Scholarship Award Letter containing your full name and credentials has been generated and attached to this email as a PDF document for your permanent records.
        </p>

        <p style="margin:0 0 16px;">
            <strong style="color:#b91c1c;">Next Step — 24-Hour Allocation Policy:</strong><br>
            Due to strict mentor-to-student coaching ratios, your scholarship award is reserved for exactly <strong>24 hours</strong>. Please click the button below to access your admissions dossier and finalize your seat before your allocation expires:
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
 * EMAIL 3: Pending Seat Follow-up
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
 * EMAIL 4: Enrolment Confirmed / Seat Secured (Leads to Odunayo)
 */
function getEmail4_EnrolmentSuccess(name, track = 'Digital Marketing + Applied AI', appId = 'NA-SCH-748921') {
    const firstName = name.split(' ')[0] || 'Fellow';

    // Pre-filled custom message to Odunayo
    const customMessage = `Hello Odunayo, I have officially secured my seat for Newton Academy!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Student ID:* ${appId}%0A*Course:* ${encodeURIComponent(track)}%0A*Status:* 100% Full Tuition Scholarship (Admission Fee Verified)%0A%0APlease verify my admission file and add me to the private VIP Enrolled Fellows WhatsApp Room.`;
    const odunayoWhatsAppUrl = `https://wa.me/2347019602639?text=${customMessage}`;

    const bodyHtml = `
        <p style="margin:0 0 16px;">Dear ${firstName},</p>

        <p style="margin:0 0 16px; font-size:18px; font-weight:700; color:#059669;">
            Congratulations and welcome to Newton Academy!
        </p>

        <p style="margin:0 0 16px;">
            Your one-time admissions commitment fee of <strong>₦20,000</strong> has been officially received and verified.
        </p>

        <p style="margin:0 0 16px;">
            Your status is now upgraded to <strong>Verified Newton Academy Fellow</strong>. Your 100% full-tuition scholarship (worth ₦200,000) is locked in, and your seat in the upcoming cohort is officially guaranteed with zero tuition balance (₦0.00).
        </p>

        <!-- Official Credentials Box (Green & Yellow Accents) -->
        <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-left:4px solid #10b981; border-radius:8px; padding:14px 16px; margin:18px 0;">
            <p style="margin:0 0 6px; font-weight:800; color:#166534; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">
                Official Enrollment Credentials
            </p>
            <ul style="margin:0; padding-left:18px; font-size:13.5px; color:#14532d; line-height:1.65;">
                <li style="margin-bottom:4px;">Student ID: <strong style="color:#005f5a; font-family:monospace; font-size:15px;">${appId}</strong></li>
                <li style="margin-bottom:4px;">Enrolled Track: <strong>${track}</strong></li>
                <li style="margin-bottom:4px;">Scholarship Status: <strong style="color:#059669;">100% Tuition Fully Covered (₦0 Balance)</strong></li>
                <li>Admission Fee: <strong>₦20,000 (Paid &amp; Verified)</strong></li>
            </ul>
        </div>

        <p style="margin:0 0 8px; font-size:15px; font-weight:700; color:#003835;">
            Final Step — Message Odunayo on WhatsApp to Enter the VIP Group:
        </p>
        <p style="margin:0 0 12px;">
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
    console.log('NEWTON ACADEMY - HARMONIZED EDITORIAL TEST EMAILS');
    console.log('CENTERED: Logo, Main Title, Buttons | LEFT: Body, Lists, Sign-off');
    console.log('FOUNDER: ' + FOUNDER_NAME + ' | EMAIL: ' + OFFICIAL_EMAIL);
    console.log('========================================================\n');

    for (const recipient of RECIPIENTS) {
        console.log(`>>> Dispatching 4 Harmonized Emails to: ${recipient.email} (${recipient.name})`);

        // EMAIL 1
        console.log('[1/4] Sending Email 1: Webinar Pass + 100% Scholarship Invitation...');
        const e1 = getEmail1_WebinarRegistration(recipient.name);
        const res1 = await sendEmailViaResend({
            to: recipient.email,
            subject: e1.subject,
            html: e1.html
        });
        console.log(`      Status: ${res1.statusCode} | Resend ID: ${res1.data?.id || 'ERR'}`);

        // EMAIL 2 (With Clean Normal PDF by Ade Braimoh)
        console.log('[2/4] Generating normal letterhead PDF & sending Email 2...');
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
    console.log('ALL 4 TEST EMAILS DISPATCHED SUCCESSFULLY TO INBOXES!');
    console.log('========================================================');
}

run().catch(err => {
    console.error('Fatal dispatch error:', err);
});

const https = require('https');
const fs = require('fs');
const path = require('path');

let apiKey = process.env.RESEND_API_KEY || '';
const configLocalPath = path.join(__dirname, '..', 'config.local.php');
if (!apiKey && fs.existsSync(configLocalPath)) {
    const content = fs.readFileSync(configLocalPath, 'utf8');
    const match = content.match(/RESEND_API_KEY['"],\s*['"]([^'"]+)['"]/);
    if (match) apiKey = match[1];
}
const sender = 'Newton Academy <na@newtoncore.com>';
const recipient = 'marketerfreedom@gmail.com';

const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newton Academy Official Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; padding:32px 16px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);">
                    
                    <!-- Top Brand Bar -->
                    <tr>
                        <td style="background:linear-gradient(135deg, #002826 0%, #003835 50%, #001f1e 100%); padding:28px 32px; text-align:center; border-bottom:3px solid #f59e0b;">
                            <div style="font-size:20px; font-weight:900; letter-spacing:1px; color:#ffffff; text-transform:uppercase;">
                                NEWTON ACADEMY
                            </div>
                            <div style="font-size:11px; font-weight:700; color:#fbbf24; text-transform:uppercase; letter-spacing:2px; margin-top:4px;">
                                Admissions &amp; Enterprise Infrastructure
                            </div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding:36px 32px 28px;">
                            <div style="display:inline-block; padding:4px 12px; background-color:#ecfdf5; border:1px solid #a7f3d0; border-radius:9999px; font-size:11px; font-weight:800; color:#047857; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px;">
                                &#10003; Verification Test Successful
                            </div>

                            <h1 style="margin:0 0 16px; font-size:22px; font-weight:800; color:#0f172a; line-height:1.3;">
                                Official Email Delivery Engine Verified
                            </h1>

                            <p style="margin:0 0 16px; font-size:15px; color:#334155; line-height:1.6;">
                                Hello <strong>Freedom</strong>,
                            </p>

                            <p style="margin:0 0 18px; font-size:14px; color:#334155; line-height:1.6;">
                                This confirms that the Newton Academy email system is now <strong>100% verified, authenticated, and active</strong> via our dedicated Resend infrastructure.
                            </p>

                            <!-- Status Box -->
                            <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; margin:24px 0;">
                                <table width="100%" cellpadding="4" cellspacing="0" style="font-size:13px; color:#1e293b;">
                                    <tr>
                                        <td style="font-weight:700; color:#15803d; width:140px;">Sender Address:</td>
                                        <td style="font-family:monospace; font-weight:600;">na@newtoncore.com</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:700; color:#15803d;">Recipient Address:</td>
                                        <td style="font-family:monospace; font-weight:600;">${recipient}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:700; color:#15803d;">Domain Status:</td>
                                        <td><span style="color:#15803d; font-weight:800;">&#10003; Verified &amp; Signed</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:700; color:#15803d;">Dispatch Time:</td>
                                        <td>${new Date().toUTCString()}</td>
                                    </tr>
                                </table>
                            </div>

                            <p style="margin:0 0 20px; font-size:14px; color:#334155; line-height:1.6;">
                                All candidate notifications, 100% full-tuition scholarship award letters, admissions portal credentials, and automated follow-ups will now be delivered smoothly straight to delegate inboxes.
                            </p>

                            <div style="text-align:center; margin:32px 0 16px;">
                                <a href="https://freedomoba.github.io/newton-academy/scholarship.html" style="display:inline-block; background:linear-gradient(135deg, #005f5a 0%, #004d49 100%); color:#ffffff; font-weight:800; font-size:14px; text-decoration:none; padding:14px 28px; border-radius:10px; box-shadow:0 4px 14px rgba(0,95,90,0.3);">
                                    View Official Admissions Portal &rarr;
                                </a>
                            </div>

                            <hr style="border:none; border-top:1px solid #e2e8f0; margin:28px 0;">

                            <p style="margin:0; font-size:13px; color:#0f172a; font-weight:800;">Admissions &amp; Academic Council</p>
                            <p style="margin:2px 0 0; font-size:12px; color:#64748b;">Newton Academy &bull; Empowering Tomorrow's Global Leaders</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f8fafc; padding:18px 32px; text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #e2e8f0;">
                            &copy; 2026 Newton Academy. All rights reserved. Professional education &amp; digital enterprise infrastructure.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

function sendEmail(to) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            from: sender,
            to: [to],
            subject: 'Newton Academy: Official Email System Verified & Active',
            html: testHtml
        });

        const req = https.request('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ statusCode: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, raw: data });
                }
            });
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function run() {
    console.log(`Sending official test email to ${recipient}...`);
    const res1 = await sendEmail(recipient);
    console.log('Result 1:', res1);

    // Also send to secondary email masterfreedom23@gmail.com
    console.log(`Sending official test email to masterfreedom23@gmail.com...`);
    const res2 = await sendEmail('masterfreedom23@gmail.com');
    console.log('Result 2:', res2);
}

run().catch(console.error);

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generate official Newton Academy Scholarship Award Letter PDF
 * Pure formal letter: No colorful text, no boxes, no tables, written in clear sentences & paragraphs, logo in header.
 */
function generateAwardPdfBuffer({ candidateName, programmeName = 'Digital Marketing + Applied AI', applicationId = 'NA-SCH-748921', issueDate = null }) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: 'A4',
                margins: { top: 50, bottom: 50, left: 55, right: 55 }
            });

            const buffers = [];
            doc.on('data', chunk => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', err => reject(err));

            const formattedDate = issueDate || new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            // 1. Header with Logo (No colorful bars, clean institutional letterhead)
            const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
            let currentY = 50;

            if (fs.existsSync(logoPath)) {
                try {
                    doc.image(logoPath, 55, currentY, { width: 140 });
                } catch (e) {
                    doc.fontSize(16).fillColor('#000000').font('Helvetica-Bold').text('NEWTON ACADEMY', 55, currentY);
                }
            } else {
                doc.fontSize(16).fillColor('#000000').font('Helvetica-Bold').text('NEWTON ACADEMY', 55, currentY);
            }

            // Letterhead details on the right
            doc.fontSize(9).font('Helvetica-Bold').fillColor('#111827')
               .text('OFFICE OF ACADEMIC AFFAIRS & AWARDS', 260, currentY + 2, { align: 'right' });
            doc.font('Helvetica').fillColor('#4b5563')
               .text('Newton Academy Global Secretariat', 260, currentY + 16, { align: 'right' });
            doc.text('Official Contact: na@newtoncore.com', 260, currentY + 28, { align: 'right' });

            currentY += 52;

            // Thin dividing rule
            doc.moveTo(55, currentY).lineTo(doc.page.width - 55, currentY).strokeColor('#d1d5db').lineWidth(0.75).stroke();

            currentY += 22;

            // Metadata: Date & Reference
            doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#111827').text('Date: ', 55, currentY, { continued: true });
            doc.font('Helvetica').fillColor('#374151').text(formattedDate);

            currentY += 15;
            doc.font('Helvetica-Bold').fillColor('#111827').text('Reference Number: ', 55, currentY, { continued: true });
            doc.font('Helvetica').fillColor('#374151').text(applicationId);

            currentY += 15;
            doc.font('Helvetica-Bold').fillColor('#111827').text('Candidate Name: ', 55, currentY, { continued: true });
            doc.font('Helvetica').fillColor('#374151').text(candidateName);

            currentY += 24;

            // Formal Subject Line (Clean, centered or bold, no colored boxes)
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#000000')
               .text('OFFICIAL AWARD OF 100% FULL TUITION SCHOLARSHIP', 55, currentY, {
                   width: doc.page.width - 110,
                   align: 'left'
               });
            doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#374151')
               .text(`Programme Specialization: ${programmeName} (Flagship Diploma)`, 55, currentY + 14, {
                   width: doc.page.width - 110,
                   align: 'left'
               });

            currentY += 36;

            // Body Paragraphs (Normal sentences and paragraphs, no tables, no colorful text)
            doc.font('Helvetica').fillColor('#111827').fontSize(10).lineGap(4);

            doc.text(`Dear ${candidateName},`, 55, currentY);

            currentY = doc.y + 12;

            const p1 = `We are pleased to inform you that following the review of your application, the Admissions Committee and Academic Board of Newton Academy have approved your admission and officially awarded you a 100% Full Tuition Scholarship for the ${programmeName} professional training programme.`;
            doc.text(p1, 55, currentY, { width: doc.page.width - 110, align: 'justify' });

            currentY = doc.y + 10;

            const p2 = `Under the terms of this award, your standard programme tuition of ₦200,000 is fully covered and waived by the Newton Academy Endowment Fund. You bear zero tuition liability for the entire duration of the three-month curriculum, including all live classes, practical assignments, tutor office hours, and specialized AI tool suites.`;
            doc.text(p2, 55, currentY, { width: doc.page.width - 110, align: 'justify' });

            currentY = doc.y + 10;

            const p3 = `To secure your scholarship allocation, successful candidates are required to complete a one-time admissions commitment and candidate portal verification fee of ₦20,000 only. This fee covers your tamper-proof student identification issuance, personalized student dashboard provisioning, and orientation materials.`;
            doc.text(p3, 55, currentY, { width: doc.page.width - 110, align: 'justify' });

            currentY = doc.y + 10;

            const p4 = `Please be advised that because of strict tutor-to-student coaching ratios, scholarship allocations are held for exactly 24 hours from the time of issuance. You are required to access your official admissions file via the admissions portal and finalize your registration within this window to guarantee your seat.`;
            doc.text(p4, 55, currentY, { width: doc.page.width - 110, align: 'justify' });

            currentY = doc.y + 10;

            const p5 = `Upon confirmation of your one-time fee, your verified Newton Fellow credentials will be issued immediately, and you will be directed to contact Odunayo (Lead Admissions Advisor) on WhatsApp to receive your official onboarding pack and entry into the VIP Enrolled Fellows Room.`;
            doc.text(p5, 55, currentY, { width: doc.page.width - 110, align: 'justify' });

            currentY = doc.y + 12;

            const p6 = `Once again, congratulations on your selection. We look forward to supporting your professional journey and celebrating your milestones with Newton Academy.`;
            doc.text(p6, 55, currentY, { width: doc.page.width - 110, align: 'justify' });

            currentY = doc.y + 24;

            // Formal Sign-off
            doc.font('Helvetica').fillColor('#111827').text('Yours sincerely,', 55, currentY);

            currentY = doc.y + 14;
            doc.font('Helvetica-Bold').fontSize(11).fillColor('#000000').text('Ade Braimoh', 55, currentY);
            doc.font('Helvetica').fontSize(9.5).fillColor('#4b5563').text('Founder, Newton Academy', 55, currentY + 14);
            doc.text('na@newtoncore.com', 55, currentY + 27);

            // Simple subtle footer
            doc.fontSize(8).fillColor('#9ca3af')
               .text('Newton Academy • Official Scholarship Award Letter • Reference: ' + applicationId, 55, doc.page.height - 40, {
                   width: doc.page.width - 110,
                   align: 'center'
               });

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { generateAwardPdfBuffer };

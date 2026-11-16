const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generate official Newton Academy Scholarship Award Letter PDF
 * Returns a Promise that resolves with a Buffer
 */
function generateAwardPdfBuffer({ candidateName, programmeName = 'Digital Marketing + Applied AI', applicationId = 'NA-SCH-748921', issueDate = null }) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: 'A4',
                margins: { top: 40, bottom: 40, left: 45, right: 45 }
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

            // 1. Top Decorative Brand Bar
            doc.rect(0, 0, doc.page.width, 10).fill('#005f5a');
            doc.rect(0, 10, doc.page.width, 3).fill('#f59e0b');

            // 2. Header with Logo & Institution Details
            const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
            let headerY = 28;

            if (fs.existsSync(logoPath)) {
                try {
                    doc.image(logoPath, 45, headerY, { width: 130 });
                } catch (e) {
                    doc.fontSize(18).fillColor('#005f5a').font('Helvetica-Bold').text('NEWTON ACADEMY', 45, headerY);
                }
            } else {
                doc.fontSize(18).fillColor('#005f5a').font('Helvetica-Bold').text('NEWTON ACADEMY', 45, headerY);
            }

            // Right-aligned header credentials
            doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#005f5a').text('OFFICE OF ACADEMIC AFFAIRS & AWARDS', 280, headerY + 4, { align: 'right' });
            doc.font('Helvetica').fillColor('#64748b').text('Reference ID: ' + applicationId, 280, headerY + 16, { align: 'right' });
            doc.text('Date of Issuance: ' + formattedDate, 280, headerY + 28, { align: 'right' });
            doc.text('Global Secretariat • na@newtoncore.com', 280, headerY + 40, { align: 'right' });

            doc.moveTo(45, headerY + 60).lineTo(doc.page.width - 45, headerY + 60).strokeColor('#e2e8f0').lineWidth(1).stroke();

            // 3. Document Title / Headline
            let contentY = headerY + 75;
            doc.rect(45, contentY, doc.page.width - 90, 42).fillAndStroke('#f0f9f8', '#ccfbf1');
            
            doc.fontSize(14).font('Helvetica-Bold').fillColor('#003835')
               .text('OFFICIAL AWARD OF 100% FULL TUITION SCHOLARSHIP', 55, contentY + 9, {
                   width: doc.page.width - 110,
                   align: 'center'
               });
            doc.fontSize(8.5).font('Helvetica').fillColor('#005f5a')
               .text('3-Month International Professional Diploma • Academic Cohort 2026', 55, contentY + 26, {
                   width: doc.page.width - 110,
                   align: 'center'
               });

            // 4. Salutation & Official Notice
            contentY += 58;
            doc.fontSize(10.5).font('Helvetica-Bold').fillColor('#0f172a')
               .text(`Dear ${candidateName},`, 45, contentY);

            contentY += 18;
            doc.font('Helvetica').fillColor('#334155').fontSize(9.5).lineGap(3.5);
            
            const introText = `On behalf of the Academic Council, Faculty Board, and International Mentors of Newton Academy, we are delighted to inform you that your application has been evaluated and officially APPROVED for a 100% Full Tuition Scholarship into our flagship accredited professional training programme:`;
            doc.text(introText, 45, contentY, { width: doc.page.width - 90, align: 'justify' });

            contentY = doc.y + 10;

            // 5. Approved Track Banner
            doc.rect(45, contentY, doc.page.width - 90, 32).fill('#003835');
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#fbbf24')
               .text(`APPROVED SPECIALIZATION: ${programmeName.toUpperCase()}`, 55, contentY + 10, {
                   width: doc.page.width - 110,
                   align: 'center'
               });

            contentY += 44;

            // 6. Financial Ledger Table
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#005f5a')
               .text('OFFICIAL SCHOLARSHIP LEDGER & FINANCIAL STATEMENT', 45, contentY);

            contentY += 16;
            const tableWidth = doc.page.width - 90;
            const rowHeight = 22;

            // Table Header
            doc.rect(45, contentY, tableWidth, rowHeight).fill('#005f5a');
            doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#ffffff')
               .text('ITEM / EXPENDITURE BREAKDOWN', 55, contentY + 6)
               .text('STANDARD COST', 330, contentY + 6, { width: 100, align: 'right' })
               .text('CANDIDATE BALANCE', 440, contentY + 6, { width: tableWidth - 405, align: 'right' });

            contentY += rowHeight;

            // Row 1: Full Tuition
            doc.rect(45, contentY, tableWidth, rowHeight).fill('#f8fafc');
            doc.fontSize(8.5).font('Helvetica').fillColor('#334155')
               .text('Full 3-Month Accredited Curriculum Tuition', 55, contentY + 6)
               .text('NGN 200,000', 330, contentY + 6, { width: 100, align: 'right' });
            doc.font('Helvetica-Bold').fillColor('#059669')
               .text('NGN 0.00 (100% WAIVED)', 410, contentY + 6, { width: tableWidth - 375, align: 'right' });

            contentY += rowHeight;

            // Row 2: Live Mentorship & Lab
            doc.rect(45, contentY, tableWidth, rowHeight).fill('#ffffff');
            doc.fontSize(8.5).font('Helvetica').fillColor('#334155')
               .text('Live Executive Masterclasses & AI Tool Suites', 55, contentY + 6)
               .text('INCLUDED', 330, contentY + 6, { width: 100, align: 'right' });
            doc.font('Helvetica-Bold').fillColor('#059669')
               .text('COVERED BY ENDOWMENT', 410, contentY + 6, { width: tableWidth - 375, align: 'right' });

            contentY += rowHeight;

            // Row 3: Mandatory Evaluation & Admission Commitment Fee
            doc.rect(45, contentY, tableWidth, rowHeight + 4).fillAndStroke('#fffbeb', '#fcd34d');
            doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#92400e')
               .text('Admissions Portal Verification & Candidate ID Issuance Fee', 55, contentY + 7);
            doc.fillColor('#005f5a')
               .text('ONE-TIME FEE', 330, contentY + 7, { width: 100, align: 'right' })
               .text('NGN 20,000 ONLY', 410, contentY + 7, { width: tableWidth - 375, align: 'right' });

            contentY += rowHeight + 14;

            // 7. Policy and Next Steps
            doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#005f5a').text('WHAT YOU MUST DO NEXT (MANDATORY ENROLLMENT STEPS):', 45, contentY);
            contentY += 14;

            doc.font('Helvetica').fillColor('#334155').fontSize(8.5).lineGap(3);
            const steps = [
                '1. 24-HOUR SEAT RESERVATION: Due to strict faculty-to-student coaching ratios (max 50 delegates per cohort), your scholarship allocation is held for exactly 24 hours from the dispatch of this letter.',
                '2. FINALIZE YOUR ADMISSION DOSSIER: Access your official admissions checkout portal and complete the one-time NGN 20,000 commitment and portal issuance fee.',
                '3. VERIFIED STUDENT ID ISSUANCE: Upon confirmation, your verified Newton Fellow ID is created and you are invited to join the private VIP Enrolled Fellows Room hosted by Odunayo (Lead Admissions Advisor).'
            ];
            
            steps.forEach(step => {
                doc.text(step, 45, contentY, { width: doc.page.width - 90, align: 'justify' });
                contentY = doc.y + 4;
            });

            contentY += 10;

            // 8. Signatory & Attestation Block
            doc.moveTo(45, contentY).lineTo(doc.page.width - 45, contentY).strokeColor('#e2e8f0').lineWidth(1).stroke();
            contentY += 12;

            doc.fontSize(10).font('Helvetica-Bold').fillColor('#0f172a').text('Ade Braimoh', 45, contentY);
            doc.fontSize(8.5).font('Helvetica').fillColor('#475569').text('Founder, Newton Academy', 45, contentY + 13);
            doc.text('Global Directorate for Tech Talent & Commercial Empowerment', 45, contentY + 24);

            // Verified Badge right side
            doc.rect(doc.page.width - 185, contentY - 2, 140, 36).fillAndStroke('#f0fdfa', '#99f6e4');
            doc.fontSize(8).font('Helvetica-Bold').fillColor('#005f5a')
               .text('OFFICIALLY ENDORSED', doc.page.width - 185, contentY + 5, { width: 140, align: 'center' })
               .font('Helvetica').fillColor('#0f766e')
               .text('Academic Affairs Board', doc.page.width - 185, contentY + 18, { width: 140, align: 'center' });

            // 9. Bottom Footer Bar
            doc.rect(0, doc.page.height - 18, doc.page.width, 18).fill('#003835');
            doc.fontSize(7).font('Helvetica').fillColor('#94a3b8')
               .text('Newton Academy Official Award Document • Tamper-proof Serialized Verification • na@newtoncore.com', 0, doc.page.height - 13, {
                   width: doc.page.width,
                   align: 'center'
               });

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { generateAwardPdfBuffer };

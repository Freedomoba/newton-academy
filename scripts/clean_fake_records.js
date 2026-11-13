const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '..', 'data', 'optin_leads.csv');
const schPath = path.join(__dirname, '..', 'data', 'scholarship_applications.csv');

// Keep ONLY the user's authentic submissions
const realDelegates = [
    ["Timestamp","Full Name","Email","WhatsApp Phone","IP Address","Source","Location"],
    ["2026-11-12 11:53:07","Freedom Emmanuel","marketerfreedom@gmail.com","+2348053708909","127.0.0.1","WhatsApp","Lagos, Nigeria"],
    ["2026-11-13 03:45:07","Freedom Obanijesu Emmanuel","masterfreedom23@gmail.com","+2348053708909","127.0.0.1","WhatsApp","Lagos, Nigeria"]
];

const realScholarships = [
    ["Timestamp","Application ID","Full Name","Email","Phone","Programme","Scholarship Scheme","Payment Status","Source","Location"],
    ["2026-11-12 09:33:27","NA-SCH-WBJI0JO","Freedom Obanijesu","marketerfreedom@gmail.com","+2348053708909","Digital Entrepreneurship + Applied AI","100% Full Tuition Endowment","Pending Payment","WhatsApp","Lagos, Nigeria"],
    ["2026-11-12 15:34:34","NA-SCH-NLJQERP","Candidate","masterfreedom23@gmail.com","+2348053708909","Digital Entrepreneurship + AI","100% Full Tuition Endowment","Pending Payment","WhatsApp","Lagos, Nigeria"]
];

function writeCsv(filePath, rows) {
    const content = rows.map(r => r.map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n') + '\n';
    fs.writeFileSync(filePath, content, 'utf8');
}

writeCsv(leadsPath, realDelegates);
console.log(`Cleaned ${leadsPath} - kept ONLY genuine records.`);

writeCsv(schPath, realScholarships);
console.log(`Cleaned ${schPath} - kept ONLY genuine records.`);


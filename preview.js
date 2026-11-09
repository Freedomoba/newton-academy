/**
 * Newton Academy - Local Preview Server (Node.js)
 * Fully functional preview server with live forms, dynamic name forwarding,
 * and a fully working Admin Dashboard with CSV parsing and authentication!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const CONFIG = {
    ACADEMY_NAME: 'Newton Academy',
    ACADEMY_TAGLINE: "Empowering Tomorrow's Global Leaders in Tech & Business",
    ACADEMY_EMAIL: 'admissions@newtonacademy.co',
    WHATSAPP_WAITLIST_LINK: 'https://chat.whatsapp.com/IlBSRH766nc08kr2lsGaBi?s=cl&p=i&mlu=4&ilr=4&iam=2',
    WHATSAPP_VIP_ENROLLED_LINK: 'https://chat.whatsapp.com/YOUR_VIP_ENROLLED_GROUP_LINK',
    WHATSAPP_SUPPORT_PHONE: '2348000000000',
    CURRENCY_SYMBOL: '₦',
    ORIGINAL_PRICE: 200000,
    SCHOLARSHIP_APPLICATION_FEE: 20000,
    PAYSTACK_PUBLIC_KEY: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ADMIN_PASSWORD: 'Newton2026!'
};

// Simple in-memory session token store
const authenticatedTokens = new Set();

function parseCookies(req) {
    const list = {};
    const rc = req.headers.cookie;
    if (rc) {
        rc.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }
    return list;
}

function parseCsvFile(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8').trim();
    if (!content) return [];
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length <= 1) return [];
    
    // Parse header
    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        // Simple comma split handling quotes
        const match = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const values = lines[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
        const row = {};
        headers.forEach((h, idx) => {
            row[h] = values[idx] || '';
        });
        rows.push(row);
    }
    return rows.reverse(); // Newest first
}

function renderPhpFile(filePath, queryParams = {}) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/<\?php\s+require_once\s+__DIR__\s*\.\s*['"][^'"]+['"];\s*\?>/gi, '');

    for (const [key, val] of Object.entries(CONFIG)) {
        const regexVal = typeof val === 'number' ? val.toLocaleString() : val;
        content = content.replace(new RegExp(`<\\?php\\s+echo\\s+number_format\\(${key}\\);\\s*\\?>`, 'g'), regexVal);
        content = content.replace(new RegExp(`<\\?php\\s+echo\\s+${key};\\s*\\?>`, 'g'), val);
    }

    const name = queryParams.name ? queryParams.name.trim() : 'Candidate';
    const email = queryParams.email ? queryParams.email.trim() : '';
    const phone = queryParams.phone ? queryParams.phone.trim() : '';
    const programme = queryParams.programme ? queryParams.programme.trim() : 'Digital Entrepreneurship + AI';
    const appId = queryParams.app_id || ('NA-SCH-' + Math.random().toString(36).substring(2, 9).toUpperCase());
    const reference = queryParams.reference || ('NA-PAY-' + Math.random().toString(36).substring(2, 9).toUpperCase());

    content = content.replace(/<\?php\s+echo\s+\$name\s*!==\s*'Candidate'\s*\?\s*\$name\s*:\s*'';\s*\?>/g, name !== 'Candidate' ? name : '');
    content = content.replace(/<\?php\s+echo\s+\$name\s*!==\s*'Friend'\s*\?\s*\$name\s*:\s*'';\s*\?>/g, name !== 'Candidate' ? name : '');
    content = content.replace(/<\?php\s+echo\s+\$name;\s*\?>/g, name);
    content = content.replace(/<\?php\s+echo\s+\$email\s*\?\s*\$email\s*:\s*'your email address';\s*\?>/g, email ? email : 'your email address');
    content = content.replace(/<\?php\s+echo\s+\$email;\s*\?>/g, email);
    content = content.replace(/<\?php\s+echo\s+\$phone;\s*\?>/g, phone);
    content = content.replace(/<\?php\s+echo\s+\$programme;\s*\?>/g, programme);
    content = content.replace(/<\?php\s+echo\s+\$appId;\s*\?>/g, appId);
    content = content.replace(/<\?php\s+echo\s+\$reference;\s*\?>/g, reference);
    content = content.replace(/<\?php\s+echo\s+date\('Y'\);\s*\?>/g, new Date().getFullYear());
    content = content.replace(/<\?php\s+echo\s+strtoupper\(substr\(md5\([^)]+\),\s*0,\s*8\)\);\s*\?>/g, '9B2C4E10');
    content = content.replace(/<\?php\s+echo\s+strtoupper\(substr\(md5\([^)]+\),\s*0,\s*6\)\);\s*\?>/g, '9B2C4E');

    content = content.replace(/<\?php[\s\S]*?\?>/g, '');

    return content;
}

function parseFormData(body, contentType = '') {
    const data = {};
    if (contentType.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams(body);
        for (const [k, v] of params.entries()) {
            data[k] = v;
        }
    } else if (contentType.includes('multipart/form-data')) {
        const boundary = contentType.split('boundary=')[1];
        if (boundary) {
            const parts = body.split('--' + boundary);
            for (const part of parts) {
                const match = part.match(/name="([^"]+)"[\r\n]+([\s\S]*?)[\r\n]+$/);
                if (match) {
                    data[match[1]] = match[2].trim();
                }
            }
        }
    } else {
        const lines = body.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const nameMatch = lines[i].match(/name="([^"]+)"/);
            if (nameMatch && lines[i + 2]) {
                data[nameMatch[1]] = lines[i + 2].trim();
            }
        }
    }
    return data;
}

function renderAdminDashboard(isAuthenticated, loginError = '') {
    const leadsDir = path.join(__dirname, 'data');
    const delegates = parseCsvFile(path.join(leadsDir, 'optin_leads.csv'));
    const scholarships = parseCsvFile(path.join(leadsDir, 'scholarship_applications.csv'));
    const enrolled = parseCsvFile(path.join(leadsDir, 'enrolled_students.csv'));

    const totalDelegates = delegates.length;
    const totalScholarships = scholarships.length;
    const totalPaid = enrolled.length;
    const totalRevenue = totalPaid * CONFIG.SCHOLARSHIP_APPLICATION_FEE;

    let trackDeCount = 0;
    let trackDmCount = 0;
    scholarships.forEach(s => {
        const p = s['Programme'] || '';
        if (p.includes('Entrepreneurship')) trackDeCount++;
        if (p.includes('Marketing')) trackDmCount++;
    });

    if (!isAuthenticated) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admissions Portal Login | Newton Academy</title>
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-[#f1f5f9] font-sans antialiased min-h-screen flex items-center justify-center p-4">
    <div class="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl max-w-md w-full">
        <div class="text-center mb-8">
            <img src="assets/logo.png" alt="Newton Academy" class="h-10 w-auto mx-auto object-contain mb-3">
            <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">Admissions Portal Login</h1>
            <p class="text-xs text-slate-500 mt-1">Authorized access for admissions directors only.</p>
        </div>

        ${loginError ? `<div class="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">${loginError}</div>` : ''}

        <form method="POST" action="/admin.php" class="space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Administrator Password
                </label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    placeholder="Enter admin password (Newton2026!)"
                    class="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#005f5a]"
                >
            </div>
            <button 
                type="submit" 
                class="w-full bg-[#005f5a] hover:bg-[#004d49] text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md transition-all cursor-pointer"
            >
                Authenticate & Access Dashboard
            </button>
        </form>
        <p class="text-[11px] text-slate-400 text-center mt-6">Default Password: <strong>Newton2026!</strong></p>
    </div>
</body>
</html>`;
    }

    // Render Authenticated Dashboard
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admissions & Leads Portal | Newton Academy</title>
    <link rel="icon" type="image/jpeg" href="assets/favicon.jpg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        .brand-shadow { box-shadow: 0 20px 40px -15px rgba(0, 95, 90, 0.12); }
    </style>
</head>
<body class="bg-[#f1f5f9] text-[#1e293b] font-sans antialiased min-h-screen">
    
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="assets/logo.png" alt="Newton Academy" class="h-9 w-auto object-contain">
                <span class="text-xs font-bold text-slate-500 pl-3 border-l border-slate-200 hidden sm:inline-block">Admissions Control Desk</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-xs text-slate-500 font-medium">Signed in as Administrator</span>
                <a href="/admin.php?action=logout" class="text-xs font-bold text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 px-3 py-1.5 rounded-lg transition-colors">
                    Log Out
                </a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <!-- Summary Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div class="bg-white border border-slate-200/90 rounded-3xl p-6 brand-shadow">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Conference Delegates</span>
                <span class="text-3xl font-extrabold text-slate-900 mt-1 block">${totalDelegates.toLocaleString()}</span>
                <span class="text-[11px] text-[#005f5a] font-semibold mt-1 block">From Skills to Income Opt-ins</span>
            </div>

            <div class="bg-white border border-slate-200/90 rounded-3xl p-6 brand-shadow">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Scholarship Applications</span>
                <span class="text-3xl font-extrabold text-slate-900 mt-1 block">${totalScholarships.toLocaleString()}</span>
                <span class="text-[11px] text-slate-500 mt-1 block">${trackDeCount} DE track &bull; ${trackDmCount} DM track</span>
            </div>

            <div class="bg-white border border-slate-200/90 rounded-3xl p-6 brand-shadow">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Verified Enrolled Fellows</span>
                <span class="text-3xl font-extrabold text-emerald-600 mt-1 block">${totalPaid.toLocaleString()}</span>
                <span class="text-[11px] text-emerald-700 font-semibold mt-1 block">₦20,000 Application Fee Paid</span>
            </div>

            <div class="bg-white border border-slate-200/90 rounded-3xl p-6 brand-shadow">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Fees Generated</span>
                <span class="text-3xl font-extrabold text-[#005f5a] mt-1 block">₦${totalRevenue.toLocaleString()}</span>
                <span class="text-[11px] text-slate-500 mt-1 block">Verified via Paystack / Bank</span>
            </div>
        </div>

        <!-- Table Container -->
        <div class="bg-white border border-slate-200/90 rounded-3xl brand-shadow overflow-hidden">
            
            <div class="border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <button onclick="showTab('delegates')" id="tab-btn-delegates" class="px-4 py-2 text-xs font-bold rounded-xl bg-[#005f5a] text-white transition-all cursor-pointer">
                        Conference Delegates (${totalDelegates})
                    </button>
                    <button onclick="showTab('scholarships')" id="tab-btn-scholarships" class="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
                        Scholarship Applicants (${totalScholarships})
                    </button>
                    <button onclick="showTab('enrolled')" id="tab-btn-enrolled" class="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
                        Enrolled Fellows (${totalPaid})
                    </button>
                </div>

                <div id="export-actions">
                    <a href="/admin.php?export=conference" id="export-link" class="inline-flex items-center gap-2 text-xs font-bold text-[#005f5a] hover:text-[#004d49] border border-[#005f5a]/30 hover:border-[#005f5a] px-4 py-2 rounded-xl transition-all">
                        Download Delegates CSV
                    </a>
                </div>
            </div>

            <!-- Tab 1: Delegates -->
            <div id="tab-delegates" class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-[#f1f5f9] text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Timestamp</th>
                            <th class="p-4">Full Name</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">WhatsApp Phone</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${delegates.length === 0 ? '<tr><td colspan="4" class="p-8 text-center text-slate-400">No conference delegates registered yet.</td></tr>' : 
                        delegates.map(d => `
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500">${d['Timestamp'] || '-'}</td>
                            <td class="p-4 font-bold text-slate-900">${d['Full Name'] || '-'}</td>
                            <td class="p-4 text-slate-700">${d['Email'] || '-'}</td>
                            <td class="p-4 font-mono text-[#005f5a] font-semibold">${d['WhatsApp Phone'] || '-'}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Tab 2: Scholarship Applicants -->
            <div id="tab-scholarships" class="overflow-x-auto hidden">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-[#f1f5f9] text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Application ID</th>
                            <th class="p-4">Candidate Name</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">WhatsApp</th>
                            <th class="p-4">Selected Programme</th>
                            <th class="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${scholarships.length === 0 ? '<tr><td colspan="6" class="p-8 text-center text-slate-400">No scholarship applications submitted yet.</td></tr>' : 
                        scholarships.map(s => `
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500 font-bold">${s['Application ID'] || '-'}</td>
                            <td class="p-4 font-bold text-slate-900">${s['Full Name'] || '-'}</td>
                            <td class="p-4 text-slate-700">${s['Email'] || '-'}</td>
                            <td class="p-4 font-mono">${s['Phone'] || '-'}</td>
                            <td class="p-4 font-semibold text-[#005f5a]">${s['Programme'] || '-'}</td>
                            <td class="p-4"><span class="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-bold">Pending Payment</span></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Tab 3: Enrolled Fellows -->
            <div id="tab-enrolled" class="overflow-x-auto hidden">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-[#f1f5f9] text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                            <th class="p-4">Timestamp</th>
                            <th class="p-4">Payment Ref</th>
                            <th class="p-4">Fellow Name</th>
                            <th class="p-4">Email</th>
                            <th class="p-4">Enrolled Track</th>
                            <th class="p-4">Amount Paid</th>
                            <th class="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${enrolled.length === 0 ? '<tr><td colspan="7" class="p-8 text-center text-slate-400">No verified fellows recorded yet.</td></tr>' : 
                        enrolled.map(e => `
                        <tr class="hover:bg-slate-50/70 transition-colors">
                            <td class="p-4 font-mono text-slate-500">${e['Timestamp'] || '-'}</td>
                            <td class="p-4 font-mono font-bold text-emerald-700">${e['Reference'] || '-'}</td>
                            <td class="p-4 font-bold text-slate-900">${e['Full Name'] || '-'}</td>
                            <td class="p-4 text-slate-700">${e['Email'] || '-'}</td>
                            <td class="p-4 font-semibold text-[#005f5a]">${e['Programme'] || '-'}</td>
                            <td class="p-4 font-bold text-slate-900">₦${Number(e['Amount Paid'] || 20000).toLocaleString()}</td>
                            <td class="p-4"><span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">Verified & Enrolled</span></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>

        </div>
    </main>

    <script>
        function showTab(tabName) {
            ['delegates', 'scholarships', 'enrolled'].forEach(t => {
                document.getElementById('tab-' + t).classList.add('hidden');
                document.getElementById('tab-btn-' + t).className = 'px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer';
            });
            document.getElementById('tab-' + tabName).classList.remove('hidden');
            document.getElementById('tab-btn-' + tabName).className = 'px-4 py-2 text-xs font-bold rounded-xl bg-[#005f5a] text-white transition-all cursor-pointer';

            const exportMap = {
                'delegates': { url: '/admin.php?export=conference', label: 'Download Delegates CSV' },
                'scholarships': { url: '/admin.php?export=scholarship', label: 'Download Scholarship CSV' },
                'enrolled': { url: '/admin.php?export=enrolled', label: 'Download Enrolled CSV' }
            };
            const link = document.getElementById('export-link');
            link.href = exportMap[tabName].url;
            link.textContent = exportMap[tabName].label;
        }
    </script>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    const cookies = parseCookies(req);
    const isAuthenticated = authenticatedTokens.has(cookies['newton_admin_session']);

    // Static Assets
    if (pathname.startsWith('/assets/')) {
        const filePath = path.join(__dirname, pathname);
        if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.css': 'text/css',
                '.js': 'application/javascript'
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            return fs.createReadStream(filePath).pipe(res);
        }
    }

    // Admin Logout
    if (pathname === '/admin.php' && parsedUrl.query.action === 'logout') {
        if (cookies['newton_admin_session']) {
            authenticatedTokens.delete(cookies['newton_admin_session']);
        }
        res.writeHead(302, {
            'Set-Cookie': 'newton_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
            'Location': '/admin.php'
        });
        return res.end();
    }

    // Admin CSV Export
    if (pathname === '/admin.php' && parsedUrl.query.export && isAuthenticated) {
        const leadsDir = path.join(__dirname, 'data');
        const fileMap = {
            'conference': path.join(leadsDir, 'optin_leads.csv'),
            'scholarship': path.join(leadsDir, 'scholarship_applications.csv'),
            'enrolled': path.join(leadsDir, 'enrolled_students.csv')
        };
        const targetFile = fileMap[parsedUrl.query.export];
        if (targetFile && fs.existsSync(targetFile)) {
            res.writeHead(200, {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${parsedUrl.query.export}_leads.csv"`
            });
            return fs.createReadStream(targetFile).pipe(res);
        }
    }

    // Admin POST Login
    if (pathname === '/admin.php' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const formData = parseFormData(body, req.headers['content-type'] || '');
            if (formData.password === CONFIG.ADMIN_PASSWORD) {
                const token = 'token_' + Math.random().toString(36).substring(2, 15);
                authenticatedTokens.add(token);
                res.writeHead(302, {
                    'Set-Cookie': `newton_admin_session=${token}; Path=/; HttpOnly`,
                    'Location': '/admin.php'
                });
                return res.end();
            } else {
                const html = renderAdminDashboard(false, 'Invalid administrator password. Try Newton2026!');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(html);
            }
        });
        return;
    }

    // Admin GET Page
    if (pathname === '/admin.php' || pathname === '/admin') {
        const html = renderAdminDashboard(isAuthenticated);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
    }

    // Step 1: index.php
    if (pathname === '/' || pathname === '/index.php' || pathname === '/index.html') {
        const rendered = renderPhpFile(path.join(__dirname, 'index.php'), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    // Step 2: thank-you.php
    if (pathname === '/thank-you.php' || pathname === '/thank-you') {
        const rendered = renderPhpFile(path.join(__dirname, 'thank-you.php'), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    // Dedicated Curriculum Pages
    if (pathname === '/curriculum-de.php' || pathname === '/curriculum-de') {
        const rendered = renderPhpFile(path.join(__dirname, 'curriculum-de.php'), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    if (pathname === '/curriculum-dm.php' || pathname === '/curriculum-dm') {
        const rendered = renderPhpFile(path.join(__dirname, 'curriculum-dm.php'), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    if (pathname === '/curriculum.php' || pathname === '/curriculum') {
        const track = (parsedUrl.query.track || 'de').toLowerCase();
        const targetFile = track === 'dm' ? 'curriculum-dm.php' : 'curriculum-de.php';
        const rendered = renderPhpFile(path.join(__dirname, targetFile), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    // Step 3: checkout.php
    if (pathname === '/checkout.php' || pathname === '/checkout') {
        const rendered = renderPhpFile(path.join(__dirname, 'checkout.php'), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    // Step 4: success.php
    if (pathname === '/success.php' || pathname === '/success') {
        const rendered = renderPhpFile(path.join(__dirname, 'success.php'), parsedUrl.query);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(rendered);
    }

    // API: Optin POST Handler (saves to CSV & passes real name)
    if (pathname === '/api/optin.php' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const formData = parseFormData(body, req.headers['content-type'] || '');
            const fullName = formData.fullName || 'Candidate';
            const email = formData.email || '';
            const countryCode = formData.countryCode || '+234';
            const rawPhone = formData.phone || '';
            const fullPhone = countryCode + rawPhone.replace(/[^0-9]/g, '');

            // Save to real CSV
            const leadsDir = path.join(__dirname, 'data');
            if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir, { recursive: true });
            const csvPath = path.join(leadsDir, 'optin_leads.csv');
            const isNew = !fs.existsSync(csvPath);
            const line = `"${new Date().toISOString().replace('T', ' ').substring(0, 19)}","${fullName}","${email}","${fullPhone}","127.0.0.1"\n`;
            if (isNew) {
                fs.writeFileSync(csvPath, '"Timestamp","Full Name","Email","WhatsApp Phone","IP Address"\n' + line);
            } else {
                fs.appendFileSync(csvPath, line);
            }

            const redirectQuery = new URLSearchParams({
                name: fullName,
                email: email,
                phone: fullPhone
            }).toString();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: true,
                message: 'Conference pass confirmed. Directing to your briefing...',
                redirect: `thank-you.php?${redirectQuery}`
            }));
        });
        return;
    }

    // API: Scholarship POST Handler (saves to CSV & passes real name/track)
    if (pathname === '/api/scholarship.php' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const formData = parseFormData(body, req.headers['content-type'] || '');
            const fullName = formData.fullName || 'Candidate';
            const email = formData.email || '';
            const phone = formData.phone || '';
            const programme = formData.programme || 'Digital Entrepreneurship + AI';
            const motivation = formData.motivation || '';
            const appId = 'NA-SCH-' + Math.random().toString(36).substring(2, 9).toUpperCase();

            // Save to real CSV
            const leadsDir = path.join(__dirname, 'data');
            if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir, { recursive: true });
            const csvPath = path.join(leadsDir, 'scholarship_applications.csv');
            const isNew = !fs.existsSync(csvPath);
            const line = `"${new Date().toISOString().replace('T', ' ').substring(0, 19)}","${appId}","${fullName}","${email}","${phone}","${programme}","${motivation.replace(/"/g, '""')}","Pending Payment"\n`;
            if (isNew) {
                fs.writeFileSync(csvPath, '"Timestamp","Application ID","Full Name","Email","Phone","Programme","Motivation","Payment Status"\n' + line);
            } else {
                fs.appendFileSync(csvPath, line);
            }

            const redirectQuery = new URLSearchParams({
                app_id: appId,
                name: fullName,
                email: email,
                phone: phone,
                programme: programme
            }).toString();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: true,
                message: 'Scholarship Granted. Directing to your official award document...',
                redirect: `checkout.php?${redirectQuery}`
            }));
        });
        return;
    }

    // API: Payment Verify Handler
    if (pathname === '/api/verify_payment.php') {
        const reference = parsedUrl.query.reference || ('NA-PAY-' + Math.random().toString(36).substring(2, 9).toUpperCase());
        const name = parsedUrl.query.name || 'Candidate';
        const email = parsedUrl.query.email || '';
        const programme = parsedUrl.query.programme || 'Digital Entrepreneurship + AI';
        const appId = parsedUrl.query.app_id || '';

        // Save to real CSV
        const leadsDir = path.join(__dirname, 'data');
        if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir, { recursive: true });
        const csvPath = path.join(leadsDir, 'enrolled_students.csv');
        const isNew = !fs.existsSync(csvPath);
        const line = `"${new Date().toISOString().replace('T', ' ').substring(0, 19)}","${reference}","${appId}","${name}","${email}","${programme}","20000","Paid & Verified"\n`;
        if (isNew) {
            fs.writeFileSync(csvPath, '"Timestamp","Reference","Application ID","Full Name","Email","Programme","Amount Paid","Status"\n' + line);
        } else {
            fs.appendFileSync(csvPath, line);
        }

        const redirectQuery = new URLSearchParams({
            reference: reference,
            name: name,
            programme: programme
        }).toString();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: true,
            message: 'Payment verified. Redirecting to onboarding...',
            redirect: `success.php?${redirectQuery}`
        }));
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Newton Academy preview running on http://localhost:${PORT}`);
});

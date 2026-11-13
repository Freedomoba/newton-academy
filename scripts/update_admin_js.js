const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// Replace the Controls Bar to add Direction and Place filter dropdowns
const oldControlsBar = `<div class="flex items-center gap-2.5">
                        <div class="w-full sm:w-64">
                            <input type="text" id="tableSearch" oninput="filterTable()" placeholder="Search name, email, phone..." class="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none">
                        </div>
                        <button onclick="downloadCurrentCsv()" class="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all shadow-sm active:scale-95">
                            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            <span>Download CSV</span>
                        </button>
                    </div>`;

const newControlsBar = `<div class="flex flex-wrap items-center gap-2">
                        <div class="w-full sm:w-48">
                            <input type="text" id="tableSearch" oninput="filterTable()" placeholder="Search name, place..." class="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#005f5a] focus:border-[#005f5a] outline-none">
                        </div>
                        <select id="filterDirection" onchange="filterTable()" class="px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005f5a]">
                            <option value="">All Directions</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Facebook">Facebook Ads</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Twitter">Twitter / X</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Google">Google</option>
                            <option value="Direct">Direct / Organic</option>
                        </select>
                        <select id="filterPlace" onchange="filterTable()" class="px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005f5a]">
                            <option value="">All Places</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Port Harcourt">Port Harcourt</option>
                            <option value="Ibadan">Ibadan</option>
                            <option value="Kano">Kano</option>
                            <option value="Ghana">Ghana</option>
                            <option value="London">London / UK</option>
                        </select>
                        <button onclick="downloadCurrentCsv()" class="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all shadow-sm active:scale-95">
                            <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            <span>CSV</span>
                        </button>
                    </div>`;

if (html.includes(oldControlsBar)) {
    html = html.replace(oldControlsBar, newControlsBar);
}

// Update Table Headers
const oldDelegatesTh = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                    <th class="p-4">Timestamp</th>
                                    <th class="p-4">Full Name</th>
                                    <th class="p-4">Email</th>
                                    <th class="p-4">WhatsApp Phone</th>
                                    <th class="p-4 text-center">Status</th>
                                    <th class="p-4 text-right">Action</th>
                                </tr>`;

const newDelegatesTh = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                    <th class="p-3.5">Timestamp</th>
                                    <th class="p-3.5">Full Name</th>
                                    <th class="p-3.5">Email</th>
                                    <th class="p-3.5">Phone</th>
                                    <th class="p-3.5">Place Name</th>
                                    <th class="p-3.5">Direction</th>
                                    <th class="p-3.5 text-center">Status</th>
                                    <th class="p-3.5 text-right">Action</th>
                                </tr>`;

if (html.includes(oldDelegatesTh)) {
    html = html.replace(oldDelegatesTh, newDelegatesTh);
}

const oldSchTh = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                    <th class="p-4">Timestamp</th>
                                    <th class="p-4">App ID</th>
                                    <th class="p-4">Full Name</th>
                                    <th class="p-4">Email</th>
                                    <th class="p-4">Phone</th>
                                    <th class="p-4">Programme</th>
                                    <th class="p-4">Payment</th>
                                    <th class="p-4 text-center">Status</th>
                                    <th class="p-4 text-right">Action</th>
                                </tr>`;

const newSchTh = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                    <th class="p-3.5">Timestamp</th>
                                    <th class="p-3.5">App ID</th>
                                    <th class="p-3.5">Full Name</th>
                                    <th class="p-3.5">Programme</th>
                                    <th class="p-3.5">Place Name</th>
                                    <th class="p-3.5">Direction</th>
                                    <th class="p-3.5 text-center">Payment</th>
                                    <th class="p-3.5 text-right">Action</th>
                                </tr>`;

if (html.includes(oldSchTh)) {
    html = html.replace(oldSchTh, newSchTh);
}

fs.writeFileSync('admin.html', html, 'utf8');
console.log('Updated admin.html controls and table headers');


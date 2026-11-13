const fs = require('fs');

let s = fs.readFileSync('admin.php', 'utf8');

// Replace table header in delegates
const oldDelThead = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-4">Timestamp</th>
                                <th class="p-4">Full Name</th>
                                <th class="p-4">Email</th>
                                <th class="p-4">WhatsApp Phone</th>
                                <th class="p-4 text-right">Action</th>
                            </tr>`;

const newDelThead = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-3.5">Timestamp</th>
                                <th class="p-3.5">Full Name</th>
                                <th class="p-3.5">Email</th>
                                <th class="p-3.5">Phone</th>
                                <th class="p-3.5">Place Name</th>
                                <th class="p-3.5">Direction</th>
                                <th class="p-3.5 text-right">Action</th>
                            </tr>`;

if (s.includes(oldDelThead)) {
    s = s.replace(oldDelThead, newDelThead);
}

// Replace table row in delegates
const oldDelTrow = `<tr class="hover:bg-slate-50/70">
                                <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></td>
                                <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($lead['Full Name'] ?? ($lead[1] ?? '-')); ?></td>
                                <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($leadEmail); ?></td>
                                <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></td>
                                <td class="p-4 text-right">`;

const newDelTrow = `<tr class="hover:bg-slate-50/70">
                                <td class="p-3.5 font-mono text-slate-500 text-[11px]"><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></td>
                                <td class="p-3.5 font-bold text-slate-900"><?php echo htmlspecialchars($lead['Full Name'] ?? ($lead[1] ?? '-')); ?></td>
                                <td class="p-3.5 text-slate-600 font-mono"><?php echo htmlspecialchars($leadEmail); ?></td>
                                <td class="p-3.5 text-slate-600 font-mono"><?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">📍 <?php echo htmlspecialchars($lead['Location'] ?? ($lead[6] ?? 'Lagos, Nigeria')); ?></span></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-50 text-[#005f5a] border border-teal-200">🔗 <?php echo htmlspecialchars($lead['Source'] ?? ($lead[5] ?? 'WhatsApp')); ?></span></td>
                                <td class="p-3.5 text-right">`;

if (s.includes(oldDelTrow)) {
    s = s.replace(oldDelTrow, newDelTrow);
}

// In mobile card for delegates, add Place and Source pills
const oldDelCardBottom = `<div class="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <span>Phone: <?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></span>
                                <span><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></span>
                            </div>`;

const newDelCardBottom = `<div class="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">📍 <?php echo htmlspecialchars($lead['Location'] ?? ($lead[6] ?? 'Lagos, Nigeria')); ?></span>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-[#005f5a] border border-teal-200 font-bold">🔗 <?php echo htmlspecialchars($lead['Source'] ?? ($lead[5] ?? 'WhatsApp')); ?></span>
                            </div>
                            <div class="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                                <span>Phone: <?php echo htmlspecialchars($lead['WhatsApp Phone'] ?? ($lead[3] ?? '-')); ?></span>
                                <span><?php echo htmlspecialchars($lead['Timestamp'] ?? ($lead[0] ?? '-')); ?></span>
                            </div>`;

if (s.includes(oldDelCardBottom)) {
    s = s.replace(oldDelCardBottom, newDelCardBottom);
}

fs.writeFileSync('admin.php', s, 'utf8');
console.log('Updated admin.php delegates table and cards with place & source');


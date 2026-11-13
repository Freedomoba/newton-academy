const fs = require('fs');

let s = fs.readFileSync('admin.php', 'utf8');

// Replace table header in scholarships
const oldSchThead = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-4">Timestamp</th>
                                <th class="p-4">App ID</th>
                                <th class="p-4">Candidate</th>
                                <th class="p-4">Email</th>
                                <th class="p-4">Phone</th>
                                <th class="p-4">Track</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-right">Action</th>
                            </tr>`;

const newSchThead = `<tr class="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                                <th class="p-3.5">Timestamp</th>
                                <th class="p-3.5">App ID</th>
                                <th class="p-3.5">Candidate</th>
                                <th class="p-3.5">Programme</th>
                                <th class="p-3.5">Place Name</th>
                                <th class="p-3.5">Direction</th>
                                <th class="p-3.5 text-center">Status</th>
                                <th class="p-3.5 text-right">Action</th>
                            </tr>`;

if (s.includes(oldSchThead)) {
    s = s.replace(oldSchThead, newSchThead);
}

// Replace table row in scholarships
const oldSchTrow = `<tr class="hover:bg-slate-50/70">
                                <td class="p-4 font-mono text-slate-500"><?php echo htmlspecialchars($app['Timestamp'] ?? ($app[0] ?? '-')); ?></td>
                                <td class="p-4 font-mono font-bold text-[#005f5a]"><?php echo htmlspecialchars($app['Application ID'] ?? ($app[1] ?? '-')); ?></td>
                                <td class="p-4 font-bold text-slate-900"><?php echo htmlspecialchars($app['Full Name'] ?? ($app[2] ?? '-')); ?></td>
                                <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($appEmail); ?></td>
                                <td class="p-4 text-slate-600 font-mono"><?php echo htmlspecialchars($app['Phone'] ?? ($app[4] ?? '-')); ?></td>
                                <td class="p-4"><span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800"><?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?></span></td>
                                <td class="p-4"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600"><?php echo htmlspecialchars($app['Payment Status'] ?? ($app[7] ?? 'Pending')); ?></span></td>
                                <td class="p-4 text-right">`;

const newSchTrow = `<tr class="hover:bg-slate-50/70">
                                <td class="p-3.5 font-mono text-slate-500 text-[11px]"><?php echo htmlspecialchars($app['Timestamp'] ?? ($app[0] ?? '-')); ?></td>
                                <td class="p-3.5 font-mono font-bold text-[#005f5a]"><?php echo htmlspecialchars($app['Application ID'] ?? ($app[1] ?? '-')); ?></td>
                                <td class="p-3.5 font-bold text-slate-900"><?php echo htmlspecialchars($app['Full Name'] ?? ($app[2] ?? '-')); ?></td>
                                <td class="p-3.5"><span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800"><?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?></span></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">📍 <?php echo htmlspecialchars($app['Location'] ?? ($app[9] ?? 'Lagos, Nigeria')); ?></span></td>
                                <td class="p-3.5"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-50 text-[#005f5a] border border-teal-200">🔗 <?php echo htmlspecialchars($app['Source'] ?? ($app[8] ?? 'WhatsApp')); ?></span></td>
                                <td class="p-3.5 text-center"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600"><?php echo htmlspecialchars($app['Payment Status'] ?? ($app[7] ?? 'Pending')); ?></span></td>
                                <td class="p-3.5 text-right">`;

if (s.includes(oldSchTrow)) {
    s = s.replace(oldSchTrow, newSchTrow);
}

// In mobile card for scholarships, add Place and Source pills
const oldSchCardBottom = `<div class="flex items-center justify-between gap-2 text-[10px]">
                                <span class="px-2 py-0.5 rounded font-bold <?php echo strpos(($app['Programme'] ?? ($app[5] ?? '')), 'Entrepreneurship') !== false ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'; ?>">
                                    <?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?>
                                </span>
                                <span class="font-mono text-slate-500"><?php echo htmlspecialchars($app['Phone'] ?? ($app[4] ?? '-')); ?></span>
                            </div>`;

const newSchCardBottom = `<div class="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">📍 <?php echo htmlspecialchars($app['Location'] ?? ($app[9] ?? 'Lagos, Nigeria')); ?></span>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 text-[#005f5a] border border-teal-200 font-bold">🔗 <?php echo htmlspecialchars($app['Source'] ?? ($app[8] ?? 'WhatsApp')); ?></span>
                                <span class="px-2 py-0.5 rounded font-bold <?php echo strpos(($app['Programme'] ?? ($app[5] ?? '')), 'Entrepreneurship') !== false ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'; ?>">
                                    <?php echo htmlspecialchars($app['Programme'] ?? ($app[5] ?? '-')); ?>
                                </span>
                            </div>
                            <div class="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                                <span>Phone: <?php echo htmlspecialchars($app['Phone'] ?? ($app[4] ?? '-')); ?></span>
                                <span><?php echo htmlspecialchars($app['Timestamp'] ?? ($app[0] ?? '-')); ?></span>
                            </div>`;

if (s.includes(oldSchCardBottom)) {
    s = s.replace(oldSchCardBottom, newSchCardBottom);
}

fs.writeFileSync('admin.php', s, 'utf8');
console.log('Updated admin.php scholarship table and cards with place & source');


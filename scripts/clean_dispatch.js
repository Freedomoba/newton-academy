const fs = require('fs');

['scholarship.html', 'scholarship.php'].forEach(file => {
    let s = fs.readFileSync(file, 'utf8');

    // Remove Classified Council Dispatch
    s = s.replace(/<span class="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block shadow-sm">\s*Classified Council Dispatch\s*<\/span>/gi, '');

    // Remove any remaining badge preheadings before H1, H2, H3
    s = s.replace(/<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-\[#005f5a\] text-xs font-bold uppercase tracking-wider">\s*<span>Classified Dispatch #NA-2026-ADM<\/span>\s*<\/div>/gi, '');

    fs.writeFileSync(file, s, 'utf8');
});

console.log('Removed remaining preheadings from scholarship pages!');

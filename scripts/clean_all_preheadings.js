const fs = require('fs');

const files = [
    'scholarship.html', 'scholarship.php',
    'special-offer.html', 'special-offer.php',
    'upsell.html', 'upsell.php'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let s = fs.readFileSync(file, 'utf8');

    // 1. Remove Track 01 pill
    const t1Regex = /<span class="px-3\.5 py-1\.5 rounded-full text-xs font-bold tracking-wider uppercase bg-teal-50 text-\[#005f5a\] border border-\[#005f5a\]\/30 inline-block">\s*Track 01 &bull; Client Acquisition\s*<\/span>\s*/g;
    s = s.replace(t1Regex, '');

    // 2. Remove Track 02 pill
    const t2Regex = /<span class="px-3\.5 py-1\.5 rounded-full text-xs font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md inline-block">\s*Track 02 &bull; Most Popular\s*<\/span>\s*/g;
    s = s.replace(t2Regex, '');

    // 3. Remove UNICEF preheading badge if present
    const unicefRegex = /<div class="inline-flex items-center gap-2 px-3\.5 py-1\.5 rounded-full bg-teal-500\/20 border border-teal-400\/40 text-teal-300 text-xs font-bold uppercase tracking-wider">\s*<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"><\/span>\s*UNICEF-Aligned Initiative &bull; Women, Ladies & The Girl Child\s*<\/div>\s*/g;
    s = s.replace(unicefRegex, '');

    fs.writeFileSync(file, s, 'utf8');
    console.log(`Cleaned track & UNICEF preheadings in ${file}`);
});

// Also remove the tutor preheadings in curriculum-de and curriculum-dm
['curriculum-de.html', 'curriculum-de.php', 'curriculum-dm.html', 'curriculum-dm.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let s = fs.readFileSync(file, 'utf8');
    s = s.replace(/<span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">\s*Multi-Venture Founder\s*<\/span>\s*/g, '');
    s = s.replace(/<span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">\s*Fortune 500 Strategist\s*<\/span>\s*/g, '');
    fs.writeFileSync(file, s, 'utf8');
    console.log(`Cleaned tutor preheading in ${file}`);
});


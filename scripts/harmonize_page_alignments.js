const fs = require('fs');

// 1. HARMONIZE index.html and index.php to max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
function harmonizeIndex(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');

    // Header
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 py-2\.5 sm:py-3\.5 flex items-center justify-between gap-3">/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">'
    );

    // Main
    c = c.replace(
        /<main class="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">/,
        '<main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">'
    );

    // Features / Bonuses section
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6">(\s*<div class="text-center max-w-3xl mx-auto mb-12">)/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">$1'
    );

    // Bonuses section
    c = c.replace(
        /<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
        '<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Faculty section
    c = c.replace(
        /<section id="faculty" class="border-t border-slate-200 bg-white py-16">\s*<div class="max-w-6xl mx-auto px-4 sm:px-6">/,
        '<section id="faculty" class="border-t border-slate-200 bg-white py-16">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Reviews section (was max-w-4xl)
    c = c.replace(
        /<section id="reviews" class="border-t border-slate-200 bg-\[#f1f5f9\] py-16">\s*<div class="max-w-4xl mx-auto px-4 sm:px-6">/,
        '<section id="reviews" class="border-t border-slate-200 bg-[#f1f5f9] py-16">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Alumni showcase
    c = c.replace(
        /<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">/,
        '<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">'
    );

    // Video interviews
    c = c.replace(
        /<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">'
    );

    // UNICEF section
    c = c.replace(
        /<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
        '<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Convener section ("Why we convened this conference") - was max-w-4xl!
    c = c.replace(
        /<section id="convener" class="border-t border-slate-200 bg-white py-16">\s*<div class="max-w-4xl mx-auto px-4 sm:px-6">/,
        '<section id="convener" class="border-t border-slate-200 bg-white py-16">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Support banner - ensure max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">'
    );

    // Footer - was max-w-7xl
    c = c.replace(
        /<footer class="bg-\[#003835\] text-slate-300 py-8 border-t border-emerald-900\/50">\s*<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
        '<footer class="bg-[#003835] text-slate-300 py-8 border-t border-emerald-900/50">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    fs.writeFileSync(file, c, 'utf8');
    console.log(`[${file}] Harmonized to max-w-6xl grid`);
}

// 2. HARMONIZE scholarship.html, scholarship.php, special-offer.*, upsell.* to max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
function harmonizeScholarship(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');

    // Header: max-w-5xl
    c = c.replace(
        /<header class="bg-white border-b border-slate-200 sticky top-0 z-40">\s*<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8/,
        '<header class="bg-white border-b border-slate-200 sticky top-0 z-40">\n        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'
    );

    // Main: max-w-5xl
    c = c.replace(
        /<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">/,
        '<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">'
    );

    // Confidential envelope card: max-w-5xl
    c = c.replace(
        /relative max-w-4xl mx-auto bg-gradient-to-br from-\[#003e3b\]/,
        'relative max-w-5xl mx-auto bg-gradient-to-br from-[#003e3b]'
    );

    // Endowment breakdown grid: max-w-5xl
    c = c.replace(
        /<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">/,
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">'
    );

    // Support banner: max-w-5xl
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">/,
        '<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">'
    );

    // Footer: max-w-5xl
    c = c.replace(
        /<footer class="bg-\[#003835\] text-slate-300 py-8 border-t border-emerald-900\/50">\s*<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
        '<footer class="bg-[#003835] text-slate-300 py-8 border-t border-emerald-900/50">\n        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Alumni showcase inner container: max-w-5xl
    c = c.replace(
        /<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">/,
        '<div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">'
    );

    fs.writeFileSync(file, c, 'utf8');
    console.log(`[${file}] Harmonized to max-w-5xl grid`);
}

// 3. HARMONIZE curriculum-dm.* and curriculum-de.* to max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
function harmonizeCurriculum(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');

    // Header
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 py-2\.5 sm:py-3\.5 flex items-center justify-between gap-2">/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">'
    );

    // Hero
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">'
    );

    // Sections
    c = c.replace(
        /<section class="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">\s*<div class="max-w-6xl mx-auto px-4 sm:px-6">/,
        '<section class="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    c = c.replace(
        /<section class="py-14 sm:py-20 bg-white border-b border-slate-200">\s*<div class="max-w-6xl mx-auto px-4 sm:px-6">/,
        '<section class="py-14 sm:py-20 bg-white border-b border-slate-200">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Modules (was max-w-4xl)
    c = c.replace(
        /<section id="modules" class="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">\s*<div class="max-w-4xl mx-auto px-4 sm:px-6">/,
        '<section id="modules" class="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Capstone Project (was max-w-5xl)
    c = c.replace(
        /<section class="bg-gradient-to-br from-\[#002f2d\] via-\[#004d49\] to-\[#003835\] text-white py-16 sm:py-24 border-b border-emerald-900\/60">\s*<div class="max-w-5xl mx-auto px-4 sm:px-6">/,
        '<section class="bg-gradient-to-br from-[#002f2d] via-[#004d49] to-[#003835] text-white py-16 sm:py-24 border-b border-emerald-900/60">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // FAQ (was max-w-4xl)
    c = c.replace(
        /<section class="py-16 sm:py-24 bg-white border-b border-slate-200">\s*<div class="max-w-4xl mx-auto px-4 sm:px-6">/,
        '<section class="py-16 sm:py-24 bg-white border-b border-slate-200">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">'
    );

    // Support banner
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">/,
        '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">'
    );

    // Footer
    c = c.replace(
        /<footer class="bg-\[#003835\] text-slate-300 py-10 border-t border-emerald-900\/50">\s*<div class="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">/,
        '<footer class="bg-[#003835] text-slate-300 py-10 border-t border-emerald-900/50">\n        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">'
    );

    fs.writeFileSync(file, c, 'utf8');
    console.log(`[${file}] Harmonized to max-w-6xl grid`);
}

// 4. HARMONIZE checkout.html and checkout.php to max-w-4xl
function harmonizeCheckout(file) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');

    // Header
    c = c.replace(
        /<div class="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">/,
        '<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">'
    );

    // Main
    c = c.replace(
        /<main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">/,
        '<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">'
    );

    // Support banner (was max-w-6xl)
    c = c.replace(
        /<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">/,
        '<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">'
    );

    fs.writeFileSync(file, c, 'utf8');
    console.log(`[${file}] Harmonized to max-w-4xl grid`);
}

['index.html', 'index.php'].forEach(harmonizeIndex);
['scholarship.html', 'scholarship.php', 'special-offer.html', 'special-offer.php', 'upsell.html', 'upsell.php'].forEach(harmonizeScholarship);
['curriculum-dm.html', 'curriculum-dm.php', 'curriculum-de.html', 'curriculum-de.php'].forEach(harmonizeCurriculum);
['checkout.html', 'checkout.php'].forEach(harmonizeCheckout);


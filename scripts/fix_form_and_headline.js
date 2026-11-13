const fs = require('fs');

['index.html', 'index.php'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove the disclaimer div below the form
    const disclaimerRegex = /<div class="mt-4 pt-3 border-t border-slate-200 font-sans">\s*<p class="text-\[10px\] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto px-4">This site is not a part of or endorsed by Facebook, Google[\s\S]*?<\/p>\s*<\/div>/;
    if (disclaimerRegex.test(content)) {
        content = content.replace(disclaimerRegex, '');
        console.log(`[${file}] Removed Facebook/Meta disclaimer from form`);
    } else {
        console.log(`[${file}] Warning: disclaimerRegex did not match directly`);
    }

    // 2. Fix headline text error: Title Case and clean phrasing
    content = content.replace(
        /Convened by Newton Academy\. Taught by world-class global tutors\./g,
        'Convened by Newton Academy. Taught by World-Class Global Tutors.'
    );
    console.log(`[${file}] Fixed headline text error capitalization`);

    // 3. Clean up "different seasoned" in faculty paragraph
    content = content.replace(
        /our faculty consists of different seasoned global tutors and practitioners/g,
        'our faculty consists of seasoned global tutors and practitioners'
    );

    // 4. Fix duplicate Hosted by Newton Academy • Convened by Newton Academy
    content = content.replace(
        /Hosted by Newton Academy &bull; Convened by Newton Academy/g,
        'Hosted &amp; Convened by Newton Academy'
    );
    console.log(`[${file}] Fixed duplicate Hosted/Convened on line 116`);

    fs.writeFileSync(file, content, 'utf8');
});

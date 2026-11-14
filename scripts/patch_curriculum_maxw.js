const fs = require('fs');

['curriculum-dm.html', 'curriculum-dm.php', 'curriculum-de.html', 'curriculum-de.php'].forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/<div class="max-w-5xl mx-auto px-4 sm:px-6">/, '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">');
    fs.writeFileSync(f, c, 'utf8');
});
console.log('Updated curriculum files');


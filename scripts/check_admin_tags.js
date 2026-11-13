const fs = require('fs');

['admin.html', 'admin.php'].forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    console.log(`=== ${file} Tag Balance Check ===`);
    const tags = ["div", "main", "header", "section", "table", "tbody", "thead", "tr", "td", "th"];
    tags.forEach(t => {
        const open = (html.match(new RegExp("<" + t + "(\\s|>)", "gi")) || []).length;
        const close = (html.match(new RegExp("</" + t + ">", "gi")) || []).length;
        console.log(`  ${t}: open=${open}, close=${close}, diff=${open - close}`);
    });
});


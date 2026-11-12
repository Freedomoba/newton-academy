const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

function checkOpenTagsAt(pos, name) {
    const before = index.substring(0, pos);
    const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
    let match;
    const openElements = [];

    while ((match = tagRegex.exec(before)) !== null) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        const isClosing = fullTag.startsWith('</');
        const isSelfClosing = fullTag.endsWith('/>') || ['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName);

        if (isSelfClosing) continue;

        if (!isClosing) {
            openElements.push({ tag: tagName, snippet: fullTag.substring(0, 80) });
        } else {
            for (let i = openElements.length - 1; i >= 0; i--) {
                if (openElements[i].tag === tagName) {
                    openElements.splice(i, 1);
                    break;
                }
            }
        }
    }

    console.log(`Unclosed tags at ${name}:`);
    openElements.forEach((el, idx) => {
        console.log(`  ${idx + 1}: <${el.tag}> -> ${el.snippet}`);
    });
}

checkOpenTagsAt(29872, 'Before Section 2 (Reviews)');
checkOpenTagsAt(35968, 'Before Section 3 (Videos)');
checkOpenTagsAt(index.length, 'At End of index.html');

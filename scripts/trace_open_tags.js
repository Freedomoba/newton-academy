const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const sec1Start = 27179;
const beforeSec1 = index.substring(0, sec1Start);

// Trace every opening tag and closing tag of structural elements
const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
let match;
const openElements = [];

while ((match = tagRegex.exec(beforeSec1)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName);

    if (isSelfClosing) continue;

    if (!isClosing) {
        openElements.push({ tag: tagName, snippet: fullTag.substring(0, 80) });
    } else {
        // find last matching tag
        for (let i = openElements.length - 1; i >= 0; i--) {
            if (openElements[i].tag === tagName) {
                openElements.splice(i, 1);
                break;
            }
        }
    }
}

console.log('Unclosed tags before Section 1:');
openElements.forEach((el, idx) => {
    console.log(`${idx + 1}: <${el.tag}> -> ${el.snippet}`);
});

const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Parse tags in order
const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
let match;
const stack = [];
const structural = ['section', 'div', 'main', 'header', 'footer', 'form', 'article'];

let errCount = 0;
while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName);

    if (isSelfClosing) continue;

    if (!structural.includes(tagName)) continue;

    if (!isClosing) {
        stack.push({ tag: tagName, index: match.index });
    } else {
        if (stack.length === 0) {
            console.log(`Unmatched closing </${tagName}> at char ${match.index}`);
            errCount++;
        } else {
            const last = stack[stack.length - 1];
            if (last.tag === tagName) {
                stack.pop();
            } else {
                console.log(`Mismatch: expected </${last.tag}> (opened at ${last.index}) but found </${tagName}> at char ${match.index}`);
                console.log('Context:', html.substring(Math.max(0, match.index - 80), match.index + 80).replace(/\s+/g, ' '));
                errCount++;
                if (errCount > 10) break;
            }
        }
    }
}

console.log('Remaining unclosed tags on stack:', stack.length);
if (stack.length > 0) {
    stack.forEach(s => console.log(`Unclosed <${s.tag}> opened at char ${s.index}`));
}

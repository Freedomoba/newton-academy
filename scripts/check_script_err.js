const fs = require('fs');
const c = fs.readFileSync('thank-you.html', 'utf8');
const scriptMatches = c.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Script count:', scriptMatches.length);
if (scriptMatches[1]) {
    console.log(scriptMatches[1]);
} else if (scriptMatches[0]) {
    console.log(scriptMatches[0].slice(scriptMatches[0].length - 600));
}

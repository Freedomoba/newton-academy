const fs = require('fs');
const html = fs.readFileSync('scholarship.html', 'utf8');

const storyIdx = html.indexOf('From Hawking Boiled Corn');
const endStoryIdx = html.indexOf('<!-- END OF INLINE NARRATIVE 1 -->') !== -1 
    ? html.indexOf('<!-- END OF INLINE NARRATIVE 1 -->') 
    : html.indexOf('<!-- INSPIRING MOMENTUM & MOTIVATION POSTERS -->');

console.log('Story starts at:', storyIdx, 'ends at:', endStoryIdx);
console.log(html.slice(storyIdx - 100, Math.min(storyIdx + 3000, endStoryIdx + 200)));

const fs = require('fs');
const s = fs.readFileSync('scholarship.html', 'utf8');

const hMatches = [...s.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)];
console.log('Total h1-h3 in scholarship.html:', hMatches.length);
hMatches.forEach((m, idx) => {
  const headingText = m[2].replace(/<[^>]+>/g, '').trim().substring(0, 50);
  const startIdx = m.index;
  const beforeText = s.substring(Math.max(0, startIdx - 200), startIdx).trim();
  console.log(`[H${m[1]}] ${headingText}`);
  const lines = beforeText.split('\n');
  const lastLine = lines.slice(-2).join(' ').trim();
  console.log(`   Before: ${lastLine}`);
});

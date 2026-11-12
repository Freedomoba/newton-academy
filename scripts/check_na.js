const fs = require('fs');
const js = fs.readFileSync('assets/js/application-evaluation.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('>NA<') || l.includes('NA</span>') || l.includes('font-black">NA')) {
    console.log('Line', idx, ':', l.trim());
  }
});


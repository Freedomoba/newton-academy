const fs = require('fs');
const css = fs.readFileSync('assets/css/animations.css', 'utf8');

const doorIdx = css.indexOf('door-panel-left');
console.log(css.slice(doorIdx - 100, doorIdx + 1200));


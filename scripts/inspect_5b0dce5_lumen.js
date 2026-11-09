const { execSync } = require('child_process');
const de = execSync('git show 5b0dce5:curriculum-de.html', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

const idxLumen = de.indexOf('Integrated Lumenvox AI');
console.log('Lumen in 5b0dce5:', idxLumen);
console.log(de.slice(idxLumen - 200, idxLumen + 1500));

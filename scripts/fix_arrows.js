const fs = require('fs');
const path = require('path');

const files = ['thank-you.html', 'thank-you.php'];

const oldArrowBlockPattern = /<!-- 3 Pulsing Attention Arrows -->[\s\S]*?<\/div>\s*<\/div>/m;

const newArrowMarkup = `<!-- Real Downward Arrow Indicators -->
        <div class="flex items-center justify-center gap-6 sm:gap-10 mb-4 select-none">
            <div class="text-amber-500 arrow-pulse-1">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
            <div class="text-amber-400 arrow-pulse-2">
                <svg class="w-10 h-10 sm:w-12 sm:h-12 fill-current drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
            <div class="text-amber-500 arrow-pulse-3">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow" viewBox="0 0 24 24">
                    <path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/>
                </svg>
            </div>
        </div>`;

files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');

    content = content.replace(oldArrowBlockPattern, newArrowMarkup);

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Replaced text pills with real arrow symbols in ${file}`);
});

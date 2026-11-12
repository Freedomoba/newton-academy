const fs = require('fs');
const path = require('path');

console.log('--- Applying Final Precision Fixes Across Entire Funnel ---');

// ============================================================================
// 1. UPDATE BUILD_CLEAN_PAGES.JS TO ENSURE:
//    - ENVELOPE CLICK HANDLER ALWAYS WORKS (SCROLLS & HIGHLIGHTS)
//    - FOOTER HAS NO "Newton OS Limited • UBA..." LINE
//    - MERGED ONE-SENTENCE DISCLAIMER
//    - 7 PORTRAIT VIMEO TESTIMONIAL VIDEOS
// ============================================================================

// First, re-run build_clean_pages.js
require('./build_clean_pages.js');

// Now, let's update all generated and existing HTML/PHP files
const files = [
  'index.html', 'index.php',
  'thank-you.html', 'thank-you.php',
  'scholarship.html', 'scholarship.php',
  'special-offer.html', 'special-offer.php',
  'upsell.html', 'upsell.php',
  'checkout.html', 'checkout.php',
  'curriculum-de.html', 'curriculum-de.php',
  'curriculum-dm.html', 'curriculum-dm.php'
];

const mergedDisclaimer = `<p class="text-[10px] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto px-4">This site is not a part of or endorsed by Facebook, Google, Meta Platforms, Inc., or Alphabet Inc., and Newton Academy makes no income guarantees as earnings depend entirely on individual dedication, skills, and commercial execution.</p>`;

files.forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove "Newton OS Limited • UBA, Zenith & Union Bank Corporate Accounts" from footer
  if (content.includes('Newton OS Limited &bull; UBA, Zenith & Union Bank Corporate Accounts') || 
      content.includes('Newton OS Limited • UBA, Zenith & Union Bank Corporate Accounts')) {
    content = content.replace(/<p>\s*Newton OS Limited\s*(?:&bull;|•)\s*UBA,\s*Zenith\s*&\s*Union\s*Bank\s*Corporate\s*Accounts\s*<\/p>/gi, '');
    content = content.replace(/Newton OS Limited\s*(?:&bull;|•)\s*UBA,\s*Zenith\s*&\s*Union\s*Bank\s*Corporate\s*Accounts/gi, '');
    changed = true;
    console.log(`[${filename}] Removed Newton OS Bank line from footer`);
  }

  // 2. Merge disclaimers into ONE sentence
  // Pattern 1: Separate Facebook/Meta, Google, and Earnings paragraphs
  const oldDisclaimerPattern = /<div class="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-slate-200 text-\[10px\] text-slate-400 text-center leading-normal space-y-2">[\s\S]*?<\/div>/i;
  if (oldDisclaimerPattern.test(content)) {
    content = content.replace(oldDisclaimerPattern, `<div class="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-slate-200">\n        ${mergedDisclaimer}\n    </div>`);
    changed = true;
    console.log(`[${filename}] Merged 3 disclaimers into one sentence`);
  }

  // Pattern 2: Optin card disclaimer under form in index.html
  const optinDisclaimerPattern = /<div class="mt-4 pt-3 border-t border-slate-200 text-\[10px\] text-slate-400 text-center leading-normal font-sans">\s*<p>This site is not a part of the Facebook™ website[\s\S]*?<\/p>\s*<\/div>/i;
  if (optinDisclaimerPattern.test(content)) {
    content = content.replace(optinDisclaimerPattern, `<div class="mt-4 pt-3 border-t border-slate-200 font-sans">\n                        ${mergedDisclaimer}\n                    </div>`);
    changed = true;
    console.log(`[${filename}] Merged optin disclaimer into one sentence`);
  }

  // 3. Fix interactive envelope click handler in scholarship / special-offer / upsell
  if (filename.includes('scholarship') || filename.includes('special-offer') || filename.includes('upsell')) {
    // Ensure button is an anchor with onclick
    if (content.includes('<button type="button" class="px-6 py-2.5 rounded-full bg-amber-400 group-hover:bg-amber-300')) {
      content = content.replace(
        /<button type="button" class="px-6 py-2\.5 rounded-full bg-amber-400 group-hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all">\s*Click Here To Open Dispatch &darr;\s*<\/button>/g,
        `<a href="#officialSalesLetter" onclick="openDispatchLetter(event)" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform hover:scale-105">\n                        <span>Click Here To Open Dispatch</span>\n                        <span>&darr;</span>\n                    </a>`
      );
      changed = true;
    }

    // Ensure envelope div has onclick
    if (content.includes('id="confidentialEnvelope"') && !content.includes('onclick="openDispatchLetter(event)"')) {
      content = content.replace(
        'id="confidentialEnvelope" class="',
        'id="confidentialEnvelope" onclick="openDispatchLetter(event)" class="'
      );
      changed = true;
    }

    // Ensure openDispatchLetter function is defined in script
    const openDispatchFunction = `
        function openDispatchLetter(e) {
            if (e && e.preventDefault) e.preventDefault();
            const letter = document.getElementById('officialSalesLetter');
            const envelope = document.getElementById('confidentialEnvelope');
            if (envelope) {
                envelope.classList.add('ring-4', 'ring-amber-400', 'ring-opacity-80');
            }
            if (letter) {
                letter.classList.remove('hidden');
                const yOffset = -20;
                const y = letter.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    `;

    if (!content.includes('function openDispatchLetter')) {
      content = content.replace('// Envelope unroll interaction', openDispatchFunction + '\n        // Envelope unroll interaction');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Saved updates to ${filename}`);
  }
});

console.log('All updates completed successfully!');


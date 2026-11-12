const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  // Look for the specific broken sequence between tBadge and tQuote
  const startMarker = 'Verified Fellow\n                    </span>\n                </div>';
  const startMarkerCRLF = 'Verified Fellow\r\n                    </span>\r\n                </div>';
  const endMarker = '<!-- Full Quote Body (100% visible, natural text wrap, no horizontal cutoff!) -->';

  let hasCRLF = content.includes('\r\n');
  let sm = hasCRLF ? startMarkerCRLF : startMarker;

  let sIdx = content.indexOf(sm);
  let eIdx = content.indexOf(endMarker);

  if (sIdx !== -1 && eIdx !== -1 && sIdx < eIdx) {
    let before = content.substring(0, sIdx + sm.length);
    let after = content.substring(eIdx);
    let nl = hasCRLF ? '\r\n\r\n                ' : '\n\n                ';
    content = before + nl + after;
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully cleaned up card in', file);
  } else {
    console.log('Markers not found in', file, sIdx, eIdx);
  }
}

fixFile('index.html');
fixFile('index.php');


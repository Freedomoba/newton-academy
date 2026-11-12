const https = require('https');
const fs = require('fs');

const url = 'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537104';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('vimeo_sample.html', html, 'utf8');
    console.log('Saved vimeo_sample.html, size:', html.length);
  });
});


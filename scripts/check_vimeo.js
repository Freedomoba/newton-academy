const https = require('https');

const urls = [
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537104',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537113'
];

function checkUrl(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    console.log('URL:', url, '-> Status:', res.statusCode);
    if (res.statusCode >= 300 && res.statusCode < 400) {
      console.log('Redirect to:', res.headers.location);
    }
    let html = '';
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
      // look for iframe or player.vimeo.com or config
      const matches = html.match(/player\.vimeo\.com\/video\/[a-zA-Z0-9_\?&=]+/g);
      console.log('Matches:', matches ? matches.slice(0, 5) : 'None');
      const configMatch = html.match(/config_url["']:\s*["']([^"']+)["']/);
      if (configMatch) console.log('Config URL:', configMatch[1]);
      const embedCode = html.match(/<iframe[^>]+src=["']([^"']+)["']/);
      if (embedCode) console.log('Iframe src:', embedCode[1]);
    });
  }).on('error', err => {
    console.error('Error:', err.message);
  });
}

checkUrl(urls[0]);


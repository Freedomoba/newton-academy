const https = require('https');
const fs = require('fs');

const videoUrls = [
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537104',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537113',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537116',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537093',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537098',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537121',
  'https://vimeo.com/share/folder/9ae0eba5-521a-4fb2-b52d-8f8db9c7deb0/video/1245537096'
];

function fetchMetadata(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
          if (match) {
            const nextData = JSON.parse(match[1]);
            const clip = nextData.props.pageProps.clip;
            const clipId = nextData.props.pageProps.clipId;
            let hash = nextData.props.pageProps.clipHash;
            if (!hash && clip && clip.pictures && clip.pictures.uri) {
              const hashMatch = clip.pictures.uri.match(/:([a-f0-9]{10})\//);
              if (hashMatch) hash = hashMatch[1];
            }
            resolve({
              id: clipId,
              title: clip.name ? clip.name.replace(/\.mp4$/i, '').replace(/Newton DLHS Interview\s*-\s*/i, '') : 'Student Interview',
              rawTitle: clip.name,
              hash: hash,
              duration: clip.duration,
              width: clip.width,
              height: clip.height,
              thumb: clip.pictures ? clip.pictures.baseLink : null
            });
          } else {
            resolve({ id: url.split('/').pop(), error: 'No next data' });
          }
        } catch (e) {
          resolve({ id: url.split('/').pop(), error: e.message });
        }
      });
    }).on('error', err => resolve({ id: url.split('/').pop(), error: err.message }));
  });
}

async function run() {
  const results = [];
  for (const u of videoUrls) {
    const res = await fetchMetadata(u);
    results.push(res);
    console.log(JSON.stringify(res));
  }
  fs.writeFileSync('scripts/vimeo_videos.json', JSON.stringify(results, null, 2), 'utf8');
}

run();


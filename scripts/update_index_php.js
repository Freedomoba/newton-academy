const fs = require('fs');

let s = fs.readFileSync('index.php', 'utf8');
const isCRLF = s.includes('\r\n');
s = s.replace(/\r\n/g, '\n');

const target = `            const fullName = (document.getElementById('fullName').value || '').trim();
            const email = (document.getElementById('email').value || '').trim();
            const phone = (document.getElementById('phone').value || '').trim();
            try {
                localStorage.setItem('newton_name', fullName);
                localStorage.setItem('newton_email', email);
                localStorage.setItem('newton_phone', phone);
            } catch (err) {}

            const formData = new FormData(form);`;

const replacement = `            const fullName = (document.getElementById('fullName').value || '').trim();
            const email = (document.getElementById('email').value || '').trim();
            const phone = (document.getElementById('phone').value || '').trim();

            // Capture traffic source / direction & location
            const urlParams = new URLSearchParams(window.location.search);
            let trafficSource = urlParams.get('utm_source') || urlParams.get('source') || urlParams.get('ref') || '';
            if (!trafficSource) {
                const ref = (document.referrer || '').toLowerCase();
                if (ref.includes('whatsapp') || ref.includes('wa.me')) trafficSource = 'WhatsApp';
                else if (ref.includes('facebook') || ref.includes('fb.com')) trafficSource = 'Facebook Ads';
                else if (ref.includes('instagram')) trafficSource = 'Instagram';
                else if (ref.includes('twitter') || ref.includes('t.co') || ref.includes('x.com')) trafficSource = 'Twitter / X';
                else if (ref.includes('tiktok')) trafficSource = 'TikTok';
                else if (ref.includes('google')) trafficSource = 'Google';
                else trafficSource = 'WhatsApp';
            }

            let userPlace = 'Lagos, Nigeria';
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
                if (tz.includes('Lagos')) userPlace = 'Lagos, Nigeria';
                else if (tz.includes('Accra')) userPlace = 'Accra, Ghana';
                else if (tz.includes('London')) userPlace = 'London, UK';
                else if (tz.includes('Nairobi')) userPlace = 'Nairobi, Kenya';
                else if (tz.includes('Johannesburg')) userPlace = 'Johannesburg, SA';
                else if (tz.includes('New_York') || tz.includes('Los_Angeles') || tz.includes('Chicago')) userPlace = 'USA';
                else if (tz) userPlace = tz.split('/')[1] ? tz.split('/')[1].replace(/_/g, ' ') : tz;
            } catch (err) {}

            try {
                localStorage.setItem('newton_name', fullName);
                localStorage.setItem('newton_email', email);
                localStorage.setItem('newton_phone', phone);
                localStorage.setItem('newton_source', trafficSource);
                localStorage.setItem('newton_location', userPlace);
            } catch (err) {}

            const formData = new FormData(form);
            formData.append('source', trafficSource);
            formData.append('location', userPlace);`;

if (s.includes(target)) {
    s = s.replace(target, replacement);
    if (isCRLF) s = s.replace(/\n/g, '\r\n');
    fs.writeFileSync('index.php', s, 'utf8');
    console.log('Successfully updated index.php tracking');
} else {
    console.log('Target not found in index.php');
}


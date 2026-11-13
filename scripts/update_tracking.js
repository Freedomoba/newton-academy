const fs = require('fs');

const injectionOld = `            // Persist to localStorage for seamless cross-page continuity
            try {
                localStorage.setItem('newton_name', fullName);
                localStorage.setItem('newton_email', email);
                localStorage.setItem('newton_phone', phone);
                localStorage.setItem('newton_experience', experience);
            } catch (err) {}

            alertBox.className = 'mb-4 p-3.5 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200';
            alertBox.textContent = 'Conference Pass Confirmed! Loading your event briefing...';
            alertBox.classList.remove('hidden');

            // Send to PHP backend in background if running on PHP server
            try {
                const formData = new FormData(form);
                fetch('api/optin.php', { method: 'POST', body: formData }).catch(function() {});
            } catch (e) {}

            setTimeout(function() {
                const query = '?name=' + encodeURIComponent(fullName) + 
                              '&email=' + encodeURIComponent(email) + 
                              '&phone=' + encodeURIComponent(phone);
                window.location.href = 'thank-you.html' + query;
            }, 600);`;

const injectionNew = `            // Capture traffic source / direction & location
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

            // Persist to localStorage for seamless cross-page continuity
            try {
                localStorage.setItem('newton_name', fullName);
                localStorage.setItem('newton_email', email);
                localStorage.setItem('newton_phone', phone);
                localStorage.setItem('newton_experience', experience);
                localStorage.setItem('newton_source', trafficSource);
                localStorage.setItem('newton_location', userPlace);
            } catch (err) {}

            alertBox.className = 'mb-4 p-3.5 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200';
            alertBox.textContent = 'Conference Pass Confirmed! Loading your event briefing...';
            alertBox.classList.remove('hidden');

            // Send to PHP backend in background if running on PHP server
            try {
                const formData = new FormData(form);
                formData.append('source', trafficSource);
                formData.append('location', userPlace);
                fetch('api/optin.php', { method: 'POST', body: formData }).catch(function() {});
            } catch (e) {}

            setTimeout(function() {
                const query = '?name=' + encodeURIComponent(fullName) + 
                              '&email=' + encodeURIComponent(email) + 
                              '&phone=' + encodeURIComponent(phone) +
                              '&source=' + encodeURIComponent(trafficSource) +
                              '&place=' + encodeURIComponent(userPlace);
                window.location.href = (window.location.pathname.endsWith('.php') ? 'thank-you.php' : 'thank-you.html') + query;
            }, 600);`;

['index.html', 'index.php'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let s = fs.readFileSync(file, 'utf8');
    // Normalize newlines to \n for matching
    const isCRLF = s.includes('\r\n');
    s = s.replace(/\r\n/g, '\n');
    if (s.includes(injectionOld)) {
        s = s.replace(injectionOld, injectionNew);
        if (isCRLF) s = s.replace(/\n/g, '\r\n');
        fs.writeFileSync(file, s, 'utf8');
        console.log(`Updated tracking in ${file}`);
    } else {
        console.log(`Pattern not found in ${file}`);
    }
});


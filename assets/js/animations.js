/**
 * Newton Academy - Interactive Animations & Social Proof Engine
 */
(function() {
    'use strict';

    // 1. SCROLL REVEAL OBSERVER (Safe: never hides essential content with opacity 0)
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (!revealElements.length) return;
        
        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('is-revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '50px'
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    // 2. NUMBER COUNTER ANIMATION
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-counter'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 1800;
                    const stepTime = 30;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target.toLocaleString() + suffix;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current).toLocaleString() + suffix;
                        }
                    }, stepTime);

                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(c => countObserver.observe(c));
    }

        // 3. LIVE REGISTRATION SOCIAL PROOF TICKER
    const registrationNames = [
        { name: "Chidinma O.", loc: "Lagos, Nigeria", pronoun: "her", track: "Digital Marketing + AI", time: "2 minutes ago" },
        { name: "Blessing A.", loc: "Abuja, FCT", pronoun: "her", track: "Digital Entrepreneurship + AI", time: "4 minutes ago" },
        { name: "Zainab B.", loc: "Kano, Nigeria", pronoun: "her", track: "Digital Marketing + AI", time: "6 minutes ago" },
        { name: "Bryan B.", loc: "Enugu, Nigeria", pronoun: "his", track: "Digital Entrepreneurship + AI", time: "8 minutes ago" },
        { name: "Folashade K.", loc: "London, UK", pronoun: "her", track: "Digital Entrepreneurship + AI", time: "10 minutes ago" },
        { name: "Amina M.", loc: "Accra, Ghana", pronoun: "her", track: "Digital Marketing + AI", time: "12 minutes ago" },
        { name: "Emmanuel O.", loc: "Ibadan, Oyo", pronoun: "his", track: "Digital Entrepreneurship + AI", time: "15 minutes ago" },
        { name: "Chioma E.", loc: "Port Harcourt", pronoun: "her", track: "Digital Marketing + AI", time: "17 minutes ago" },
        { name: "Tunde A.", loc: "Lagos, Nigeria", pronoun: "his", track: "Digital Marketing + AI", time: "20 minutes ago" },
        { name: "Grace T.", loc: "Warri, Delta", pronoun: "her", track: "Digital Entrepreneurship + AI", time: "23 minutes ago" }
    ];

    function initSocialProofTicker() {
        if (window.innerWidth < 480) return; // cleaner experience on tiny devices
        
        // Context detection:
        // Opt-in page: contains #registrationForm or index in URL
        const pathname = window.location.pathname.toLowerCase();
        const hasRegForm = !!document.getElementById('registrationForm');
        const isOptin = hasRegForm || pathname.endsWith('index.html') || pathname.endsWith('index.php') || pathname === '/' || pathname.endsWith('/newton-academy/') || pathname.endsWith('/newton/');

        let toast = document.getElementById('socialProofToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'socialProofToast';
            toast.className = 'social-proof-toast';
            toast.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 text-[#005f5a] font-bold text-xs flex items-center justify-center shrink-0">
                        <span id="toastAvatar">CO</span>
                    </div>
                    <div class="text-left text-xs leading-tight">
                        <p class="font-bold text-slate-900" id="toastName">Chidinma O.</p>
                        <p class="text-slate-600 text-[11px] mt-0.5" id="toastAction"></p>
                        <p class="text-[10px] text-[#005f5a] font-semibold mt-0.5" id="toastDetail"></p>
                        <span class="text-[9px] text-slate-400 font-medium block mt-0.5" id="toastTime">2 minutes ago</span>
                    </div>
                </div>
            `;
            document.body.appendChild(toast);
        }

        // Try loading real recorded leads into the notification ticker
        try {
            const savedName = localStorage.getItem('newton_name');
            const savedPlace = localStorage.getItem('newton_location') || 'Lagos, Nigeria';
            const savedTrack = localStorage.getItem('newton_track') || 'Digital Marketing + AI';
            if (savedName && savedName !== 'Delegate' && savedName !== 'Candidate') {
                const parts = savedName.trim().split(' ');
                const displayShortName = parts[0] + (parts.length > 1 ? ' ' + parts[1][0] + '.' : '');
                registrationNames.unshift({
                    name: displayShortName,
                    loc: savedPlace,
                    pronoun: "their",
                    track: savedTrack,
                    time: "Just now"
                });
            }
        } catch (e) {}

        let nameIndex = 0;
        function showNextToast() {
            const data = registrationNames[nameIndex];
            const initials = data.name.split(' ').map(p => p[0]).join('');
            
            const avatar = document.getElementById('toastAvatar');
            const nameEl = document.getElementById('toastName');
            const actionEl = document.getElementById('toastAction');
            const detailEl = document.getElementById('toastDetail');
            const timeEl = document.getElementById('toastTime');

            if (avatar) avatar.textContent = initials;
            if (nameEl) nameEl.textContent = data.name + ' (' + data.loc + ')';
            
            if (isOptin) {
                // Opt-in page: "x just grabbed his/her delegate seat"
                if (actionEl) actionEl.textContent = 'just grabbed ' + data.pronoun + ' delegate seat';
                if (detailEl) detailEl.textContent = 'Digital & Financial Literacy Pass Reserved';
            } else {
                // Thank You / Scholarship / Offer pages: "x just secured a fully funded scholarship to study..."
                if (actionEl) actionEl.textContent = 'just secured a fully funded scholarship';
                if (detailEl) detailEl.textContent = 'to study ' + data.track;
            }

            if (timeEl) timeEl.textContent = data.time;

            toast.classList.add('is-active');

            setTimeout(() => {
                toast.classList.remove('is-active');
            }, 4500);

            nameIndex = (nameIndex + 1) % registrationNames.length;
        }

        setTimeout(() => {
            showNextToast();
            setInterval(showNextToast, 12000);
        }, 3000);
    }

    // Auto-init on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initCounters();
        initSocialProofTicker();
    });

})();

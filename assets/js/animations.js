/**
 * Newton Academy - Interactive Animations & Social Proof Engine
 */
(function() {
    'use strict';

    // 1. SCROLL REVEAL OBSERVER
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-fade-up, section, .brand-shadow');
        
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
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-fade-up');
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
                    const prefix = el.getAttribute('data-prefix') || '';
                    const duration = 1800; // ms
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Easing out cubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeProgress * target);

                        el.textContent = prefix + current.toLocaleString() + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = prefix + target.toLocaleString() + suffix;
                        }
                    }

                    requestAnimationFrame(updateCount);
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(c => countObserver.observe(c));
    }

    // 3. LIVE SOCIAL PROOF POPUP NOTIFICATIONS
    function initSocialProofToast() {
        const activities = [
            { name: "Amina B.", city: "Abuja", action: "just reserved a delegate pass", time: "1 min ago" },
            { name: "Tolulope A.", city: "Ibadan", action: "secured a free conference pass", time: "3 mins ago" },
            { name: "Nneka K.", city: "Enugu", action: "applied for 100% Tuition Scholarship", time: "Just now" },
            { name: "Oluwaseun O.", city: "Lagos", action: "joined the private WhatsApp room", time: "2 mins ago" },
            { name: "Fatima A.", city: "Kano", action: "reserved her virtual conference pass", time: "4 mins ago" },
            { name: "Chidinma N.", city: "Port Harcourt", action: "applied for Digital Entrepreneurship", time: "Just now" },
            { name: "Zainab E.", city: "Kaduna", action: "claimed 100% scholarship file", time: "5 mins ago" },
            { name: "Blessing B.", city: "Uyo", action: "joined the delegate community", time: "2 mins ago" },
            { name: "Grace A.", city: "Asaba", action: "applied for Digital Marketing Track", time: "6 mins ago" },
            { name: "Dr. Bukola A.", city: "London / Lagos", action: "reserved a seat for the masterclass", time: "3 mins ago" }
        ];

        // Create toast container if not present
        let toast = document.getElementById('socialProofToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'socialProofToast';
            toast.className = 'social-proof-toast';
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }

        let activityIndex = 0;

        function showNextToast() {
            const item = activities[activityIndex];
            activityIndex = (activityIndex + 1) % activities.length;

            toast.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#005f5a] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                        ${item.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-slate-900 truncate">
                            ${item.name} <span class="text-slate-500 font-normal">&bull; ${item.city}</span>
                        </p>
                        <p class="text-[11px] text-[#005f5a] font-medium leading-tight">
                            ${item.action}
                        </p>
                    </div>
                    <span class="text-[10px] text-slate-400 font-mono shrink-0">${item.time}</span>
                </div>
            `;

            toast.classList.add('is-active');

            // Hide after 4.5 seconds
            setTimeout(() => {
                toast.classList.remove('is-active');
            }, 4500);
        }

        // Trigger first toast after 4 seconds, then repeat every 12 seconds
        setTimeout(() => {
            showNextToast();
            setInterval(showNextToast, 12000);
        }, 4000);
    }

    // 4. ATTACH BUTTON SHIMMER & HOVER EFFECTS
    function initButtonShimmer() {
        const ctaButtons = document.querySelectorAll('a[href^="#"], button[type="submit"], .gold-glow');
        ctaButtons.forEach(btn => {
            btn.classList.add('btn-shimmer');
            if (btn.classList.contains('gold-glow')) {
                btn.classList.add('gold-glow-animated');
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollReveal();
            initCounters();
            initButtonShimmer();
            initSocialProofToast();
        });
    } else {
        initScrollReveal();
        initCounters();
        initButtonShimmer();
        initSocialProofToast();
    }
})();

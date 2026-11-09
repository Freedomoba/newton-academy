// Testimonial Slider Controller for Newton Academy (100 Verified Fellow Reviews)
function initTestimonialSlider(cardId = 'testimonialCard') {
    const card = document.getElementById(cardId);
    if (!card || typeof testimonialsData === 'undefined' || !testimonialsData.length) return;

    const tStars = document.getElementById('tStars');
    const tRating = document.getElementById('tRating');
    const tBadge = document.getElementById('tBadge');
    const tQuote = document.getElementById('tQuote');
    const tAvatar = document.getElementById('tAvatar');
    const tName = document.getElementById('tName');
    const tRole = document.getElementById('tRole');
    const tCounter = document.getElementById('tCounter');
    const tProgressBar = document.getElementById('tProgressBar');
    const btnPrev = document.getElementById('btnPrevT');
    const btnNext = document.getElementById('btnNextT');

    let currentIndex = 0;
    let progressPercent = 0;
    let timer = null;
    let progressTimer = null;
    const ROTATE_INTERVAL = 4000;

    function renderTestimonial(idx) {
        const t = testimonialsData[idx];
        if (!t) return;

        card.style.opacity = '0.5';
        setTimeout(() => {
            if (tStars) tStars.textContent = t.stars;
            if (tRating) tRating.textContent = t.rating;
            if (tBadge) tBadge.textContent = t.badge;
            if (tQuote) tQuote.textContent = '"' + t.quote + '"';
            if (tAvatar) {
                tAvatar.textContent = t.initials;
                tAvatar.className = 'w-11 h-11 rounded-full text-white flex items-center justify-center font-black text-sm shrink-0 ' + (t.avatarBg || 'bg-[#005f5a]');
            }
            if (tName) tName.textContent = t.name;
            if (tRole) tRole.innerHTML = t.role + ' &bull; ' + t.location;
            if (tCounter) tCounter.textContent = 'Review ' + (idx + 1) + ' of ' + testimonialsData.length;
            card.style.opacity = '1';
        }, 150);
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        renderTestimonial(currentIndex);
        resetProgress();
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
        renderTestimonial(currentIndex);
        resetProgress();
    }

    function resetProgress() {
        progressPercent = 0;
        if (tProgressBar) tProgressBar.style.width = '0%';
    }

    function startAutoRotation() {
        stopAutoRotation();
        timer = setInterval(nextTestimonial, ROTATE_INTERVAL);
        progressTimer = setInterval(() => {
            progressPercent += (100 / (ROTATE_INTERVAL / 100));
            if (tProgressBar) tProgressBar.style.width = Math.min(progressPercent, 100) + '%';
        }, 100);
    }

    function stopAutoRotation() {
        if (timer) clearInterval(timer);
        if (progressTimer) clearInterval(progressTimer);
    }

    if (btnNext) {
        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            nextTestimonial();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            prevTestimonial();
        });
    }

    card.addEventListener('mouseenter', stopAutoRotation);
    card.addEventListener('mouseleave', startAutoRotation);
    card.addEventListener('touchstart', stopAutoRotation, { passive: true });
    card.addEventListener('touchend', startAutoRotation, { passive: true });

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    card.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    card.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextTestimonial();
        else if (touchEndX - touchStartX > 50) prevTestimonial();
    }, { passive: true });

    renderTestimonial(0);
    startAutoRotation();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initTestimonialSlider());
} else {
    initTestimonialSlider();
}


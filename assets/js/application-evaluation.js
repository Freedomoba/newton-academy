/**
 * Newton Academy - 30-Second Scholarship Evaluation & 3D Door Unveiling Engine
 * Orchestrates candidate evaluation, confetti celebration, and cinematic 3D door portal transition.
 */
(function() {
    'use strict';

    function createEvaluationModal() {
        if (document.getElementById('evaluationModalOverlay')) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'evaluationModalOverlay';
        overlay.className = 'fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-500 door-perspective-wrapper';

        overlay.innerHTML = `
            <!-- The 3D Portal Doors (Rendered behind or during unveiling) -->
            <div id="portalDoorsContainer" class="absolute inset-0 pointer-events-none flex z-30 opacity-0 transition-opacity duration-300">
                <!-- Left Door -->
                <div id="doorLeft" class="w-1/2 h-full bg-gradient-to-r from-[#002d2a] via-[#00403c] to-[#004d49] border-r-2 border-amber-400/50 door-panel-left relative flex items-center justify-end pr-6 sm:pr-12 shadow-2xl">
                    <div class="text-right space-y-3 opacity-90 select-none">
                        <div class="w-24 sm:w-28 h-12 sm:h-14 rounded-xl border border-amber-400/50 mx-auto sm:ml-auto sm:mr-0 flex items-center justify-center bg-white p-1.5 shadow-lg">
                            <img src="assets/logo.png" alt="Newton Academy" class="w-full h-full object-contain">
                        </div>
                        <h4 class="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-200">Newton Academy</h4>
                        <div class="w-4 h-16 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full shadow-lg border border-amber-200 ml-auto my-4"></div>
                    </div>
                </div>

                <!-- Right Door -->
                <div id="doorRight" class="w-1/2 h-full bg-gradient-to-l from-[#002d2a] via-[#00403c] to-[#004d49] border-l-2 border-amber-400/50 door-panel-right relative flex items-center justify-start pl-6 sm:pl-12 shadow-2xl">
                    <div class="text-left space-y-3 opacity-90 select-none">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/40 mx-auto sm:mr-auto sm:ml-0 flex items-center justify-center bg-slate-900/60 shadow-inner">
                            <span class="text-amber-300 font-mono text-xl sm:text-2xl font-black">2026</span>
                        </div>
                        <h4 class="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-200">Admissions Portal</h4>
                        <div class="w-4 h-16 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full shadow-lg border border-amber-200 mr-auto my-4"></div>
                    </div>
                </div>

                <!-- Center Light Burst Beam -->
                <div id="portalLightBeam" class="portal-light-beam absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div class="w-48 h-full bg-gradient-to-r from-transparent via-amber-200/80 to-transparent blur-2xl"></div>
                </div>
            </div>

            <!-- Confetti Canvas Container -->
            <div id="confettiContainer" class="absolute inset-0 pointer-events-none overflow-hidden z-40"></div>

            <!-- Center Content Card -->
            <div id="evaluationCard" class="relative z-20 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl transform transition-all duration-500 scale-95">
                
                <!-- State 1: 30-Second Review In Progress -->
                <div id="evalReviewState">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-8 mx-auto mb-3 object-contain">
                    <!-- Academic Crest & Tag -->
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-[#005f5a] border border-[#005f5a]/30 mb-4">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Academic Admissions Council In Session</span>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                        Evaluating Candidate File
                    </h3>
                    
                    <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                        Please wait <strong class="text-slate-900 font-bold">30 seconds</strong> while our Admissions Committee audits your file against available endowment quotas.
                    </p>

                    <!-- Circular Progress Gauge -->
                    <div class="relative w-36 h-36 mx-auto my-4 flex items-center justify-center">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                            <!-- Background Track -->
                            <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" stroke-width="8"></circle>
                            <!-- Animated Progress Track -->
                            <circle id="timerProgressCircle" cx="60" cy="60" r="52" fill="none" stroke="#005f5a" stroke-width="8" stroke-dasharray="326.72" stroke-dashoffset="0" stroke-linecap="round" class="timer-ring-circle"></circle>
                        </svg>
                        
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span id="countdownSeconds" class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">30</span>
                            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Seconds</span>
                        </div>
                    </div>

                    <!-- Evaluation Phase Status Ticker -->
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-6 text-left">
                        <div class="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                            <span id="statusPhaseIcon" class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            <span id="statusPhaseTitle">Phase 1: Academic Profile Verification</span>
                        </div>
                        <p id="statusPhaseDesc" class="text-[11px] text-slate-500 leading-normal font-sans">
                            Auditing submitted candidate responses, contact validity, and cohort allocation...
                        </p>
                    </div>

                    <p class="text-[10px] text-slate-400 mt-4 italic">
                        Newton Academy Academic Council &bull; Official Endowment Evaluation
                    </p>
                </div>

                <!-- State 2: Congratulations & Celebration State (Hidden Initially) -->
                <div id="evalSuccessState" class="hidden text-center py-4">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-700 text-2xl font-black shadow-lg animate-bounce">
                        ✓
                    </div>

                    <span class="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 mb-3">
                        Scholarship Ratified
                    </span>

                    <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                        CONGRATULATIONS, <span id="awardeeNameDisplay" class="text-[#005f5a]">FELLOW</span>!
                    </h2>

                    <p class="text-sm text-slate-700 leading-relaxed max-w-sm mx-auto mb-4">
                        The Admissions Committee has officially awarded you a <strong class="text-emerald-700">100% Full Tuition Scholarship (₦200,000 value covered)</strong>!
                    </p>

                    <div class="p-3 bg-teal-50 border border-[#005f5a]/30 rounded-xl text-xs text-[#005f5a] font-bold mb-4">
                        Opening the Official Admissions Vault & Unveiling Your Award Letter...
                    </div>

                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-amber-400 to-[#005f5a] animate-pulse w-full"></div>
                    </div>
                </div>

            </div>
        `;

        document.body.appendChild(overlay);
    }

    function triggerConfetti() {
        const container = document.getElementById('confettiContainer');
        if (!container) return;
        container.innerHTML = '';

        const colors = ['#005f5a', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff', '#fbbf24'];
        const totalParticles = 75;

        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100; // 0 to 100vw
            const delay = Math.random() * 0.8; // stagger start
            const size = 6 + Math.random() * 10;
            const isCircle = Math.random() > 0.5;

            particle.style.backgroundColor = color;
            particle.style.left = left + 'vw';
            particle.style.top = '-20px';
            particle.style.width = size + 'px';
            particle.style.height = (size * (isCircle ? 1 : 1.6)) + 'px';
            if (isCircle) particle.style.borderRadius = '50%';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = (2.8 + Math.random() * 2) + 's';

            container.appendChild(particle);
        }
    }

    // Public controller for starting the 30-second evaluation flow
    window.startScholarshipEvaluation = function(candidateName, redirectUrl) {
        createEvaluationModal();

        const overlay = document.getElementById('evaluationModalOverlay');
        const card = document.getElementById('evaluationCard');
        const secondsEl = document.getElementById('countdownSeconds');
        const circleEl = document.getElementById('timerProgressCircle');
        const phaseTitle = document.getElementById('statusPhaseTitle');
        const phaseDesc = document.getElementById('statusPhaseDesc');
        const phaseIcon = document.getElementById('statusPhaseIcon');
        const reviewState = document.getElementById('evalReviewState');
        const successState = document.getElementById('evalSuccessState');
        const nameDisplay = document.getElementById('awardeeNameDisplay');
        const portalDoors = document.getElementById('portalDoorsContainer');

        if (nameDisplay && candidateName) {
            nameDisplay.textContent = candidateName.toUpperCase();
        }

        // Show overlay
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
        setTimeout(() => {
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
        }, 50);

        let remaining = 30;
        const totalDuration = 30;
        const circumference = 326.72; // 2 * PI * 52

        const countdownInterval = setInterval(() => {
            remaining--;

            if (secondsEl) secondsEl.textContent = remaining;

            // Update SVG Ring
            if (circleEl) {
                const fraction = remaining / totalDuration;
                const offset = circumference * (1 - fraction);
                circleEl.style.strokeDashoffset = offset;
            }

            // Update phases dynamically
            if (remaining > 20) {
                if (phaseTitle) phaseTitle.textContent = "Phase 1: Academic Profile & Identity Verification";
                if (phaseDesc) phaseDesc.textContent = "Auditing candidate profile against regional admission quotas...";
                if (phaseIcon) phaseIcon.className = "w-2 h-2 rounded-full bg-amber-500 animate-pulse";
            } else if (remaining > 10) {
                if (phaseTitle) phaseTitle.textContent = "Phase 2: ₦200,000 Endowment Quota Verification";
                if (phaseDesc) phaseDesc.textContent = "Verifying Newton Academy Foundation full-tuition endowment balance...";
                if (phaseIcon) phaseIcon.className = "w-2 h-2 rounded-full bg-teal-500 animate-pulse";
            } else if (remaining > 0) {
                if (phaseTitle) phaseTitle.textContent = "Phase 3: Academic Council Ratification";
                if (phaseDesc) phaseDesc.textContent = "Admissions Committee unanimous approval received! Printing official award...";
                if (phaseIcon) phaseIcon.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
            }

            // WHEN COUNTDOWN HITS ZERO
            if (remaining <= 0) {
                clearInterval(countdownInterval);

                // 1. Switch to Hurray / Congratulations State
                if (reviewState) reviewState.classList.add('hidden');
                if (successState) successState.classList.remove('hidden');

                // 2. Explode Celebration Confetti
                triggerConfetti();

                // 3. Unveil with 3D Door Portal after celebration moment
                setTimeout(() => {
                    // Hide card, show 3D doors
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    
                    if (portalDoors) {
                        portalDoors.classList.remove('opacity-0');
                        portalDoors.classList.add('opacity-100');
                    }

                    // Open doors dramatically after a beat
                    setTimeout(() => {
                        overlay.classList.add('doors-open');

                        // After doors swing open into radiant light beam, redirect to Award Letter
                        setTimeout(() => {
                            window.location.href = redirectUrl;
                        }, 1400);
                    }, 400);

                }, 1800);
            }
        }, 1000);
    };

})();


/**
 * Newton Academy - Scholarship Evaluation & 3D Door Portal Unveiling Engine
 * Sequence:
 * 1. Live Candidate Evaluation Pop-up Modal (Review steps & quota scan)
 * 2. 3D Portal Doors appear closed in front of the screen
 * 3. Doors swing open dramatically in 3D perspective
 * 4. Congratulations Rain (Celebratory Confetti) showers down as doors open
 * 5. Official award letter unveiled for the candidate to read
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
            <!-- The 3D Portal Doors (Grand double doors) -->
            <div id="portalDoorsContainer" class="absolute inset-0 pointer-events-none flex z-30 opacity-0 transition-opacity duration-500">
                <!-- Left Door -->
                <div id="doorLeft" class="w-1/2 h-full bg-gradient-to-r from-[#002d2a] via-[#00403c] to-[#004d49] border-r-2 border-amber-400/60 door-panel-left relative flex items-center justify-end pr-6 sm:pr-12 shadow-2xl">
                    <div class="text-right space-y-4 opacity-95 select-none">
                        <div class="w-24 sm:w-28 h-12 sm:h-14 rounded-xl border-2 border-amber-400 mx-auto sm:ml-auto sm:mr-0 flex items-center justify-center bg-white p-1.5 shadow-xl">
                            <img src="assets/logo.png" alt="Newton Academy" class="w-full h-full object-contain">
                        </div>
                        <h4 class="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300">Newton Academy</h4>
                        <div class="w-4 h-20 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 rounded-full shadow-2xl border border-amber-200 ml-auto my-4"></div>
                    </div>
                </div>

                <!-- Right Door -->
                <div id="doorRight" class="w-1/2 h-full bg-gradient-to-l from-[#002d2a] via-[#00403c] to-[#004d49] border-l-2 border-amber-400/60 door-panel-right relative flex items-center justify-start pl-6 sm:pl-12 shadow-2xl">
                    <div class="text-left space-y-4 opacity-95 select-none">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/80 mx-auto sm:mr-auto sm:ml-0 flex items-center justify-center bg-slate-900 shadow-2xl">
                            <span class="text-amber-300 font-mono text-xl sm:text-2xl font-black">2026</span>
                        </div>
                        <h4 class="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300">Admissions Portal</h4>
                        <div class="w-4 h-20 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 rounded-full shadow-2xl border border-amber-200 mr-auto my-4"></div>
                    </div>
                </div>

                <!-- Center Light Burst Beam -->
                <div id="portalLightBeam" class="portal-light-beam absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div class="w-64 h-full bg-gradient-to-r from-transparent via-amber-200/90 to-transparent blur-3xl"></div>
                </div>
            </div>

            <!-- Confetti Canvas Container -->
            <div id="confettiContainer" class="absolute inset-0 pointer-events-none overflow-hidden z-40"></div>

            <!-- Center Content Card -->
            <div id="evaluationCard" class="relative z-20 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl transform transition-all duration-500 scale-95">
                
                <!-- State 1: Live Candidate Review -->
                <div id="evalReviewState">
                    <img src="assets/logo.png" alt="Newton Academy" class="h-8 mx-auto mb-3 object-contain">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-[#005f5a] border border-[#005f5a]/30 mb-4">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Admissions Board Live Screening</span>
                    </div>

                    <h3 id="evalModalHeading" class="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight mb-2">
                        Evaluating Candidate File
                    </h3>
                    
                    <p id="evalModalStatus" class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                        Auditing applicant credentials against regional 100% tuition endowment quotas...
                    </p>

                    <!-- Circular Timer Display -->
                    <div class="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
                        <svg class="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="52" class="text-slate-100" stroke-width="8" stroke="currentColor" fill="transparent" />
                            <circle id="timerProgressCircle" cx="60" cy="60" r="52" class="text-[#005f5a] timer-ring-circle" stroke-width="8" stroke-dasharray="326.72" stroke-dashoffset="0" stroke-linecap="round" stroke="currentColor" fill="transparent" />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center font-heading">
                            <span id="countdownSeconds" class="text-3xl font-extrabold text-slate-900 font-mono">10</span>
                            <span class="text-[9px] uppercase tracking-wider text-slate-400 font-sans">Seconds</span>
                        </div>
                    </div>

                    <!-- Evaluation Phase Status -->
                    <div class="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-left space-y-1.5">
                        <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
                            <span id="statusPhaseIcon" class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            <span id="statusPhaseTitle">Phase 1: Academic Profile &amp; Identity Verification</span>
                        </div>
                        <p id="statusPhaseDesc" class="text-[11px] text-slate-500 font-sans leading-relaxed pl-4">
                            Verifying applicant contact records and regional allocation...
                        </p>
                    </div>

                    <div class="text-[10px] text-slate-400 pt-4 italic font-sans">
                        Newton Academy Admissions Committee &bull; Official Review
                    </div>
                </div>

                <!-- State 2: Approval Notice -->
                <div id="evalSuccessState" class="hidden space-y-4">
                    <div class="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-black shadow-lg">
                        &check;
                    </div>
                    <span class="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block">
                        100% Tuition Scholarship Approved
                    </span>
                    <h3 class="text-2xl font-black text-slate-950 font-heading">
                        Congratulations, <span id="awardeeNameDisplay" class="text-[#005f5a]">Candidate</span>!
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        The Admissions Board has officially approved your 100% full tuition subsidy ($250 / ₦385,000 waived).
                    </p>
                    <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold">
                        Unveiling your Official Scholarship Letter &amp; Award Dossier...
                    </div>
                </div>

            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Confetti Rain Function
    function triggerConfetti() {
        const container = document.getElementById('confettiContainer') || document.body;
        const colors = ['#005f5a', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff', '#fbbf24'];
        const count = 120;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';

            const bg = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 8 + 6;
            const delay = Math.random() * 1.5;
            const isCircle = Math.random() > 0.5;

            particle.style.backgroundColor = bg;
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

    // Perform the 3D Door Opening followed by Congratulations Rain
    function performDoorOpeningAndRain(redirectUrl, onComplete) {
        const overlay = document.getElementById('evaluationModalOverlay');
        const card = document.getElementById('evaluationCard');
        const portalDoors = document.getElementById('portalDoorsContainer');

        if (!overlay) {
            if (redirectUrl) window.location.href = redirectUrl;
            if (onComplete) onComplete();
            return;
        }

        // 1. Hide the evaluation card smoothly
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.85)';
            card.style.transition = 'all 0.4s ease-out';
        }

        // 2. Present 3D doors closed
        if (portalDoors) {
            portalDoors.classList.remove('opacity-0');
            portalDoors.classList.add('opacity-100');
        }

        // 3. After a brief dramatic beat, swing doors open
        setTimeout(() => {
            overlay.classList.add('doors-open');

            // 4. AS THE DOORS OPEN: Trigger the Congratulations Rain (Confetti shower)!
            triggerConfetti();

            // 5. After doors swing open wide into radiant light beam, reveal letter / redirect
            setTimeout(() => {
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else if (onComplete) {
                    // Dissolve doors overlay smoothly so user reads their letter
                    overlay.classList.remove('opacity-100');
                    overlay.classList.add('opacity-0');
                    setTimeout(() => {
                        overlay.remove();
                        onComplete();
                    }, 600);
                }
            }, 2200);

        }, 500);
    }

    // Public method: Start evaluation, then 3D doors open, then congratulations rain, then letter!
    window.startScholarshipEvaluation = function(candidateName, redirectUrl, onComplete) {
        createEvaluationModal();

        const overlay = document.getElementById('evaluationModalOverlay');
        const card = document.getElementById('evaluationCard');
        const secondsEl = document.getElementById('countdownSeconds');
        const circleEl = document.getElementById('timerProgressCircle');
        const phaseTitle = document.getElementById('statusPhaseTitle');
        const phaseDesc = document.getElementById('statusPhaseDesc');
        const phaseIcon = document.getElementById('statusPhaseIcon');
        const nameDisplay = document.getElementById('awardeeNameDisplay');

        if (nameDisplay && candidateName) {
            nameDisplay.textContent = candidateName.toUpperCase();
        }

        // Show overlay & pop up
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
        setTimeout(() => {
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
        }, 50);

        // Fast, high-energy 6-second evaluation countdown (responsive & exciting)
        let remaining = 6;
        const totalDuration = 6;
        const circumference = 326.72; // 2 * PI * 52

        const countdownInterval = setInterval(() => {
            remaining--;

            if (secondsEl) secondsEl.textContent = remaining;

            if (circleEl) {
                const fraction = remaining / totalDuration;
                const offset = circumference * (1 - fraction);
                circleEl.style.strokeDashoffset = offset;
            }

            if (remaining === 4) {
                if (phaseTitle) phaseTitle.textContent = "Phase 2: Quota & Regional Subsidy Allocation";
                if (phaseDesc) phaseDesc.textContent = "Newton Academy Foundation verifying 100% full-tuition balance...";
                if (phaseIcon) phaseIcon.className = "w-2 h-2 rounded-full bg-teal-500 animate-pulse";
            } else if (remaining === 2) {
                if (phaseTitle) phaseTitle.textContent = "Phase 3: Admissions Board Unanimous Approval";
                if (phaseDesc) phaseDesc.textContent = "Approval granted! Preparing 3D Admissions Portal...";
                if (phaseIcon) phaseIcon.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
            }

            if (remaining <= 0) {
                clearInterval(countdownInterval);

                // Now execute the user's required sequence:
                // 1. Doors appear closed
                // 2. Opening as though opening a door
                // 3. Congratulations rain explodes
                // 4. Letter unveiled
                performDoorOpeningAndRain(redirectUrl, onComplete);
            }
        }, 1000);
    };

    // Public method: Directly trigger the 3D Door Opening & Confetti Rain (e.g. for envelope click or arriving at letter)
    window.triggerDoorOpeningAndRain = function(redirectUrl, onComplete) {
        createEvaluationModal();
        const overlay = document.getElementById('evaluationModalOverlay');
        const card = document.getElementById('evaluationCard');
        if (card) card.classList.add('hidden'); // Skip evaluation card

        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');

        performDoorOpeningAndRain(redirectUrl, onComplete);
    };

})();

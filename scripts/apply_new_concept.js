const fs = require('fs');
const path = require('path');

// 1. UPDATE CHECKOUT.HTML & CHECKOUT.PHP WITH THE NEW ENDOWMENT GRANT & SEAT VOUCHER CONCEPT
const newCheckoutConcept = `<!-- ============================================================== -->
            <!-- THE ENDOWMENT GRANT & SEAT CONFIRMATION VOUCHER (NEW CONCEPT)  -->
            <!-- ============================================================== -->
            <div class="space-y-4 mb-10">
                
                <!-- Card 1: 100% Scholarship Endowment Certificate -->
                <div class="bg-gradient-to-br from-[#003835] via-[#004d49] to-[#002f2d] text-white rounded-2xl p-6 sm:p-7 shadow-lg border-2 border-emerald-400/40 relative overflow-hidden">
                    <div class="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border-4 border-white/5 pointer-events-none flex items-center justify-center">
                        <span class="text-white/10 font-mono text-5xl font-black">100%</span>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4 mb-5">
                        <div class="flex items-center gap-2.5">
                            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span class="text-xs uppercase tracking-widest font-mono text-emerald-300 font-bold">
                                Newton Academy Foundation Endowment
                            </span>
                        </div>
                        <span class="text-xs font-bold text-emerald-950 bg-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto shadow-sm">
                            Tuition: 100% Fully Covered
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div>
                            <span class="text-xs text-teal-200 uppercase tracking-wider font-mono block mb-1">Standard 3-Month Tuition</span>
                            <span class="line-through text-slate-300 text-lg sm:text-xl font-mono font-bold">₦200,000</span>
                            <span class="block text-xs text-emerald-300 font-semibold mt-1">Paid in full by Academic Foundation Reserve</span>
                        </div>
                        <div class="sm:text-right bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/10 sm:border-0">
                            <span class="text-xs text-teal-200 uppercase tracking-wider font-mono block mb-1">Your Remaining Tuition Balance</span>
                            <span class="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">₦0.00</span>
                            <span class="block text-[11px] text-teal-100 font-sans mt-0.5">Zero tuition payable throughout your 3 months</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2: Seat Allocation & Application Fee Filter -->
                <div class="bg-white border-2 border-amber-400/50 rounded-2xl p-6 sm:p-7 shadow-md">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="space-y-1.5 max-w-md">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                                <h4 class="text-sm sm:text-base font-bold text-slate-900">
                                    One-Time Application &amp; Seat Reservation Fee
                                </h4>
                            </div>
                            <p class="text-xs text-slate-600 font-sans leading-relaxed">
                                Due to extreme applicant volume and strictly capped cohort capacity, this single commitment fee secures your seat, provisions your LMS portal credentials, and assigns your faculty mentors.
                            </p>
                            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-500 font-medium">
                                <span>✓ Guaranteed Cohort Seat</span>
                                <span>✓ LMS &amp; AI Suite Provisioning</span>
                                <span>✓ 24h Reservation Window</span>
                            </div>
                        </div>

                        <div class="text-left sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Total Payable Now</span>
                            <span class="text-3xl sm:text-4xl font-extrabold text-[#005f5a] font-mono block">
                                ₦20,000
                            </span>
                            <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full inline-block mt-1">
                                Saves You ₦200,000
                            </span>
                        </div>
                    </div>
                </div>

            </div>`;

['checkout.html', 'checkout.php'].forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    let c = fs.readFileSync(fullPath, 'utf8');

    // Replace whatever ledger was there with the new concept
    const ledgerRegex = /<!-- Financial Award Grant Ledger -->[\s\S]*?<!-- =+ -->\s*<!-- PAYMENT INTEGRATION/m;
    if (ledgerRegex.test(c)) {
        c = c.replace(ledgerRegex, newCheckoutConcept + '\n\n            <!-- ============================================================== -->\n            <!-- PAYMENT INTEGRATION');
        fs.writeFileSync(fullPath, c, 'utf8');
        console.log(`Updated checkout with new concept: ${file}`);
    } else {
        console.log(`Ledger pattern not found in ${file}`);
    }
});

// 2. UPDATE THANK-YOU.HTML & THANK-YOU.PHP WITH THE SAME NEW CONCEPT
['thank-you.html', 'thank-you.php'].forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    let c = fs.readFileSync(fullPath, 'utf8');

    const thankYouLedgerPattern = /<!-- Ledger Table[\s\S]*?<!-- Global Pedigree Banner -->/m;
    if (thankYouLedgerPattern.test(c)) {
        c = c.replace(thankYouLedgerPattern, newCheckoutConcept + '\n\n            <!-- Global Pedigree Banner -->');
        fs.writeFileSync(fullPath, c, 'utf8');
        console.log(`Updated thank-you with new concept: ${file}`);
    } else {
        console.log(`Thank-you ledger pattern not found in ${file}`);
    }
});


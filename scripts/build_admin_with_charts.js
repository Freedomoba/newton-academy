const fs = require('fs');

console.log('--- Enhancing admin.html & admin.php with Analytics Charts (Clicks, Flows, Directions & Places) ---');

// 1. UPDATE admin.html
let html = fs.readFileSync('admin.html', 'utf8');

// Ensure Chart.js is included in <head>
if (!html.includes('chart.umd.min.js')) {
    html = html.replace('</head>', '    <script src="assets/js/chart.umd.min.js"></script>\n</head>');
}

// Analytics section HTML to insert between Stats cards and Dedupe bar
const analyticsSectionHtml = `
            <!-- PERFORMANCE & TRAFFIC ANALYTICS (CLICKS, FLOWS, DIRECTIONS & PLACES) -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                        <h2 class="text-sm sm:text-base font-bold text-slate-900 font-heading">Clicks, Funnel Flows &amp; Traffic Attribution</h2>
                    </div>
                    <div class="text-[11px] text-slate-500 font-medium hidden sm:block">
                        Attribution by Direction &amp; Geographic Place Name
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    
                    <!-- Card 1: Clicks & Funnel Flows -->
                    <div class="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                        <div class="space-y-2">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Funnel Clicks &amp; Conversion Flow</h3>
                                    <p class="text-[11px] text-slate-500">Impressions &rarr; Opt-ins &rarr; Scholarship Briefings &rarr; Applications &rarr; Enrolled</p>
                                </div>
                                <span id="funnelConversionRateBadge" class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                                    0% Conversion
                                </span>
                            </div>

                            <!-- Funnel Stage Progression Badges -->
                            <div class="grid grid-cols-5 gap-1.5 pt-2 text-center text-[10px] font-bold">
                                <div class="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                                    <span class="block text-slate-400 font-normal">1. Clicks</span>
                                    <span id="flowVisits" class="text-slate-900 font-mono">0</span>
                                </div>
                                <div class="bg-teal-50 p-1.5 rounded-lg border border-teal-200 text-[#005f5a]">
                                    <span class="block text-teal-600 font-normal">2. Opt-ins</span>
                                    <span id="flowOptins" class="font-mono">0</span>
                                </div>
                                <div class="bg-amber-50 p-1.5 rounded-lg border border-amber-200 text-amber-900">
                                    <span class="block text-amber-600 font-normal">3. Briefing</span>
                                    <span id="flowBriefing" class="font-mono">0</span>
                                </div>
                                <div class="bg-indigo-50 p-1.5 rounded-lg border border-indigo-200 text-indigo-900">
                                    <span class="block text-indigo-600 font-normal">4. Applied</span>
                                    <span id="flowApplied" class="font-mono">0</span>
                                </div>
                                <div class="bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 text-emerald-900">
                                    <span class="block text-emerald-600 font-normal">5. Enrolled</span>
                                    <span id="flowEnrolled" class="font-mono">0</span>
                                </div>
                            </div>
                        </div>

                        <!-- Chart Canvas -->
                        <div class="mt-4 relative h-56 sm:h-64">
                            <canvas id="funnelFlowChart"></canvas>
                        </div>
                    </div>

                    <!-- Card 2: Traffic Directions / Sources -->
                    <div class="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                        <div>
                            <div class="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Traffic Directions</h3>
                                    <p class="text-[11px] text-slate-500">Incoming channel attribution (WhatsApp, Meta, Direct, etc.)</p>
                                </div>
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                    Channels
                                </span>
                            </div>
                            <div class="relative h-48 sm:h-52 flex items-center justify-center">
                                <canvas id="trafficDirectionsChart"></canvas>
                            </div>
                        </div>

                        <!-- Legend Pills -->
                        <div id="directionLegendPills" class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mt-2 text-[10px]"></div>
                    </div>

                    <!-- Card 3: Leads by Places & Cities -->
                    <div class="lg:col-span-12 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div>
                                <h3 class="text-xs sm:text-sm font-bold text-slate-900 font-heading">Leads by Places &amp; Cities</h3>
                                <p class="text-[11px] text-slate-500">Real geographic distribution of recorded leads with verified place names</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Place:</span>
                                <span id="topPlaceBadge" class="px-2.5 py-1 rounded-full text-xs font-black bg-teal-50 text-[#005f5a] border border-teal-200">
                                    -
                                </span>
                            </div>
                        </div>

                        <div class="relative h-60 sm:h-72">
                            <canvas id="leadsByPlacesChart"></canvas>
                        </div>
                    </div>

                </div>
            </div>`;

// Insert analyticsSectionHtml right before the Deduplication Action Bar if not already inserted
if (!html.includes('id="funnelFlowChart"')) {
    const dedupeMarker = '<!-- DEDUPLICATION ACTION BAR (SEPARATED FROM DOWNLOAD) -->';
    if (html.includes(dedupeMarker)) {
        html = html.replace(dedupeMarker, analyticsSectionHtml + '\n\n            ' + dedupeMarker);
    }
}

fs.writeFileSync('admin.html', html, 'utf8');
console.log('Injected analytics layout into admin.html');


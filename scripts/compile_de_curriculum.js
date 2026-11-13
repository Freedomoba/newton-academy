const fs = require('fs');

console.log('--- Compiling Digital Entrepreneurship + Applied AI Curriculum Sections ---');

const deModules = [
    {
        num: "01",
        week: "Week 1",
        title: "Foundations of Digital Entrepreneurship & Commercial Ideation",
        desc: "The architecture of scalable internet businesses. How modern digital founders generate 80%+ profit margins by selling knowledge assets, software tools, automated services, and digital products to a worldwide customer base.",
        deliverables: [
            "Digital Business Model Canvas: Product, Traffic, Conversion, Fulfillment",
            "High-margin commercial ideation matrix using market opportunity scorecards",
            "Establishing commercial unit economics: CAC, LTV, and Recurring Revenue (MRR)"
        ]
    },
    {
        num: "02",
        week: "Week 2",
        title: "Market Validation, Customer Discovery & Niche Dominance",
        desc: "Never build a product before validating demand. Proven market validation frameworks, competitor monetization auditing, discovering unmet customer pain points, and identifying buying triggers in high-income markets.",
        deliverables: [
            "Rapid pre-sale smoke test landing page setup",
            "Competitor revenue reverse-engineering report",
            "Customer avatar definition and psychographic buying trigger blueprint"
        ]
    },
    {
        num: "03",
        week: "Week 3",
        title: "High-Margin Digital Product Architecture (Info, SaaS, Services)",
        desc: "Designing world-class digital assets. Step-by-step production of video courses, digital toolkits, swipe files, AI-powered micro-SaaS, and productized consulting services with near-zero marginal cost of distribution.",
        deliverables: [
            "Complete curriculum roadmap for a high-ticket educational product",
            "Digital asset packaging: Notion templates, video frameworks, and resource vaults",
            "Product delivery infrastructure: automated access credentials and student onboarding"
        ]
    },
    {
        num: "04",
        week: "Week 4",
        title: "Irresistible Offer Engineering & Value Stacking Psychology",
        desc: "The science of selling at premium prices. Grand Slam offer architecture, risk reversal guarantees, urgency mechanisms, bonuses that eliminate sales friction, and pricing psychology that makes buying a no-brainer.",
        deliverables: [
            "Complete $100M-style Irresistible Offer Blueprint",
            "Triple-tier pricing architecture (Standard, Executive, Founder)",
            "Unconditional risk-reversal guarantee scripts"
        ]
    },
    {
        num: "05",
        week: "Week 5",
        title: "Automated Funnel Infrastructure & No-Code Web Systems",
        desc: "Building self-running commercial engines. Landing page builders, automated checkout pages, one-click upsells (OCO), order bumps, and membership portals without writing a single line of computer code.",
        deliverables: [
            "High-converting Direct-Response Sales Page with live payment gateway",
            "One-click upsell and order bump sequence that increases Average Order Value by 40%",
            "Automated LMS or delivery portal integration connected via webhooks"
        ]
    },
    {
        num: "06",
        week: "Week 6",
        title: "Applied Generative AI for Solo Enterprise Operations",
        desc: "Multiplying your human output by 10x using artificial intelligence. Using Claude, ChatGPT, Midjourney, ElevenLabs voice cloning, and HeyGen to script, design, produce, and market digital products in hours instead of months.",
        deliverables: [
            "Automated content generation engine for social, email, and ad copy",
            "AI-synthesized commercial video sales letter (VSL) with cloned voiceover",
            "AI-powered customer service assistant for 24/7 lead handling"
        ]
    },
    {
        num: "07",
        week: "Week 7",
        title: "Organic Traffic Engines & Authority Audience Building",
        desc: "Building a cult-like audience that buys repeatedly. High-authority personal branding on LinkedIn, Twitter/X, and YouTube. Crafting viral short-form hooks, long-form thought leadership, and lead magnet opt-in funnels.",
        deliverables: [
            "Lead Magnet Funnel: High-value PDF or video training that captures 50+ emails daily",
            "30-Day LinkedIn & Twitter authority publishing calendar",
            "Organic direct message (DM) sales scripts that close deals without hard selling"
        ]
    },
    {
        num: "08",
        week: "Week 8",
        title: "Paid Customer Acquisition for Scaled Product Sales",
        desc: "Putting $1 into paid advertising and pulling out $3 to $5 in return. Scientific Meta ad creative testing, Google search ads for buyer intent, and YouTube ad funnels that pour predictable traffic into your automated offers.",
        deliverables: [
            "Meta Ads campaign structure: Cold audience testing to retargeting funnels",
            "3 Proven ad creative formats: Founder UGC, Diagram Walkthrough, and Bold VSL",
            "ROAS tracking spreadsheet and weekly budget scaling protocol"
        ]
    },
    {
        num: "09",
        week: "Week 9",
        title: "Email Automation & High-LTV Customer Nurturing",
        desc: "The asset you own forever: an engaged email list. Setting up automated soap-opera email sequences, daily storytelling emails, weekly newsletters, and cart abandonment triggers that print revenue on autopilot.",
        deliverables: [
            "7-Part automated indoctrination and conversion email sequence",
            "Weekly broadcast template that drives weekend sales spikes",
            "Re-engagement campaign to revive cold email subscribers"
        ]
    },
    {
        num: "10",
        week: "Week 10",
        title: "WhatsApp Conversational Commerce & Broadcast Engines",
        desc: "The highest conversion rates in developing markets. Community building, announcement channels, high-converting WhatsApp launch events, 1-on-1 closing scripts, and automated WhatsApp API integrations.",
        deliverables: [
            "WhatsApp 5-Day Challenge launch framework that generates immediate cash flow",
            "Direct-response broadcast scripts optimized for 80%+ open rates",
            "Automated payment reminder workflows that recover unpaid checkout links"
        ]
    },
    {
        num: "11",
        week: "Week 11",
        title: "Global Payment Systems, Multi-Currency Banking & Taxation",
        desc: "Collecting foreign currencies and securing your wealth. Setting up US LLCs, UK LTDs, Stripe, Paystack, Geegpay, and foreign merchant accounts from Africa. Legally navigating multi-currency banking and repatriation.",
        deliverables: [
            "Step-by-step roadmap for US LLC / UK company incorporation from Nigeria",
            "Multi-currency bank account setup (USD, GBP, EUR) with live debit cards",
            "Automated payout routing into local commercial banks at official rates"
        ]
    },
    {
        num: "12",
        week: "Week 11",
        title: "Outsourcing, AI Team Replacement & Standard Operating Procedures",
        desc: "Working on your business instead of in your business. Documenting Standard Operating Procedures (SOPs), hiring vetted virtual assistants, and building autonomous AI agent workflows that run operations while you sleep.",
        deliverables: [
            "Complete operational SOP library for your digital business",
            "Hiring scorecard and contract agreement for remote virtual staff",
            "Zapier/Make automation blueprint connecting leads, sales, and fulfillment"
        ]
    },
    {
        num: "13",
        week: "Week 12",
        title: "Enterprise Growth, Recurring Revenue & Community Monetization",
        desc: "Transitioning from one-time transactions to predictable monthly recurring revenue (MRR). Launching paid mastermind communities, recurring SaaS models, subscription newsletters, and high-ticket mastermind advisory.",
        deliverables: [
            "Skool / Circle paid membership community architecture",
            "Retention protocols that keep members subscribed for 12+ months",
            "High-ticket back-end ascension ladder ($1,000 to $5,000 offerings)"
        ]
    },
    {
        num: "14",
        week: "Week 12",
        title: "Pitch Deck Architecture, Capital Raising & Strategic Partnerships",
        desc: "Attracting capital, strategic alliances, and joint-venture partners. Structuring win-win affiliate partnerships, investor pitch decks, valuation methodologies, and positioning your enterprise for institutional recognition.",
        deliverables: [
            "10-Slide Investor / Partnership Presentation Deck",
            "Joint-Venture agreement template with revenue-share provisions",
            "Executive summary document for institutional grant and accelerator applications"
        ]
    },
    {
        num: "15",
        week: "Week 12",
        title: "Capstone Venture Launch & Commercial Defense",
        desc: "The grand culmination of your 3-month journey. You will launch a live, fully operational digital business with validated offers, automated checkout, active marketing pipelines, and defend it before the Newton Faculty Council.",
        deliverables: [
            "Live, functioning digital enterprise URL with processed real transactions",
            "Comprehensive 12-Month Financial Projections & Scaling Masterplan",
            "Live faculty oral defense, feedback audit, and Diploma Ratification"
        ]
    }
];

// ==========================================
// COURSE OVERVIEW & LEARNING OUTCOMES HTML FOR DE
// ==========================================
const deOverviewAndOutcomesHtml = `
    <!-- COURSE OVERVIEW & LEARNING OUTCOMES -->
    <section class="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div class="text-center mb-10">
                <a href="#applyForm" class="inline-block bg-[#005f5a] hover:bg-[#004d49] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all font-heading">
                    Download Course Brochure &amp; Curriculum PDF ↓
                </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <!-- Left: Course Overview & Learning Outcomes -->
                <div class="lg:col-span-7 space-y-8">
                    
                    <div class="space-y-4">
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                            Course Overview
                        </h2>
                        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                            The <strong>Digital Entrepreneurship &amp; Business Innovation</strong> diploma program teaches ambitious founders, executives, and creators how to build, launch, and automate highly profitable internet enterprises from anywhere in Africa.
                        </p>
                        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                            You will discover how to identify high-margin commercial opportunities, create automated digital products and knowledge assets, deploy hands-free payment and sales engines, and use artificial intelligence to run lean operations without costly overhead.
                        </p>
                        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                            Designed for aspiring internet moguls and business professionals, this program shifts your mindset from trading time for wages to building scalable digital assets that generate global recurring income in foreign currencies.
                        </p>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-200">
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
                            Learning Outcomes
                        </h3>
                        <ol class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed list-decimal list-outside pl-5">
                            <li>
                                <strong>High-Margin Offer Engineering:</strong> Identify lucrative digital niches, validate market demand, and engineer irresistible high-ticket digital offers and software tools.
                            </li>
                            <li>
                                <strong>Automated Sales Infrastructure:</strong> Build automated digital sales engines, membership portals, and Stripe/Paystack checkout systems with zero coding required.
                            </li>
                            <li>
                                <strong>AI Operational Scaling:</strong> Deploy AI automation workflows to replace repetitive tasks, produce commercial video assets, and manage customer fulfillment 24/7.
                            </li>
                            <li>
                                <strong>Global Payment &amp; Corporate Banking:</strong> Establish international business structures, multi-currency corporate banking (USD, GBP, EUR), and foreign earnings repatriation.
                            </li>
                            <li>
                                <strong>Paid &amp; Organic Acquisition Engines:</strong> Launch high-converting paid ad funnels, authority social channels, and conversational WhatsApp sales broadcast machines.
                            </li>
                            <li>
                                <strong>Live Venture Capstone Defense:</strong> Build and defend a fully operational, live automated digital business in the Capstone Founder Defense before faculty council.
                            </li>
                        </ol>
                    </div>

                </div>

                <!-- Right: Program Card (NO "Next Cohort Starts by" as instructed!) -->
                <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <img src="assets/images/virtual_fellows_laptops.jpg" alt="Newton Academy Fellows in Entrepreneurship Training" class="w-full h-52 sm:h-64 object-cover">
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Program Duration:</span>
                            <span class="font-extrabold text-slate-900 font-mono text-sm">3 Months (12 Weeks)</span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Learning Format:</span>
                            <span class="font-bold text-[#005f5a]">100% Online + LMS Portal Replays</span>
                        </div>
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Weekly Commitment:</span>
                            <span class="font-bold text-slate-800">4 – 6 Hours / Week</span>
                        </div>
                        <div class="flex items-center justify-between pb-1 text-xs">
                            <span class="font-bold text-slate-500 uppercase tracking-wider">Accreditation:</span>
                            <span class="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-heading">Founder Edition Diploma</span>
                        </div>
                    </div>

                    <div class="pt-2 flex flex-col sm:flex-row gap-3">
                        <a href="#applyForm" class="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-center text-sm shadow-md transition-all font-heading">
                            Enrol Now
                        </a>
                        <a href="#applyForm" class="flex-1 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#005f5a] font-bold text-center text-sm border-2 border-[#005f5a] transition-all font-heading">
                            Apply For Scholarship
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </section>
`;

// ==========================================
// CAREER OPPORTUNITIES & GLOBAL SALARY TREND FOR DE
// ==========================================
const deCareerOpportunitiesHtml = `
    <!-- CAREER OPPORTUNITIES & GLOBAL FOUNDER EARNING TREND -->
    <section class="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Opportunities & Pathways -->
                <div class="lg:col-span-7 space-y-8">
                    
                    <div>
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003835] font-heading tracking-tight mb-4">
                            Career Opportunities
                        </h2>
                        <ol class="space-y-2 text-xs sm:text-sm md:text-base text-slate-800 font-sans font-medium list-decimal list-outside pl-5 leading-relaxed">
                            <li><strong>United States</strong> – $95,000 – $180,000+ USD / yr</li>
                            <li><strong>United Kingdom</strong> – £60,000 – £120,000+ GBP / yr</li>
                            <li><strong>Canada</strong> – $80,000 – $145,000+ CAD / yr</li>
                            <li><strong>Germany &amp; EU</strong> – €65,000 – €110,000+ EUR / yr</li>
                            <li><strong>Nigeria</strong> – ₦12,000,000 – ₦35,000,000+ NGN / yr</li>
                            <li><strong>Kenya &amp; East Africa</strong> – KSh 5,000,000 – KSh 12,000,000 KES / yr</li>
                            <li><strong>Global Automated Online Ventures</strong> – $85,000 – $250,000+ USD / yr</li>
                        </ol>
                    </div>

                    <div class="pt-4 border-t border-slate-200">
                        <h3 class="text-xl sm:text-2xl font-bold text-[#003835] font-heading tracking-tight mb-3">
                            Career Pathways
                        </h3>
                        <ol class="space-y-1.5 text-xs sm:text-sm md:text-base text-slate-700 font-sans font-medium list-decimal list-outside pl-5 leading-relaxed">
                            <li>Automated Digital Product Creator &amp; Publisher</li>
                            <li>AI Automation &amp; Micro-SaaS Agency Founder</li>
                            <li>E-Commerce &amp; Knowledge Monetization Architect</li>
                            <li>Digital Operations &amp; Commercial Growth Consultant</li>
                            <li>Scaled Multi-Venture Internet Entrepreneur</li>
                        </ol>
                    </div>

                </div>

                <!-- Right: Salary / Founder Revenue Trend Table -->
                <div class="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                    <div class="bg-[#002826] text-white p-4 font-bold text-sm sm:text-base font-heading flex items-center justify-between">
                        <span>Founder Earnings Trend (Digital Ventures)</span>
                        <span class="text-[10px] text-amber-400 font-mono">USD ($)</span>
                    </div>
                    <table class="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                            <tr class="bg-[#003835] text-white font-semibold text-[11px] uppercase tracking-wider">
                                <th class="p-3 border-r border-teal-800">Year</th>
                                <th class="p-3 text-right">Average Global Revenue (USD)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2018</td>
                                <td class="p-3 text-right font-mono">$78,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2019</td>
                                <td class="p-3 text-right font-mono">$88,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2020</td>
                                <td class="p-3 text-right font-mono">$102,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2021</td>
                                <td class="p-3 text-right font-mono">$118,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2022</td>
                                <td class="p-3 text-right font-mono">$134,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2023</td>
                                <td class="p-3 text-right font-mono">$152,000</td>
                            </tr>
                            <tr class="bg-amber-50/60 font-bold text-slate-900">
                                <td class="p-3 text-amber-800 border-r border-slate-200 font-mono">2024</td>
                                <td class="p-3 text-right font-mono text-amber-700 font-black">$172,000</td>
                            </tr>
                            <tr class="bg-gradient-to-r from-amber-100 to-amber-200/80 font-black text-slate-950">
                                <td class="p-3 text-slate-950 border-r border-amber-300 font-mono">2026 (Projected)</td>
                                <td class="p-3 text-right font-mono text-slate-950 font-black text-sm">$210,000+</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="p-3 bg-slate-50 text-[10px] text-slate-500 text-center border-t border-slate-100">
                        Based on verified global digital product creators, SaaS founders, and automated internet business models.
                    </div>
                </div>

            </div>

        </div>
    </section>
`;

console.log('DE sections prepared.');

const fs = require('fs');

console.log('--- Compiling Digital Marketing + Applied AI Curriculum Pages ---');

const dmModules = [
    {
        num: "01",
        week: "Week 1",
        title: "Introduction to Modern Digital Marketing & Strategic Advantage",
        desc: "The commercial revolution in customer attention. Traditional vs modern direct-response marketing. How top agencies and multinational brands structure customer journeys, analyze competitors, and drive predictable commercial sales.",
        deliverables: [
            "Customer Journey Mapping: Cold, Warm, and Hot audience transitions",
            "Competitive intelligence frameworks using Similarweb and Meta Ad Library",
            "Establishing commercial unit economics: CAC, LTV, and ROAS calculations"
        ]
    },
    {
        num: "02",
        week: "Week 2",
        title: "Building a High-Converting Digital Marketing Strategy",
        desc: "In-depth market research and competitive intelligence. Developing psychographic customer personas and multi-stage buyer journey maps. Setting SMART commercial metrics and crafting a 90-day actionable marketing masterplan.",
        deliverables: [
            "90-Day Go-To-Market (GTM) growth roadmap",
            "Psychographic avatar profiles and empathy mapping",
            "Commercial KPI dashboard setup and milestone forecasting"
        ]
    },
    {
        num: "03",
        week: "Week 3",
        title: "Website Optimization, Conversion Rate Optimization (CRO) & UX",
        desc: "Turning casual visitors into buyers. Mobile-first user experience design, rapid page load optimization, layout psychology, heatmap tracking, and conversion-centered design that doubles sales conversion.",
        deliverables: [
            "Landing page audit checklist (UX, speed, visual hierarchy, mobile thumb-zone)",
            "Setting up Hotjar and Clarity heatmaps to track user click behaviour",
            "A/B split-testing frameworks for headlines, CTAs, and checkout forms"
        ]
    },
    {
        num: "04",
        week: "Week 4",
        title: "Content Marketing, Copywriting & Brand Storytelling",
        desc: "The psychology of persuasion in text. Writing irresistible headlines, high-converting video sales letters (VSLs), email copy, and organic content that commands immediate authority and builds organic demand.",
        deliverables: [
            "The PAS and AIDA direct-response copywriting master formula",
            "High-converting Video Sales Letter (VSL) script architecture",
            "Authority content calendar generation using ChatGPT and Claude"
        ]
    },
    {
        num: "05",
        week: "Week 4",
        title: "Search Engine Optimization (SEO) & Organic Discovery",
        desc: "Dominating Google search results without paying for ads. Technical SEO, keyword research, on-page optimization, backlink strategies, and optimizing for Google's Helpful Content System and AI Overviews.",
        deliverables: [
            "Target keyword strategy mapped to high commercial buyer intent",
            "On-page meta tags, semantic schema markup, and image SEO optimization",
            "Building high-authority contextual backlinks and digital PR mentions"
        ]
    },
    {
        num: "06",
        week: "Week 5",
        title: "Paid Search & Google Performance Max Advertising",
        desc: "Capturing high-intent buyers on Google Search, YouTube, Display, and Performance Max campaigns. Bidding strategies, quality scores, negative keywords, and budget optimization for maximum ROAS.",
        deliverables: [
            "End-to-end Google Ads account setup and conversion tag implementation",
            "High-converting Google Search copy with dynamic keyword insertion",
            "Performance Max asset group creation blending video, imagery, and text"
        ]
    },
    {
        num: "07",
        week: "Week 6",
        title: "Social Media Strategy & Organic Community Growth",
        desc: "Platform-native content strategies for LinkedIn, Instagram, X (Twitter), and TikTok. Building engaged organic audiences, viral content distribution, and social proof engines that support paid acquisition.",
        deliverables: [
            "Platform algorithm playbook: what triggers reach across TikTok and LinkedIn",
            "Short-form viral video storytelling blueprint (hooks, retention, payoff)",
            "Automated social scheduling and community engagement workflows"
        ]
    },
    {
        num: "08",
        week: "Week 7",
        title: "Meta Ads (Facebook & Instagram) Architecture & Scale",
        desc: "The undisputed king of direct-response customer acquisition. Creative testing methodologies, Advantage+ campaigns, lookalike audiences, custom audiences, Pixel CAPI setup, and scaling budgets profitably.",
        deliverables: [
            "Meta Business Suite & Conversions API (CAPI) pixel installation",
            "The 3:2:2 Dynamic Creative Testing (DCT) scientific ad method",
            "Horizontal and vertical scaling protocols without fatigue"
        ]
    },
    {
        num: "09",
        week: "Week 7",
        title: "Email Marketing Automation & Retention Funnels",
        desc: "Your highest ROI digital channel. Welcome sequences, abandoned cart recovery, automated nurture flows, and promotional broadcast strategies using Klaviyo, Brevo, Mailchimp, and ActiveCampaign.",
        deliverables: [
            "5-Part automated customer indoctrination welcome sequence",
            "High-converting 3-step abandoned checkout recovery sequence",
            "List hygiene, SPF/DKIM/DMARC deliverability protocols"
        ]
    },
    {
        num: "10",
        week: "Week 8",
        title: "Influencer Marketing, High-ROI Partnerships & Affiliate Systems",
        desc: "Leveraging other people's audiences for explosive growth. Finding, vetting, negotiating, and tracking influencer campaigns. Setting up affiliate referral engines that pay on commission only.",
        deliverables: [
            "Influencer evaluation scorecard: detecting fake followers and engagement",
            "Outreach swipe scripts and performance-based contract templates",
            "Affiliate tracking software setup with automated commission payouts"
        ]
    },
    {
        num: "11",
        week: "Week 9",
        title: "Analytics, Data-Driven Decision Making & Attribution",
        desc: "Google Analytics 4 (GA4), UTM tracking frameworks, attribution modeling, and executive KPI dashboards. Learning to speak the language of numbers and making confident, profitable marketing decisions.",
        deliverables: [
            "GA4 custom event setup and conversion funnel tracking",
            "Standardized UTM tagging convention across every ad channel",
            "Real-time Looker Studio executive commercial dashboard"
        ]
    },
    {
        num: "12",
        week: "Week 10",
        title: "Social Media Listening & Online Reputation Management (ORM)",
        desc: "Protecting and elevating brand authority. Brand monitoring tools, sentiment analysis, customer review acquisition systems, and crisis communication management that safeguards enterprise value.",
        deliverables: [
            "Automated brand mention alerts across search and social",
            "5-Star customer review generation funnel (Google Business, Trustpilot)",
            "Negative review de-escalation and public relations turnaround framework"
        ]
    },
    {
        num: "13",
        week: "Week 11",
        title: "Mobile & WhatsApp Marketing Automation",
        desc: "Reaching customers on Africa's dominant communication platform. WhatsApp Business API, chatbot flows, broadcast messaging, SMS remarketing, and conversational commerce funnels.",
        deliverables: [
            "WhatsApp Business automated catalog, quick replies, and labels",
            "No-code chatbot flow setup for automated lead qualification",
            "Conversational WhatsApp remarketing campaigns that close deals fast"
        ]
    },
    {
        num: "14",
        week: "Week 12",
        title: "International Remote Work & Foreign Client Retainers",
        desc: "Landing lucrative US, UK, and European clients paying in USD and GBP from Nigeria. Upwork optimization, LinkedIn outreach, cold email prospecting, foreign bank accounts, and retainer management.",
        deliverables: [
            "Upwork 100% Job Success profile positioning and proposal templates",
            "LinkedIn executive direct-outreach system for foreign agency founders",
            "Setting up multi-currency USD/GBP bank accounts (Geegpay, Grey, Payoneer)"
        ]
    },
    {
        num: "15",
        week: "Week 12",
        title: "Capstone Agency Campaign & Live Commercial Audit",
        desc: "The defining practical defense. You will design, build, and present a complete multi-channel growth strategy for a real enterprise or prospective foreign client before Newton Academy's faculty council.",
        deliverables: [
            "Complete end-to-end commercial growth audit deck",
            "Full campaign creative assets, ad copy, and funnel layout",
            "Live faculty oral defense, feedback review, and Diploma Ratification"
        ]
    }
];

function buildModulesAccordionHtml(modules) {
    return `
    <!-- 15 CONNECTED MODULES IN LIST FORMAT WITH PLUS SIGN ACCORDION -->
    <div class="relative border-l-2 border-[#005f5a]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-5">
        ${modules.map((m, idx) => `
            <!-- Module ${m.num} -->
            <div class="relative group">
                <!-- Connected Node Circle -->
                <div class="absolute -left-[35px] sm:-left-[51px] top-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#005f5a] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white group-hover:bg-amber-500 transition-colors">
                    ${m.num}
                </div>

                <!-- Accordion Card -->
                <div class="bg-white border border-slate-200/90 hover:border-[#005f5a] rounded-2xl shadow-sm transition-all overflow-hidden">
                    <button type="button" onclick="toggleAccordion(this)" class="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                        <div class="space-y-1 pr-2">
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-black uppercase tracking-wider text-[#005f5a] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                                    Module ${m.num}
                                </span>
                                <span class="text-xs font-mono font-bold text-slate-400">${m.week}</span>
                            </div>
                            <h3 class="text-sm sm:text-base md:text-lg font-bold text-slate-900 font-heading leading-snug">
                                ${m.title}
                            </h3>
                        </div>
                        <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-50 text-[#005f5a] flex items-center justify-center font-bold text-lg shrink-0 accordion-icon group-hover:bg-[#005f5a] group-hover:text-white transition-colors">
                            +
                        </span>
                    </button>

                    <!-- Collapsible Content -->
                    <div class="hidden px-5 pb-5 pt-2 border-t border-slate-100 space-y-3 font-sans text-xs sm:text-sm text-slate-600 bg-slate-50/40">
                        <p class="leading-relaxed">
                            ${m.desc}
                        </p>
                        <div class="pt-1">
                            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-900 block mb-1.5">
                                Practical Portfolio Deliverables:
                            </span>
                            <ul class="space-y-1.5">
                                ${m.deliverables.map(d => `
                                    <li class="flex items-start gap-2">
                                        <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span>${d}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
    `;
}

// ==========================================
// COURSE OVERVIEW & LEARNING OUTCOMES HTML
// (Based on user screenshot eae853c4 - NO "next cohort starts by")
// ==========================================
const dmOverviewAndOutcomesHtml = `
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
                            The <strong>Digital Marketing + Applied AI</strong> diploma program equips delegates with the practical skills to deploy high-ROAS paid advertising, master direct-response copywriting, construct automated sales funnels, and acquire high-paying foreign clients in USD and GBP.
                        </p>
                        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                            You will learn how to architect conversion campaigns on Meta (Facebook &amp; Instagram), Google Search &amp; YouTube, and TikTok, while integrating generative AI tools to automate copywriting, video creative production, and audience targeting.
                        </p>
                        <p class="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                            This beginner-to-advanced curriculum blends data-driven media buying with psychological sales funnels, preparing you to operate as an elite growth marketer, in-demand agency freelancer, or foreign remote specialist.
                        </p>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-200">
                        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
                            Learning Outcomes
                        </h3>
                        <ol class="space-y-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed list-decimal list-outside pl-5">
                            <li>
                                <strong>Multi-Platform Ad Architecture:</strong> Master advanced paid acquisition across Meta Ads Manager, Google Performance Max, and TikTok Ads delivering verified Return on Ad Spend (ROAS).
                            </li>
                            <li>
                                <strong>Persuasive Direct-Response Copywriting:</strong> Write high-converting sales letters, video sales scripts (VSLs), and email marketing sequences using applied generative AI.
                            </li>
                            <li>
                                <strong>Conversion Funnels &amp; CRO:</strong> Construct and optimize high-converting landing pages, lead capture mechanisms, and automated WhatsApp/email customer journeys.
                            </li>
                            <li>
                                <strong>Data Analytics &amp; Attribution:</strong> Implement Google Analytics 4 (GA4), Meta Pixel Conversions API (CAPI), and user heatmap tracking to optimize marketing ROI.
                            </li>
                            <li>
                                <strong>International Remote Client Acquisition:</strong> Pitch, close, and retain international clients in the US, UK, and Canada paying $1,500 – $5,000 monthly retainers.
                            </li>
                            <li>
                                <strong>Commercial Growth Defense:</strong> Execute a live capstone agency campaign defending an end-to-end commercial growth audit before faculty evaluators.
                            </li>
                        </ol>
                    </div>

                </div>

                <!-- Right: Program Card (NO "Next Cohort Starts by" as instructed!) -->
                <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
                    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <img src="assets/images/virtual_fellows_laptops.jpg" alt="Newton Academy Fellows in Practical Training" class="w-full h-52 sm:h-64 object-cover">
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
                            <span class="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Verifiable Diploma</span>
                        </div>
                    </div>

                    <div class="pt-2 flex flex-col sm:flex-row gap-3">
                        <a href="#applyForm" class="flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-center text-sm shadow-md transition-all font-heading">
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
// CAREER OPPORTUNITIES & GLOBAL SALARY TREND
// (Directly from user screenshot 0e3fc429)
// ==========================================
const dmCareerOpportunitiesHtml = `
    <!-- CAREER OPPORTUNITIES & GLOBAL SALARY TREND -->
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
                            <li><strong>United States</strong> – $85,000 – $130,000 USD / yr</li>
                            <li><strong>United Kingdom</strong> – £50,000 – £90,000 GBP / yr</li>
                            <li><strong>Canada</strong> – $70,000 – $110,000 CAD / yr</li>
                            <li><strong>Germany &amp; EU</strong> – €55,000 – €95,000 EUR / yr</li>
                            <li><strong>Nigeria</strong> – ₦6,000,000 – ₦14,000,000 NGN / yr</li>
                            <li><strong>Kenya &amp; East Africa</strong> – KSh 3,200,000 – KSh 5,500,000 KES / yr</li>
                            <li><strong>Remote / Global Agency Roles</strong> – $75,000 – $120,000 USD / yr</li>
                        </ol>
                    </div>

                    <div class="pt-4 border-t border-slate-200">
                        <h3 class="text-xl sm:text-2xl font-bold text-[#003835] font-heading tracking-tight mb-3">
                            Career Pathways
                        </h3>
                        <ol class="space-y-1.5 text-xs sm:text-sm md:text-base text-slate-700 font-sans font-medium list-decimal list-outside pl-5 leading-relaxed">
                            <li>AI Performance Marketer &amp; Growth Specialist</li>
                            <li>Meta, Google &amp; TikTok Paid Media Buyer</li>
                            <li>Direct-Response Copywriter &amp; Funnel Architect</li>
                            <li>Conversion Rate Optimization (CRO) Strategist</li>
                            <li>Head of Growth &amp; International Agency Retainer Consultant</li>
                        </ol>
                    </div>

                </div>

                <!-- Right: Salary Trend Table (Exactly like screenshot 0e3fc429) -->
                <div class="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                    <div class="bg-[#003835] text-white p-4 font-bold text-sm sm:text-base font-heading">
                        Salary Trend (Digital Marketing + AI)
                    </div>
                    <table class="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                            <tr class="bg-[#004d49] text-white font-semibold text-[11px] uppercase tracking-wider">
                                <th class="p-3 border-r border-teal-800">Year</th>
                                <th class="p-3 text-right">Average Global Salary (USD)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2018</td>
                                <td class="p-3 text-right font-mono">$72,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2019</td>
                                <td class="p-3 text-right font-mono">$78,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2020</td>
                                <td class="p-3 text-right font-mono">$86,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2021</td>
                                <td class="p-3 text-right font-mono">$94,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2022</td>
                                <td class="p-3 text-right font-mono">$105,000</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 text-teal-800 font-bold border-r border-slate-100 font-mono">2023</td>
                                <td class="p-3 text-right font-mono">$114,000</td>
                            </tr>
                            <tr class="bg-teal-50/60 font-bold text-slate-900">
                                <td class="p-3 text-[#005f5a] border-r border-slate-200 font-mono">2024</td>
                                <td class="p-3 text-right font-mono text-[#005f5a]">$127,000</td>
                            </tr>
                            <tr class="bg-amber-50/70 font-black text-amber-950">
                                <td class="p-3 text-amber-800 border-r border-amber-200 font-mono">2026 (Projected)</td>
                                <td class="p-3 text-right font-mono text-amber-700">$138,000+</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="p-3 bg-slate-50 text-[10px] text-slate-500 text-center border-t border-slate-100">
                        Based on verified global remote compensation data across Upwork, LinkedIn, and US/UK growth agencies.
                    </div>
                </div>

            </div>

        </div>
    </section>
`;

console.log('DM sections prepared.');


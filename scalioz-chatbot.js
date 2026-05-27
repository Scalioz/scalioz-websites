// ================================================================
// SCALIOZ WEBSITES — AI Sales Chatbot (Gemini Free Tier)
// websites.scalioz.com | Scalioz Systems, Chennai
// Get FREE API key: https://aistudio.google.com/app/apikey
// ================================================================

(function () {
  'use strict';

  // ── CONFIG — paste your free Gemini key here ─────────────────
  // Get it FREE at: https://aistudio.google.com/app/apikey
  const GEMINI_API_KEY = 'AIzaSyD33kOvhCXpUKfiDjnxy2fKShcqw84qKuE';
  const WA_NUMBER = '919043616100';
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const SYSTEM_PROMPT = `You are Scalioz AI — the intelligent sales consultant for Scalioz Systems, a Chennai-based digital company. You serve TWO product lines:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT LINE 1 — SCALIOZ TOOLS (tools.scalioz.com)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready-to-use calculators, dashboards, and automation tools. 35 tools across 4 industries:

🏥 HEALTHCARE (9 Tools): Clinic Revenue Leakage Detector, Patient Appointment ROI Calculator, Doctor Productivity Scorecard, OPD/IPD Cost Analyser, Medical Staff Efficiency Tracker, Insurance Claim Success Predictor, Patient Retention Dashboard, Health Camp ROI Calculator, Pharmacy Margin Optimiser

🏠 REAL ESTATE (8 Tools): Property ROI Calculator, Lead Conversion Tracker, EMI vs Rent Comparator, Project Profitability Estimator, Broker Commission Manager, Site Visit to Closure Tracker, Rental Yield Dashboard, Property Expense Manager

🏗️ CONSTRUCTION & PEB (8 Tools): BOQ Generator, Project Budget Estimator, Material Cost Tracker, Labour Productivity Dashboard, PEB Structure Cost Calculator, Construction Timeline Planner, Subcontractor Payment Tracker, Safety Compliance Checklist

🎓 EDUCATION (10 Tools): Student Admission Tracker, Exam Result Publisher, Fee Collection Dashboard, Faculty Performance Scorecard, Attendance Analyser, Course ROI Calculator, Student Enquiry CRM, Batch Profitability Tracker, Scholarship Eligibility Checker, Parent Communication Log

TOOLS PRICING (+ 18% GST): Monthly ₹499/mo | Annual ₹3,999/yr (save 33%) | Lifetime ₹9,999 one-time
All plans include: License key, WhatsApp support, bug fixes, free updates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT LINE 2 — SCALIOZ WEBSITES (websites.scalioz.com)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Premium, ready-to-deploy websites for Indian businesses. Delivered in 3–5 days.

🕌 TRAVEL & PILGRIMAGE / HAJ & UMRAH: Multilingual (EN/AR/HI/TA + RTL), AI chatbot with Islamic KB, package showcase, WhatsApp lead qualification. Live example: Al Mumin Haj & Umrah Services
🏥 HEALTHCARE / CLINIC: Appointment booking, doctor profiles, patient portal, WhatsApp booking, local SEO
🏠 REAL ESTATE: Property listings, ROI calculator, broker lead management, virtual tour
🎓 EDUCATION: Course catalog, enrollment, student portal, Razorpay fee payment, multilingual
💼 CUSTOM BUSINESS: Any niche — restaurants, retail, NGO, corporate

ALL WEBSITES INCLUDE: Mobile-first design, AI chatbot, WhatsApp + Razorpay integration, SSL, fast CDN, SEO-ready, Google Analytics, delivered in 3–5 days

WEBSITES PRICING (+ 18% GST): Monthly ₹499/mo | Annual ₹3,999/yr | Lifetime ₹9,999

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIGITAL MARKETING SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEO (Google ranking), Google Ads/PPC, Social Media Management (FB/IG/LinkedIn), Content Marketing, WhatsApp Marketing, Google Business Profile optimisation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHY SCALIOZ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Based in Chennai. 100% Made for India: GST billing, Razorpay, INR pricing, DPDP compliant. AI chatbots included free. Multilingual support. WhatsApp support on all plans. Custom builds available.
Contact: WhatsApp +91 90436 16100 | info@scalioz.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR ROLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Understand what the visitor needs (website? tool? marketing?)
2. Recommend the right Scalioz product
3. Qualify the lead: business name, type, requirements, timeline, budget
4. Guide them to WhatsApp for free consultation

STYLE: Concise (2–4 sentences max). Warm and professional. 1–2 emojis max. Respond in user's language (Tamil/Hindi if they use it). After 4 user messages, offer WhatsApp consultation.`;

  // ── CSS ──────────────────────────────────────────────────────
  const CSS = `
  #scz-widget{font-family:'Segoe UI',system-ui,-apple-system,sans-serif}
  #scz-widget *{box-sizing:border-box;margin:0;padding:0}
  #scz-fab{position:fixed;bottom:24px;right:24px;z-index:99999;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#1A3CFF 0%,#00C8FF 100%);border:none;cursor:pointer;box-shadow:0 4px 24px rgba(26,60,255,0.45);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;outline:none}
  #scz-fab:hover{transform:scale(1.1);box-shadow:0 6px 32px rgba(26,60,255,0.6)}
  #scz-fab-icon,#scz-fab-close{transition:all .2s;position:absolute}
  #scz-fab.open #scz-fab-icon{opacity:0;transform:scale(.5) rotate(90deg)}
  #scz-fab.open #scz-fab-close{opacity:1;transform:scale(1) rotate(0)}
  #scz-fab-close{opacity:0;transform:scale(.5) rotate(-90deg)}
  #scz-badge{position:absolute;top:-4px;right:-4px;background:#FF3B5C;color:#fff;width:20px;height:20px;border-radius:50%;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff;animation:scz-pulse 2s infinite}
  @keyframes scz-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,59,92,.5)}50%{box-shadow:0 0 0 6px rgba(255,59,92,0)}}
  #scz-window{position:fixed;bottom:96px;right:24px;z-index:99998;width:368px;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 12px 56px rgba(10,24,96,.2);display:flex;flex-direction:column;transform:scale(.88) translateY(16px);opacity:0;transition:all .3s cubic-bezier(.34,1.56,.64,1);pointer-events:none;max-height:580px}
  #scz-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
  #scz-head{background:linear-gradient(135deg,#0A1860 0%,#1A3CFF 100%);padding:14px 16px;display:flex;align-items:center;gap:11px;position:relative;overflow:hidden;flex-shrink:0}
  #scz-head::after{content:'';position:absolute;width:120px;height:120px;border-radius:50%;background:rgba(0,200,255,.08);top:-40px;right:-20px}
  #scz-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,rgba(255,255,255,.15),rgba(0,200,255,.2));border:2px solid rgba(0,200,255,.4);display:flex;align-items:center;justify-content:center;font-size:20px;position:relative;z-index:1}
  #scz-head-text{flex:1;position:relative;z-index:1}
  #scz-head-name{color:#fff;font-weight:700;font-size:14px}
  #scz-head-sub{color:#00C8FF;font-size:11px;margin-top:2px;display:flex;align-items:center;gap:4px}
  #scz-dot{width:6px;height:6px;border-radius:50%;background:#00C8FF;animation:scz-blink 2s infinite}
  @keyframes scz-blink{0%,100%{opacity:1}50%{opacity:.3}}
  #scz-msgs{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:8px;background:#f6f7fb;min-height:240px;max-height:380px;scroll-behavior:smooth}
  #scz-msgs::-webkit-scrollbar{width:4px}
  #scz-msgs::-webkit-scrollbar-thumb{background:#d0d4e8;border-radius:4px}
  .scz-row{display:flex;flex-direction:column}
  .scz-row.bot{align-items:flex-start}
  .scz-row.usr{align-items:flex-end}
  .scz-bbl{max-width:86%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.55;animation:scz-fadeup .2s ease}
  @keyframes scz-fadeup{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .scz-row.bot .scz-bbl{background:#fff;color:#1a1f3a;border-bottom-left-radius:4px;box-shadow:0 1px 6px rgba(10,24,96,.08)}
  .scz-row.usr .scz-bbl{background:linear-gradient(135deg,#1A3CFF,#0A40E0);color:#fff;border-bottom-right-radius:4px}
  .scz-qrs{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}
  .scz-qr{background:#fff;border:1.5px solid #1A3CFF;color:#1A3CFF;border-radius:20px;padding:5px 13px;font-size:12.5px;font-weight:500;cursor:pointer;transition:all .15s;white-space:nowrap}
  .scz-qr:hover{background:#1A3CFF;color:#fff;transform:translateY(-1px)}
  .scz-typing-bbl{background:#fff;padding:12px 16px;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 1px 6px rgba(10,24,96,.08);display:flex;gap:5px;align-items:center}
  .scz-dot2{width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#1A3CFF,#00C8FF);animation:scz-jump 1.3s infinite}
  .scz-dot2:nth-child(2){animation-delay:.18s}.scz-dot2:nth-child(3){animation-delay:.36s}
  @keyframes scz-jump{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
  #scz-foot{padding:10px 12px;background:#fff;border-top:1px solid #eceef5;display:flex;gap:8px;align-items:flex-end;flex-shrink:0}
  #scz-inp{flex:1;border:1.5px solid #dde0ef;border-radius:12px;padding:9px 12px;font-size:13.5px;resize:none;outline:none;max-height:90px;line-height:1.45;color:#1a1f3a;transition:border-color .2s;font-family:inherit;background:#fafbff}
  #scz-inp:focus{border-color:#1A3CFF;background:#fff}
  #scz-inp::placeholder{color:#9ba3c0}
  #scz-send-btn{width:38px;height:38px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#1A3CFF,#00C8FF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .2s,transform .2s;outline:none}
  #scz-send-btn:hover{opacity:.88;transform:scale(1.05)}
  #scz-send-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}
  .scz-wa-cta{display:flex;align-items:center;justify-content:center;gap:7px;background:#25D366;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer;width:100%;margin-top:2px;transition:background .2s,transform .1s;font-family:inherit}
  .scz-wa-cta:hover{background:#1db954;transform:translateY(-1px)}
  .scz-divider{text-align:center;font-size:11px;color:#a0a8c0;margin:4px 0;display:flex;align-items:center;gap:8px}
  .scz-divider::before,.scz-divider::after{content:'';flex:1;height:1px;background:#e8eaf2}
  @media(max-width:420px){#scz-window{width:calc(100vw - 16px);right:8px;bottom:88px}#scz-fab{bottom:16px;right:16px}}`;

  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  const root = document.createElement('div');
  root.id = 'scz-widget';
  root.innerHTML = `
    <button id="scz-fab" title="Chat with Scalioz">
      <span id="scz-badge">1</span>
      <span id="scz-fab-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
      <span id="scz-fab-close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
    </button>
    <div id="scz-window">
      <div id="scz-head">
        <div id="scz-avatar">🌐</div>
        <div id="scz-head-text">
          <div id="scz-head-name">Scalioz Assistant</div>
          <div id="scz-head-sub"><span id="scz-dot"></span>Websites · Tools · Digital Marketing</div>
        </div>
      </div>
      <div id="scz-msgs"></div>
      <div id="scz-foot">
        <textarea id="scz-inp" rows="1" placeholder="Ask about websites, tools, pricing…"></textarea>
        <button id="scz-send-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button>
      </div>
    </div>`;
  document.body.appendChild(root);

  // ── Conversation history (Gemini format) ─────────────────────
  const history = [];
  let open = false, busy = false, userMsgCount = 0, waShown = false;
  const fab     = document.getElementById('scz-fab');
  const win     = document.getElementById('scz-window');
  const msgs    = document.getElementById('scz-msgs');
  const inp     = document.getElementById('scz-inp');
  const sendBtn = document.getElementById('scz-send-btn');
  const badge   = document.getElementById('scz-badge');

  function scrollBottom() { msgs.scrollTop = msgs.scrollHeight; }

  function botMsg(text, quickReplies = []) {
    const row = document.createElement('div');
    row.className = 'scz-row bot';
    const bbl = document.createElement('div');
    bbl.className = 'scz-bbl';
    bbl.innerHTML = text.replace(/\n/g,'<br>');
    row.appendChild(bbl);
    if (quickReplies.length) {
      const wrap = document.createElement('div');
      wrap.className = 'scz-qrs';
      quickReplies.forEach(label => {
        const btn = document.createElement('button');
        btn.className = 'scz-qr'; btn.textContent = label;
        btn.addEventListener('click', () => { wrap.remove(); send(label); });
        wrap.appendChild(btn);
      });
      row.appendChild(wrap);
    }
    msgs.appendChild(row);
    history.push({ role: 'model', parts: [{ text }] });
    scrollBottom();
  }

  function userMsg(text) {
    const row = document.createElement('div');
    row.className = 'scz-row usr';
    row.innerHTML = `<div class="scz-bbl">${text.replace(/</g,'&lt;')}</div>`;
    msgs.appendChild(row);
    history.push({ role: 'user', parts: [{ text }] });
    scrollBottom();
    userMsgCount++;
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'scz-row bot'; row.id = 'scz-typing';
    row.innerHTML = `<div class="scz-typing-bbl"><div class="scz-dot2"></div><div class="scz-dot2"></div><div class="scz-dot2"></div></div>`;
    msgs.appendChild(row); scrollBottom();
  }

  function stopTyping() { const t = document.getElementById('scz-typing'); if(t) t.remove(); }

  function showWaCta() {
    if (waShown) return; waShown = true;
    const d = document.createElement('div');
    d.className = 'scz-divider'; d.textContent = 'Free Consultation';
    msgs.appendChild(d);
    const row = document.createElement('div');
    row.className = 'scz-row bot';
    const userTexts = history.filter(m => m.role==='user').map(m => m.parts[0].text).slice(-4).join(' | ').substring(0,250);
    const btn = document.createElement('button');
    btn.className = 'scz-wa-cta';
    btn.innerHTML = `<svg width="19" height="19" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.518 3.66 1.42 5.18L2 22l4.91-1.4A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg> Chat on WhatsApp — Free Consultation`;
    btn.addEventListener('click', () => {
      const msg = encodeURIComponent(`Hi Scalioz! I visited websites.scalioz.com.\n\nMy interests: ${userTexts}`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    });
    row.appendChild(btn); msgs.appendChild(row); scrollBottom();
  }

  function toggle() {
    open = !open;
    win.classList.toggle('open', open);
    fab.classList.toggle('open', open);
    if (open) { badge.style.display = 'none'; inp.focus(); if(!history.length) welcome(); }
  }

  function welcome() {
    botMsg("👋 Hi! I'm Scalioz AI — your digital consultant.\n\nWe help Indian businesses grow with premium websites, smart tools, and digital marketing. What can I help you with?",
      ['🌐 Get a Website', '🛠️ Business Tools', '📈 Digital Marketing', '💰 Pricing']);
  }

  async function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true; sendBtn.disabled = true;
    inp.value = ''; inp.style.height = 'auto';
    userMsg(text); showTyping();

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'AIzaSyD33kOvhCXpUKfiDjnxy2fKShcqw84qKuE') {
      stopTyping(); busy = false; sendBtn.disabled = false;
      botMsg("Add your free Gemini API key in scalioz-chatbot.js to enable AI. Get it free at aistudio.google.com 😊");
      setTimeout(showWaCta, 600);
      return;
    }

    // Build Gemini request — system instruction + conversation history
    const apiHistory = history.slice(0, -1).slice(-16); // exclude last user msg (already added)
    const requestBody = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: history.slice(-16),
      generationConfig: { maxOutputTokens: 400, temperature: 0.7 }
    };

    try {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      const data = await res.json();
      stopTyping();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        || "Please WhatsApp us at +91 90436 16100 for instant help!";
      // Strip markdown bold/italic from Gemini responses
      const clean = reply.replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').trim();
      botMsg(clean);
      history[history.length - 1] = { role: 'model', parts: [{ text: clean }] };
      const triggerWa = userMsgCount >= 4 || clean.toLowerCase().includes('whatsapp') || clean.toLowerCase().includes('contact');
      if (triggerWa) setTimeout(showWaCta, 600);
    } catch (e) {
      stopTyping();
      botMsg("Please WhatsApp us directly at +91 90436 16100 for instant help! 😊");
      setTimeout(showWaCta, 600);
    }
    busy = false; sendBtn.disabled = false; inp.focus();
  }

  fab.addEventListener('click', toggle);
  sendBtn.addEventListener('click', () => send(inp.value));
  inp.addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(inp.value);} });
  inp.addEventListener('input', () => { inp.style.height='auto'; inp.style.height=Math.min(inp.scrollHeight,88)+'px'; });
  setTimeout(() => { if(!open){badge.textContent='1';badge.style.display='flex';} }, 8000);
})();




// ================================================================
// SCALIOZ WEBSITES — AI Sales Chatbot
// websites.scalioz.com | Scalioz Systems, Chennai
// Drop this file in the root of scalioz-websites repo
// Add to index.html before </body>: <script src="scalioz-chatbot.js"></script>
// ================================================================

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────────
  const WA_NUMBER = '919043616100';
  const API_ENDPOINT = 'https://api.anthropic.com/v1/messages';
  const MODEL = 'claude-sonnet-4-20250514';

  const SYSTEM_PROMPT = `You are Scalioz AI — the intelligent website consultant for Scalioz Systems, a Chennai-based web development company. You help Indian businesses get premium, ready-to-deploy websites.

YOUR MISSION:
Help visitors understand which website they need, showcase Scalioz's capabilities, and qualify them as leads before handing off to WhatsApp.

SCALIOZ PORTFOLIO & CAPABILITIES:

1. HAJ & UMRAH / TRAVEL & PILGRIMAGE WEBSITES
   ✓ Multilingual: English, Arabic, Hindi, Tamil with full RTL support
   ✓ AI chatbot with Islamic knowledge base (Quran & Hadith citations)
   ✓ Package showcase (Economy / Deluxe / Premium tiers)
   ✓ Lead qualification → WhatsApp conversion
   ✓ Gallery, testimonials, inquiry forms
   Live Example: Al Mumin Haj & Umrah Services (scalioz.github.io/almumin)

2. HEALTHCARE / CLINIC WEBSITES
   ✓ Appointment booking system
   ✓ Doctor profiles & specializations
   ✓ Patient testimonials & trust signals
   ✓ WhatsApp consultation booking
   ✓ Local SEO optimized for medical searches
   ✓ Emergency contact / helpline prominence

3. REAL ESTATE WEBSITES
   ✓ Property listings with search & filters
   ✓ EMI / ROI calculator
   ✓ Broker & agent lead management
   ✓ Virtual tour support
   ✓ WhatsApp enquiry integration
   ✓ Project gallery & floor plans

4. EDUCATION WEBSITES
   ✓ Course catalog with enrollment
   ✓ Student portal / results section
   ✓ Faculty profiles
   ✓ Fee payment (Razorpay integrated)
   ✓ Multilingual support
   ✓ Events & announcements

5. GENERAL BUSINESS / CUSTOM WEBSITES
   ✓ Any niche: restaurants, retail, NGO, corporate
   ✓ Fully customized to brand
   ✓ Product/service showcase
   ✓ Contact & inquiry management

STANDARD FEATURES (every Scalioz website includes):
• Mobile-first responsive design
• AI-powered chatbot (like me!)
• WhatsApp integration
• Razorpay payment gateway
• SSL/HTTPS secure
• Fast loading on GitHub Pages CDN
• Lead capture & CRM-ready forms
• Google Analytics ready
• SEO-optimized structure
• Delivered in 3–5 business days

PRICING (all + 18% GST):
• Monthly Plan: ₹499/month — ideal for testing
• Annual Plan: ₹3,999/year — saves 33% vs monthly
• Lifetime Plan: ₹9,999 one-time — own it forever
• Enterprise / Custom: Contact for quote

DIGITAL MARKETING SERVICES:
• SEO (Search Engine Optimization) — rank on Google
• Google Ads / PPC — instant traffic & leads
• Social Media Management — Facebook, Instagram, LinkedIn
• Content Marketing — blogs, product descriptions
• WhatsApp Marketing — bulk campaigns
• Google Business Profile optimization

WHY SCALIOZ:
• Based in Chennai — understand Indian businesses
• All websites are multilingual-ready
• AI chatbots included at no extra cost
• Free consultation & requirement analysis
• Ongoing support post-launch
• 100% customizable

LEAD QUALIFICATION — collect these naturally through conversation:
1. Their name
2. Business name and type/niche
3. What features matter most to them
4. Their timeline (how urgent)
5. Budget comfort level
6. Their city/location

CONVERSATION STYLE:
• Professional yet warm and approachable
• Concise replies — 2–4 sentences max per message
• Use emojis sparingly for friendliness (1–2 per message max)
• If they write in Tamil or Hindi, respond in that language + English
• Never badmouth competitors
• Highlight ROI and value, not just features
• When they ask about pricing always mention all 3 tiers

WHATSAPP HANDOFF:
When the user is interested or asks to proceed, encourage them to WhatsApp at +91 90436 16100. Offer to generate a pre-filled message summarizing their requirements.
At message 5+ from the user, proactively suggest connecting via WhatsApp for a free consultation.`;

  // ── STYLES ──────────────────────────────────────────────────
  const CSS = `
  #scz-widget { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
  #scz-widget * { box-sizing: border-box; margin: 0; padding: 0; }

  /* Floating button */
  #scz-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 99999;
    width: 58px; height: 58px; border-radius: 50%;
    background: linear-gradient(135deg, #1A3CFF 0%, #00C8FF 100%);
    border: none; cursor: pointer;
    box-shadow: 0 4px 24px rgba(26,60,255,0.45);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    outline: none;
  }
  #scz-fab:hover { transform: scale(1.1); box-shadow: 0 6px 32px rgba(26,60,255,0.6); }
  #scz-fab-icon, #scz-fab-close { transition: all 0.2s ease; }
  #scz-fab.open #scz-fab-icon { opacity: 0; transform: scale(0.5) rotate(90deg); position: absolute; }
  #scz-fab.open #scz-fab-close { opacity: 1; transform: scale(1) rotate(0deg); }
  #scz-fab-close { opacity: 0; transform: scale(0.5) rotate(-90deg); }

  /* Notification badge */
  #scz-badge {
    position: absolute; top: -4px; right: -4px;
    background: #FF3B5C; color: #fff;
    width: 20px; height: 20px; border-radius: 50%;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid #fff;
    animation: scz-pulse 2s infinite;
  }
  @keyframes scz-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,59,92,0.5); }
    50% { box-shadow: 0 0 0 6px rgba(255,59,92,0); }
  }

  /* Chat window */
  #scz-window {
    position: fixed; bottom: 96px; right: 24px; z-index: 99998;
    width: 368px; border-radius: 20px; overflow: hidden;
    background: #fff;
    box-shadow: 0 12px 56px rgba(10,24,96,0.2), 0 2px 8px rgba(10,24,96,0.08);
    display: flex; flex-direction: column;
    transform: scale(0.88) translateY(16px); opacity: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    pointer-events: none; max-height: 580px;
  }
  #scz-window.open {
    transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
  }

  /* Header */
  #scz-head {
    background: linear-gradient(135deg, #0A1860 0%, #1A3CFF 100%);
    padding: 14px 16px;
    display: flex; align-items: center; gap: 11px;
    position: relative; overflow: hidden; flex-shrink: 0;
  }
  #scz-head::after {
    content: ''; position: absolute;
    width: 120px; height: 120px; border-radius: 50%;
    background: rgba(0,200,255,0.08);
    top: -40px; right: -20px;
  }
  #scz-avatar {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(0,200,255,0.2));
    border: 2px solid rgba(0,200,255,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; position: relative; z-index: 1;
  }
  #scz-head-text { flex: 1; position: relative; z-index: 1; }
  #scz-head-name { color: #fff; font-weight: 700; font-size: 14px; letter-spacing: 0.01em; }
  #scz-head-sub {
    color: #00C8FF; font-size: 11px; margin-top: 2px;
    display: flex; align-items: center; gap: 4px;
  }
  #scz-online-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #00C8FF;
    animation: scz-blink 2s infinite;
  }
  @keyframes scz-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* Messages */
  #scz-msgs {
    flex: 1; overflow-y: auto; padding: 16px 14px;
    display: flex; flex-direction: column; gap: 8px;
    background: #f6f7fb; min-height: 240px; max-height: 380px;
    scroll-behavior: smooth;
  }
  #scz-msgs::-webkit-scrollbar { width: 4px; }
  #scz-msgs::-webkit-scrollbar-track { background: transparent; }
  #scz-msgs::-webkit-scrollbar-thumb { background: #d0d4e8; border-radius: 4px; }

  .scz-row { display: flex; flex-direction: column; }
  .scz-row.bot { align-items: flex-start; }
  .scz-row.usr { align-items: flex-end; }

  .scz-bbl {
    max-width: 86%; padding: 10px 13px;
    border-radius: 16px; font-size: 13.5px; line-height: 1.55;
    animation: scz-fadeup 0.2s ease;
  }
  @keyframes scz-fadeup { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

  .scz-row.bot .scz-bbl {
    background: #fff; color: #1a1f3a;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 6px rgba(10,24,96,0.08);
  }
  .scz-row.usr .scz-bbl {
    background: linear-gradient(135deg, #1A3CFF, #0A40E0);
    color: #fff; border-bottom-right-radius: 4px;
  }

  /* Quick replies */
  .scz-qrs { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 7px; }
  .scz-qr {
    background: #fff; border: 1.5px solid #1A3CFF; color: #1A3CFF;
    border-radius: 20px; padding: 5px 13px;
    font-size: 12.5px; font-weight: 500; cursor: pointer;
    transition: all 0.15s ease; white-space: nowrap;
  }
  .scz-qr:hover { background: #1A3CFF; color: #fff; transform: translateY(-1px); }

  /* Typing */
  .scz-typing-bbl {
    background: #fff; padding: 12px 16px; border-radius: 16px;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 6px rgba(10,24,96,0.08);
    display: flex; gap: 5px; align-items: center;
  }
  .scz-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: linear-gradient(135deg, #1A3CFF, #00C8FF);
    animation: scz-jump 1.3s infinite;
  }
  .scz-dot:nth-child(2) { animation-delay: 0.18s; }
  .scz-dot:nth-child(3) { animation-delay: 0.36s; }
  @keyframes scz-jump {
    0%,80%,100% { transform: translateY(0); }
    40% { transform: translateY(-7px); }
  }

  /* Input area */
  #scz-foot {
    padding: 10px 12px; background: #fff;
    border-top: 1px solid #eceef5;
    display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
  }
  #scz-inp {
    flex: 1; border: 1.5px solid #dde0ef; border-radius: 12px;
    padding: 9px 12px; font-size: 13.5px; resize: none; outline: none;
    max-height: 90px; line-height: 1.45; color: #1a1f3a;
    transition: border-color 0.2s; font-family: inherit;
    background: #fafbff;
  }
  #scz-inp:focus { border-color: #1A3CFF; background: #fff; }
  #scz-inp::placeholder { color: #9ba3c0; }

  #scz-send-btn {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, #1A3CFF, #00C8FF);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.2s, transform 0.2s; outline: none;
  }
  #scz-send-btn:hover { opacity: 0.88; transform: scale(1.05); }
  #scz-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* WhatsApp CTA */
  .scz-wa-cta {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    background: #25D366; color: #fff; border: none; border-radius: 12px;
    padding: 10px 14px; font-size: 13px; font-weight: 600;
    cursor: pointer; width: 100%; margin-top: 2px;
    transition: background 0.2s, transform 0.1s;
    font-family: inherit; letter-spacing: 0.01em;
  }
  .scz-wa-cta:hover { background: #1db954; transform: translateY(-1px); }

  /* Divider */
  .scz-divider {
    text-align: center; font-size: 11px; color: #a0a8c0;
    margin: 4px 0; display: flex; align-items: center; gap: 8px;
  }
  .scz-divider::before, .scz-divider::after {
    content: ''; flex: 1; height: 1px; background: #e8eaf2;
  }

  @media (max-width: 420px) {
    #scz-window { width: calc(100vw - 16px); right: 8px; bottom: 88px; }
    #scz-fab { bottom: 16px; right: 16px; }
  }
  `;

  // ── INJECT CSS ───────────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ── INJECT HTML ──────────────────────────────────────────────
  const root = document.createElement('div');
  root.id = 'scz-widget';
  root.innerHTML = `
    <button id="scz-fab" title="Chat with Scalioz">
      <span id="scz-badge">1</span>
      <span id="scz-fab-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </span>
      <span id="scz-fab-close">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </span>
    </button>

    <div id="scz-window">
      <div id="scz-head">
        <div id="scz-avatar">🌐</div>
        <div id="scz-head-text">
          <div id="scz-head-name">Scalioz Assistant</div>
          <div id="scz-head-sub">
            <span id="scz-online-dot"></span>
            Websites · Digital Marketing · AI
          </div>
        </div>
      </div>
      <div id="scz-msgs"></div>
      <div id="scz-foot">
        <textarea id="scz-inp" rows="1" placeholder="Ask about websites, pricing, features…"></textarea>
        <button id="scz-send-btn" title="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // ── STATE ────────────────────────────────────────────────────
  const history = [];
  let open = false;
  let busy = false;
  let userMsgCount = 0;
  let waShown = false;

  // ── ELEMENTS ─────────────────────────────────────────────────
  const fab     = document.getElementById('scz-fab');
  const win     = document.getElementById('scz-window');
  const msgs    = document.getElementById('scz-msgs');
  const inp     = document.getElementById('scz-inp');
  const sendBtn = document.getElementById('scz-send-btn');
  const badge   = document.getElementById('scz-badge');

  // ── HELPERS ──────────────────────────────────────────────────
  function scrollBottom() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideBadge() {
    badge.style.display = 'none';
  }

  function botMsg(text, quickReplies = []) {
    const row = document.createElement('div');
    row.className = 'scz-row bot';

    const bbl = document.createElement('div');
    bbl.className = 'scz-bbl';
    bbl.innerHTML = text.replace(/\n/g, '<br>');
    row.appendChild(bbl);

    if (quickReplies.length) {
      const qrWrap = document.createElement('div');
      qrWrap.className = 'scz-qrs';
      quickReplies.forEach(label => {
        const btn = document.createElement('button');
        btn.className = 'scz-qr';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          qrWrap.remove();
          send(label);
        });
        qrWrap.appendChild(btn);
      });
      row.appendChild(qrWrap);
    }

    msgs.appendChild(row);
    history.push({ role: 'assistant', content: text });
    scrollBottom();
  }

  function userMsg(text) {
    const row = document.createElement('div');
    row.className = 'scz-row usr';
    row.innerHTML = `<div class="scz-bbl">${escHtml(text)}</div>`;
    msgs.appendChild(row);
    history.push({ role: 'user', content: text });
    scrollBottom();
    userMsgCount++;
  }

  function typing() {
    const row = document.createElement('div');
    row.className = 'scz-row bot';
    row.id = 'scz-typing';
    row.innerHTML = `<div class="scz-typing-bbl"><div class="scz-dot"></div><div class="scz-dot"></div><div class="scz-dot"></div></div>`;
    msgs.appendChild(row);
    scrollBottom();
  }

  function stopTyping() {
    const t = document.getElementById('scz-typing');
    if (t) t.remove();
  }

  function divider(text) {
    const d = document.createElement('div');
    d.className = 'scz-divider';
    d.textContent = text;
    msgs.appendChild(d);
  }

  function showWaCta(leadSummary) {
    if (waShown) return;
    waShown = true;
    divider('Connect with us');
    const row = document.createElement('div');
    row.className = 'scz-row bot';
    const btn = document.createElement('button');
    btn.className = 'scz-wa-cta';
    btn.innerHTML = `
      <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.518 3.66 1.42 5.18L2 22l4.91-1.4A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
      Chat on WhatsApp — Free Consultation
    `;
    btn.addEventListener('click', () => {
      const preMsg = encodeURIComponent(`Hi Scalioz! I visited your website portfolio and I'm interested in getting a website.\n\n${leadSummary}`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${preMsg}`, '_blank');
    });
    row.appendChild(btn);
    msgs.appendChild(row);
    scrollBottom();
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function buildLeadSummary() {
    const userTexts = history.filter(m => m.role === 'user').map(m => m.content);
    return userTexts.slice(-5).join(' | ').substring(0, 300);
  }

  // ── TOGGLE ───────────────────────────────────────────────────
  function toggle() {
    open = !open;
    win.classList.toggle('open', open);
    fab.classList.toggle('open', open);
    if (open) {
      hideBadge();
      inp.focus();
      if (history.length === 0) welcome();
    }
  }

  function welcome() {
    botMsg(
      "👋 Welcome to Scalioz Systems!\n\nI'm your AI website consultant. We build premium, AI-powered websites for Indian businesses — delivered in 3–5 days.\n\nWhat type of business are you looking to build a website for?",
      ['🕌 Hajj / Umrah Travel', '🏥 Healthcare / Clinic', '🏠 Real Estate', '🎓 Education', '💼 Other Business']
    );
  }

  // ── SEND ─────────────────────────────────────────────────────
  async function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;

    busy = true;
    sendBtn.disabled = true;
    inp.value = '';
    inp.style.height = 'auto';

    userMsg(text);
    typing();

    // Build context for API
    const apiMessages = history.slice(-16).filter(m => m.role === 'user' || m.role === 'assistant');

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 450,
          system: SYSTEM_PROMPT,
          messages: apiMessages
        })
      });

      const data = await res.json();
      stopTyping();

      const reply = data?.content?.[0]?.text
        || "I'd love to help! Please WhatsApp us directly at +91 90436 16100 for instant assistance.";

      botMsg(reply);

      // Show WhatsApp CTA after 4+ user messages or if reply mentions it
      const triggerWa = userMsgCount >= 4 ||
        reply.toLowerCase().includes('whatsapp') ||
        reply.toLowerCase().includes('+91') ||
        reply.toLowerCase().includes('consultation') ||
        reply.toLowerCase().includes('contact');

      if (triggerWa) {
        setTimeout(() => showWaCta(buildLeadSummary()), 600);
      }

    } catch (err) {
      stopTyping();
      botMsg("Apologies, I'm having a brief connection issue. You can WhatsApp us directly at +91 90436 16100 for immediate help! 😊");
      setTimeout(() => showWaCta('Interested in a website'), 600);
    }

    busy = false;
    sendBtn.disabled = false;
    inp.focus();
  }

  // ── EVENTS ───────────────────────────────────────────────────
  fab.addEventListener('click', toggle);

  sendBtn.addEventListener('click', () => send(inp.value));

  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(inp.value);
    }
  });

  inp.addEventListener('input', () => {
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 88) + 'px';
  });

  // Auto-open after 8 seconds with a gentle nudge
  setTimeout(() => {
    if (!open) {
      badge.textContent = '1';
      badge.style.display = 'flex';
    }
  }, 8000);

})();

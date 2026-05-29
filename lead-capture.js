// ================================================================
// SCALIOZ WEBSITES — Lead Capture Gate for Live Preview
// websites.scalioz.com | Scalioz Systems, Chennai
// Add to index.html before </body>: <script src="lead-capture.js"></script>
// ================================================================

(function () {
  'use strict';

  // ── CONFIG — edit these ──────────────────────────────────────
  const WA_NUMBER = '919043616100';

  // Optional: Google Sheets webhook (paste your Apps Script URL here)
  // Leave empty string '' to skip Google Sheets and use WhatsApp only
  const SHEETS_WEBHOOK = '';

  // ── CSS ──────────────────────────────────────────────────────
  const CSS = `
  #scz-gate-overlay {
    position: fixed; inset: 0; z-index: 99997;
    background: rgba(10, 24, 96, 0.72);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    opacity: 0; transition: opacity 0.25s ease;
    pointer-events: none;
  }
  #scz-gate-overlay.active { opacity: 1; pointer-events: all; }

  #scz-gate-box {
    background: #fff; border-radius: 20px;
    width: 100%; max-width: 420px;
    box-shadow: 0 24px 80px rgba(10,24,96,0.3);
    overflow: hidden;
    transform: translateY(24px) scale(0.96);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  #scz-gate-overlay.active #scz-gate-box {
    transform: translateY(0) scale(1);
  }

  #scz-gate-head {
    background: linear-gradient(135deg, #0A1860 0%, #1A3CFF 100%);
    padding: 24px 24px 20px;
    position: relative; overflow: hidden;
  }
  #scz-gate-head::before {
    content: ''; position: absolute;
    width: 160px; height: 160px; border-radius: 50%;
    background: rgba(0,200,255,0.1);
    top: -60px; right: -30px;
  }
  #scz-gate-icon {
    font-size: 32px; margin-bottom: 10px; display: block;
    position: relative; z-index: 1;
  }
  #scz-gate-title {
    color: #fff; font-size: 20px; font-weight: 800;
    font-family: 'Segoe UI', system-ui, sans-serif;
    letter-spacing: -0.01em; margin-bottom: 6px;
    position: relative; z-index: 1;
  }
  #scz-gate-sub {
    color: rgba(0,200,255,0.9); font-size: 13px;
    font-family: 'Segoe UI', system-ui, sans-serif;
    position: relative; z-index: 1; line-height: 1.4;
  }

  #scz-gate-body {
    padding: 24px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .scz-field { margin-bottom: 14px; }
  .scz-label {
    display: block; font-size: 12.5px; font-weight: 600;
    color: #4a5080; margin-bottom: 5px; letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .scz-input {
    width: 100%; border: 1.5px solid #e0e4f0;
    border-radius: 10px; padding: 11px 13px;
    font-size: 14px; color: #1a1f3a; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit; background: #fafbff;
  }
  .scz-input:focus {
    border-color: #1A3CFF;
    box-shadow: 0 0 0 3px rgba(26,60,255,0.1);
    background: #fff;
  }
  .scz-input::placeholder { color: #b0b6d0; }
  .scz-input.error { border-color: #FF3B5C; }

  #scz-gate-submit {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, #1A3CFF, #0A40E0);
    color: #fff; border: none; border-radius: 12px;
    font-size: 15px; font-weight: 700; cursor: pointer;
    font-family: inherit; letter-spacing: 0.01em;
    transition: opacity 0.2s, transform 0.1s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 4px;
  }
  #scz-gate-submit:hover { opacity: 0.9; transform: translateY(-1px); }
  #scz-gate-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  #scz-gate-note {
    text-align: center; font-size: 11.5px; color: #9ba3c0;
    margin-top: 12px; line-height: 1.5;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }

  #scz-gate-close {
    position: absolute; top: 14px; right: 16px;
    background: rgba(255,255,255,0.15); border: none;
    width: 28px; height: 28px; border-radius: 50%;
    cursor: pointer; color: #fff; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; z-index: 2;
  }
  #scz-gate-close:hover { background: rgba(255,255,255,0.25); }

  #scz-success-msg {
    display: none; text-align: center; padding: 20px 0 8px;
  }
  #scz-success-msg .scz-success-icon { font-size: 40px; margin-bottom: 10px; }
  #scz-success-msg h3 {
    color: #1a1f3a; font-size: 17px; margin-bottom: 6px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  #scz-success-msg p {
    color: #6b7280; font-size: 13px; line-height: 1.5;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  @media (max-width: 440px) {
    #scz-gate-box { border-radius: 16px; }
    #scz-gate-head { padding: 20px 18px 16px; }
    #scz-gate-body { padding: 18px; }
  }
  `;

  // ── INJECT CSS ───────────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ── INJECT HTML ──────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'scz-gate-overlay';
  overlay.innerHTML = `
    <div id="scz-gate-box">
      <div id="scz-gate-head">
        <button id="scz-gate-close" title="Close">×</button>
        <span id="scz-gate-icon">🔓</span>
        <div id="scz-gate-title">Unlock Live Preview</div>
        <div id="scz-gate-sub">See the full website — share your details<br>and we'll follow up with a free consultation.</div>
      </div>
      <div id="scz-gate-body">
        <div id="scz-gate-form">
          <div class="scz-field">
            <label class="scz-label">Full Name *</label>
            <input class="scz-input" id="scz-fname" type="text" placeholder="Your full name" autocomplete="name">
          </div>
          <div class="scz-field">
            <label class="scz-label">WhatsApp / Phone *</label>
            <input class="scz-input" id="scz-fphone" type="tel" placeholder="+91 98765 43210" autocomplete="tel">
          </div>
          <div class="scz-field">
            <label class="scz-label">Business / Email <span style="font-weight:400;text-transform:none;font-size:11px">(optional)</span></label>
            <input class="scz-input" id="scz-femail" type="email" placeholder="you@yourbusiness.com" autocomplete="email">
          </div>
          <button id="scz-gate-submit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            View Live Preview
          </button>
          <div id="scz-gate-note">
            🔒 Your info is private. We only use it to contact you.
          </div>
        </div>
        <div id="scz-success-msg">
          <div class="scz-success-icon">✅</div>
          <h3>Opening preview...</h3>
          <p>Thank you! Opening the live website now.<br>Our team will reach out shortly on WhatsApp.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // ── STATE ────────────────────────────────────────────────────
  let pendingUrl = '';
  let pendingTitle = '';

  // ── OPEN / CLOSE ─────────────────────────────────────────────
  function openGate(previewUrl, websiteTitle) {
    pendingUrl = previewUrl;
    pendingTitle = websiteTitle || 'a Scalioz website';
    document.getElementById('scz-gate-form').style.display = 'block';
    document.getElementById('scz-success-msg').style.display = 'none';
    document.getElementById('scz-fname').value = '';
    document.getElementById('scz-fphone').value = '';
    document.getElementById('scz-femail').value = '';
    overlay.classList.add('active');
    setTimeout(() => document.getElementById('scz-fname').focus(), 300);
  }

  function closeGate() {
    overlay.classList.remove('active');
  }

  // ── SUBMIT ───────────────────────────────────────────────────
  function handleSubmit() {
    const name  = document.getElementById('scz-fname').value.trim();
    const phone = document.getElementById('scz-fphone').value.trim();
    const email = document.getElementById('scz-femail').value.trim();

    // Validation
    let valid = true;
    if (!name)  { document.getElementById('scz-fname').classList.add('error');  valid = false; }
    else          document.getElementById('scz-fname').classList.remove('error');
    if (!phone) { document.getElementById('scz-fphone').classList.add('error'); valid = false; }
    else          document.getElementById('scz-fphone').classList.remove('error');
    if (!valid) return;

    const btn = document.getElementById('scz-gate-submit');
    btn.disabled = true;
    btn.textContent = 'Opening...';

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const lead = { name, phone, email, website: pendingTitle, timestamp, source: 'websites.scalioz.com' };

    // 1. Build WhatsApp URL (shown as button in success screen)
    const waMsg = encodeURIComponent(
      `🔔 *New Lead — Live Preview Request*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email || '—'}\n` +
      `🌐 *Website:* ${pendingTitle}\n` +
      `🕐 *Time:* ${timestamp}\n` +
      `📍 *Source:* websites.scalioz.com`
    );
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

    // 2. Send to Google Sheets (if webhook configured)
    if (SHEETS_WEBHOOK) {
      fetch(SHEETS_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      }).catch(() => {});
    }

    // 3. Show success message
    document.getElementById('scz-gate-form').style.display = 'none';
    document.getElementById('scz-success-msg').style.display = 'block';

    // 4. After 1.8s: redirect current page to portfolio site
    //    WhatsApp link is shown as a fallback button in success message
    document.getElementById('scz-success-msg').innerHTML = `
      <div class="scz-success-icon">✅</div>
      <h3>Opening preview...</h3>
      <p>Thank you! Redirecting you to the live website now.<br>Our team will reach out shortly on WhatsApp.</p>
      <a href="${waUrl}" target="_blank" rel="noopener"
         style="display:inline-block;margin-top:12px;padding:10px 20px;background:#25D366;
                color:#fff;border-radius:10px;font-size:13px;font-weight:600;
                text-decoration:none;font-family:inherit;">
        📲 Also send via WhatsApp
      </a>
    `;

    setTimeout(() => {
      window.location.href = pendingUrl;
    }, 2500);
  }

  // ── EVENTS ───────────────────────────────────────────────────
  document.getElementById('scz-gate-close').addEventListener('click', closeGate);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeGate(); });
  document.getElementById('scz-gate-submit').addEventListener('click', handleSubmit);

  // Enter key submits
  ['scz-fname','scz-fphone','scz-femail'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSubmit();
    });
  });

  // Clear error on input
  document.getElementById('scz-fname').addEventListener('input', () =>
    document.getElementById('scz-fname').classList.remove('error'));
  document.getElementById('scz-fphone').addEventListener('input', () =>
    document.getElementById('scz-fphone').classList.remove('error'));

  // ── INTERCEPT LIVE PREVIEW BUTTONS ───────────────────────────
  function attachToButtons() {
    document.querySelectorAll('a, button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      const isPreviewBtn = text.includes('live preview') ||
                           text.includes('preview') ||
                           el.classList.contains('btn-preview') ||
                           el.dataset.preview;

      if (isPreviewBtn && !el.dataset.gated) {
        el.dataset.gated = 'true';
        // Use data-preview-url first (explicit), then fall back to href
        const originalHref = el.dataset.previewUrl || el.getAttribute('href') || '#';
        // Find the card title
        const card = el.closest('[class*="card"], [class*="item"], article, li, div[data-name]');
        const titleEl = card ? (card.querySelector('[class*="title"], h2, h3, h4, [class*="name"]')) : null;
        const websiteTitle = titleEl ? titleEl.textContent.trim() : 'Scalioz Website';

        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openGate(originalHref, websiteTitle);
        });

        if (el.tagName === 'A') el.removeAttribute('href');
      }
    });
  }

  // Run after DOM fully loads and re-run after any dynamic rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachToButtons);
  } else {
    attachToButtons();
  }
  // Also run after a short delay in case cards render dynamically
  setTimeout(attachToButtons, 1000);
  setTimeout(attachToButtons, 2500);

})();
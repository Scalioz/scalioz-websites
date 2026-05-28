// SCALIOZ WEBSITES — Smart Sales Chatbot (Rule-based + Gemini AI)
// websites.scalioz.com | Scalioz Systems, Chennai
(function () {
  'use strict';
  const WA = '919043616100';
  const GEMINI_KEY = 'YOUR_GEMINI_API_KEY_HERE';

  // ── Smart responses per service ──────────────────────────────
  const FLOWS = {
    website: {
      intro: "🌐 Great choice! We build premium websites in 3–5 days.\n\nWe've built for Haj & Umrah travel, clinics, real estate, schools, restaurants and more — with AI chatbot, WhatsApp, and Razorpay built in.\n\nPricing: ₹499/mo | ₹3,999/yr | ₹9,999 lifetime (+ 18% GST)\n\nWhat type of business is the website for?",
      qrs: ['🕌 Haj / Umrah Travel','🏥 Clinic / Healthcare','🏠 Real Estate','🎓 Education','💼 Other Business']
    },
    whatsapp: {
      intro: "💬 Excellent! Our WhatsApp Automation helps you:\n\n✓ Auto-reply to incoming messages 24/7\n✓ Send bulk campaigns to your customer list\n✓ Qualify leads automatically via WhatsApp\n✓ Integrate with your CRM or Google Sheets\n✓ WhatsApp chatbot for your business\n\nWhat do you need it for?",
      qrs: ['📢 Bulk Campaigns','🤖 Auto-Reply Bot','🔗 CRM Integration','📋 Lead Follow-up']
    },
    ai: {
      intro: "🤖 We build custom AI solutions:\n\n✓ AI chatbots (like this one!) for your website\n✓ WhatsApp AI agents for sales & support\n✓ Lead qualification bots\n✓ AI agents that book appointments, answer FAQs, handle orders\n✓ Integration with your existing systems\n\nWhat are you trying to automate?",
      qrs: ['💬 Website Chatbot','📱 WhatsApp AI Bot','📅 Appointment Booking','🛒 Order / Sales Bot']
    },
    leads: {
      intro: "📈 Our Lead Generation Systems deliver real buyers:\n\n✓ High-converting landing pages\n✓ Google & Facebook Ads campaigns\n✓ Lead capture forms with WhatsApp follow-up\n✓ CRM setup and automation\n✓ End-to-end sales pipeline\n\nWhat industry are you in?",
      qrs: ['🏥 Healthcare','🏠 Real Estate','🏗️ Construction','🎓 Education','🛒 Retail / eCommerce']
    },
    tools: {
      intro: "🛠️ 35 ready-to-use business tools for Healthcare, Real Estate, Construction & Education.\n\nEach tool is a powerful calculator or dashboard — just open and use, no setup needed.\n\nPricing: ₹499/mo | ₹3,999/yr | ₹9,999 lifetime (+ 18% GST)\n\nWhich industry are you in?",
      qrs: ['🏥 Healthcare','🏠 Real Estate','🏗️ Construction','🎓 Education']
    },
    marketing: {
      intro: "📊 Our Digital Marketing services:\n\n✓ SEO — rank on Google for your city & niche\n✓ Google Ads / PPC — instant targeted leads\n✓ Social Media (Facebook, Instagram, LinkedIn)\n✓ Content Marketing — blogs, product descriptions\n✓ Google Business Profile optimisation\n\nWhat's your marketing goal?",
      qrs: ['🔍 Rank on Google (SEO)','💰 Run Google Ads','📱 Social Media Growth','📍 Local Business Visibility']
    }
  };

  // ── Lead qualification state ─────────────────────────────────
  let leadData = { service: '', detail: '', name: '', phone: '', business: '' };
  let stage = 'welcome'; // welcome → service → detail → qualify_name → qualify_phone → done

  // ── CSS ──────────────────────────────────────────────────────
  document.head.insertAdjacentHTML('beforeend',`<style>
  #sw{font-family:'Segoe UI',system-ui,sans-serif}#sw *{box-sizing:border-box;margin:0;padding:0}
  #sf{position:fixed;bottom:24px;right:24px;z-index:99999;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#1A3CFF,#00C8FF);border:none;cursor:pointer;box-shadow:0 4px 24px rgba(26,60,255,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s;outline:none}
  #sf:hover{transform:scale(1.1)}#sfi,#sfx{transition:all .2s;position:absolute}
  #sf.open #sfi{opacity:0;transform:scale(.5) rotate(90deg)}#sf.open #sfx{opacity:1;transform:scale(1)}
  #sfx{opacity:0;transform:scale(.5)}
  #sb2{position:absolute;top:-4px;right:-4px;background:#FF3B5C;color:#fff;width:20px;height:20px;border-radius:50%;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff;animation:sp 2s infinite}
  @keyframes sp{0%,100%{box-shadow:0 0 0 0 rgba(255,59,92,.5)}50%{box-shadow:0 0 0 6px transparent}}
  #swin{position:fixed;bottom:96px;right:24px;z-index:99998;width:368px;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 12px 56px rgba(10,24,96,.2);display:flex;flex-direction:column;transform:scale(.88) translateY(16px);opacity:0;transition:all .3s cubic-bezier(.34,1.56,.64,1);pointer-events:none;max-height:580px}
  #swin.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
  #shd{background:linear-gradient(135deg,#0A1860,#1A3CFF);padding:14px 16px;display:flex;align-items:center;gap:11px;flex-shrink:0}
  #sav{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,rgba(255,255,255,.15),rgba(0,200,255,.2));border:2px solid rgba(0,200,255,.4);display:flex;align-items:center;justify-content:center;font-size:20px}
  .shn{color:#fff;font-weight:700;font-size:14px}.shs{color:#00C8FF;font-size:11px;margin-top:2px}
  #sms{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:8px;background:#f6f7fb;min-height:240px;max-height:380px}
  #sms::-webkit-scrollbar{width:4px}#sms::-webkit-scrollbar-thumb{background:#d0d4e8;border-radius:4px}
  .sr2{display:flex;flex-direction:column}.sr2.b{align-items:flex-start}.sr2.u{align-items:flex-end}
  .sb3{max-width:86%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.55;animation:sfu .2s ease}
  @keyframes sfu{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .sr2.b .sb3{background:#fff;color:#1a1f3a;border-bottom-left-radius:4px;box-shadow:0 1px 6px rgba(10,24,96,.08)}
  .sr2.u .sb3{background:linear-gradient(135deg,#1A3CFF,#0A40E0);color:#fff;border-bottom-right-radius:4px}
  .sqw{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}
  .sqb{background:#fff;border:1.5px solid #1A3CFF;color:#1A3CFF;border-radius:20px;padding:5px 13px;font-size:12.5px;font-weight:500;cursor:pointer;transition:all .15s;white-space:nowrap}
  .sqb:hover{background:#1A3CFF;color:#fff}
  #sft{padding:10px 12px;background:#fff;border-top:1px solid #eceef5;display:flex;gap:8px;align-items:flex-end;flex-shrink:0}
  #sinp{flex:1;border:1.5px solid #dde0ef;border-radius:12px;padding:9px 12px;font-size:13.5px;resize:none;outline:none;max-height:90px;line-height:1.45;font-family:inherit;background:#fafbff;transition:border-color .2s;color:#1a1f3a}
  #sinp:focus{border-color:#1A3CFF;background:#fff}#sinp::placeholder{color:#9ba3c0}
  #ssb{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#1A3CFF,#00C8FF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;outline:none;transition:opacity .15s}
  #ssb:disabled{opacity:.4}
  .swa2{display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:#fff;border:none;border-radius:12px;padding:11px 14px;font-size:13.5px;font-weight:700;cursor:pointer;width:100%;margin-top:6px;font-family:inherit;letter-spacing:.01em;transition:background .2s}
  .swa2:hover{background:#1db954}
  .sdv{text-align:center;font-size:11px;color:#a0a8c0;margin:4px 0;display:flex;align-items:center;gap:8px}
  .sdv::before,.sdv::after{content:'';flex:1;height:1px;background:#e8eaf2}
  @media(max-width:420px){#swin{width:calc(100vw - 16px);right:8px}#sf{bottom:16px;right:16px}}
  </style>`);

  // ── HTML ──────────────────────────────────────────────────────
  const root=document.createElement('div');root.id='sw';
  root.innerHTML=`
  <button id="sf"><span id="sb2">1</span>
    <span id="sfi"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
    <span id="sfx"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
  </button>
  <div id="swin">
    <div id="shd"><div id="sav">🌐</div><div><div class="shn">Scalioz Assistant</div><div class="shs">● Online · Typically replies instantly</div></div></div>
    <div id="sms"></div>
    <div id="sft"><textarea id="sinp" rows="1" placeholder="Type your message…"></textarea><button id="ssb"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button></div>
  </div>`;
  document.body.appendChild(root);

  const fab=document.getElementById('sf'),win=document.getElementById('swin'),
    msgs=document.getElementById('sms'),inp=document.getElementById('sinp'),
    ssb=document.getElementById('ssb'),bdg=document.getElementById('sb2');
  let isOpen=false;
  const scroll=()=>msgs.scrollTop=msgs.scrollHeight;

  function botMsg(text,qrs=[]){
    const r=document.createElement('div');r.className='sr2 b';
    const b=document.createElement('div');b.className='sb3';
    b.innerHTML=text.replace(/\n/g,'<br>');r.appendChild(b);
    if(qrs.length){
      const w=document.createElement('div');w.className='sqw';
      qrs.forEach(l=>{const btn=document.createElement('button');btn.className='sqb';btn.textContent=l;
        btn.onclick=()=>{w.remove();send(l);};w.appendChild(btn);});r.appendChild(w);}
    msgs.appendChild(r);scroll();
  }

  function userMsg(t){
    const r=document.createElement('div');r.className='sr2 u';
    r.innerHTML=`<div class="sb3">${t.replace(/</g,'&lt;')}</div>`;
    msgs.appendChild(r);scroll();
  }

  function showWA(){
    const d=document.createElement('div');d.className='sdv';d.textContent='Connect with us';msgs.appendChild(d);
    const r=document.createElement('div');r.className='sr2 b';
    const svc=leadData.service||'digital services';
    const nm=leadData.name?` ${leadData.name}`:'';
    const msg=encodeURIComponent(`Hi Scalioz!${nm ? '\n\nName: '+leadData.name : ''}\nBusiness: ${leadData.business||'Not specified'}\nInterested in: ${svc}\nDetails: ${leadData.detail||'—'}\n\nPlease contact me for more info.`);
    const btn=document.createElement('button');btn.className='swa2';
    btn.innerHTML=`<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.518 3.66 1.42 5.18L2 22l4.91-1.4A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg> Chat on WhatsApp — Free Consultation`;
    btn.onclick=()=>window.open(`https://wa.me/${WA}?text=${msg}`,'_blank');
    r.appendChild(btn);msgs.appendChild(r);scroll();
  }

  function detectService(t){
    const s=t.toLowerCase();
    if(s.includes('website')||s.includes('site')||s.includes('web')||s.includes('haj')||s.includes('clinic')||s.includes('real estate')||s.includes('school')) return 'website';
    if(s.includes('whatsapp')||s.includes('automation')||s.includes('bulk')||s.includes('campaign')||s.includes('message')) return 'whatsapp';
    if(s.includes('ai')||s.includes('bot')||s.includes('agent')||s.includes('chatbot')||s.includes('app')) return 'ai';
    if(s.includes('lead')||s.includes('generation')||s.includes('ads')||s.includes('google ads')||s.includes('facebook')) return 'leads';
    if(s.includes('tool')||s.includes('calculator')||s.includes('dashboard')||s.includes('healthcare')||s.includes('construction')) return 'tools';
    if(s.includes('marketing')||s.includes('seo')||s.includes('social media')||s.includes('digital marketing')) return 'marketing';
    return null;
  }

  function send(text){
    text=(text||'').trim();if(!text)return;
    userMsg(text);inp.value='';inp.style.height='auto';

    const t=text.toLowerCase();

    // Stage: welcome → detect service
    if(stage==='welcome'){
      const svc=detectService(text);
      if(svc){
        leadData.service=svc;
        stage='detail';
        setTimeout(()=>botMsg(FLOWS[svc].intro, FLOWS[svc].qrs),400);
      } else {
        setTimeout(()=>botMsg("We offer Website Development, WhatsApp Automation, Custom AI Agents, Lead Generation, Business Tools and Digital Marketing.\n\nWhich of these interests you?",
          ['🌐 Website Development','💬 WhatsApp Automation','🤖 Custom AI Agent','📈 Lead Generation','🛠️ Business Tools','📊 Digital Marketing']),400);
      }
      return;
    }

    // Stage: detail → capture what they need, then qualify
    if(stage==='detail'){
      leadData.detail=text;
      stage='qualify_name';
      setTimeout(()=>botMsg("Perfect! 👍 To connect you with our team, may I know your name?"),400);
      return;
    }

    // Stage: qualify name
    if(stage==='qualify_name'){
      leadData.name=text;
      stage='qualify_phone';
      setTimeout(()=>botMsg(`Nice to meet you, ${text}! 😊 What's your WhatsApp number so our team can reach you?`),400);
      return;
    }

    // Stage: qualify phone
    if(stage==='qualify_phone'){
      leadData.phone=text;
      stage='qualify_business';
      setTimeout(()=>botMsg("And what's your business name?"),400);
      return;
    }

    // Stage: qualify business → done
    if(stage==='qualify_business'){
      leadData.business=text;
      stage='done';
      setTimeout(()=>{
        botMsg(`Thank you, ${leadData.name}! 🙏\n\nHere's a summary of your enquiry:\n📌 Service: ${leadData.service}\n🏢 Business: ${leadData.business}\n📞 Phone: ${leadData.phone}\n\nOur team will reach out to you shortly. You can also connect with us directly on WhatsApp right now:`);
        setTimeout(showWA, 600);
      },400);
      return;
    }

    // Stage: done — re-engage
    if(stage==='done'){
      setTimeout(()=>showWA(),400);
      return;
    }

    // Fallback: re-detect service
    const svc=detectService(text);
    if(svc){
      leadData.service=svc;
      stage='detail';
      setTimeout(()=>botMsg(FLOWS[svc].intro, FLOWS[svc].qrs),400);
    } else {
      setTimeout(()=>botMsg("I'm here to help! 😊 We offer:",
        ['🌐 Website Development','💬 WhatsApp Automation','🤖 Custom AI Agent','📈 Lead Generation']),400);
    }
  }

  function toggle(){
    isOpen=!isOpen;win.classList.toggle('open',isOpen);fab.classList.toggle('open',isOpen);
    if(isOpen){bdg.style.display='none';inp.focus();if(!msgs.children.length)welcome();}
  }

  function welcome(){
    stage='welcome';
    botMsg("👋 Hi! Welcome to Scalioz Systems, Chennai!\n\nWe build digital solutions for Indian businesses — Websites, WhatsApp Automation, AI Agents, Lead Generation & more.\n\nWhat are you looking for?",
      ['🌐 Website Development','💬 WhatsApp Automation','🤖 Custom App / AI Agent','📈 Lead Generation','🛠️ Business Tools','📊 Digital Marketing']);
  }

  fab.addEventListener('click',toggle);
  ssb.addEventListener('click',()=>send(inp.value));
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(inp.value);}});
  inp.addEventListener('input',()=>{inp.style.height='auto';inp.style.height=Math.min(inp.scrollHeight,88)+'px';});
  setTimeout(()=>{if(!isOpen){bdg.textContent='1';bdg.style.display='flex';}},8000);
})();

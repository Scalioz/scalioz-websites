// SCALIOZ WEBSITES — AI Sales Chatbot (Gemini Free)
// Get FREE key: https://aistudio.google.com/app/apikey
(function () {
  'use strict';
  const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
  const WA_NUMBER = '919043616100';

  const CONTEXT = `You are Scalioz AI, a smart sales consultant for Scalioz Systems, Chennai.

Scalioz provides:
1. WEBSITE DEVELOPMENT — Premium websites for Haj/Umrah travel, clinics, real estate, education, any business. Multilingual, AI chatbot included, WhatsApp + Razorpay integrated. Delivered in 3-5 days. Pricing: ₹499/mo | ₹3,999/yr | ₹9,999 lifetime + 18% GST.
2. WHATSAPP AUTOMATION — Automated WhatsApp messaging, lead follow-up, bulk campaigns, chatbots for WhatsApp Business.
3. CUSTOM APPS, BOTS & AI AGENTS — Custom web apps, intelligent chatbots, AI agents for business automation, lead qualification bots.
4. LEAD GENERATION SYSTEMS — End-to-end lead gen: landing pages, ad campaigns, CRM integration, WhatsApp follow-up automation.
5. BUSINESS TOOLS — 35 ready-to-use tools (calculators, dashboards) for Healthcare, Real Estate, Construction, Education. Same pricing as websites.
6. DIGITAL MARKETING — SEO, Google Ads, Social Media Management, Content Marketing, Google Business Profile.

Your job: Understand what visitor needs → describe relevant service → qualify lead (name, business, requirements, budget, timeline) → push to WhatsApp +91 90436 16100.
Keep replies SHORT (2-3 sentences). Warm, professional. 1-2 emojis max. After 3 exchanges always show WhatsApp option.`;

  // CSS
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
  .stw{background:#fff;padding:12px 16px;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 1px 6px rgba(10,24,96,.08);display:flex;gap:5px;align-items:center}
  .std2{width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#1A3CFF,#00C8FF);animation:sj 1.3s infinite}
  .std2:nth-child(2){animation-delay:.18s}.std2:nth-child(3){animation-delay:.36s}
  @keyframes sj{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
  #sft{padding:10px 12px;background:#fff;border-top:1px solid #eceef5;display:flex;gap:8px;align-items:flex-end;flex-shrink:0}
  #sinp{flex:1;border:1.5px solid #dde0ef;border-radius:12px;padding:9px 12px;font-size:13.5px;resize:none;outline:none;max-height:90px;line-height:1.45;font-family:inherit;background:#fafbff;transition:border-color .2s;color:#1a1f3a}
  #sinp:focus{border-color:#1A3CFF;background:#fff}#sinp::placeholder{color:#9ba3c0}
  #ssb{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#1A3CFF,#00C8FF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;outline:none}
  #ssb:disabled{opacity:.4;cursor:not-allowed}
  .swa2{display:flex;align-items:center;justify-content:center;gap:7px;background:#25D366;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer;width:100%;margin-top:4px;transition:background .2s;font-family:inherit}
  .swa2:hover{background:#1db954}
  .sdv{text-align:center;font-size:11px;color:#a0a8c0;margin:4px 0;display:flex;align-items:center;gap:8px}
  .sdv::before,.sdv::after{content:'';flex:1;height:1px;background:#e8eaf2}
  @media(max-width:420px){#swin{width:calc(100vw - 16px);right:8px}#sf{bottom:16px;right:16px}}
  </style>`);

  // HTML
  const root = document.createElement('div');
  root.id='sw';
  root.innerHTML=`
  <button id="sf"><span id="sb2">1</span>
    <span id="sfi"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
    <span id="sfx"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
  </button>
  <div id="swin">
    <div id="shd"><div id="sav">🌐</div><div><div class="shn">Scalioz Assistant</div><div class="shs">● Websites · Tools · Digital Marketing</div></div></div>
    <div id="sms"></div>
    <div id="sft"><textarea id="sinp" rows="1" placeholder="Ask about our services…"></textarea><button id="ssb"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button></div>
  </div>`;
  document.body.appendChild(root);

  const history=[], fab=document.getElementById('sf'), win=document.getElementById('swin'),
    msgs=document.getElementById('sms'), inp=document.getElementById('sinp'),
    ssb=document.getElementById('ssb'), bdg=document.getElementById('sb2');
  let open=false, busy=false, count=0, waShown=false;

  const scroll=()=>msgs.scrollTop=msgs.scrollHeight;

  function botMsg(text, qrs=[]){
    const r=document.createElement('div'); r.className='sr2 b';
    const b=document.createElement('div'); b.className='sb3';
    b.innerHTML=text.replace(/\n/g,'<br>'); r.appendChild(b);
    if(qrs.length){const w=document.createElement('div');w.className='sqw';
      qrs.forEach(l=>{const btn=document.createElement('button');btn.className='sqb';btn.textContent=l;
        btn.onclick=()=>{w.remove();send(l);};w.appendChild(btn);});r.appendChild(w);}
    msgs.appendChild(r); scroll();
  }

  function userMsg(text){
    const r=document.createElement('div');r.className='sr2 u';
    r.innerHTML=`<div class="sb3">${text.replace(/</g,'&lt;')}</div>`;
    msgs.appendChild(r); scroll(); count++;
    history.push({role:'user',parts:[{text}]});
  }

  function typing(){const r=document.createElement('div');r.className='sr2 b';r.id='sty';
    r.innerHTML=`<div class="stw"><div class="std2"></div><div class="std2"></div><div class="std2"></div></div>`;
    msgs.appendChild(r);scroll();}
  function noTyping(){const t=document.getElementById('sty');if(t)t.remove();}

  function showWA(){
    if(waShown)return;waShown=true;
    const d=document.createElement('div');d.className='sdv';d.textContent='Free Consultation';msgs.appendChild(d);
    const r=document.createElement('div');r.className='sr2 b';
    const summary=history.filter(m=>m.role==='user').map(m=>m.parts[0].text).slice(-3).join(' | ').substring(0,200);
    const btn=document.createElement('button');btn.className='swa2';
    btn.innerHTML=`<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.518 3.66 1.42 5.18L2 22l4.91-1.4A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg> Chat on WhatsApp — Free Consultation`;
    btn.onclick=()=>{const m=encodeURIComponent(`Hi Scalioz! I visited websites.scalioz.com.\n\nI'm interested in: ${summary}`);window.open(`https://wa.me/${WA_NUMBER}?text=${m}`,'_blank');};
    r.appendChild(btn);msgs.appendChild(r);scroll();
  }

  function toggle(){
    open=!open;win.classList.toggle('open',open);fab.classList.toggle('open',open);
    if(open){bdg.style.display='none';inp.focus();if(!count&&!msgs.children.length)welcome();}
  }

  function welcome(){
    botMsg("👋 Scalioz Systems builds digital solutions for Indian businesses!\n\nWe provide Website Development, WhatsApp Automation, Custom Apps & AI Agents, Lead Generation Systems, and Digital Marketing.\n\nWhat are you looking for?",
      ['🌐 Website Development','💬 WhatsApp Automation','🤖 Custom App / AI Agent','📈 Lead Generation','🛠️ Business Tools']);
  }

  async function send(text){
    text=(text||'').trim();if(!text||busy)return;
    busy=true;ssb.disabled=true;inp.value='';inp.style.height='auto';
    userMsg(text);typing();

    // Build prompt with full context
    const fullPrompt = `${CONTEXT}\n\nConversation so far:\n${history.slice(0,-1).map(m=>`${m.role==='user'?'Customer':'Scalioz AI'}: ${m.parts[0].text}`).join('\n')}\n\nCustomer: ${text}\n\nScalioz AI (reply in 2-3 sentences, be helpful and ask a qualifying question):`;

    try{
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          contents:[{role:'user',parts:[{text:fullPrompt}]}],
          generationConfig:{maxOutputTokens:300,temperature:0.7}
        })
      });
      const data=await res.json();
      noTyping();
      if(data.error){
        console.error('Gemini:',data.error.message);
        botMsg("We offer website development, WhatsApp automation, custom AI agents, and lead generation. Which service interests you? 😊");
      } else {
        const reply=(data?.candidates?.[0]?.content?.parts?.[0]?.text||'').replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').trim();
        botMsg(reply);
        history.push({role:'model',parts:[{text:reply}]});
      }
      if(count>=3)setTimeout(showWA,600);
    }catch(e){
      noTyping();
      console.error('Fetch:',e);
      botMsg("We offer website development, WhatsApp automation, custom AI agents, and lead generation systems. What does your business need? 😊");
      setTimeout(showWA,600);
    }
    busy=false;ssb.disabled=false;inp.focus();
  }

  fab.addEventListener('click',toggle);
  ssb.addEventListener('click',()=>send(inp.value));
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(inp.value);}});
  inp.addEventListener('input',()=>{inp.style.height='auto';inp.style.height=Math.min(inp.scrollHeight,88)+'px';});
  setTimeout(()=>{if(!open){bdg.textContent='1';bdg.style.display='flex';}},8000);
})();

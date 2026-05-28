import re

with open('index.html', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# 3 new cards to add after the Al Mumin card
NEW_CARDS = '''
                <!-- WANDERLUST TRAVEL -->
                <div class="website-card" data-category="travel">
                    <div class="card-preview" style="background:#0A0C10;display:flex;align-items:center;justify-content:center;">
                        <img src="https://image.thum.io/get/width/700/crop/420/wait/12/https://scalioz.github.io/wanderlust/" alt="Wanderlust Travel" style="width:100%;height:100%;object-fit:cover;display:block;">
                    </div>
                    <div class="card-badge travel">✈ TRAVEL AGENCY</div>
                    <div class="card-new">⭐ New</div>
                    <div class="card-body">
                        <div class="card-category">TRAVEL & TOURISM</div>
                        <h3 class="card-title">Wanderlust Travel Agency</h3>
                        <p class="card-desc">A premium luxury travel agency website with destination showcase, curated packages, testimonials, and AI-powered trip planning chatbot.</p>
                        <div class="card-features">
                            <span>✓ Destination gallery</span>
                            <span>✓ Package showcase</span>
                            <span>✓ AI trip planner</span>
                            <span>✓ WhatsApp booking</span>
                        </div>
                        <div class="card-rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-num">5.0</span>
                            <span class="rating-label">· Premium Quality</span>
                        </div>
                        <div class="card-actions">
                            <a href="https://scalioz.github.io/wanderlust/" target="_blank" class="btn-preview" data-preview="true">🔗 Live Preview →</a>
                            <a href="https://wa.me/919043616100?text=Hi%20Scalioz!%20I%20want%20a%20travel%20website%20like%20Wanderlust." target="_blank" class="btn-whatsapp">💬 Get This</a>
                        </div>
                    </div>
                </div>

                <!-- PRESTIGE REALTY -->
                <div class="website-card" data-category="real-estate">
                    <div class="card-preview" style="background:#0D0D0D;display:flex;align-items:center;justify-content:center;">
                        <img src="https://image.thum.io/get/width/700/crop/420/wait/12/https://scalioz.github.io/prestige-realty/" alt="Prestige Realty" style="width:100%;height:100%;object-fit:cover;display:block;">
                    </div>
                    <div class="card-badge realty">🏠 REAL ESTATE</div>
                    <div class="card-new">⭐ New</div>
                    <div class="card-body">
                        <div class="card-category">REAL ESTATE</div>
                        <h3 class="card-title">Prestige Realty</h3>
                        <p class="card-desc">A high-converting real estate website with property listings, EMI calculator, verified listings, and AI property advisor chatbot with WhatsApp lead capture.</p>
                        <div class="card-features">
                            <span>✓ Property listings</span>
                            <span>✓ EMI calculator</span>
                            <span>✓ AI property advisor</span>
                            <span>✓ Lead capture</span>
                        </div>
                        <div class="card-rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-num">5.0</span>
                            <span class="rating-label">· Premium Quality</span>
                        </div>
                        <div class="card-actions">
                            <a href="https://scalioz.github.io/prestige-realty/" target="_blank" class="btn-preview" data-preview="true">🔗 Live Preview →</a>
                            <a href="https://wa.me/919043616100?text=Hi%20Scalioz!%20I%20want%20a%20real%20estate%20website%20like%20Prestige%20Realty." target="_blank" class="btn-whatsapp">💬 Get This</a>
                        </div>
                    </div>
                </div>

                <!-- PEARL DENTAL -->
                <div class="website-card" data-category="healthcare">
                    <div class="card-preview" style="background:#0A1628;display:flex;align-items:center;justify-content:center;">
                        <img src="https://image.thum.io/get/width/700/crop/420/wait/12/https://scalioz.github.io/pearl-dental/" alt="Pearl Dental Studio" style="width:100%;height:100%;object-fit:cover;display:block;">
                    </div>
                    <div class="card-badge healthcare">🦷 HEALTHCARE</div>
                    <div class="card-new">⭐ New</div>
                    <div class="card-body">
                        <div class="card-category">HEALTHCARE / DENTAL</div>
                        <h3 class="card-title">Pearl Dental Studio</h3>
                        <p class="card-desc">A world-class dental clinic website with service showcase, doctor profiles, appointment booking, and AI dental assistant chatbot for patient qualification.</p>
                        <div class="card-features">
                            <span>✓ Appointment booking</span>
                            <span>✓ Doctor profiles</span>
                            <span>✓ AI dental chatbot</span>
                            <span>✓ Emergency CTA</span>
                        </div>
                        <div class="card-rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-num">5.0</span>
                            <span class="rating-label">· Premium Quality</span>
                        </div>
                        <div class="card-actions">
                            <a href="https://scalioz.github.io/pearl-dental/" target="_blank" class="btn-preview" data-preview="true">🔗 Live Preview →</a>
                            <a href="https://wa.me/919043616100?text=Hi%20Scalioz!%20I%20want%20a%20dental%20clinic%20website%20like%20Pearl%20Dental." target="_blank" class="btn-whatsapp">💬 Get This</a>
                        </div>
                    </div>
                </div>'''

# Find the Al Mumin card closing div and insert after it
# Look for the closing of the first website-card
pattern = r'(</div>\s*</div>\s*<!-- HEALTHCARE.*?-->|<!-- Clinic Website|<!-- clinic|<!-- COMING|<!-- coming)'

# Simple approach: find "Coming Soon" cards and replace first one
# Actually let's find the tools-grid or cards container end and insert before closing
# Find pattern: after Al Mumin card, before clinic coming soon card

# Try to find "Clinic Website Template" or similar coming-soon card
if 'Clinic Website Template' in content or 'coming-soon' in content.lower() or 'COMING SOON' in content:
    # Replace the first "Coming Soon" placeholder cards area
    # Find the section that has coming soon cards
    soon_match = re.search(r'(<div[^>]*class="[^"]*card[^"]*"[^>]*>[\s\S]*?SOON[\s\S]*?</div>\s*</div>\s*</div>)', content, re.IGNORECASE)
    if soon_match:
        # Insert our 3 cards before the soon section
        insert_pos = soon_match.start()
        content = content[:insert_pos] + NEW_CARDS + '\n                ' + content[insert_pos:]
        print("✅ Inserted 3 new cards before Coming Soon section")
    else:
        print("⚠️  Pattern not found via method 1, trying method 2...")
        # Try inserting after the last website-card closing div
        # Find all website-card divs
        cards = list(re.finditer(r'<div[^>]*class="[^"]*website-card[^"]*"', content))
        if cards:
            last_card = cards[-1]
            # Find the closing of this card
            depth = 0
            pos = last_card.start()
            for i in range(pos, len(content)):
                if content[i:i+4] == '<div':
                    depth += 1
                elif content[i:i+6] == '</div>':
                    depth -= 1
                    if depth == 0:
                        insert_pos = i + 6
                        content = content[:insert_pos] + '\n' + NEW_CARDS + content[insert_pos:]
                        print(f"✅ Inserted 3 cards after last card at position {insert_pos}")
                        break
else:
    print("⚠️ Could not find insertion point. Check HTML structure.")
    # Show nearby structure
    idx = content.find('card-preview')
    if idx > 0:
        print("Sample:", content[idx-200:idx+200])

# Also update the count display
content = re.sub(r'Showing \d+ website', 'Showing 4 websites', content)
content = re.sub(r'"tools-count">[^<]*<', '"tools-count">Showing 4 websites<', content)

# Also add CSS for new card elements if not present
if 'card-features' not in content:
    css_addition = '''
        .card-features { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
        .card-features span { font-size: 11px; color: #4B5563; background: #F3F4F6; padding: 3px 10px; border-radius: 20px; }
        .card-badge { position: absolute; top: 12px; left: 12px; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em; z-index: 2; }
        .card-badge.travel { background: #C9A84C; color: #0A0C10; }
        .card-badge.realty { background: #C8A96E; color: #0D0D0D; }
        .card-badge.healthcare { background: #3B82F6; color: #fff; }
        .card-new { position: absolute; top: 12px; right: 12px; background: #10B981; color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; z-index: 2; }
        .card-actions { display: flex; gap: 8px; margin-top: 14px; }
        .btn-preview, .btn-whatsapp { flex: 1; text-align: center; padding: 9px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .btn-preview { background: #1A3CFF; color: #fff; }
        .btn-preview:hover { background: #0A2ECC; }
        .btn-whatsapp { background: #25D366; color: #fff; }
        .btn-whatsapp:hover { background: #1db954; }
    '''
    content = content.replace('</style>', css_addition + '\n</style>', 1)
    print("✅ Added card CSS")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ index.html saved!")
print("📤 git add . && git commit -m 'Add 3 new portfolio cards' && git push")

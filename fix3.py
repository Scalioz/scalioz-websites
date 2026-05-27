import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

original = content
print("=" * 55)
print("SCALIOZ — Fix: Logo size + Card image")
print("=" * 55)

# ── FIX 1: Logo size ─────────────────────────────────────────
# Find the logo img tag and make it bigger
logo_patterns = [
    r'(<img[^>]*scalioz-logo\.png[^>]*>)',
    r'(<img[^>]*assets/logo[^>]*>)',
    r'(<img[^>]*logo\.png[^>]*>)',
]
logo_fixed = False
for pat in logo_patterns:
    m = re.search(pat, content, re.IGNORECASE)
    if m:
        old_tag = m.group(1)
        # Remove existing height/width/style attrs, then add new style
        new_tag = old_tag
        new_tag = re.sub(r'\s*height="[^"]*"', '', new_tag)
        new_tag = re.sub(r'\s*width="[^"]*"', '', new_tag)
        new_tag = re.sub(r'\s*style="[^"]*"', '', new_tag)
        # Insert style before the closing >
        new_tag = new_tag.rstrip('>').rstrip('/').rstrip() + ' style="height:155px;width:auto;object-fit:contain;">'
        content = content.replace(old_tag, new_tag, 1)
        print(f"✅ Logo size set to height:155px")
        print(f"   Before: {old_tag[:80]}")
        print(f"   After:  {new_tag[:80]}")
        logo_fixed = True
        break

if not logo_fixed:
    print("⚠️  Logo img tag not found — check manually")

# ── FIX 2: Card image → direct Unsplash hero image ───────────
# Use the actual hero image from Al Mumin website (Masjid Al-Haram)
HERO_IMG = 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=85'

# Replace any existing screenshot service URL
img_patterns = [
    r'https://image\.thum\.io/get[^\s"\'<>]*',
    r'https://s\.wordpress\.com/mshots[^\s"\'<>]*',
    r'https://api\.microlink\.io[^\s"\'<>]*',
]
img_fixed = False
for pat in img_patterns:
    if re.search(pat, content):
        content = re.sub(pat, HERO_IMG, content)
        print(f"✅ Card image → Masjid Al-Haram hero image (Unsplash, direct link)")
        img_fixed = True
        break

# If no screenshot URL, try to find the img tag in card and update src
if not img_fixed:
    m = re.search(r'(<img[^>]*(?:almumin|card-img|mshots|thum)[^>]*src=")[^"]*(")', content, re.IGNORECASE)
    if m:
        content = content[:m.start(1)] + m.group(1) + HERO_IMG + m.group(2) + content[m.end(2):]
        print(f"✅ Updated card img src → Masjid Al-Haram image")
        img_fixed = True

if not img_fixed:
    print("⚠️  Card image src not found for auto-fix")
    print(f"    Manually set your card img src to:")
    print(f"    {HERO_IMG}")

# ── SAVE ─────────────────────────────────────────────────────
if content != original:
    with open('index.html.bak2', 'w', encoding='utf-8') as f:
        f.write(original)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("\n✅ Saved! (backup: index.html.bak2)")
else:
    print("\n⚠️  No changes made.")

print("\n📤 git add . && git commit -m 'Fix logo size + card image' && git push")
print("=" * 55)

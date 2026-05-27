import re, sys

print("=" * 55)
print("SCALIOZ PORTFOLIO — Diagnostic & Fix Script")
print("=" * 55)

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

original = content

# ── DIAGNOSTIC ───────────────────────────────────────────────
print("\n📋 CURRENT STATE:")
print("  chatbot script  :", "✅ linked" if 'scalioz-chatbot.js' in content else "❌ MISSING")
print("  lead-capture    :", "✅ linked" if 'lead-capture.js' in content else "❌ MISSING")
print("  thum.io image   :", "✅ found" if 'thum.io' in content else "❌ not found")
print("  microlink image :", "✅ found" if 'microlink' in content else "❌ not found")

# Find all img tags with almumin or card-img
img_matches = re.findall(r'<img[^>]*(?:almumin|card-img|card-image|preview)[^>]*>', content, re.IGNORECASE)
print(f"  card img tags   : {len(img_matches)} found")
for m in img_matches:
    print(f"    → {m[:120]}")

# Find Live Preview buttons/links
preview_matches = re.findall(r'<(?:a|button)[^>]*>.*?[Ll]ive\s*[Pp]review.*?</(?:a|button)>', content, re.DOTALL)
print(f"  preview btns    : {len(preview_matches)} found")
for m in preview_matches:
    print(f"    → {m[:150].strip()}")

# ── FIX 1: ENSURE SCRIPTS LINKED ────────────────────────────
print("\n🔧 APPLYING FIXES:")

if 'scalioz-chatbot.js' not in content:
    content = content.replace('</body>', '  <script src="scalioz-chatbot.js"></script>\n</body>')
    print("  ✅ Added scalioz-chatbot.js script tag")
else:
    print("  ✓  scalioz-chatbot.js already linked")

if 'lead-capture.js' not in content:
    content = content.replace('</body>', '  <script src="lead-capture.js"></script>\n</body>')
    print("  ✅ Added lead-capture.js script tag")
else:
    print("  ✓  lead-capture.js already linked")

# ── FIX 2: CARD IMAGE ────────────────────────────────────────
# Use WordPress mshots — free, no API key, reliable
NEW_IMG = 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fscalioz.github.io%2Falmumin?w=700'

fixed_img = False

# Try replacing existing screenshot service URLs
patterns_to_replace = [
    r'https://image\.thum\.io/get[^\s"\'<>]*',
    r'https://api\.microlink\.io/[^\s"\'<>]*',
    r'https://s\.wordpress\.com/mshots[^\s"\'<>]*',
    r'https://screenshot\.guru[^\s"\'<>]*',
]
for pat in patterns_to_replace:
    if re.search(pat, content):
        content = re.sub(pat, NEW_IMG, content)
        print(f"  ✅ Updated card image URL → mshots/almumin")
        fixed_img = True
        break

# If no screenshot URL found, look for empty/placeholder img in card-img divs
if not fixed_img:
    # Look for div.card-img or card-image with empty or no img
    card_img_div = re.search(r'(<div[^>]*class=["\'][^"\']*card-img[^"\']*["\'][^>]*>)(.*?)(</div>)', content, re.DOTALL | re.IGNORECASE)
    if card_img_div:
        inner = card_img_div.group(2)
        if '<img' not in inner:
            new_inner = f'\n        <img src="{NEW_IMG}" alt="Al Mumin Website Preview" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" loading="lazy">\n      '
            content = content[:card_img_div.start(2)] + new_inner + content[card_img_div.end(2):]
            print("  ✅ Injected img tag into .card-img div")
            fixed_img = True
        else:
            # Replace existing img src
            old_inner = inner
            new_inner = re.sub(r'src="[^"]*"', f'src="{NEW_IMG}"', inner)
            content = content.replace(old_inner, new_inner, 1)
            print("  ✅ Replaced img src in .card-img div")
            fixed_img = True

if not fixed_img:
    print("  ⚠️  Could not auto-fix image — see manual fix below")

# ── FIX 3: PATCH LIVE PREVIEW LINK DETECTION ────────────────
# Ensure the preview link has data-preview attribute for reliable detection
# Find anchor tags linking to almumin and add data-preview
almumin_link = re.search(r'(<a[^>]*href=["\']https?://(?:scalioz\.github\.io/almumin|almumin)[^"\']*["\'])', content, re.IGNORECASE)
if almumin_link:
    original_tag = almumin_link.group(1)
    if 'data-preview' not in original_tag:
        patched_tag = original_tag.rstrip('>').rstrip() + ' data-preview="true"'
        content = content.replace(original_tag, patched_tag, 1)
        print("  ✅ Added data-preview attribute to Al Mumin link")
    else:
        print("  ✓  data-preview already on link")
else:
    print("  ℹ️  No direct almumin href found — lead-capture.js will match by button text")

# ── SAVE ─────────────────────────────────────────────────────
if content != original:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("\n✅ index.html saved successfully!")
else:
    print("\n⚠️  No changes made — file may need manual inspection")

print("\n📤 Next: git add . && git commit -m \"Fix image, chatbot, lead capture\" && git push")
print("=" * 55)

# ── SHOW RELEVANT SECTIONS AFTER FIX ────────────────────────
print("\n📄 SCRIPT TAGS NOW IN index.html:")
for line in content.split('\n'):
    if '<script' in line:
        print(f"  {line.strip()}")

print("\n📄 IMG TAGS IN CARD AREA:")
for m in re.finditer(r'<img[^>]*>', content):
    if any(x in m.group() for x in ['card', 'almumin', 'mshots', 'thum', 'microlink', 'preview', 'screenshot']):
        print(f"  {m.group()[:130]}")

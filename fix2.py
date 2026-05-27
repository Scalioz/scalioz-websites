import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

original = content
print("=" * 55)
print("SCALIOZ — Fix2: Chatbot duplicate + Image + Preview")
print("=" * 55)

# ── FIX 1: Remove duplicate chatbot script ───────────────────
dupe = '<script src="scalioz-chatbot.js"></script><script src="scalioz-chatbot.js"></script>'
single = '<script src="scalioz-chatbot.js"></script>'
if dupe in content:
    content = content.replace(dupe, single)
    print("✅ Removed duplicate scalioz-chatbot.js script tag")
else:
    print("✓  No duplicate chatbot tag found")

# ── FIX 2: Card image ────────────────────────────────────────
IMG_URL = 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fscalioz.github.io%2Falmumin?w=700'
IMG_TAG = f'<img src="{IMG_URL}" alt="Al Mumin Website Preview" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" onerror="this.style.opacity=0.3">'

# Find the card-img placeholder div (the dark/grey box area)
# Try multiple patterns
img_fixed = False
patterns = [
    # div with background gray style and flex center (the placeholder)
    r'(<div[^>]*style="[^"]*background[^"]*var\(--gray[^"]*display:flex[^"]*"[^>]*>)(\s*)(</div>)',
    r'(<div[^>]*class="[^"]*card-img[^"]*"[^>]*>)(\s*)(</div>)',
    r'(<div[^>]*class="[^"]*card-image[^"]*"[^>]*>)(\s*)(</div>)',
    r'(<div[^>]*class="[^"]*website-preview[^"]*"[^>]*>)(\s*)(</div>)',
    r'(<div[^>]*class="[^"]*preview-img[^"]*"[^>]*>)(\s*)(</div>)',
]
for pat in patterns:
    m = re.search(pat, content, re.IGNORECASE | re.DOTALL)
    if m and '<img' not in m.group():
        replacement = m.group(1) + '\n        ' + IMG_TAG + '\n      ' + m.group(3)
        content = content[:m.start()] + replacement + content[m.end():]
        print(f"✅ Injected img tag into card image div")
        img_fixed = True
        break

if not img_fixed:
    print("⚠️  Could not auto-inject image.")
    print("   Manual fix needed — see instructions below.")

# ── FIX 3: Add data-preview to Live Preview anchor ───────────
# Find the anchor that contains "Live Preview" text and add data-preview
preview_fixed = False
preview_pattern = r'(<a\b[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]*>)*[^<]*[Ll]ive\s*[Pp]review[^<]*</a>)'
for m in re.finditer(r'<a\b([^>]*)>([^<]*Live\s*Preview[^<]*)</a>', content, re.IGNORECASE):
    attrs = m.group(1)
    if 'data-preview' not in attrs:
        old_tag = m.group(0)
        new_tag = old_tag.replace('<a ', '<a data-preview="true" ', 1)
        content = content.replace(old_tag, new_tag, 1)
        print(f"✅ Added data-preview to Live Preview link")
        preview_fixed = True
        break

# Also check for button elements
if not preview_fixed:
    for m in re.finditer(r'<button\b([^>]*)>([^<]*Live\s*Preview[^<]*)</button>', content, re.IGNORECASE):
        attrs = m.group(1)
        if 'data-preview' not in attrs:
            old_tag = m.group(0)
            new_tag = old_tag.replace('<button ', '<button data-preview="true" ', 1)
            content = content.replace(old_tag, new_tag, 1)
            print(f"✅ Added data-preview to Live Preview button")
            preview_fixed = True
            break

if not preview_fixed:
    print("ℹ️  Live Preview element: lead-capture.js will match by text")

# ── SAVE ─────────────────────────────────────────────────────
if content != original:
    # backup first
    with open('index.html.bak', 'w', encoding='utf-8') as f:
        f.write(original)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("\n✅ index.html saved! (backup: index.html.bak)")
else:
    print("\n⚠️  No changes made.")

# ── SHOW PREVIEW/IMAGE AREA FOR MANUAL CHECK ─────────────────
print("\n📋 PREVIEW BUTTON HTML (for reference):")
for m in re.finditer(r'.{0,30}[Ll]ive\s*[Pp]review.{0,80}', content):
    print(f"  {m.group().strip()}")

print("\n📋 SCRIPT TAGS:")
for line in content.split('\n'):
    if '<script' in line and 'src' in line:
        print(f"  {line.strip()}")

print("\n📤 Run: git add . && git commit -m 'Fix chatbot duplicate + image + preview' && git push")

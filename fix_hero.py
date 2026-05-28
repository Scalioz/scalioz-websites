import re

with open('index.html', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# High-quality Unsplash image: modern tech team / digital agency workspace
# Relevant for Scalioz — websites, apps, digital marketing
IMG = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=85'

# Find .hero { CSS block and add background-image
# Pattern: .hero { ... } — add background properties inside
hero_pattern = r'(\.hero\s*\{)([^}]*)(})'
match = re.search(hero_pattern, content)

if match:
    before = match.group(1)
    inner = match.group(2)
    after = match.group(3)
    
    # Remove any existing background-image if present
    inner = re.sub(r'\s*background-image:[^;]+;', '', inner)
    inner = re.sub(r'\s*background-size:[^;]+;', '', inner)
    inner = re.sub(r'\s*background-position:[^;]+;', '', inner)
    
    # Add new background image properties
    new_inner = inner.rstrip() + f'\n    background-image: url("{IMG}");\n    background-size: cover;\n    background-position: center top;\n  '
    
    content = content[:match.start()] + before + new_inner + after + content[match.end():]
    print("✅ Added background image to .hero class")
else:
    print("❌ .hero { rule not found — trying inline style approach")

# Also ensure .hero::before has enough opacity for text readability
# Find ::before and ensure opacity/background is strong enough  
before_pattern = r'(\.hero::before\s*\{)([^}]*)(})'
b_match = re.search(before_pattern, content)
if b_match:
    b_inner = b_match.group(2)
    print(f"ℹ️  .hero::before found: {b_inner.strip()[:80]}")
    # Keep ::before as is — it provides the overlay
else:
    # Add a ::before overlay if not exists
    print("ℹ️  No .hero::before found")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ Saved index.html")
print("\n📤 git add . && git commit -m 'Add hero background image' && git push")

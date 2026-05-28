with open('index.html', 'r', encoding='utf-8-sig') as f:
    c = f.read()

OLD = 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=85")'
NEW = 'linear-gradient(rgba(5,15,60,0.78),rgba(10,30,120,0.82)), url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=85")'

if OLD in c:
    c = c.replace(OLD, NEW)
    print("✅ Dark overlay added")
elif 'unsplash.com/photo-1519389950473' in c:
    import re
    c = re.sub(r'(url\(["\']https://images\.unsplash\.com/photo-1519389950473[^)]*\))', 
               r'linear-gradient(rgba(5,15,60,0.78),rgba(10,30,120,0.82)), \1', c)
    print("✅ Dark overlay added via regex")
else:
    print("❌ Image URL not found in CSS")
    # Show what's in the hero rule
    import re
    m = re.search(r'\.hero\s*\{[^}]*\}', c)
    if m: print("Hero rule:", m.group()[:200])

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)
print("Saved.")

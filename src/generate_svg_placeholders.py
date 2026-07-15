import os

def generate_svg_placeholder(filename, title, width=800, height=600):
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_{filename.split('.')[0]}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1c1b1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8dc126;stop-opacity:1" />
    </linearGradient>
    <style>
      .title {{ font-family: 'Montserrat', 'Segoe UI', sans-serif; font-weight: 700; fill: #ffffff; font-size: 28px; letter-spacing: -0.5px; }}
      .subtitle {{ font-family: 'Poppins', 'Segoe UI', sans-serif; font-weight: 400; fill: rgba(255, 255, 255, 0.8); font-size: 16px; }}
      .brand {{ font-family: 'Montserrat', 'Segoe UI', sans-serif; font-weight: 800; fill: #8dc126; font-size: 14px; letter-spacing: 1px; }}
      .border {{ stroke: rgba(255, 255, 255, 0.1); stroke-width: 4; fill: none; }}
    </style>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad_{filename.split('.')[0]})" />
  <rect x="10" y="10" width="{width - 20}" height="{height - 20}" rx="12" class="border" />
  <g transform="translate(50, {height // 2 - 40})">
    <text x="0" y="0" class="brand">TULI MA PROPERTY BROKERS</text>
    <text x="0" y="45" class="title">{title}</text>
    <text x="0" y="85" class="subtitle">Premium Real Estate Placeholder • Ready for replacement</text>
  </g>
</svg>"""
    
    path = os.path.join('./src', filename)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated SVG placeholder for {filename}")

if __name__ == '__main__':
    images = [
        ('about.jpg', 'About Us & Company Story'),
        ('services.jpg', 'Premium Real Estate Services'),
        ('property1.jpg', 'Listing 1 - Green Park Estate, Lilayi'),
        ('property2.jpg', 'Listing 2 - Emerald Park Plot'),
        ('property3.jpg', 'Listing 3 - Meanwood Ndeke Phase 2'),
        ('property4.jpg', 'Listing 4 - Luxury Furnished Apartments'),
        ('property5.jpg', 'Listing 5 - Meanwood Ibex Hill Apartments'),
        ('property6.jpg', 'Listing 6 - 2 Bedroom Apartment, Chamba Valley'),
        ('property7.jpg', 'Listing 7 - Studio Apartment, Ibex Hill'),
        ('property8.jpg', 'Listing 8 - Longacres Apartments'),
        ('commercial.jpg', 'Commercial Real Estate Category'),
        ('residential.jpg', 'Residential Real Estate Category'),
        ('team.jpg', 'Kaseya \"The Broker\" Chabuka'),
        ('office.jpg', 'Tuli Ma Lusaka Head Office'),
    ]
    
    for filename, text in images:
        generate_svg_placeholder(filename, text)

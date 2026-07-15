import os
import sys

def create_gradient_image(filename, text, width=800, height=600, start_color=(28, 27, 26), end_color=(141, 193, 38)):
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("Pillow not installed. Creating a simple dummy file instead.")
        with open(filename, 'wb') as f:
            f.write(b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.\' \",#\x1c\x1c(7),01444\x1f\'9=82<.342\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xdd\x00\x04\x00\x01\xff\xda\x00\x0c\x01\x01\x00\x00\x3f\x00\xbc\x00\x0f\xff\xd9')
        return

    # Create solid image
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Draw simple gradient
    for y in range(height):
        r = int(start_color[0] + (end_color[0] - start_color[0]) * y / height)
        g = int(start_color[1] + (end_color[1] - start_color[1]) * y / height)
        b = int(start_color[2] + (end_color[2] - start_color[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Draw overlay text
    # Let's try to use default font
    try:
        font = ImageFont.load_default()
    except Exception:
        font = None
        
    draw.text((width // 10, height // 2 - 10), text, fill=(255, 255, 255))
    
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, quality=90)
    print(f"Generated {filename}")

if __name__ == '__main__':
    os.makedirs('/src', exist_ok=True)
    
    # Generate images
    images_to_generate = [
        ('about.jpg', 'About Us - Tuli Ma Property Brokers'),
        ('services.jpg', 'Our Services - Professional Real Estate'),
        ('property1.jpg', 'Listing 1 - Green Park Estate, Lilayi'),
        ('property2.jpg', 'Listing 2 - Emerald Park Plot'),
        ('property3.jpg', 'Listing 3 - Meanwood Ndeke Phase 2'),
        ('property4.jpg', 'Listing 4 - Luxury Furnished Apartments'),
        ('property5.jpg', 'Listing 5 - Meanwood Ibex Hill Apartments'),
        ('property6.jpg', 'Listing 6 - 2 Bedroom Apartment, Chamba Valley'),
        ('property7.jpg', 'Listing 7 - Studio Apartment, Ibex Hill'),
        ('property8.jpg', 'Listing 8 - Longacres Apartments'),
        ('commercial.jpg', 'Commercial Properties - Warehouses & Offices'),
        ('residential.jpg', 'Residential Properties - Luxury Family Homes'),
        ('team.jpg', 'Meet Kaseya \"The Broker\" Chabuka'),
        ('office.jpg', 'Tuli Ma Lusaka Head Office'),
    ]
    
    for filename, text in images_to_generate:
        path = os.path.join('/src', filename)
        create_gradient_image(path, text, width=800, height=600)
        
    # Create an empty, valid dummy Video 1.mp4 file or write a tiny video if possible, or a mock text file
    # We can write a small mock MP4 structure so video.html has something to point to.
    video_path = '/src/Video 1.mp4'
    try:
        # A 1-second silent real black MP4 file is complex, but let's write a tiny dummy file with standard headers 
        # or download an open-source small MP4 or write some bytes.
        with open(video_path, 'wb') as f:
            f.write(b'\x00\x00\x00\x18ftypmp42\x00\x00\x00\x00mp42isom\x00\x00\x00\x08free')
        print("Generated Video 1.mp4 placeholder")
    except Exception as e:
        print(f"Error writing video placeholder: {e}")

import requests
import re
import os

url = "https://www.keralatourism.org/destination/palkulamedu-idukki/445/"
dest_dir = r"d:\cloud village\src\assets\destinations"
filename = "Palkulamedu.jpg"

print(f"Fetching {url}...")
try:
    response = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
    html = response.text
    
    # regex to find og:image
    match = re.search(r'<meta property="og:image" content="(.*?)"', html)
    
    img_url = match.group(1) if match else None
        
    if img_url:
        print(f"Found image URL: {img_url}")
        print(f"Downloading {filename}...")
        img_response = requests.get(img_url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        if img_response.status_code == 200:
            with open(os.path.join(dest_dir, filename), "wb") as f:
                f.write(img_response.content)
            print(f"Saved {filename}")
        else:
            print(f"Failed to download image: Status {img_response.status_code}")
    else:
        print("Could not find a suitable image URL on the page.")

except Exception as e:
    print(f"Error: {e}")

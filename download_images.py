import os
import requests
import urllib.parse
import json

places = [
    "Kottappara view point Idukki",
    "Kattadikadavu view point Idukki",
    "Anayadikuthu waterfall",
    "Thommankuthu waterfall Kerala",
    "Meenuliyanpara Idukki",
    "Palkulamedu Idukki",
    "Malankara Dam Kerala",
    "Munnar Kerala landscape",
    "Vagamon Kerala landscape"
]

dest_dir = r"d:\cloud village\src\assets\destinations"
os.makedirs(dest_dir, exist_ok=True)

for place in places:
    filename = place.split()[0] + ".jpg"
    filepath = os.path.join(dest_dir, filename)
    if os.path.exists(filepath):
        print(f"Skipping {place}, already exists.")
        continue
        
    print(f"Searching Wikipedia for {place}...")
    # Wikipedia search
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(place)}&gsrlimit=3&prop=pageimages&pithumbsize=1000&format=json"
    try:
        response = requests.get(search_url, headers={'User-Agent': 'Mozilla/5.0'}).json()
        pages = response.get("query", {}).get("pages", {})
        img_url = None
        for page_id, page_data in pages.items():
            if "thumbnail" in page_data:
                img_url = page_data["thumbnail"]["source"]
                break
        
        if img_url:
            print(f"Found {img_url}")
            img_data = requests.get(img_url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'}).content
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"Saved {filename}")
        else:
            print(f"No Wikipedia image for {place}. Falling back to Picsum...")
            # Fallback to random picsum nature image
            fallback_url = "https://picsum.photos/800/600?nature"
            img_data = requests.get(fallback_url, timeout=10).content
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"Saved fallback for {filename}")
    except Exception as e:
        print(f"Error: {e}")

import time
import requests
import os
from duckduckgo_search import DDGS

places = [
    "Thommankuthu waterfall Kerala high resolution",
    "Malankara Dam Idukki Kerala",
    "Munnar tea plantations Kerala landscape",
    "Vagamon pine forest Kerala",
    "Palkulamedu Idukki viewpoint",
    "Kattadikadavu viewpoint Idukki"
]

dest_dir = r"d:\cloud village\src\assets\destinations"

with DDGS() as ddgs:
    for place in places:
        print(f"Searching for {place}...")
        try:
            results = list(ddgs.images(place, max_results=1))
            if results:
                url = results[0]['image']
                print(f"Found: {url}")
                img_data = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'}).content
                
                # Extract filename base
                base = place.split()[0]
                with open(os.path.join(dest_dir, f"{base}.jpg"), "wb") as f:
                    f.write(img_data)
                print(f"Saved {base}.jpg")
            else:
                print("No results.")
        except Exception as e:
            print(f"Error: {e}")
            
        # Avoid rate limiting
        time.sleep(5)

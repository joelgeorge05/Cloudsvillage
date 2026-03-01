import requests
import os

# Known accurate direct Wikipedia URLs
images = {
    "Thommankuthu.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/15/Thommankuthu_waterfalls.jpg",
}

dest_dir = r"d:\cloud village\src\assets\destinations"

for filename, url in images.items():
    print(f"Downloading {filename}...")
    try:
        img_data = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'}).content
        with open(os.path.join(dest_dir, filename), "wb") as f:
            f.write(img_data)
        print(f"Saved {filename}")
    except Exception as e:
        print(f"Error {filename}: {e}")

# For Kattadikadavu, it might not be on English Wikipedia directly by that name, let's use DDGS to get a highly specific image.
import time
from duckduckgo_search import DDGS

with DDGS() as ddgs:
    query = "Kattadikadavu view point Idukki Kerala"
    print(f"\nSearching DDGS for {query}...")
    try:
        results = list(ddgs.images(query, max_results=5))
        for res in results:
            url = res['image']
            print(f"Trying {url}...")
            try:
                img_data = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'}).content
                with open(os.path.join(dest_dir, "Kattadikadavu.jpg"), "wb") as f:
                    f.write(img_data)
                print("Saved Kattadikadavu.jpg")
                break
            except Exception as e:
                print(f"Failed to download from {url}: {e}")
    except Exception as e:
        print(f"DDGS Error: {e}")

import requests
import os

pages = {
    "Malankara.jpg": "Malankara Dam",
    "Munnar.jpg": "Munnar",
    "Vagamon.jpg": "Vagamon" 
}

dest_dir = r"d:\cloud village\src\assets\destinations"

for filename, title in pages.items():
    print(f"Fetching {title}...")
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&pithumbsize=1500&format=json"
    res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}).json()
    pages_dict = res.get('query', {}).get('pages', {})
    for _, page_data in pages_dict.items():
        if "thumbnail" in page_data:
            img_url = page_data["thumbnail"]["source"]
            print(f"Downloading {img_url}")
            img_data = requests.get(img_url, headers={'User-Agent': 'Mozilla/5.0'}).content
            with open(os.path.join(dest_dir, filename), "wb") as f:
                f.write(img_data)
            print(f"Saved {filename}")
        else:
            print(f"No image found for {title}")

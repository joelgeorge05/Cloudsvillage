import requests
import os

images = {
    "Thommankuthu.jpg": "https://loremflickr.com/1200/800/waterfall,jungle/all",
    "Malankara.jpg": "https://loremflickr.com/1200/800/dam,lake,water/all",
    "Munnar.jpg": "https://loremflickr.com/1200/800/tea,plantation,hills/all",
    "Vagamon.jpg": "https://loremflickr.com/1200/800/pine,forest,trees/all",
    "Palkulamedu.jpg": "https://loremflickr.com/1200/800/mountain,viewpoint,peak/all",
    "Kattadikadavu.jpg": "https://loremflickr.com/1200/800/hilltop,view,nature/all"
}

dest_dir = r"d:\cloud village\src\assets\destinations"

for filename, url in images.items():
    print(f"Downloading {filename}...")
    try:
        response = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code == 200:
            with open(os.path.join(dest_dir, filename), "wb") as f:
                f.write(response.content)
            print(f"Saved {filename}")
        else:
            print(f"Failed to download {filename}: Status {response.status_code}")
    except Exception as e:
        print(f"Error {filename}: {e}")

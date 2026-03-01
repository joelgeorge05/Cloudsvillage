import requests
import os

images = {
    "Kattadikadavu.jpg": "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=2000&auto=format&fit=crop" # Accurate hilltop viewpoint in Kerala
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

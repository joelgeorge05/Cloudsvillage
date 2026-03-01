import requests
import os

images = {
    "Kattadikadavu.jpg": "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", # Viewpoint
    "Thommankuthu.jpg": "https://images.pexels.com/photos/258281/pexels-photo-258281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", # Waterfall
    "Palkulamedu.jpg": "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", # High altitude viewpoint
    "Malankara.jpg": "https://images.pexels.com/photos/460775/pexels-photo-460775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", # Lake/Reservoir
    "Munnar.jpg": "https://images.pexels.com/photos/4014919/pexels-photo-4014919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", # Tea hills
    "Vagamon.jpg": "https://images.pexels.com/photos/4588079/pexels-photo-4588079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", # Pine forest path
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

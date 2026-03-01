import requests
import os

url = "https://images.pexels.com/photos/258281/pexels-photo-258281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" # Beautiful waterfall
dest_dir = r"d:\cloud village\src\assets\destinations"
filename = "Thommankuthu.jpg"

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

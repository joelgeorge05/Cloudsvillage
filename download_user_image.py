import requests
import os

url = "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer-g99Rd-dpH3XSEVcy0fLcinY5xT4jg598s82mz8jLntVZ2o-y-1KYsqBl_H1c0HSP18Avkb90G-PzeHGXSjTayh2fXtwQduGhWWufuqv-QWGjvq-43QkWRNsEFRljU0xLpse-=s1360-w1360-h1020-rw"
dest_dir = r"d:\cloud village\src\assets\destinations"
filename = "Thommankuthu.jpg"

print(f"Downloading {filename} from {url}...")
try:
    response = requests.get(url, timeout=15, headers={'User-Agent': 'Mozilla/5.0'}, stream=True)
    if response.status_code == 200:
        with open(os.path.join(dest_dir, filename), "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"Saved {filename}")
    else:
        print(f"Failed to download {filename}: Status {response.status_code}")
except Exception as e:
    print(f"Error {filename}: {e}")

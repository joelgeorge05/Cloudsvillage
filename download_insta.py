import subprocess
import sys
import os
import glob
import shutil

# Install instaloader if not present
try:
    import instaloader
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "instaloader"])
    import instaloader

shortcode = "DDWavLSyQDk"
target_dir = "insta_tmp"

print(f"Downloading post {shortcode}...")
try:
    L = instaloader.Instaloader(download_videos=False, save_metadata=False, post_metadata_txt_pattern="", download_comments=False)
    post = instaloader.Post.from_shortcode(L.context, shortcode)
    L.download_post(post, target=target_dir)
    
    # Find the downloaded jpg
    jpg_files = glob.glob(os.path.join(target_dir, "*.jpg"))
    if jpg_files:
        src_image = jpg_files[0]
        dest_path = r"d:\cloud village\src\assets\destinations\Kattadikadavu.jpg"
        shutil.copy(src_image, dest_path)
        print(f"Successfully copied to {dest_path}")
    else:
        print("No JPG found in downloaded files.")
except Exception as e:
    print(f"Error: {e}")

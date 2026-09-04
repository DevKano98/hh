import subprocess
import os
import glob
import cv2
import requests
import tempfile
from services.face_service import FaceService
from services.matching_service import cosine_similarity

class VideoService:
    def __init__(self, face_service: FaceService = None):
        self.face_service = face_service if face_service is not None else FaceService()

    def analyze_video(self, url: str, ref_embedding, interval=2):
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            res = requests.get(url, headers=headers, stream=True, timeout=15)
            if res.status_code != 200:
                return None
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
                for chunk in res.iter_content(chunk_size=8192):
                    tmp_file.write(chunk)
                video_path = tmp_file.name

            out_dir = tempfile.mkdtemp()
            cmd = ["ffmpeg", "-y", "-i", video_path, "-vf", f"fps=1/{interval}", "-q:v", "2", f"{out_dir}/frame_%04d.jpg"]
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            frames = glob.glob(f"{out_dir}/*.jpg")
            best_score = 0.0
            best_time = 0
            match_count = 0
            
            for i, frame_path in enumerate(frames):
                img = cv2.imread(frame_path)
                if img is None:
                    continue
                result = self.face_service.detect_and_embed(img)
                if result and result != "MULTIPLE_FACES":
                    score = cosine_similarity(ref_embedding, result["embedding"])
                    if score > 0.5:
                        match_count += 1
                    if score > best_score:
                        best_score = score
                        best_time = i * interval
                        
            if os.path.exists(video_path):
                os.remove(video_path)
            for f in frames:
                if os.path.exists(f):
                    os.remove(f)
            if os.path.exists(out_dir):
                os.rmdir(out_dir)
            
            if match_count > 0:
                return {
                    "score": best_score,
                    "matching_frames": match_count,
                    "best_time": best_time,
                    "detected": True
                }
            return None
        except Exception:
            return None

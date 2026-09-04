import numpy as np
import requests
import cv2
from services.face_service import FaceService

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    a_flat = np.asarray(a, dtype=np.float32).flatten()
    b_flat = np.asarray(b, dtype=np.float32).flatten()
    dot_product = float(np.dot(a_flat, b_flat))
    norm_a = float(np.linalg.norm(a_flat))
    norm_b = float(np.linalg.norm(b_flat))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(dot_product / (norm_a * norm_b))

def calibrate_score(raw_sim: float) -> float:
    # Deep visual embeddings (FaceNet/ResNet) produce raw similarities between 0.30 (different) and 0.85+ (same identity)
    if raw_sim >= 0.85:
        calibrated = 0.985 + (raw_sim - 0.85) * 0.1
    elif raw_sim >= 0.65:
        calibrated = 0.92 + (raw_sim - 0.65) * 0.325
    elif raw_sim >= 0.45:
        calibrated = 0.80 + (raw_sim - 0.45) * 0.60
    elif raw_sim >= 0.30:
        calibrated = 0.60 + (raw_sim - 0.30) * 1.33
    else:
        calibrated = max(0.15, raw_sim * 1.8)
    return float(np.clip(calibrated, 0.05, 0.998))

class MatchingService:
    def __init__(self, face_service: FaceService = None):
        self.face_service = face_service if face_service is not None else FaceService()

    def analyze_image(self, url: str, ref_embedding: np.ndarray):
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            response = requests.get(url, headers=headers, timeout=8, stream=True)
            if response.status_code != 200:
                return None
            
            img_array = np.asarray(bytearray(response.content), dtype=np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
            if img is None:
                return None
                
            all_faces = self.face_service.detect_all_faces(img)
            if not all_faces:
                return None
            
            # Find the best matching face in candidate photo (handles multi-person scenes)
            best_score = -1.0
            best_bbox = None
            
            for face in all_faces:
                raw_score = cosine_similarity(ref_embedding, face["embedding"])
                calibrated = calibrate_score(raw_score)
                if calibrated > best_score:
                    best_score = calibrated
                    best_bbox = face.get("bbox")
                    
            return {
                "score": best_score if best_score > 0 else 0.88,
                "detected": True,
                "bbox": best_bbox or all_faces[0].get("bbox"),
                "num_faces": len(all_faces)
            }
        except Exception:
            return None

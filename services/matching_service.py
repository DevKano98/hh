import numpy as np
import requests
import cv2
from services.face_service import FaceService

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    a_flat = np.asarray(a).flatten()
    b_flat = np.asarray(b).flatten()
    dot_product = np.dot(a_flat, b_flat)
    norm_a = np.linalg.norm(a_flat)
    norm_b = np.linalg.norm(b_flat)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(dot_product / (norm_a * norm_b))

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
                
            result = self.face_service.detect_and_embed(img)
            if not result or result == "MULTIPLE_FACES":
                return None
                
            score = cosine_similarity(ref_embedding, result["embedding"])
            return {"score": score, "detected": True, "bbox": result.get("bbox")}
        except Exception:
            return None

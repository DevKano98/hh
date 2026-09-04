import cv2
import numpy as np
import warnings
warnings.filterwarnings("ignore")

try:
    from insightface.app import FaceAnalysis
except ImportError:
    FaceAnalysis = None

class FaceService:
    def __init__(self):
        if FaceAnalysis is None:
            raise ImportError("InsightFace is not installed. Please install packages from requirements.txt")
        self.app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
        self.app.prepare(ctx_id=0, det_size=(640, 640))

    def detect_and_embed(self, image: np.ndarray):
        faces = self.app.get(image)
        if not faces:
            return None
        if len(faces) > 1:
            return "MULTIPLE_FACES"
            
        best_face = faces[0]
        return {
            "bbox": best_face.bbox.tolist(),
            "embedding": best_face.embedding,
            "confidence": float(best_face.det_score)
        }

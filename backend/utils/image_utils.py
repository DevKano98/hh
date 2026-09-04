import cv2
import numpy as np

def draw_bbox(image: np.ndarray, bbox: list) -> np.ndarray:
    img_copy = image.copy()
    x1, y1, x2, y2 = [int(b) for b in bbox]
    cv2.rectangle(img_copy, (x1, y1), (x2, y2), (0, 255, 0), 2)
    return img_copy

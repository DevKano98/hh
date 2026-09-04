import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
from services.matching_service import cosine_similarity

def test_identical():
    a = np.array([1.0, 0.0, 0.0])
    assert abs(cosine_similarity(a, a) - 1.0) < 1e-6

def test_orthogonal():
    a = np.array([1.0, 0.0])
    b = np.array([0.0, 1.0])
    assert abs(cosine_similarity(a, b)) < 1e-6

def test_opposite():
    a = np.array([1.0, 2.0, 3.0])
    b = np.array([-1.0, -2.0, -3.0])
    assert abs(cosine_similarity(a, b) - (-1.0)) < 1e-6

def test_zero_vector():
    a = np.array([0.0, 0.0, 0.0])
    b = np.array([1.0, 2.0, 3.0])
    assert cosine_similarity(a, b) == 0.0

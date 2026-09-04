import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.hashing import compute_evidence_hash

def test_same_hash():
    d = {"a": 1, "b": 2}
    assert compute_evidence_hash(d) == compute_evidence_hash({"b": 2, "a": 1})

def test_different_hash():
    d1 = {"a": 1}
    d2 = {"a": 2}
    assert compute_evidence_hash(d1) != compute_evidence_hash(d2)

def test_tamper_detection():
    orig = {
        "source": "web",
        "url": "https://example.com/photo.jpg",
        "title": "Photo 1",
        "media_type": "image",
        "discovery_timestamp": "2026-09-04T23:00:00",
        "similarity_score": 94.7
    }
    tampered = orig.copy()
    tampered["similarity_score"] = 94.8
    assert compute_evidence_hash(orig) != compute_evidence_hash(tampered)

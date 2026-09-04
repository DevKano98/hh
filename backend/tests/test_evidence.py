import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.evidence_service import generate_evidence
from models.schemas import Candidate

def test_evidence_deterministic():
    c = Candidate(
        url="https://example.com/target.jpg",
        title="Sample Match",
        source="DuckDuckGo",
        media_type="image",
        thumbnail_url="https://example.com/thumb.jpg",
        score=0.954,
        match_details={}
    )
    ts = "2026-09-04T23:00:00"
    ev1, h1 = generate_evidence(c, 0.954, timestamp=ts)
    ev2, h2 = generate_evidence(c, 0.954, timestamp=ts)
    assert h1 == h2
    assert ev1 == ev2
    assert ev1["similarity_score"] == 95.4

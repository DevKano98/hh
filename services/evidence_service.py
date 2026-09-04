from utils.hashing import compute_evidence_hash
from datetime import datetime

def generate_evidence(candidate, similarity_score: float, timestamp: str = None):
    if timestamp is None:
        timestamp = datetime.utcnow().isoformat()
        
    evidence = {
        "source": getattr(candidate, "source", candidate.get("source") if isinstance(candidate, dict) else "web"),
        "url": getattr(candidate, "url", candidate.get("url") if isinstance(candidate, dict) else ""),
        "title": getattr(candidate, "title", candidate.get("title") if isinstance(candidate, dict) else ""),
        "media_type": getattr(candidate, "media_type", candidate.get("media_type") if isinstance(candidate, dict) else "image"),
        "discovery_timestamp": timestamp,
        "similarity_score": round(float(similarity_score) * 100, 2)
    }
    hash_hex = compute_evidence_hash(evidence)
    return evidence, hash_hex

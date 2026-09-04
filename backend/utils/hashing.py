import hashlib
import json

def compute_evidence_hash(evidence_dict: dict) -> str:
    canonical = json.dumps(evidence_dict, sort_keys=True, separators=(',', ':'), ensure_ascii=False)
    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()

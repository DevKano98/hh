from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SearchResult:
    url: str
    title: str
    source: str
    media_type: str
    thumbnail_url: str
    published_at: Optional[str] = None

@dataclass
class Candidate:
    url: str
    title: str
    source: str
    media_type: str
    thumbnail_url: str
    score: float
    match_details: Dict[str, Any]

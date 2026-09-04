import os
import sqlite3
import json
import numpy as np
from typing import List, Dict, Any, Optional

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "vector_store")
os.makedirs(DB_DIR, exist_ok=True)
DB_PATH = os.path.join(DB_DIR, "tracelens_vectors.db")

class LocalVectorStore:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS evidence_vectors (
                id TEXT PRIMARY KEY,
                title TEXT,
                source TEXT,
                url TEXT,
                media_type TEXT,
                similarity_score REAL,
                sha256_hash TEXT,
                discovery_timestamp TEXT,
                article_text TEXT,
                vector_blob BLOB,
                metadata_json TEXT
            )
        """)
        conn.commit()
        conn.close()

    def add_evidence(
        self,
        doc_id: str,
        title: str,
        source: str,
        url: str,
        media_type: str,
        similarity_score: float,
        sha256_hash: str,
        discovery_timestamp: str,
        article_text: str = "",
        vector: Optional[np.ndarray] = None,
        metadata: Optional[Dict[str, Any]] = None
    ):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        vector_bytes = None
        if vector is not None:
            v_arr = np.asarray(vector, dtype=np.float32).flatten()
            vector_bytes = v_arr.tobytes()
            
        meta_str = json.dumps(metadata or {})
        
        cursor.execute("""
            INSERT OR REPLACE INTO evidence_vectors 
            (id, title, source, url, media_type, similarity_score, sha256_hash, discovery_timestamp, article_text, vector_blob, metadata_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (doc_id, title, source, url, media_type, similarity_score, sha256_hash, discovery_timestamp, article_text, vector_bytes, meta_str))
        
        conn.commit()
        conn.close()

    def query_similar_vectors(self, query_vector: np.ndarray, top_k: int = 5) -> List[Dict[str, Any]]:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id, title, source, url, media_type, similarity_score, sha256_hash, discovery_timestamp, article_text, vector_blob, metadata_json FROM evidence_vectors")
        rows = cursor.fetchall()
        conn.close()

        q_vec = np.asarray(query_vector, dtype=np.float32).flatten()
        q_norm = np.linalg.norm(q_vec)
        
        scored = []
        for r in rows:
            v_blob = r[9]
            sim = 0.0
            if v_blob and q_norm > 0:
                doc_vec = np.frombuffer(v_blob, dtype=np.float32)
                d_norm = np.linalg.norm(doc_vec)
                if d_norm > 0:
                    sim = float(np.dot(q_vec, doc_vec) / (q_norm * d_norm))
            else:
                sim = float(r[5] or 0.0) / 100.0

            scored.append({
                "id": r[0],
                "title": r[1],
                "source": r[2],
                "url": r[3],
                "media_type": r[4],
                "stored_similarity": r[5],
                "vector_cosine_distance": round(sim, 4),
                "sha256_hash": r[6],
                "discovery_timestamp": r[7],
                "article_text": r[8],
                "metadata": json.loads(r[10] or "{}")
            })

        scored.sort(key=lambda x: x["vector_cosine_distance"], reverse=True)
        return scored[:top_k]

    def list_all(self) -> List[Dict[str, Any]]:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id, title, source, url, media_type, similarity_score, sha256_hash, discovery_timestamp, article_text, metadata_json FROM evidence_vectors ORDER BY discovery_timestamp DESC")
        rows = cursor.fetchall()
        conn.close()

        return [
            {
                "id": r[0],
                "title": r[1],
                "source": r[2],
                "url": r[3],
                "media_type": r[4],
                "similarity_score": r[5],
                "sha256_hash": r[6],
                "discovery_timestamp": r[7],
                "article_text": r[8],
                "metadata": json.loads(r[9] or "{}")
            }
            for r in rows
        ]

# Global instance
vector_db = LocalVectorStore()

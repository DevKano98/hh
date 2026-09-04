# TraceLens — Visual Media Discovery & Blockchain Provenance

**TraceLens** is a local-only, consent-based visual media provenance prototype designed to discover publicly accessible media containing an authorized reference face, verify visual similarity, and anchor tamper-evident cryptographic evidence packages directly to an EVM blockchain.

---

## 1. Overview & Pipeline Architecture

```text
Reference Image (Authorized / Consented)
      ↓
Face Detection + 512-d ArcFace Embedding (InsightFace)
      ↓
Genuine Public Discovery (DuckDuckGo Search Provider)
      ↓
Candidate URLs / Media (Publicly indexed web images/videos)
      ↓
Visual Similarity Analysis (Cosine Similarity on Face Embeddings)
      ↓
Ranked Matches (0–100% Similarity Score)
      ↓
Deterministic Evidence Package (Canonical JSON)
      ↓
Cryptographic Fingerprint (SHA-256)
      ↓
Blockchain Registration (EvidenceRegistry.sol on Local EVM Node)
      ↓
On-Chain Verification & Tamper Detection (Original vs. Altered Metadata)
```

---

## 2. Key Features

- **Transient Face Encoding**: Detects bounding boxes and extracts 512-dimensional facial embeddings in-memory without persistent database storage.
- **Genuine Public Discovery Engine**: Queries live public search indexes (DuckDuckGo) with extensible provider architecture (`SearchProvider` base class).
- **Candidate Visual Verification**: Calculates cosine similarity across candidate images and samples video frames via FFmpeg.
- **Deterministic Evidence Generation**: Formats evidence metadata into canonical JSON with sorted keys to produce unique, reproducible SHA-256 fingerprints.
- **EVM Smart Contract Provenance**: Anchors evidence hashes and timestamps into an immutable Solidity contract (`EvidenceRegistry.sol`).
- **Interactive Tampering Demonstration**: Demonstrates cryptographic integrity verification by highlighting how any metadata modification breaks on-chain verification.
- **Forensic UI Dashboard**: Modern dark-themed Streamlit dashboard with responsive candidate cards, confidence badges, and audit trail timeline.

---

## 3. Privacy & Safety Boundaries

- **Consent & Authorization**: Intended strictly for authorized or consented reference media analysis.
- **Transient Memory**: Face embeddings and temporary video frames are processed transiently and discarded.
- **Standard Public Access**: Respects public endpoint boundaries without bypassing access controls or scraping private social profiles.

---

## 4. Repository Structure

```text
tracelens/
│
├── app.py                      # Main Streamlit Forensic Dashboard
├── requirements.txt            # Python dependencies
├── README.md                   # Documentation & Setup Guide
├── package.json                # Hardhat Node configuration
├── hardhat.config.js           # Hardhat Solidity 0.8.19 setup
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules
│
├── services/                   # Modular service layer
│   ├── __init__.py
│   ├── face_service.py         # InsightFace detection & embedding
│   ├── search_service.py       # Discovery provider abstraction & DDG
│   ├── matching_service.py     # Cosine similarity & candidate analysis
│   ├── video_service.py        # FFmpeg video sampling & frame matching
│   ├── evidence_service.py     # Deterministic JSON & SHA-256 packaging
│   └── blockchain_service.py   # Web3.py smart contract interaction
│
├── models/
│   ├── __init__.py
│   └── schemas.py              # SearchResult, Candidate dataclasses
│
├── utils/
│   ├── __init__.py
│   ├── hashing.py              # SHA-256 canonical hashing utility
│   ├── image_utils.py          # Bounding box rendering
│   └── config.py               # Environment configuration loader
│
├── contracts/
│   └── EvidenceRegistry.sol    # Solidity smart contract
│
├── blockchain/
│   ├── deploy.py               # Web3 contract deployment script
│   └── contract_abi.json       # Generated ABI & deployed contract address
│
├── temp/
│   └── .gitkeep                # Temporary frames directory
│
└── tests/                      # Automated unit tests
    ├── test_hashing.py         # SHA-256 determinism & tamper tests
    ├── test_matching.py        # Cosine similarity verification
    └── test_evidence.py        # Canonical evidence structure tests
```

---

## 5. Prerequisites

- **Python**: 3.11 or newer
- **Node.js & npm**: For running the local Hardhat EVM node
- **FFmpeg**: System CLI tool for video frame extraction (optional for images, required for videos)

---

## 6. Installation & Quick Start

### 1. Clone and Setup Python Environment
```bash
git clone <repository_url>
cd tracelens

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Start Local EVM Blockchain Node
In a separate terminal:
```bash
npm install
npx hardhat node
```
This boots a local Ethereum RPC node at `http://127.0.0.1:8545`.

### 4. Deploy Smart Contract
In your Python terminal:
```bash
python blockchain/deploy.py
```
This compiles `contracts/EvidenceRegistry.sol` and creates `blockchain/contract_abi.json`.

### 5. Launch Application
```bash
streamlit run app.py
```

---

## 7. Running Unit Tests

Run the test suite using `pytest`:
```bash
pytest tests/
```

---

## 8. How Blockchain Verification Works

1. **Deterministic Canonical JSON**: Fields (`source`, `url`, `title`, `media_type`, `discovery_timestamp`, `similarity_score`) are serialized with sorted keys without extra whitespace.
2. **SHA-256 Fingerprint**: The canonical string produces a fixed 256-bit hash.
3. **On-Chain Anchor**: The transaction records `hash` and `timestamp` into `EvidenceRegistry.sol`.
4. **Verification**: Recalculating the hash of the original package produces an identical hash that matches the immutable on-chain record (`✓ VERIFIED`). If any field is altered (even by 0.1% score), a completely different hash is produced, triggering `✗ TAMPER DETECTED`.

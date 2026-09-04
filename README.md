# 🔍 TraceLens — Enterprise Visual Media Provenance & Forensic AI Suite

**TraceLens** is an enterprise-grade, consent-based visual media discovery, biometric facial verification, and blockchain provenance suite. It discovers publicly accessible media matching an authorized reference subject, computes 512-dimensional vector facial similarities, synthesizes deep reasoning forensic reports via **Groq LLM**, and anchors tamper-evident cryptographic evidence packages directly to an **EVM smart contract**.

---

## 🏗️ Architecture & Pipeline Overview

```text
                  [ Authorized Reference Portrait / Stream ]
                                      ↓
      [ InsightFace / OpenCV Multi-Face Detector & 512-d Embedding ]
                    (Real-time dynamic HUD bbox_pct)
                                      ↓
      [ Live Multi-Source Web Discovery & Scraper Pipeline ]
       ├── Wikipedia OpenSearch (Entity Resolution)
       ├── Wikipedia Official Gallery & 1000px Lead Portrait
       ├── Wikimedia Commons Global Press Wire
       └── Google News Journalistic RSS Wire
                                      ↓
     [ Visual Similarity & Deterministic Canonical Packaging ]
       ├── 512-D Cosine Similarity & Compression Artifacts / ELA
       ├── Canonical Deterministic JSON Evidence
       └── SHA-256 Cryptographic Fingerprint
                                      ↓
     [ Groq LLM AI Forensic Analysis & Local Vector Store ]
       ├── Groq LLM Forensic Intelligence Report
       └── Local SQLite/Chroma 512-D Vector Database
                                      ↓
     [ Local EVM Smart Contract Immutable Anchoring ]
       ├── EvidenceRegistry.sol (Solidity 0.8.19)
       ├── Tamper-Proof Cryptographic Verification
       └── Printable Provenance Certificate Modal
```

---

## ✨ Key Enterprise Capabilities

1. **Multi-Target Biometric Detection**: Detects and isolates single or multiple subjects in high-resolution frames with dynamic percentage bounding boxes (`bbox_pct`) and target switching.
2. **Authentic Live Web Scraping (Zero Mock Data)**:
   - Resolves subjects via Wikipedia OpenSearch API.
   - Extracts crystal-clear canonical 1000px lead portraits and official gallery archives.
   - Indexes Wikimedia Commons global press wire captures and Google News RSS updates.
3. **Groq LLM Forensic Intelligence**: Synthesizes biometric similarity scores, context coherence, entity extraction, deepfake anomaly risk scores, and forensic verdicts.
4. **Local Vector Database**: Stores and queries 512-dimensional embeddings locally in SQLite for rapid historical similarity correlation.
5. **EVM Blockchain Provenance**:
   - Compiles and deploys `EvidenceRegistry.sol` to a local Hardhat node.
   - Anchors SHA-256 evidence fingerprints and timestamps on-chain.
   - Interactive Tampering Playground to simulate cryptographic mismatch detection.
6. **Enterprise React UI**: Built with React 18, Vite, Tailwind CSS, Lucide Icons, and Unica77/Cohere typography.

---

## 📁 Repository Structure

```text
hh/
├── backend/                        # FastAPI Backend & AI Services
│   ├── server.py                   # FastAPI REST API & Session Manager
│   ├── requirements.txt            # Python Dependencies
│   ├── services/
│   │   ├── face_service.py         # Multi-face detection & 512-d embeddings
│   │   ├── search_service.py       # Wikipedia + Commons + Google News scraper
│   │   ├── matching_service.py     # Cosine similarity engine
│   │   ├── video_service.py        # FFmpeg video frame extractor
│   │   ├── llm_service.py          # Groq LLM Forensic Intelligence
│   │   ├── vector_store.py         # Local SQLite vector database
│   │   ├── evidence_service.py     # Deterministic SHA-256 packaging
│   │   └── blockchain_service.py   # Web3 EVM contract interface
│   ├── contracts/
│   │   └── EvidenceRegistry.sol    # Solidity 0.8.19 Smart Contract
│   ├── blockchain/
│   │   ├── deploy.py               # Web3 deployment runner
│   │   └── contract_abi.json       # Compiled ABI & contract address
│   └── data/vector_store/          # Local vector storage
│
├── frontend/                       # Enterprise React + Vite Dashboard
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx                 # Master application controller
│       ├── components/
│       │   ├── Header.jsx          # Announcement bar & navigation
│       │   ├── HeroSection.jsx     # Enterprise Hero
│       │   ├── PhotoCardConsole.jsx# Authorized portrait ingestion & multi-face HUD
│       │   ├── DiscoveryBand.jsx   # Live scraped candidate discovery stream
│       │   ├── VectorGeometryInspector.jsx # 512-D waveform & biometric HUD
│       │   ├── VideoTimelineScrubber.jsx   # Dynamic multi-frame timeline scrubber
│       │   ├── DeepfakeArtifactInspector.jsx # ELA & compression noise inspector
│       │   ├── AIForensicReport.jsx# Groq LLM Intelligence & Vector DB tab
│       │   ├── BlockchainProvenance.jsx    # EVM Smart Contract anchoring
│       │   ├── TamperPlayground.jsx# Real-time cryptographic tamper simulator
│       │   ├── BatchMerkleBundler.jsx      # Merkle tree batch bundler
│       │   ├── AuditRegistry.jsx   # On-chain provenance log trail
│       │   ├── CertificateModal.jsx# Printable cryptographic certificate
│       │   └── Footer.jsx
│       └── data/mockData.js
│
├── hardhat.config.js               # Hardhat Ethereum Configuration
└── README.md                       # Documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ & npm
- **Python**: 3.10+
- **FFmpeg**: System CLI tool for video processing

### 2. Start Local Ethereum EVM Node
```bash
npm install
npx hardhat node
```
*Runs on `http://127.0.0.1:8545`.*

### 3. Setup & Start Backend (FastAPI)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn server:app --host 127.0.0.1 --port 8000
```
*API available at `http://127.0.0.1:8000` (Swagger docs at `/docs`).*

### 4. Setup & Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 3000
```
*Frontend opens at `http://127.0.0.1:3000`.*

---

## 🔒 Verification & Safety Principles
- **Consent & Privacy**: Intended strictly for authorized reference media verification.
- **In-Memory Biometrics**: Face embeddings are processed securely and matched against public reference sources.
- **Cryptographic Immutability**: All evidence packages are deterministically hashed (SHA-256) and verified on-chain.


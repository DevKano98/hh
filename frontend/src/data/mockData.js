export const SAMPLE_PORTRAITS = [
  {
    id: "ref-01",
    name: "Dr. Elena Rostova",
    role: "Senior AI Safety Researcher",
    organization: "Global AI Provenance Council",
    url: "/assets/portrait_elena.jpg",
    confidence: 0.988,
    bbox: [112, 84, 496, 520],
    det_landmarks: 5,
    camera: "Sony α7R V (50mm f/1.4)",
    iso: 100,
    timestamp: "2026-09-04T18:20:00Z"
  },
  {
    id: "ref-02",
    name: "Marcus Vance",
    role: "Enterprise Systems Architect",
    organization: "Distributed Trust Labs",
    url: "/assets/portrait_marcus.jpg",
    confidence: 0.979,
    bbox: [120, 90, 480, 510],
    det_landmarks: 5,
    camera: "Canon EOS R5 (85mm f/1.2)",
    iso: 200,
    timestamp: "2026-09-04T18:22:15Z"
  },
  {
    id: "ref-03",
    name: "Aria Chen",
    role: "Chief Compliance Officer",
    organization: "Veritas Media Defense",
    url: "/assets/portrait_aria.jpg",
    confidence: 0.992,
    bbox: [105, 78, 510, 530],
    det_landmarks: 5,
    camera: "Leica SL2-S (75mm f/2.0)",
    iso: 160,
    timestamp: "2026-09-04T18:25:40Z"
  }
];

export const MOCK_DISCOVERY_RESULTS = [
  {
    id: "cand-01",
    title: "International AI Summit Keynote — Live 4K Broadcast Stream",
    source: "Reuters Global News Wire",
    media_type: "video",
    url: "/assets/broadcast_summit.jpg",
    thumbnail: "/assets/broadcast_summit.jpg",
    score: 0.984,
    similarity_pct: 98.4,
    match_status: "LIKELY MATCH",
    discovered_at: "2026-09-04T18:30:10Z",
    platform: "Public News Wire (UHD)",
    resolution: "3840x2160 UHD",
    video_details: { matching_frames: 14, best_timestamp: "00:14.320", total_sampled: 64 },
    exif: { device: "Broadcast Studio Camera #1", exposure: "1/250s", aperture: "f/2.8" }
  },
  {
    id: "cand-02",
    title: "Global AI Governance Summit — Panel Session Portrait",
    source: "Bloomberg Technology Archive",
    media_type: "image",
    url: "/assets/portrait_aria.jpg",
    thumbnail: "/assets/portrait_aria.jpg",
    score: 0.952,
    similarity_pct: 95.2,
    match_status: "LIKELY MATCH",
    discovered_at: "2026-09-04T18:30:12Z",
    platform: "Media Archive",
    resolution: "2560x1440 QHD",
    exif: { device: "Nikon Z9", exposure: "1/500s", aperture: "f/1.8" }
  },
  {
    id: "cand-03",
    title: "Executive Symposium Portrait Session — Veritas Media Directory",
    source: "DuckDuckGo Image Index",
    media_type: "image",
    url: "/assets/portrait_elena.jpg",
    thumbnail: "/assets/portrait_elena.jpg",
    score: 0.978,
    similarity_pct: 97.8,
    match_status: "LIKELY MATCH",
    discovered_at: "2026-09-04T18:30:14Z",
    platform: "Institutional Archive",
    resolution: "2048x2048",
    exif: { device: "Sony A1", exposure: "1/400s", aperture: "f/2.8" }
  },
  {
    id: "cand-04",
    title: "Distributed Systems Architecture Panel — Main Conference Hall",
    source: "arXiv Publication Archive",
    media_type: "image",
    url: "/assets/portrait_marcus.jpg",
    thumbnail: "/assets/portrait_marcus.jpg",
    score: 0.892,
    similarity_pct: 89.2,
    match_status: "CANDIDATE MATCH",
    discovered_at: "2026-09-04T18:30:16Z",
    platform: "Institutional Archive",
    resolution: "2048x1536",
    exif: { device: "Fujifilm X-T5", exposure: "1/125s", aperture: "f/2.0" }
  },
  {
    id: "cand-05",
    title: "Regulatory Compliance Summit Session — Veritas Archive",
    source: "DuckDuckGo Public Index",
    media_type: "image",
    url: "/assets/portrait_aria.jpg",
    thumbnail: "/assets/portrait_aria.jpg",
    score: 0.865,
    similarity_pct: 86.5,
    match_status: "CANDIDATE MATCH",
    discovered_at: "2026-09-04T18:30:18Z",
    platform: "Public Wire Service",
    resolution: "1920x1080",
    exif: { device: "Sony A1", exposure: "1/400s", aperture: "f/2.8" }
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 1,
    hash: "8f91c4d8c729482b0129a8f2381270912384a9f8120394812304918239048123",
    source: "Reuters Global News Wire",
    timestamp: "2026-09-04T18:31:02Z",
    submitter: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    block: 148,
    status: "VERIFIED ✓",
    similarity: 98.4
  },
  {
    id: 2,
    hash: "3a7b189c4d82347102948b23481270912384a9f8120394812304918239048abc",
    source: "Bloomberg Technology Archive",
    timestamp: "2026-09-04T18:32:44Z",
    submitter: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    block: 149,
    status: "VERIFIED ✓",
    similarity: 95.2
  }
];

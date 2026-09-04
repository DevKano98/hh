// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EvidenceRegistry {
    struct Evidence {
        bytes32 hash;
        string source;
        uint256 timestamp;
        address submitter;
    }

    mapping(uint256 => Evidence) private evidenceStore;
    uint256 public evidenceCount;

    event EvidenceRegistered(uint256 indexed id, bytes32 hash, string source, uint256 timestamp);

    function registerEvidence(bytes32 _hash, string memory _source) public returns (uint256) {
        evidenceCount++;
        evidenceStore[evidenceCount] = Evidence({
            hash: _hash,
            source: _source,
            timestamp: block.timestamp,
            submitter: msg.sender
        });
        emit EvidenceRegistered(evidenceCount, _hash, _source, block.timestamp);
        return evidenceCount;
    }

    function getEvidence(uint256 _id) public view returns (bytes32, string memory, uint256, address) {
        Evidence memory e = evidenceStore[_id];
        return (e.hash, e.source, e.timestamp, e.submitter);
    }

    function verifyEvidence(uint256 _id, bytes32 _hash) public view returns (bool) {
        return evidenceStore[_id].hash == _hash;
    }
}

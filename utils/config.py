import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:8545")
    CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "")
    PRIVATE_KEY = os.getenv("PRIVATE_KEY", "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80") # Default Hardhat #1
    SEARCH_PROVIDER = os.getenv("SEARCH_PROVIDER", "duckduckgo")
    SEARCH_API_KEY = os.getenv("SEARCH_API_KEY", "")

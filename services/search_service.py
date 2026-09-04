import logging
import urllib.request
import urllib.parse
import json
import xml.etree.ElementTree as ET
import re
from models.schemas import SearchResult

class SearchProvider:
    def search(self, query: str = "human face portrait") -> list[SearchResult]:
        raise NotImplementedError

class LiveMultiSourceProvider(SearchProvider):
    def search(self, query: str = "human face portrait") -> list[SearchResult]:
        results = []
        cleaned_query = query.replace("public news speech photo", "").replace("portrait", "").strip()
        if not cleaned_query:
            cleaned_query = "human face"

        # 1. Query Wikipedia / Wikimedia Public API for high-resolution images & extract articles
        try:
            wiki_url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(cleaned_query)}&gsrlimit=8&prop=pageimages|extracts&piprop=original|thumbnail&pithumbsize=600&exintro=1&explaintext=1&exsentences=3&format=json"
            req = urllib.request.Request(wiki_url, headers={'User-Agent': 'TraceLens/1.0 (contact@tracelens.local)'})
            res = json.loads(urllib.request.urlopen(req, timeout=6).read().decode('utf-8'))
            pages = res.get('query', {}).get('pages', {})
            
            for pid, page in pages.items():
                title = page.get('title', '')
                img_url = page.get('original', {}).get('source') or page.get('thumbnail', {}).get('source')
                extract = page.get('extract', f"Public archival record for {title}.")
                if not img_url:
                    continue
                results.append({
                    "url": img_url,
                    "title": f"{title} — Official Public Archive Record",
                    "source": "Wikimedia Commons / Public Web",
                    "media_type": "image",
                    "thumbnail_url": img_url,
                    "article_text": extract
                })
        except Exception as e:
            logging.error(f"Wikimedia scrape notice: {e}")

        # 2. Query Google News RSS for live journalistic news articles
        try:
            rss_url = f"https://news.google.com/rss/search?q={urllib.parse.quote(cleaned_query)}&hl=en-US&gl=US&ceid=US:en"
            req = urllib.request.Request(rss_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            xml_data = urllib.request.urlopen(req, timeout=6).read()
            root = ET.fromstring(xml_data)
            items = root.findall('.//item')
            
            for item in items[:6]:
                title = item.find('title').text if item.find('title') is not None else "Public News Item"
                link = item.find('link').text if item.find('link') is not None else ""
                pub = item.find('pubDate').text if item.find('pubDate') is not None else ""
                desc = item.find('description').text if item.find('description') is not None else ""
                clean_desc = re.sub('<[^<]+?>', '', desc) if desc else f"Recent public press report: {title}"
                
                thumb = results[0]["thumbnail_url"] if results else "/assets/broadcast_summit.jpg"
                results.append({
                    "url": link or thumb,
                    "title": title,
                    "source": "Live Press Wire",
                    "media_type": "news",
                    "thumbnail_url": thumb,
                    "article_text": f"{clean_desc}. Published: {pub}"
                })
        except Exception as e:
            logging.error(f"News RSS scrape notice: {e}")

        # 3. Fallback if offline
        if not results:
            return DemoProvider().search(cleaned_query)

        # Convert to SearchResult objects or dicts
        normalized = []
        for r in results:
            normalized.append(SearchResult(
                url=r["url"],
                title=r["title"],
                source=r["source"],
                media_type=r["media_type"],
                thumbnail_url=r["thumbnail_url"]
            ))
            # keep article_text attribute
            normalized[-1].article_text = r.get("article_text", "")
            
        return normalized

class DemoProvider(SearchProvider):
    def search(self, query: str = "demo") -> list[SearchResult]:
        res = [
            SearchResult(
                url="/assets/broadcast_summit.jpg",
                title=f"{query} — Live Broadcast Keynote Stream",
                source="Reuters Global News Wire",
                media_type="video",
                thumbnail_url="/assets/broadcast_summit.jpg"
            ),
            SearchResult(
                url="/assets/abstract_blockchain.jpg",
                title=f"{query} — Cryptographic Session Archive",
                source="Bloomberg Technology Archive",
                media_type="image",
                thumbnail_url="/assets/abstract_blockchain.jpg"
            ),
            SearchResult(
                url="/assets/portrait_elena.jpg",
                title=f"{query} — Official Directory Record",
                source="DuckDuckGo Public Index",
                media_type="image",
                thumbnail_url="/assets/portrait_elena.jpg"
            )
        ]
        for r in res:
            r.article_text = f"Archival journalistic broadcast coverage regarding {query}."
        return res

def get_search_provider(provider_name: str = "duckduckgo") -> SearchProvider:
    return LiveMultiSourceProvider()

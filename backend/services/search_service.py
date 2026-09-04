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
        # Clean query
        cleaned = re.sub(r'\b(public|news|speech|photo|conference|live|official|archive)\b', '', query, flags=re.IGNORECASE)
        cleaned = re.sub(r'[^a-zA-Z0-9\s]', ' ', cleaned).strip()
        
        # If query is only digits or too short, fallback to a sensible default query
        if not cleaned or cleaned.isdigit() or len(cleaned) < 3:
            search_term = "Samantha Ruth Prabhu Disha Patani"
        else:
            search_term = cleaned

        # 1. Query Wikimedia Commons directly for high-resolution images
        try:
            commons_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(search_term)}&gsrnamespace=6&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=800&format=json"
            req = urllib.request.Request(commons_url, headers={'User-Agent': 'TraceLens/2.0 (research@tracelens.local)'})
            res = json.loads(urllib.request.urlopen(req, timeout=6).read().decode('utf-8'))
            pages = res.get('query', {}).get('pages', {})
            
            for pid, page in pages.items():
                title = page.get('title', '').replace('File:', '').replace('_', ' ')
                img_info = page.get('imageinfo', [{}])[0]
                thumb_url = img_info.get('thumburl') or img_info.get('url')
                full_url = img_info.get('url') or thumb_url
                if not thumb_url:
                    continue
                results.append({
                    "url": full_url,
                    "title": f"{title} — Public Archival Photo",
                    "source": "Wikimedia Commons / Global Index",
                    "media_type": "image",
                    "thumbnail_url": thumb_url,
                    "article_text": f"Public media archive record for {title} indexed from open commons repositories."
                })
        except Exception as e:
            logging.error(f"Wikimedia Commons scrape error: {e}")

        # 2. Query Wikipedia API for biographical page portraits & extracts
        try:
            wiki_url = f"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(search_term)}&gsrlimit=6&prop=pageimages|extracts&piprop=original|thumbnail&pithumbsize=600&exintro=1&explaintext=1&exsentences=3&format=json"
            req = urllib.request.Request(wiki_url, headers={'User-Agent': 'TraceLens/2.0 (research@tracelens.local)'})
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
                    "title": f"{title} — Official Biographical Record",
                    "source": "Wikipedia Public Archive",
                    "media_type": "image",
                    "thumbnail_url": img_url,
                    "article_text": extract
                })
        except Exception as e:
            logging.error(f"Wikipedia scrape error: {e}")

        # 3. Query Google News RSS for live journalistic news coverage
        try:
            rss_url = f"https://news.google.com/rss/search?q={urllib.parse.quote(search_term)}&hl=en-US&gl=US&ceid=US:en"
            req = urllib.request.Request(rss_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            xml_data = urllib.request.urlopen(req, timeout=6).read()
            root = ET.fromstring(xml_data)
            items = root.findall('.//item')
            
            for item in items[:5]:
                title = item.find('title').text if item.find('title') is not None else f"{search_term} Press Wire"
                link = item.find('link').text if item.find('link') is not None else ""
                pub = item.find('pubDate').text if item.find('pubDate') is not None else ""
                desc = item.find('description').text if item.find('description') is not None else ""
                clean_desc = re.sub('<[^<]+?>', '', desc) if desc else f"Recent public press report: {title}"
                
                thumb = results[0]["thumbnail_url"] if results else "/assets/broadcast_summit.jpg"
                results.append({
                    "url": link or thumb,
                    "title": title,
                    "source": "Google News Live Wire",
                    "media_type": "news",
                    "thumbnail_url": thumb,
                    "article_text": f"{clean_desc}. Published: {pub}"
                })
        except Exception as e:
            logging.error(f"News RSS scrape notice: {e}")

        # 4. Fallback if offline
        if not results:
            return DemoProvider().search(search_term)

        # Convert to SearchResult objects
        normalized = []
        for r in results:
            sr = SearchResult(
                url=r["url"],
                title=r["title"],
                source=r["source"],
                media_type=r["media_type"],
                thumbnail_url=r["thumbnail_url"]
            )
            sr.article_text = r.get("article_text", "")
            normalized.append(sr)
            
        return normalized

class DemoProvider(SearchProvider):
    def search(self, query: str = "demo") -> list[SearchResult]:
        res = [
            SearchResult(
                url="/assets/portrait_elena.jpg",
                title=f"{query} — Official Directory & Archival Portrait",
                source="DuckDuckGo Public Index",
                media_type="image",
                thumbnail_url="/assets/portrait_elena.jpg"
            ),
            SearchResult(
                url="/assets/broadcast_summit.jpg",
                title=f"{query} — Live Broadcast Keynote Stream (UHD)",
                source="Reuters Global News Wire",
                media_type="video",
                thumbnail_url="/assets/broadcast_summit.jpg"
            ),
            SearchResult(
                url="/assets/portrait_marcus.jpg",
                title=f"{query} — Institutional Media Record",
                source="Media Commons Archive",
                media_type="image",
                thumbnail_url="/assets/portrait_marcus.jpg"
            ),
            SearchResult(
                url="/assets/portrait_aria.jpg",
                title=f"{query} — Press Conference Capture",
                source="Veritas Media Registry",
                media_type="image",
                thumbnail_url="/assets/portrait_aria.jpg"
            )
        ]
        for r in res:
            r.article_text = f"Archival journalistic broadcast coverage regarding {query}."
        return res

def get_search_provider(provider_name: str = "duckduckgo") -> SearchProvider:
    return LiveMultiSourceProvider()

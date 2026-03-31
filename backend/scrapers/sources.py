import feedparser
import httpx
from datetime import datetime

SOURCES = [
    {
        "name": "Hugging Face",
        "url": "https://huggingface.co/blog/feed.xml"
    },
    {
        "name": "Anthropic",
        "url": "https://www.anthropic.com/rss.xml"
    },
    {
        "name": "OpenAI",
        "url": "https://openai.com/blog/rss.xml"
    },
    {
        "name": "Google DeepMind",
        "url": "https://deepmind.google/blog/rss.xml"
    },
    {
        "name": "MIT AI News",
        "url": "https://news.mit.edu/topic/artificial-intelligence2/feed"
    }
]

def scrape_all_sources():
    articles = []
    for source in SOURCES:
        try:
            feed = feedparser.parse(source["url"])
            for entry in feed.entries[:5]:
                articles.append({
                    "source": source["name"],
                    "title": entry.get("title", ""),
                    "summary": entry.get("summary", ""),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", str(datetime.now()))
                })
        except Exception as e:
            print(f"Error scraping {source['name']}: {e}")
    return articles
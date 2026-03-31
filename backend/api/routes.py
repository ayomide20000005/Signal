from fastapi import APIRouter
from backend.scrapers.sources import scrape_all_sources
from backend.processors.ranker import rank_articles
from backend.processors.summarizer import generate_tweet

router = APIRouter()

@router.get("/feed")
def get_feed():
    articles = scrape_all_sources()
    ranked = rank_articles(articles)
    results = []
    for article in ranked:
        tweet = generate_tweet(article)
        results.append({
            "source": article["source"],
            "title": article["title"],
            "link": article["link"],
            "published": article["published"],
            "score": article["score"],
            "tweet": tweet
        })
    return results
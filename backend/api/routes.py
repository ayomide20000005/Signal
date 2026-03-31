from fastapi import APIRouter
from backend.scrapers.sources import scrape_all_sources
from backend.processors.ranker import rank_articles
from backend.processors.summarizer import generate_tweet

router = APIRouter()

@router.get("/articles")
def get_articles():
    articles = scrape_all_sources()
    ranked = rank_articles(articles)
    return ranked

@router.get("/tweet/{index}")
def get_tweet(index: int):
    articles = scrape_all_sources()
    ranked = rank_articles(articles)
    if index >= len(ranked):
        return {"error": "index out of range"}
    tweet = generate_tweet(ranked[index])
    return {"tweet": tweet, "article": ranked[index]}
from fastapi import APIRouter
from pydantic import BaseModel
from backend.scrapers.sources import scrape_all_sources
from backend.processors.ranker import rank_articles
from backend.processors.summarizer import generate_tweet, chat_with_articles

router = APIRouter()

CATEGORIES = {
    "Model Release": ["released", "new model", "launches", "benchmark", "state of the art", "open source", "weights"],
    "Funding": ["raises", "funding", "million", "billion", "investment", "valuation", "series"],
    "Hiring": ["hired", "joins", "appointed", "head of", "VP", "chief"],
    "Acquisition": ["acquired", "acquisition", "buys", "merger", "deal"],
    "Research": ["paper", "study", "research", "arxiv", "findings", "proposed"],
}

def categorize(article):
    text = (article["title"] + " " + article["summary"]).lower()
    for category, keywords in CATEGORIES.items():
        for keyword in keywords:
            if keyword.lower() in text:
                return category
    return "General"

cached_articles = []

@router.get("/articles")
def get_articles():
    global cached_articles
    articles = scrape_all_sources()
    ranked = rank_articles(articles)
    for article in ranked:
        article["category"] = categorize(article)
    cached_articles = ranked
    return ranked

@router.get("/tweet/{index}")
def get_tweet(index: int):
    global cached_articles
    if not cached_articles:
        articles = scrape_all_sources()
        cached_articles = rank_articles(articles)
    if index >= len(cached_articles):
        return {"error": "index out of range"}
    tweet = generate_tweet(cached_articles[index])
    return {"tweet": tweet, "article": cached_articles[index]}

class ChatMessage(BaseModel):
    message: str

@router.post("/chat")
def chat(body: ChatMessage):
    global cached_articles
    if not cached_articles:
        articles = scrape_all_sources()
        cached_articles = rank_articles(articles)
    response = chat_with_articles(body.message, cached_articles)
    return {"response": response}
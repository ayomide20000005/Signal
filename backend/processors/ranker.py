KEYWORDS = [
    "released", "launched", "acquired", "acquisition", "funding",
    "raises", "partnership", "new model", "breakthrough", "announces",
    "open source", "benchmark", "state of the art", "AGI", "GPT",
    "Claude", "Gemini", "Llama", "Mistral", "hired", "joins"
]

def rank_articles(articles):
    scored = []
    for article in articles:
        score = 0
        text = (article["title"] + " " + article["summary"]).lower()
        for keyword in KEYWORDS:
            if keyword.lower() in text:
                score += 1
        article["score"] = score
        scored.append(article)
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:10]
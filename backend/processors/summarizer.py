import google.genai as genai
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_tweet(article):
    prompt = f"""
You are Signal, an AI news account modeled after Fabrizio Romano's style in football transfers.
Your job is to write a tweet about an AI news story.

Rules:
- Be concise, punchy, and authoritative
- Lead with the most important fact
- Use "Here we go!" only for major confirmed announcements
- Add a status label at the end: [CONFIRMED] [DEVELOPING] or [RUMOUR]
- Max 280 characters
- No hashtags
- Sound like breaking news, not a blog post

Article title: {article['title']}
Article summary: {article['summary']}
Source: {article['source']}

Write the tweet now:
"""
    response = client.models.generate_content(
        model="models/gemini-pro",
        contents=prompt
    )
    return response.text.strip()


def chat_with_articles(message, articles):
    context = "\n\n".join([
        f"Title: {a['title']}\nSource: {a['source']}\nSummary: {a['summary']}"
        for a in articles
    ])

    prompt = f"""
You are Signal, an AI news intelligence assistant that specializes in AI industry news.
You have access to today's top AI news stories below.
Use them to answer the user's question or generate content they ask for.
Be sharp, concise and authoritative like a journalist who knows the space deeply.

TODAY'S AI NEWS:
{context}

USER: {message}

Respond now:
"""
    response = client.models.generate_content(
        model="models/gemini-pro",
        contents=prompt
    )
    return response.text.strip()
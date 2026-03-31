import google.genai as genai
import os
from dotenv import load_dotenv

load_dotenv()

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
        model="gemini-2.0-flash",
        contents=prompt
    )
    return response.text.strip()
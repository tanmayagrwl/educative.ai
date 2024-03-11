from html import unescape
from model.monster import monster_generate


def generate_title(content: str) -> str:
    result = monster_generate(
        {
            "system": "User will provide you a paragraph , you need to return a max 10 word title to the paragraph. STRICTLY ONLY ONE LINE TITLE. NOTHING ELSE. NO QUOTES.",
            "user": unescape(content),
        }
    )
    return result

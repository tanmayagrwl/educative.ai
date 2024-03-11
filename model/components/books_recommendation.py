from bs4 import BeautifulSoup
import requests


non_affiliated_links = [
    "https://pdfdrive.com.co/",
    "https://pdfdrive.com.co/about-us/",
    "https://pdfdrive.com.co/category/",
    "https://pdfdrive.com.co/contact-us/",
    "https://pdfdrive.com.co/de/",
    "https://pdfdrive.com.co/privacy-policy/",
    "https://pdfdrive.com.co/terms/",
    "https://pdfdrive.com.co",
    "https://pdfdrive.com.co/",
    "https://pdfdrive.com.co/category/",
    "https://pdfdrive.com.co/novels/",
    "https://pdfdrive.com.co/download-self-improvement-pdf/",
    "https://pdfdrive.com.co/download-similar-free-ebooks/",
    "https://pdfdrive.com.co/14-download-business-career-pdf/",
    "https://pdfdrive.com.co/general-knowledge-books/",
    "https://pdfdrive.com.co/biography/",
    "https://pdfdrive.com.co/8-download-academic-education-pdf/",
    "https://pdfdrive.com.co/financial/",
    "https://pdfdrive.com.co/9-download-history-pdf/",
    "https://pdfdrive.com.co/19-download-religion-pdf/",
    "https://pdfdrive.com.co/contact-us/",
    "https://pdfdrive.com.co/about-us/",
    "https://pdfdrive.com.co/de/",
    "https://pdfdrive.com.co/terms/",
    "https://pdfdrive.com.co/privacy-policy/",
    "https://www.facebook.com/profile.php?id=100094368993054",
    "//www.dmca.com/Protection/Status.aspx?ID=fd7b2402-cdc6-467e-97bb-9bad0e2c7c5d",
]


def get_books(title: str):
    url = f"https://pdfdrive.com.co/?s={title.lower()}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        links = []
        html = BeautifulSoup(response.text, "html.parser")
        links = html.find_all("a", href=True)
        link_urls = [link["href"] for link in links]
        link_urls = [
            link
            for link in link_urls
            if "https://pdfdrive.com.co/" in link and link not in non_affiliated_links
        ]
        return link_urls
    except Exception as e:
        return {"status": "error", "message": str(e)}

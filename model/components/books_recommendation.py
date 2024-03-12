from pprint import pprint

import bs4
import requests

BASE_URL = (
    "https://libgen.is/search.php?req=%s&open=0&res=25&view=simple&phrase=1&column=def"
)


def get_books(name: str):
    url = BASE_URL % name

    books = []

    soup = bs4.BeautifulSoup(
        requests.get(url).text,
        "html.parser",
        parse_only=bs4.SoupStrainer("table", class_="c"),
    )

    rows = soup.find_all("tr", limit=6)[1:]

    for row in rows:
        # Extract title
        title = row.select_one('td[width="500"] a').contents[0].get_text().strip()

        # Extract mirror link [1]
        download = row.select_one('td a[href^="http"]')["href"]

        # cover
        cover = f"https://libgen.is/covers/1000/{download.split("/")[-1].lower()}-d.jpg"

        books.append({"title": title, "download": download, "cover": cover})

    return books


if __name__ == "__main__":
    pprint(get_books("python"))

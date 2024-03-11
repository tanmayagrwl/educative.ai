from bs4 import BeautifulSoup
import requests

def get_books(title: str):
    url = f"https://libgen.is/search.php?req={title.lower().replace(' ', '+')}&open=0&res=25&view=simple&phrase=1&column=def"
    try:
      l123=[]
      response = requests.get(url)
      if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        table = soup.find('table', class_='c')

        if table:
            results = []
            rows = table.find_all('tr')
            for row in rows[1:6]:
                cells = row.find_all('td')
                title_cell = cells[2]
                title_link = title_cell.find('a', title=True)
                title = title_link.contents[0] if title_link else "Unknown Title"
                
                links = cells[9].find_all('a')
                download_link = links[0].get('href') if links else None
                if download_link:
                    response = requests.get(download_link)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, "html.parser")
                        links = soup.find_all("a")

                        for link in links:
                            if "download.library.lol" in link.get('href'):
                                k = f'http://library.lol/covers/{link.get("href").split("/")[4]}/{download_link.split("main/")[1].lower()}.jpg'
                                k2 = f'http://library.lol/covers/{link.get("href").split("/")[4]}/{download_link.split("main/")[1].lower()}-d.jpg'
                                k3 = f'http://library.lol/covers/{link.get("href").split("/")[4]}/{download_link.split("main/")[1].lower()}-g.jpg'
                                re1 = requests.get(k)
                                re2 = requests.get(k2)
                                re3 = requests.get(k3)
                                if re1.status_code == 200:
                                    l123.append(k)
                                elif re2.status_code == 200:
                                    l123.append(k2)
                                elif re3.status_code == 200:
                                    l123.append(k3)

                results.append({
                    "title": title,
                    "download_link": download_link,
                    "cover_page": l123[0] if l123 else "Cover not found" 
                })
                l123.clear()
            return results
    except Exception as e:
        return {"status": "error", "message": str(e)}
get_books("maths")
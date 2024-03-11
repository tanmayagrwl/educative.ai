from youtube_search import YoutubeSearch


def yt_search(title: str, limit: int = 3):
    results = YoutubeSearch(title, max_results=limit).to_dict()
    return results

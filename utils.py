import os

from dotenv import load_dotenv

load_dotenv()


def getenv(key: str) -> str:
    try:
        return os.environ[key]
    except KeyError:
        raise KeyError(f"{key} not set.")

from typing import TypedDict
from utils import getenv
from monsterapi import client

monster_key = getenv("MONSTER_KEY")
monster = client(monster_key)

model_name = "llama2-7b-chat"

input_options = {
    "top_k": 10,
    "top_p": 0.9,
    "temp": 0.9,
    "max_length": 1000,
    "beam_size": 1,
}

prompt = """system: {0}

user: {1}"""


class PromptOptions(TypedDict):
    system: str
    user: str


def monster_generate(opts: PromptOptions) -> str:
    result = monster.generate(
        model_name,
        {
            "prompt": prompt.format(
                opts["system"],
                opts["user"],
            ),
            **input_options,
        },
    )
    return str(result["text"]).strip()

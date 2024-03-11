import requests

url = "https://api.monsterapi.ai/v1/generate/zephyr-7b-beta"

text_input = str(input("Enter your Question: "))

payload = {
    "beam_size": 1,
    "max_length": 256,
    "prompt": "string",
    "repetition_penalty": 1.2,
    "system_prompt": f'("User will provide you a paragraph , you need to return a single word or two-three word title to the paragraph \n. {text_input} \n Output should be only the titile of the paragraph")',
    "temp": 0.7,
    "top_k": 40,
    "top_p": 1
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImEwZjdjOWJiZjg5MGYyOWJkZThkNzE0ZmJjZGE4ZDQyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMjhUMDY6MTM6MDUuODAyMzQwIn0.cYL1JyzdyTu-RZWGlwDD34nze6OwXNzf8t3Lzr8IrVw"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
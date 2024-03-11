def h1():
  import requests,time
  l1=[]
  text_input = input("Your Prompt : ")
  url = "https://api.monsterapi.ai/v1/generate/zephyr-7b-beta"
  print("Message Sent :)")

  payload = {
    "max_length": 256,
    "temp": 0.98,
    "top_k": 40,
    "top_p": 0.9,
    "prompt": f'("User will provide you a paragraph , you need to return a single word or two-three word title to the paragraph \n. {text_input} \n Output should be only the titile of the paragraph")'
  }
  headers = {
    "accept":
    "application/json",
    "content-type":
    "application/json",
    "authorization":
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVmMmVkMzU3NWYyZjgxNjkyZGZhNTIyOGY2NmM0OTc1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMDdUMTI6MjM6MzkuMDEyMTg4In0.TJ1slfgkHQlrHSAexh9ZHmI8L7JRvaLt5arwhrCuRh8"
  }
  response = requests.post(url, json=payload, headers=headers)
  print(response.text)
  response_dict = response.json()
  op = response_dict['process_id']
  print("op : ", op)
  import requests
  url1 = f"https://api.monsterapi.ai/v1/status/{op}"
  headers1 = {
    "accept":
    "application/json",
    "authorization":
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVmMmVkMzU3NWYyZjgxNjkyZGZhNTIyOGY2NmM0OTc1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMDdUMTI6MjM6MzkuMDEyMTg4In0.TJ1slfgkHQlrHSAexh9ZHmI8L7JRvaLt5arwhrCuRh8"
  }
  response = requests.get(url1, headers=headers1)
  while True:
    response = requests.get(url1, headers=headers1)
    response1 = response.json()
    print(response1)
    if response1['status'] == "IN_QUEUE" or response1[
        'status'] == "IN_PROGRESS":
      time.sleep(1)
      continue
    else:
      print("Operation Completed ...")
      l1.append(response1['result']['text'])
      break
  print(f"Output : \n{l1[0]}")
  l1.clear()
h1()
from monsterapi import client
              

api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImEwZjdjOWJiZjg5MGYyOWJkZThkNzE0ZmJjZGE4ZDQyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMjhUMDY6MTM6MDUuODAyMzQwIn0.cYL1JyzdyTu-RZWGlwDD34nze6OwXNzf8t3Lzr8IrVw'  # Replace 'your-api-key' with your actual Monster API key
monster_client = client(api_key)


text_input = str(input("Enter your Question: "))

model = 'llama2-7b-chat';
input_data = {
  'prompt': f'("User will provide you a paragraph , you need to return a single word or two-three word title to the paragraph \n. {text_input} \n Output should be only the titile of the paragraph")',
  'top_k': 10,
  'top_p': 0.9,
  'temp': 0.9,
  'max_length': 1000,
  'beam_size': 1,
  'system_prompt': 'User will provide you a paragraph , you need to return a single word or two-three word title to the paragraph.',
  'repetition_penalty': 1.2,
};


result = monster_client.generate(model, input_data)

print(result['text'])
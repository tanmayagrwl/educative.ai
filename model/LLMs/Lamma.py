from monsterapi import client
              

api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImEwZjdjOWJiZjg5MGYyOWJkZThkNzE0ZmJjZGE4ZDQyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMjhUMDY6MTM6MDUuODAyMzQwIn0.cYL1JyzdyTu-RZWGlwDD34nze6OwXNzf8t3Lzr8IrVw'  # Replace 'your-api-key' with your actual Monster API key
monster_client = client(api_key)


text_input = str(input("Enter your Question: "))

model = 'llama2-7b-chat';
input_data = {
  'prompt': f'{text_input}',
  'top_k': 10,
  'top_p': 0.9,
  'temp': 0.9,
  'max_length': 1000,
  'beam_size': 1,
  'system_prompt': 'You are a doubt solving chatbot for a student of high school in India studying in a CBSE affilated school , Solve doubts related to maths , physics ,biology and chemistry. Suggest relevant materials and books also generate related questions,answer only educational doubts and reject all doubts which are not related to the given subjects and education in general.',
  'repetition_penalty': 1.2,
};


result = monster_client.generate(model, input_data)

print(result['text'])
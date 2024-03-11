from monsterapi import client
              

api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImEwZjdjOWJiZjg5MGYyOWJkZThkNzE0ZmJjZGE4ZDQyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMjhUMDY6MTM6MDUuODAyMzQwIn0.cYL1JyzdyTu-RZWGlwDD34nze6OwXNzf8t3Lzr8IrVw'  # Replace 'your-api-key' with your actual Monster API key
  
monster_client = client(api_key)



path_to_file = str(input("Enter path to audio file: "))

model = 'whisper'
input_data = {
  "file": f'{path_to_file}',
  'diarize': False,
  'language': 'en',
  'num_speakers': 2,
  'prompt': None,
  'remove_silence': True,
  'transcription_format': 'text',
}



result = monster_client.generate(model, input_data)
          
print(result['text'])
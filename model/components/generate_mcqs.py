import google.generativeai as ai
from model.genai import safety_settings


generation_config = ai.GenerationConfig(
    temperature=0.9,
    top_p=1,
    top_k=1,
    max_output_tokens=2048,
)

model = ai.GenerativeModel(
    model_name="gemini-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
)


def generate_mcqs(content: str) -> str:
    chat = model.start_chat(history=[])

    data = (
        """I want you to Generate 5 MCQs on the given topic with 4 options each.
      the format you should return is (array of mcqs) :

      [{
          "question": "What is the capital of France?",
          "options": [
            "Paris",
            "London",
            "Berlin",
            "Rome"
          ],
          "answer": "Paris"
      }]

      STRICTLY FOLLOW THE JSON FORMAT. NOTHING EXTRA.

      topic: """
        + content
    )
    result = chat.send_message(
        [
            data,
        ]
    )
    return result.text

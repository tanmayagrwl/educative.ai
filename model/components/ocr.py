from typing import TypedDict
import google.generativeai as ai
from model.genai import safety_settings


generation_config = ai.GenerationConfig(
    temperature=0.4,
    top_p=1,
    top_k=32,
    max_output_tokens=2000,
)

model = ai.GenerativeModel(
    model_name="gemini-pro-vision",
    generation_config=generation_config,
    safety_settings=safety_settings,
)


class ImageData(TypedDict):
    mime_type: str
    data: bytes


def get_ocr_text(file: ImageData):
    return model.generate_content(
        [
            "What is written on this image?",
            {
                "mime_type": file["mime_type"],
                "data": file["data"],
            },
        ]
    ).text

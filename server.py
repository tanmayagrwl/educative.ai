import os
import json

import time
from fastapi import FastAPI, UploadFile
from pydantic import BaseModel
from model.components.books_recommendation import get_books
from model.components.generate_mcqs import generate_mcqs
from model.components.ocr import get_ocr_text, ocr_ppt, sum_ppt
from model.components.describe import *
from model.components.title_generation import generate_title
from model.components.youtube_sr import yt_search
from fastapi.middleware.cors import CORSMiddleware
from pptx import Presentation

start_time = time.time()

# Create FastAPI app
app = FastAPI()


# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    uptime_seconds = (time.time() - start_time).__round__(4)
    return {
        "status": "success",
        "message": "welcome to blackboard.ai",
        "uptime": f"{uptime_seconds}s",
    }


@app.post("/ocr")
def image_ocr(file: UploadFile):
    try:
        print(file.content_type)
        if file.content_type in ["image/jpeg", "image/png"]:
            raw_text = get_ocr_text(
                {
                    "mime_type": file.content_type or "image/jpeg",
                    "data": file.file.read(),
                }
            ).strip()
            processed_text = raw_text.replace("\n", " ").strip()
            return {
                "status": "success",
                "raw_ocr": raw_text,
                "processed_ocr": processed_text,
            }
        
        if file.content_type in ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint"]:

            payload = {
                "file": file.file
            }

            if file.content_type == "application/vnd.ms-powerpoint":
                pptx_ppt = Presentation(file.file)
                pptx_ppt.save("temp.pptx")

                payload = {
                    "file": open("temp.pptx", "rb")
                }


            ppt_ocr = ocr_ppt(payload)

            ppt_sum = sum_ppt(ppt_ocr)

            return {
                "status": "success",
                "ppt_summary": ppt_sum,
                "raw": ppt_ocr
            }
        
        raise Exception("File type not supported")
            
    except Exception as e:
        return {"status": "error", "message": str(e)}


class DescribeRequest(BaseModel):
    content: str


@app.post("/describe")
def image_describe(body: DescribeRequest):
    try:
        description = get_description(body.content)
        return {
            "status": "success",
            "description": description,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.post("/generate_title")
def get_title(body: DescribeRequest):
    try:
        title = generate_title(body.content)
        return {
            "status": "success",
            "title": title,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.post("/generate_mcqs")
def get_mcqs(body: DescribeRequest):
    try:
        mcqs = generate_mcqs(body.content)
        return {
            "status": "success",
            "raw_mcqs": mcqs,
            "processed_mcqs": json.loads(mcqs),
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.get("/get_youtube_links")
def get_youtube_links(title: str, limit: int = 3):
    try:
        links = yt_search(title, limit=limit)
        return {
            "status": "success",
            "links": links,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.get("/get_books_recommendation")
def get_books_recommendation(title: str):
    try:
        links = get_books(title)
        return {
            "status": "success",
            "links": links,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

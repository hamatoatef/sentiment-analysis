from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline
from scipy.special import softmax

from starlette.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
allowed_origins = ["http://localhost:5173"]  # Replace with your allowed origins
app.add_middleware(
    CORSMiddleware, allow_origins=allowed_origins, allow_methods=["*"], allow_headers=["*"]
)

# Load the model and tokenizer
MODEL = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)
sentiment_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)


class TextRequest(BaseModel):
    text: str


@app.post("/analyze-sentiment/")
async def analyze_sentiment(request: TextRequest):
    # Get text from request
    text = request.text

    # valid the text data
    if len(text) > 500:
        return {"message": "the text must be less than 500 chat"}

    # Perform sentiment analysis
    result = sentiment_pipeline(text)

    # Extract the score
    score = result[0]['score']
    label = result[0]['label']

    # Return only the score in the desired format
    return {"message": "Success", "score": score , "label": label}



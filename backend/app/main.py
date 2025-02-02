import os
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints

load_dotenv()

app = FastAPI(
    title="Coder or Talker API",
    description="An API that compares GitHub profiles with other social media profiles.",
    version="1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}


app.include_router(endpoints.router, prefix="/api")

if __name__ == "__main__":
    port = os.getenv("PORT") or 8000
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)

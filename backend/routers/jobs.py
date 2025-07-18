from fastapi import APIRouter, Depends
from auth import get_current_user
from datetime import datetime

router = APIRouter()

@router.get("/list")
def get_jobs(user=Depends(get_current_user)):
    return [
        {
            "title": "Build FastAPI backend",
            "budget": 300,
            "country": "Armenia",
            "description": "Create a full backend API for freelance platform.",
            "posted_at": datetime.now()
        },
        {
            "title": "Create Telegram bot",
            "budget": 150,
            "country": "USA",
            "description": "Bot with inline buttons and admin panel.",
            "posted_at": datetime.now()
        }
    ]

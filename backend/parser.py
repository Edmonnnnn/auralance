from fastapi import APIRouter, Request
from pydantic import BaseModel
from typing import List

router = APIRouter()

class SearchRequest(BaseModel):
    keyword: str
    category: str

class Job(BaseModel):
    title: str
    description: str
    budget: str
    link: str

@router.post("/parser/run", response_model=List[Job])
async def run_parser(request: SearchRequest):
    # Пока просто возвращаем фейковые данные
    return [
        {
            "title": f"🔥 {request.keyword} Developer Needed",
            "description": "We need a fast and reliable freelancer with experience in " + request.category,
            "budget": "$500-$1000",
            "link": "https://example.com/job/1"
        },
        {
            "title": f"{request.keyword} Expert for Short Project",
            "description": "Looking for someone to help with " + request.category + " tasks",
            "budget": "$200",
            "link": "https://example.com/job/2"
        }
    ]

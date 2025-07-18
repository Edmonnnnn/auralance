from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/run")
async def run_parser(request: Request):
    data = await request.json()
    keywords = data.get("keyword", "")
    category = data.get("category", "")

    # 🔧 Здесь должен быть реальный вызов парсера, пока возвращаем мок
    print("Запрос от фронта:", data)

    mock_jobs = [
        {
            "title": f"{keywords.capitalize()} Developer Needed",
            "category": category or "development",
            "budget": "$500",
            "type": "Fixed",
            "experience": "Intermediate",
            "description": f"We're looking for someone with experience in {keywords}.",
            "link": "https://www.upwork.com/job/example"
        },
        {
            "title": f"Automate with {keywords}",
            "category": category or "automation",
            "budget": "$1000",
            "type": "Hourly",
            "experience": "Expert",
            "description": f"Need to automate tasks using {keywords}.",
            "link": "https://www.upwork.com/job/example2"
        }
    ]

    return JSONResponse(content=mock_jobs)

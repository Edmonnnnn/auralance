from fastapi import APIRouter, Query, Response, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.responses import StreamingResponse
from io import StringIO
import csv
import json

router = APIRouter()

history_data = []

class HistoryItem(BaseModel):
    keywords: str
    category: str
    date: str

@router.post("/save")
def save_history(item: HistoryItem):
    history_data.append(item.dict())
    return {"status": "saved"}

@router.get("/list")
def list_history() -> List[HistoryItem]:
    return history_data

@router.delete("/clear")
def clear_history():
    history_data.clear()
    return {"status": "cleared"}

@router.get("/export")
def export_history(format: str = Query(..., regex="^(csv|json)$")):
    if not history_data:
        raise HTTPException(status_code=404, detail="No history to export")

    if format == "csv":
        output = StringIO()
        writer = csv.DictWriter(output, fieldnames=["keywords", "category", "date"])
        writer.writeheader()
        for item in history_data:
            writer.writerow(item)
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=history.csv"}
        )

    return Response(
        content=json.dumps(history_data, indent=2),
        media_type="application/json",
        headers={"Content-Disposition": "attachment; filename=history.json"}
    )

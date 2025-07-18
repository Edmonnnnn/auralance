from fastapi import APIRouter, Depends
from auth_utils import verify_token

router = APIRouter()
filters_db = []

@router.get("/")
def get_filters(user=Depends(verify_token)):
    return filters_db

@router.post("/")
def create_filter(filter: dict, user=Depends(verify_token)):
    filters_db.append(filter)
    return {"status": "created", "filter": filter}

@router.delete("/{filter_id}")
def delete_filter(filter_id: int, user=Depends(verify_token)):
    if 0 <= filter_id < len(filters_db):
        deleted = filters_db.pop(filter_id)
        return {"status": "deleted", "filter": deleted}
    return {"error": "Invalid ID"}

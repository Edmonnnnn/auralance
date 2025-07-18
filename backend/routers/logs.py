from fastapi import APIRouter, Depends
from auth_utils import verify_token

router = APIRouter()

mock_logs = [
    {"type": "INFO", "msg": "Job parser started", "time": "2025-07-12 13:00"},
    {"type": "ERROR", "msg": "Parser failed: captcha detected", "time": "2025-07-12 13:02"}
]

@router.get("/")
def get_logs(user=Depends(verify_token)):
    return mock_logs

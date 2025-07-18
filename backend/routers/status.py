from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from auth_utils import get_current_user, admin_required

router = APIRouter()

@router.post("/start_job")
@admin_required
def start_job(user=Depends(get_current_user)):
    # Логика запуска
    return JSONResponse(content={"message": "Парсер запущен"})

@router.post("/stop_job")
@admin_required
def stop_job(user=Depends(get_current_user)):
    # Логика остановки
    return JSONResponse(content={"message": "Парсер остановлен"})

@router.post("/clear_queue")
@admin_required
def clear_queue(user=Depends(get_current_user)):
    # Логика очистки
    return JSONResponse(content={"message": "Очередь очищена"})

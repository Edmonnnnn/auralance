from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext

from db import SessionLocal, engine
from models.models import User, Base

# 🚀 Routers
from auth import router as auth_router
from routers import jobs, filters, logs
from history import router as history_router
from parser.router import router as parser_router  # ✅ исправлено

app = FastAPI(title="Auralance Admin API")

# 🔐 Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🌐 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔌 Routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(filters.router, prefix="/filters", tags=["Filters"])
app.include_router(logs.router, prefix="/logs", tags=["Logs"])
app.include_router(history_router, prefix="/history", tags=["History"])
app.include_router(parser_router, prefix="/parser", tags=["Parser"])  # ✅ исправлено

# ✅ Health check
@app.get("/")
def root():
    return {"message": "Auralance backend running"}

# ⚙️ DB и тестовый пользователь
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if not db.query(User).filter_by(username="admin@example.com").first():
        user = User(
            username="admin@example.com",
            password=pwd_context.hash("password")
        )
        db.add(user)
        db.commit()
        print("✅ Created test user: admin@example.com / password")
    db.close()

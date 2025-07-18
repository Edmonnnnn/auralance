from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from db import SessionLocal
from models.models import User
from pydantic import BaseModel
import datetime

# 🔐 Настройки
SECRET_KEY = "auralance_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# 📦 Схемы
class LoginForm(BaseModel):
    email: str
    password: str

# 🔌 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔐 Получение текущего пользователя по токену
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

# 🟢 Логин
@router.post("/login")
def login(form: LoginForm, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form.email).first()
    if not user or not pwd_context.verify(form.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": user.username, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

# 🆕 Регистрация
@router.post("/signup")
def signup(form: LoginForm, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == form.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(form.password)
    new_user = User(username=form.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": new_user.username, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

# 👤 Получение текущего пользователя
@router.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "dateJoined": str(current_user.created_at) if hasattr(current_user, 'created_at') else "N/A"
    }

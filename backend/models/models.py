from sqlalchemy import Column, Integer, String, DateTime, func
from db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="admin")  # future: "admin", "viewer", etc.
    created_at = Column(DateTime, default=func.now())  # дата создания
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())  # обновляется при любом действии

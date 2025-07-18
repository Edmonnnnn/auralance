from db import Base, engine, SessionLocal
from models.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if not db.query(User).filter(User.username == "admin@example.com").first():
        user = User(
            username="admin@example.com",
            password=pwd_context.hash("1234")
        )
        db.add(user)
        db.commit()
        print("✅ Admin created.")
    else:
        print("ℹ️ Admin user already exists.")
    db.close()

if __name__ == "__main__":
    init()

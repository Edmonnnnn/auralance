# inspect_users.py

from db import SessionLocal
from models.models import User

db = SessionLocal()

print("📋 All users in database:\n")
users = db.query(User).all()

for user in users:
    print(f"🧑 Username: {user.username} | Password (hashed): {user.password}")

db.close()

from app.models import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text

def seed_profiles():
    Demo = Profile(user_id=1, is_EHS=True, theme='Purple' )
    Kevin = Profile(user_id=2, is_EHS=True, theme='Pink' )
    Josh = Profile(user_id=3, is_EHS=False, theme='Blue' )


    db.session.add(Demo)
    db.session.add(Kevin)
    db.session.add(Josh)
    db.session.commit()


def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))
        
    db.session.commit()
from app.models import db, Lab, environment, SCHEMA
from sqlalchemy.sql import text

def seed_labs():

    lab131= Lab(profile_id=1, buildingNumber=3, roomNumber=131,)
    lab232 = Lab(profile_id=2, buildingNumber=7, roomNumber=232)
    lab124 = Lab(profile_id=1, buildingNumber=10, roomNumber=124 )


    db.session.add(lab131)
    db.session.add(lab232)
    db.session.add(lab124)
    db.session.commit()


def undo_labs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM labs"))
        
    db.session.commit()
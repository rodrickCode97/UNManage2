from app.models import db, Vendor, environment, SCHEMA
from sqlalchemy.sql import text

def seed_vendors():
    waste = Vendor(name='WastePickup', contact_id=1, phoneNumber='123-4567', email='waste@aa.io' )
    pickup = Vendor(name='wastepeople',contact_id=3, phoneNumber='432-1234', email='people@we.com')
    service = Vendor(name='service people', contact_id=2, phoneNumber='234-7656', email='we@people.com')


    db.session.add(waste)
    db.session.add(pickup)
    db.session.add(service)
    db.session.commit()


def undo_vendors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM vendors"))
        
    db.session.commit()
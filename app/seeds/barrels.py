from app.models import db, Barrel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_barrels():

    Aqueous = Barrel( lab=1, roomNumber=232, buildingNumber=3, profileNumber= 'UN3082', wasteType="Aqueous", wasteCapacity=55, is_full=False )
    Solvent = Barrel(lab=2, roomNumber=132, buildingNumber=5, profileNumber='UN1993', wasteType='Solvent', wasteCapacity=55, is_full=True )
    HPLC = Barrel( lab=3, roomNumber=124, buildingNumber=7, profileNumber='UN1993', wasteType='HPLC', wasteCapacity=55, is_full=True)


    db.session.add(Aqueous)
    db.session.add(Solvent)
    db.session.add(HPLC)
    db.session.commit()


def undo_barrels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.barrels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM barrels"))
        
    db.session.commit()
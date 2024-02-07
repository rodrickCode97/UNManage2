from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint
from datetime import datetime

class Barrel(db.Model):
    __tablename__ = 'barrels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    lab = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('labs.id')), nullable=False)
    roomNumber = db.Column(db.Integer, nullable=False)
    buildingNumber = db.Column(db.Integer, nullable=False)
    profileNumber = db.Column(db.String(25), nullable=False)
    wasteType =db.Column(db.String(255), nullable=False)
    wasteCapacity = db.Column(db.Integer, nullable=False)
    is_full = db.Column(db.Boolean)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    UniqueConstraint("buildingNumber", "roomNumber")

    labs = db.relationship("Lab", back_populates="barrels")



    def to_dict(self):
        return {
            'id': self.id,
            'roomNumber': self.roomNumber,
            'buildingNumber': self.buildingNumber,
            'profileNumber': self.profileNumber,
            'wasteType': self.wasteType,
            'wasteCapacity': self.wasteCapacity,
            'is_full': self.is_full
            }
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import UniqueConstraint

class Lab(db.Model):
    __tablename__ = 'labs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    profile_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profiles.id')), nullable=False)
    buildingNumber = db.Column(db.Integer)
    roomNumber = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    
    UniqueConstraint("buildingNumber", "roomNumber")

    profiles = db.relationship("Profile", back_populates='labs')
    barrels = db.relationship("Barrel", back_populates='labs', cascade='all, delete-orphan')

    def to_dict(self):
        return {
        'id': self.id,
        'profile_id': self.profile_id,
        'buildingNumber': self.buildingNumber,
        'roomNumber': self.roomNumber,
        'barrels': [barrel.to_dict() for barrel in self.barrels]

    }
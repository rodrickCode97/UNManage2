from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Vendor(db.Model):
    __tablename__ = "vendors"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    contact_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profiles.id')))
    phoneNumber = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(35), nullable = False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    profiles = db.relationship('Profile', back_populates='vendors')

    def to_dict(self):
       return {
        'id': self.id,
        'name': self.name,
        'contact_id': self.contact_id,
        'phoneNumber': self.phoneNumber,
        'email': self.email,
        }
   
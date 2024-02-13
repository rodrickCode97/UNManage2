from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)  
    # !still need to update table to make unique constraint show 
    is_EHS = db.Column(db.Boolean)
    theme = db.Column(db.String(25))
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='profiles')
    labs = db.relationship('Lab', primaryjoin='Profile.id==Lab.profile_id', back_populates='profiles', cascade="all, delete-orphan")
    vendors = db.relationship('Vendor', back_populates='profiles', cascade='all, delete-orphan')

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'is_EHS': self.is_EHS,
        'theme': self.theme,
        'labs': [lab.to_dict() for lab in self.labs],
        'vendors': [vendor.to_dict() for vendor in self.vendors]
        }
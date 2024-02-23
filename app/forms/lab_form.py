from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange
from app.models import Lab


def lab_exists(form, field):
    buildingNumber = form.buildingNumber.data
    roomNumber = form.roomNumber.data
    lab  = Lab.query.filter(Lab.roomNumber == roomNumber, Lab.buildingNumber == buildingNumber).first()
    if lab:
        raise ValidationError('Lab is already created')
    

    
class LabForm(FlaskForm):
    buildingNumber = IntegerField('buildingNumber', validators=[DataRequired(), NumberRange(min=1, max=1000, message='Must be a number between 1 and 1,000') ])
    roomNumber = IntegerField('roomNumber', validators=[DataRequired(), NumberRange(min=1, max=1000, message='Must be a number between 1 and 1,000') ])
    submit = SubmitField('submit', validators=[lab_exists])
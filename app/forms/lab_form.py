from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Lab


def lab_exists(form, field):
    buildingNumber = form.buildingNumber.data
    roomNumber = form.roomNumber.data
    lab  = Lab.query.filter(Lab.roomNumber == roomNumber, Lab.buildingNumber == buildingNumber).first()
    if lab:
        raise ValidationError('Lab is already created')
    
class LabForm(FlaskForm):
    buildingNumber = IntegerField('buildingNumber', validators=[DataRequired()])
    roomNumber = IntegerField('roomNumber', validators=[DataRequired(), lab_exists])
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length

class BarrelForm(FlaskForm):
    profileNumber= StringField('profileNumber', validators=[DataRequired(), Length(max=25)])
    buildingNumber = IntegerField('buildingNumber', validators=[DataRequired()])
    roomNumber = IntegerField('roomNumber', validators=[DataRequired()])
    wasteType = StringField('wasteType', validators=[DataRequired(), Length(max=255)])
    wasteCapacity = IntegerField('wasteCapacity', validators=[DataRequired()])

    is_full = BooleanField('is_full')
    
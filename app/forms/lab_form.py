from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length


class LabForm(FlaskForm):
    buildingNumber = IntegerField('buildingNumber', validators=[DataRequired()])
    roomNumber = IntegerField('roomNumber', validators=[DataRequired()])
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, EmailField, TelField
from wtforms.validators import DataRequired, Length


class VendorForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(),Length(max=35)])
    phone_number = TelField('PhoneNumber', validators=[DataRequired(), Length(max=10)])
    email = EmailField('Email', validators=[DataRequired(), Length(max=35)])
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, EmailField, TelField
from wtforms.validators import DataRequired, Length


class VendorForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(),Length(max=35)])
    phoneNumber = TelField('phoneNumber', validators=[DataRequired(), Length(max=10)])
    email = EmailField('email', validators=[DataRequired(), Length(max=35)])
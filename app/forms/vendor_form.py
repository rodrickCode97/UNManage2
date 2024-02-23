from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, EmailField, TelField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError, Email
from app.models import Vendor

def vendor_exists(form, field):
    name = form.name.data
    phoneNumber = form.phoneNumber.data
    email = form.email.data
    vendor  = Vendor.query.filter(Vendor.name == name, Vendor.phoneNumber == phoneNumber, Vendor.email == email).first()
    if vendor:
        raise ValidationError('Vendor is already created')


class VendorForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(),Length(max=35)])
    phoneNumber = TelField('phoneNumber', validators=[DataRequired(), Length(min=7,max=10, message='Please enter valid phone number')])
    email = EmailField('email', validators=[DataRequired(), Length(max=35), Email('Please enter a valid email address')])
    submit = SubmitField('submit', validators=[vendor_exists])
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length

class ProfileForm(FlaskForm):
    is_EHS = BooleanField('Is_EHS')
    theme = StringField('Theme', validators=[DataRequired(), Length(max=25)])
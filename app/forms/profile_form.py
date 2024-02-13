from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length, ValidationError
from flask_login import current_user
from app.models import Profile


# def profile_exist(current_user):
#     profile = Profile.query.filter(Profile.user_id == current_user.id).first()
#     print(profile)
#     if profile:
#         raise ValidationError('Profile already exists')
class ProfileForm(FlaskForm):
    is_EHS = BooleanField('Is_EHS')
    theme = StringField('Theme', validators=[DataRequired(), Length(max=25)])
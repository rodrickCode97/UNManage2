from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from app.models.profile import db, Profile
from app.forms.profile_form import ProfileForm
from app.api.auth_routes import validation_errors_to_error_messages 

profile_routes = Blueprint('profiles', __name__)

# current_profile = Profile.filter(current_user.id == Profile.userID)


#! Read Profile
@profile_routes.route('/profiles/dashboard')
@login_required
def profile():
    current_profile = Profile.query.filter(current_user.id == Profile.userID)
    
    profile_details = [current_profile.to_dict() for profile in current_profile]
    return jsonify(profile_details), 200


# ! Create a Profile
@profile_routes.route('/profiles', methods=['POST'])
def create_profile():
    
    form = ProfileForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_profile = Profile(userId = current_user.id,
        is_EHS = form.is_EHS.data,
        theme = form.theme.data)

        db.session.add(new_profile)
        db.session.commit()
        return jsonify(new_profile.to_dict()), 200
    
    return {'errors':validation_errors_to_error_messages(form.errors)}, 400



@profile_routes.route('/profile/<int:profileId>', methods=['PUT'])
@login_required
def update_profile(profileId):
    current_profile = Profile.query.filter(current_user.id == profileId)
     
    form = ProfileForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if not current_profile:
        abort(404, {'message': "profile not found"})

    if form.validate_on_submit():
        current_profile.is_EHS = form.is_EHS.data,
        current_profile.theme = form.theme.data

        db.session.commit()

        return jsonify(current_profile.to_dict()), 200
    
    return {'errors':validation_errors_to_error_messages(form.errors)}, 400
    



@profile_routes.route('/profile/<int:profileId>', methods=['DELETE'])
@login_required
def delete_profile(profileId):
    current_profile = Profile.query.filter(current_user.id == profileId)
    if not current_profile:
        return jsonify({'message', 'profile not found'}), 400
    
    db.session.delete(profileId)
    db.session.commit()
    return jsonify({'Message': "successfully deleted!"})
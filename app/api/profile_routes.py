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
    current_profile = Profile.query.filter(current_user.id == Profile.user_id)
        
    profile_details = [profile.to_dict() for profile in current_profile]
    return jsonify(profile_details), 200


# ! Create a Profile
@profile_routes.route('/profiles', methods=['POST'])
@login_required
def create_profile():
    
    form = ProfileForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_profile = Profile(user_id = current_user.id,
        is_EHS = form.is_EHS.data,
        theme = form.theme.data)

        db.session.add(new_profile)
        db.session.commit()
        return jsonify(new_profile.to_dict()), 200
    
    return {'errors':validation_errors_to_error_messages(form.errors)}, 400



@profile_routes.route('/profiles/<int:profile_id>', methods=['PUT'])
@login_required
def update_profile(profile_id):
    current_profile = Profile.query.get( profile_id)
     
    form = ProfileForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if not current_profile:
        abort(404, {'message': "profile not found"})

    if form.validate_on_submit():
        current_profile.is_EHS = form.is_EHS.data
        current_profile.theme = form.theme.data

        db.session.commit()

        return jsonify(current_profile.to_dict()), 200
    
    return {'errors':validation_errors_to_error_messages(form.errors)}, 400
    



@profile_routes.route('/profiles/<int:profile_id>', methods=['DELETE'])
@login_required
def delete_profile(profile_id):
    current_profile = Profile.query.get(profile_id)
    if not current_profile:
        return jsonify({'message', 'profile not found'}), 404
    
    db.session.delete(current_profile)
    db.session.commit()
    return jsonify({'Message': "successfully deleted!"})
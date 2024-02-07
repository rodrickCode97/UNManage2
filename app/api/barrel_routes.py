from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from app.models.barrel import db, Barrel
from app.models.profile import Profile
from app.models.lab import Lab
from app.forms.barrel_form import BarrelForm
from app.api.auth_routes import validation_errors_to_error_messages

barrel_routes = Blueprint('barrels', __name__)

# current_profile = Profile.filter(current_user.id == Profile.userID)

# ! Read All Barrels in a lab 
@barrel_routes.route('/labs/<int:lab_id>/barrels/')
@login_required
def barrel(lab_id):
    barrels = Barrel.query.filter(Barrel.lab == lab_id)
    barrels_details = [barrel.to_dict() for barrel in barrels]

    return jsonify(barrels_details), 200

@barrel_routes.route('/labs/<int:lab_id>/barrels', methods=['POST'])
@login_required
def create_barrel(lab_id):
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]
    current_lab = Lab.query.get(lab_id)
   
    
    if not current_lab:
        return jsonify({"message": "Lab not found"}), 400

    if not current_profile[0].is_EHS:
        return jsonify({'message': 'action Unauthorized'}), 400
    
    form = BarrelForm()

    form['csrf_token'].data = request.cookies['csrf_token']

  
    if form.validate_on_submit():
        new_barrel = Barrel( 
            lab = current_lab.id,
            profileNumber = form.profileNumber.data,
            buildingNumber = form.buildingNumber.data,
            roomNumber = form.roomNumber.data,
            wasteType = form.wasteType.data,
            wasteCapacity = form.wasteCapacity.data,
            is_full = False
            )
        db.session.add(new_barrel)
        db.session.commit()
        return jsonify(new_barrel.to_dict()), 200

    return  {'errors': validation_errors_to_error_messages(form.errors)}, 400




@barrel_routes.route('/labs/<int:lab_id>/barrels/<int:barrel_id>', methods=['PUT'])
@login_required
def update_barrel(lab_id, barrel_id):
    current_barrel = Barrel.query.get(barrel_id)
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]
    
    if not current_barrel:
        return jsonify({"message": "Barrel not found"}), 400

    if not current_profile[0].is_EHS:
        return jsonify({'message': 'action Unauthorized'}), 400
    
    form = BarrelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_barrel.profileNumber = form.profileNumber.data
        current_barrel.wasteType = form.wasteType.data
        current_barrel.wasteCapacity = form.wasteCapacity.data
        current_barrel.is_full = form.is_full.data

        db.session.commit()
        return jsonify(current_barrel.to_dict()), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    

@barrel_routes.route('/labs/<int:lab_id>/barrels/<int:barrel_id>', methods=['DELETE'])
@login_required
def delete_barrel(lab_id, barrel_id):
    current_barrel = Barrel.query.get(barrel_id)
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]

    if not current_barrel:
        return jsonify({"message": "Barrel not found"}), 400

    if not current_profile[0].is_EHS:
        return jsonify({'message': 'action Unauthorized'}), 400
    
    db.session.delete(current_barrel)
    db.session.commit()
    return jsonify({'Message': "successfully deleted!"})
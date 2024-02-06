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
@barrel_routes.route('/labs/<int:labId>/barrels/')
@login_required
def barrel(labId):
    barrels = barrel.query.get(Barrel.labId == labId)
    barrels_details = [barrel.to_dict() for barrel in barrels]

    return jsonify(barrels_details), 200

@barrel_routes.route('/labs/<int:labId>/barrels', methods=['POST'])
@login_required
def create_barrel(labId):
    current_profile = Profile.query.filter(current_user.id == Profile.userID)
    current_lab = Lab.query.get(labId)
    
    if not current_lab:
        abort(404, {"message": "Lab not found"})

    if not current_profile.is_EHS:
        return abort(404, {'message': 'action Unauthorized'})
    
    form = barrelForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      new_barrel = Barrel( 
          profileNumber = form.ProfileNumber.data,
          wasteType = form.wasteType.data,
          wasteCapacity = form.wasteCapacity.data,
          is_full = False
                          )
      db.session.add(new_barrel)
      db.session.commit()
      return jsonify(new_barrel.to_dict()), 200

    return  {'errors': validation_errors_to_error_messages(form.errors)}, 400




@barrel_routes.route('/labs/<int:labId>/barrels/<int:barrelId>', methods=['PUT'])
@login_required
def update_barrel(barrelId):
    current_barrel = Barrel.query.get(barrelId)
    current_profile = Profile.query.filter(current_user.id == Profile.userID)
    
    if not current_barrel:
        return abort(404, {'message': 'Barrel not found'})
    if not current_profile.is_EHS:
        return jsonify({'message':"Unauthorized action"})
    
    form = barrelForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_barrel.profileNumber = form.profileNumber.data
        current_barrel.wasteType = form.wasteType.data
        current_barrel.wasteCapacity = form.wasteCapacity.data
        current_barrel.is_full = form.is_full.data

        db.session.commit()
        return jsonify(current_barrel.to_dict()), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    

@barrel_routes.route('/labs/<int:labId>/barrels/<int:barrelId>', methods=['DELETE'])
@login_required
def delete_barrel(barrelId):
    current_barrel = Barrel.query.get(barrelId)
    current_profile = Profile.query.filter(current_user.id == Profile.userID)

    if not current_barrel:
        return abort(404, {'message': 'Barrel not found'})
    if not current_profile.is_EHS:
        return jsonify({'message':"Unauthorized action"})
    
    db.session.delete(barrelId)
    db.session.commit()
    return jsonify({'Message': "succesfully deleted!"})
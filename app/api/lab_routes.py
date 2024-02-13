from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required

from app.models.lab import db, Lab
from app.models.profile import Profile
from app.forms.lab_form import LabForm
from app.api.auth_routes import validation_errors_to_error_messages 

lab_routes = Blueprint('labs', __name__)

# current_profile = Profile.filter(current_user.id == Profile.userID)

# ! Read All Labs
@lab_routes.route('/labs')
@login_required
def all_labs():
#    returns every lab in the database
   labs = Lab.query.all()
#  loop through labs and create a list for all details 
   lab_details = [lab.to_dict() for lab in labs]
   return jsonify(lab_details), 200


#   ! Create A Lab 
@lab_routes.route('/labs', methods=['POST'])
@login_required
def create_lab():
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]
  
    #  Create new instance of the lab form 
    
    form = LabForm()
#  Csrf Token Auth
    form['csrf_token'].data =request.cookies['csrf_token']
    if  not current_profile[0].is_EHS:
         return jsonify({'errors': "unauthorized"}), 400

    if form.validate_on_submit():
        new_lab = Lab(
        profile_id = current_user.id,
        buildingNumber = form.buildingNumber.data,
        roomNumber = form.roomNumber.data   
        )

        db.session.add(new_lab) 
        db.session.commit()
        return jsonify(new_lab.to_dict()), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# ! Update Lab
@lab_routes.route('/labs/<int:lab>', methods=['PUT'])
@login_required
def update_lab(lab):
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]
   
    current_lab = Lab.query.get(lab)

    if not current_lab:
        return jsonify({"message": "Lab not found"}), 400

    if  not current_profile[0].is_EHS:
       return jsonify({'message': "unauthorized"}), 400

    form = LabForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_lab.buildingNumber = form.buildingNumber.data
        current_lab.roomNumber = form.roomNumber.data  

        db.session.commit()
        return jsonify(current_lab.to_dict()), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#  ! delete
@lab_routes.route('/labs/<int:labId>', methods=['DELETE'])
@login_required
def delete_lab(labId):
    current_lab = Lab.query.get(labId)
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]


    if not current_lab:
        return jsonify({'message': "Lab not found"}), 400
    
    if not current_profile[0].is_EHS:
        return  jsonify({'message': 'action Unauthorized'}), 400
    
    db.session.delete(current_lab)
    db.session.commit()
    return jsonify({'Message': "successfully deleted!"})
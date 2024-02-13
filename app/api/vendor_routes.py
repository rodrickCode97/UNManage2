from flask import Blueprint, jsonify, abort, request
from flask_login import current_user, login_required


from app.models.vendor  import db, Vendor
from app.models.profile import Profile
from app.forms.vendor_form import VendorForm
from app.api.auth_routes import validation_errors_to_error_messages 

vendor_routes = Blueprint('vendors', __name__)

# current_profile = Profile.query.filter(current_user.id == Profile.userID)

@vendor_routes.route('/vendors')
@login_required
def get_vendor():
    # Return all Vendors from Vendors table Query.
    vendors = Vendor.query.all()
# loop through vendors to grab all details and save result in a list saved under a variable.
    vendor_data = [vendor.to_dict() for vendor in vendors]
    # return Vendors passed in jsonify 
    return jsonify(vendor_data), 200




@vendor_routes.route('/vendors', methods=['POST'])
@login_required 
def create_vendor():
    #  create an instance of the form 
    form = VendorForm()

    #  Csrf Token Auth
    form['csrf_token'].data =request.cookies['csrf_token']
    #  Grab current profile 
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]
    # return jsonify({'current_profile': current_profile[0].to_dict()})
    # if the current profile is not  a part of the EHS group return error
    if not  current_profile[0].is_EHS : 
        return jsonify({'message': 'unauthorized'}), 400
        # if form has no errors 
    if form.validate_on_submit():
        new_vendor = Vendor(
            name = form.name.data,
            contact_id = current_profile[0].user_id,
            phoneNumber = form.phoneNumber.data,
            email = form.email.data
        )

        db.session.add(new_vendor)
        db.session.commit()
        return jsonify(new_vendor.to_dict()), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


    


@vendor_routes.route('/vendors/<int:vendor_id>', methods=['PUT'])
@login_required
def update_vendor(vendor_id):
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]  
    current_vendor = Vendor.query.get(vendor_id)

    if not current_vendor:
        jsonify({'message': 'Vendor not found'}),400

    if not current_profile[0].is_EHS:
        return jsonify({'message': 'unauthorized action'}), 400
    
    form = VendorForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_vendor.name = form.name.data
        current_vendor.phoneNumber = form.phoneNumber.data
        current_vendor.email = form.email.data

        db.session.commit()
        return jsonify(current_vendor.to_dict()), 200
    
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400
    



@vendor_routes.route('/vendors/<int:vendor_id>', methods=['DELETE'])
@login_required
def delete_vendor(vendor_id):
    profiles = Profile.query.filter(current_user.id == Profile.user_id)
    current_profile = [profile for profile in profiles]

    # if the current profile is not  a part of the EHS group return error

    current_vendor = Vendor.query.get(vendor_id)

    if not current_vendor: 
        return jsonify({'message': 'Vendor not Found'}), 400
    
    if not current_profile[0].is_EHS:
        return jsonify({'message': 'action unauthorized'}), 400
    
    db.session.delete(current_vendor)
    db.session.commit()
    return jsonify({'Message': "successfully deleted!"})
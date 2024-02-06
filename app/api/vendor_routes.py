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
    current_profile = Profile.query.filter(current_user.id == Profile.userID)
    # if the current profile is not  a part of the EHS group return error
    if not  current_profile.is_EHS : 
        return jsonify({'message': 'unauthorized'}), 400
        # if form has no errors 
    if form.validate_on_submit():
        new_vendor = Vendor(
            name = form.name.data,
            contact_id = current_profile.userID,
            phoneNumber = form.phone_number.data,
            email = form.data.email
        )

        db.session.add(new_vendor)
        db.session.commit()
        return jsonify(new_vendor.to_dict()), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


    


@vendor_routes.route('/vendors/<int:vendorId>', methods=['PUT'])
@login_required
def update_vendor(vendorId):
    current_profile = Profile.filter(current_user.id == Profile.userID)
    
    current_vendor = Vendor.query.get(vendorId)

    if not current_vendor:
        abort(404, {'message': 'Vendor not found'})

    if not current_profile.is_EHS:
        return jsonify({'message': 'unauthorized action'})
    
    form = VendorForm()

    form['csrf_token'].data = request.cookies['csrf-token']

    if form.validate_on_submit():
        current_vendor.name = form.name.data
        current_vendor.phone_number = form.phone_number.data
        current_vendor.email = form.email.data

        db.session.commit()
        return jsonify(current_vendor.to_dict()), 200
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    



@vendor_routes.route('/vendors/<int:vendorId>', methods=['DELETE'])
@login_required
def delete_profile(vendorId):
    current_profile = Profile.query.filter(current_user.id == Profile.userID)
    current_vendor = Vendor.query.get(vendorId)

    if not current_vendor: 
        return abort(404, {'message': 'Vendor not Found'})
    
    if not current_profile.is_EHS:
        return abort(404, {'message': 'action unauthorized'})
    
    db.session.delete(vendorId)
    db.session.commit()
    return jsonify({'Message': "successfully deleted!"})
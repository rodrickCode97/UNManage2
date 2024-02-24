import React, {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { createVendor, readVendor, updateVendor } from "../../store/vendors";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom"

import "./vendor.css";

const UpdateVendorForm = (state) => {
    const dispatch = useDispatch();
    const { id, vendor } = state.state;
    //state 
    const [name, setName] = useState(vendor.name);
    const [phoneNumber, setPhoneNumber] = useState(vendor.phoneNumber);
    const [email, setEmail] = useState(vendor.email);
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    
    // handles
    const handleName = e => setName(e.target.value);
    const handlePhoneNumber = e => setPhoneNumber(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
   

    //payload
    const payload = {
        name,
        phoneNumber,
        email
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateVendor(parseInt(id), payload)).then(() => dispatch(readVendor())).then(()=> closeModal());
            setErrors({})
        } catch (data) {
            setErrors(data.errors);
         
        }
        setName(vendor.name)
        setPhoneNumber(vendor.phoneNumber)
        setEmail(vendor.email)

    };

    useEffect(() => {
        dispatch(readVendor())
    }, [dispatch])
	return (
		<div>
			<form onSubmit={handleSubmit} className="vendor_form_container">
                {errors && errors.map(error => <p>{error}</p>)}
                <p>Name:</p>
				<input
					className="vendor_form_input"
					type="text"
					value={name}
					onChange={handleName}
					name="name"
					required
                />
                <br/>
                <p>Phone Number:</p>
                <input
					className="vendor_form_input"
					type="text"
					value={phoneNumber}
					onChange={handlePhoneNumber}
					name="phoneNumber"
					required
                />
                <br/>
                <p>Email:</p>
                <input
					className="vendor_form_input"
					type="text"
					value={email}
					onChange={handleEmail}
					name="Email"
					placeholder="Enter E-Mail"
					required
                />
                <br/>
              
				<button type="submit" className="button">
					Update Vendor
				</button>
			</form>
		</div>
	);


} 

export default UpdateVendorForm;
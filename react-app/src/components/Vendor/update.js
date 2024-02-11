import React, {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { createVendor, readVendor, updateVendor } from "../../store/vendors";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom"

import "./vendor.css";

const UpdateVendorForm = () => {
    const dispatch = useDispatch();
    //state 
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    const { id } = useParams();
    
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
        setErrors({})
        try {
            await dispatch(updateVendor(parseInt(id), payload)).then(() => dispatch(readVendor())).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data });
            console.log(errors)
        }
        setName('')
        setPhoneNumber('')
        setEmail('')

    };

    useEffect(() => {
        dispatch(readVendor())
    }, [dispatch])
	return (
		<div>
			<form onSubmit={handleSubmit} className="vendor_form_container">
				{errors && <p>{errors.errors}</p>}
				<input
					className="vendor_form_input"
					type="text"
					value={name}
					onChange={handleName}
					name="name"
					placeholder="Enter Name"
					required
                />
                <input
					className="vendor_form_input"
					type="text"
					value={phoneNumber}
					onChange={handlePhoneNumber}
					name="phoneNumber"
					placeholder="Enter Phone Number"
					required
                />
                <input
					className="vendor_form_input"
					type="text"
					value={email}
					onChange={handleEmail}
					name="Email"
					placeholder="Enter E-Mail"
					required
                />
              
				<button type="submit" className="submitButton">
					Update Vendor
				</button>
			</form>
		</div>
	);


} 

export default UpdateVendorForm;
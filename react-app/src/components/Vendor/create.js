import React, {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { createVendor, readVendor } from "../../store/vendors";
import { useModal } from "../../context/Modal";

import "./vendor.css";

const CreateVendorForm = () => {
    const dispatch = useDispatch();

    //state 
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
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
            await dispatch(createVendor(payload)).then(() => dispatch(readVendor())).then(() => closeModal());
            setErrors({})
        } catch (data) {
         
            setErrors(data.errors);
            
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
                {errors && errors.map(error => <p>{error}</p>)}
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
              
				<button type="submit" className="button">
					Add Vendor
				</button>
			</form>
		</div>
	);


} 

export default CreateVendorForm;
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {readProfile, updateProfile } from '../../store/profiles';
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom"

import "./profile.css";

const UpdateProfileForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const profile_id = parseInt(id)
    console.log(profile_id)

    //state 
    const [isEHS, setIsEHS] = useState();
    const [theme, setTheme] = useState();
  
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    
    // handles

    const handleIsEHS = e => setIsEHS(e.target.value);
    const handleTheme = e => setTheme(e.target.value);

    //payload
    const payload = {
        is_EHS: parseInt(isEHS),
        theme
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        try {
            await dispatch(updateProfile(profile_id, payload)).then(() => dispatch(readProfile())).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data });
        }
     
     

    };

    useEffect(() => {
        dispatch(readProfile())
    }, [dispatch])
	return (
		<div>
			<form onSubmit={handleSubmit} className="barrel_form_container">
                {errors && <p>{errors.errors}</p>}
        <label>
            Are You EHS? 
        <input type="radio" name="EHS" id="True" value={parseInt(1)} onChange={handleIsEHS} />
                    <label for='True'>
                    Yes
                    </label>

                    <input type="radio" name="EHS" id="False" value={parseInt(0)} onChange={handleIsEHS} />
                    <label for='False'>
                    No
                    </label>
        </label>
                <input
					className="profile_form_input"
					type="text"
					value={theme}
					onChange={handleTheme}
					name="Theme"
					placeholder="Enter a Theme... ex. red"
					required
                />
				<button type="submit" className="submitButton">
					Update Profile
				</button>
			</form>
		</div>
	);


} 

export default UpdateProfileForm;
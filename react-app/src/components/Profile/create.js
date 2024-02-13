import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { createProfile, readProfile } from '../../store/profiles';
import { useModal } from "../../context/Modal";

import "./profile.css";

const CreateProfileForm = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profiles.profiles[0])
    console.log(profile)
    

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
        if(profile) setErrors({errors: "A profile for this user already exists"})
        try {
            await dispatch(createProfile(payload)).then(() => dispatch(readProfile())).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data });
        }
     
     

    };

    // useEffect(() => {
    //     dispatch(readProfile())
    // }, [dispatch])
    
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
					Create Profile
				</button>
			</form>
		</div>
	);


} 

export default CreateProfileForm;
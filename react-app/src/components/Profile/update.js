import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {readProfile, updateProfile } from '../../store/profiles';
import { useModal } from "../../context/Modal";
import "./profile.css";
const UpdateProfileForm = (profile) => {
    const dispatch = useDispatch();
    const { id } = profile.profile[0]
    const profile_id = parseInt(id)
 

    //state 
    const [isEHS, setIsEHS] = useState();
    const [theme, setTheme] = useState('red');
  
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
        <label>
        Choose a profile theme:
        <select
          value={theme}
          onChange={handleTheme}
        >
          <option value="red"> Red </option>
          <option value="green"> Green</option>
          <option value="purple"> purple </option>
          <option value="blue"> Blue</option>      
        </select>
        </label>
				<button type="submit" className="submitButton">
					Update Profile
				</button>
			</form>
		</div>
	);


} 

export default UpdateProfileForm;
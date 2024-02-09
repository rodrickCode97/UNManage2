import React, {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { createProfile, readProfile } from '../../store/profiles';
import { useModal } from "../../context/Modal";

import "./barrel.css";

const CreateProfileForm = () => {
    const dispatch = useDispatch();

    //state 
    const [isEHS, setIsEHS] = useState('');
    const [theme, setTheme] = useState();
  
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    
    // handles

    const handleIsEHS = e => setIsEHS(e.target.value);
    const handleTheme = e => setTheme(e.target.value);

    //payload
    const payload = {
        isEHS,
        theme
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        try {
            await dispatch(createProfile(payload)).then(() => dispatch(readProfile())).then(() => closeModal());
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
				<input
					className="profile_form_input"
					type="text"
					value={isEHS}
					onChange={handleIsEHS}
					name="EHS"
					placeholder="Enter if your EHS... ex. yes"
					required
                />
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
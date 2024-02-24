import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { createProfile, readProfile } from '../../store/profiles';
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/";

import "./profile.css";

const CreateProfileForm = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profiles.profiles);
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    

    //state 
    const [isEHS, setIsEHS] = useState();
    const [theme, setTheme] = useState('red');
    const [isLoading, setIsLoading] = useState(true)
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
    useEffect(() => {
        dispatch(readProfile()).then(()=> setIsLoading(false))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        if(profile[0]){
            setErrors({ errors: "A profile for this user already exists" }) 
            return
        } 
        try {
            await dispatch(createProfile(payload)).then(() => history.push('/profiles/dashboard'));
        
        } catch (data) {
            setErrors({ ...data });
        }
     
     

    };



    if(isLoading) return <img src='../../resources/images/flask.svg' alt='flask'/>
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
          <option value="red" > Red </option>
          <option value="green"> Green</option>
          <option value="purple"> purple </option>
          <option value="blue"> Blue</option>      
        </select>
        </label>
				<button type="submit" className="submitButton">
					Create Profile
				</button>
			</form>
		</div>
	);


} 

export default CreateProfileForm;
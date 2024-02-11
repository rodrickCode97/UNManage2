import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./profile.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProfile, readProfile } from '../../store/profiles';


const DeleteProfile = () => {
    const { id } = useParams();
    const profile_id = parseInt(id)
  
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
   dispatch(deleteProfile(profile_id)).then(() => dispatch(readProfile()));
        history.push('/profiles/dashboard');
    }
    useEffect(() => {
        dispatch(readProfile()).then(() => setIsLoading(false))
    }, [dispatch])
    
    return (
        <div>
            
       <button type='submit' onClick={handleDelete}> Delete Profile</button>
           
        </div>
    )
}
export default DeleteProfile;
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./profile.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProfile, readProfile } from '../../store/profiles';
import { useModal } from '../../context/Modal';


const DeleteProfile = (state) => {
    console.log(state)
    const {id} = state.profile[0];
    const profile_id = parseInt(id)
    const {closeModal} = useModal()
    console.log(id)
  
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    // const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
   dispatch(deleteProfile(profile_id)).then(() => dispatch(readProfile())).then(closeModal());
        history.push('/profiles');
    }
    const cancelDelete = e => {
        e.preventDefault()
        closeModal()
    }
    // useEffect(() => {
    //     dispatch(readProfile()).then(() => setIsLoading(false))
    // }, [dispatch])
    
    return (
        <div>
           <p>are you sure you want to delete this profile? </p> 
            <button type='submit' onClick={handleDelete}> Delete Profile</button>
            <button type='submit' onClick={cancelDelete}>Cancel</button>
           
        </div>
    )
}
export default DeleteProfile;
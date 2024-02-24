import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./profile.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProfile, readProfile } from '../../store/profiles';
import { useModal } from '../../context/Modal';
import { readLab } from '../../store/lab';


const DeleteProfile = (state) => {
   
    const {id} = state.profile[0];
    const profile_id = parseInt(id)
    const {closeModal} = useModal()
   
  
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    // const [isLoading, setIsLoading] = useState(true);
    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteProfile(profile_id)).then(closeModal());
        history.push('/profiles');
    }
    const cancelDelete = e => {
        e.preventDefault()
        closeModal()
    }
    // useEffect(() => {
    //     dispatch(readProfile()).then(()=>dispatch(readLab()));
    // }, [dispatch])
    
    return (
        <div>
           <p>are you sure you want to delete this profile? </p> 
            <button type='submit' className='button' onClick={handleDelete}> Delete Profile</button>
            <button type='submit' className='button' onClick={cancelDelete}>Cancel</button>
           
        </div>
    )
}
export default DeleteProfile;
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./profile.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readProfile } from '../../store/profiles'
import UpdateProfileForm from './update';
import Vendors from '../Vendor';
import Lab from '../Lab/labs';
import DeleteProfile from './delete';
import Labs from '../Lab';
import { readLab } from '../../store/lab';
import { readVendor } from '../../store/vendors';


const Profile = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const profile = useSelector(state => state.profiles.profiles[0])
    useEffect(() => {
        dispatch(readLab())
      }, [dispatch]);


    // if(isLoading) return <h1> Loading </h1>
    return (
        <div className='ld ld-blur-in'>
            <h1>Hello From Profile</h1>
            <OpenModalButton buttonText={'edit profile'} modalComponent={<UpdateProfileForm profile={profile} />} />
            <OpenModalButton buttonText={'delete profile'} modalComponent={<DeleteProfile state={profile} />} />
            <Vendors /> 
            <Labs/>

        </div>
    )
}
export default Profile;
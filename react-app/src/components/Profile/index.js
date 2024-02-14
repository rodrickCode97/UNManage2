import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./profile.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readProfile } from '../../store/profiles';
import CreateProfileForm from './create';
import CreateVendorForm from '../Vendor/create';
import UpdateVendorForm from '../Vendor/update';
import UpdateProfileForm from './update';
import Vendors from '../Vendor';
import Lab from '../Lab/labs';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteProfile from './delete';
import Labs from '../Lab';


const Profile = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const profile = useSelector(state => state.profiles.profiles[0])


  
    const [isLoading, setIsLoading] = useState(true);
  
    // useEffect(() => {
    //     dispatch(readProfile()).then(() => setIsLoading(false))
    // }, [dispatch])
    
    return (
        <div>
            <h1>Hello From Profile</h1>
            <OpenModalButton buttonText={'edit profile'} modalComponent={<UpdateProfileForm profile={profile} />} />
            <OpenModalButton buttonText={'delete profile'} modalComponent={<DeleteProfile state={profile} />} />
            <Vendors /> 
            <Labs/>

        </div>
    )
}
export default Profile;
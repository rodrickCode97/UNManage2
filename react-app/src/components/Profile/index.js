import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./profile.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readProfile } from '../../store/profiles';
import CreateProfileForm from './create';
import CreateVendorForm from '../Vendor/create';
import UpdateVendorForm from '../Vendor/update';

const Profile = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(readProfile()).then(() => setIsLoading(false))
    }, [dispatch])
    
    return (
        <div>
            
        <h1>Hello From Profile</h1>
            <CreateProfileForm />
        </div>
    )
}
export default Profile;
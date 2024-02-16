import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./vendor.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';

const Landing = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const vendors = useSelector(state => state.vendors.vendors);
    const vendorsArr = Object.values(vendors) 
    // useEffect(() => {
    //     dispatch(readVendor()).then(() => setIsLoading(false))
    // })
    return (
        <div className='Landing_container'>
            <h1>UN-Manage 2</h1>
            <div>
            <OpenModalButton modalComponent={<SignupFormModal />} buttonText={'Sign Up'} />
                <OpenModalButton modalComponent={<LoginFormModal />} buttonText={'Login'} />


            </div>
        </div>
    )
}
export default Landing;
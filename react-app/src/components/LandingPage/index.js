import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./landingPage.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';

const Landing = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
   
    // useEffect(() => {
    //     dispatch(readVendor()).then(() => setIsLoading(false))
    // })
    return (
        <div className='landing_container'>
            <div className={'content'}>
            <h1>UN-Manage 2</h1>
            <OpenModalButton modalComponent={<SignupFormModal />} buttonText={'Sign Up'} />
                <OpenModalButton modalComponent={<LoginFormModal />} buttonText={'Login'} />
            </div>
        </div>
    )
}
export default Landing;
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./landingPage.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import DemoUserButton from '../DemoUser';



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
                <h1 className='title'>UN-Manage 2</h1>
                <div className='buttons'>
            <OpenModalButton  className={'button'}modalComponent={<SignupFormModal />} buttonText={'Sign Up'} />
                <OpenModalButton  className={'button'} modalComponent={<LoginFormModal />} buttonText={'Login'} />
                    <DemoUserButton />
                  
                </div>
            </div>
        </div>
    )
}
export default Landing;
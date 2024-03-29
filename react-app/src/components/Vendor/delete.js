import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./vendor.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { readVendor, deleteVendor } from '../../store/vendors';
import { useModal } from '../../context/Modal';


const DeleteVendorButton = (state) => {
   
    const id  = state.state
    const { closeModal } = useModal();
    const vendorId = parseInt(id)

  
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
   dispatch(deleteVendor(vendorId)).then(() => dispatch(readVendor())).then(()=> closeModal());
        history.push('/profiles/dashboard');
    }
    const handleCancel = e => {
        e.preventDefault();
        closeModal();
    }
    useEffect(() => {
        dispatch(readVendor()).then(() => setIsLoading(false))
    }, [dispatch])
    
    return (
        <div>
            <p>Are You sure you would like to delete this vendor?</p>
       <button type='submit' className='button'  onClick={handleDelete}> Delete Vendor</button>
       <button type='submit' className='button' onClick={handleCancel}> Cancel</button>
           
        </div>
    )
}
export default DeleteVendorButton;
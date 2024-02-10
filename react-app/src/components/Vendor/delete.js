import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./vendor.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { readVendor, deleteVendor } from '../../store/vendors';


const DeleteVendorButton = () => {
    const {id} = useParams();
    const vendorId = parseInt(id)

  
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
   dispatch(deleteVendor(vendorId)).then(() => dispatch(readVendor()));
        history.push('/vendors');
    }
    useEffect(() => {
        dispatch(readVendor()).then(() => setIsLoading(false))
    }, [dispatch])
    
    return (
        <div>
            
       <button type='submit' onClick={handleDelete}> Delete Vendor</button>
           
        </div>
    )
}
export default DeleteVendorButton;
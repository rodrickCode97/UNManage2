import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./vendor.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readVendor } from '../../store/vendors';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import CreateVendorForm from './create';
import DeleteVendorButton from './delete';
import UpdateVendorForm from './update';
import VendorDetail from './vendorDetail';

const Vendors = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const vendors = useSelector(state => state.vendors.vendors);
    const vendorsArr = Object.values(vendors) 
    useEffect(() => {
        dispatch(readVendor())
    }, [dispatch])

    return (
        <div className='vendor_container'>
            <h1>Hello From Vendors</h1>
            <p> Current Vendors:</p>
            <div className='vendors'>  
            {vendorsArr.map(vendor => (
                <div key={vendor.id} >
                    <OpenModalButton buttonText={vendor.name} modalComponent={<VendorDetail state={vendor.id} />}/>
                    </div>
            ))}
            </div>
             <OpenModalButton buttonText={'Add Vendor'} modalComponent={<CreateVendorForm />} />
        </div>
    )
}
export default Vendors;
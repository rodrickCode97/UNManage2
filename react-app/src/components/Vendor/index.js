import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./vendor.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readVendor } from '../../store/vendors';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Vendors = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const vendors = useSelector(state => state.vendors.vendors);
    const vendorsArr = Object.values(vendors) 
    // useEffect(() => {
    //     dispatch(readVendor()).then(() => setIsLoading(false))
    // })
    return (
        <div>
            <h1>Hello From Vendors</h1>
            <p> Current Vendors:</p>
            {vendorsArr.map(vendor => (
                <div key={vendor.id}>
                   <NavLink exact to={`/vendors/${vendor.id}`}> <p>{vendor.name}</p></NavLink>
                    </div>
            ))}
        </div>
    )
}
export default Vendors;
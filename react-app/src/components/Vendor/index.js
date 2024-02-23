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
    const profiles = useSelector(state => state.profiles.profiles)
    let vendorsArr;
    let profile;
    let profileEhs;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(readVendor()).then(() => setIsLoading(false))
    }, [dispatch])

    if (vendors) {
         vendorsArr = Object.values(vendors) 
    }
    if (profiles) {
        profile = profiles[0];
        profileEhs = profile.is_EHS;
    }
 
    if(isLoading) return <img src='../../resources/images/flask.svg' alt='flask'/>
    return (
        <div className='vendor_container'>
            <h1>Hello From Vendors</h1>
            <p> Current Vendors:</p>
            <div className='vendors'>  
            { profileEhs && <OpenModalButton buttonText={'Add Vendor'} modalComponent={<CreateVendorForm  />} className='add_vendor' />}
            {vendorsArr.map(vendor => (
                <div key={vendor.id} className='vendors_button'>
                    <div className='vendor_modal'>
                        <OpenModalButton buttonText={vendor.name} modalComponent={<VendorDetail state={vendor.id}  />} className={'ven_button'} />
                        </div>
                    </div>
            ))}
            </div>
        </div>
    )
}
export default Vendors;
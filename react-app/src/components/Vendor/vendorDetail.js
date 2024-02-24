import { useDispatch, useSelector  } from "react-redux";
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import CreateBarrelForm from "../Barrel/create";
import DeleteBarrelButton from "../Barrel/delete";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import UpdateBarrelForm from "../Barrel/update";
import UpdateVendorForm from "./update";
import DeleteVendorButton from "./delete";
import './vendor.css'

const VendorDetail = (state) => {
  
    const  id  = state.state;
    const vendors = useSelector(state => state.vendors.vendors)
    const profiles = useSelector(state => state.profiles.profiles)
    let profile;
    let profileEhs;
    if (profiles) {
      profile = profiles[0];
       profileEhs = profile.is_EHS;
    }
    const vendorsArr = Object.values(vendors);
    const currentVendor = vendorsArr.filter(vendor => vendor.id === Number(id))
    const vendor= currentVendor[0]
    return (
        <div className={"vendor_container"}>
            
            <h1 className="vendor_name"> {vendor.name}</h1>
            <h2 className="vendor_phone"> Phone: {vendor.phoneNumber}</h2>
            <h2 className="vendor_email"> Email: {vendor.email}</h2>
          {profileEhs &&  <div>
                <OpenModalButton className={'button'} buttonText={'Update Vendor'} modalComponent={<UpdateVendorForm state={{id: id, vendor:vendor}} className={'vendor_modal'} />} />
                <OpenModalButton className={'button'} buttonText={'Delete Vendor'} modalComponent={<DeleteVendorButton state={id} />} />
            </div>}
        </div>
)

}

export default VendorDetail;
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
    const vendorsArr = Object.values(vendors);
    const currentVendor = vendorsArr.filter(vendor => vendor.id === Number(id))
    const vendor= currentVendor[0]
    return (
        <div className={"vendor_container"}>
            <div>
                <OpenModalButton buttonText={'Update Vendor'} modalComponent={<UpdateVendorForm state={id} />} />
                <OpenModalButton buttonText={'Delete Vendor'} modalComponent={<DeleteVendorButton state={id} />} />
            </div>
            <h1>hi from Vendor detail</h1>
            <h1> {vendor.name}, </h1>
            <h2> Phone: {vendor.phoneNumber}</h2>
            <h2> Email: {vendor.email}</h2>
        </div>
)

}

export default VendorDetail;
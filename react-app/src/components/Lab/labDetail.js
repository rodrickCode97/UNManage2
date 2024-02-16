import { useDispatch, useSelector  } from "react-redux";
import { useParams } from "react-router-dom"
import './lab.css'
import OpenModalButton from "../OpenModalButton";
import CreateBarrelForm from "../Barrel/create";
import DeleteBarrelButton from "../Barrel/delete";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import UpdateBarrelForm from "../Barrel/update";
import UpdateLabForm from "./update";
import DeleteLabButton from "./delete";

const LabDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const labs = useSelector(state => state.lab.labs)
    const labsArr = Object.values(labs);
    const currentLab = labsArr.filter(lab => lab.id === Number(id))
    const lab = currentLab[0]
    return (
        <div className="ld ld-blur-in">
            <div>
                <OpenModalButton buttonText={'Update Lab'} modalComponent={<UpdateLabForm state={id} />} />
                <OpenModalButton buttonText={'Delete Lab'} modalComponent={<DeleteLabButton state={id} />} />
            </div>
            <h1>hi from Lab detail</h1>
            <h1>Building {lab.buildingNumber}, Rm {lab.roomNumber}</h1>
            <h2> barrels </h2>
            {lab.barrels.map(barrel => (
                <div key={barrel.id}>
                   <h2>{barrel.wasteType} Barrel</h2>
                     <h3>Profile Number: {barrel.profileNumber}</h3>
                    <p>Waste Capacity: {barrel.wasteCapacity} Gallons </p>
                    <p>Full: {barrel.is_full ? 'Yes' : 'No'}</p>
                    <OpenModalButton buttonText={'Update Barrel'} modalComponent={<UpdateBarrelForm state={{'lab_id': id,'barrel_id': barrel.id}} /> } />
                    <OpenModalButton buttonText={"Delete Barrel"} modalComponent={<DeleteBarrelButton state={{'lab_id': id,'barrel_id': barrel.id}} />} />
                </div>    
            ))}
            <OpenModalButton buttonText={'Add Barrel'} modalComponent={<CreateBarrelForm state={lab} />}  />
          
          
        </div>
)

}

export default LabDetail;
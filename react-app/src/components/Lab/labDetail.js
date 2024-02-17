import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import './lab.css'
import OpenModalButton from "../OpenModalButton";
import CreateBarrelForm from "../Barrel/create";
import DeleteBarrelButton from "../Barrel/delete";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import UpdateBarrelForm from "../Barrel/update";
import UpdateLabForm from "./update";
import DeleteLabButton from "./delete";
import { readLab } from "../../store/lab";

const LabDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const labs = useSelector(state => state.lab.labs)
    const [isLoading, setIsLoading] = useState(true)
    let labsArr;
    let lab;
    useEffect(() => {
        dispatch(readLab()).then(() => setIsLoading(false))
    }, [dispatch])
    if(labs) {
        labsArr = Object.values(labs);
        const currentLab = labsArr.filter(lab => lab.id === Number(id))
        lab = currentLab[0]
    }
    if(isLoading) return <img src='../../resources/images/flask.svg' alt='flask'/>
    return (
        <div className="ld ld-blur-in">
            <div>
                <OpenModalButton className={'button'} buttonText={'Update Lab'} modalComponent={<UpdateLabForm state={id} />} />
                <OpenModalButton className={'button'} buttonText={'Delete Lab'} modalComponent={<DeleteLabButton state={id} />} />
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
                    <OpenModalButton className={'button'} buttonText={'Update Barrel'} modalComponent={<UpdateBarrelForm state={{'lab_id': id,'barrel_id': barrel.id}} /> } />
                    <OpenModalButton className={'button'} buttonText={"Delete Barrel"} modalComponent={<DeleteBarrelButton state={{'lab_id': id,'barrel_id': barrel.id}} />} />
                </div>    
            ))}
            <OpenModalButton className={'button'} buttonText={'Add Barrel'} modalComponent={<CreateBarrelForm state={lab}/>}  />
          
          
        </div>
)

}

export default LabDetail;
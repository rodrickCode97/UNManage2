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
import { readProfile } from '../../store/profiles'
import Loading from "../Loading";

const LabDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const labs = useSelector(state => state.lab.labs)
    const profiles = useSelector(state => state.profiles.profiles)
    const [isLoading, setIsLoading] = useState(true)
    let labsArr;
    let profile;
    let profileEhs;
    let lab;
    let tally = 0;
    let color 
    useEffect(() => {
        dispatch(readProfile()).then(()=>dispatch(readLab())).then(() => setIsLoading(false))
    }, [dispatch])
    
    if (labs) {
        labsArr = Object.values(labs);
        const currentLab = labsArr.filter(lab => lab.id === Number(id))
        lab = currentLab[0]
        lab.barrels.forEach(barrel => {
            if (barrel.is_full === true) tally += 1;
        })
    }

    tally > 0 ? color = 'red ld ld-jump infinite x2' : color = 'green ld ld-bounce-in';
    console.log(color)

    if (profiles) {
        profile = profiles[0];
        profileEhs = profile.is_EHS;
    }
   
   
    if (isLoading) return <Loading />
    return (
        <div className="ld ld-blur-in">
          {profileEhs &&  <div>
                <OpenModalButton className={'button'} buttonText={'Update Lab'} modalComponent={<UpdateLabForm state={{labId: id, lab:lab}} />} />
                <OpenModalButton className={'button'} buttonText={'Delete Lab'} modalComponent={<DeleteLabButton state={id} />} />
            </div>}
            <h1>hi from Lab detail</h1>
            <h1>Building {lab.buildingNumber}, Rm {lab.roomNumber}</h1>
            <h2> barrels </h2>
            <div className="lab_div">

            {lab.barrels.map(barrel => (
                <div key={barrel.id} className="lab_button">
                   <h2>{barrel.wasteType} Barrel</h2>
                     <h3>Profile Number: {barrel.profileNumber}</h3>
                    <p>Waste Capacity: {barrel.wasteCapacity} Gallons </p>
                    <p>Full: {barrel.is_full ? 'Yes' : 'No'}</p>
                  {profileEhs &&  <div>
                    <OpenModalButton className={'button'} buttonText={'Update Barrel'} modalComponent={<UpdateBarrelForm state={{'lab_id': id,'barrel_id': barrel.id, barrels: lab.barrels}} /> } />
                    <OpenModalButton className={'button'} buttonText={"Delete Barrel"} modalComponent={<DeleteBarrelButton state={{'lab_id': id,'barrel_id': barrel.id}} />} />
                        </div>}
                </div>    
            ))}
            </div>
          {profileEhs &&  <OpenModalButton className={'button'} buttonText={'Add Barrel'} modalComponent={<CreateBarrelForm state={lab}/>}  />}
        <div className={`tally ${color}`} >
                <h2> {tally} full drum(s) in this lab </h2>
                </div>
        </div>
)

}

export default LabDetail;
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { createBarrel, readBarrel, updateBarrel } from "../../store/barrels";
import { useModal } from "../../context/Modal";
import { useParams, useHistory } from "react-router-dom";
import "./barrel.css";
import { readLab } from "../../store/lab";

const UpdateBarrelForm = (state) => {
    const dispatch = useDispatch();
   const history = useHistory()
    const { lab_id, barrel_id } = state.state ;
    const labId = parseInt(lab_id)
    const barrelId = parseInt(barrel_id);
    console.log(barrel_id, labId)


    //state 
    const [profileNumber, setProfileNumber] = useState('');
    const [buildingNumber, setBuildingNumber] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [wasteType, setWasteType] = useState();
    const [wasteCapacity, setWasteCapacity] = useState();
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    
    // handles

    const handleProfileNumber = (e) => setProfileNumber(e.target.value)
    const handleWasteType= (e) => setWasteType(e.target.value)
    const handleWasteCapacity = (e) => setWasteCapacity(e.target.value)
   

    //payload
    const payload = {
        profileNumber,
        wasteType,
        wasteCapacity: parseInt(wasteCapacity),
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        try {

        dispatch(updateBarrel(labId, barrel_id, payload)).then(() => dispatch(readBarrel(lab_id))).then(()=> dispatch(readLab())).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data });
            
        }
        setProfileNumber('')
        setWasteType('')
        setWasteCapacity('')

    };

    useEffect(() => {
        dispatch(readBarrel(lab_id))
    }, [dispatch, lab_id])
	return (
		<div>
			<form onSubmit={handleSubmit} className="barrel_form_container">
				{errors && <p>{errors.errors}</p>}
				<input
					className="barrel_form_input"
					type="text"
					value={profileNumber}
					onChange={handleProfileNumber}
					name="profileNumber"
					placeholder="Enter Profile Number... ex. UN1993"
					required
                />
                <input
					className="barrel_form_input"
					type="text"
					value={wasteType}
					onChange={handleWasteType}
					name="wasteType"
					placeholder="Enter Waste Type... ex. Solvent"
					required
                />
                <input
					className="barrel_form_input"
					type="text"
					value={wasteCapacity}
					onChange={handleWasteCapacity}
					name="WasteCapacity"
					placeholder="Enter Barrel Size... ex. 55"
					required
                />
                <p> Gallons</p>
				<button type="submit" className="submitButton">
					Update Barrel
				</button>
			</form>
		</div>
	);


} 

export default UpdateBarrelForm;
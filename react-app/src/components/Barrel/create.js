import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { createBarrel, readBarrel } from "../../store/barrels";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./barrel.css";

const CreateBarrel = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const lab_id = parseInt(id)

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
    const handleBuildingNumber = (e) => setBuildingNumber(e.target.value)
    const handleRoomNumber = (e) => setRoomNumber(e.target.value)
    const handleWasteType= (e) => setWasteType(e.target.value)
    const handleWasteCapacity = (e) => setWasteCapacity(e.target.value)
   

    //payload
    const payload = {
        profileNumber,
        buildingNumber,
        roomNumber,
        wasteType,
        wasteCapacity,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        try {
            await dispatch(createBarrel(lab_id, payload)).then(() => dispatch(readBarrel(lab_id))).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data });
        }
        setProfileNumber('')
        setBuildingNumber('')
        setRoomNumber('')
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
					value={buildingNumber}
					onChange={handleBuildingNumber}
					name="BuildingNumber"
					placeholder="Enter Building Number... ex. 7"
					required
                />
                <input
					className="barrel_form_input"
					type="text"
					value={roomNumber}
					onChange={handleRoomNumber}
					name="RoomNumber"
					placeholder="Enter Room Number... ex. 19"
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
					Add Barrel
				</button>
			</form>
		</div>
	);


} 

export default CreateBarrel;
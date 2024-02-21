import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { readLab, createLab, updateLab } from "../../store/lab"
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./lab.css";

const UpdateLabForm = (state) => {
    const dispatch = useDispatch();
    const lab_id = parseInt(state.state)


    //state 
    const [profileNumber, setProfileNumber] = useState('');
    const [buildingNumber, setBuildingNumber] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [wasteType, setWasteType] = useState();
    const [wasteCapacity, setWasteCapacity] = useState();
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    
    // handles

    const handleBuildingNumber = (e) => setBuildingNumber(e.target.value)
    const handleRoomNumber = (e) => setRoomNumber(e.target.value)
   

    //payload
    const payload = {
        buildingNumber: parseInt(buildingNumber),
        roomNumber: parseInt(roomNumber)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        try {
          await dispatch(updateLab(lab_id, payload)).then(() => dispatch(readLab())).then(() => closeModal());
        } catch (data) {
          
            setErrors({ ...data });
        }
        setBuildingNumber(buildingNumber)
        setRoomNumber(roomNumber)
      

    };

    useEffect(() => {
        dispatch(readLab())
    }, [dispatch, lab_id])
	return (
		<div>
			<form onSubmit={handleSubmit} className="barrel_form_container">
				{errors && <p>{errors.errors}</p>}
				
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
				<button type="submit" className="submitButton">
					Update Lab
				</button>
			</form>
		</div>
	);


} 

export default UpdateLabForm;
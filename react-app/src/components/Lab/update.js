import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { readLab, createLab, updateLab } from "../../store/lab"
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./lab.css";

const UpdateLabForm = (state) => {
    const dispatch = useDispatch();
    const lab_id = parseInt(state.state.labId)
    const lab = state.state.lab;
 


    //state 
  
    const [buildingNumber, setBuildingNumber] = useState(lab.buildingNumber);
    const [roomNumber, setRoomNumber] = useState(lab.roomNumber);
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
    }, [dispatch])

	return (
		<div>
			<form onSubmit={handleSubmit} className="barrel_form_container">
                {errors && <p>{errors.errors}</p>}
				
				<p>Building Number:</p>
                <input
					className="barrel_form_input"
					type="number"
					value={buildingNumber}
					onChange={handleBuildingNumber}
					name="BuildingNumber"
					required
                />
                <br />
                <p>Lab Number:</p>
                <input
					className="barrel_form_input"
					type="number"
					value={roomNumber}
					onChange={handleRoomNumber}
					name="RoomNumber"
					required
                />
                <br/>
                <br/>
				<button type="submit" className="button">
					Update Lab
				</button>
			</form>
		</div>
	);


} 

export default UpdateLabForm;
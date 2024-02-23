import React, {useState} from "react";
import { useDispatch} from "react-redux";
import { readLab, createLab } from "../../store/lab"
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./lab.css";

const CreateLabForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const lab_id = parseInt(id)

    //state 
  
    const [buildingNumber, setBuildingNumber] = useState();
    const [roomNumber, setRoomNumber] = useState();
  
    const [errors, setErrors] = useState({})
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
            await dispatch(createLab(payload)).then(() => dispatch(readLab())).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data });
          
        }
        setBuildingNumber('')
        setRoomNumber('')
      

    };

    // useEffect(() => {
    //     dispatch(readLab())
    // }, [dispatch])
	return (
		<div>
			<form onSubmit={handleSubmit} className="barrel_form_container">
				{errors && <p>{errors.errors}</p>}
				
                <input
					className="barrel_form_input"
					type="number"
					value={buildingNumber}
					onChange={handleBuildingNumber}
					name="BuildingNumber"
					placeholder={7}
					required
                />
                <input
					className="barrel_form_input"
					type="number"
					value={roomNumber}
					onChange={handleRoomNumber}
					name="RoomNumber"
					placeholder={1}
					required
                />
				<button type="submit" className="submitButton">
					Add Lab
				</button>
			</form>
		</div>
	);


} 

export default CreateLabForm;
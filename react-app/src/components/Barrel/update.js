import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { readBarrel, updateBarrel } from "../../store/barrels";
import { useModal } from "../../context/Modal";

import "./barrel.css";
import { readLab } from "../../store/lab";

const UpdateBarrelForm = (state) => {
    const dispatch = useDispatch();
    const { lab_id, barrel_id, barrels} = state.state ;
  const labId = parseInt(lab_id)

  const currentBarrel = barrels.find(barrel => barrel.id === barrel_id);



    //state 
    const [profileNumber, setProfileNumber] = useState(currentBarrel.profileNumber);
    const [wasteType, setWasteType] = useState(currentBarrel.wasteType);
    const [wasteCapacity, setWasteCapacity] = useState(currentBarrel.wasteCapacity);
    const [is_full, setIs_full] = useState()
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();
    
    // handles

    const handleProfileNumber = (e) => setProfileNumber(e.target.value)
    const handleWasteType= (e) => setWasteType(e.target.value)
    const handleWasteCapacity = (e) => setWasteCapacity(e.target.value)
    const handleIs_full = e => setIs_full(e.target.value)
   

    //payload
    const payload = {
        profileNumber,
        wasteType,
        wasteCapacity: parseInt(wasteCapacity),
        is_full
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
         await dispatch(updateBarrel(labId, barrel_id, payload)).then(() => dispatch(readBarrel(lab_id))).then(() => dispatch(readLab()));
          closeModal()
          setErrors({})
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
                   <label>
        Choose a profile:
        <select
          value={profileNumber}
          onChange={handleProfileNumber}
        >
          <option value="UN1993"> UN1993 </option>
          <option value="UN3082"> UN3082 </option>
          <option value="UN3064"> UN3064 </option>
          <option value="UN3062"> UN3062 </option>      
        </select>
        </label>
        <label>
        Choose a Waste Type:
        <select
          value={wasteType}
          onChange={handleWasteType}
        >
          <option value="Solvent">Solvent</option>
          <option value="Aqueous">Aqueous</option>
          <option value="Acid">Acid</option>
          <option value="Base">Base</option>      
          <option value={`Flammable Corrosive`}>Flammable Corrosive</option>      
          <option value="HPLC">HPLC Solid</option>      
        </select>
                </label>
                <label>
        Choose a Barrel Size:
        <select
          value={wasteCapacity}
          onChange={handleWasteCapacity}
        >
          <option value={55}> 55 Gallons </option>
          <option value={35}> 35 Gallons </option>
          <option value={25}> 25 Gallons </option>   
        </select>
                </label>
                <p> Gallons</p>
    <p>Is Barrel Full?</p>
    <div>
      <input type="radio" id="choice1" name="contact" value={true} onChange={handleIs_full} />
      <label for="choice1">Yes</label>
      <input type="radio" id="choice2" name="contact" value={false} onChange={handleIs_full} />
      <label for="choice2">No</label>
    </div>

				<button type="submit" className="button">
					Update Barrel
				</button>
			</form>
		</div>
	);


} 

export default UpdateBarrelForm;
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createBarrel, readBarrel } from "../../store/barrels";
import { useModal } from "../../context/Modal";
import { readLab } from "../../store/lab";
import "./barrel.css";



const CreateBarrelForm = (state) => {
    const dispatch = useDispatch();
    const { id } = state.state;
    const lab_id = parseInt(id)
  

    //state 
    const [profileNumber, setProfileNumber] = useState('UN1993');
    const [wasteType, setWasteType] = useState('Solvent');
    const [wasteCapacity, setWasteCapacity] = useState(55);
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
          await  dispatch(createBarrel(lab_id, payload)).then(() => dispatch(readBarrel(lab_id))).then(()=> dispatch(readLab())).then(() => closeModal());
        } catch (data) {
            setErrors({ ...data })
        }
        setProfileNumber('')
        setWasteType('')
        setWasteCapacity('')

    };

    // useEffect(() => {
    //     dispatch(readLab())
    // }, [dispatch])
    
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
          <option  value="Aqueous">Aqueous</option>
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
				<button type="submit" className="submitButton">
					Add Barrel
				</button>
			</form>
		</div>
	);


} 

export default CreateBarrelForm;
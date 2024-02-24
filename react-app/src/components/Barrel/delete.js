import React, { useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import "./barrel.css";
import { readBarrel, deleteBarrel } from '../../store/barrels';
import { useModal } from '../../context/Modal';
import { readLab } from '../../store/lab';


const DeleteBarrelButton = (state) => {
    const { barrel_id, lab_id} = state.state;
    const barrelId = parseInt(barrel_id)
    const labId = parseInt(lab_id)

    const dispatch = useDispatch();
  const {closeModal} = useModal()
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
        dispatch(deleteBarrel(labId, barrelId)).then(() => dispatch(readBarrel(labId))).then(() => dispatch(readLab()));
        closeModal();
    }

    const handleCancel = e => {
        e.preventDefault();
        closeModal();
    }
    useEffect(() => {
        dispatch(readBarrel(labId)).then(() => setIsLoading(false))
    }, [dispatch, labId])
    
    return (
        <div>
            <p>Are you sure you want to delete this Barrel?</p>
            <button type='submit' className={'button'}onClick={handleDelete}> Delete Barrel</button>
            <button type='submit'className={'button'} onClick={handleCancel}> Cancel</button>
           
        </div>
    )
}
export default DeleteBarrelButton;
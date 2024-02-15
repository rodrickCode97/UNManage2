import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./lab.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { readLab, deleteLab } from '../../store/lab';
import { useModal } from '../../context/Modal';


const DeleteLabButton = (state) => {
 
    const lab_id = parseInt(state.state)
  
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
   dispatch(deleteLab(lab_id)).then(() => dispatch(readLab())).then(() => closeModal());
        history.push('/labs');
    }
    const handleCancel = e => {
        e.preventDefault();
        closeModal()
    }
    // useEffect(() => {
    //     dispatch(readLab()).then(() => setIsLoading(false))
    // }, [dispatch])
    
    return (
        <div>
            <p>Are You Sure You want to delete this lab?</p>
       <button type='submit' onClick={handleDelete}> Delete Lab</button>
       <button type='submit' onClick={handleCancel}> Cancel</button>
        </div>
    )
}
export default DeleteLabButton;
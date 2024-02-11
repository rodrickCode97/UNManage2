import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./lab.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { readLab, deleteLab } from '../../store/lab';


const DeleteLabButton = () => {
    const { id } = useParams();
    const lab_id = parseInt(id)
  
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const handleDelete = e => {
        e.preventDefault();
   dispatch(deleteLab(lab_id)).then(() => dispatch(readLab()));
        history.push('/labs');
    }
    useEffect(() => {
        dispatch(readLab()).then(() => setIsLoading(false))
    }, [dispatch])
    
    return (
        <div>
            
       <button type='submit' onClick={handleDelete}> Delete Lab</button>
           
        </div>
    )
}
export default DeleteLabButton;
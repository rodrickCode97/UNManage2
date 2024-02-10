import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./lab.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readLab } from '../../store/lab';
import CreateLabForm from './create';

const Labs = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(readLab()).then(()=> setIsLoading(false))
    }, [dispatch])
    return (
        <div>
        <h1>Hello From Labs</h1>
            < CreateLabForm /> 
            
        </div>
    )
}
export default Labs;
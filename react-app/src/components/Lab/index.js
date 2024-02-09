import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./lab.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readLab } from '../../store/lab';

const Labs = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(readLab()).then(()=> setIsLoading(false))
    }, [dispatch])
    return (
        <h1>Hello From Labs</h1>
    )
}
export default Labs;
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./barrel.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';
import { readBarrel } from '../../store/barrels';

const Barrel = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(readBarrel(3)).then(() => setIsLoading(false))
    })
    return (
        <h1>Hello From Barrel</h1>
    )
}
export default Barrel;
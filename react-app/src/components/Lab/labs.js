import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./lab.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory } from 'react-router-dom';

const Lab = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setisLoading] = useState(true);
    
    return (
        <h1>Hello From Lab</h1>
    )
}
export default Lab;
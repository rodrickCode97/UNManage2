import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./lab.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, NavLink } from 'react-router-dom';
import { readLab } from '../../store/lab';
import CreateLabForm from './create';

const Labs = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const labs = useSelector(state => state.lab.labs);
    const labsArr = Object.values(labs);
    console.log(labsArr);
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     dispatch(readLab()).then(()=> setIsLoading(false))
    // }, [dispatch])
    return (
        <div>
        <h1>Hello From Labs</h1>
            <OpenModalButton modalComponent={< CreateLabForm />} buttonText={'Add Lab'} />
            <p> Labs </p>
            {labsArr.map(lab => (
                <div key={lab.id}>
                    <NavLink exact to={`/labs/${lab.id}`}><p>Building {lab.buildingNumber}, Room {lab.roomNumber}</p></NavLink>
                    </div>
            ))}
        </div>
    )
}
export default Labs;
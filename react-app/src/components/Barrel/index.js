import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./barrel.css";
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import { readBarrel } from '../../store/barrels';
import CreateBarrel from './create';
import CreateBarrelForm from './create';

const Barrel = () => {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const barrels = useSelector(state => state.barrels.barrels)
 
    const barrelsArr = Object.values(barrels);
   
    useEffect(() => {
       dispatch(readBarrel(parseInt(id))).then(() => setIsLoading(false))
    }, [dispatch,id])
    return (
        <div>
            <h1>Hello From Barrel</h1>
            <OpenModalButton modalComponent={<CreateBarrelForm />} buttonText={'Add Barrel'} />
            <p>Barrels for this lab: </p>
            {barrelsArr.map(barrel => (
                <div key={barrel.id}>
                    <p>Profile Number: {barrel.profileNumber} {`( ${barrel.wasteType} )`}</p>
                    <p>Waste Capacity: {barrel.wasteCapacity} Gallons </p>
                    <p>Full: {barrel.is_full}</p>

                    </div>
            ))}
        </div>
    )
}
export default Barrel;
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./barrel.css";

import {  useParams } from 'react-router-dom';
import { readBarrel } from '../../store/barrels';


const Barrel = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        dispatch(readBarrel(parseInt(id))).then(() => setIsLoading(false))
    })

    const barrels = useSelector(state => state.barrels.barrels)
    const barrelsArr = Object.values(barrels);
    return (
        <>
        { isLoading === false && (<div>
            <h1>Hello From Barrel</h1>
                {/* <OpenModalButton modalComponent={<CreateBarrelForm />} buttonText={'Add Barrel'} />
                <OpenModalButton modalComponent={<DeleteBarrelButton/>} buttonText={'Delete Barrel'} /> */}
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
    </>
    )
}
export default Barrel;
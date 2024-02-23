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
    const profiles = useSelector(state => state.profiles.profiles)
   
    let labsArr;
    let profile;
    let profileEhs;

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(readLab()).then(()=> setIsLoading(false))
    }, [dispatch])
    if (labs) {
     labsArr = Object.values(labs); 
    }
    if (profiles) {
        profile = profiles[0];
        profileEhs = profile.is_EHS;
    }

   

    if(isLoading) return <img src='/react-app/src/resources/images/flask.svg' alt='flask'/>
    return (
        <div className='lab_container'>
        <h1>Hello From Labs</h1>
            <p> Labs </p>
            <div className='lab_div'> 
          {profileEhs &&  <OpenModalButton modalComponent={< CreateLabForm />} buttonText={'Add Lab'}  className={'lab_button'}/>}
            {labsArr.map(lab => (
                <div key={lab.id}className='lab_button'>
                   <NavLink exact to={`/labs/${lab.id}`} className={'link'} > <div className={'lab_b'}>
                        <p>Building {lab.buildingNumber}, Room {lab.roomNumber}</p>
                        </div></NavLink>
                    </div>
            ))}
        </div>
        </div>
    )
}
export default Labs;
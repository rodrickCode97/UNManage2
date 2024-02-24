import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { readProfile } from "../../store/profiles";

const DemoUserButton = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const profile = useSelector(state=> state.profiles.profiles)
    const email = 'demo@aa.io';
    const password = 'password';

    useEffect(() => {
        dispatch(readProfile());
    }, [dispatch])
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
        if (!profile) history.push('/profiles')
        history.push('/profiles/dashboard')
    }
    return (
        <button type="submit" onClick={handleSubmit} className={'button'}> Demo User</button>
    )
}
export default DemoUserButton;

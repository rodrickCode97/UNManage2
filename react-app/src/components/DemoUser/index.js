import React, {  } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

const DemoUserButton = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = 'demo@aa.io';
    const password = 'password';
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password)).then(() => history.push('/profiles/dashboard'))
    }
    return (
        <button type="submit" onClick={handleSubmit} className={'button'}> Demo User</button>
    )
}
export default DemoUserButton;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import vflask from '../../resources/images/flask.svg'


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav'>
			<div className='nav_container'>
			<li className='link'>
					<NavLink className='link' exact to="/profiles/dashboard"><img className={'image' } src={vflask} alt='menu' /></NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser}  />
				</li>
			)}
			</div>
		</ul>
	);
}

export default Navigation;
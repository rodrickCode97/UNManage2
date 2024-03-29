import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/";
import vflask from '../../resources/images/flask.svg';
import menu from '../../resources/images/menu.svg'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(()=> history.push('/'));
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="nav_button">
       <img className="image" src={menu} alt='flask' />
       
      </button>

       
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="li_container">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout} className={'button'}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className="li_container">
              <OpenModalButton
                className={'button'}
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />

              <OpenModalButton
                className={'button'}
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
          </div>
        )}
      </ul>
   
    </>
  );
}

export default ProfileButton;

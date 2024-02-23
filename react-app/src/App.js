import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Labs from "./components/Lab";
import Barrel from "./components/Barrel";
import UpdateVendorForm from "./components/Vendor/update";
import CreateProfileForm from "./components/Profile/create";
import DeleteVendorButton from "./components/Vendor/delete";
import LabDetail from "./components/Lab/labDetail";
import Landing from "./components/LandingPage";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
 
  const location = useLocation()
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const showNavbar = !["/", "/signup", '/profiles'].includes(location.pathname);

  return (
    <div className="app">
     {showNavbar && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/profiles">
             <CreateProfileForm /> 
          </Route>
          <Route exact path="/profiles/dashboard">
          <Profile />
          </Route>
          <Route exact path='/labs'>
            <Labs />
          </Route>
          <Route exact path='/labs/:id'>
            <LabDetail />
          </Route>
          <Route exact path="/labs/:id/barrels">
          <Barrel />
          </Route>
          {/* <Route exact path="/vendors">
            <CreateVendorForm />
          </Route> */}
          <Route exact path="/vendors/:id">
            <UpdateVendorForm />
            <DeleteVendorButton />
          </Route>
          <Route exact path='/'>
            <Landing />
            </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;

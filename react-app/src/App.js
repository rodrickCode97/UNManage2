import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import { readProfile } from "./store/profiles";
import { readLab } from "./store/lab";
import { readBarrel } from "./store/barrels";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Labs from "./components/Lab";
import Barrel from "./components/Barrel";
import Lab from "./components/Lab/labs";
import Vendors from "./components/Vendor";
import UpdateVendorForm from "./components/Vendor/update";
import UpdateProfileForm from "./components/Profile/update";
import UpdateLabForm from "./components/Lab/update";
import UpdateBarrelForm from "./components/Barrel/update";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(dispatch(readProfile())).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/profiles/dashboard">
          <Profile />
          </Route>
          <Route exact path='/profiles/:id'>
            <UpdateProfileForm />
          </Route>
          <Route exact path='/labs'>
          <Labs />
          </Route>
          <Route exact path='/labs/:id'>
            <UpdateLabForm />
            <Vendors />
          </Route>
          <Route exact path="/labs/:id/barrels">
          <Barrel />
          </Route>
          <Route exact path="/labs/:lab_id/barrels/:barrel_id">
            <UpdateBarrelForm />
          </Route>
          <Route exact path="/vendors/:id">
            <UpdateVendorForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

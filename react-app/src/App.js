import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import Labs from "./components/Lab";
import Barrel from "./components/Barrel";
import Lab from "./components/Lab/labs";
import Vendors from "./components/Vendor";
import UpdateVendorForm from "./components/Vendor/update";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
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
          <Route exact path='/labs'>
          <Labs />
          </Route>
          <Route exact path='/labs/:id'>
            <Lab />
            <Vendors />
          </Route>
          <Route exact path="/labs/:id/barrels">
          <Barrel />
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

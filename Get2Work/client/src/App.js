import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { getUserDetails, onLoginStatusChange } from './modules/authManager';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null), [role, setRole] = useState("");


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // firebase.auth().currentUser.uid grabs the firebaseUUID -- firebase has many helpers like this
      getUserDetails(firebase.auth().currentUser.uid)
        .then(userObject => {
          setRole(userObject.userType.name)
        })
    } else {
      setRole("")
    }
  }, [isLoggedIn])

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} role={role} />
      <ApplicationViews isLoggedIn={isLoggedIn} role={role} />
    </Router>
  );
}

export default App;

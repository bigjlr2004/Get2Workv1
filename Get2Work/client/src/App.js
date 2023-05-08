import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { getUserDetails, onLoginStatusChange } from './modules/authManager';
import Login from './components/Login';
import Register from './components/Register';

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
      <Routes>
        <Route path="*" element={
          <>
            <Header isLoggedIn={isLoggedIn} role={role} />
            <ApplicationViews isLoggedIn={isLoggedIn} role={role} />
          </>
        } />
        <Route path="login" element={
          <>
            <Header isLoggedIn={isLoggedIn} role={role} />
            <Login />
          </>}></Route>
        <Route path="register" element={
          <>
            <Header isLoggedIn={isLoggedIn} role={role} />
            <Register />
          </>} />
      </Routes>
    </Router>
  );
}

export default App;

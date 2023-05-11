import React from "react";
import { ManagerView } from "./Views/ManagerView";
import { EmployeeView } from "./Views/EmployeeView";
import { LoginView } from "./Views/LoginView";

export default function ApplicationViews({ isLoggedIn, role, userObj }) {

  if (isLoggedIn && role === "Manager") {
    //Return employee Views
    return <ManagerView isLoggedIn={isLoggedIn} role={role} />

  } else if (isLoggedIn && role === "Employee") {
    //return customer views
    return <EmployeeView userObj={userObj} isLoggedIn={isLoggedIn} role={role} />
  }

  else {
    return <LoginView />
  };



};

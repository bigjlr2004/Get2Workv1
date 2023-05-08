import React from "react";
import { ManagerView } from "./Views/ManagerView";
import { EmployeeView } from "./Views/EmployeeView";
import Login from "./Login";

export default function ApplicationViews({ isLoggedIn, role }) {

  if (isLoggedIn && role === "Manager") {
    //Return employee Views
    return <ManagerView isLoggedIn={isLoggedIn} role={role} />

  } else if (isLoggedIn && role === "Employee") {
    //return customer views

    return <EmployeeView />
  }

  else {
    return <Login />
  };



};

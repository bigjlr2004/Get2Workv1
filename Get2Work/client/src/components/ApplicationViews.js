import React from "react";

import { ManagerView } from "./Views/ManagerView";
import { EmployeeView } from "./Views/EmployeeView";

export default function ApplicationViews({ isLoggedIn, role }) {

  if (isLoggedIn && role === "Manager") {
    //Return employee Views
    return <ManagerView isLoggedIn={isLoggedIn} role={role} />

  } else {
    //return customer views
    return <EmployeeView />
  };



};

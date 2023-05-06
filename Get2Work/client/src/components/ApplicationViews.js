import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UserList from "./Users/UserList";
import StoreList from "./Store/StoreList";
import EditStore from "./Store/EditStore";
import AddStore from "./Store/AddStore";
import AddJob from "./Jobs/AddJob";
import JobList from "./Jobs/JobList";
import Hello from "./Hello";
import CompleteJobForm from "./CompletedJobs/CompleteJobForm";

import UserJobList from "./Jobs/UserJobList";

export default function ApplicationViews({ isLoggedIn, role }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />



          <Route path="storelist" element={<StoreList />} />
          <Route path="userjoblist" element={<UserJobList />} />
          <Route path="addstore" element={<AddStore />} />
          <Route path="joblist" element={<JobList />} />
          <Route path="addjob" element={<AddJob />} />
          <Route path="store/:id" element={<EditStore />} />
          <Route path="completejob/:id" element={<CompleteJobForm />} />


          <Route path="userlist">
            <Route index
              element={isLoggedIn && role === "Manager" ? <UserList />
                : <Navigate to="/login" />} />
          </Route>
          {/* <Route path="userjoblist">
            {/* <Route index
              element={isLoggedIn && role === "Employee" ? <UserJobList />
                : <Navigate to="/login" />} />
          </Route>  */}

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};

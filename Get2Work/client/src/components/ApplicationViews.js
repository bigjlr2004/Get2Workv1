import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ScheduledJobsList from "./Store/ScheduledJobs/ScheduledJobsList";
import UserList from "./Users/UserList";
import StoreList from "./Store/StoreList";
import EditStore from "./Store/EditStore";
import AddStore from "./Store/AddStore";
import AddJob from "./Jobs/AddJob";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <ScheduledJobsList /> : <Navigate to="/login" />}
          />
          <Route path="TodayList" element={<ScheduledJobsList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="storelist" element={<StoreList />} />
          <Route path="addstore" element={<AddStore />} />
          <Route path="addjob" element={<AddJob />} />
          <Route path="store/:id" element={<EditStore />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserJobList from "../Jobs/UserJobList";
import UserList from "../Users/UserList";
import StoreList from "../Store/StoreList";
import UserDetails from "../Users/UserDetails";
import UserSchedule from "../Users/UserSchedule";
import AddStore from "../Store/AddStore";
import AddJob from "../Jobs/AddJob";
import EditStore from "../Store/EditStore";
import CompleteJobForm from "../CompletedJobs/CompleteJobForm";
import WeekView from "../Week/WeekView";
import WeekDayView from "../Week/WeekDayView";
import EditJob from "../Jobs/EditJob";
import AllJobList from "../Jobs/AllJobList";
import JobList from "../Jobs/JobList";
import { ManagerSchedule } from "../Jobs/ManagerSchedule";




export const ManagerView = ({ isLoggedIn, role }) => {
    return <>

        <main className="main-content">
            <Routes>
                <Route path="/" element={<JobList />} />

                <Route element={isLoggedIn && role === "Manager" ? <UserList /> : <Navigate to="/login" />} />
                <Route path="storelist" element={<StoreList />} />
                <Route path="userlist" element={<UserList />} />
                <Route path="userdetails/:firebaseId" element={<UserDetails />} />
                <Route path="userschedule" element={<UserSchedule role={role} />} />
                <Route path="userjoblist" element={<UserJobList />} />
                <Route path="addstore" element={<AddStore />} />
                <Route path="editjob/:id" element={<EditJob />} />
                <Route path="addjob" element={<AddJob />} />
                <Route path="store/:id" element={<EditStore />} />
                <Route path="completejob/:id" element={<CompleteJobForm />} />
                <Route path="weeklyview" element={<WeekView />} />
                <Route path="weeklyview/:day" element={<WeekDayView role={role} />} />
                <Route path="alljobs" element={<AllJobList />} />
                <Route path="managerschedule" element={<ManagerSchedule />} />



                <Route path="*" element={<p>Whoops, nothing here...</p>} />

            </Routes>
        </main>


    </>
}
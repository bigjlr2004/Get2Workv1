import { Navigate, Route, Routes } from "react-router-dom"
import CompleteJobForm from "../CompletedJobs/CompleteJobForm"
import UserJobList from "../Jobs/UserJobList"
import UserDetails from "../Users/UserDetails"
import UserSchedule from "../Users/UserSchedule"
import Hello from "../Hello"






export const EmployeeView = ({ userObj, isLoggedIn, role }) => {
    return <>

        <main className="main-content">
            <Routes>
                <Route path="/" element={userObj.scheduledJobs.length > 0 ? <UserJobList role={role} /> : <Navigate to="/hello" />} />
                <Route path="userdetails/:firebaseId" element={<UserDetails />} />
                <Route path="userschedule" element={<UserSchedule role={role} />} />
                <Route path="completejob/:id" element={<CompleteJobForm />} />
                <Route path="hello" element={<Hello />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />

            </Routes>
        </main>
    </>

}
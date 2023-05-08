import { Route, Routes } from "react-router-dom"
import CompleteJobForm from "../CompletedJobs/CompleteJobForm"
import UserJobList from "../Jobs/UserJobList"
import UserDetails from "../Users/UserDetails"
import UserSchedule from "../Users/UserSchedule"






export const EmployeeView = () => {
    return <>

        <main>
            <Routes>
                <Route path="/" element={<UserJobList />} />

                <Route path="userdetails" element={<UserDetails />} />
                <Route path="userschedule" element={<UserSchedule />} />
                <Route path="completejob/:id" element={<CompleteJobForm />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />

            </Routes>
        </main>
    </>

}
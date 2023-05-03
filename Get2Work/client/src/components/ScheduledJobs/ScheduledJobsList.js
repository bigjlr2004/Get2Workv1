import React, { useEffect, useState } from "react";
import { getDailyScheduledJobs } from "../../../modules/scheduledJobsManager";
import ScheduledJob from "./ScheduledJob";



const ScheduledJobsList = () => {
    const [jobs, setJobs] = useState([]);

    const getJobs = () => {
        getDailyScheduledJobs().then(data => setJobs(data));
    };

    useEffect(() => {
        getJobs();
    }, []);


    return (
        <div className="container">
            <h2>Todays Jobs</h2>
            <div className="row justify-content-center">
                {jobs.map((p) => (
                    <ScheduledJob scheduledjob={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default ScheduledJobsList
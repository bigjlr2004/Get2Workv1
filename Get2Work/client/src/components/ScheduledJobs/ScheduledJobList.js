import React, { useEffect, useState } from "react";

import ScheduledJob from "./ScheduledJob";
import { getCompletedJobs } from "../../modules/scheduledJobsManager";




const ScheduledJobList = () => {
    const [jobs, setJobs] = useState([]);



    const getCompleteJobs = () => {
        getCompletedJobs().then(data => setJobs(data));
    };


    useEffect(() => {
        getCompleteJobs();

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

export default ScheduledJobList
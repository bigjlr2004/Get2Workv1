import React, { useEffect, useState } from "react";



import { getJobList } from "../../modules/jobManager";

import Job from "./Job";



const JobList = () => {

    const [jobs, setJobs] = useState([]);



    const getAllJobs = () => {
        getJobList().then(data => setJobs(data));
    };

    useEffect(() => {

        getAllJobs();
    }, []);


    return (
        <div className="container">
            <h2>Todays Jobs</h2>
            <div className="row justify-content-center">
                {jobs.map((p) => (
                    <Job job={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default JobList
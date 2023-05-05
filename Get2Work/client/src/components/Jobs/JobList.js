import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { getJobList } from "../../modules/jobManager";
import Job from "./Job";
import { getDailyScheduledJobs } from "../../modules/scheduledJobsManager";
import ScheduledJob from "../ScheduledJobs/ScheduledJob";



const JobList = () => {

    const [completedJobs, setCompletedJobs] = useState([]);

    const [jobs, setJobs] = useState([]);
    const getJobs = () => {
        getDailyScheduledJobs().then(data => setCompletedJobs(data));
    };

    useEffect(() => {
        getJobs();

    }, []);

    const getAllJobs = () => {
        getJobList().then(data => setJobs(data));
    };

    useEffect(() => {

        getAllJobs();
    }, []);


    const newArray = (array1, array2) => {
        array1.map((item1) => {
            const matchingItem2 = array2.find((item2) => item2.id === item1.id);
            if (!matchingItem2) {
                return null; // skip this item in array1
            }
            return {
                ...item1,
                ...matchingItem2,
            };
        })
    }
    let arrayofjobs = [];

    const jobsNotCompleted = jobs.filter((job) => {
        // Find the completed job with the same ID as the current job
        const completedJob = completedJobs.find((completedjob) => {
            return job.id === completedjob.jobId;
        });

        // Return true if the job is not in completedJobs
        return !completedJob;
    });

    console.log(jobsNotCompleted)


    return (

        <Row>
            <Col>
                <div className="container">
                    <h2>Todays Jobs</h2>
                    <div className="row justify-content-center">






                        {jobsNotCompleted.map((p) => (
                            <Job job={p} key={p.id} />
                        ))}


                        {/* 
                        {

                            completedJobs.map(
                                (completedjob) => {
                                    jobs.find((job) => {
                                        if (job.id !== completedjob.jobId) {
                                            arrayofjobs.push(job)
                                        }
                                    })
                                    // const incomplete = jobs.find((job) => job.id === completedjob.jobId);
                                    //if (incomplete) {
                                    // arrayofjobs.push(jobs.filter((job) => job.id !== completedjob.jobId))
                                    // <Job job={incomplete} key={incomplete.id} />
                                    // } else {
                                    //     return null;
                                    console.log(arrayofjobs)


                                }
                            )
                        } */}
                    </div>
                </div>
            </Col>
            <Col>
                <div className="container">
                    <h2>Completed Jobs</h2>
                    <div className="row justify-content-center">
                        {completedJobs.map((p) => (
                            <ScheduledJob scheduledjob={p} key={p.id} />
                        ))}
                    </div>
                </div>
            </Col>
        </Row>




    );
};

export default JobList
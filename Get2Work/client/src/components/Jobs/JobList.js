import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'reactstrap';
import { getAllJobsScheduledToday } from "../../modules/jobManager";
import { GetTodaysCompletedJobsAllUsers } from "../../modules/completedJobsManager";
import CompletedJob from "../CompletedJobs/CompletedJob";
import { Scheduled } from "./Scheduled";




const JobList = () => {

    const [scheduledJobs, setScheduledJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const getCompleteJobs = () => {
        GetTodaysCompletedJobsAllUsers().then(data => setCompletedJobs(data));
    };
    const getScheduledJobList = () => {
        getAllJobsScheduledToday().then(data => setScheduledJobs(data));
    };
    useEffect(() => {
        getCompleteJobs();
        getScheduledJobList();
    }, []);

    const jobsNotCompleted = scheduledJobs.filter((job) => {
        // Find the completed job with the same ID as the current job
        const completedJob = completedJobs.find((completedjob) => {
            return job.id === completedjob.job.id;
        });
        // Return true if the job is not in completedJobs
        return !completedJob;
    });


    return (


        <Container>
            <Row>
                <Col>
                    <div className="container">
                        <h2 className="text-center"> Scheduled Jobs</h2>

                        {jobsNotCompleted.map((p) => (
                            <Scheduled job={p} key={p.id} />
                        ))}
                    </div>
                </Col>
                <Col>

                    <div className="container">
                        <h2 className="text-center">Completed Jobs</h2>
                        <div className="row justify-content-center">
                            {completedJobs.map((p) => (
                                <CompletedJob completedJob={p} key={p.id} />
                            ))}
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>

    );
};

export default JobList
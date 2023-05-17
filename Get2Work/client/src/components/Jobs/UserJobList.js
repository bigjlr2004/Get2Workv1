import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'reactstrap';
import { getTodaysScheduledJobsByUser } from "../../modules/jobManager";
import Job from "./Job";
import { getUsersCompletedJobs } from "../../modules/completedJobsManager";
import CompletedJob from "../CompletedJobs/CompletedJob";




const UserJobList = ({ role }) => {

    const [scheduledJobs, setScheduledJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const getCompleteJobs = () => {
        getUsersCompletedJobs().then(data => setCompletedJobs(data));
    };
    const getScheduledJobList = () => {
        getTodaysScheduledJobsByUser().then(data => setScheduledJobs(data));
    };
    useEffect(() => {
        getScheduledJobList();
        getCompleteJobs();
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
                        <h2>Todays Scheduled Jobs</h2>
                        <div className="row justify-content-center">
                            {jobsNotCompleted.map((p) => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <h2>Completed Jobs</h2>
                        <div className="row justify-content-center">
                            {completedJobs.map((p) => (
                                <CompletedJob completedJob={p} key={p.id} role={role} />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserJobList
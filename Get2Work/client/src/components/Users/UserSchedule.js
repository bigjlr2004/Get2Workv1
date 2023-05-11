import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { getScheduledJobsByUser } from "../../modules/jobManager";
import Job from "../Jobs/Job";







const UserSchedule = ({ role }) => {

    const [scheduledJobs, setScheduledJobs] = useState([]);


    const getScheduledJobList = () => {
        getScheduledJobsByUser().then(data => setScheduledJobs(data));
    };
    useEffect(() => {
        getScheduledJobList();

    }, []);

    return (

        <Row>
            <Col>
                <div className="container">
                    <h2>Users Schedule</h2>
                    <div className="row justify-content-center">
                        {scheduledJobs.map((p) => (
                            <Job job={p} key={p.id} role={role} />
                        ))}
                    </div>
                </div>
            </Col>

        </Row>
    );
};

export default UserSchedule
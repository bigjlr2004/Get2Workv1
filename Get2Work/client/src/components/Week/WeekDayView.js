import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { getAllJobsScheduledSpecificDay } from "../../modules/jobManager";

import { useParams } from "react-router-dom";
import Job from "../Jobs/Job";




const WeekDayView = ({ role }) => {

    const [scheduledJobs, setScheduledJobs] = useState([]);
    const { day } = useParams();
    const getScheduledJobList = (day) => {
        getAllJobsScheduledSpecificDay(day).then(data => setScheduledJobs(data));
    };
    useEffect(() => {
        getScheduledJobList(day);
    }, []);

    return (
        <Row>
            <Col>
                <div className="container">
                    <h2>Scheduled Jobs for {day}</h2>
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

export default WeekDayView
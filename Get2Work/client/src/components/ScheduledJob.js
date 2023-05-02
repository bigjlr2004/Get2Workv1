import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const ScheduledJob = ({ scheduledjob }) => {

    const ReturnTime = (datetoBeConverted) => {
        const date = new Date(datetoBeConverted);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate
    }

    return (
        <Card >
            <p className="text-left px-2">
                Job Description: ---
                <Link to={`/users/${scheduledjob.id}`}>
                    {scheduledjob.job.description}
                </Link>
            </p>
            <CardBody>
                <ul className="social-list">
                    <li> Store: {scheduledjob.job.store.name} </li>
                    <li> Employee: {scheduledjob.job.userProfile.displayName}</li>
                    <li> Employee Email: {scheduledjob.job.userProfile.email}</li>
                    <li> Scheduled Time: {ReturnTime(scheduledjob.job.scheduledTime)}</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default ScheduledJob;
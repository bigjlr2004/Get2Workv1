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
                <p>Completed: {scheduledjob.date}</p>
                <p>Completed Time: {scheduledjob.timeOut}</p>
            </p>
            <CardBody>
                <ul className="social-list">
                    <li> Store: {scheduledjob.job.store.name} </li>
                    <li> Employee: {scheduledjob.job.userProfile.displayName}</li>
                    <li> Halfs Stocked: {scheduledjob.halfs}</li>
                    <li> Pints Stocked: {scheduledjob.pints}</li>
                    <li> Snacks Stocked: {scheduledjob.snacks}</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default ScheduledJob;
import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const CompletedJob = ({ completedJob }) => {

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
                <Link to={`/users/${completedJob.id}`}>
                    {completedJob.job.description}
                </Link>
                <p>Completed: {completedJob.date}</p>
                <p>Completed Time: {completedJob.dateCompleted}</p>
            </p>
            <CardBody>
                <ul className="social-list">
                    <li> Store: {completedJob.job.store.name} </li>
                    <li> Employee: {completedJob.job.userProfile.displayName}</li>
                    <li> Halfs Stocked: {completedJob.halfs}</li>
                    <li> Pints Stocked: {completedJob.pints}</li>
                    <li> Snacks Stocked: {completedJob.snacks}</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default CompletedJob;
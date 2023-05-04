import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Job = ({ job }) => {

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
                <Link to={`/schedulejobForm/${job.id}`}>
                    {job.description}
                </Link>
            </p>
            <CardBody>
                <ul className="social-list">
                    <li> Store: {job.store.name} </li>
                    <li> Employee: {job.userProfile.displayName}</li>
                    <li> Employee Email: {job.userProfile.email}</li>
                    <li> Phone Number: {job.userProfile.phoneNumber}</li>
                    <li> Scheduled Time: {job.scheduledTime}</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default Job;
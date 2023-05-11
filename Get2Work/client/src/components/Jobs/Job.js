import React from "react";
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const Job = ({ job, role }) => {

    const ReturnTime = (datetoBeConverted) => {
        const date = new Date(datetoBeConverted);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate
    }

    return (<>

        <Card>

            <CardBody>
                <CardTitle tag="h5" className="d-flex justify-content-between">
                    <div>

                        {/* <div>{user.scheduledJobs.length > 0 ? <Link to={`/userdetails/${user.firebaseUserId}`}><FaClock /></Link> : null}</div> */}
                        <div><Link to={`/completejob/${job.id}`}> {job.store.name} {job.description} </Link></div>
                    </div>
                    <div>
                        <div>{role == "Manager" ? `${job.userProfile.fullName} -- ${job.scheduledTime}` : `${job.scheduledTime}`}</div>
                    </div>

                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                </CardSubtitle>
            </CardBody>


        </Card >
    </>
    );
};

export default Job;
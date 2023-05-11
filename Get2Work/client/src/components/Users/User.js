import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { FaBeer, FaClock, FaSchool, GrSchedule } from 'react-icons/fa';

const User = ({ user }) => {



    return (<>

        <Card >
            <CardBody>
                <CardSubtitle
                    className="d-flex justify-content-between align-items-center mb-2"
                    tag="h6"
                >
                    <div className="d-flex align-items-center">
                        <div>{user.fullName} -- {user.email} -- </div>
                        <div className="ml-2" style={{ marginLeft: '5px', marginRight: '10px' }}>{user.phoneNumber}</div>
                        <div>{user.scheduledJobs.length > 0 ? <Link to={`/userdetails/${user.firebaseUserId}`}><FaClock /></Link> : null}</div>
                    </div>
                </CardSubtitle>
            </CardBody>

        </Card>
    </>
    );
};

export default User;

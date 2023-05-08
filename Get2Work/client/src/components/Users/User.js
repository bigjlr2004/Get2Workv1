import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {



    return (
        <Card >
            <p className="text-left px-2">
                Employee Name: ---
                <Link to={`/userdetails/${user.firebaseUserId}`}>
                    {user.displayName}
                </Link>
            </p>
            <CardBody>
                <ul className="social-list">
                    <li> Email: {user.email}</li>
                    <li> Address: {user.address}</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default User;

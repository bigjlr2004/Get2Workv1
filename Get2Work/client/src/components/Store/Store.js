import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Store = ({ Store }) => {



    return (
        <Card >
            <p className="text-left px-2">
                Store Name: ---
                <Link to={`/Store/${Store.id}`}>
                    {Store.name}
                </Link>
            </p>
            <CardBody>
                <ul className="social-list">
                    <li> Phone Number: {Store.phoneNumber}</li>
                    <li> Address: {Store.address}</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default Store;
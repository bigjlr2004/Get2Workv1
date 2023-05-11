import React from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

const Store = ({ Store }) => {



    return (<>

        <Card >
            <CardBody>
                <CardSubtitle
                    className="d-flex justify-content-between align-items-center mb-2"
                    tag="h6"
                >
                    <div className="d-flex align-items-center">
                        <div>{Store.name} -- {Store.phoneNumber} -- </div>
                        <div className="ml-2" style={{ marginLeft: '5px', marginRight: '10px' }}>{Store.address}</div>
                        <div> <Link to={`/Store/${Store.id}`}>Edit</Link></div>
                    </div>
                </CardSubtitle>
            </CardBody>

        </Card>
    </>

    );
};

export default Store;
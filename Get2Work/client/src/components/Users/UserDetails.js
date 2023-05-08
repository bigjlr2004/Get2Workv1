import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap";
import { useParams } from 'react-router-dom'
import { getUserDetails } from "../../modules/authManager";
import Job from "../Jobs/Job";


const UserDetails = () => {

    const { firebaseId } = useParams();
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        getUserDetails(firebaseId).then(setUserProfile);
    }, []);


    return (


        <div className="container">
            <Row>
                <Col>
                    <Card>
                        <p className="text-left px-2">Personal Information</p>
                        <CardBody>

                            <fieldset>
                                <div className="form-group">
                                    <p>
                                        <label htmlFor="name">Employee: {userProfile.fullName} </label>
                                    </p>
                                    <p>
                                        <label htmlFor="name">Phone: {userProfile.phoneNumber} </label>
                                    </p>
                                    <p>
                                        <label htmlFor="name">Email: {userProfile.email} </label>
                                    </p>

                                </div>
                            </fieldset>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Row>
                            <Col>
                                <div className="container">
                                    <h2>Users Schedule</h2>
                                    <div className="row justify-content-center">
                                        {userProfile.scheduledJobs?.map((p) => (
                                            <Job job={p} key={p.id} />
                                        ))}
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default UserDetails;
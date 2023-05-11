import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap";
import { useParams } from 'react-router-dom'
import { getUserDetails } from "../../modules/authManager";
import UserSchedule from "./UserSchedule";


const UserDetails = () => {

    const { firebaseId } = useParams();
    const [userProfile, setUserProfile] = useState({
        scheduledJobs: []
    })

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
                                    <h2>Schedule</h2>
                                    <div className="row justify-content-center">
                                        {
                                            <UserSchedule scheduledJobs={userProfile.scheduledJobs} key={userProfile.Id} />
                                        }
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
import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { getScheduledJobsByUser } from "../../modules/jobManager";
import Job from "../Jobs/Job";







const UserSchedule = ({ role, scheduledJobs }) => {

    // const [scheduledJobs, setScheduledJobs] = useState([]);


    // const getScheduledJobList = () => {
    //     getScheduledJobsByUser().then(data => setScheduledJobs(data));
    // };
    // useEffect(() => {
    //     getScheduledJobList();

    // }, []);

    return (
        <>

            <Row>
                <Col>
                    <div className="container">
                        <h5>Sunday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Sunday" || p.days[0].name.includes("Sunday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Sunday") && p.days[0].name !== "Sunday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>

                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <div className="container">
                        <h5>Monday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Monday" || p.days[0].name.includes("Monday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Monday") && p.days[0].name !== "Monday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>
                    </div>
                </Col>

            </Row >
            <Row>
                <Col>
                    <div className="container">
                        <h5>Tuesday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Tuesday" || p.days[0].name.includes("Tuesday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Tuesday") && p.days[0].name !== "Tuesday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>
                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <div className="container">
                        <h5>Wednesday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Wednesday" || p.days[0].name.includes("Wednesday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Wednesday") && p.days[0].name !== "Wednesday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>
                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <div className="container">
                        <h5>Thursday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Thursday" || p.days[0].name.includes("Thursday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Thursday") && p.days[0].name !== "Thursday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>
                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <div className="container">
                        <h5>Friday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Friday" || p.days[0].name.includes("Friday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Friday") && p.days[0].name !== "Friday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>
                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <div className="container">
                        <h5>Saturday</h5>
                        <div className="row justify-content-center">
                            {scheduledJobs.filter(p => p.days[0].name === "Saturday" || p.days[0].name.includes("Saturday")).map(p => (
                                <Job job={p} key={p.id} role={role} />
                            ))}
                            {scheduledJobs.filter(p => !p.days[0].name.includes("Saturday") && p.days[0].name !== "Saturday").length === scheduledJobs.length && (
                                <div>Off</div>
                            )}
                        </div>
                    </div>
                </Col>

            </Row>

        </>
    );
};

export default UserSchedule
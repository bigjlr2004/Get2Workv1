import React, { useEffect, useState } from "react";
import { Row, Col } from 'reactstrap';
import { getJobList } from "../../modules/jobManager";

import { Link } from "react-router-dom";





const AllJobList = () => {

    const [allJobs, setAllJobs] = useState([]);


    const getAllJobs = () => {
        getJobList().then(data => setAllJobs(data));
    };
    useEffect(() => {
        getAllJobs();

    }, []);
    return (
        <>
            <Row>
                <Col >
                    <div className="container">
                        <h2>Active Jobs</h2>
                        <div className="row justify-content-center">
                            <ul>
                                {allJobs.map((p) => {
                                    if (p.activeStatus) {
                                        return (
                                            <React.Fragment key={p.id}>
                                                <Link to={`/editjob/${p.id}`}><h5>{p.description}</h5></Link>
                                            </React.Fragment>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </ul>
                        </div>
                    </div>

                </Col>

                <Col>
                    <div className="container">
                        <h2>InActive Jobs</h2>
                        <div className="row justify-content-center">
                            {allJobs.map((p) => {
                                if (!p.activeStatus) {
                                    return <h5 key={p.id}>{p.description}</h5>
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                </Col>

            </Row>
        </>
    )
};

export default AllJobList
import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { getJobById } from "../../modules/jobManager";
import { completeJob } from "../../modules/scheduledJobsManager";


const ScheduledJobForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState({})
    const [newJob, setnewJob] = useState({

        jobId: id,
        date: "May  4 2023 12:00AM",
        notes: "",
        timeIn: "",
        timeOut: "",
        StartingOdometer: 0,
        endingOdometer: 0,
        halfs: 0,
        pints: 0,
        snacks: 0,
        complete: false
    })

    const getJob = (id) => {
        getJobById(id).then(data => setJob(data));
    };
    useEffect(() => {
        getJob(id);
    }, []);

    const handleSubmitnewJob = (evt) => {
        evt.preventDefault();
        if (newJob.jobId && newJob.date && newJob.notes && newJob.timeIn && newJob.timeOut
            && newJob.StartingOdometer && newJob.endingOdometer && newJob.halfs && newJob.pints && newJob.snacks) {
            newJob.complete = true;

            completeJob(newJob)
                .then(() => {

                    navigate('/')


                });
        }
        else {
            alert('Fields cannot be blank cannot be blank.')
        }
    }

    const returnTime = (datetoBeConverted) => {
        const date = new Date(datetoBeConverted);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate.toString()

    }
    const handleClockIn = () => {
        const now = new Date();
        const copy = { ...newJob };
        copy.timeIn = returnTime(now)
        setnewJob(copy);
    }
    const handleClockOut = () => {
        const now = new Date();
        const copy = { ...newJob };
        copy.timeOut = returnTime(now)
        setnewJob(copy);
    }
    return (
        <div className="container">
            <Card>
                <p className="text-left px-2">Edit New Job Form</p>
                {/* <p className="text-left px-2">Store # {job.storeId} {job?.store.name} Address: {job.store?.address} Phone: {job.store.phoneNumber}</p> */}
                <p className="text-left px-2">Store # {job.storeId}</p>
                <CardBody>

                    <div>
                        <button onClick={handleClockIn}>Time  In</button>
                        <p>{newJob.timeIn}</p>
                    </div>
                    <div>
                        <button onClick={handleClockOut}>Time Out</button>
                        <p>{newJob.timeOut}</p>
                    </div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="startingOdometer">Starting Odometer: </label>
                            <input

                                id="startingOdometer"
                                type="text"
                                value={newJob.StartingOdometer}
                                className="form-control"
                                placeholder="Starting Odometer"

                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.StartingOdometer = event.target.value;
                                    setnewJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Ending Odometer: </label>
                            <input

                                id="endingOdometer"
                                type="text"
                                value={newJob.endingOdometer}
                                className="form-control"
                                placeholder="Ending Odometer"

                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.endingOdometer = event.target.value;
                                    setnewJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="halfs">Halfs:</label>
                            <input
                                required
                                value={newJob.halfs}
                                id="halfs"
                                type="text"
                                className="form-control"
                                placeholder="Enter # of Sleeves for Halfs Stocked"

                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.halfs = event.target.value;
                                    setnewJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="pints">Pints: </label>
                            <input
                                required
                                value={newJob.pints}
                                id="pints"
                                type="text"
                                className="form-control"
                                placeholder="Enter # of Sleeves for Pints Stocked"

                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.pints = event.target.value;
                                    setnewJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="snacks">Snacks: </label>
                            <input

                                value={newJob.snacks}
                                id="snacks"
                                type="text"
                                className="form-control"
                                placeholder="Enter # of Sleeves for Snacks Stocked"

                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.snacks = event.target.value;
                                    setnewJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="notes">Notes: </label>
                            <input

                                id="notes"
                                value={newJob.notes}
                                type="text"
                                className="form-control"
                                placeholder="Miscellaneous Notes"

                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.notes = event.target.value;
                                    setnewJob(copy);
                                }} />
                        </div>
                    </fieldset>

                    <button
                        style={{ marginTop: '20px' }}
                        className="btn btn-success"
                        onClick={(event) => {
                            handleSubmitnewJob(event)
                        }}>Submit newJob</button>

                </CardBody>
            </Card>
        </div>
    )
}

export default ScheduledJobForm;
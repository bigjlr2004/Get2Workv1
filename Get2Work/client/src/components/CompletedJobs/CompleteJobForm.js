import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { getJobById } from "../../modules/jobManager";
import { completeJob } from "../../modules/completedJobsManager";



const CompleteJobForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState({})
    const [currentTime, setCurrentTime] = useState()

    const [timeDisplay, setTimeDisplay] = useState({
        timeIn: "",
        timeOut: ""
    })
    const [newJob, setnewJob] = useState({

        jobId: id,
        dateCompleted: "",
        notes: "",
        timeIn: "",
        timeOut: "",
        jobScheduleId: "",
        startingOdometer: "",
        endingOdometer: "",
        halfs: "",
        pints: "",
        snacks: "",
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
        if (newJob.jobId && newJob.dateCompleted && newJob.notes && newJob.timeIn && newJob.timeOut
            && newJob.startingOdometer && newJob.endingOdometer && newJob.halfs && newJob.pints && newJob.snacks) {
            newJob.complete = true;
            newJob.jobScheduleId = job.jobScheduleId;


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
    const getCurrentTime = () => {
        const now = new Date();
        return returnTime(now);
    }
    const handleClockIn = () => {
        const now = new Date();
        const copy = { ...newJob };
        copy.timeIn = now
        timeDisplay.timeIn = returnTime(now)
        setnewJob(copy);
    }
    const handleClockOut = () => {
        const now = new Date();
        const copy = { ...newJob };
        copy.timeOut = now
        copy.dateCompleted = copy.timeOut;
        timeDisplay.timeOut = returnTime(now)
        setnewJob(copy);
    }
    return (
        <div className="container">
            <Card>
                {/* <p className="text-left px-2">Store # {job.storeId} {job?.store.name} Address: {job.store?.address} Phone: {job.store.phoneNumber}</p> */}
                <fieldset>
                    <CardHeader className="card-footer  text-white d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <h2 className="text-left px-2">{job.store?.name} - {job.description} </h2>
                        </div>
                        <div><h2>Scheduled: {job.scheduledTime}</h2></div>

                    </CardHeader>
                    {/* //graybar */}<CardHeader className="d-flex align-items-center justify-content-center"></CardHeader>

                    <CardHeader className=" card-footer text-white"> <h3 className="text-left px-2">Record Job Details Below </h3></CardHeader>
                    {/* //graybar */}<CardHeader className="d-flex align-items-center justify-content-center"></CardHeader>
                    <CardHeader className="d-flex align-items-center justify-content-center">
                        <h5 className="px-2">Remember to Rotate Product When Stocking Shelves</h5>
                    </CardHeader>
                    {/* //graybar */}<CardHeader className="d-flex align-items-center justify-content-center"></CardHeader>



                    <CardHeader className="card-footer text-white d-flex justify-content-between">
                        <CardHeader className="card-footer text-white d-flex justify-content-start">
                            <div>
                                <button className="mr-4" onClick={handleClockIn} style={{ borderRadius: '15%', padding: '25px', fontSize: '1.25rem' }}>Clock In</button>
                            </div>
                            <div className="pr-2 d-flex align-items-center" style={{ marginLeft: `150px` }}>
                                <p style={{ fontSize: '300%' }}>{timeDisplay.timeIn}</p>
                            </div>
                        </CardHeader>
                        <div className="d-flex justify-content-end">
                            <div className="d-flex align-items-center">
                                <fieldset>
                                    <label htmlFor="floatingStartingOd">Odometer Start:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        id="floatingStartingOd"
                                        value={newJob.startingOdometer}
                                        placeholder="Beginning"
                                        onChange={(event) => {
                                            const copy = { ...newJob };
                                            copy.startingOdometer = event.target.value;
                                            setnewJob(copy);
                                        }}
                                    />
                                </fieldset>
                            </div>
                            <div className="d-flex align-items-center">
                                <fieldset style={{ marginLeft: `25px` }}>
                                    <label htmlFor="floatingEndingOd">Odometer End:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        id="floatingEndingOd"
                                        value={newJob.endingOdometer}
                                        placeholder="Ending"
                                        onChange={(event) => {
                                            const copy = { ...newJob };
                                            copy.endingOdometer = event.target.value;
                                            setnewJob(copy);
                                        }}
                                    />
                                </fieldset>
                            </div>
                        </div>
                    </CardHeader>



                    {/* //graybar */}<CardHeader className="d-flex align-items-center justify-content-center"></CardHeader>

                </fieldset>


                <CardBody>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="halfs">Halfs:</label>
                            <input
                                required
                                autoComplete="off"
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
                                autoComplete="off"
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
                                autoComplete="off"
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
                </CardBody>
                {/* //bluebar */} <CardHeader className="card-footer d-flex align-items-center justify-content-center"></CardHeader>
                <CardBody>
                    <fieldset>
                        <div className={"form-floating mb-3"}>
                            <input type="text" className="form-control"
                                autoComplete="off"
                                id="floatingInput"
                                value={newJob.notes}
                                placeholder="Miscellaneous Notes"
                                onChange={(event) => {
                                    const copy = { ...newJob };
                                    copy.notes = event.target.value;
                                    setnewJob(copy);
                                }} />
                            <label htmlFor="floatingNotes">Notes: </label>
                        </div>
                    </fieldset>
                </CardBody>
                <CardHeader className="card-footer text-white d-flex justify-content-start">
                    <CardHeader className="card-footer text-white d-flex justify-content-start">

                        <div>
                            <button className="mr-4" onClick={handleClockOut} style={{ borderRadius: '15%', padding: '25px', fontSize: '1.25rem' }}>Clock Out</button>
                        </div>
                        <div className="pr-2 d-flex align-items-center" style={{ marginLeft: `128px` }}>
                            <p style={{ fontSize: '300%' }}>{timeDisplay.timeOut}</p>
                        </div>
                    </CardHeader>
                </CardHeader>
                <button
                    style={{ marginTop: '20px' }}
                    className="btn btn-primary"
                    onClick={(event) => {
                        handleSubmitnewJob(event)
                    }}>Submit Job</button>

            </Card>
        </div >
    )
}

export default CompleteJobForm;
import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { editJob, getJobById } from "../../modules/jobManager";
import { getStores } from "../../modules/storeManager";
import { getUserProfiles } from "../../modules/authManager";
import { getDays } from "../../modules/dayManager";



const EditJob = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState({
        userProfileId: "",
        description: "",
        createDateTime: new Date(),
        scheduledTime: "",
        storeId: "",
        notes: "",
        activestatus: true,
        dayIds: []
    })

    const [stores, setStores] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [users, setUsers] = useState([]);


    const getStore = (id) => {
        getJobById(id).then((data) => setJob(data));
        getStores().then(data => setStores(data));
        getUserProfiles().then(data => setUsers(data));
        getDays().then(data => setDaysOfWeek(data));
    };

    useEffect(() => {
        getStore(id);
    }, []);

    const availableTimes = [
        '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '10:30AM',
        '11:00AM', '11:30AM', '12:00PM', '12:30PM', '01:00PM', '01:30PM',
        '02:00PM', '02:30PM', '03:00PM', '03:30PM', '04:00PM', '04:30PM',
        '05:00PM'
    ];

    const handleSubmitJob = (evt) => {
        evt.preventDefault();
        if (job.userProfileId && job.description && job.createDateTime && job.scheduledTime && job.storeId) {
            const copy = { ...job }
            copy.activestatus = false

            editJob(copy).then(() => {
                const copy = { ...job };
                copy.userProfileId = "";
                copy.description = "";
                copy.createDateTime = "";
                copy.scheduledTime = "";
                copy.storeId = "";
                copy.notes = "";
                copy.dayIds = [];
                setJob(copy);
                navigate("/alljobs")


            });
        }
        else {
            alert('job cannot be blank.')
        }
    };



    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setJob({
                ...job,
                dayIds: [...job.dayIds, parseInt(id)]
            });
        } else {
            setJob({
                ...job,
                dayIds: job.dayIds.filter((item) => item !== parseInt(id))
            });
        }
    };
    const timeSlotBuilder = () => {
        return (
            <select value={job.scheduledTime}
                className={"form-select form-select-md mb-3"}
                aria-label={"Floating label select example"}
                onChange={(event) => {
                    const copy = { ...job };
                    copy.scheduledTime = event.target.value;
                    setJob(copy);
                }}>
                {availableTimes.map(timeSlot => (
                    <option key={timeSlot} value={timeSlot} defaultValue={job.scheduledTime}>
                        {timeSlot}
                    </option>
                ))}
            </select>
        );
    };


    const getCheckboxGroup = (days) => {
        const dayIds = days.map((day) => day.id);
        const checkboxes = daysOfWeek.map((day) => (
            <div key={day.id} className=" ms-2 form-check form-check-inline mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={day.id}
                    name={day.name}
                    checked={dayIds.includes(day.id)}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor={day.name}>{day.name}</label>
            </div>
        ));
        return <div>{checkboxes}</div>;
    };

    const getObjectCheckboxes = () => {
        const days = daysOfWeek.filter((day) => job.dayIds.includes(day.id));
        return <div>{getCheckboxGroup(days)}</div>;
    };



    return (
        <div className="container">
            <Card>
                <h3 className="mt-3 ms-3 text-left px-2">Edit Job : {job.description}</h3>
                <CardBody>

                    <fieldset>
                        <div className={"form-floating mb-3"}>
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                value={job.description}
                                autoComplete="off"
                                onChange={(event) => {
                                    const copy = { ...job };
                                    copy.description = event.target.value;
                                    setJob(copy);
                                }} />
                            <label htmlFor="floatingInput">Job Description</label>

                        </div>
                    </fieldset>
                    <fieldset>
                        <div>{getObjectCheckboxes()}</div>
                    </fieldset>
                    <fieldset>
                        <div className="form-floating">
                            <select className={"form-select form-select-md mb-3"}
                                aria-label={"Floating label select example"}
                                value={job.storeId}
                                id="floatingStores"
                                onChange={(event) => {
                                    const copy = { ...job }
                                    copy.storeId = parseInt(event.target.value)
                                    setJob(copy)
                                }}>
                                <option>Choose a Store</option>
                                {
                                    stores.map((store) => {
                                        return (
                                            <option key={store.id} value={store.id}>
                                                {store.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="floatingStores">Selected Store</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-floating">
                            <select className={"form-select form-select-md mb-3"}
                                aria-label={"Floating label select example"}
                                value={job.userProfileId}
                                id="floatingSelect"
                                onChange={(event) => {
                                    const copy = { ...job }
                                    copy.userProfileId = parseInt(event.target.value)
                                    setJob(copy)
                                }}>
                                <option>Assign an Employee</option>
                                {users.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user.fullName}
                                        </option>
                                    )
                                })
                                }
                            </select>
                            <label htmlFor="floatingSelect">Selected Employee</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-floating">

                            {timeSlotBuilder()}
                            <label htmlFor="floatingTime">Scheduled For:</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className={"form-floating mb-3"}>
                            <input
                                required
                                value={job.notes}
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                id="floatingNotes"
                                placeholder="Notes the Job"
                                onChange={(event) => {
                                    const copy = { ...job };
                                    copy.notes = event.target.value;
                                    setJob(copy);
                                }} />
                            <label htmlFor="floatingNotes">Notes About the Job</label>
                        </div>
                    </fieldset>
                    <button
                        style={{ marginTop: '20px' }}
                        className="btn btn-primary"
                        onClick={(event) => {
                            handleSubmitJob(event)
                        }}>Submit Job</button>

                </CardBody>
            </Card>
        </div>
    )
}

export default EditJob;
import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { addNewJob, editJob, getJobById } from "../../modules/jobManager";
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


    const getStore = () => {
        getJobById(id).then((data) => setJob(data));
        getStores().then(data => setStores(data));

        getUserProfiles().then(data => setUsers(data));

    };

    useEffect(() => {
        getDays().then(data => setDaysOfWeek(data));
        getStore();
    }, []);

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

    const getCheckboxGroup = (days) => {
        const dayIds = days.map((day) => day.id);
        const checkboxes = daysOfWeek.map((day) => (
            <div key={day.id}>
                <input
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
                <p className="text-left px-2">New Job Form</p>
                <CardBody>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Job Description: </label>
                            <input
                                required
                                id="name"
                                type="text"
                                value={job.description}
                                className="form-control"
                                placeholder="Job Name"

                                onChange={(event) => {
                                    const copy = { ...job };
                                    copy.description = event.target.value;
                                    setJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <div>{getObjectCheckboxes()}</div>

                        </div>
                    </fieldset>
                    <fieldset>
                        <select
                            style={{ marginTop: '20px' }}
                            className={`category-drop`}
                            value={job.storeId}
                            id="stores"
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
                    </fieldset>
                    <fieldset>
                        <select
                            style={{ marginTop: '20px' }}
                            className={`category-drop`}
                            value={job.userProfileId}
                            id="users"
                            onChange={(event) => {
                                const copy = { ...job }
                                copy.userProfileId = parseInt(event.target.value)
                                setJob(copy)
                            }}>
                            <option>Choose an Employee</option>
                            {
                                users.map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user.displayName}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </fieldset>
                    <fieldset>
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <label htmlFor="scheduledTime">Scheduled Time: </label>
                            <input
                                required
                                id="scheduledTime"
                                value={job.scheduledTime}
                                type="time"
                                className="form-control"
                                placeholder="Scheduled Time"

                                onChange={(event) => {
                                    const copy = { ...job };
                                    copy.scheduledTime = event.target.value;
                                    setJob(copy);
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <label htmlFor="address">Job Notes: </label>
                            <input
                                required
                                value={job.notes}
                                id="notes"
                                type="text"
                                className="form-control"
                                placeholder="Notes about the Job"

                                onChange={(event) => {
                                    const copy = { ...job };
                                    copy.notes = event.target.value;
                                    setJob(copy);
                                }} />
                        </div>
                    </fieldset>
                    <button
                        style={{ marginTop: '20px' }}
                        className="btn btn-success"
                        onClick={(event) => {
                            handleSubmitJob(event)
                        }}>Submit Job</button>

                </CardBody>
            </Card>
        </div>
    )
}

export default EditJob;
import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { addNewJob } from "../../modules/jobManager";
import { getStores } from "../../modules/storeManager";
import { getUserProfiles } from "../../modules/authManager";
import { getDays } from "../../modules/dayManager";



const AddJob = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState({
        userProfileId: "",
        description: "",
        createDateTime: new Date(),
        scheduledTime: "null",
        storeId: "",
        notes: "",
        activestatus: true,
        dayIds: []


    })

    const [stores, setStores] = useState([]);
    const [days, setDays] = useState([]);
    const [users, setUsers] = useState([]);


    const getStore = () => {
        getStores().then(data => setStores(data));
        getDays().then(data => setDays(data));
        getUserProfiles().then(data => setUsers(data));

    };

    useEffect(() => {
        getStore();
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

            addNewJob(job).then(() => {
                const copy = { ...job };
                copy.userProfileId = "";
                copy.description = "";
                copy.createDateTime = "";
                copy.scheduledTime = "";
                copy.storeId = "";
                copy.notes = "";
                copy.dayIds = [];
                setJob(copy);
                navigate("/")
            });
        }
        else {
            alert('job cannot be blank.')
        }
    };




    const handleCheckboxChange = (event) => {
        const value = parseInt(event.target.value);
        if (event.target.checked) {
            // Add the value to the array if the checkbox is checked
            setJob({
                ...job,
                dayIds: [...job.dayIds, value],
            });
        } else {
            // Remove the value from the array if the checkbox is unchecked
            setJob({
                ...job,
                dayIds: job.dayIds.filter((item) => item !== value),
            });
        }
    };
    const timeSlotBuilder = () => {
        return (
            <select value={job.scheduledTime}
                onChange={(event) => {
                    const copy = { ...job };
                    copy.scheduledTime = event.target.value;
                    setJob(copy);
                }}>
                {availableTimes.map(timeSlot => (
                    <option key={timeSlot} value={timeSlot}>
                        {timeSlot}
                    </option>
                ))}
            </select>
        );
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
                            <div>Days to Schedule the Job: </div>
                            {days.map((dayObj) => {
                                return (
                                    <div key={dayObj.id} className="checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={(dayObj.id)}
                                                onChange={handleCheckboxChange}
                                            />
                                            {dayObj.name}
                                        </label>
                                    </div>
                                )
                            })}
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
                            {timeSlotBuilder()}
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

export default AddJob;
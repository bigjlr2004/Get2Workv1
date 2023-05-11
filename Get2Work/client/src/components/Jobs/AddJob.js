import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate } from 'react-router-dom'
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
        'Schedule A Time', '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '10:30AM',
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
                className={"form-select form-select-md mb-3"}
                aria-label={"Floating label select example"}
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
        <main>

            <div className="container">
                <Card>
                    <h3 className="mt-3 ms-3 text-left px-2">Create A New Job</h3>
                    <CardBody>

                        <fieldset>
                            <div className={"form-floating mb-3"}>
                                <input type="text" className="form-control" id="floatingInput" placeholder="Job Description"
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
                            {days.map((dayObj) => {
                                return (
                                    <div key={dayObj.id} className=" ms-2 form-check form-check-inline mb-3">
                                        <label>
                                            <input
                                                className="form-check-input"
                                                id="FlexCheckDefault"
                                                type="checkbox"
                                                value={(dayObj.id)}
                                                onChange={handleCheckboxChange}
                                            />
                                            {dayObj.name}
                                        </label>
                                    </div>
                                )
                            })}

                        </fieldset>
                        <fieldset>
                            <div className="form-floating">
                                <select className={"form-select form-select-md mb-3"}
                                    aria-label={"Floating label select example"}
                                    value={job.storeId}
                                    id="floatingstores"
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
        </main>
    )
}

export default AddJob;
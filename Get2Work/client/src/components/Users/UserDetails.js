import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { editStore, getStore } from "../../modules/storeManager";
import { getUserDetails } from "../../modules/authManager";
import firebase from 'firebase';

const UserDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState({})
    useEffect(() => {
        getUserDetails(firebase.auth().currentUser.uid).then(setUserProfile);
    }, []);

    // const handleSubmitStore = (evt) => {
    //     evt.preventDefault();
    //     if (store.address && store.name) {
    //         editStore(store)
    //             .then(() => {
    //                 const copy = { ...store };
    //                 copy.name = "";
    //                 copy.phoneNumber = "";
    //                 copy.address = "";
    //                 setStore(copy);
    //                 navigate('/storelist')


    //             });
    //     }
    //     else {
    //         alert('Store cannot be blank.')
    // }
    //     }
    return (
        <div className="container">
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
                    {/* <fieldset>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number: </label>
                            <input
                                required
                                id="phoneNumber"
                                value={store.phoneNumber}
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"

                                onChange={(event) => {
                                    const copy = { ...store };
                                    copy.phoneNumber = event.target.value;
                                    setStore(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="address">Store Address: </label>
                            <input
                                required
                                value={store.address}
                                id="address"
                                type="text"
                                className="form-control"
                                placeholder="Store Address"

                                onChange={(event) => {
                                    const copy = { ...store };
                                    copy.address = event.target.value;
                                    setStore(copy);
                                }} />
                        </div>
                    </fieldset>
                    <button
                        style={{ marginTop: '20px' }}
                        className="btn btn-success"
                        onClick={(event) => {
                            handleSubmitStore(event)
                        }}>Submit Store</button> */}

                </CardBody>
            </Card>
        </div>
    )
}

export default UserDetails;
import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { addStore } from "../../modules/storeManager";

const AddStore = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [store, setStore] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        activestatus: true
    })

    const handleSubmitStore = (evt) => {
        evt.preventDefault();
        if (store.address && store.name) {
            addStore(store)
                .then(() => {
                    const copy = { ...store };
                    copy.name = "";
                    copy.phoneNumber = "";
                    copy.address = "";
                    setStore(copy);
                    navigate('/storelist')


                });
        }
        else {
            alert('Store cannot be blank.')
        }
    }
    return (
        <div className="container">
            <Card>
                <p className="text-left px-2">Edit Store Form</p>
                <CardBody>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Store Name: </label>
                            <input
                                required
                                id="name"
                                type="text"
                                value={store.name}
                                className="form-control"
                                placeholder="Store Name"

                                onChange={(event) => {
                                    const copy = { ...store };
                                    copy.name = event.target.value;
                                    setStore(copy);
                                }} />
                        </div>
                    </fieldset>
                    <fieldset>
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
                        className="btn btn-success"
                        onClick={(event) => {
                            handleSubmitStore(event)
                        }}>Submit Store</button>

                </CardBody>
            </Card>
        </div>
    )
}

export default AddStore;
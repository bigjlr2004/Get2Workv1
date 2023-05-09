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
                <h3 className="mt-3 ms-3 text-left px-2">New Store</h3>
                <CardBody>
                    <fieldset>
                        <div className={"form-floating mb-3"}>
                            <input type="text" className="form-control" id="floatingInput" placeholder="Store Name"
                                required
                                value={store.name}
                                onChange={(event) => {
                                    const copy = { ...store };
                                    copy.name = event.target.value;
                                    setStore(copy);
                                }} />
                            <label htmlFor={"floatingInput"}>Store Description</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className={"form-floating mb-3"}>
                            <input type="text" className="form-control" id="floatingPhone"
                                required
                                placeholder="Phone Number"
                                value={store.phoneNumber}
                                onChange={(event) => {
                                    const copy = { ...store };
                                    copy.phoneNumber = event.target.value;
                                    setStore(copy);
                                }} />
                            <label htmlFor="floatingPhone">Phone Number</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className={"form-floating mb-3"}>
                            <input type="text" className="form-control" id="floatingAddress"
                                placeholder="Address"
                                required
                                value={store.address}
                                onChange={(event) => {
                                    const copy = { ...store };
                                    copy.address = event.target.value;
                                    setStore(copy);
                                }} />
                            <label htmlFor="floatingAddress">Address</label>
                        </div>
                    </fieldset>
                    <button
                        style={{ marginTop: '20px' }}
                        className="btn btn-primary"
                        onClick={(event) => {
                            handleSubmitStore(event)
                        }}>Submit Store</button>

                </CardBody>
            </Card>
        </div>
    )
}

export default AddStore;
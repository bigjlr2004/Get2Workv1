import React, { useEffect, useState } from "react";
import { getStores } from "../../modules/storeManager";
import Store from "./Store";
import { NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();
    const getStore = () => {
        getStores().then(data => setStores(data));
    };

    useEffect(() => {
        getStore();
    }, []);


    return (
        <div className="container">
            <h2>Store List</h2>


            <Button tag={Link} to="/addstore" className="btn btn-success" style={{ marginBottom: '20px' }}>Add Store</Button>
            <div className="row justify-content-center">
                {stores.map((p) => (
                    <Store Store={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default StoreList
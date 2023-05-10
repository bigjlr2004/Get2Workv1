import React, { useEffect, useState } from "react";
import { getStores } from "../../modules/storeManager";
import Store from "./Store";
import { Link } from "react-router-dom";

const StoreList = () => {
    const [stores, setStores] = useState([]);

    const getStore = () => {
        getStores().then(data => setStores(data));
    };

    useEffect(() => {
        getStore();
    }, []);


    return (
        <div className="container">
            <h2>Store List</h2>
            <a className="btn-primary btn mb-3" tag={Link} to="/addstore" >Add Store</a>
            <div className="row justify-content-center">
                {stores.map((p) => (
                    <Store Store={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default StoreList
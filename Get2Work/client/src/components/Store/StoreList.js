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
            <Link className="btn btn-primary mb-3" to={`/addstore`}>Add Store</Link>

            <div className="row justify-content-center">
                {stores.map((p) => (
                    <Store Store={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default StoreList
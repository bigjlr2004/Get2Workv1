import React, { useEffect, useState } from "react";

import { getUserProfiles } from "../../modules/authManager";
import User from "./User";



const UserList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getUserProfiles().then(data => setUsers(data));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container">
            <h2>Employees</h2>
            <div className="row justify-content-center">
                {users.map((p) => (
                    <User user={p} key={p.id} />
                ))}
            </div>
        </div>
    );

}
export default UserList
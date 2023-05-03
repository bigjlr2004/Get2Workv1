import { useNavigate } from "react-router-dom"
import { getToken } from "./authManager";
const baseUrl = '/api/Job';




export const getDays = () => {
    return getToken().then((token) => {
        return fetch("api/Day", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get Days"
                );
            }
        });
    });
};

export const addNewJob = (Job) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/AddJob`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Job),
        })
    });
};




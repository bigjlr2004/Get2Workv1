import { useNavigate } from "react-router-dom"
import { getToken } from "./authManager";
const baseUrl = '/api/CompletedJob';



export const GetTodaysCompletedJobsAllUsers = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetTodaysCompletedJobsAllUsers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get scheduledJobs"
                );
            }
        });
    });
}

export const getUsersCompletedJobs = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/usercompletedjobs`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get scheduledJobs"
                );
            }
        });
    });
}

export const completeJob = (job) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/Add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        })
    });
};


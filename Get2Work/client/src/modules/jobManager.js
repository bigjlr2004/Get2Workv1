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
export const getJobList = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
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
export const getAllJobsScheduledToday = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetAllJobsScheduledToday`, {
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
export const getAllJobsScheduledSpecificDay = (day) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/specificday?q=${day}`, {
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


export const getTodaysScheduledJobsByUser = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/todayuserscheduledjobs`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get users scheduledJobs"
                );
            }
        });
    });
}
export const getScheduledJobsByUser = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/userscheduledjobs`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get users scheduledJobs"
                );
            }
        });
    });
}

export const getJobById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
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




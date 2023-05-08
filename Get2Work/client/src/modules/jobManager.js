import { getToken } from "./authManager";
const baseUrl = '/api/Job';


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
        return fetch(`${baseUrl}/getJobById/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get the Scheduled Job By Id."
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
export const editJob = (job) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/Edit?${job.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        })
    });
};




import { useNavigate } from "react-router-dom"
import { getToken } from "./authManager";
const baseUrl = '/api/JobSchedule';



export const getDailyScheduledJobs = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/JobScheduleForScheduleByDateRange`, {
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


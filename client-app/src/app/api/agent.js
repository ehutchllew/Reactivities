import { toast } from "react-toastify";
import { history } from "../..";

const baseUrl = "http://localhost:5000/api";
const baseHeaders = {
    "Content-Type": "application/json",
};

const sleep = (ms) => (response) => {
    return new Promise((resolve) => setTimeout(() => resolve(response), ms));
};

async function baseService(method, url, body, headers) {
    const allHeaders = {
        ...baseHeaders,
        ...headers,
    };
    const resp = await fetch(baseUrl + url, {
        method,
        headers: allHeaders,
        body,
    });

    if (resp.status === 404 || resp.status === 400) {
        history.push("/notfound");
    }
    if (resp.status === 500) {
        toast.error("Server error - check the terminal for more info!");
    }

    return sleep(1000)(resp);
}

const requests = {
    get: baseService.bind(this, "GET"),
    post: baseService.bind(this, "POST"),
    put: baseService.bind(this, "PUT"),
    delete: baseService.bind(this, "DELETE"),
};

export const ActivitiesService = {
    list: () => requests.get("/activities"),
    details: (id) => requests.get(`/activities/${id}`),
    create: (body) => requests.post("/activities", JSON.stringify(body)),
    update: (body) =>
        requests.put(`/activities/${body.id}`, JSON.stringify(body)),
    delete: (id) => requests.delete(`/activities/${id}`),
};

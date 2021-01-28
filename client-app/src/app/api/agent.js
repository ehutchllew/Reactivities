const baseUrl = "http://localhost:5000/api";
const baseHeaders = {}


async function baseService(method, url, body, headers){
const allHeaders = {
    ...baseHeaders,
    ...headers
}
console.log(baseUrl, url)
const resp = await fetch(baseUrl + url, {
    method,
    allHeaders,
    body,
})    

    return resp;
}

const requests = {
    get: baseService.bind(this, "GET"),
    post: baseService.bind(this, "POST"),
    put: baseService.bind(this, "PUT"),
    delete: baseService.bind(this, "DELETE"),
}

export const ActivitiesService = {
    list: () => requests.get("/activities"),
    details: (id) => requests.get(`/activities/${id}`),
    create: (body) => requests.post("/activities", body),
    update: (body) => requests.put(`/activities/${body.id}`, body),
    delete: (id) => requests.delete(`/activities/${id}`)
}
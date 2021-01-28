const baseUrl = "http://localhost:5000/api";
const baseHeaders = {
   "Content-Type": "application/json"
}


async function baseService(method, url, body, headers){
const allHeaders = {
    ...baseHeaders,
    ...headers
}
console.log(method, url, body, allHeaders)
const resp = await fetch(baseUrl + url, {
    method,
    headers: allHeaders,
    body,
})    
console.log(resp);
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
    create: (body) => requests.post("/activities", JSON.stringify(body)),
    update: (body) => requests.put(`/activities/${body.id}`, body),
    delete: (id) => requests.delete(`/activities/${id}`)
}
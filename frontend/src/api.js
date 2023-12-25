import { BaseUrl } from "./constants"
import axios from "./axios"

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

// export async function loginUser(creds) {
//     const res = await fetch("http://localhost:3000/api/loginUser",
//         { method: "post", body: JSON.stringify(creds) }
//     )
//     return data
// }

export async function loginUser(data) {
    const response = await axios.post(`/api/loginUser`, JSON.stringify(data),{
        headers:{"Content-Type":"application/json"},
        // withCredentials:true,
    })
    return response.json();

}
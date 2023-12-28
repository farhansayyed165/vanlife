import { BaseUrl } from "./constants"
import axios from "axios"

const BASEURL = "http://localhost:3000"

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
    const res = await fetch(`${BaseUrl}${url}`)
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


export async function loginUser(data) {
    try {
        const response = await axios.post(`${BASEURL}/api/loginUser`, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials:true,
        })
        return response.data;
    } catch (error) {
        const err = {message:error.response.data?.error, error:true}
        // console.log(error.response.data.error)
        return err
    }

}


export async function createUser(formData) {
    try {
        const response = await axios.post(`${BASEURL}/api/createUser`, formData, {
            headers: { "Content-Type": "multipart/form-data" },  
        })
        return response.data;
    } catch (error) {
        const err = {message:error.response.data?.error, error:true}
        // console.log(error.response.data.error)
        return err
    }

}
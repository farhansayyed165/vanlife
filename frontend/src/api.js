import { BaseUrl } from "./constants"
import axios from "axios"

const BASEURL = "http://localhost:3000"

export async function checkToken(token){
    const url = `${BASEURL}/checkToken`
    const res = await fetch(url, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            'Authorization': `Bearer ${token}`
        },
        credentials:"include",

    })
    return res.json()
}

export async function refreshToken(){
    const response = await fetch(`${BaseUrl}/api/refresh`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
      })
    return response.json()
}

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

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(`${BaseUrl}${url}`)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }
export async function getHostVans(userId, token, vanid) {
    const url = `/api/getHostVans/`
    const body = vanid ? {userId, vanid}:{userId}
    const response = await axios.post(`${BASEURL}${url}`,body, {
        headers: { "Content-Type": "application/json", 'Authorization':`Bearer ${token}` },
        withCredentials:true
    })
    // const res = await fetch(`${BaseUrl}${url}`,{
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json',
    //         'Authorization':`Bearer ${token}`,
    //         'Access-Control-Allow-Credentials':"true"
    //     },
    //     body:{
    //         userId:userid
    //     },
    //     credentials:'include'
    // }
    // )
    // if (!response.ok) {
    //     throw {
    //         message: "Failed to fetch vans",
    //         statusText: res.statusText,
    //         status: res.status
    //     }
    // }
    // const data = await res.json()
    // return data.vans
    console.log(response.data)
    return response
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

export async function logoutUser() {


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
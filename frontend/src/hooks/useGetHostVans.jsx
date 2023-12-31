import React from 'react'
import { getHostVans } from '../api'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'


function useGetHostVans(setData) {
    const { auth } = useAuth()
    async function fetchData() {
        const response = await getHostVans(auth.userid, auth.accessToken)
        console.log(response)
        if (response.data.error) {
            console
            const navigate = useNavigate()
            navigate(0)
        }
        console.log("res", response.data.vans)
        setData(response.data.vans)
    }
    return fetchData
}

export default useGetHostVans
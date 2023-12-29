import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {refreshToken} from "../api";
import useAuth from "../hooks/useAuth";
import { controllers } from "chart.js";

function  PersistentLogin(){
    const [isLoading, setIsLoading] = useState(true);
    const { auth, setAuth } = useAuth();

    useEffect(()=>{
        let isMounted = true
        const verifyRefresh = async ()=>{
            try {
                const res = await refreshToken()
                setAuth({user:res.user, accessToken:res.accessToken})
                console.log("res",res)
            } catch (error) {
                console.log(error)
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefresh() : setIsLoading(false)
        return ()=>{
            isMounted = false;
        }
    })
    useEffect(()=>{
        console.log("isLoading", isLoading)
        console.log("auth", auth)
    },[isLoading])
    console.log("persist auth", auth)
    return(
        <>
            {isLoading ? <p>Loading...</p>: <Outlet/>}
        </>
    )
}

export default PersistentLogin
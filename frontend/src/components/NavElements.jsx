import React, {useState, useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx"
import {AiOutlineHome, AiOutlineInfoCircle, AiOutlineClose} from "react-icons/ai"
import { RiUserReceivedFill } from "react-icons/ri";
import {FaShuttleVan} from "react-icons/fa"
import useLogout from '../hooks/useLogout'
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

function NavElements({ mobile }) {
    const refresh = useRefreshToken()
    const [count, setCount] = useState(0)
    const { auth } = useAuth()
    useEffect(()=>{
        if(!auth?.accessToken){
            refresh()
        }
    },[count])

    useEffect(()=>{
        if(!auth?.accessToken){
            setCount(!count)
        }
    },[])
    const mobileStyles = mobile ? ' text-lg my-2 text-center' : ''
    const logout = useLogout()
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <>
            <NavLink
                to="about"
                style={({ isActive }) => isActive ? activeStyles : null}
                className={`${mobileStyles} flex items-center `}

            >
                {mobile && <AiOutlineInfoCircle size={25} className='mr-1'/>} About
            </NavLink>


            <NavLink
                to="vans"
                style={({ isActive }) => isActive ? activeStyles : null}
                className={`${mobileStyles} flex items-center `}


            >
                {mobile && <FaShuttleVan size={25} className='mr-1'/>} Vans
            </NavLink>


           {auth?.accessToken && <><NavLink
                to="host"
                style={({ isActive }) => isActive ? activeStyles : null}
                className={`${mobileStyles} flex items-center `}
            >
                {mobile && <AiOutlineHome size={25} className='mr-1'/>}  <RxAvatar className='mr-1' size={30} /> 
            </NavLink>

            <button onClick={logout} className={`${mobileStyles} flex items-center `}> {mobile && <AiOutlineClose size={25} className='mr-1'/>} Logout</button></>}

            {!auth?.accessToken && 
            <>
            <NavLink to="login" 
            style={({ isActive }) => isActive ? activeStyles : null}
            className={` login-link ${mobileStyles} `} 
            >
                {mobile && <RiUserReceivedFill size={25} className='mr-1'/> } Login
            </NavLink>
            </>}
        </>
    )
}

export default NavElements
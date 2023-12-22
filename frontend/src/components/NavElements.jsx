import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx"
import {AiOutlineHome, AiOutlineInfoCircle, AiOutlineClose} from "react-icons/ai"
import {FaShuttleVan} from "react-icons/fa"

function NavElements({ mobile }) {

    const mobileStyles = mobile ? ' text-lg my-2 text-center' : ''

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
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
            <NavLink
                to="host"
                style={({ isActive }) => isActive ? activeStyles : null}
                className={`${mobileStyles} flex items-center `}
            >
                {mobile && <AiOutlineHome size={25} className='mr-1'/>} Host
            </NavLink>
            <Link to="login" className={` login-link ${mobileStyles} `}>
                 <RxAvatar className='mr-1' size={30} /> {mobile && "Profile" }
            </Link>
            <button onClick={fakeLogOut} className={`${mobileStyles} flex items-center `}> {mobile && <AiOutlineClose size={25} className='mr-1'/>} Logout</button>
        </>
    )
}

export default NavElements
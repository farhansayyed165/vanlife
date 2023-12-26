import React from 'react'
import { useLocation,Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RequireAuth() {
    const {auth} = useAuth();
    const location = useLocation();
    
  return (
    auth.user ? <Outlet/>: <Navigate to="/login" state={{from:location, message:"You must login first"}} replace/>
  )
}

export default RequireAuth
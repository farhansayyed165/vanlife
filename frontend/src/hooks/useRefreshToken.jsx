import React from 'react'
import useAuth from './useAuth'
import axios from 'axios'
import { BaseUrl } from '../constants';

function useRefreshToken() {
    const {setAuth} = useAuth();
    async function refresh(){
        const response = await axios.get(`${BaseUrl}/api/refresh`, {
          withCredentials:true
        })
        setAuth(prev=>{
          console.log(prev)
          console.log(response.accessToken)
          return {...prev, accessToken:response.accessToken}
        })
        return response.accessToken
    }
  return refresh
}

export default useRefreshToken
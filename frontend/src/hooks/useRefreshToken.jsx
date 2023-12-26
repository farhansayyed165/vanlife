import React from 'react'
import useAuth from './useAuth'
import axios from 'axios'
import { BaseUrl } from '../constants';

function useRefreshToken() {
    const {setAuth} = useAuth();
    async function refresh(){
        // const response = await axios.get()
    }
  return (
    <div>useRefreshToken</div>
  )
}

export default useRefreshToken
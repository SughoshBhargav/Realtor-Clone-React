import React from 'react'
import { Outlet,Navigate } from 'react-router'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner'

export default function PrivateRoute() {
  

    const {loggedIn,checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return <Spinner/>;
        // return <h3>Loading...</h3>;
    }
    return loggedIn ? <Outlet/>:<Navigate to="/sign-in"/>
   
}

"use client"
import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
export let LoginContext=createContext();

export default function MainContext({children}) {
    let tokenC=Cookies.get('token');
    let [token,setToken]=useState(tokenC ?? '')
    
    useEffect(()=>{
        Cookies.set('token',token)    
    },[token])

    let obj={token,setToken}
    return (
        <LoginContext.Provider value={obj}>
            {children}
        </LoginContext.Provider>
    )
}

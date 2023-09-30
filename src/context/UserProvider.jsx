import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { getCurrentUserDetails, isLoggedIn } from '../auth'

function UserProvider({children}) {


    const [user,setUser]=useState({
        data:{},
        login:false
    })

      useEffect(()=>{
          setUser({
            data:getCurrentUserDetails(),
            login:isLoggedIn()
          })
      },[])
    

  return (
    
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
    
  )
}

export default UserProvider
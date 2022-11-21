
import { useState } from "react"
import { Navigate } from "react-router-dom"

export default  function Redireccion ({children}){
    const [user,setUser] = useState( JSON.parse( localStorage.getItem("user") ) )

    if (!user) return <Navigate to="/login" />
    return(
        children
    )
    
  }
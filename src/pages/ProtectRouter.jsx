import React from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { handleLogut } from "../helpers/logout"

function ProtectRouter({ children }) {
  const userToken = localStorage.getItem("token")
const navigate = useNavigate()
  if (!userToken) {
    // handleLogut(navigate)
    return <Navigate to={"/login"} replace={true} />
  } 
  
  if (localStorage.getItem("login-pin")) {
    handleLogut(navigate)
    return <Navigate to={"/login"} replace={true} />
  }
  return children || <Outlet />
}

export default ProtectRouter

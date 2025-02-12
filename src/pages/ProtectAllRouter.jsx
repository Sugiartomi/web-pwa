import React from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { handleLogut } from "../helpers/logout"
import { useEffect } from "react"
import axiosConfig from "../config/axios"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  error_order,
  failed_order,
  socket_notification,
} from "../recoil/notificationState"

import { io } from "socket.io-client"
import { useState } from "react"
import { get_data_total_wallet } from "../recoil/walletState"
import swal from "sweetalert"
import { getTheme } from "../recoil/theme.State"
import { httpSocketDev } from "../config/api"

function ProtectAllRouter({ children }) {
  const userToken = localStorage.getItem("token")
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [darkMode, setDarkMode] = useRecoilState(getTheme)

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      let theme = JSON.parse(localStorage.getItem("theme"))
      if (theme) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    } else {
      localStorage.setItem("theme", false)
      setDarkMode(false)
    }
  }, [])

  let user_id
  if (localStorage.getItem("data_user")) {
    user_id = JSON.parse(localStorage.getItem("data_user")).user.id
  }
  // const dataWallet = useRecoilValue(get_data_total_wallet)

  useEffect(() => {
    axiosConfig
      .post("/wallet", {
        token: userToken,
      })
      .then(({ data }) => {
        if (data.status === "error") {
          if (userToken) {
            swal({
              icon: "error",
              text: "Your account has been login at another device!",
              buttons: false,
            })
            setTimeout(() => {
              handleLogut(navigate)
            }, 2000)
          }
        }
      })
  }, [pathname])

  const [dataErrorOrder, setDataErrorOrder] = useRecoilState(error_order)

  useEffect(() => {
    const CONNECTION_PORT =httpSocketDev
    const socket = io(CONNECTION_PORT, {
      transports: ["websocket"],
    })
    const CHANNEL = `private-notification@${user_id}`
    socket.emit("subscribe", `user.${CHANNEL}`)
    socket.on(CHANNEL, (data) => {
      if (data.type === "FAILED_ORDER") {
        setDataErrorOrder([...dataErrorOrder, data])
      }
    })
  }, [])

  // useEffect(() => {
  //   if (socketNotification) {
  //     console.log(socketNotification)
  //     if (socketNotification.type === "FAILED_ORDER") {
  //       setDataFailedOrder(socketNotification)
  //     }
  //   }
  // }, [socketNotification])

  // console.log(socketNotification)

  // handleLogut(navigate)
  // if (!userToken) {
  //   return <Navigate to={"/login"} replace={true} />
  // }

  // useEffect(() => {
  //   if (userToken) {
  //     axiosConfig
  //       .post("/update-profile", {
  //         token: userToken,
  //       })
  //       .then(({ data }) => {
  //         console.log(data);
  //         if (data.status === "success") {

  //         } else {
  //           handleLogut(navigate)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }, [pathname])

  // if (localStorage.getItem("login-pin")) {
  //   handleLogut(navigate)
  //   return <Navigate to={"/login"} replace={true} />
  // }
  return children || <Outlet />
}

export default ProtectAllRouter

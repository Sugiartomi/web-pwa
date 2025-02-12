import { atom, selector, useRecoilState } from "recoil"
import axiosConfig from "../config/axios"
import { io } from "socket.io-client"
import { httpSocketDev } from "../config/api"
const userToken = localStorage.getItem("token")
let user_id
if (localStorage.getItem("data_user")) {
  user_id = JSON.parse(localStorage.getItem("data_user")).user.id
}

export const error_order = atom({
  key: "errorOrder",
  default: [],
})

export const data_notification_list = selector({
  key: "dataNotificationList",
  get: async () => {
    let listNotification = null

    if (!userToken) return null

    try {
      await axiosConfig
        .post("/notification", {
          token: userToken,
        })
        .then(({ data }) => {
          listNotification = data.data
        })
    } catch (error) {
      console.log(error)
    }

    return listNotification
  },
})

export const unread_notification_list = selector({
  key: "unreadNotificationList",
  get: async () => {
    let listUnreadNotification = null
    if (!userToken) return null

    try {
      await axiosConfig
        .post("/notification", {
          token: userToken,
        })
        .then(({ data }) => {
          if (data.status === "success") {
            let unread = data.data.filter((e) => e.status !== "READ")
            listUnreadNotification = unread.length
          }
        })
    } catch (error) {
      console.log(error)
    }

    return listUnreadNotification
  },
})

export const read_notification = selector({
  key: "readNotification",
  get: async () => {
    let read_Notification = null

    try {
      await axiosConfig
        .post("/read-notification", {
          token: userToken,
        })
        .then(({ data }) => {
          if (data.status === "success") {
            read_Notification = true
          }
        })
    } catch (error) {
      console.log(error)
    }

    return read_Notification
  },
})

export const socket_notification = selector({
  key: "socketNotification",
  get: async () => {
    let dataSocketNotification = null
    if (user_id) {
      const CONNECTION_PORT = httpSocketDev
      const socket = io(CONNECTION_PORT, {
        transports: ["websocket"],
      })
      const CHANNEL = `private-notification@${user_id}`
      socket.emit("subscribe", `user.${CHANNEL}`)
      socket.on(CHANNEL, (data) => {
        dataSocketNotification = data
      })
    }
    return dataSocketNotification
  },
})

export const failed_order = atom({
  key: "key_failed_order",
  default: false,
})

import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"
import {
  ChevronLeft,
  ChevronRight,
  DashCircleFill,
  Eye,
  EyeSlash,
  PatchCheckFill,
  Send,
  X,
  XCircleFill,
} from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import axiosConfig from "../config/axios"
import NavigationButton from "../components/global/NavigationButton"
import { httpSocketDev } from "../config/api"
import { DBChat } from "../DB/Chatroom"

function ChatRoom() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const userToken = localStorage.getItem("token")
  const dataLocalStg = JSON.parse(localStorage.getItem("data_user"))
  const [chat, setChat] = useState(DBChat)
  const [newChat, setNewChat] = useState()
  console.log(newChat);
  const [renderChat, setRenderChat] = useState([])
  const [input, setInput] = useState()
  const [trigger, setTrigger] = useState(false)

  console.log(input)

  function handleSend(message, token) {
   
  }





  useEffect(() => {
    let temp = []

    if (chat.length !== 0) {
      chat.forEach((e) => {
        temp.push(e)
      })
      console.log(newChat)
      if (newChat !== undefined) {
        temp.unshift(newChat)
      }
    }
    setChat(temp)
  }, [trigger, newChat])

  console.log(chat)

  return (
    <>
      <div className="container-fluid px-3 text-roboto">
        <p className="font-20 my-2" onClick={() => navigate("/my-profile")}>
          <ChevronLeft />
          <strong className="ms-4"> Chat Room</strong>
        </p>
        <div className="" style={{ height: "95vh", paddingBottom: 100 }}>
          <div
            className="scrollbar-none d-flex"
            style={{
              height: "92%",
              overflow: "auto",
              flexDirection: "column-reverse",
            }}
          >
            {chat.length
              ? chat.map((e) => {
                  if (dataLocalStg.user.username !== e.username) {
                    return (
                      <>
                        {/* not me */}
                        <div className=" mt-3">
                          <div className="d-flex">
                            <img
                              src=""
                              alt=""
                              className="bg-warning"
                              style={{ width: 32, height: 32 }}
                            />
                            <div
                              className="ms-2 p-4 rounded"
                              style={{
                                width: "85%",
                                backgroundColor: "#F1F6FF",
                              }}
                            >
                              <p className="fw-bold ms-4">{e.username}</p>
                              {e.messages}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  } else {
                    return (
                      <>
                        {/* me */}
                        <div className=" mt-3">
                          <div className="d-flex justify-content-end">
                            <div
                              className="me-2 p-4 rounded"
                              style={{
                                width: "85%",
                                backgroundColor: "#DEEAFF",
                              }}
                            >
                              <p className="fw-bold text-end me-4">
                                {e.username}
                              </p>
                              {e.messages}
                            </div>
                            <img
                              src=""
                              alt=""
                              className="bg-warning"
                              style={{ width: 32, height: 32 }}
                            />
                          </div>
                        </div>
                      </>
                    )
                  }
                })
              : "Loading..."}
          </div>
          <div className="d-flex pt-3">
            <textarea
              className="form-control shadow-none"
              placeholder="Write message here..."
              value={input}
              id=""
              cols="10"
              rows="1"
              onChange={(e) => {
                e.preventDefault()
                setInput(e.target.value)
              }}
            ></textarea>
            <div
              className="text-white ms-2 rounded-circle d-flex justify-content-center align-items-center fw-bold"
              style={{ width: 45, height: 38, backgroundColor: "#266DE0" }}
              onClick={() => {
                handleSend(input, userToken)
                setInput("")
              }}
            >
              <Send />
            </div>
          </div>
        </div>
      </div>
      <NavigationButton pathDestination={pathname} />

      {/* fixed navbar */}
    </>
  )
}

export default ChatRoom

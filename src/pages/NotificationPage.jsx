import React, { useEffect } from "react"
import { useState } from "react"
import { ChevronLeft, Dot } from "react-bootstrap-icons"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  data_notification_list,
  read_notification,
  socket_notification,
} from "../recoil/notificationState"
import { useRecoilState, useRecoilValue } from "recoil"
import { io } from "socket.io-client"
import { getTheme } from "../recoil/theme.State"
import { DBNotification } from "../DB/Notification"

function NotificationPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const user_id = JSON.parse(localStorage.getItem("data_user")).user.id

  const navigate = useNavigate()
  const [splitNotif, setSplitNotif] = useState(DBNotification.slice(0,20))
  const [statusViewAll, setStatusViewAll] = useState(false)
  const [notificationList, setnotificationList] = useState(DBNotification)


  

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ marginBottom: "80px", minHeight: "100vh" }}
      >
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "100px" }}>
            Notifications
          </p>
        </div>

        {/* list notification */}
        <div className="mt-3">
          {splitNotif.length
            ? splitNotif.map((el, i) => {
                return (
                  <div className="d-flex align-items-center mb-3" key={i}>
                    <p
                      className="mb-0"
                      // style={
                      //     el.description.split(" ")[0] === "Buy"
                      //         ? { fontSize: "32px", color: "#20CB6F" }
                      //         : el.description.split(" ")[0] === "Sell"
                      //         ? { fontSize: "32px", color: "#F4465E" }
                      //         : {}
                      // }
                    >
                      <CgArrowsExchangeAlt />
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "32px", color: "#29AEFA" }}
                    >
                      <Dot />
                    </p>
                    <div>
                      <p className="font-18 fw-bold mb-0">{el.type}</p>
                      <p
                        className={
                          darkMode
                            ? "font-12 mb-0 text-white"
                            : "font-12 mb-0 font-dark"
                        }
                      >
                        {el.messages}
                      </p>
                      <p className="font-9 mb-0">{el.created_at}</p>
                    </div>
                  </div>
                )
              })
            : "No Data Notification"}
        </div>
      </div>
      {statusViewAll ? (
        ""
      ) : (
        <div
          className={
            darkMode
              ? "fixed-navbar pb-2 px-2 col-12 width-breakpoint bg-dark-mode"
              : "fixed-navbar pb-2 px-2 col-12 width-breakpoint"
          }
        >
          <div className="d-grid col-12">
            <button
              type="button"
              className="btn text-white w-100"
              style={{ backgroundColor: "#1B6AEA", height: "40px" }}
              onClick={() => setStatusViewAll(true)}
            >
              View All
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationPage

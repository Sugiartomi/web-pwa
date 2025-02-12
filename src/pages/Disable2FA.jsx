import React, { useEffect, useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import Authenticator2FAImg from "../assets/authenticator2FAimg.svg"
import ResetIcon from "../assets/mdi_lock-reset.svg"
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function Disable2FA() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const { state } = useLocation()
  const userToken = localStorage.getItem("token")
  const [getCode, setGetCode] = useState()
  const [pin, setPin] = useState("")

  const handleSubmitCode = (event) => {
    event.preventDefault()

    let dataLocalstg = JSON.parse(localStorage.getItem("data_user"))
    dataLocalstg.auth_status = "disabled"
    localStorage.setItem("data_user", JSON.stringify(dataLocalstg))
    navigate("/security")
  }

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto mb-3 text-white"
            : "container text-roboto mb-3"
        }
        style={{ height: "100vh" }}
      >
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/login")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "80px" }}>
            Security Verification
          </p>
        </div>

        <img
          src={Authenticator2FAImg}
          alt=""
          className="img-fluid mx-auto d-block mt-5"
        />
        <form action="" className="mt-5" onSubmit={handleSubmitCode}>
          <div>
            <label
              className={darkMode ? "font-14 text-white" : "font-14"}
              style={{ color: "#626262" }}
            >
              Enter 2FA Authenticator Code
            </label>
            <div
              className={
                darkMode
                  ? " align-items-center py-1"
                  : " align-items-center border rounded"
              }
              style={{ height: "42px" }}
            >
              <input
                type="number"
                className={
                  darkMode
                    ? "form-control shadow-none border-0 authenticator2FAForm bg-dark-mode2 text-white py-2"
                    : "form-control shadow-none border-0 authenticator2FAForm"
                }
                placeholder="Input  Code 2FA  Authenticator"
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          {/* button send */}
          <div className="d-grid col-12">
            {pin.length === 6 ? (
              <button
                type="submit"
                className={
                  darkMode
                    ? "btn text-white mt-3 border-0"
                    : "btn text-white mt-3 "
                }
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
              >
                Send
              </button>
            ) : (
              <button
                type="submit"
                className={
                  darkMode
                    ? "btn text-white mt-3 border-0"
                    : "btn text-white mt-3 "
                }
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                disabled
              >
                Send
              </button>
            )}
          </div>

          <p
            className="font-12 fw-bold font-primary text-center mt-5"
            data-bs-toggle="modal"
            data-bs-target="#referral-modal"
          >
            Forgot Google Authenticator Code?
          </p>
          <p className="font-12 fw-bold font-primary text-center mt-3">
            Logout
          </p>
        </form>
      </div>

      {/* modal reset security */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="referral-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className="modal-content rounded border-0"
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body">
              <div className="d-flex justify-content-between align-items-center"></div>
              <img
                src={ResetIcon}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p className="font-24 text-center fw-bold mt-3 mb-2">
                Reset Security Features
              </p>
              <p
                className="font-14 font-red text-center p-2 rounded my-3"
                style={{ backgroundColor: "#FEF1F2" }}
              >
                To reset 2FA, Please contact live chat. For detailed
                information, click below{" "}
              </p>
              {/* button ok */}
              <div className="d-grid col-12">
                <a
                  href="https://help.digitalexchange.id/home/id"
                  target="_blank"
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                >
                  Visit Helpdesk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Disable2FA

import React, { useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import GooglePlayImg from "../assets/google-play.svg"
import AppStoreImg from "../assets/app-store.svg"
import DuplicateImg from "../assets/2FA-duplicate.svg"
import Success2FAImg from "../assets/success_2FA.svg"
import { useDispatch } from "react-redux"
import {
  google_authenticator_status,
  security_status,
} from "../store/actions/user"
import axiosConfig from "../config/axios"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function Google2FAPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const userToken = localStorage.getItem("token")
  const [current, setCurrent] = useState(1)
  const [data2FA, setData2FA] = useState()
  const [generateEmailCode, setGenerateEmailCode] = useState(false)
  const [emailCode, setEmailCode] = useState()
  const [code_2fa, setCode_2fa] = useState()
  const [getEmail, setGetEmail] = useState({
    count: 180,
    status: false,
  })

  // const googleAuthenticator = () => {
  //   dispatch(security_status("high"));
  //   dispatch(google_authenticator_status(true));
  //   navigate("/security");
  // };

  const genereate2FA = () => {
    setCurrent(current + 1)
  }

  const getEmailCode = () => {
    setGetEmail({ ...getEmail, status: "waiting" })

    setGenerateEmailCode(true)
  }

  const submit2FA = () => {
    navigate("/security")
  }

  useEffect(() => {
    if (getEmail.status === "get") {
      if (getEmail.count !== 0) {
        setTimeout(() => {
          setGetEmail({ ...getEmail, count: getEmail.count - 1 })
        }, 1000)
      } else {
        setGetEmail({ status: false, count: 180 })
      }
    }
  }, [getEmail.count, getEmail.status])

  return (
    <>
      <div
        className={
          darkMode
            ? "width-breakpoint mx-auto d-block reset-pin-height text-white"
            : "width-breakpoint mx-auto d-block reset-pin-height"
        }
        style={{ height: "100vh" }}
      >
        <div className="container py-4 text-roboto">
          {/* title */}
          <div className="d-flex align-items-center">
            {current > 1 ? (
              <div
                style={{
                  width: "41px",
                  height: "41px",
                  border: darkMode ? "" : "1.5px solid #E8ECF4",
                  borderRadius: "12px",
                }}
                onClick={() => setCurrent(current - 1)}
              >
                <p
                  className="font-16 fw-bolder mb-0"
                  style={{ marginTop: "6px", marginLeft: "8px" }}
                >
                  <ChevronLeft />
                </p>
              </div>
            ) : (
              <div
                style={{
                  width: "41px",
                  height: "41px",
                  border: darkMode ? "" : "1.5px solid #E8ECF4",
                  borderRadius: "12px",
                }}
                onClick={() => navigate("/my-profile")}
              >
                <p
                  className="font-16 fw-bolder mb-0"
                  style={{ marginTop: "6px", marginLeft: "8px" }}
                >
                  <ChevronLeft />
                </p>
              </div>
            )}
            <p
              className="font-18 text-center mt-3"
              style={{ fontWeight: "600", marginLeft: "60px" }}
            >
              Google Authenticator
            </p>
          </div>

          {current < 5 ? (
            <>
              {" "}
              {/* progress */}
              <div
                className="progress rounded-pill mt-5"
                style={{ height: "3px" }}
              >
                <div
                  className="progress-bar rounded-pill"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  style={{ width: `${current * 32 - 32}%` }}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "-15px" }}
              >
                <p
                  className="badge rounded-circle font-14"
                  style={
                    current > 0
                      ? {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#1B6AEA",
                          color: "white",
                        }
                      : {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#DDE4EA",
                          color: "black",
                        }
                  }
                >
                  1
                </p>
                <p
                  className="badge rounded-circle font-14"
                  style={
                    current > 1
                      ? {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#1B6AEA",
                          color: "white",
                        }
                      : {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#DDE4EA",
                          color: "black",
                        }
                  }
                >
                  2
                </p>
                <p
                  className="badge rounded-circle font-14"
                  style={
                    current > 2
                      ? {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#1B6AEA",
                          color: "white",
                        }
                      : {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#DDE4EA",
                          color: "black",
                        }
                  }
                >
                  3
                </p>
                <p
                  className="badge rounded-circle font-14"
                  style={
                    current > 3
                      ? {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#1B6AEA",
                          color: "white",
                        }
                      : {
                          width: "25px",
                          height: "25px",
                          backgroundColor: "#DDE4EA",
                          color: "black",
                        }
                  }
                >
                  4
                </p>
              </div>
              {/* step */}
              <p className="font-24 text-center" style={{ fontWeight: "700" }}>
                Step {current}
              </p>
            </>
          ) : (
            ""
          )}

          {current === 1 ? (
            <>
              <p
                className="text-center font-14"
                style={{ color: darkMode ? "#FFFFFF" : "#707A8A" }}
              >
                1.&nbsp; Download the "Google Authenticator" app for your phone,
                Android or Iphone
              </p>

              <div className="d-flex justify-content-evenly mt-5">
                <img src={GooglePlayImg} alt="" className="img-fluid" />
                <img src={AppStoreImg} alt="" className="img-fluid" />
              </div>
            </>
          ) : current === 2 ? (
            <>
              <p
                className="text-center font-14"
                style={{ color: darkMode ? "#FFFFFF" : "#707A8A" }}
              >
                2.&nbsp; Scan this QR Code in the Google Authenticator
                application that you have installed
              </p>
              {data2FA ? (
                <img
                  src={data2FA.barcode}
                  alt=""
                  className="img-fluid mx-auto d-block"
                  style={{ width: "150px", height: "150px" }}
                />
              ) : (
                // <img src={data2FA ? data2FA.barcode : ""} alt="" className="img-fluid mx-auto d-block" style={{ width: "150px", height: "150px", visibility: "hidden" }} />
                <div className="d-flex justify-content-center">
                  <p
                    className="d-flex justify-content-center align-items-center text-center border rounded"
                    style={{ width: "80%", height: "200px" }}
                  >
                    "Loading..."
                  </p>
                </div>
              )}
              <p
                className="font-12 text-center mt-3"
                style={{ color: darkMode ? "#FFFFFF" : "#4C5058" }}
              >
                If you cannot scan the QR Code, please enter the code <br />{" "}
                below manually in the{" "}
                <span className="fw-bold">
                  Google Authenticator <br /> Application
                </span>{" "}
                that you have created.
              </p>
              <div
                style={{ backgroundColor: darkMode ? "#282A32" : "#DDE4EA" }}
              >
                <p className="font-13 text-center mb-0 py-1">
                  {data2FA ? data2FA.key : ""}
                </p>
              </div>
              <p className="font-12 mt-2 text-center font-red">
                You have to write this backup code
              </p>
            </>
          ) : current === 3 ? (
            <>
              <p
                className="text-center font-14"
                style={{ color: darkMode ? "#FFFFFF" : "#707A8A" }}
              >
                3.&nbsp; Please save this backup code
              </p>
              <div className="d-flex align-items-center mt-5">
                <img src={DuplicateImg} alt="" className="img-fluid" />
                <p
                  className="font-14 mb-0 ms-3"
                  style={{ color: darkMode ? "#FFFFFF" : "#4C5058" }}
                >
                  Please save this code. This <br /> code will be useful for
                  recovering your Google Authenticator in case of loss.
                </p>
              </div>
              <div
                className="mt-3"
                style={{ backgroundColor: darkMode ? "#282A32" : "#DDE4EA" }}
              >
                <p className="font-13 text-center mb-0 py-1">
                  {data2FA ? data2FA.key : ""}
                </p>
              </div>
              <p className="font-12 mt-2 text-center font-red">
                You have to write this backup code
              </p>
            </>
          ) : current === 4 ? (
            <>
              <p
                className="text-center font-14"
                style={{ color: darkMode ? "#FFFFFF" : "#707A8A" }}
              >
                4.&nbsp; Activate your Google Authenticator now
              </p>

              {generateEmailCode ? (
                <>
                  <div
                    className="text-center mb-4 p-3 rounded"
                    style={{ backgroundColor: "#E8FFE8", color: "#006B31" }}
                  >
                    <p className="font-12 mb-0">
                      Enter code we sent through your
                    </p>
                    <p className="font-12 fw-bold mb-0">
                      email :{" "}
                      {JSON.parse(localStorage.getItem("data_user")).user.email}
                    </p>
                  </div>
                </>
              ) : (
                ""
              )}

              <form action="" className="mt-4">
                <div className="mb-3 pe-2">
                  <label className="font-12 fw-bold">
                    Email Verification Code
                  </label>
                  <div className="d-flex">
                    <div className="col-8">
                      <input
                        type="number"
                        className="form-control font-10 shadow-none"
                        placeholder="Email Code"
                        style={{ height: "36.86px" }}
                        onChange={(e) => setEmailCode(e.target.value)}
                      />
                    </div>
                    <div className="col-4 ms-2 font-10">
                      {getEmail.status === "get" ? (
                        <button
                          type="button"
                          className="btn w-100 bg-secondary font-14"
                          style={{ backgroundColor: "#2752E7", color: "white" }}
                        >
                          Resend ({getEmail.count})
                        </button>
                      ) : getEmail.status === "waiting" ? (
                        <button
                          type="button"
                          className="btn w-100 bg-secondary"
                          style={{ backgroundColor: "#2752E7", color: "white" }}
                        >
                          Waiting...
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn w-100"
                          style={{ backgroundColor: "#2752E7", color: "white" }}
                          onClick={() => getEmailCode()}
                        >
                          {generateEmailCode ? "Resend" : "Get Code"}
                        </button>
                      )}
                    </div>
                  </div>
                  <p
                    className="font-10 mt-1 mb-4"
                    style={{ color: darkMode ? "#FFFFFF" : "#4C5058" }}
                  >
                    Enter the 6-digit code received by email to*****@gmail.com
                  </p>
                  <label className="font-12 fw-bold">
                    Google Verification Code
                  </label>
                  <div className="d-flex">
                    <div className="col-8">
                      <input
                        type="number"
                        className="form-control font-10 shadow-none"
                        placeholder="Google Code 2FA"
                        style={{ height: "36.86px" }}
                        onChange={(e) => setCode_2fa(e.target.value)}
                        value={code_2fa}
                      />
                    </div>
                    <div className="col-4 ms-2 font-10">
                      <button
                        type="button"
                        className="btn w-100"
                        style={{ backgroundColor: "#2752E7", color: "white" }}
                        onClick={() => {
                          navigator.clipboard
                            .readText()
                            .then((text) => {
                              setCode_2fa(text)
                            })
                            .catch((err) => {
                              console.error(
                                "Failed to read clipboard contents: ",
                                err
                              )
                            })
                        }}
                      >
                        Paste
                      </button>
                    </div>
                  </div>
                  <p
                    className="font-10 mt-1"
                    style={{ color: darkMode ? "#FFFFFF" : "#4C5058" }}
                  >
                    Enter the 6-digit code from the Google Authenticator app
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center" style={{ marginTop: "30%" }}>
              <img
                src={Success2FAImg}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p className="font-24 fw-bold">
                Sukses, Anda telah mengaktifkan Google 2FA
              </p>
              <p className="font-14" style={{ color: "#707A8A" }}>
                Jangan berbagi kode dengan siapa pun, Demi <br /> keamanan
                ekstra, Jangan simpan perangkat <br /> elektronik yang dapat
                diretas.
              </p>
            </div>
          )}
          {/* button next */}
        </div>
        <div
          className="fixed-button my-4 col-12 px-3 width-breakpoint shadow-none"
          style={{ maxWidth: 512 }}
        >
          {current === 1 ? (
            <div className="d-grid col-12">
              <button
                type="button"
                className="btn text-white font-16"
                style={{
                  height: "48px",
                  fontWeight: "600",
                  backgroundColor: "#2752E7",
                }}
                onClick={() => genereate2FA()}
              >
                Lanjut
              </button>
            </div>
          ) : current < 4 ? (
            <div className="d-grid col-12">
              <button
                type="submit"
                className="btn text-white font-16"
                style={{
                  height: "48px",
                  fontWeight: "600",
                  backgroundColor: "#2752E7",
                }}
                onClick={() => setCurrent(current + 1)}
              >
                Lanjut
              </button>
            </div>
          ) : current === 4 ? (
            <div className="d-grid col-12">
              <button
                type="submit"
                className="btn text-white font-16"
                style={{
                  height: "48px",
                  fontWeight: "600",
                  backgroundColor: "#2752E7",
                }}
                onClick={() => submit2FA()}
              >
                Lanjut
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default Google2FAPage

import React, { useEffect, useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import Authenticator2FAImg from "../assets/authenticator2FAimg.svg"
import ResetIcon from "../assets/mdi_lock-reset.svg"
import axiosConfig from "../config/axios"
import { handleLogut } from "../helpers/logout"
import swal from "sweetalert"
import img_loading from "../assets/loading.gif"

function LoginPinPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const userToken = localStorage.getItem("token")
  const [getCode, setGetCode] = useState()
  const [pin, setPin] = useState("")
  const [resendCode, setResendCode] = useState(false)
  const [count, setCount] = useState(180)
  const [usernamePass, setUsernamePass] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetCode = () => {
    setIsLoading(true)
    axiosConfig
      .post("/get-code-login", {
        token: userToken,
        email: state,
      })
      .then(({ data }) => {
        console.log(data)
        if (data.status === "success") {
          setGetCode(true)
          setResendCode(true)
          setIsLoading(false)
        }
        if (data.status === "error") {
          setIsLoading(false)
          swal({
            // title: "Good job!",
            text: data.messages,
            icon: "error",
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!localStorage.getItem("login-pin")) {
      handleLogut(navigate)
    } else {
      setUsernamePass({
        email: localStorage.getItem("login-pin").split("-")[0],
        password: localStorage.getItem("login-pin").split("-")[1],
      })
    }
  }, [])

  useEffect(() => {
    if (resendCode) {
      if (count !== 0) {
        setTimeout(() => {
          setCount(count - 1)
        }, 1000)
      } else if (count === 0) {
        setResendCode(false)
        setCount(180)
      }
    }
  }, [count, resendCode])

  const handleSubmitCode = (event) => {
    event.preventDefault()
    axiosConfig
      .post("/login_auth", {
        token: userToken,
        email: usernamePass.email,
        password: usernamePass.email.password,
        verify_code: pin,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          navigate("/")
          localStorage.removeItem("login-pin")
          localStorage.setItem("token", data.token)
        } else {
          swal({
            // title: "Good job!",
            text: data.messages[0],
            icon: "error",
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="container text-roboto mb-3">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => handleLogut(navigate)}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "80px" }}>
            Security Verification
          </p>
        </div>

        <form action="" className="mt-5" onSubmit={(e) => handleSubmitCode(e)}>
          <div>
            <label className="font-14" style={{ color: "#626262" }}>
              Enter OTP from E-Mail
            </label>
            <div
              className="d-flex align-items-center border rounded"
              style={{ height: "42px" }}
            >
              <div className="col-10">
                <input
                  type="number"
                  className="form-control shadow-none border-0 authenticator2FAForm"
                  placeholder="Input OTP code from email  "
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
              <div className="col-2">
                {/* <p className="mb-0 ms-2 font-12 font-input-column">Paste</p> */}
                {!resendCode ? (
                  <p
                    className="mb-0 font-12 font-primary fw-bold"
                    onClick={() => handleGetCode()}
                  >
                    Get Code
                  </p>
                ) : (
                  <p className="mb-0 font-12 font-primary">success</p>
                )}
              </div>
            </div>
            {getCode ? (
              <p className="font-12 mt-2 text-success fw-bold">
                check your email
              </p>
            ) : (
              ""
            )}
          </div>

          {/* button send */}
          <div className="d-grid col-12 mb-4">
            {pin.length === 6 ? (
              <button
                type="submit"
                className="btn text-white mt-3"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
              >
                Send
              </button>
            ) : (
              <button
                type="submit"
                className="btn text-white mt-3 mb-4"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                disabled
              >
                Send
              </button>
            )}
          </div>
          {resendCode ? (
            count !== 0 ? (
              <p className="font-12 fw-bold font-primary text-center mt-5">
                Doesn’t get code?{" "}
                <span className="text-secondary">resend in {count}s</span>
              </p>
            ) : (
              <p className="font-12 fw-bold font-primary text-center mt-5">
                Doesn’t get code? <span className="text-primary">resend</span>
              </p>
            )
          ) : (
            ""
          )}

          <p
            className="font-12 fw-bold font-primary text-center mt-3"
            onClick={() => handleLogut(navigate)}
          >
            Logout
          </p>
        </form>
        {isLoading ? (
          <>
            <div className="d-flex justify-content-center w-100">
              <img
                src={img_loading}
                className="img-fluid w-50 opacity-75"
                alt=""
              />
            </div>
          </>
        ) : (
          ""
        )}
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

export default LoginPinPage

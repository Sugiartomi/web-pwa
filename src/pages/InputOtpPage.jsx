import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"
import { ChevronLeft, X } from "react-bootstrap-icons"
import { FiDelete } from "react-icons/fi"
import OTPInput from "react-otp-input"
import { useLocation, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function InputOtpPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const { state } = useLocation()
  const userToken = localStorage.getItem("token")
  const dataLocalStg = JSON.parse(localStorage.getItem("data_user"))
  const [getCode, setGetCode] = useState(false)
  const [pinOTP, setPinOTP] = useState()
  const [pin, setPin] = useState("")
  const [count, setCount] = useState(180)
  const [clickGetcode, setClickGetCode] = useState(false)

  const handleGetCode = () => {
    setGetCode(true)
    setClickGetCode(true)
  }

  useEffect(() => {
    if (clickGetcode) {
      if (count !== 0) {
        setTimeout(() => {
          setCount(count - 1)
        }, 1000)
      } else if (count === 0) {
        setClickGetCode(false)
        setCount(180)
      }
    }
  }, [clickGetcode, count])

  useEffect(() => {
    if (pin.length === 6) {
      if (!dataLocalStg.user.status_user_pin) {
        localStorage.removeItem("create-pin")

        let dataUser = JSON.parse(localStorage.getItem("data_user"))
        dataUser.user.status_user_pin = true

        localStorage.setItem("data_user", JSON.stringify(dataUser))
        swal({
          icon: "success",
          text: "success",
          isConfirmed: navigate("/security"),
        })
      } else {
        swal({
          icon: "success",
          text: "success",
          isConfirmed: navigate("/security"),
        })
      }
    }
  }, [pin])

  return (
    <div>
      <div
        className={
          darkMode
            ? "container py-4 text-roboto  text-white"
            : "container py-4 text-roboto"
        }
        style={{ height: "100vh" }}
      >
        <div>
          <p className="font-20 " onClick={() => navigate("/confirm-pin")}>
            <ChevronLeft />
          </p>
        </div>
        {getCode ? (
          <>
            <div
              className="p-2 rounded-2 fw-bold d-flex"
              style={{ backgroundColor: "#E8FFE8", color: "#006B31" }}
            >
              <p className="font-12 text-center mb-0">
                Success! Please check your code in your inbox / spam email
              </p>
              <p className="mb-0 font-20">
                <X />
              </p>
            </div>
          </>
        ) : (
          ""
        )}
        <p
          className="font-18 text-center mt-3 text-center "
          style={{ fontWeight: "600" }}
        >
          Enter OTP Code
        </p>
        {!getCode ? (
          <>
            <div className="text-center mb-4">
              <p className="font-12 mb-0">
                Enter OTP code we sent through your
              </p>
              <p className="font-12 fw-bold mb-0">
                email :{" "}
                {JSON.parse(localStorage.getItem("data_user")).user.email}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              {clickGetcode ? (
                <p
                  className="font-16 badge text-center p-2"
                  style={{ backgroundColor: "#032971" }}
                >
                  {count} Sec
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="font-12 text-center ">
              Please Check Get Code First and Check <br /> The Code on your
              email box
            </p>
          </>
        )}

        {/* input pin */}
        <div className="px-3">
          <OTPInput
            value={pin}
            onChange={setPin}
            inputType="number"
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            separator={<span></span>}
            inputStyle={
              darkMode
                ? "inputStyle mb-4 mx-auto d-block bg-dark-mode2 text-white"
                : "inputStyle mb-4 mx-auto d-block"
            }
            shouldAutoFocus="false"
          />

          {!getCode ? (
            <div className="d-grid col-12 mt-3">
              <button
                type="button"
                className="btn text-white"
                onClick={() => handleGetCode()}
                style={{
                  height: "56px",
                  backgroundColor: "#1B6AEA",
                  borderRadius: "15px",
                }}
              >
                Get Code
              </button>
            </div>
          ) : clickGetcode ? (
            <div className="d-grid col-12 mt-3">
              <button
                type="button"
                className="btn text-white bg-secondary"
                style={{
                  height: "56px",
                  //   backgroundColor: "#1B6AEA",
                  borderRadius: "15px",
                }}
              >
                Resend Code
              </button>
            </div>
          ) : (
            <div className="d-grid col-12 mt-3">
              <button
                type="button"
                className="btn text-white"
                onClick={() => {
                  handleGetCode()
                }}
                style={{
                  height: "56px",
                  backgroundColor: "#1B6AEA",
                  borderRadius: "15px",
                }}
              >
                Resend Code
              </button>
            </div>
          )}

          {pin ? (
            <div>
              <p className="font-16 fw-bold mt-4">Caution !!! </p>
              <ol className="font-13">
                <li>PIN must be a number</li>
                <li>
                  Avoid using predictable combination of numbers, such as date
                  of birth or cell phone number
                </li>
                <li>PIN must be 6 Digit</li>
              </ol>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default InputOtpPage

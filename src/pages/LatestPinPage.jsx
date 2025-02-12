import React from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import DeleteIconButton from "../assets/delete-icon-button.svg"
import { FiDelete } from "react-icons/fi"
import { useState } from "react"
import InputOtp from "../components/global/InputOtp"
import OTPInput from "react-otp-input"
import { useEffect } from "react"
import axiosConfig from "../config/axios"
import swal from "sweetalert"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function LatestPinPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const userToken = localStorage.getItem("token")
  const [pin, setPin] = useState("")

  const inputCreatePin = (value) => {
    setPin(value)
    if (value.length === 6) {
      navigate("/confirm-pin", { state: value })
    }
  }

  useEffect(() => {
    if (pin.length === 6) {
      navigate("/create-pin")
    }
  }, [pin])

  return (
    <div>
      <div
        className={
          darkMode
            ? "container py-4 text-roboto text-white"
            : "container py-4 text-roboto"
        }
        style={{ height: "100vh" }}
      >
        <div className="pt-2">
          <p className="font-20 " onClick={() => navigate("/security")}>
            <ChevronLeft />
          </p>
        </div>
        <p
          className="font-18 text-center mt-3 text-center "
          style={{ fontWeight: "600" }}
        >
          Enter Latest PIN
        </p>
        <p className="font-12 text-center fw-bold">
          Enter 6-digit PIN digitalexchange.id
        </p>

        <div className="px-3">
          <OTPInput
            value={pin}
            onChange={setPin}
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

        {/* circle PIN*/}
        <div className="justify-content-center d-flex mt-4">
          <div
            className="pin-circle"
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
          <div
            className="pin-circle ms-3"
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
          <div
            className="pin-circle ms-3"
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
          <div
            className="pin-circle ms-3"
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
          <div
            className="pin-circle ms-3"
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
          <div
            className="pin-circle ms-3"
            style={{ backgroundColor: "#FFFFFF" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default LatestPinPage

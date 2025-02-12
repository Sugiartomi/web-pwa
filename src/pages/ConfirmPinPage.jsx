import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { FiDelete } from "react-icons/fi"
import OTPInput from "react-otp-input"
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function ConfirmPinPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const { state } = useLocation()
  const navigate = useNavigate()
  const [pin, setPin] = useState("")
  const [matchPin, setMatchPin] = useState("none")

  useEffect(() => {
    if (pin.length === 6 && pin === localStorage.getItem("create-pin")) {
      setMatchPin(true)
      navigate("/input-otp")
    } else if (pin.length === 6) {
      setMatchPin(false)
    }
  }, [pin])
  return (
    <div>
      <div
        className={
          darkMode
            ? "container py-4 text-roboto text-white  "
            : "container py-4 text-roboto"
        }
        style={{ height: "100vh" }}
      >
        <div className="pt-2">
          <p className="font-20" onClick={() => navigate("/create-pin")}>
            <ChevronLeft />
          </p>
        </div>
        <p
          className="font-18 text-center mt-3 text-center"
          style={{ fontWeight: "600" }}
        >
          Confirm PIN
        </p>
        <div className="px-3">
          <OTPInput
            value={pin}
            onChange={setPin}
            inputType="number"
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            separator={<span></span>}
            inputStyle={
              matchPin
                ? darkMode
                  ? "inputStyle mb-2 mx-auto d-block bg-dark-mode2 text-white"
                  : "inputStyle mb-2 mx-auto d-block"
                : darkMode
                ? "inputStyle mb-2 mx-auto d-block outline-confirm-pin  bg-dark-mode2 text-white"
                : "inputStyle mb-2 mx-auto d-block outline-confirm-pin"
            }
            shouldAutoFocus="false"
          />
          {!matchPin ? (
            <p className="font-12 font-red">
              oops, your PIN doesnt't match with current
            </p>
          ) : (
            ""
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

export default ConfirmPinPage

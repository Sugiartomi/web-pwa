import React, { useEffect } from "react"
import { useState } from "react"
import { ChevronLeft, X } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { phone_verification, security_status } from "../store/actions/user"
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input"
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function PhoneVerificationPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const userToken = localStorage.getItem("token")
  const [getCodeStatus, setGetCodeStatus] = useState(false)
  const [value, setValue] = useState()
  const [codeVerification, setCodeVerification] = useState()
  const [dialcode, setDialcode] = useState()
  const [newPhone, setNewPhone] = useState()
  const [errorGetCode, setErrorGetCode] = useState(false)
  const [count, setCount] = useState(180)
  const [resend, setResend] = useState(false)

  useEffect(() => {
    if (getCodeStatus) {
      if (count !== 0) {
        setTimeout(() => {
          setCount(count - 1)
        }, 1000)
      } else {
        setResend(true)
        setGetCodeStatus(false)
        setCount(180)
      }
    }
  }, [count, getCodeStatus])

  // only number
  useEffect(() => {
    let temp = ``
    if (value) {
      for (let i = 0; i < value.length; i++) {
        const e = value[i]
        if (e !== "+") {
          temp += e
        }
      }
      setDialcode(temp)
    } else {
      setDialcode("62")
    }
  }, [value])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGetCode = (event) => {
    event.preventDefault()
    navigate("/security")
  }

  const getVerificationCode = () => {
    setResend(false)
    setGetCodeStatus(true)
  }

  const submitCodeVerification = (event) => {
    event.preventDefault()

    navigate("/security")
  }
  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ height: "100vh" }}
      >
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/security")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "50px" }}>
            Phone Number Verification
          </p>
        </div>
        <p className="font-12">
          To protect the security of your account, please verify your phone
          number. We will not use your phone number for any other purpose.
        </p>

        {getCodeStatus ? (
          <div
            className="rounded font-green p-3 align-items-center"
            style={{ backgroundColor: "#E8FFE8" }}
          >
            <div className="d-flex">
              <p className="font-16 mb-0">
                Success! Please check the code on your phone
              </p>
              <p className="font-20 mb-0">
                <X />
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {errorGetCode ? (
          <div
            className="rounded text-white p-3 align-items-center"
            style={{ backgroundColor: "#red" }}
          >
            <div className="d-flex">
              <p className="font-16 mb-0">
                Incorrect phone number or has been registered
              </p>
              <p className="font-20 mb-0">
                <X />
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* form input phone number */}
        <form action="" className="mt-3" onSubmit={submitCodeVerification}>
          <div className="mb-3">
            <label className="font-14">Phone Number</label>
            <div className="phone-input">
              <div className="d-flex">
                <PhoneInput
                  className={darkMode ? "rounded bg-darkmode" : "rounded"}
                  placeholder="Enter phone number"
                  international
                  countryCallingCodeEditable={false}
                  readOnly={true}
                  defaultCountry="ID"
                  style={{ width: "25%" }}
                  value={value}
                  onChange={setValue}
                />
                <input
                  type="number"
                  className={
                    darkMode
                      ? "form-control border-0 voucher-form bg-dark-mode shadow-none text-white"
                      : "form-control border-0 voucher-form shadow-none"
                  }
                  placeholder="Enter Mobile Number"
                  style={{ width: "75%" }}
                  onChange={(e) => {
                    e.preventDefault()
                    setNewPhone(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="font-14">Phone Code Verification</label>
            <div
              className="d-flex align-items-center phone-input"
              style={{ height: "42px" }}
            >
              <div className="col-10">
                <input
                  type="number"
                  className={
                    darkMode
                      ? "form-control voucher-form shadow-none border-0 bg-dark-mode text-white"
                      : "form-control voucher-form shadow-none border-0"
                  }
                  placeholder="Enter Phone Code"
                  onChange={(e) => setCodeVerification(e.target.value)}
                />
              </div>
              <div className="col-2">
                {newPhone && newPhone.length > 8 ? (
                  resend ? (
                    <p
                      className="font-primary mb-0 font-12"
                      onClick={() => getVerificationCode()}
                    >
                      Resend
                    </p>
                  ) : getCodeStatus ? (
                    <p className="mb-0 font-10" style={{ color: "#dde4ea" }}>
                      Get Code ({count})
                    </p>
                  ) : (
                    <p
                      className="font-primary mb-0 font-12"
                      onClick={() => getVerificationCode()}
                    >
                      Get Code
                    </p>
                  )
                ) : (
                  <p className="mb-0 font-12" style={{ color: "#dde4ea" }}>
                    Get Code
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* button send */}
          <div className="d-flex">
            {getCodeStatus && codeVerification ? (
              <button
                type="submit"
                className="btn text-white ms-auto px-4"
                style={{ backgroundColor: "#1B6AEA" }}
              >
                Send
              </button>
            ) : (
              <button
                type="submit"
                className="btn text-white ms-auto px-4"
                style={{ backgroundColor: "#1B6AEA" }}
                disabled
              >
                Send
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default PhoneVerificationPage

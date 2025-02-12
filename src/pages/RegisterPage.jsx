import axios from "axios"
import React, { useEffect, useState } from "react"
import { RGCaptcha, reset } from "react-geetest-captcha"
import { CheckSquareFill, X } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import SuccessRegisterIcon from "../assets/success-register.svg"
import CryptoJS from "crypto-js"
import ReCAPTCHA from "react-google-recaptcha"
import swal from "sweetalert"
import Geetest from "react-geetest"
import TestGeetest from "../components/geetest/Geetest"
import illustrasionEmail from "../assets/illustration-email.svg"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { apiDev, registerDev } from "../config/api"

function RegisterPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const [statusRegister, setStatusRegister] = useState(false)
  // state untuk input data register
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pass_conf, setPass_conf] = useState("")
  const [g_recaptcha_response, setG_recaptcha_response] = useState("")
  const [terms_con, setTerms_con] = useState(false)
  const [risk_disc, setRisk_disc] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [reference, setReference] = useState("")
  const [input, setInput] = useState()

  // state untuk cek password
  const [charackter8, setCharackter8] = useState(false)
  const [number, setNumber] = useState(false)
  const [upparcase, setUpparcase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [specialCharacter, setSpecialCharacter] = useState(false)
  const [verified, setVerified] = useState(false)
  const [userNameFormat, setUsernameFormat] = useState(false)
  const [emailFormat, setEmailFormat] = useState(false)
  const [passwordFormat, setPasswordFormat] = useState(false)
  const [confirmPassStatus, setConfirmPassStatus] = useState(false)
  const [visibilityPassword, setVisibilityPassword] = useState({
    icon: "fa fa-eye",
    type: "password",
  })
  const [visibilityPassword_conf, setVisibilityPassword_conf] = useState({
    icon: "fa fa-eye",
    type: "password",
  })
  const [openGeetest, setOpenGeetest] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(false)

  // state geetest
  const [gtData, setGtData] = useState()
  const [gtChallenge, setGtChallenge] = useState()
  const [geetest_challenge, setGeetest_challenge] = useState()
  const [geetest_validate, setGeetest_validate] = useState()
  const [geetest_seccode, setGeetest_seccode] = useState()

  console.log(geetest_challenge)

  // final data
  const rawData = {
    username,
    email,
    password,
    pass_conf,
    terms_con,
    risk_disc,
    newsletter,
    reference: +reference,
    geetest_challenge,
    geetest_validate,
    geetest_seccode,
  }

  let captcha
  // function checkpassword
  const checkInputPassword = (password) => {
    setPassword(password)
    // pengecekan karakter yg mengandung Uppercase
    if (/[A-Z]/.test(password)) {
      setUpparcase(true)
    } else {
      setUpparcase(false)
    }
    // pengecekan karakter yg mengandung Number
    if (/[0-9]/.test(password)) {
      setNumber(true)
    } else {
      setNumber(false)
    }

    // pengecekan special caracter
    if (/[@$!%*#?&]/.test(password)) {
      setSpecialCharacter(true)
    } else {
      setSpecialCharacter(false)
    }

    // pengecekan lowercase
    if (/[a-z]/.test(password)) {
      setLowercase(true)
    } else {
      setLowercase(false)
    }

    // pengecekan panjang karakter minimal 8
    if (password.length < 8) {
      setCharackter8(false)
    } else {
      setCharackter8(true)
    }
  }

  // function pengecekan confirm password === password
  const checkConfirmPassword = (confirmPassword) => {
    setPass_conf(confirmPassword)
    if (password === confirmPassword) {
      setConfirmPassStatus(true)
    } else {
      setConfirmPassStatus(false)
    }
  }

  // function check username
  const checkUsername = (username) => {
    setUsername(username)
    if (/^(?=.*[a-z])(?!.*[A-Z!$%^&*,./]).{5,20}$/.test(username)) {
      setUsernameFormat(true)
    } else {
      setUsernameFormat(false)
    }
  }

  // function check email fromat
  const checkEmailFormat = (email) => {
    setEmail(email)
    if (
      /^[a-z0-9.!#$%&+\/=?^_{|}~-]+@[a-z0-9-]+(?:.[a-z0-9-]+)+\.[a-z0-9-]+(?:.[a-z0-9-]+)*$/.test(
        email
      )
    ) {
      setEmailFormat(true)
    } else {
      setEmailFormat(false)
    }
  }
  // function pengecekan sebelum submit
  useEffect(() => {
    if (
      username &&
      email &&
      password &&
      pass_conf &&
      terms_con &&
      risk_disc &&
      reference &&
      charackter8 &&
      number &&
      upparcase &&
      lowercase &&
      specialCharacter &&
      confirmPassStatus &&
      userNameFormat &&
      emailFormat
    ) {
      setOpenGeetest(true)
    } else {
      setOpenGeetest(false)
    }
  }, [rawData])

  // SUBMIT STATUS
  useEffect(() => {
    if (geetest_validate) {
      setSubmitStatus(true)
    } else {
      setSubmitStatus(false)
    }
  }, [geetest_validate])

  useEffect(() => {
    if (charackter8 && number && upparcase && lowercase && specialCharacter) {
      setPasswordFormat(true)
    } else {
      setPasswordFormat(false)
    }
  }, [charackter8, number, upparcase, lowercase, specialCharacter])

  // function get recaptcha value
  const gCapcha = (response) => {
    setG_recaptcha_response(response)
    setVerified(true)
  }

  const onSuccess = (data) => {
    setGeetest_challenge(data.geetest_challenge)
    setGeetest_validate(data.geetest_validate)
    setGeetest_seccode(data.geetest_seccode)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const salt = "loginService"
    let signature = CryptoJS.HmacSHA256(JSON.stringify(rawData), salt).toString(
      CryptoJS.enc.Hex
    )

    setStatusRegister(true)
  }

  return (
    <>
      {!statusRegister ? (
        <div
          className={
            darkMode
              ? "container text-roboto mb-3 text-white"
              : "container text-roboto mb-3"
          }
          style={{ height: "100vh" }}
        >
          <div className="d-flex">
            <p className="font-32" onClick={() => navigate("/login")}>
              <X />
            </p>
            <p
              className="font-24 fw-bold mt-5 text-center"
              style={{ width: "85%" }}
            >
              Create Account
            </p>
          </div>

          {/* form register */}
          <form action="" className="mt-3" onSubmit={handleSubmit}>
            {/* username */}
            <div className="mb-3">
              <label
                className={
                  darkMode
                    ? "font-14 text-white fw-bold"
                    : "font-14 font-dark fw-bold"
                }
              >
                Username
              </label>
              <input
                type="text"
                className={
                  username
                    ? userNameFormat
                      ? "form-control login-form shadow-none"
                      : "form-control login-form shadow-none border-danger"
                    : "form-control login-form shadow-none "
                }
                placeholder="Enter Username"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                        border: 0,
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => checkUsername(e.target.value)}
                required
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label
                className={
                  darkMode
                    ? "font-14 text-white fw-bold"
                    : "font-14 font-dark fw-bold"
                }
              >
                Email
              </label>
              <input
                type="email"
                className={
                  email
                    ? emailFormat
                      ? "form-control login-form shadow-none"
                      : "form-control login-form shadow-none border-danger"
                    : "form-control login-form shadow-none "
                }
                placeholder="Enter Email"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                        border: 0,
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => checkEmailFormat(e.target.value)}
                required
              />
            </div>
            {/* password */}
            <label className="font-14 fw-bold">Password</label>
            <div className=" input-group mb-3">
              <input
                type={visibilityPassword.type}
                value={password}
                className={
                  password
                    ? passwordFormat
                      ? "form-control login-form shadow-none"
                      : "form-control login-form shadow-none border-danger"
                    : "form-control login-form shadow-none "
                }
                placeholder="Enter Password"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                        border: 0,
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => checkInputPassword(e.target.value)}
              />
              <span
                className={
                  darkMode
                    ? "input-group-text border-0  bg-dark-mode2 text-white"
                    : "input-group-text border-0"
                }
                onClick={() =>
                  visibilityPassword.type === "password"
                    ? setVisibilityPassword({
                        type: "text",
                        icon: "fa fa-eye-slash",
                      })
                    : setVisibilityPassword({
                        type: "password",
                        icon: "fa fa-eye",
                      })
                }
              >
                <i
                  className={visibilityPassword.icon}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>

            {/* password validation */}
            <div className="mb-3">
              <div className="d-flex">
                <div
                  className={
                    darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"
                  }
                  style={
                    charackter8
                      ? { color: "#20cb6f", backgroundColor: "#EDFFF2" }
                      : { color: "#858585", backgroundColor: "#F2F2F2" }
                  }
                >
                  <p className="mb-0 font-8 badge-sign-up">
                    <span className="me-1">
                      <CheckSquareFill />
                    </span>{" "}
                    8+ karakter
                  </p>
                </div>
                <div
                  className={
                    darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"
                  }
                  style={
                    number
                      ? { color: "#20cb6f", backgroundColor: "#EDFFF2" }
                      : { color: "#858585", backgroundColor: "#F2F2F2" }
                  }
                >
                  <p className="mb-0 font-8 badge-sign-up">
                    <span className="me-1">
                      <CheckSquareFill />
                    </span>{" "}
                    1 angka
                  </p>
                </div>
                <div
                  className={
                    darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"
                  }
                  style={
                    upparcase
                      ? { color: "#20cb6f", backgroundColor: "#EDFFF2" }
                      : { color: "#858585", backgroundColor: "#F2F2F2" }
                  }
                >
                  <p className="mb-0 font-8 badge-sign-up">
                    <span className="me-1">
                      <CheckSquareFill />
                    </span>{" "}
                    1 huruf kapital
                  </p>
                </div>
                <div
                  className={
                    darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"
                  }
                  style={
                    lowercase
                      ? { color: "#20cb6f", backgroundColor: "#EDFFF2" }
                      : { color: "#858585", backgroundColor: "#F2F2F2" }
                  }
                >
                  <p className="mb-0 font-8 badge-sign-up">
                    <span className="me-1">
                      <CheckSquareFill />
                    </span>{" "}
                    1 huruf kecil
                  </p>
                </div>
              </div>
              <div
                className={
                  darkMode
                    ? "badge p-2 me-2 mt-2 bg-dark-mode2"
                    : "badge p-2 me-2 mt-2"
                }
                style={
                  specialCharacter
                    ? { color: "#20cb6f", backgroundColor: "#EDFFF2" }
                    : { color: "#858585", backgroundColor: "#F2F2F2" }
                }
              >
                <p className="mb-0 font-8 badge-sign-up">
                  <span className="me-1">
                    <CheckSquareFill />
                  </span>{" "}
                  1 karakter spesial
                </p>
              </div>
            </div>

            {/* confirm password */}
            <label className="font-14 fw-bold">Confrim Password</label>
            <div className="mb-1 input-group">
              <input
                type={visibilityPassword_conf.type}
                value={pass_conf}
                className={
                  pass_conf
                    ? confirmPassStatus
                      ? "form-control login-form shadow-none"
                      : "form-control login-form shadow-none border-danger"
                    : "form-control login-form shadow-none "
                }
                placeholder="Enter Password"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                        border: 0,
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => checkConfirmPassword(e.target.value)}
              />
              <span
                className={
                  darkMode
                    ? "input-group-text border-0 bg-dark-mode2 text-white"
                    : "input-group-text border-0"
                }
                onClick={() =>
                  visibilityPassword_conf.type === "password"
                    ? setVisibilityPassword_conf({
                        type: "text",
                        icon: "fa fa-eye-slash",
                      })
                    : setVisibilityPassword_conf({
                        type: "password",
                        icon: "fa fa-eye",
                      })
                }
              >
                <i
                  className={visibilityPassword_conf.icon}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
            {password ? (
              pass_conf === password ? (
                <label className="font-12 fw-bold text-success mb-3">
                  Password Sesuai
                </label>
              ) : (
                <label className="font-12 text-danger mb-3">
                  Password Tidak Sama
                </label>
              )
            ) : (
              ""
            )}

            {/* how do you know us */}
            <label className="font-14 fw-bold mt-2">How do you know us</label>
            <div className="mb-3">
              <select
                className={
                  confirmPassStatus
                    ? reference
                      ? "form-select font-12 login-form shadow-none"
                      : "form-select font-12 login-form shadow-none border-danger"
                    : "form-select font-12 login-form shadow-none "
                }
                aria-label="Default select example"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                        border: 0,
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => setReference(e.target.value)}
              >
                <option value="">click to select reference</option>
                <option value="1">Community Meetups/ Partner</option>
                <option value="2">Facebook</option>
                <option value="3">Twitter</option>
                <option value="4">Instagram</option>
                <option value="5">Youtube</option>
                <option value="6">Telegram</option>
                <option value="7">Event</option>
                <option value="8">Others</option>
              </select>
            </div>
            {/* agreement */}
            <div className="mt-3">
              <div className="form-check font-14">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  onChange={() => setTerms_con(!terms_con)}
                />
                <label className="form-check-label">
                  I have read and agree to{" "}
                  <span className="fw-bold">the terms and conditions</span>
                </label>
              </div>
              <div className="form-check font-14">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  onChange={() => setRisk_disc(!risk_disc)}
                />
                <label className="form-check-label">
                  I have read and agree to{" "}
                  <span className="fw-bold">the risk disclosure.</span>
                </label>
              </div>
              <div className="form-check font-14">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  onChange={() => setNewsletter(!newsletter)}
                />
                <label className="form-check-label">
                  Checklist to subscribe to our newsletter
                </label>
              </div>
            </div>

            {/* geetest */}
            {openGeetest ? (
              <>
                {/* <div className="container">
                  <div className="col-4" style={{ width: "100px" }}>
                    <Geetest
                      gt={gtData}
                      challenge={gtChallenge}
                      onSuccess={onSuccess}
                      width="100%"
                      lang="en"
                    />
                  </div>
                </div> */}
                <div className="my-4" style={{ minWidth: "0px" }}>
                  <TestGeetest
                    setGeetest_challenge={setGeetest_challenge}
                    setGeetest_validate={setGeetest_validate}
                    setGeetest_seccode={setGeetest_seccode}
                    setInput={setInput}
                    input={input}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {/* button submit */}
            {/* <div className="d-grid col-12 mt-3">
              {submitStatus ? (
                <>
                  {!verified ? (
                    <button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "47px" }} data-bs-toggle="modal" data-bs-target="#modal-recaptcha">
                      Create Account
                    </button>
                  ) : (
                    <button type="submit" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "47px" }}>
                      Create Account
                    </button>
                  )}
                </>
              ) : (
                <button type="submit" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "47px" }} disabled>
                  Create Account
                </button>
              )}
            </div> */}
            {submitStatus ? (
              <>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn w-100 text-white px-5 mb-4 mt-3"
                    style={{ backgroundColor: "#1B6AEA", height: "47px" }}
                  >
                    Create Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn w-100 text-white px-5 mb-4 mt-3 border-0"
                    style={{ backgroundColor: "#1B6AEA", height: "47px" }}
                    disabled
                  >
                    Create Account
                  </button>
                </div>
              </>
            )}

            {/* <p className="font-14 text-center mt-3">
              Already Registered ?{" "}
              <span className="font-primary" onClick={() => navigate("/login")}>
                Login
              </span>
            </p> */}
          </form>
        </div>
      ) : (
        <div className="container text-roboto center-page">
          <p className="fw-bold mb-4 text-center " style={{ fontSize: "20px" }}>
            Registration Successful
          </p>
          <img
            src={illustrasionEmail}
            alt=""
            className="img-fluid mx-auto d-block mb-4"
          />
          <div className="text-center d-flex justify-content-center">
            <p className="font-12 mb-0 w-75">
              Please click the send button to send an activation link to your
              email address tora.suman@gmail.com, please look at spam folder if
              you not see any email from us on your inbox, and click the
              activation link to activate your digitalexchange account
            </p>
          </div>
          <div className="text-center d-flex justify-content-center">
            <div
              className="btn btn-primary mt-4 px-5"
              onClick={() => {
                setStatusRegister(false)
                navigate("/login")
              }}
            >
              login
            </div>
          </div>
        </div>
      )}

      {/* modal recaptcha */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-recaptcha"
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
              <ReCAPTCHA
                sitekey="6Ld62oIkAAAAAP1isnsc45jYWl7zwIqd1mocQfop"
                baseurl="google.com"
                onChange={gCapcha}
                ref={(el) => {
                  captcha = el
                }}
              />
            </div>
            <button className="btn btn-danger" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage

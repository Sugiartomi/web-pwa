import React, { useEffect } from "react"
import { useState } from "react"
import { CheckSquareFill, ChevronLeft } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import axiosConfig from "../config/axios"
import swal from "sweetalert"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function ForgotPasswordPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [emailCode, setEmailCode] = useState()
  const [password, setPassword] = useState()
  const [password_conf, setPassword_conf] = useState()
  const [typeInput, setTypeInput] = useState({
    icon: "fa fa-eye",
    type: "password",
  })
  const [typeInput2, setTypeInput2] = useState({
    icon: "fa fa-eye",
    type: "password",
  })

  const [emailFormat, setEmailFormat] = useState(false)
  const [timer, setTimer] = useState(180)
  const [getCode, setGetCode] = useState(false)
  const [clickGetCode, setClickGetCode] = useState(false)
  const [successGetCode, setSuccessGetCode] = useState(false)
  const [samePass, setSamePass] = useState(false)
  const [statusPassReq, setStatusPassReq] = useState(false)
  const [buttonSumbit, setButtonSubmit] = useState(false)

  // PASS REQ
  const [charackter8, setCharackter8] = useState(false)
  const [number, setNumber] = useState(false)
  const [upparcase, setUpparcase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [specialCharacter, setSpecialCharacter] = useState(false)

  useEffect(() => {
    if (
      email &&
      emailCode &&
      password &&
      password_conf &&
      statusPassReq &&
      samePass &&
      clickGetCode
    ) {
      setButtonSubmit(true)
    } else {
      setButtonSubmit(false)
    }
  }, [
    email,
    emailCode,
    password,
    password_conf,
    statusPassReq,
    samePass,
    clickGetCode,
  ])

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

  useEffect(() => {
    if (charackter8 && number && upparcase && lowercase && specialCharacter) {
      setStatusPassReq(true)
    } else {
      setStatusPassReq(false)
    }
  }, [charackter8, number, upparcase, lowercase, specialCharacter])

  useEffect(() => {
    if (password === password_conf) {
      setSamePass(true)
    } else {
      setSamePass(false)
    }
  }, [password, password_conf])

  useEffect(() => {
    if (getCode) {
      if (timer === 0) {
        setGetCode(false)
        setTimer(60)
      } else {
        setTimeout(() => {
          setTimer(timer - 1)
        }, 1000)
      }
    }
  }, [timer, getCode])

  const getEmailCode = () => {
    setGetCode(true)
    setClickGetCode(true)
   
          setSuccessGetCode(true)
        
  }

  const resetPassword = () => {
    swal("loading...", { button: false })
   
          swal({
            title: "Success!",
            // text: data.messages,
            icon: "success",
            button: {
              text: "login",
              className: "bg-primary shadow-none",
            },
          }).then(() => navigate("/login"))
        
  
  }

  return (
    <>
      <div style={{ height: "100vh" }}>
        <div
          className={
            darkMode
              ? "container text-roboto text-white"
              : "container text-roboto"
          }
        >
          <div className="d-flex pt-2 align-items-center">
            <p
              className="font-20"
              onClick={() => {
                localStorage.removeItem("link-page")
                navigate(`/login`)
              }}
            >
              <ChevronLeft />
            </p>

            <p className="font-20 fw-bold" style={{ marginLeft: "110px" }}>
              Forgot Password
            </p>
          </div>
        </div>
        <div className="container-fluid p-3">
          {successGetCode ? (
            <p
              className={
                darkMode
                  ? "font-14 text-center py-3 rounded px-5 text-white"
                  : "font-14 text-center py-3 rounded px-5"
              }
              style={{ color: "#20cb6f", backgroundColor: "#EDFFF2" }}
            >
              Kode sudah dikirim via email, cek email mu sekarang
            </p>
          ) : (
            ""
          )}

          <p
            className={
              darkMode ? "font-24 fw-bold text-white" : "font-24 fw-bold"
            }
          >
            Forgot Password
          </p>
          {/* <form action=""> */}
          {/* EMAIL */}
          <div className="mb-3">
            <label
              className={
                darkMode
                  ? "font-14 text-white fw-bold"
                  : "font-14 font-dark fw-bold"
              }
              htmlFor="exampleInputEmail1"
            >
              Email
            </label>
            <input
              type="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              className="form-control shadow-none login-form border-0"
              placeholder="Enter Username"
              style={
                darkMode
                  ? {
                      height: "48px",
                      backgroundColor: "#282A32",
                      color: "white",
                    }
                  : { height: "48px", backgroundColor: "#F2F2F2" }
              }
              onChange={(e) => checkEmailFormat(e.target.value)}
            />
            {/* EMAIL CODE */}
            <div className="mb-3">
              <label
                className={
                  darkMode
                    ? "font-14 text-white fw-bold mt-3"
                    : "font-14 font-dark fw-bold mt-3"
                }
                htmlFor="exampleInputEmail1"
              >
                Email Code
              </label>
              <div className="d-flex align-items-center">
                <div className="col-9">
                  <input
                    type="email"
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                    value={emailCode}
                    className="form-control shadow-none login-form border-0"
                    placeholder="Input Code Here"
                    style={
                      darkMode
                        ? {
                            height: "48px",
                            backgroundColor: "#282A32",
                            color: "white",
                          }
                        : { height: "48px", backgroundColor: "#F2F2F2" }
                    }
                    onChange={(e) => setEmailCode(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  {getCode ? (
                    <button
                      className=" btn btn-secondary float-end font-12"
                      style={{ height: "50px" }}
                    >
                      Resend ({timer})
                    </button>
                  ) : emailFormat ? (
                    <button
                      className=" btn btn-primary float-end font-12"
                      style={{ height: "50px" }}
                      onClick={() => getEmailCode()}
                    >
                      Get Code
                    </button>
                  ) : (
                    <button
                      className=" btn btn-primary float-end font-12"
                      style={{ height: "50px" }}
                      onClick={() =>
                        swal("Please input email correctly!", {
                          button: {
                            text: "ok",
                            className: "bg-primary shadow-none",
                          },
                        })
                      }
                    >
                      Get Code
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* PASS  */}
            <label
              className={
                darkMode
                  ? "font-14 text-white fw-bold mt-3"
                  : "font-14 font-dark fw-bold mt-3"
              }
              htmlFor="exampleInputEmail1"
            >
              New Password
            </label>
            <div className=" input-group mb-3">
              <input
                type={typeInput.type}
                value={password}
                className="form-control shadow-none login-form border-0"
                placeholder="Enter Password"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => checkInputPassword(e.target.value)}
              />
              <span
                className={
                  darkMode
                    ? "input-group-text border-0 bg-dark-mode2 text-white"
                    : "input-group-text border-0"
                }
                onClick={() =>
                  typeInput.type === "password"
                    ? setTypeInput({ type: "text", icon: "fa fa-eye-slash" })
                    : setTypeInput({ type: "password", icon: "fa fa-eye" })
                }
              >
                <i
                  className={typeInput.icon}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
            {/* password validation */}
            <div className="mb-3">
              <div className="d-flex">
                <div
                  className={ darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"}
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
                  className={ darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"}
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
                  className={ darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"}
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
                  className={ darkMode ? "badge p-2 me-2 bg-dark-mode2" : "badge p-2 me-2"}
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
                className={ darkMode ? "badge p-2 me-2 mt-2 bg-dark-mode2" : "badge p-2 me-2 mt-2"}
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
            {/* PASS CONFIRMATION  */}
            <label
              className={
                darkMode
                  ? "font-14 text-white fw-bold mt-3"
                  : "font-14 font-dark fw-bold mt-3"
              }
              htmlFor="exampleInputEmail1"
            >
              Confirm Password
            </label>
            <div className=" input-group mb-1">
              <input
                type={typeInput2.type}
                value={password_conf}
                className="form-control shadow-none login-form border-0"
                placeholder="Enter Password"
                style={
                  darkMode
                    ? {
                        height: "48px",
                        backgroundColor: "#282A32",
                        color: "white",
                      }
                    : { height: "48px", backgroundColor: "#F2F2F2" }
                }
                onChange={(e) => setPassword_conf(e.target.value)}
              />
              <span
                className={
                  darkMode
                    ? "input-group-text border-0 bg-dark-mode2 text-white"
                    : "input-group-text border-0"
                }
                onClick={() =>
                  typeInput2.type === "password"
                    ? setTypeInput2({ type: "text", icon: "fa fa-eye-slash" })
                    : setTypeInput2({ type: "password", icon: "fa fa-eye" })
                }
              >
                <i
                  className={typeInput2.icon}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
            {password && password_conf ? (
              samePass ? (
                <label className="font-12 text-success fw-bold mt-1">
                  Kata sandi sesuai
                </label>
              ) : (
                <label className="font-12 text-danger fw-bold mt-1">
                  Kata sandi tidak sesuai
                </label>
              )
            ) : (
              ""
            )}
          </div>
          {buttonSumbit ? (
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              onClick={() => resetPassword()}
            >
              Submit
            </button>
          ) : (
            <button className="btn btn-secondary w-100 mt-2">Submit</button>
          )}

          <p className="mb-0 font-10 text-danger mt-3 text">
            For security purpose no withdrawals are permitted for 24 hours after
            modification of methods.
          </p>
          {/* </form> */}
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage

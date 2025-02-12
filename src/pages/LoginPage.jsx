import React, { useEffect, useState } from "react"
import { ArrowRight, X } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import axiosConfig from "../config/axios"
import img_loading from "../assets/loading.gif"
import swal from "sweetalert"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { DBLogin } from "../DB/Login"

function LoginPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)

  const navigate = useNavigate()

  // state login
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberme, setRememberme] = useState(false)
  const [typeInput, setTypeInput] = useState({
    icon: "fa fa-eye",
    type: "password",
  })
  // const [ data, setData] = useState(DBLogin)

  const emailRemember = localStorage.getItem("remember-me")

  useEffect(() => {
    if (emailRemember) {
      setEmail(emailRemember)
      setRememberme(true)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email || !password) {
      swal("Incorrect!", "Email and Password is required")
    } else {
      setIsLoading(true)
      if (rememberme) {
        localStorage.setItem("remember-me", email)
      }

      if (emailRemember && !rememberme) {
        localStorage.removeItem("remember-me")
      }
      const data = DBLogin

      console.log(data)
      setIsLoading(true)
      if (
        data.data.messages[0] ===
        "You`ve Requested Delete Account, Please Check Your Email"
      ) {
        swal("You`ve Requested Delete Account", "Please check your email")
        setIsLoading(false)
      }
      if (data.data.status === "success") {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("data_user", JSON.stringify(data.data))
        if (data.data.user.is_deleted == 1) {
          navigate("/reactive-account")
        } else if (data.data.user.default_security_auth === "google_auth") {
          localStorage.setItem("login-pin", `${email}-${password}`)
          navigate("/2FA-authenticator")
        } else if (!data.data.user.default_security_auth) {
          navigate("/")
          window.location.reload()
        } else {
          localStorage.setItem("login-pin", `${email}-${password}`)
          navigate("/login-pin")
        }
      }
      if (data.data.status === "error") {
        swal({
          // title: "Good job!",
          text: data.data.messages[0],
          icon: "error",
        })
        //   setEmail("")
        //   setPassword("")
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <div
        className="container-fluid text-roboto pt-2"
        style={{ height: "100vh" }}
      >
        <div className="d-flex justify-content-center align-items-center h-100 px-0 mx-0">
          {/* <div className="d-flex justify-content-between align-items-center">
          <p className="font-30" onClick={() => navigate("/")}>
            <X />
          </p>
          <p
            className="font-18 font-primary"
            onClick={() => navigate("/register")}
          >
            Register
          </p>
        </div> */}
          <div className="mx-0 px-3 w-100">
            <p
              className={
                darkMode
                  ? "font-30 text-center mb-4 text-white"
                  : "font-30 text-center mb-4"
              }
              style={{ fontWeight: 700 }}
            >
              Login
            </p>

            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className={
                    darkMode
                      ? "font-14 text-grey fw-bold"
                      : "font-14 text-dark fw-bold"
                  }
                >
                  Email
                </label>
                <input
                  type="input"
                  value={email}
                  className={
                    darkMode
                      ? "form-control shadow-none login-form border-0 bg-dark-mode2 text-white"
                      : "form-control shadow-none login-form border-0"
                  }
                  placeholder="Enter Username"
                  style={{ height: "48px", backgroundColor: "#F2F2F2" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label
                className={
                  darkMode
                    ? "font-14 fw-bold text-grey"
                    : "font-14 fw-bold text-dark"
                }
              >
                Password
              </label>
              {/* password */}
              <div className=" input-group mb-3">
                <input
                  type={typeInput.type}
                  value={password}
                  className={
                    darkMode
                      ? "form-control shadow-none login-form border-0 bg-dark-mode2 text-white"
                      : "form-control shadow-none login-form border-0"
                  }
                  placeholder="Enter Password"
                  style={{ height: "48px", backgroundColor: "#F2F2F2" }}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* option */}
              <div className="mb-3 d-flex justify-content-between">
                <div className="form-check form-switch align-items-center">
                  <input
                    className="form-check-input shadow-none"
                    type="checkbox"
                    role="switch"
                    checked={rememberme}
                    onChange={() => setRememberme(!rememberme)}
                  />
                  <label
                    className={
                      darkMode
                        ? "form-check-label font-12 text-white"
                        : "form-check-label font-12"
                    }
                  >
                    Remember me
                  </label>
                </div>
                <p
                  className="font-14 fw-bold"
                  onClick={() => navigate("/forgot-password")}
                  style={{ cursor: "pointer", color: "#266DE0" }}
                >
                  Forgot Password{" "}
                </p>
              </div>

              <div
                className="text-center mb-4 text-danger"
                style={{ fontSize: 12.5 }}
              >
                *Random input email and password and cLick "Login" this is Dummy
                Page
              </div>
              {/* button submit */}
              <div className="d-grid col-12">
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#266DE0", height: "47px" }}
                >
                  Login
                </button>
              </div>
              <div className="d-grid col-12">
                <button
                  className="btn text-dark border border-2 mt-3"
                  style={{ backgroundColor: "white", height: "47px" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </form>
            <p
              className={
                darkMode
                  ? "text-inter font-12 mt-4 text-center text-white"
                  : "text-inter font-12 mt-4 text-center"
              }
            >
              Need Help? If you encounter any issues or have questions regarding
              the login process, tap on the <strong>"Need Help?"</strong>
            </p>
            <p
              onClick={() => navigate("/")}
              className="text-inter font-14 fw-bold mt-4 text-center"
              style={{ color: "#266DE0" }}
            >
              Explore digitalexchange.id <ArrowRight />
            </p>
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
        </div>
      </div>
    </>
  )
}

export default LoginPage

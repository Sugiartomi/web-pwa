import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import SuccessImg from "../assets/success-order.svg"
import { pin_guard, security_status } from "../store/actions/user"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function ActivePinPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle_pin_guard = () => {
  
    navigate("/security")
  }
  return (
    <>
      <div style={{ height: "100vh" }} className={darkMode ? "text-white" : ""}>
        <div className="container text-roboto">
          <p className="font-20 fw-bold text-center pt-2">PIN Guard</p>

          <div className="center-page-acttive-pin">
            <img
              src={SuccessImg}
              alt=""
              className="img-fluid mx-auto d-block"
            />
            <p className="font-20 fw-bold text-center mt-3">
              Congratulations PIN Created Successfully
            </p>
          </div>
        </div>
        <div className="fixed-button pb-2 px-2 col-12 ">
          <div className="d-grid col-12">
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#1B6AEA", height: "44px" }}
              onClick={() => handle_pin_guard()}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivePinPage

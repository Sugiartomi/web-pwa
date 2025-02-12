import React from "react"
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import HeadsetHelpImg from "../assets/Help/headset-help.svg"
import PhoneIconImg from "../assets/Help/phone-help-icon.svg"
import EmailIconImg from "../assets/Help/email-icon-help.svg"
import InfoIconImg from "../assets/Help/info-icon-help.svg"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function HelpPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  return (
    <div
      style={{ minHeight: "100vh" }}
      className={darkMode ? "text-white" : ""}
    >
      <div className="container text-roboto">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "90px" }}>
            Help & Support
          </p>
        </div>
      </div>
      {/* banner */}
      <div className="help-bg">
        <div className="d-flex py-2 px-3 justify-content-between">
          <div className="text-white col-8">
            <p className="font-20 mb-2">
              Hello, need help digitalexchange.id ?
            </p>
            <p className="font-12 mb-0">
              We want to help you use digitalexchange.id
            </p>
          </div>
          <img src={HeadsetHelpImg} alt="" className="img-fluid" />
        </div>
      </div>

      <div className="container text-roboto">
        {/* help list */}
        <div className="mt-3">
          {/* Customer service */}
          <div className="d-flex mb-4">
            <img src={PhoneIconImg} alt="" className="img-fluid" />
            <div className="ms-3">
              <p className="font-20 fw-bold mb-1">Customer Service Hours</p>
              <p className="font-12 mb-0">Monday - Sunday</p>
              <p className="font-12 mb-0">
                08.00 - 23.59 WIB (West Indonesia Time)
              </p>
            </div>
          </div>
          {/* Email */}
          <div
            className="d-flex mb-4"
            onClick={() => window.open("mailto:support@digitalexchange.id")}
          >
            <img src={EmailIconImg} alt="" className="img-fluid" />
            <div className="ms-3">
              <p className="font-20 fw-bold mb-1">Email</p>
              <p className="font-12 mb-0">Support@digitalexchange.id</p>
            </div>
          </div>
          {/* Helpdesk */}
          <div
            className="d-flex mb-4"
            onClick={() => {
              window.open("https://help.digitalexchange.id/home/id", "blank_")
            }}
          >
            <img src={InfoIconImg} alt="" className="img-fluid" />
            <div className="ms-3">
              <p className="font-20 fw-bold mb-1">Helpdesk</p>
              <p className="font-12 mb-0">help.digitalexchange.id</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: darkMode ? "": "#F9F9F9", height: "12px" }}></div>

      <div className="container text-roboto">
        <p className="fw-bold font-18">Support</p>
        <a
          href="https://help.digitalexchange.id/artikel/id/Term-n-Condition-Terbaru-digitalexchangeid"
          target="_blank"
          style={{ textDecoration: "none", color: darkMode ?"white": "black" }}
        >
          <div className="d-flex justify-content-between">
            <p className="font-16">Terms and Conditions</p>
            <p className="font-16">
              <ChevronRight />
            </p>
          </div>
        </a>
        <a
          href="https://digitalexchange.id/privacy-policy"
          target="_blank"
          style={{ textDecoration: "none", color: darkMode ?"white":"black" }}
        >
          <div className="d-flex justify-content-between">
            <p className="font-16">Privacy Policy</p>
            <p className="font-16">
              <ChevronRight />
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default HelpPage

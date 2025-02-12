import React, { useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import IndoneasiaLanguageImg from "../assets/indonesia-language.svg"
import EnglishLanguageImg from "../assets/english-language.svg"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function ChangeLanguagePage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const [language, setLanguage] = useState("indonesia")
  return (
    <>
      <div className={ darkMode ? "container text-roboto text-white" : "container text-roboto"} style={{ minHeight : "100vh"}}>
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "90px" }}>
            {language === "indonesia" ? "Ubah Bahasa" : "Change Language"}
          </p>
        </div>

        {/* language option */}
        <div className="d-flex mt-4 justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <img src={IndoneasiaLanguageImg} alt="" className="img-fluid" />
            <p className="fw-bold font-13 mb-0 ms-3">Bahasa Indonesia</p>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
              onClick={() => setLanguage("indonesia")}
            />
          </div>
        </div>
        <div className="d-flex mt-4 justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <img src={EnglishLanguageImg} alt="" className="img-fluid" />
            <p className="fw-bold font-13 mb-0 ms-3">English</p>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
              onClick={() => setLanguage("english")}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeLanguagePage

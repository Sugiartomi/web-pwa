import React, { useEffect, useState } from "react"
import {
  ChevronBarRight,
  ChevronLeft,
  ChevronRight,
  DashCircleFill,
  Eye,
  EyeSlash,
  PatchCheckFill,
  X,
  XCircleFill,
} from "react-bootstrap-icons"

import { FiInstagram } from "react-icons/fi"
import {
  FaFacebook,
  FaYoutube,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa"
import { GrCopy, GrTwitter } from "react-icons/gr"
import { ImSpotify } from "react-icons/im"
import { IoDiamondSharp } from "react-icons/io5"
import DexProfileLogo from "../assets/dex-logo-profile.svg"
import FeesIcon from "../assets/Profile/fees-icon.svg"
import SettingsIcon from "../assets/Profile/settings-icon.svg"
import Helpicon from "../assets/Profile/help-icon.svg"
import ChatIcon from "../assets/Profile/chat-icon.svg"
import PresentGift from "../assets/present-gift.svg"
import CommunityIcon from "../assets/Profile/comunity-icon.svg"
import ProfileIcon from "../assets/Profile/profile-icon.svg"
import PointCenterIcon from "../assets/Profile/point-center-icon.svg"
import ReferralIcon from "../assets/Profile/Referral-icon.svg"
import SecurityIcon from "../assets/Profile/Security-icon.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { get_user_profile, login_status } from "../store/actions/user"
import EKycImg from "../assets/Profile/e-kyc.png"
import axiosConfig from "../config/axios"
import ReferralModalImg from "../assets/referral-modal.svg"
import CoinMarketCap from "../assets/coin-market-cap-black.svg"
import CoinMarketCapWhite from "../assets/coin-market-cap-white.svg"
import CoinGecko from "../assets/coin-gecko-black.svg"
import CoinGeckoWhite from "../assets/coin-gecko-white.svg"
import DexProfile from "../assets/dex-logo-profile.svg"
import DexProfileWhite from "../assets/dex-logo-profile-white.svg"

// ICON ============================================================================
import UserCircle from "@untitled-ui/icons-react/build/cjs/UserCircle"
import ShieldTick from "@untitled-ui/icons-react/build/cjs/ShieldTick"
import Gift01 from "@untitled-ui/icons-react/build/cjs/Gift01"
import Tag03 from "@untitled-ui/icons-react/build/cjs/Tag03"
import Transalte01 from "@untitled-ui/icons-react/build/cjs/Translate01"
import Moon01 from "@untitled-ui/icons-react/build/cjs/Moon01"
import Headphones01 from "@untitled-ui/icons-react/build/cjs/Headphones01"
import User01 from "@untitled-ui/icons-react/build/cjs/User01"
import MessageChatCircle from "@untitled-ui/icons-react/build/cjs/MessageChatCircle"
import MessageQuestionCircle from "@untitled-ui/icons-react/build/cjs/MessageQuestionCircle"
import Star01 from "@untitled-ui/icons-react/build/cjs/Star01"
import LogOut01 from "@untitled-ui/icons-react/build/cjs/LogOut01"
import Calculator from "@untitled-ui/icons-react/build/cjs/CoinsStacked01"
import NavigationButton from "../components/global/NavigationButton"
import { IDRFormater } from "../helpers/currencyFormater"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { handleLogut } from "../helpers/logout"

function MyProfilePage() {
  // theme
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { state } = useLocation()
  // const { userProfile } = useSelector((store) => store.user);
  const [securityLevel, setSecurityLevel] = useState()
  const [visibility, setVisibility] = useState(true)
  const userToken = localStorage.getItem("token")
  const userProfile = JSON.parse(localStorage.getItem("data_user")).user

  let emailRemember = localStorage.getItem("remember-me")
  let hideEMail
  if (emailRemember) {
    for (let i = 0; i < emailRemember.length; i++) {
      if (i === 0) {
        hideEMail = "*"
      } else {
        hideEMail += "*"
      }
    }
  }
  // const handleLogut = () => {
  //   // dispatch(login_status(false));

  //   if (emailRemember) {
  //     localStorage.clear()
  //     localStorage.setItem("remember-me", emailRemember)
  //   } else {
  //     localStorage.clear()
  //   }
  //   navigate("/login")
  //   window.location.reload()
  // }

  // function get data profile user
  // useEffect(() => {
  // 	dispatch(get_user_profile());
  // }, [pathname]);

  useEffect(() => {
    let count = 0
    const data_user = JSON.parse(localStorage.getItem("data_user"))

    if (data_user.auth_status === "enable") {
      count++
    }
    if (data_user.user.status_user_pin) {
      count++
    }
    if (data_user.user.verify_phone === "VERIFIED") {
      count++
    }

    if (count === 1) {
      setSecurityLevel("low")
    } else if (count === 2) {
      setSecurityLevel("medium")
    } else if (count === 3) {
      setSecurityLevel("high")
    } else {
      setSecurityLevel("low")
    }
  }, [userProfile])

  const switchDarkMode = (e) => {
    console.log(e.target.checked)
    if (e.target.checked === true) {
      localStorage.setItem("theme", true)
      setDarkMode(true)
    }
    if (e.target.checked === false) {
      localStorage.setItem("theme", false)
      setDarkMode(false)
    }
  }

  return (
    <>
      <div
        className="container text-roboto"
        style={
          darkMode
            ? { backgroundColor: "#2F343E" }
            : { backgroundColor: "#F5F5F5" }
        }
      >
        {!userToken ? (
          <>
            <p className="font-16 text-center fw-bold mt-5">
              What are you waiting for ? Start Crypto Assets Today!
            </p>
            <div className="d-flex justify-content-evenly">
              <button
                type="button"
                className="btn font-14 font-primary fw-bold"
                style={{
                  border: "1px solid #1B6AEA",
                  height: "39px",
                  width: "153px",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn font-14 text-white fw-bold"
                style={{
                  backgroundColor: "#1B6AEA",
                  height: "39px",
                  width: "153px",
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
            {/* profile menu */}
            <div className="mt-5">
              {/* dex lite */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={DexProfileLogo}
                    alt=""
                    className="img-fluid"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-15 fw-bold mb-0 ms-3">DEX PRO</p>
                </div>
                <div className="form-check form-switch font-25">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                  />
                </div>
              </div>
              {/* Fees */}
              <div
                className="d-flex justify-content-between align-items-center"
                onClick={() =>
                  window.open(
                    "https://help.digitalexchange.id/artikel/id/fee",
                    "_blank"
                  )
                }
              >
                <div className="d-flex align-items-center">
                  <img
                    src={FeesIcon}
                    alt=""
                    className="img-fluid"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-15 fw-bold mb-0 ms-3">Fees</p>
                </div>
                <p className="mb-0 font-16" style={{ fontWeight: "800" }}>
                  <ChevronRight />
                </p>
              </div>
              <div
                className="my-3 row"
                style={{ backgroundColor: "#F4F8FC", height: "5px" }}
              ></div>

              {/* settings */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={SettingsIcon}
                    alt=""
                    className="img-fluid"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-15 fw-bold mb-0 ms-3">Setting</p>
                </div>
                <p className="mb-0 font-16" style={{ fontWeight: "800" }}>
                  <ChevronRight />
                </p>
              </div>
              <div
                className="my-3 row"
                style={{ backgroundColor: "#F4F8FC", height: "5px" }}
              ></div>

              {/* help */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src={Helpicon}
                    alt=""
                    className="img-fluid"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-15 fw-bold mb-0 ms-3">Help & Support</p>
                </div>
                <p className="mb-0 font-16" style={{ fontWeight: "800" }}>
                  <ChevronRight />
                </p>
              </div>

              {/* Chat support */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src={ChatIcon}
                    alt=""
                    className="img-fluid"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-15 fw-bold mb-0 ms-3">Chat Support</p>
                </div>
                <p className="mb-0 font-16" style={{ fontWeight: "800" }}>
                  <ChevronRight />
                </p>
              </div>

              {/* Community */}
              <div
                className="d-flex justify-content-between align-items-center mb-4"
                onClick={() =>
                  window.open(
                    "https://t.me/digitalexchangeidcommunity",
                    "_blank"
                  )
                }
              >
                <div className="d-flex align-items-center">
                  <img
                    src={CommunityIcon}
                    alt=""
                    className="img-fluid"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-15 fw-bold mb-0 ms-3">Community</p>
                </div>
                <p className="mb-0 font-16" style={{ fontWeight: "800" }}>
                  <ChevronRight />
                </p>
              </div>
            </div>
            {/* social media */}
            <div className="d-flex justify-content-center">
              <p className="ms-3 font-25">
                <FiInstagram />
              </p>
              <p className="ms-3 font-25">
                <FaFacebook />
              </p>
              <p className="ms-3 font-25">
                <GrTwitter />
              </p>
              <p className="ms-3 font-25">
                <FaYoutube />
              </p>
              <p className="ms-3 font-25">
                <FaTelegramPlane />
              </p>
              <p className="ms-3 font-25">
                <ImSpotify />
              </p>
            </div>
            {/* version */}
            <p className="font-15 fw-bold text-center mt-3">Version 1.0.75</p>
          </>
        ) : (
          <>
            <div className="px-2">
              {/* BOX-1 */}
              <div className=" text-inter pt-4">
                <div
                  className={
                    darkMode
                      ? "card p-3 border-0 bg-dark-mode2"
                      : "card p-3 border-0"
                  }
                  style={{
                    borderRadius: 15,
                    boxShadow:
                      "0px 1px 2px -2px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
                  }}
                >
                  <div className="d-flex">
                    <div
                      className={
                        darkMode
                          ? "font-20 fw-bold text-white"
                          : "font-20 fw-bold"
                      }
                    >
                      {userProfile.username}
                    </div>
                    <div className="d-flex align-items-center ms-2">
                      {userProfile.verification_status === "UNSUBMIT" ? (
                        <div
                          className="font-red fw-bold font-12  py-1 px-3"
                          style={{ borderRadius: 8 }}
                        >
                          Unverified
                        </div>
                      ) : userProfile.verification_status === "VERIFIED" ? (
                        <div
                          className="font-green fw-bold font-12 bg-imp-green py-1 px-3"
                          style={{ borderRadius: 8 }}
                        >
                          Verified
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="font-14 text-secondary text-roboto fw-bold mt-1">
                    {userProfile.email}
                  </div>
                  <div
                    className="card border-0 p-3 mt-3"
                    style={ darkMode ?{ backgroundColor : "#266DE0", borderRadius: 10 } : { backgroundColor : "#266DE0", borderRadius: 10 }}
                  >
                    <div className="row">
                      <div className="col-9">
                        <div className={ darkMode ? "font-14 text-white" : "font-14 text-white"}>
                          Invite a friend, Gain Together
                        </div>
                        <div className={ darkMode ? "font-8 text-white mt-1" : "font-8 text-white mt-1"}>
                          Get commision every time you and your friend buy /
                          sell crypto
                        </div>
                        <div className="card mt-2 py-1 px-2">
                          <div className="d-flex justify-content-between">
                            <div className="font-12 text-secondary">
                              JJP67XTFS
                            </div>
                            <GrCopy />
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex h-100 align-items-center">
                          <img src={PresentGift} className="img-fluid" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOX-2 */}
              <div className=" text-inter mt-4">
                <div
                  className={
                    darkMode
                      ? "card p-3 border-0 bg-dark-mode2 text-white"
                      : "card p-3 border-0"
                  }
                  style={{
                    borderRadius: 15,
                    boxShadow:
                      "0px 1px 2px -2px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
                  }}
                >
                  <div className="font-20 fw-bold">Account</div>
                  {/*  Profile */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => navigate("/profile")}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <UserCircle />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Profile
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Account Security */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-2"
                      onClick={() => navigate("/security")}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "85%" }}
                      >
                        <div>
                          <ShieldTick />
                        </div>
                        <div className="w-100">
                          {securityLevel ? (
                            <div className="ms-2 w-100">
                              <p
                                className={
                                  darkMode
                                    ? "font-12 text-white mb-1"
                                    : "font-12 text-secondary mb-1"
                                }
                              >
                                Account Security :{" "}
                                {securityLevel === "low" ? (
                                  <span className="font-red fw-bold">Low</span>
                                ) : securityLevel === "medium" ? (
                                  <span className="font-yellow fw-bold">
                                    Medium
                                  </span>
                                ) : securityLevel === "high" ? (
                                  <span className="font-green-secondary fw-bold">
                                    High
                                  </span>
                                ) : (
                                  ""
                                )}
                              </p>
                              <div
                                className="progress"
                                style={{ height: "4px", width: "100%" }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  aria-label="Basic example"
                                  style={
                                    securityLevel === "low"
                                      ? {
                                          width: "33.33%",
                                          backgroundColor: "#DC3545",
                                        }
                                      : securityLevel === "medium"
                                      ? {
                                          width: "66.33%",
                                          backgroundColor: "#FFBE0A",
                                        }
                                      : securityLevel === "high"
                                      ? {
                                          width: "100%",
                                          backgroundColor: "#06C270",
                                        }
                                      : {}
                                  }
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Point Center */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => navigate("/point-center")}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <Gift01 />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Point Center
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        {userProfile ? (
                          <p
                            className="font-13 mb-0 me-4"
                            style={{ color: "#DC9100" }}
                          >
                            {IDRFormater(+userProfile.point)}
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="">
                          <ChevronRight />
                        </div>
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Voucher */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => navigate("/voucher")}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <Tag03 />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Voucher
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Fees */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() =>
                        window.open(
                          "https://help.digitalexchange.id/artikel/id/fee",
                          "_blank"
                        )
                      }
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <Calculator />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Fees
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                  </>
                </div>
              </div>

              {/* BOX-3 */}
              <div className=" text-inter mt-4">
                <div
                  className={
                    darkMode
                      ? "card p-3 border-0 bg-dark-mode2 text-white"
                      : "card p-3 border-0"
                  }
                  style={{
                    borderRadius: 15,
                    boxShadow:
                      "0px 1px 2px -2px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
                  }}
                >
                  <div className="font-20 fw-bold">Refenrence</div>
                  {/* Language */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => navigate("/change-language")}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <Transalte01 />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Language
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Dark Mode */}
                  <>
                    <div className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1">
                      <div className="d-flex align-items-center">
                        <div>
                          <Moon01 />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Dark Mode
                        </div>
                      </div>

                      <div className="form-check form-switch shadow-none font-25">
                        <input
                          style={{ width: 40, height: 20 }}
                          className="form-check-input shadow-none custom-control-label float-end"
                          type="checkbox"
                          role="switch"
                          onChange={switchDarkMode}
                          checked={
                            JSON.parse(localStorage.getItem("theme"))
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </>
                </div>
              </div>

              {/* BOX-4 */}
              <div className=" text-inter mt-4">
                <div
                  className={
                    darkMode
                      ? "card p-3 border-0 bg-dark-mode2 text-white"
                      : "card p-3 border-0"
                  }
                  style={{
                    borderRadius: 15,
                    boxShadow:
                      "0px 1px 2px -2px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
                  }}
                >
                  <div className="font-20 fw-bold">Other</div>
                  {/* Support */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => navigate("/help")}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <Headphones01 />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Help Center & Support
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Community & Social Media */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() =>
                        window.open(
                          "https://t.me/digitalexchangeidcommunity",
                          "_blank"
                        )
                      }
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <User01 />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Community & Social Media
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Chat Room */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => navigate("/chat-room")}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <MessageChatCircle />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Chat Room
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>
                  {/* Chat Support */}
                  <>
                    <div className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1">
                      <div className="d-flex align-items-center">
                        <div>
                          <MessageQuestionCircle />
                        </div>
                        <div
                          className={
                            darkMode
                              ? "font-12 text-white ms-2"
                              : "font-12 text-secondary ms-2"
                          }
                        >
                          Chat Support
                        </div>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                    <div
                      className="mt-2"
                      style={{ border: "1.5px solid rgb(128,128,128,0.1)" }}
                    />
                  </>

                  {/* Log Out */}
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between w-100 mt-3 mb-1"
                      onClick={() => {
                        handleLogut(navigate)
                        window.location.reload()
                      }}
                    >
                      <div className="d-flex align-items-center ">
                        <div className="text-danger">
                          <LogOut01 />
                        </div>
                        <div className="font-12 text-secondary ms-2 text-danger">
                          Log Out
                        </div>
                      </div>
                      <div className="text-danger">
                        <ChevronRight />
                      </div>
                    </div>
                  </>
                </div>
              </div>

              {/* social media */}
              <>
                <div
                  className={
                    darkMode
                      ? "text-center fw-bold font-12 mt-5 text-white"
                      : "text-center fw-bold font-12 mt-5"
                  }
                >
                  Ikuti kami di:
                </div>
                <div
                  className={
                    darkMode
                      ? "d-flex text-white justify-content-center mt-1"
                      : "d-flex justify-content-center mt-1"
                  }
                >
                  <p
                    className=" font-25"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/digitalexchangeid/",
                        "blank_"
                      )
                    }
                  >
                    <FiInstagram />
                  </p>
                  <p
                    className="ms-3 font-25"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/digitalexchangeid/",
                        "blank_"
                      )
                    }
                  >
                    <FaFacebook />
                  </p>
                  <p
                    className="ms-3 font-25"
                    onClick={() =>
                      window.open(
                        "https://twitter.com/Digiexchangeid",
                        "blank_"
                      )
                    }
                  >
                    <GrTwitter />
                  </p>
                  <p
                    className="ms-3 font-25"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/channel/UCd0BzVZBiVyctJ5mNTVqF-w",
                        "blank_"
                      )
                    }
                  >
                    <FaYoutube />
                  </p>
                  <p
                    className="ms-3 font-25"
                    onClick={() =>
                      window.open(
                        "https://t.me/digitalexchangeidcommunity",
                        "blank_"
                      )
                    }
                  >
                    <FaTelegramPlane />
                  </p>
                  <p
                    className="ms-3 font-25"
                    onClick={() =>
                      window.open(
                        "https://open.spotify.com/show/07Aea2cU3hjNCz7mz65qm2",
                        "blank_"
                      )
                    }
                  >
                    <ImSpotify />
                  </p>
                  <p
                    className="ms-3 font-25"
                    onClick={() =>
                      window.open(
                        "https://www.tiktok.com/@digitalexchange.id?lang=en",
                        "blank_"
                      )
                    }
                  >
                    <FaTiktok />
                  </p>
                </div>
              </>

              {/* Terdaftar */}
              <>
                <div
                  className={
                    darkMode
                      ? "text-center fw-bold text-white font-12 mt-4"
                      : "text-center fw-bold font-12 mt-4"
                  }
                >
                  Terdaftar di:
                </div>
                <div className="d-flex justify-content-center mb-5">
                  <div className="d-flex justify-content-center mt-2">
                    <img
                      src={darkMode ? CoinMarketCapWhite : CoinMarketCap}
                      className="img-fluid me-3"
                      style={{ height: 25 }}
                      alt=""
                      onClick={() =>
                        window.open(
                          "https://coinmarketcap.com/exchanges/digitalexchange-id/",
                          "blank_"
                        )
                      }
                    />
                    <img
                      src={darkMode ? CoinGeckoWhite : CoinGecko}
                      className="img-fluid"
                      style={{ height: 30 }}
                      alt=""
                      onClick={() =>
                        window.open(
                          "https://www.coingecko.com/en/exchanges/digitalexchange-id",
                          "blank_"
                        )
                      }
                    />
                  </div>
                </div>
              </>

              {/* Logo Dex */}
              <>
                <div className="d-flex w-100 justify-content-center pb-5">
                  <div className="me-3">
                    <img
                      src={ darkMode ? DexProfileWhite :DexProfile}
                      style={{ width: 30 }}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className={darkMode ? "text-white" : ""}>
                    <div className="fw-bold font-14">Digitalexchange.id</div>
                    <div className="font-10">PT.Indonesia Digital Exchange</div>
                  </div>
                </div>
              </>
            </div>
          </>
        )}
      </div>

      {/* modal kyc information */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-kyc-navigate"
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
              <div className="d-flex justify-content-between align-items-center">
                <p className="font-20 fw-bold">E-KYC Mobile Apps</p>
                <p className="font-30" data-bs-dismiss="modal">
                  <X />
                </p>
              </div>
              <img src={EKycImg} alt="" className="img-fluid mx-auto d-block" />
              <p className="font-16 text-center my-3">
                Mohon maaf, E-KYC hanya dapat dilakukan pada aplikasi mobile
                digitalexchange.id
              </p>
              {/* button navigate to install App */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "44px" }}
                  data-bs-dismiss="modal"
                >
                  Install Aplikasi Digital Exchange
                </button>
              </div>

              {/* button panduan kyc*/}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn bg-white mt-2"
                  style={{ height: "44px", color: "#0035EF" }}
                  data-bs-dismiss="modal"
                >
                  Lihat Panduan KYC
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal referral */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="referral-modal"
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
              <div className="d-flex justify-content-between align-items-center">
                <p className="font-20 fw-bold">Referral</p>
                <p className="font-30" data-bs-dismiss="modal">
                  <X />
                </p>
              </div>
              <img
                src={ReferralModalImg}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p className="font-18 text-center fw-bold mt-3 mb-2">
                Referral Program is Coming Soon!
              </p>
              <p className="font-16 text-center mb-2">
                Silahkan menunggu, fitur Referral ini akan segera hadir kembali
                untuk Anda.
              </p>
              {/* button ok */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                >
                  Ok, Saya Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fixed navbar */}
      <div style={{ height: 70 }}></div>
      <NavigationButton pathDestination={pathname} theme={darkMode}/>
    </>
  )
}

export default MyProfilePage

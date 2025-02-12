import React from "react"
import HomeActiveNav from "../../assets/FixNavbar/home-active-nav.svg"
import HomeActiveNavWhite from "../../assets/FixNavbar/home-active-nav-white.svg"
import HomeinActiveNavbar from "../../assets/FixNavbar/home-inactive-nav.svg"

import MarketActiveNav from "../../assets/FixNavbar/market-active-nav.svg"
import MarketActiveNavWhite from "../../assets/FixNavbar/market-active-nav-white.svg"
import MarketInactiveNav from "../../assets/FixNavbar/market-inactive-nav.svg"

import WalletActiveNav from "../../assets/FixNavbar/Wallet-active-nav.svg"
import WalletActiveNavWhite from "../../assets/FixNavbar/Wallet-active-nav-white.svg"
import WalletInactiveNav from "../../assets/FixNavbar/wallet-inactive-nav.svg"

import ProfileActive from "../../assets/FixNavbar/profile-active.svg"
import ProfileActiveWhite from "../../assets/FixNavbar/profile-active-white.svg"
import ProfileInactive from "../../assets/FixNavbar/profile-inactive.svg"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../../recoil/theme.State"

function NavigationButton({ pathDestination, theme }) {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)

  const navigate = useNavigate()

  const [listWallet, setListWallet] = useState()

  const walletNavigation = () => {
    navigate("/wallet")
  }

  return (
    <>
      <div
        className={
          darkMode
            ? "fixed-navbar pb-2 px-2 col-12 width-breakpoint bg-dark-mode2"
            : "fixed-navbar pb-2 px-2 col-12 width-breakpoint"
        }
        style={{
          height: 78,
          maxWidth: 480,
          borderTop: "1.5px solid rgba(128, 128, 128, 0.25)",
        }}
      >
        <div className="d-flex align-items-center justify-content-evenly">
          {/* HOME */}
          {pathDestination === "/" ? (
            <div
              onClick={() => navigate("/")}
              style={
                darkMode
                  ? { borderTop: "3px solid #FFFFFF" }
                  : { borderTop: "3px solid #266DE0" }
              }
            >
              <img
                src={darkMode ? HomeActiveNavWhite : HomeActiveNav}
                alt=""
                className="mx-auto d-block img-fluid"
              />
            </div>
          ) : (
            <div onClick={() => navigate("/")}>
              <img
                src={HomeinActiveNavbar}
                alt=""
                className="mx-auto d-block img-fluid"
              />
            </div>
          )}

          {/* MARKET */}
          {pathDestination === "/market" ? (
            <div
              onClick={() => navigate("/market")}
              style={
                darkMode
                  ? { borderTop: "3px solid #FFFFFF" }
                  : { borderTop: "3px solid #266DE0" }
              }
            >
              <img
                src={darkMode ? MarketActiveNavWhite : MarketActiveNav}
                alt=""
                className="mx-auto d-block img-fluid"
              />
            </div>
          ) : (
            <div onClick={() => navigate("/market")}>
              <img
                src={MarketInactiveNav}
                alt=""
                className="mx-auto d-block img-fluid"
              />
            </div>
          )}

          {/* WALLET */}
          {pathDestination === "/wallet" ? (
            <div
              onClick={() => walletNavigation()}
              style={
                darkMode
                  ? { borderTop: "3px solid #FFFFFF" }
                  : { borderTop: "3px solid #266DE0" }
              }
            >
              <img
                src={darkMode ? WalletActiveNavWhite : WalletActiveNav}
                alt=""
                className="mx-auto d-block"
              />
            </div>
          ) : (
            <div onClick={() => walletNavigation()}>
              <img src={WalletInactiveNav} alt="" className="mx-auto d-block" />
            </div>
          )}

          {/* PROFILE */}
          {pathDestination === "/trade" ||
          pathDestination === "/chat-room" ||
          pathDestination === "/my-profile" ? (
            <div
              onClick={() => navigate("/my-profile")}
              style={
                darkMode
                  ? { borderTop: "3px solid #FFFFFF", marginTop : 1 }
                  : { borderTop: "3px solid #266DE0", marginTop : 1 }
              }
            >
              <img
                src={darkMode ? ProfileActiveWhite : ProfileActive}
                alt=""
                className="mx-auto d-block"
              />
            </div>
          ) : (
            <div onClick={() => navigate("/my-profile")}>
              <img src={ProfileInactive} alt="" className="mx-auto d-block" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NavigationButton

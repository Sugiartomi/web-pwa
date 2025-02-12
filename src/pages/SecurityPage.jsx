import React from "react"
import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  PatchCheckFill,
  X,
  XCircleFill,
} from "react-bootstrap-icons"

import { useNavigate } from "react-router-dom"
import SecurityIcon from "../assets/Profile/Security-icon.svg"
import { MdOutlineDeleteForever } from "react-icons/md"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function SecurityPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const [securityLevel, setSecurityLevel] = useState("high")

  const dataLocalStg = {
    status: "success",
    user: {
      status_withdrawal_pin: true,
      status_user_pin: true,
      id: 2347,
      username: "arif1",
      email: "arif1@yopmail.com",
      point: "104005",
      level: "3",
      fullname: "PT INDONESIA DIGITAL EXCHANGE",
      photo: "photo-2347-19022020152204.jpg",
      phone: "628123456542",
      alt_phone: "6281200000000",
      address: "jakarta",
      game_attempt: "11",
      special_limit: false,
      special_market_fee: false,
      special_fee: false,
      max_daily_withdrawal: "200000000",
      remaining_amount_withdrawal: "0",
      status_escrow: 1,
      reset_2fa: false,
      remaining_daily_asset_wd: "2",
      is_deleted: 0,
      kyc_banned: false,
      agreement: 1,
      user_whitelist: false,
      verification_status: "VERIFIED",
      default_security_auth: "google_auth",
      verify_phone: "VERIFIED",
      user_id: "MjM0Nw==",
    },
    messages: ["You are now logged in!"],
    auth_status: "enable",
    csrf_token: "K6x3Dd8basHzvRJbksdiznMPCi3IzoLzC5DdUU5V",
    token:
      "HS1hLMAjme9yxIjdOejHvpimEOaqpes1pAy8JeCjRgn8a1k62mVRjQefrJuxAbBWuiNITiLsXu1t8RliGx6bCC0WVLqidaYoA1fitd28J65fz8qkJ6MQG+kp297uoOSSgNW5FwniQr+sqdkUFp9XL+4EFBk33PM5ck7r&&2&&pmWdNilSFral87GFpsjKqwvO7&&3koS1I&&Yvb6iSbWjV2x+GCN2lnuoDwMerp+aSB6m8ltVNqrp3u&&aKMSgg0st+&&4GZf6vKN7e+ZGczCNZmT+L9pabxjQ4IegWCwWXJ1q1RfES3vwSSm6SjooPydYakwgJAB6+OFwOIL0cvSYLkVNb2BGYSR9wF&&nhlCrSVOnY5GVKStlovUpMXZMlBWtOK4FKkqgrcZoRkBSWG0tWmWTN&&URvpflt&&8byC9Qkd2n1W0hkDVD1jXxJOzTTAz3WRDfO1m2ijlGsDHzgkPaBJhAwF&&0mg6SSVLLGqTmcDzXXY0=",
  }

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ height: " 100vh" }}
      >
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "100px" }}>
            Security Profile
          </p>
        </div>

        {/* security level */}
        <div
          className={
            darkMode
              ? "d-flex justify-content-between align-items-center mb-2 card p-3 bg-dark-mode2 border-0"
              : "d-flex justify-content-between align-items-center mb-2 card p-3"
          }
        >
          <div className="d-flex">
            <img
              src={SecurityIcon}
              alt=""
              className="img-fluid"
              style={{ width: "25px", height: "25px" }}
            />
            <div className="ms-3">
              <p className="font-15 fw-bold mb-2">
                Security Level :{" "}
                {securityLevel === "low" ? (
                  <span className="font-red">Low</span>
                ) : securityLevel === "medium" ? (
                  <span className="font-yellow">Medium</span>
                ) : securityLevel === "high" ? (
                  <span className="font-green-secondary">High</span>
                ) : (
                  ""
                )}
              </p>
              <div
                className="progress"
                style={{ height: "4px", width: "270px" }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-label="Basic example"
                  style={
                    securityLevel === "low"
                      ? { width: "33.33%", backgroundColor: "#DC3545" }
                      : securityLevel === "medium"
                      ? { width: "66.33%", backgroundColor: "#FFBE0A" }
                      : securityLevel === "high"
                      ? { width: "100%", backgroundColor: "#06C270" }
                      : {}
                  }
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="font-10 mt-2 mb-1">
                Active more security features to make your account more safe
              </p>
            </div>
          </div>
        </div>

        <div
          className={
            darkMode ? "mt-3 card p-3 bg-dark-mode2 border-0" : "mt-3 card p-3"
          }
        >
          <div className="fw-bold font-20 mb-4">Account</div>

          {/* change password */}
          <div
            className="d-flex justify-content-between"
            onClick={() => navigate("/change-password")}
          >
            <p className="font-14 fw-bold">Change Password</p>
            <p>
              <ChevronRight />
            </p>
          </div>
          {/* delete account */}
          <div
            className="d-flex justify-content-between mb-3"
            onClick={() => navigate("/delete-account")}
          >
            <p className="font-14 fw-bold mb-0">Delete Account</p>
            <p className="mb-0">
              <ChevronRight />
            </p>
          </div>
          <p className="font-10 mb-1">
            Once the account is permanently deleted, this account data will be
            deleted like so: mobile phone, email, identity verification, etc.
            And this behavior cannot be changed.
          </p>
        </div>

        <div
          className={
            darkMode ? "mt-4 card p-3 bg-dark-mode2 border-0" : "mt-4 card p-3"
          }
        >
          {/* Phone Number Activation */}
          <div className="fw-bold font-20 mb-4">Account Security</div>

          {dataLocalStg.user.verify_phone === "VERIFIED" ? (
            <div className="d-flex justify-content-between mb-3 mt-2">
              <p className="font-14 fw-bold">1. Phone Number Activation</p>
              <div className="d-flex align-items-center">
                <p className="font-green font-13">
                  <span>
                    <PatchCheckFill />
                  </span>{" "}
                  Verified
                </p>
                <p className="ms-2">
                  <ChevronRight />
                </p>
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-between mb-3 mt-2"
              onClick={() => navigate("/phone-verification")}
            >
              <p className="font-14 fw-bold">1. Phone Number Activation</p>
              <div className="d-flex align-items-center">
                <p className="text-danger font-13">
                  <span>
                    <XCircleFill />
                  </span>{" "}
                  Unverified
                </p>
                <p className="ms-2">
                  <ChevronRight />
                </p>
              </div>
            </div>
          )}

          {/*  PIN Guard */}
          {dataLocalStg.user.phone ? (
            <div className="d-flex justify-content-between mb-3">
              <p className="font-14 fw-bold"> 2. PIN Guard</p>
              {!dataLocalStg.user.status_user_pin ? (
                <div
                  className="d-flex align-items-center"
                  onClick={() => navigate("/create-pin")}
                >
                  <p className="font-red font-13">Not Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center"
                  onClick={() => navigate("/change-pin")}
                >
                  <p className="font-13 font-primary">Change</p>
                  <p className="ms-2 font-13 font-green">Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="d-flex justify-content-between mb-3"
              data-bs-toggle="modal"
              data-bs-target="#BeforePhoneAuth"
            >
              <p className="font-14 fw-bold"> 2. PIN Guard</p>
              {!dataLocalStg.user.status_user_pin ? (
                <div
                  className="d-flex align-items-center"
                  onClick={() => navigate("/create-pin")}
                >
                  <p className="font-red font-13">Not Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center"
                  onClick={() => navigate("/change-pin")}
                >
                  <p className="font-13 font-primary">Change</p>
                  <p className="ms-2 font-13 font-green">Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              )}
            </div>
          )}

          {dataLocalStg.user.phone ? (
            <div className="d-flex justify-content-between">
              <p className="font-14 fw-bold">3. Google Authenticator</p>

              {dataLocalStg.auth_status === "disabled" ? (
                <div
                  className="d-flex align-items-center"
                  onClick={() => navigate("/google-2FA")}
                >
                  <p className="font-red font-13">Not Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : dataLocalStg.auth_status === "enable" ? (
                <div className="d-flex align-items-center">
                  <p
                    className="font-13 font-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#buy-modal"
                  >
                    Change to disable
                  </p>
                  <p className="ms-2 font-red font-13 font-green">Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : dataLocalStg.auth_status === "null" ? (
                <div
                  className="d-flex align-items-center"
                  onClick={() => navigate("/google-2FA")}
                >
                  <p className="font-red font-13">Not Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div
              className="d-flex justify-content-between"
              data-bs-toggle="modal"
              data-bs-target="#BeforePhoneAuth"
            >
              <p className="font-14 fw-bold">3. Google Authenticator</p>
              {dataLocalStg.auth_status === "disabled" ? (
                <div className="d-flex align-items-center">
                  <p className="font-red font-13">Disabled</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : dataLocalStg.auth_status === "enable" ? (
                <div className="d-flex align-items-center">
                  <p className="font-red font-13 font-green">Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : dataLocalStg.auth_status === "null" ? (
                <div className="d-flex align-items-center">
                  <p className="font-red font-13">Not Actived</p>
                  <p className="ms-2">
                    <ChevronRight />
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL SEC BEFORE PHONE AUTH */}
      <div
        className="modal fade"
        id="BeforePhoneAuth"
        tabIndex="-1"
        aria-labelledby="BeforePhoneAuthLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="BeforePhoneAuthLabel">
                Perhatian
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mb-3 text-center">
              Lakukan verifikasi nomor handphone sebelum melakukan setting PIN
              dan 2FA
            </div>
          </div>
        </div>
      </div>

      {/* modal confirm disable 2fa */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="buy-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className="modal-content rounded border-0 py-2"
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body">
              <div className="d-flex justify-content-center">
                <div className="col-11">
                  <p className="font-20 fw-bold text-center mb-0">
                    Are you sure you want to <br /> disable 2FA?
                  </p>
                </div>
                <div className="col-1">
                  <p className="font-25 mb-0" data-bs-dismiss="modal">
                    <X />
                  </p>
                </div>
              </div>
              <p
                className="text-center font-red mb-0"
                style={{ fontSize: "80px" }}
              >
                <MdOutlineDeleteForever />
              </p>
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#FEF1F2" }}
              >
                <p className="font-14 text-center mb-0 font-red">
                  Warning! If you disable 2FA you will not be able to get extra
                  protection
                </p>
              </div>
              {/* button ok */}
              <div className="d-flex justify-content-between mt-3">
                <button
                  type="button"
                  className="btn font-primary"
                  style={{
                    border: "0.741119px solid #1B6AEA",
                    height: "39.25px",
                    width: "150px",
                  }}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="ms-2 btn text-white"
                  style={{
                    backgroundColor: "#1B6AEA",
                    height: "39.25px",
                    width: "150px",
                  }}
                  data-bs-dismiss="modal"
                  onClick={() => navigate("/disable-2fa")}
                >
                  Disable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SecurityPage

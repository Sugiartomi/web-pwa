import React, { useState } from "react"
import { useEffect } from "react"
import {
  ChevronLeft,
  Clock,
  DashCircleFill,
  ExclamationCircleFill,
  PatchCheckFill,
  X,
} from "react-bootstrap-icons"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import EKycImg from "../assets/Profile/e-kyc.png"

import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function ProfilePage() {
  const [ darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const { pathname } = useLocation()


  const dispatch = useDispatch()
  const [verifiedStatus, setVeriviedStatus] = useState(false)
  const [userProfile,setuserProfile]  = useState({
    "kyc_reason": "",
    "kyc_status": "VERIFIED",
    "level": "3",
    "id": 2347,
    "username": "arif1",
    "email": "arif1@yopmail.com",
    "point": "104005",
    "fullname": "PT INDONESIA DIGITAL EXCHANGE",
    "photo": "photo-2347-19022020152204.jpg",
    "phone": "628123456542",
    "alt_phone": "6281200000000",
    "address": "jakarta",
    "game_attempt": "11",
    "special_limit": false,
    "special_market_fee": false,
    "special_fee": false,
    "max_daily_withdrawal": "200000000",
    "remaining_amount_withdrawal": "11050000",
    "status_escrow": 1,
    "reset_2fa": false,
    "is_deleted": 0,
    "status_user_pin": true,
    "kyc_banned": false,
    "auth_status": "enable",
    "user_whitelist": false,
    "verification_status": "VERIFIED",
    "default_security_auth": "google_auth",
    "verify_phone": "VERIFIED",
    "user_id": "MjM0Nw=="
})






  return (
    <>
      <div className={ darkMode ? "container text-roboto mb-3 text-white" : "container text-roboto mb-3"}>
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "130px" }}>
            Profile
          </p>
        </div>

        <p className="text-center font-18 fw-bold mt-3">
          Daily Withdrawal Limit Update
        </p>
        <div
          className="p-2 d-flex fw-bold"
          style={{ backgroundColor: "#f4b946", color: "black" }}
        >
          <p className="mb-0">
            <Clock />
          </p>
          <p className="font-12 mb-0 ms-2">
            Increase your transaction at digitalexchange.id, download the link
            document below to process your daily limit increase.
          </p>
        </div>

        {/* button Download CDD Document  */}
        <div className="d-grid col-12 mt-3">
          <button
            type="button"
            className="btn text-white"
            style={{ backgroundColor: "#1B6AEA", height: "36px" }}
            onClick={() =>
              window.open(
                "https://asset.digitalexchange.id/forms/Form%20CDD%202022%20DEX.pdf",
                "_blank"
              )
            }
          >
            Download CDD Document
          </button>
          <button
            type="button"
            className="btn text-primary mt-3"
            style={{ border: "1px solid #1B6AEA", height: "36px" }}
            onClick={() =>
              window.open(
                "mailto:support@digitalexchange.id"
              )
            }
          >
            Send email
          </button>
        </div>

        <div
          className="row mt-4"
          style={{ backgroundColor: "#E7E8F6", height: "5px" }}
        ></div>

        {userProfile ? (
          <>
            {/* current withdrawal limit / day : */}
            <div className="mt-3">
              <p className="fw-bold font-14">
                Your current withdrawal limit / day :
              </p>
              <div className="d-flex justify-content-between">
                <p className="font-12 ">Deposit Aset/Crypto:</p>
                <p className="font-14 fw-bold">No Limit</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="font-12  mb-0">
                  Asset/Crypto Withdrawal:
                </p>
                <div>
                  <p className="font-14 fw-bold mb-0 text-end">
                    Estimated {userProfile.remaining_daily_asset_wd} BTC
                  </p>
                  <p className="font-7 mb-2 text-end">
                    *The price of BTC used at{" "}
                    {!userProfile.remaining_amount_withdrawal
                      ? "00:00"
                      : userProfile.remaining_amount_withdrawal}{" "}
                    per day
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="font-12 ">Deposit Rupiah (IDR) :</p>
                <p className="font-14 fw-bold">No Limit /Day</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="font-12 ">
                  Withdrawal of Rupiah (IDR):
                </p>
                <p className="font-14 fw-bold">
                  {userProfile.max_daily_withdrawal} IDR /Day
                </p>
              </div>
            </div>
            <div
              className="row my-3"
              style={{ backgroundColor: "#E7E8F6", height: "5px" }}
            ></div>
            {/* profile information */}
            <div className="mt-3">
              {userProfile.verification_status === "UNSUBMIT" ? (
                <p className="font-18 fw-bold">
                  Profile{" "}
                  <span className="font-red">
                    <span className="ms-3 me-2">
                      <DashCircleFill />
                    </span>
                    Unverified
                  </span>
                </p>
              ) : userProfile.verification_status === "VERIFIED" ? (
                <p className="font-18 fw-bold">
                  Profile{" "}
                  <span className="font-green">
                    <span className="ms-3 me-2">
                      <PatchCheckFill />
                    </span>
                    Verified
                  </span>
                </p>
              ) : (
                ""
              )}
              {/* fullname */}
              <div>
                <p className="font-12 mb-2">Full name</p>
                <p className="font-14 fw-bold">
                  {!userProfile.fullname ? "-" : userProfile.fullname}
                </p>
              </div>
              {/* email */}
              <div>
                <p className="font-12 mb-2">Email</p>
                <p className="font-14 fw-bold">
                  {!userProfile.email ? "-" : userProfile.email}
                </p>
              </div>
              {/* Phone number */}
              <div>
                <p className="font-12 mb-2">Phone number</p>
                <p className="font-14 fw-bold">
                  {!userProfile.phone ? "-" : userProfile.phone}
                </p>
              </div>
              {/* Alternative Phone Number */}
              <div>
                <p className="font-12 mb-2">Alternative Phone Number</p>
                <p className="font-14 fw-bold">
                  {!userProfile.alt_phone ? "-" : userProfile.alt_phone}
                </p>
              </div>
              {/* Address */}
              <div>
                <p className="font-12 mb-2">Address</p>
                <p className="font-14 fw-bold">
                  {!userProfile.address ? "-" : userProfile.address}
                </p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* info */}
        <div className="d-flex p-2" style={{ backgroundColor: darkMode ? "grey": "#E7E8F6" }}>
          <p className="font-dark mb-0">
            <ExclamationCircleFill />
          </p>
          <p className="font-10 ms-2 mb-0">
            Your data is fully protected in our system and will remain
            confidential. Only you have complete control.
          </p>
        </div>

        {/* button Download CDD Document  */}
        <div className="d-grid col-12 mt-3">
       
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#1B6AEA", height: "45px" }}
             onClick={() => navigate("/kyc")}
            >
              Verify your account
            </button>
        
        </div>
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
                <a
                  className="text-center"
                  target="_blank"
                  href="https://help.digitalexchange.id/artikel/id/Bagaimana_Cara_Verifikasi_Data_Diri"
                >
                  <button
                    type="button"
                    className="btn bg-white mt-2"
                    style={{ height: "44px", color: "#0035EF" }}
                    data-bs-dismiss="modal"
                  >
                    Lihat Panduan KYC
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage

import React from "react"
import { ChevronLeft, QuestionCircleFill } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import PointCenterBanner from "../assets/point-banner.svg"
import PointTotalIcon from "../assets/point-total-icon.svg"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { IDRFormater } from "../helpers/currencyFormater"

function PointCenterPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const userProfile = JSON.parse(localStorage.getItem("data_user")).user

  const navigate = useNavigate()
  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
      >
        <div className="d-flex pt-2 align-items-center">
          <p className="font-20" onClick={() => navigate("/")}>
            <ChevronLeft />
          </p>
          <p className="font-15 fw-bold" style={{ marginLeft: "130px" }}>
            Point Center
          </p>
        </div>
      </div>
      <div style={{ height: "100vh" }}>
        <img
          src={PointCenterBanner}
          alt=""
          className="img-fluid mx-auto d-block"
          style={{
            position: "relative",
            zIndex: "1",
            marginTop: "-30px",
            width: "100%",
          }}
        />
        <div
          className={darkMode ? "bg-dark-mode text-white" : "bg-white"}
          style={{
            marginTop: "-90px",
            position: "relative",
            zIndex: "2",
            borderRadius: "25px 25px 0px 0px",
          }}
        >
          <div className="container text-roboto pt-3">
            <div className="d-flex">
              <p
                className="font-16 fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#point-modal"
              >
                My Points{" "}
                <QuestionCircleFill className="font-13 font-primary ms-2" />
              </p>
            </div>

            {userProfile ? (
              <p className="font- mb-0 mb-4 fw-bold" style={{ color: darkMode ? "#FFFFFF" : "grey" }}>
                {IDRFormater(+userProfile.point)}
              </p>
            ) : (
              ""
            )}

            {/* button  */}
            <div className="d-flex">
              <button
                type="button"
                className={
                  darkMode
                    ? "btn font-13 fw-bold bg-dark-mode2 border"
                    : "btn font-13 fw-bold"
                }
                style={{
                  border: "1px solid #118EEB",
                  width: "179px",
                  height: "38px",
                }}
              >
                <a
                  href="https://help.digitalexchange.id/artikel/id/Bagaimana-Cara-Menukarkan-Poin-Reward"
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: darkMode ? "white" : "black",
                    fontSize : 10
                  }}
                >
                  How to Redeem Points
                </a>
              </button>

              <button
                type="button"
                className="btn font-13 ms-2 text-white fw-bold"
                style={{
                  backgroundColor: "#1B6AEA",
                  width: "179px",
                  height: "38px",
                }}
              >
                <a
                  href="https://help.digitalexchange.id/artikel/id/Point-center"
                  target="_blank"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Center Point Rewards
                </a>
              </button>
            </div>

            {/* title */}
            <div
              className={
                darkMode
                  ? "d-flex mt-3 fw-bold py-2 bg-dark-mode2"
                  : "d-flex mt-3 fw-bold py-2"
              }
              style={{ backgroundColor: "#F1F9FF" }}
            >
              <div className="col-6">
                <p className="font-12 text-center mb-0">Task</p>
              </div>
              <div className="col-6">
                <p className="font-12 text-center mb-0">Total Points</p>
              </div>
            </div>

            {/* list points */}
            <div className="px-3">
              {/* 1 */}
              <div className="mt-3 d-flex fw-bold align-items-center">
                <div className="col-6">
                  <p className="font-12 mb-0">Daily Login</p>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <p className="font-12 text-center mb-0">5 Point</p>
                    <img
                      src={PointTotalIcon}
                      alt=""
                      className="img-fluid ms-2"
                    />
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="mt-3 d-flex fw-bold align-items-center">
                <div className="col-6">
                  <p className="font-12 mb-0">
                    IDR Deposit Minimum Rp. 5,000,000
                  </p>
                  <p className="font-10 font-red mb-0">
                    *Does not apply to multiples
                  </p>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <p className="font-12 text-center mb-0">1.000 Point</p>
                    <img
                      src={PointTotalIcon}
                      alt=""
                      className="img-fluid ms-2"
                    />
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="mt-3 d-flex fw-bold align-items-center">
                <div className="col-6">
                  <p className="font-12 mb-0">
                    Invite Friends/ Referral Program
                  </p>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <p className="font-12 text-center mb-0">200 Point</p>
                    <img
                      src={PointTotalIcon}
                      alt=""
                      className="img-fluid ms-2"
                    />
                  </div>
                </div>
              </div>
              {/* 4 */}
              <div className="mt-3 d-flex fw-bold align-items-center">
                <div className="col-6">
                  <p className="font-12 mb-0">
                    Perform Know Your Customer/ KYC
                  </p>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <p className="font-12 text-center mb-0">1.000 Point</p>
                    <img
                      src={PointTotalIcon}
                      alt=""
                      className="img-fluid ms-2"
                    />
                  </div>
                </div>
              </div>
              {/* 5 */}
              <div className="mt-3 d-flex fw-bold align-items-center">
                <div className="col-6">
                  <p className="font-12 mb-0">
                    Trading with volume IDR 25,000,000
                  </p>
                  <p className="font-10 font-red mb-0">*Applies multiply</p>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <p className="font-12 text-center mb-0">750 Point</p>
                    <img
                      src={PointTotalIcon}
                      alt=""
                      className="img-fluid ms-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p
              className="font-10 mt-3 font-primary fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#terms-condition-modal"
            >
              *Term & Condition
            </p>
          </div>
        </div>
      </div>

      {/* modal my point */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="point-modal"
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
            <div className="modal-body py-4 px-4">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={PointTotalIcon}
                  alt=""
                  className="img-fluid"
                  style={{ width: "25px", height: "25px" }}
                />
                <p className="fw-bold font-26 ms-2 mb-0">Point</p>
              </div>
              <p className="font-12 text-center mt-2">
                Your points will be deducted automatically after you change
                points. Every time you transact on digitalexchange.id, you have
                the opportunity to get various attractive prizes and many other
                benefits!
              </p>
              {/* button ok */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal term and confition */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="terms-condition-modal"
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
            <div className="modal-body py-4 px-4">
              <p className="fw-bold ms-2 mb-0 text-center font-14">
                Term & Condition
              </p>
              <ul className="font-10 my-3">
                <li>Points only valid on digitalexchange.id</li>
                <li>
                  Trading up to Rp. 25,000,000 per month will get 750 points and
                  apply multiples
                </li>
                <li>
                  Volume calculation is carried out every month in the period
                  from the beginning of the month to the end of the month and
                  the accumulated volume calculation that occurs will be divided
                  equally between the seller and the buyer of the asset
                </li>
                <li>
                  Points can be used for redemption according to the number of
                  points you have
                </li>
                <li>
                  Points received cannot be returned (Non-Refundable) and can be
                  cashed in part or in full
                </li>
                <li>
                  digitalexchange.id has the right to cancel transactions /
                  cancel the use of points if there are indications of fraud or
                  abuse.
                </li>
                <li>
                  digitalexchange.id has the right to change the terms and
                  conditions of points at any time without prior notice
                </li>
                <li>
                  By reading and knowing the terms and conditions of using this
                  voucher, we assume that the user understands and agrees to all
                  applicable terms and conditions
                </li>
              </ul>
              {/* button ok */}
              <div className="d-grid col-12 mt-4">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PointCenterPage

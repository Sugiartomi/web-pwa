import React from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BsInfoCircleFill } from "react-icons/bs"
import { BsDashLg } from "react-icons/bs"
import DashImg from "../assets/dash.jpg"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function ReOrderPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()

  return (
    <div
      className={darkMode ? "text-white" : ""}
      style={{ minHeight: "100vh" }}
    >
      <div className="container text-roboto mb-3">
        {/* title */}
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "130px" }}>
            Re-order
          </p>
        </div>
      </div>

      {/* info */}
      <div className="py-3" style={{ backgroundColor: "#FFEBF0" }}>
        <div className="container text-roboto d-flex align-items-center">
          <p className="font-25 mb-0 font-red">
            <AiOutlineInfoCircle />
          </p>
          <p className="font-14 font-red mb-0 ms-2">
            Sorry, your transaction has been updated after maintenance. Do you
            want to update your order transaction?
          </p>
        </div>
      </div>

      {/* select */}
      <div className="container text-roboto mt-2">
        <div className="form-check form-check-inline font-14">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
          <label className="form-check-label">Select All</label>
        </div>
        <div className="form-check form-check-inline ms-2 font-14">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
          <label className="form-check-label">Unselect All</label>
        </div>
      </div>
      {/* line bold non container */}
      <div
        className="mt-3"
        style={{ backgroundColor: "#F4F4F4", height: "8px" }}
      ></div>
      <div className="container text-roboto mt-2">
        {/* list */}
        <div className="mt-3" style={{ marginBottom: "90px" }}>
          {/* 1 */}
          <div className="form-check font-14 mb-3">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label fw-bold">BNB</label>
          </div>
          {/* 2 */}
          <div className="form-check font-14 mb-3">
            <input className="form-check-input" type="checkbox" value="" />
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="badge font-red font-14 bg-red-transparant px-3">
                  Sell
                </p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">BNB/IDR</p>
              </div>
              <div className="col-4">
                <p className="font-12">22-05-23 08:57:21</p>
              </div>
              <div className="col-3">
                <p
                  className="badge font-red font-14 bg-red-transparant px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-re-order"
                >
                  Delete
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="font-12">Price</p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">8.992.245 </p>
              </div>
              <div className="col-2 ms-auto">
                <p
                  className="text-center mb-0 font-18"
                  style={{ color: "#747474" }}
                  data-bs-toggle="modal"
                  data-bs-target="#modal-info-re-order"
                >
                  <BsInfoCircleFill />
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="font-12">Total IDR</p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">12.215.877</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="font-12">Qty</p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">2.24 BNB</p>
              </div>
            </div>
          </div>
          {/* line with container */}
          <div className="mb-3" style={{ border: "0.5px solid #DDE4EA" }}></div>
          {/* 3 */}
          <div className="form-check font-14 mb-3">
            <input className="form-check-input" type="checkbox" value="" />
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="badge font-red font-14 bg-red-transparant px-3">
                  Sell
                </p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">BNB/IDR</p>
              </div>
              <div className="col-4">
                <p className="font-12">22-05-23 08:57:21</p>
              </div>
              <div className="col-3">
                <p
                  className="badge font-red font-14 bg-red-transparant px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-re-order"
                >
                  Delete
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="font-12">Price</p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">8.992.245 </p>
              </div>
              <div className="col-2 ms-auto">
                <p
                  className="text-center mb-0 font-18"
                  style={{ color: "#747474" }}
                  data-bs-toggle="modal"
                  data-bs-target="#modal-info-re-order"
                >
                  <BsInfoCircleFill />
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="font-12">Total IDR</p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">12.215.877</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <p className="font-12">Qty</p>
              </div>
              <div className="col-3">
                <p className="font-14 fw-bold text-center">2.24 BNB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* total re order */}
      <div className={ darkMode ? "fixed-navbar py-3 col-12 width-breakpoint bg-dark-mode2" : "fixed-navbar py-3 col-12 width-breakpoint"}>
        <div className="container text-roboto d-flex justify-content-between align-items-center">
          <p className="font-18 mb-0">Total Re-Order</p>
          <button
            type="button"
            className="btn text-white px-3"
            style={{ backgroundColor: "#1B6AEA" }}
          >
            Confirm (2)
          </button>
        </div>
      </div>

      {/* modal delete re order */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="delete-re-order"
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
              <img src={DashImg} alt="" className="img-fluid mx-auto d-block" />
              <p className="font-24 fw-bold text-center mt-2">
                Hapus 1 Re-order ?
              </p>
              <p className="font-18 text-center">
                Order yang kamu pilih akan <br /> dihapus dari list re-order
              </p>
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "43px" }}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="btn mt-2 border-0"
                  style={{ height: "43px" }}
                  data-bs-dismiss="modal"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal order information */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-info-re-order"
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
              <img src={DashImg} alt="" className="img-fluid mx-auto d-block" />
              <img
                src="https://cutewallpaper.org/24/image-placeholder-png/android-case-study-placeholder-image-and-memory-consumption-by-nemanja-kovacevic-nemanja-kovacevic-medium.png"
                alt=""
                className="img-fluid mx-auto d-block mt-3"
                style={{ height: "116px", width: "338px", objectFit: "cover" }}
              />
              <p className="font-14 text-center mt-3">
                Semua order pending (partial filled) akan tereksekusi menjadi
                order baru dengan ketentuan minimal order yang ada di
                digitalexchange.id Lihat info lengkap.
              </p>
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "43px" }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReOrderPage

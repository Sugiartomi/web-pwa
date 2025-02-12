import React, { useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import SuccessImg from "../assets/success-order.svg"
import ResetSecurityImg from "../assets/mdi_lock-reset.svg"
import EmailImg from "../assets/email-modal.svg"
import axiosConfig from "../config/axios"
import { getTheme } from "../recoil/theme.State"
import { useRecoilState } from "recoil"
import swal from "sweetalert"

function SecurityVerificationPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const path = useLocation()
  localStorage.setItem("path", JSON.stringify(path))

  console.log(path, "masuk")

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const [input, setInput] = useState({
    PIN: "",
    "2FA": "",
  })

  const handleInput = (e) => {
    e.preventDefault()
    const param = e.target.name

    setInput({
      ...input,
      [param]: e.target.value,
    })
  }

  function handleGenerateVoucher(input) {}
  function handleDeleteAccount(input) {}
  function handleWDIdr(input) {}

  const HandleWDAsset = (input) => {}
  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ minHeight: "100vh" }}
      >
        <div className="pt-2">
          <p className="font-20 fw-bolder" onClick={() => navigate("/")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold">Security Verification</p>
          <p className="font-12">
            To secure your account, please complete <br /> following
            verification.
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="font-14">PIN code digitalexchangeid</label>
            <input
              type="number"
              name="PIN"
              className={
                darkMode
                  ? "form-control voucher-form bg-dark-mode2 text-white border-0 shadow-none"
                  : "form-control voucher-form shadow-none"
              }
              placeholder="Input PIN digitalexchangeid"
              style={{ height: "42px" }}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="font-14">2FA Authenticator Code </label>
            <div
              className={
                darkMode
                  ? "d-flex align-items-center border-0 bg-dark-mode2 rounded shadow-none"
                  : "d-flex align-items-center border rounded shadow-none"
              }
              style={{ height: "42px" }}
            >
              <div className="col-10">
                <input
                  type="number"
                  name="2FA"
                  className={
                    darkMode
                      ? "form-control voucher-form bg-dark-mode2 text-white border-0 shadow-none"
                      : "form-control voucher-form shadow-none"
                  }
                  placeholder="Enter Amount"
                  onChange={handleInput}
                />
              </div>
              <div className="col-2">
                <p
                  className={
                    darkMode
                      ? "text-white mb-0 ms-2 font-12"
                      : "font-primary mb-0 ms-2 font-12"
                  }
                >
                  Paste
                </p>
              </div>
            </div>
          </div>

          {/* button submit */}
          <div className="d-grid col-12">
            {path.state !== null && path.state.name === "delete-account" ? (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                data-bs-toggle="modal"
                data-bs-target="#delete-account"
                onClick={() => handleDeleteAccount(input)}
              >
                Send
              </button>
            ) : path.state !== null &&
              path.state.name === "withdrawal-asset" ? (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                data-bs-toggle="modal"
                data-bs-target="#withdrawal-asset-modal"
              >
                Send
              </button>
            ) : path.state !== null && path.state.name === "withdrawal" ? (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                data-bs-toggle="modal"
                data-bs-target="#withdrawal-modal"
              >
                Send
              </button>
            ) : path.state !== null &&
              path.state.name === "generate-voucher" ? (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                data-bs-toggle="modal"
                data-bs-target="#security-verification-modal"
                onClick={() => handleGenerateVoucher(input)}
              >
                Send
              </button>
            ) : localStorage.getItem("wd_idr") ? (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                // data-bs-toggle="modal"
                // data-bs-target="#security-verification-modal"
                onClick={() => handleWDIdr(input)}
              >
                Send
              </button>
            ) : localStorage.getItem("wd_asset") ? (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                // data-bs-toggle="modal"
                // data-bs-target="#security-verification-modal"
                onClick={() => HandleWDAsset(input)}
              >
                Send
              </button>
            ) : (
              <button
                type="submit"
                className="form-control text-white shadow-none"
                style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                data-bs-toggle="modal"
                data-bs-target="#security-verification-modal"
              >
                Send
              </button>
            )}
          </div>
          <p
            className="font-14 text-center mt-4 font-primary fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#reset-security-features"
          >
            Forgot Google Authenticator Code?
          </p>
        </form>
      </div>

      {/* modal security verification */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="security-verification-modal"
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
              <p className="font-20 fw-bold text-center">
                Voucher Creation <br /> Request Sent
              </p>
              <img
                src={SuccessImg}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              {!localStorage.getItem("wd_idr") &&
              !localStorage.getItem("wd_asset") ? (
                <div className="text-center">
                  <p className="font-14 mb-0">{path.state.amount}</p>
                  <p className="font-14 mb-0">{path.state.email}</p>
                </div>
              ) : (
                ""
              )}

              <div
                className="mt-3 p-2"
                style={{ backgroundColor: "#FCF4DD", color: "#885D09" }}
              >
                <p className="font-14 text-center mb-0">
                  Please check your email torasuman@gmail.com to confirm the
                  making of the voucher.
                </p>
              </div>
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

      {/* modal reset security */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="reset-security-features"
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
              <img
                src={ResetSecurityImg}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p className="text-center font-20 fw-bold">
                Reset Security Features
              </p>
              <div
                className="p-2 text-center"
                style={{ backgroundColor: "#FEF1F2" }}
              >
                <p className="font-14 font-red mb-0">
                  To reset 2FA, Please contact live chat. For detailed
                  information, click below{" "}
                </p>
              </div>
              {/* button ok */}
              <div className="d-grid col-12 mt-4">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                >
                  <a
                    href="https://help.digitalexchange.id/home/id"
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Visit Helpdesk
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal delete accout */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="delete-account"
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
              <p className="font-22 fw-bold text-center">
                One More Stage ! <br /> Please check your email
              </p>
              <img
                src={EmailImg}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p
                className="font-14 text-center p-2 rounded"
                style={{ color: "#A56D00", backgroundColor: "#FCF4DD" }}
              >
                If you don't find the email, please check the spam or promotion
                section.
              </p>
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "39px" }}
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal delete accout */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="withdrawal-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className="modal-content rounded border-0 py-2"
            id="modal-addBankAccount"
            style={{ width: "340px" }}
          >
            <div className="modal-body px-5">
              <p className="font-22 fw-bold">Autentikasi Keamanan</p>
              <p className="font-12 font-modal-withdrawal-confirm">
                Untuk mengamankan transaksi, harap selesaikan verifikasi
                berikut.
              </p>
              <form action="">
                <label className="font-15 fobt-dark">Date</label>
                <input type="date" className="form-control" />
                {/* button */}
                <div className="row gx-2 mt-3">
                  <div className="d-grid col-6">
                    <button
                      type="button"
                      className="btn font-red"
                      style={{ border: "1px solid #F4465E" }}
                      data-bs-dismiss="modal"
                    >
                      Batal
                    </button>
                  </div>
                  <div className="d-grid col-6">
                    <button
                      type="button"
                      className="btn text-white"
                      style={{ backgroundColor: "#1B6AEA" }}
                      data-bs-dismiss="modal"
                      onClick={() =>
                        navigate(`/asset-detail/${path.state.pair}`)
                      }
                    >
                      Konfirmasi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* modal wd asset */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="withdrawal-asset-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className="modal-content rounded border-0 py-2"
            id="modal-addBankAccount"
            style={{ width: "340px" }}
          >
            <div className="modal-body px-5">
              <p className="font-22 fw-bold">Autentikasi Keamanan</p>
              <p className="font-12 font-modal-withdrawal-confirm">
                Untuk mengamankan transaksi, harap selesaikan verifikasi
                berikut.
              </p>
              <form action="">
                <label className="font-15 fobt-dark">Date</label>
                <input type="date" className="form-control" />
                {/* button */}
                <div className="row gx-2 mt-3">
                  <div className="d-grid col-6">
                    <button
                      type="button"
                      className="btn font-red"
                      style={{ border: "1px solid #F4465E" }}
                      data-bs-dismiss="modal"
                    >
                      Batal
                    </button>
                  </div>
                  <div className="d-grid col-6">
                    <button
                      type="button"
                      className="btn text-white"
                      style={{ backgroundColor: "#1B6AEA" }}
                      data-bs-dismiss="modal"
                      onClick={() =>
                        navigate(`/asset-detail/${path.state.pair}`)
                      }
                    >
                      Konfirmasi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SecurityVerificationPage

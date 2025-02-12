import React, { useEffect, useState } from "react"
import { ChevronLeft, ClockFill } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import SuccessRedeemImg from "../assets/success-order.svg"
import axiosConfig from "../config/axios"
import Copy03 from "@untitled-ui/icons-react/build/cjs/Copy03"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { DBvoucherHistory } from "../DB/VoucherPage"


function VoucherPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const userToken = localStorage.getItem("token")
  const [voucherHistory, setVoucherHistory] = useState([])

  const [inputCreateVoucher, setInputCreateVoucher] = useState({
    amount: "",
    email: "",
  })
  const [inputRedeemVoucher, setInputRedeemVoucher] = useState()

  const handleInput = (e) => {
    e.preventDefault()

    const from = e.target.name.split("-")[1]
    const param = e.target.name.split("-")[0]

    if (from === "generate") {
      setInputCreateVoucher({
        ...inputCreateVoucher,
        [param]: e.target.value,
      })
    }
    if (from === "redeem") {
      setInputRedeemVoucher(e.target.value)
    }
  }

  useEffect(() => {
    console.log(DBvoucherHistory);
    setVoucherHistory(DBvoucherHistory)
  }, [])

  const navigate = useNavigate()
  const [current, setCurrent] = useState("Redeem Voucher")

  const handleRedeemVoucher = (event) => {
    event.preventDefault()
  }

  const handleGenerateVoucher = (event) => {
    event.preventDefault()

    // navigate("/security-verification");
  }

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
        <div className="d-flex pt-2 align-items-center">
          <p className="font-20" onClick={() => navigate("/")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "130px" }}>
            Voucher
          </p>
        </div>

        <div
          className="p-2 mb-4"
          style={{
            backgroundColor: darkMode ? "#282A32" : "#F9F9F9",
            borderRadius: 15,
          }}
        >
          <div className="d-flex text-center">
            <div
              className="fw-bold p-2 w-100"
              onClick={() => setCurrent("Redeem Voucher")}
              style={
                current === "Redeem Voucher"
                  ? {
                      background: darkMode ? "#2F343E" : "#282A32",
                      borderRadius: 8,
                      color: "white",
                    }
                  : { background: "#282A32", borderRadius: 8, color: "#A69C9C" }
              }
            >
              Redeem
            </div>
            <div
              className="fw-bold p-2 w-100 ms-2"
              onClick={() => setCurrent("Generate Voucher")}
              style={
                current === "Generate Voucher"
                  ? {
                      background: darkMode ? "#2F343E" : "#282A32",
                      borderRadius: 8,
                      color: "white",
                    }
                  : { background: "#282A32", borderRadius: 8, color: "#A69C9C" }
              }
            >
              Generate
            </div>
            <div
              className="fw-bold p-2 w-100 ms-2"
              onClick={() => setCurrent("History")}
              style={
                current === "History"
                  ? {
                      background: darkMode ? "#2F343E" : "#282A32",
                      borderRadius: 8,
                      color: "white",
                    }
                  : { background: "#282A32", borderRadius: 8, color: "#A69C9C" }
              }
            >
              History
            </div>
          </div>
        </div>

        {current === "Redeem Voucher" ? (
          <>
            <form action="" onSubmit={handleRedeemVoucher}>
              <div
                className="d-flex justify-content-between"
                style={{ flexDirection: "column", height: "80vh" }}
              >
                <div>
                  <div
                    className=" mt-3 py-2 px-2 font-red rounded"
                    style={{
                      backgroundColor: darkMode ? "#282A32" : "#FEF1F2",
                    }}
                  >
                    <p className="font-16 fw-bold mb-0 ms-2">Attention!</p>
                    <p className="font-12 mb-0 ms-2 mt-2">
                      You have entered the wrong voucher code 5 times,
                      temporarily you cannot use this voucher feature for the
                      next 2 hours. Please try again later. Thank You
                    </p>
                  </div>
                  <div>
                    <label className="font-14 fw-bold mb-2 mt-5">
                      Voucher Code
                    </label>
                    <div
                      className={
                        darkMode
                          ? "card pe-3 py-1  bg-dark-mode2"
                          : "card pe-3 py-1"
                      }
                    >
                      <div className="d-flex align-items-center ">
                        <div className="w-100 ">
                          <input
                            type="text"
                            className={
                              darkMode
                                ? "form-control voucher-form border-0 shadow-none bg-dark-mode2 text-white"
                                : "form-control voucher-form border-0 shadow-none"
                            }
                            placeholder="Input Voucher Code"
                            style={{ height: "42px" }}
                            onChange={handleInput}
                            value={inputRedeemVoucher}
                            name="non-redeem"
                          />
                        </div>
                        <div
                          className=""
                          onClick={() => {
                            navigator.clipboard
                              .readText()
                              .then((text) => {
                                setInputRedeemVoucher(text)
                              })
                              .catch((err) => {
                                console.error(
                                  "Failed to read clipboard contents: ",
                                  err
                                )
                              })
                          }}
                        >
                          <Copy03 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className={
                      darkMode
                        ? "mt-3 py-2 px-2 fw-bold rounded bg-secondary text-white"
                        : "mt-3 py-2 px-2 fw-bold rounded text-primary"
                    }
                    style={{
                      backgroundColor: darkMode ? "#282A32" : "#F0F9FF",
                    }}
                  >
                    <ul className="font-12">
                      <li className="mb-0">
                        If you already have a voucher code, enter the code to
                        exchange the voucher for your Rupiah balance on
                        digitalexchangeid. You can buy vouchers from our
                        partners.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="mt-3 py-2 px-2 font-primary fw-bold rounded"
                    style={{
                      backgroundColor: darkMode ? "#282A32" : "#FFFAEB",
                      color: darkMode ? "#E0B335" : "#86774E",
                    }}
                  >
                    <p className="font-12 text-center mb-0">
                      Click Here for Official online exchanger
                    </p>
                  </div>

                  {/* button reedem */}
                  <div className="d-grid col-12 mt-3">
                    <button
                      type="submit"
                      className="btn text-white"
                      style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#redeem-voucher-modal"
                    >
                      Redeem Voucher
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : current === "Generate Voucher" ? (
          <>
            <form action="" onSubmit={handleGenerateVoucher}>
              <div
                className="d-flex justify-content-between"
                style={{ flexDirection: "column", height: "80vh" }}
              >
                <div>
                  <div className="mb-3">
                    <label className="font-14">Amount of Rupiah</label>
                    <input
                      type="number"
                      className={
                        darkMode
                          ? "form-control voucher-form shadow-none bg-dark-mode2 text-white border-0"
                          : "form-control voucher-form shadow-none"
                      }
                      placeholder="Masukkan Jumlah Rupiah"
                      style={{ height: "42px" }}
                      name="amount-generate"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="font-14">Recipient's Email</label>
                    <input
                      type="email"
                      className={
                        darkMode
                          ? "form-control voucher-form shadow-none bg-dark-mode2 text-white border-0"
                          : "form-control voucher-form shadow-none"
                      }
                      placeholder="Masukkan Email"
                      style={{ height: "42px" }}
                      name="email-generate"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div>
                  <div
                    className="d-flex mt-3 py-2 px-2 font-red fw-bold rounded"
                    style={{
                      backgroundColor: darkMode ? "#282A32" : "#FEF1F2",
                    }}
                  >
                    <p className="mb-0">
                      <ClockFill />
                    </p>
                    <p className="font-12 mb-0 ms-2">
                      For security, users cannot send or withdraw Rupiah/Assets
                      for 48 hours after the 2FA reset process is approved
                    </p>
                  </div>

                  <div
                    className={
                      darkMode
                        ? "mt-3 py-2 px-2 font-primary fw-bold rounded bg-secondary text-white"
                        : "mt-3 py-2 px-2 font-primary fw-bold rounded"
                    }
                    style={{ backgroundColor: "#F0F9FF" }}
                  >
                    <ul className="font-12">
                      <li>
                        Save the Voucher Code correctly, and make sure that only
                        the recipient is who can find out the Voucher Code that
                        you created.
                      </li>
                      <li>
                        The limit of vouchers that you can make per day is
                        accumulated with the daily withdrawal limit of IDR.
                      </li>
                      <li>The minimum for making a voucher is IDR 10,000</li>
                      <li>
                        The balance after making the voucher must be at least
                        IDR 1,000 left.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="my-3 py-2 px-2 font-primary fw-bold rounded"
                    style={{
                      backgroundColor: darkMode ? "#282A32" : "#FFFAEB",
                      color: darkMode ? "#E0B335" : "#86774E",
                    }}
                  >
                    <p className="font-12 text-center mb-0">
                      Daily Withdrawal Limit at IDR 200,000,000 (Click here)
                    </p>
                  </div>
                  {/* button generate */}
                  <div className="d-grid col-12 mt-3">
                    <button
                      type="submit"
                      className="btn text-white"
                      style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                    >
                      Generate Voucher
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : current === "History" ? (
          <>
            {/* title */}
            <div
              className="d-flex p-2"
              style={{ backgroundColor: darkMode ? "#282A32" : "#F4F8FC" }}
            >
              <div className="col-4">
                <p className="font-10 mb-0 text-start">Amount of Rupiah</p>
              </div>
              <div className="col-4">
                <p className="font-10 mb-0 text-center">Voucher Code</p>
              </div>
              <div className="col-4">
                <p className="font-10 mb-0 text-end">Status</p>
              </div>
            </div>

            {/* history list */}
            <div className="mt-3">
              {voucherHistory.length
                ? voucherHistory === "Tidak ada history"
                  ? voucherHistory
                  : voucherHistory.map((e) => {
                      if (e.status_approval === "WAITING") {
                        return (
                          <>
                            {/* pending */}
                            <div className="d-flex">
                              <div className="col-4">
                                <p className="font-10 mb-0">
                                  Generated Voucher
                                </p>
                                <p className="font-16 fw-bold mb-0">
                                  {e.quantity}
                                </p>
                                <p
                                  className="font-8 badge px-2"
                                  style={{
                                    color: darkMode ? "black" : "#C17A0F",
                                    backgroundColor: darkMode
                                      ? "#F4B946"
                                      : "#FFFADD",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Belum terpakai
                                </p>
                              </div>
                              <div className="col-4">
                                <p className="font-10 mb-0 text-center">
                                  {e.voucher_code}
                                </p>
                              </div>
                              <div className="col-4 d-flex">
                                <div className="ms-auto">
                                  <p
                                    className="font-14 badge px-4 mb-1"
                                    style={{
                                      backgroundColor: darkMode
                                        ? "#F4B946"
                                        : "#FFFADD",
                                      color: darkMode ? "black" : "#F4B946",
                                      width: "100px",
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#history-modal"
                                  >
                                    Pending
                                  </p>
                                  <p className="font-9 text-center">
                                    {e.timestamp.date.slice(0, 16)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      } else if (e.status_approval === "CANCELLED") {
                        return (
                          <>
                            {/* batal */}
                            <div className="d-flex">
                              <div className="col-4">
                                <p className="font-10 mb-0">
                                  Generated Voucher
                                </p>
                                <p className="font-16 fw-bold mb-0">
                                  {e.quantity}
                                </p>
                                <p
                                  className="font-8 badge px-2"
                                  style={{
                                    backgroundColor: darkMode
                                      ? "#F4465E"
                                      : "#FFDDDD",
                                    color: darkMode ? "white" : "#F4465E",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Batal
                                </p>
                              </div>
                              <div className="col-4">
                                <p className="font-10 mb-0 text-center">
                                  {e.voucher_code}
                                </p>
                              </div>
                              <div className="col-4 d-flex">
                                <div className="ms-auto">
                                  <p
                                    className="font-14 badge px-4 mb-1"
                                    style={{
                                      backgroundColor: darkMode
                                        ? "#F4465E"
                                        : "#FFDDDD",
                                      color: darkMode ? "white" : "#F4465E",
                                      width: "100px",
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#history-modal"
                                  >
                                    Batal
                                  </p>
                                  <p className="font-9 text-center">
                                    {e.timestamp.date.slice(0, 16)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      } else if (e.status_approval === "APPROVED") {
                        if (e.status === "used") {
                          return (
                            <>
                              {" "}
                              {/* aktif */}
                              <div className="d-flex">
                                <div className="col-4">
                                  <p className="font-10 mb-0">
                                    Generated Voucher
                                  </p>
                                  <p className="font-16 fw-bold mb-0">
                                    {e.quantity}
                                  </p>
                                  <p
                                    className="font-8 badge px-2"
                                    style={{
                                      backgroundColor: darkMode
                                        ? "#266DE0"
                                        : "#F0F9FF",
                                      color: darkMode ? "white" : "#1B6AEA",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Belum terpakai
                                  </p>
                                </div>
                                <div className="col-4">
                                  <p className="font-10 mb-0 text-center">
                                    {e.voucher_code}
                                  </p>
                                </div>
                                <div className="col-4 d-flex">
                                  <div className="ms-auto">
                                    <p
                                      className="font-14 badge px-4 mb-1"
                                      style={{
                                        backgroundColor: darkMode
                                          ? "#266DE0"
                                          : "#F0F9FF",
                                        color: darkMode ? "white" : "#1B6AEA",
                                        width: "100px",
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#history-modal"
                                    >
                                      Aktif
                                    </p>
                                    <p className="font-9 text-center">
                                      {e.timestamp.date.slice(0, 16)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        } else if (e.status === "not_used") {
                          return (
                            <>
                              {" "}
                              {/* success */}
                              <div className="d-flex">
                                <div className="col-4">
                                  <p className="font-10 mb-0">
                                    Generated Voucher
                                  </p>
                                  <p className="font-16 fw-bold mb-0">
                                    {e.quantity}
                                  </p>
                                  <p
                                    className="font-8 badge px-2"
                                    style={{
                                      backgroundColor: darkMode
                                        ? "#05BB59"
                                        : "#DDFFE7",
                                      color: darkMode ? "white" : "#20CB6F",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Sudah Terpakai
                                  </p>
                                </div>
                                <div className="col-4">
                                  <p className="font-10 mb-0 text-center">
                                    {e.voucher_code}
                                  </p>
                                </div>
                                <div className="col-4 d-flex">
                                  <div className="ms-auto">
                                    <p
                                      className="font-14 badge px-4 mb-1"
                                      style={{
                                        backgroundColor: darkMode
                                          ? "#05BB59"
                                          : "#DDFFE7",
                                        color: darkMode ? "white" : "#20CB6F",
                                        width: "100px",
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#history-modal"
                                    >
                                      Sukses
                                    </p>
                                    <p className="font-9 text-center">
                                      {e.timestamp.date.slice(0, 16)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        }
                      }
                    })
                : "Loading..."}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* modal redeem voucher */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="redeem-voucher-modal"
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
              <p className="fw-bold font-24 ms-2 mb-0 text-center">
                Redeem Voucher Successful
              </p>
              <img
                src={SuccessRedeemImg}
                alt=""
                className="img-fluid mx-auto d-block my-3"
              />
              <p className="font-14 text-center">
                Redeem Voucher worth 1,500,000 IDR <br /> have been successfully
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

      {/* modal history */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="history-modal"
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
              <p className="font-13 font-primary">Generate Voucher</p>
              <div className="mt-3">
                <p className="font-13 mb-0">Status</p>
                <p className="font-13 font-green mb-0">Success</p>
              </div>
              <div className="mt-3">
                <p className="font-13 mb-0">Amount</p>
                <p className="font-13 mb-0">Rp 500,121</p>
              </div>
              <div className="mt-3">
                <p className="font-13 mb-0">Email Recipient</p>
                <p className="font-13 mb-0">admin@inchanger.com</p>
              </div>
              <div className="mt-3">
                <p className="font-13 mb-0">Voucher Code</p>
                <p className="font-13 mb-0 font-primary">
                  BTC-IDR-NW4P7SS6-0TXOURAV-ONGF -AMLW-2WCV2WF-AOJFJ1VM
                </p>
              </div>
              {/* button ok */}
              <div className="d-grid col-12 mt-3">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
              <div className="mt-3">
                <p className="font-13 mb-0">Waktu</p>
                <p className="font-13 mb-0">17-07-2021, 11:30:89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VoucherPage

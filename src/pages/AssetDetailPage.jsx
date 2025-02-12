import React, { useEffect, useState } from "react"
import { ArrowBarRight, ArrowRight, ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import NoDataImg from "../assets/no-history.svg"
import axiosConfig from "../config/axios"
import { handleGetData } from "../helpers/dataFunction"
import { useDispatch, useSelector } from "react-redux"
import { FaStore } from "react-icons/fa"
import { IDRFormater } from "../helpers/currencyFormater"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { DBDepositHistory, DBWithdrawalHistory } from "../DB/AssetDetail"

function AssetDetailPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const [history, setHistory] = useState("Deposit History")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { name } = useParams()
  const { state } = useLocation()

  const userToken = localStorage.getItem("token")

  // const assetName = name.split("/")[2].split("-")[0]
  // const pairName = name.split("/")[2].split("-")[1]
  const [txid, setTxid] = useState("")
  const [showTxid, setShowTxid] = useState("")
  const [btnCopy, setBtnCopy] = useState("Copy TxID")

  // state deposit & withdraw history
  const [depositHistory, setDepositHistory0] = useState(DBDepositHistory)
  const [withdrawHistory, setWithdrawHistory] = useState(DBWithdrawalHistory)


  const getDataNetwork = () => {
    navigate(`/deposit/${name}`)
  }

  const handleTXID = (data) => {
    let temp = ""
    for (let i = 0; i < data.length; i++) {
      const perData = data[i]
      if (i % 30 === 0) {
        temp += "\n"
        temp += perData
      } else {
        temp += perData
      }
    }
    setShowTxid(temp)
  }

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto pt-3 text-white"
            : "container text-roboto pt-3"
        }
        style={{ minHeight: "100vh" }}
      >
        {/* title */}
        <div className="d-flex align-items-center">
          <p className="fw-bold" onClick={() => navigate("/wallet")}>
            <ChevronLeft />
          </p>
          <p className="fw-bold" style={{ marginLeft: "120px" }}>
            Asset Details
          </p>
        </div>

        {state && (
          <>
            {/* coin name */}
            <div className="d-flex mt-3 justify-content-between align-items-center">
              <p className="font-24 fw-bold ms-2 mb-0">{name}</p>
              <img
                src={state.img_url}
                alt=""
                className="img-fluid"
                style={{ width: "50px", height: "50px" }}
              />
            </div>

            <div
              className={
                darkMode
                  ? "card mt-4 shadow border-0 bg-dark-mode2"
                  : "card mt-4 shadow border-0"
              }
              style={{ borderRadius: 10 }}
            >
              <div className=" p-3">
                {/* total asset */}
                <div className="mt-3">
                  <p className="font-14 mb-0">Total Value Asset</p>
                  <div className="font-24 fw-bold text-inter">
                    {+state.amount + +state.amount_frozen} {name}
                  </div>
                </div>

                {/* available, in order */}
                <div
                  className="d-flex mt-3 text-inter text-center"
                  style={{ borderRadius: 10, border: "1px solid grey" }}
                >
                  <div className="p-2 w-100" style={{ borderRadius: 10 }}>
                    <p className="font-12 mb-0">Available</p>
                    <p className="font-16 fw-bold mb-0">
                      {IDRFormater(+state.amount)} {name}
                    </p>
                  </div>
                  <div className="bg-secondary" style={{ width: 1 }}></div>
                  <div className="p-2  w-100" style={{ borderRadius: 10 }}>
                    <p className="font-12 mb-0">In Order</p>
                    <p className="font-16 fw-bold mb-0">
                      {IDRFormater(+state.amount_frozen)} {name}
                    </p>
                  </div>
                </div>

                {/* Estimated Value IDR */}
                <div
                  className="mt-2 p-2 text-center text-inter"
                  style={{
                    backgroundColor: darkMode ? "#282A32" : "#FFFFFF",
                    borderRadius: 10,
                    border: "1px solid grey",
                  }}
                >
                  <p className="font-12 mb-0">Estimated Value IDR</p>
                  <p className="font-16 fw-bold mb-0">
                    {IDRFormater(+state.estimatedIDR.toFixed(0))} IDR
                  </p>
                </div>
              </div>
              {name !== "IDR" ? (
                <div
                  className="bg-dark text-white py-2 font-14 ps-3"
                  style={{ borderRadius: "0 0 10px 10px" }}
                  onClick={() => navigate(`/market/${name}-IDR`)}
                >
                  <FaStore className="me-2" /> Go To Market{" "}
                  <ArrowRight className="ms-3" />
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        )}

        <p className="fw-bold text-inter font-24 mb-2 mt-4">History</p>

        {/* option */}
        <div
          className="d-flex justify-content-around  py-1 px-1"
          style={{
            borderRadius: 10,
            backgroundColor: darkMode ? "#282A32" : "#F9F9F9",
          }}
        >
          <div
            className="px-3 py-2 w-100 text-center"
            style={
              history === "Deposit History"
                ? {
                    backgroundColor: darkMode ? "#2F343E" : "#282A32",
                    color: "#FFFFFF",
                    borderRadius: 10,
                  }
                : {
                    backgroundColor: darkMode ? "#282A32" : "#F9F9F9",
                    color: "#A69C9C",
                    borderRadius: 10,
                  }
            }
            onClick={() => setHistory("Deposit History")}
          >
            <p className="font-14 fw-bold mb-0">Deposit History</p>
          </div>
          <div
            className="px-3 py-2 w-100 text-center"
            style={
              history === "Withdrawal History"
                ? {
                    backgroundColor: darkMode ? "#2F343E" : "#282A32",
                    color: "#FFFFFF",
                    borderRadius: 10,
                  }
                : {
                    backgroundColor: darkMode ? "#282A32" : "#F9F9F9",
                    color: "#A69C9C",
                    borderRadius: 10,
                  }
            }
            onClick={() => setHistory("Withdrawal History")}
          >
            <p className="font-14 fw-bold mb-0">Withdrawal History</p>
          </div>
        </div>

        {/* deposit history */}
        {history === "Deposit History" ? (
          <>
            <div className="mt-4" style={{ marginBottom: "80px" }}>
              {/* deposit IDR */}
              {depositHistory ? (
                depositHistory.length !== 0 ? (
                  depositHistory.map((el, index) => {
                    if (el.currency === name) {
                      return (
                        <>
                          <div className="row">
                            <div className="col-4">
                              <div className="fw-bold">{el.currency}</div>
                              <div className="font-10 mt-2">
                                <div>{el.date.date.slice(11, 16)}</div>
                                <div>{el.date.date.slice(0, 10)}</div>
                              </div>
                            </div>
                            <div className="col-5 text-center">
                              <div className="d-flex align-items-center h-100 justify-content-center w-100">
                                <div>
                                  <div>
                                    <span className="fw-bold">
                                      {el.amount.replace(".", ",")}
                                    </span>{" "}
                                    {el.currency}
                                  </div>
                                  {el.txid ? (
                                    <div
                                      className="font-10  mt-1 text-primary px-3"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_show_txid"
                                      onClick={() => {
                                        setTxid(el.txid)
                                        handleTXID(el.txid)
                                        setBtnCopy("Copy TxID")
                                      }}
                                    >
                                      {el.txid.slice(0, 15) + "....."}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="d-flex align-items-center justify-content-end h-100">
                                {el.status === "CANCELLED" ? (
                                  <p
                                    className="text-center rounded fw-bold font-12 p-2 mb-2"
                                    style={{
                                      backgroundColor: "#FFEDED",
                                      color: "#F4465E",
                                    }}
                                  >
                                    Cancelled
                                  </p>
                                ) : el.status === "PENDING" ? (
                                  <p
                                    className="text-center rounded fw-bold font-12 p-2 mb-2 text-warning"
                                    style={{ backgroundColor: "#FEF1F2" }}
                                  >
                                    Pending
                                  </p>
                                ) : el.status === "SUCCESS" ? (
                                  <p
                                    className="text-center rounded fw-bold font-12 p-2 mb-2"
                                    style={{
                                      backgroundColor: "#E8FFE8",
                                      color: "#20CB6F",
                                    }}
                                  >
                                    Success
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      )
                    }
                  })
                ) : (
                  <p className="font-14">Loading ...</p>
                )
              ) : (
                <img
                  src={NoDataImg}
                  alt=""
                  className="img-fluid mx-auto d-block mt-5"
                />
              )}
            </div>
          </>
        ) : history === "Withdrawal History" ? (
          <div className="mt-4" style={{ marginBottom: "80px" }}>
            {/* deposit IDR */}
            {withdrawHistory ? (
              withdrawHistory.length !== 0 ? (
                withdrawHistory.map((el, index) => {
                  if (el.currency === name) {
                    return (
                      <>
                        <div className="row">
                          <div className="col-4">
                            <div className="fw-bold">{el.currency}</div>
                            <div className="font-10 mt-2">
                              <div>{el.date.date.slice(11, 16)}</div>
                              <div>{el.date.date.slice(0, 10)}</div>
                            </div>
                          </div>
                          <div className="col-5 text-center">
                            <div className="d-flex align-items-center h-100 justify-content-center w-100">
                              <div>
                                <div>
                                  <span className="fw-bold">
                                    {el.amount.replace(".", ",")}
                                  </span>{" "}
                                  {el.currency}
                                </div>
                                {el.txid ? (
                                  <div
                                    className="font-10  mt-1 text-primary px-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal_show_txid"
                                    onClick={() => {
                                      setTxid(el.txid)
                                      handleTXID(el.txid)
                                      setBtnCopy("Copy TxID")
                                    }}
                                  >
                                    {el.txid.slice(0, 15) + "....."}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="d-flex align-items-center justify-content-end h-100">
                              {el.status === "CANCELLED" ? (
                                <p
                                  className="text-center rounded fw-bold font-12 p-2 mb-2"
                                  style={{
                                    backgroundColor: "#FFEDED",
                                    color: "#F4465E",
                                  }}
                                >
                                  Cancelled
                                </p>
                              ) : el.status === "PENDING" ? (
                                <p
                                  className="text-center rounded fw-bold font-12 p-2 mb-2 text-warning"
                                  style={{ backgroundColor: "#FEF1F2" }}
                                >
                                  Pending
                                </p>
                              ) : el.status === "SUCCESS" ? (
                                <p
                                  className="text-center rounded fw-bold font-12 p-2 mb-2"
                                  style={{
                                    backgroundColor: "#E8FFE8",
                                    color: "#20CB6F",
                                  }}
                                >
                                  Success
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
                    )
                  }
                })
              ) : (
                <img
                  src={NoDataImg}
                  alt=""
                  className="img-fluid mx-auto d-block mt-5"
                />
              )
            ) : (
              <p className="font-14">Loading ...</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* fixed navbar */}

      <div
        className="fixed-button col-12 px-2 pb-2 width-breakpoint text-roboto"
        style={{ maxWidth: 480 }}
      >
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className={
              darkMode
                ? "btn me-2 text-white border border-2"
                : "btn me-2 text-secondary border border-2"
            }
            style={{
              backgroundColor: darkMode ? "#2F343E" : "#FFFFFF",
              width: "194px",
              height: "46px",
            }}
            onClick={() => navigate(`/withdraw/${name}`)}
          >
            Penarikan
          </button>
          <button
            type="button"
            className="btn text-white"
            style={{
              backgroundColor: "#266DE0",
              width: "194px",
              height: "46px",
            }}
            onClick={() => {
              localStorage.setItem("link-page", "wallet-page")
              navigate(`/deposit/${name}`)
            }}
          >
            Deposit
          </button>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        class="modal modal-sm fade"
        id="modal_show_txid"
        tabindex="-1"
        aria-labelledby="modal_show_txidLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modal_show_txidLabel">
                TxID
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="d-flex justify-content-center">
                <div style={{ width: 300 }}>{showTxid}</div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-sm btn-white border border-dark"
                onClick={() => {
                  navigator.clipboard.writeText(txid)
                  setBtnCopy("Copied!")
                }}
              >
                {btnCopy}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssetDetailPage

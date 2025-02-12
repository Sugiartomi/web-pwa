import React, { useEffect, useState } from "react"
import { ChevronLeft, ExclamationCircleFill } from "react-bootstrap-icons"
import { IoIosCloseCircle } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import DataEmptyImg from "../assets/DataEmpty.svg"
import axiosConfig from "../config/axios"
import { IDRFormater } from "../helpers/currencyFormater"
import { useRecoilState, useRecoilValue } from "recoil"
import { get_data_all_ticker } from "../recoil/marketState"
import { getTheme } from "../recoil/theme.State"

function TradeTransactionPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const path = useLocation()
  const { pathname } = useLocation()
  const dispath = useDispatch()
  const { name } = useParams()
  const assetName = pathname.split("/")[2].split("-")[0]
  const pairName = pathname.split("/")[2].split("-")[1]
  const [current, setCurrent] = useState()
  const pair = path.pathname.split("/")
  const [pathState, setPathState] = useState("Trade History")
  const userToken = localStorage.getItem("token")

  const allTicker = useRecoilValue(get_data_all_ticker)

  // variable get date now
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  let yyyy = today.getFullYear()
  today = yyyy + "-" + mm + "-" + dd

  // state history
  const [activeOrder, setActiveOrder] = useState()
  const [tradeHistory, setTradeHistory] = useState()
  const [orderHistory, setOrderHistory] = useState()
  const [dateStart, setDateStart] = useState(today)
  const [dateEnd, setDateEnd] = useState(today)
  const [marketName, setMarketName] = useState(assetName + pairName)

  // function get data. akan di custom sesuai kebututuhan data
  const handleGetData = (api, setState) => {
   
  }

  // function get data active order, order history dan trade history ketika component di render pertama kali / berganti pilihan history
  useEffect(() => {
    if (current === "Order History" && !orderHistory) {
      handleGetData("history-order", setOrderHistory)
    } else if (
      (pathState === "More transaction" || current === "Active order") &&
      !activeOrder
    ) {
      handleGetData("active-order", setActiveOrder)
    } else if (
      (pathState === "Trade History" || current === "Trade History") &&
      !tradeHistory
    ) {
      handleGetData("history-transaction", setTradeHistory)
    }
  }, [pathState, current, orderHistory, activeOrder, tradeHistory])

  // function search
  const handleSearchTrade = (
    dateStart,
    dateEnd,
    setStateFirst,
    setStateSecond,
    apiCallFirst,
    apiCallSecond
  ) => {
   
  }

  // Function untuk ganti state ke active order
  const handleActiveOrder = () => {
    setCurrent("Active order")
    setPathState()
  }

  // Function untuk ganti state ke Order History
  const handleOrderHistory = () => {
    setCurrent("Order History")
    setPathState()
  }

  // Function untuk ganti state ke Trade History
  const handleTradeHistory = () => {
    setCurrent("Trade History")
    setPathState()
  }

  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
      >
        <div className="d-flex pt-2">
          <p
            className="font-20"
            onClick={() => navigate(`/trade/${pair[2]}`, { state: path.state })}
          >
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "150px" }}>
            Trade
          </p>
        </div>

        {/* transaction option */}
        <div className="d-flex justify-content-between">
          <p
            className="font-16 fw-bold"
            style={
              current === "Active order" || pathState === "More transaction"
                ? { color: darkMode ? "white" : "#1B6AEA" }
                : { color: darkMode ? "grey" : "black" }
            }
            onClick={() => handleActiveOrder()}
          >
            Active Order (0)
          </p>
          <p
            className="font-16 fw-bold"
            style={
              current === "Order History"
                ? { color: darkMode ? "white" : "#1B6AEA" }
                : { color: darkMode ? "grey" : "black" }
            }
            onClick={() => handleOrderHistory()}
          >
            Order History
          </p>
          <p
            className="font-16 fw-bold"
            style={
              current === "Trade History" || pathState === "Trade History"
                ? { color: darkMode ? "white" : "#1B6AEA" }
                : { color: darkMode ? "grey" : "black" }
            }
            onClick={() => handleTradeHistory()}
          >
            Trade History
          </p>
        </div>

        {current !== "Active order" && pathState !== "More transaction" ? (
          <>
            {/* market */}
            <div
              className="px-2 py-2 font-14 mb-3 border rounded fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#modal-asset-list"
            >
              <div className="d-flex justify-content-between">
                <p className="mb-0">
                  {marketName.slice(0, -3)}/{marketName.slice(-3)}
                </p>
                <p className="mb-0" style={{ color: "#1B6AEA" }}>
                  <BsChevronDown />
                </p>
              </div>
            </div>
            {/* pick date */}
            <div className="mt-3 ">
              <form action="">
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="date"
                    className="form-control"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                  <p className="font-14 mb-0 mx-2">to</p>
                  <input
                    type="date"
                    className="form-control"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {/* button search */}
            {current === "Trade History" || pathState === "Trade History" ? (
              <div className="d-grid col-12 mt-3">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  onClick={() =>
                    handleSearchTrade(
                      dateStart,
                      dateEnd,
                      setTradeHistory,
                      setOrderHistory,
                      "history-transaction",
                      "history-order"
                    )
                  }
                >
                  Search
                </button>
              </div>
            ) : (
              <div className="d-grid col-12 mt-3">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  onClick={() =>
                    handleSearchTrade(
                      dateStart,
                      dateEnd,
                      setOrderHistory,
                      setTradeHistory,
                      "history-order",
                      "history-transaction"
                    )
                  }
                >
                  Search
                </button>
              </div>
            )}
          </>
        ) : (
          ""
        )}

        {current === "Active order" || pathState === "More transaction" ? (
          <>
            {/* warning */}
            <div
              className={
                darkMode
                  ? "py-2 px-3 d-flex text-white rounded"
                  : "py-2 px-3 d-flex font-primary rounded"
              }
              style={{ backgroundColor: darkMode ? "#1252B8" : "#F1F9FF" }}
            >
              <p className="font-20 mb-0">
                <ExclamationCircleFill />
              </p>
              <p className="font-12 mb-0 ms-2">
                Your Order will remain active until it match with the current
                market price, for more details information, Click Here
              </p>
            </div>

            {/* active order title */}
            <div
              className={
                darkMode
                  ? "row font-12 text-white mt-3"
                  : "row font-12 font-dark mt-3"
              }
            >
              <div className="col-5">
                <p>Price</p>
              </div>
              <div className="col-5">
                <p>Date</p>
              </div>
              <div className="col-2">
                <p>Action</p>
              </div>
            </div>

            {/* active order list */}

            {activeOrder ? (
              activeOrder.length === 0 ? (
                <div className="center-page mt-3">
                  <img
                    src={DataEmptyImg}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                  <p className="font-14">No Active Order History</p>
                </div>
              ) : (
                activeOrder.map((el, index) => {
                  return (
                    <div
                      className={
                        darkMode
                          ? "row font-12 text-white mb-3"
                          : "row font-12 font-dark mb-3"
                      }
                      style={{ borderBottom: "0.5px solid #DDE4EA" }}
                      key={index}
                    >
                      <div className="col-5">
                        <div className="d-flex justify-content-between">
                          <p
                            className={
                              darkMode
                                ? el.side === "BUY"
                                  ? "font-14 fw-bold badge px-2 mb-2 text-success border border-success"
                                  : "font-14 fw-bold badge px-2 mb-2 text-danger border border-danger"
                                : "font-14 fw-bold badge px-2 mb-2"
                            }
                            style={
                              el.side === "BUY"
                                ? {
                                    backgroundColor: darkMode ? "" : "#E8FFE8",
                                    color: darkMode ? "" : "#20CB6F",
                                  }
                                : {
                                    backgroundColor: darkMode ? "" : "#FEF1F2",
                                    color: darkMode ? "" : "#F4465E",
                                  }
                            }
                          >
                            {el.side}
                          </p>
                          <p className="font-14 fw-bold mb-2">{el.symbol}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="font-12 mb-2">Price</p>
                          <p className="font-12 fw-bold mb-2">{el.price} </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="font-12 mb-2">Total IDR</p>
                          <p className="font-12 fw-bold mb-2">
                            {" "}
                            {IDRFormater(+el.price * +el.quantity)}
                          </p>
                        </div>
                      </div>
                      <div className="col-5">
                        <p className="mb-2">{el.date}</p>
                        <div className="d-flex">
                          <p className="mb-2">Qty</p>
                          <p className="mb-2 ms-3">{el.quantity}</p>
                        </div>
                      </div>
                      <div className="col-2 ps-0">
                        <div className="d-flex">
                          <p
                            className={
                              darkMode
                                ? "font-12 btn btn-danger mb-0 ms-auto badge px-2 py-1"
                                : "font-12 font-red mb-0 ms-auto badge px-2 py-1"
                            }
                            style={{ border: "1px solid #F4465E" }}
                          >
                            Cancel
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            ) : (
              <p>Loading...</p>
            )}
          </>
        ) : current === "Order History" ? (
          <>
            {/* Order History title */}
            <div className="row font-12 font-dark mt-3">
              <div className="col-5">
                <p>Price</p>
              </div>
              <div className="col-5">
                <p>Date</p>
              </div>
              <div className="col-2">
                <p>Action</p>
              </div>
            </div>

            {/* Order History list */}
            {orderHistory ? (
              orderHistory.length === 0 ? (
                <div className="center-page mt-3">
                  <img
                    src={DataEmptyImg}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                  <p className="font-14">No Active Order History</p>
                </div>
              ) : (
                orderHistory.map((el, index) => {
                  return (
                    <div
                      className="row font-12 font-dark mb-3"
                      style={{ borderBottom: "0.5px solid #DDE4EA" }}
                      key={index}
                    >
                      <div className="col-5">
                        <div className="d-flex justify-content-between">
                          <p
                            className="font-14 fw-bold badge px-2 mb-2"
                            style={
                              el.side === "BUY"
                                ? {
                                    backgroundColor: "#E8FFE8",
                                    color: "#20CB6F",
                                  }
                                : {
                                    backgroundColor: "#FEF1F2",
                                    color: "#F4465E",
                                  }
                            }
                          >
                            {el.side}
                          </p>
                          <p className="font-14 fw-bold mb-2">{el.symbol}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="font-12 text-dark mb-2">Price</p>
                          <p className="font-12 fw-bold mb-2">{el.price} </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="font-12 text-dark mb-2">Total IDR</p>
                          <p className="font-12 fw-bold mb-2">
                            {IDRFormater(+el.price * +el.quantity)}
                          </p>
                        </div>
                      </div>
                      <div className="col-5">
                        <p className="mb-2">{el.date}</p>
                        <div className="d-flex">
                          <p className="mb-2">Qty</p>
                          <p className="mb-2 ms-3">{el.quantity}</p>
                        </div>
                      </div>
                      <div className="col-2 ps-0">
                        <div className="d-flex">
                          <p
                            className="font-12 font-red mb-0 ms-auto badge px-2 py-1"
                            style={{ border: "1px solid #F4465E" }}
                          >
                            Cancel
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            ) : (
              <p>Loading...</p>
            )}
          </>
        ) : current === "Trade History" || pathState === "Trade History" ? (
          <>
            {/* Order History title */}
            <div className="row font-12 font-dark mt-3">
              <div className="col-5">
                <p>Price</p>
              </div>
              <div className="col-7">
                <p>Date</p>
              </div>
              {/* <div className="col-2">
								<p>Action</p>
							</div> */}
            </div>

            {/* Order History list */}
            {tradeHistory ? (
              tradeHistory.length === 0 ? (
                <div className="center-page mt-3">
                  <img
                    src={DataEmptyImg}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                  <p className="font-14">No Active Order History</p>
                </div>
              ) : (
                tradeHistory.map((el, index) => {
                  return (
                    <div
                      className="row font-12 font-dark mb-3"
                      style={{ borderBottom: "0.5px solid #DDE4EA" }}
                      key={index}
                    >
                      <div className="col-5">
                        <div className="d-flex justify-content-between">
                          <p
                            className="font-14 fw-bold badge px-2 mb-2"
                            style={
                              el.side === "BUY"
                                ? {
                                    backgroundColor: "#E8FFE8",
                                    color: "#20CB6F",
                                  }
                                : {
                                    backgroundColor: "#FEF1F2",
                                    color: "#F4465E",
                                  }
                            }
                          >
                            {el.side}
                          </p>
                          <p className="font-14 fw-bold mb-2">{el.symbol}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="font-12 text-dark mb-2">Price</p>
                          <p className="font-12 fw-bold mb-2">{el.price} </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="font-12 text-dark mb-2">Total IDR</p>
                          <p className="font-12 fw-bold mb-2">
                            {IDRFormater(+el.price * +el.quantity)}
                          </p>
                        </div>
                      </div>
                      <div className="col-7">
                        <p className="mb-2">{el.updated_at}</p>
                        {console.log(+el.quantity * +el.price)}
                        <div className="d-flex">
                          <p className="mb-2">Qty</p>
                          <p className="mb-2 ms-2 me-4 fw-bold">
                            {+el.quantity.toLocaleString()}
                          </p>
                          <p className="mb-2">Total</p>
                          <p className="mb-2 ms-2 fw-bold">
                            {IDRFormater(+el.quantity * +el.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            ) : (
              <p>Loading...</p>
            )}
          </>
        ) : (
          ""
        )}
      </div>

      {/* modal change asset */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-asset-list"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center modal-dialog-scrollable">
          <div
            className="modal-content rounded border-0"
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body">
              <div className="px-2">
                <div className="d-flex align-items-center">
                  <p className="ms-auto font-20 mb-1" data-bs-dismiss="modal">
                    <IoIosCloseCircle />
                  </p>
                </div>

                {/* list coin */}
                {allTicker
                  ? allTicker.map((el, index) => {
                      return (
                        <div
                          className="d-flex mb-3"
                          key={index}
                          onClick={() => setMarketName(el.symbol)}
                        >
                          <img
                            src={`https://assets.digitalexchange.id/coin/${el.symbol.slice(
                              0,
                              -3
                            )}.png`}
                            alt=""
                            style={{ width: "25px", height: "25px" }}
                          />
                          <p className="font-14 ms-3" data-bs-dismiss="modal">
                            {el.symbol.slice(0, -3)}/{el.symbol.slice(-3)}
                          </p>
                        </div>
                      )
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TradeTransactionPage

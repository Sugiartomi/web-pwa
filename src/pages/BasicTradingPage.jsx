import React, { useEffect, useState } from "react"
import {
  CaretDownFill,
  CaretUpFill,
  ChevronLeft,
  InfoCircleFill,
  Star,
} from "react-bootstrap-icons"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import { TbFileDescription } from "react-icons/tb"
import SuccessOrderImg from "../assets/success-order.svg"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TradeAdvanced from "../components/trade/TradeAdvanced"
import { io } from "socket.io-client"
import NavigationButton from "../components/global/NavigationButton"
import axios from "axios"
import axiosConfig from "../config/axios"
import { changeStringToNumber } from "../helpers/dataFunction"
import DataEmptyImg from "../assets/DataEmpty.svg"
import { IDRFormater } from "../helpers/currencyFormater"
import { useRecoilState, useRecoilValue } from "recoil"
import { get_data_all_ticker } from "../recoil/marketState"
import Swal from "sweetalert2"
import {
  error_order,
  failed_order,
  socket_notification,
} from "../recoil/notificationState"
import PlusSym from "@untitled-ui/icons-react/build/cjs/PlusCircle"
import { getTheme } from "../recoil/theme.State"
import { baseURLApi, httpSocketMarket } from "../config/api"
import { DBDataAllTickerBasicTrading, DBDataPrecission, DBDataTicker, DBMarketActivity, DBSocketOrder } from "../DB/BasicTrading"

function BasicTradingPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const { state } = useLocation()
  const [buySell, setBuySell] = useState("buy")
  const [tradeStatus, setTradeStatus] = useState()
  const [statePath, setStatePath] = useState("0")
  const [successOrder, setSuccessOrder] = useState(false)
  const [socketOrder, setSocketOrder] = useState(DBSocketOrder)
  const [activeOrder, setActiveOrder] = useState()
  const [assetPercent, setAssetPercent] = useState()
  const [balanceIDR, setBalanceIDR] = useState(670230487)
  const [balanceAsset, setBalanceAsset] = useState(0)
  const [dataTicker, setDataTicker] = useState(DBDataTicker)
  const [addOrder, setAddOrder] = useState(0)
  const [marketActivity, setMarketActivity] = useState(DBMarketActivity)
  const [orderHistory, setOrderHistory] = useState([])
  const [tradeHistory, setTradeHistory] = useState([])
  const [fullNameAsset, setFullNameAsset] = useState("Dummy")
  
  const [tabOrder, setTabOrder] = useState("order_book")
  const [viewOrderSection, setViewOrderSection] = useState("order_all")
  
  // state untuk input data order
  const [price, setPrice] = useState(9999999)
  const [lastprice, setLastPrice] = useState("9999999")
  const [amount, setAmount] = useState(0)
  const [IDR, setIDR] = useState(0)
  const { name } = useParams()
  const assetName = name.split("-")[0]
  const pairName = name.split("-")[1]
  const userToken = localStorage.getItem("token")
  
  const [lastPricePercent, setLastPricePercent] = useState()
  const [dataFailedOrder, setDataFailedOrder] = useState(false)
  
  const [dataPrecision, setDataPrecision] = useState(DBDataPrecission)
  const [statusIntegrasi, setStatusIntegrasi] = useState()
  const [dataAllTicker, setdataAllTicker] = useState(DBDataAllTickerBasicTrading)
  
  const [viewWaitingCancel, setViewWaitingCancel] = useState("Cancel")
  const [insufficient, setInsufficient] = useState(false)
  const [dataErrorOrder, setDataErrorOrder] = useState([])
  console.log(dataErrorOrder);

  //  INSUFFICIENT BALANCE
  useEffect(() => {
    if (dataErrorOrder.length !== 0) {
      if (dataErrorOrder[0].type === "FAILED_ORDER") {
        Swal.fire({
          icon: "error",
          showConfirmButton: false,
          html: `<p class="font-12 mb-0">${dataErrorOrder[0].messages}</p>
     <p class="font-14">Contact Admin!</p>
    
     `,
        }).then(() => {
          setDataErrorOrder([])
          setSuccessOrder("Failed")
        })
      }
    }
  }, [dataErrorOrder])

  const handlePrice = (e) => {
    setAssetPercent(0)
    let input = e.target.value.toString()
    let filter1 = input.replaceAll(".", "")
    let filter2 = filter1.replaceAll(",", ".")

    if (/^[0-9]/.test(+filter2)) {
      if (amount) {
        setIDR(+filter2 * +amount)
        setPrice(filter2)
      } else {
        setPrice(filter2)
      }
    }
  }

  const handleIDR = (e) => {
    setAssetPercent(0)
    let input = e.target.value.toString()
    let filter1 = input.replaceAll(".", "")
    let filter2 = filter1.replaceAll(",", ".")

    if (/^[0-9]/.test(+filter2)) {
      if (price && dataPrecision) {
        let total = +filter2 / +price
        if (dataPrecision.data.integrasi == 1) {
          setAmount(total.toFixed(dataPrecision.data.precision_qty.length - 1))
          setIDR(filter2)
        } else {
          setIDR(filter2)
          if (total.toString().length > 10) {
            setAmount(total.toFixed(8))
          } else {
            setAmount(total)
          }
        }
      } else {
        setIDR(filter2)
      }
    }
  }

  const handleAmount = (e) => {
    setAssetPercent(0)
    let input = e.target.value

    if (/^[0-9]/.test(+input)) {
      if (price) {
        if (input[input.length - 1] === ".") {
          setAmount(input)
        } else {
          if (dataPrecision.data.integrasi == 1) {
            setIDR(+(+input * +price).toFixed(0))
            setAmount(
              +Number(input).toFixed(
                dataPrecision.data.precision_qty.length - 1
              )
            )
          } else {
            setIDR(+(+input * +price).toFixed(0))
            if (input.toString().length > 10) {
              setAmount(+(+input).toFixed(8))
            } else {
              setAmount(+input)
            }
          }
        }
      } else {
        setAmount(+input)
      }
    }
  }

  useEffect(() => {
    if (dataFailedOrder) {
      console.log(dataFailedOrder)
    }
  }, [dataFailedOrder])

  // Last(%) 24h
  useEffect(() => {
    if (dataAllTicker) {
      dataAllTicker.forEach((e) => {
        if (e.symbol === name.replace("-", "")) {
          setLastPricePercent(e.last_price_percentage_24h)
        }
      })
    }
  }, [dataAllTicker])








  // switch bufy/sell
  useEffect(() => {
    if (state !== null) {
      if (state.target === "sell") {
        setBuySell("sell")
      } else {
        setBuySell("buy")
      }
    } else {
      setBuySell("buy")
    }
  }, [])

  // count by percent
  useEffect(() => {
    if (assetPercent) {
      if (buySell === "buy") {
        if (balanceIDR) {
          let result = ((assetPercent / 100) * balanceIDR) / price
          if (result !== Infinity) {
            if (result.toString().length > 10) {
              setIDR(+price * +result.toFixed(8))
              setAmount(result.toFixed(8))
            } else {
              setIDR(+price * +result)
              setAmount(result)
            }
          } else {
            setIDR(0)
            setAmount(0)
          }
        }
      } else {
        if (balanceAsset) {
          let result = (assetPercent / 100) * balanceAsset
          if (price != 0) {
            setIDR(+result * +price)
            setAmount(+result)
          } else {
            setIDR(0)
            setAmount(0)
          }
        }
      }
    }
  }, [assetPercent])






 

  // submit data order
  const handleSubmitOrder = () => {
  
  }

  const cancelOrder = (cancel_id, side, symbol) => {
    axiosConfig
      .post("/cancel-order", {
        token: userToken,
        cancel_id,
        side,
        symbol,
      })
      .then(({ data }) => {
        console.log(data)
        if (data.status === "success") {
          setViewWaitingCancel("Cancel")
          setAddOrder(addOrder + 1)

          console.log("masuk")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // navigasi untuk active order
  const navigateToActiveOrder = () => {
    if (activeOrder) {
      navigate(`/trade-transaction/${assetName}-${pairName}`, {
        state: {
          name: "More transaction",
          last_price_percentage_24h: lastPricePercent,
          dataTicker: dataTicker,
          activeOrder,
          allTicker: dataAllTicker,
        },
      })
    }
  }

  // navigasi untuk trade history
  const navigateToTradeHistory = () => {
    if (activeOrder) {
      navigate(`/trade-transaction/${assetName}-${pairName}`, {
        state: {
          name: "Trade History",
          last_price_percentage_24h: lastPricePercent,
          dataTicker: dataTicker,
          activeOrder,
          allTicker: dataAllTicker,
        },
      })
    }
  }

  // order section (all, buy, sell)
  const handleSwitchOrderSection = (e) => {
    setViewOrderSection(e.target.value)
  }

  // TimeStamp Converter
  const timeStampConv = (input) => {
    let timeStamp = new Date(Number(input) * 1000)
    let time = timeStamp.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
    let date = timeStamp.toLocaleDateString("id-ID")
    return `${time}-${date}`
  }

  // ORDER HISTORY
  const handleSearchTradeOrder = (start, end) => {
   
  }

  // TRADE HISTORY
  const handleSearchTradeHistory = (start, end) => {
  
  }

  // variable get date now
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  let yyyy = today.getFullYear()
  today = yyyy + "-" + mm + "-" + dd

  // DATE PICKER
  const [dateStart, setDateStart] = useState(today)
  const [dateEnd, setDateEnd] = useState(today)

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ marginBottom: "80px" }}
      >
        {state?.last_price_percentage_24h ? (
          <div className="d-flex mt-2">
            <p
              className="font-18 fw-bolder pt-2"
              onClick={() =>
                navigate(`/market/${assetName}-${pairName}`, {
                  state: {
                    last_price_percentage_24h: lastPricePercent,
                  },
                })
              }
            >
              <ChevronLeft />
            </p>
            <p className="font-18 fw-bolder pt-2 text-center w-100">
              {fullNameAsset}
            </p>
            <p className="font-18 fw-bolder pt-2 text-end">
              <Star />
            </p>
          </div>
        ) : (
          ""
        )}

        {/* switch */}
        <div className="mt-3 d-flex align-items-center justify-content-between">
          <div className="d-flex" style={{ flexDirection: "column" }}>
            <div
              className="d-flex align-items-center"
              onClick={() => navigate("/market")}
            >
              <p className="font-25 me-2 mb-0">
                <CgArrowsExchangeAlt />
              </p>
              <p className="font-20 fw-bold me-2 mb-0">
                {assetName}/{pairName}
              </p>

              <div>
                {statePath && statePath ? (
                  <p
                    className="badge font-red mb-0"
                    style={
                      darkMode
                        ? state && statePath[0] === "-"
                          ? { backgroundColor: "#E0341C", color: "#FEFEFE" }
                          : { backgroundColor: "#32BA71", color: "#FEFEFE" }
                        : state && statePath[0] === "-"
                        ? { backgroundColor: "#FFEDED", color: "#F4465E" }
                        : { backgroundColor: "#EDFFF2", color: "#20CB6F" }
                    }
                  >
                    {state && statePath[0] === "-" ? (
                      <CaretDownFill />
                    ) : (
                      <CaretUpFill />
                    )}{" "}
                    {statePath} %
                  </p>
                ) : (
                  <p
                    className="badge font-red mb-0"
                    style={{ backgroundColor: "#FFEDED", color: "F4465E" }}
                  >
                    0
                  </p>
                )}
              </div>
            </div>
            <p
              className={
                darkMode
                  ? "font-16 fw-bolder text-white mb-0 w-100"
                  : "font-16 fw-bolder text-secondary mb-0 w-100"
              }
            >
              Rp {IDRFormater(+lastprice)}
            </p>
          </div>
          {/* SWITCH TO ADVANCE */}
          {/* <div className="form-check form-switch font-25">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              onChange={() => setTradeStatus(!tradeStatus)}
            />
          </div> */}
          <div className="row">
            <div className="col">
              <img
                src={`https://asset.digitalexchange.id/coin/${assetName}.png`}
                className="img-fluid"
                style={{ objectFit: "cover", width: 72 }}
                alt=""
              />
            </div>
          </div>
        </div>

        <hr
          className="text-secondary mt-3"
          style={{ opacity: "3%", border: "2.5px solid black" }}
        />
        {/* ========================================================================================== */}

        {!tradeStatus ? (
          <>
            {/* button buy sell */}
            <div
              className="row mt-3  py-2 mx-1"
              style={{
                borderRadius: 10,
                backgroundColor: darkMode ? "#282A32" : "#FAFAFA",
              }}
            >
              <div className="d-grid col-6 pe-0">
                <button
                  type="button"
                  className="btn h-100 border-0 fw-bold font-12"
                  style={
                    buySell === "buy"
                      ? {
                          height: "35px",
                          backgroundColor: "#32BA71",
                          color: "#FFFFFF",
                        }
                      : {
                          height: "35px",
                          backgroundColor: "#282A32",
                          color: "grey",
                        }
                  }
                  onClick={() => {
                    setBuySell("buy")
                    setAmount(0)
                    setIDR(0)
                    setAssetPercent(0)
                  }}
                >
                  Beli
                </button>
              </div>
              <div className="d-grid col-6 ps-1">
                <button
                  type="button"
                  className="btn border-0 fw-bold font-12"
                  style={
                    buySell !== "buy"
                      ? {
                          height: "35px",
                          backgroundColor: "#E0341C",
                          color: "#FFFFFF",
                        }
                      : {
                          height: "35px",
                          backgroundColor: "#282A32",
                          color: "grey",
                        }
                  }
                  onClick={() => {
                    setBuySell("sell")
                    setAmount(0)
                    setIDR(0)
                    setAssetPercent(0)
                  }}
                >
                  Jual
                </button>
              </div>
            </div>

            {/* VIEW BASIC/ADVANCE */}
            <>
              <div className="row mt-4">
                <div
                  className="col-5 font-12 text-inter text-secondary"
                  style={{ fontWeight: 600 }}
                >
                  <div className="mb-4 h-100 d-flex align-items-center">
                    Tipe Tampilan
                  </div>
                </div>
                <div className="col-7 font-12 text-inter py-1">
                  <div className="d-flex w-100">
                    <div
                      className={
                        darkMode
                          ? "btn btn-sm w-100 me-2 border-white text-white fw-bold"
                          : "btn btn-sm w-100 me-2 border-primary text-primary fw-bold"
                      }
                    >
                      Basic
                    </div>
                    <div
                      className="btn btn-sm border-secondary text-secondary w-100"
                      onClick={() => {
                        setTabOrder("pending_order")
                        setTradeStatus(true)
                      }}
                    >
                      Advance
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1a">
                <div
                  className="col-5 font-12 text-inter text-secondary"
                  style={{ fontWeight: 600 }}
                >
                  <div className="mb-4 h-100 d-flex align-items-center">
                    Tipe Order
                  </div>
                </div>
                <div className="col-7 font-12 text-inter py-1">
                  <select
                    name=""
                    id=""
                    disabled
                    className={
                      darkMode
                        ? "form-control shadow-none font-12 h-100  bg-dark-mode text-white"
                        : "form-control shadow-none font-12 h-100"
                    }
                  >
                    <option value="">Limit Order</option>
                  </select>
                </div>
              </div>

              {/* HARGA BELI */}
              <div className="row mt-1">
                <div
                  className="col-5 font-12 text-inter text-secondary"
                  style={{ fontWeight: 600 }}
                >
                  <div className="mb-4 h-100 d-flex align-items-center">
                    Harga Beli {assetName}
                  </div>
                </div>
                <div className="col-7 font-12 text-inter py-1">
                  <div className="h-100 rounded border d-flex align-items-center px-3">
                    <div className="fw-bold ">Rp</div>
                    <input
                      type="string"
                      className={
                        darkMode
                          ? "form-control form-control-sm shadow-none border-0 bg-dark-mode text-white"
                          : "form-control form-control-sm shadow-none border-0"
                      }
                      value={IDRFormater(+price)}
                      onChange={(e) => {
                        handlePrice(e)
                      }}
                    />
                  </div>
                </div>
              </div>
              {statusIntegrasi === "1" ? (
                <>
                  {/* TOTAL */}
                  <div className="row mt-1">
                    <div
                      className="col-5 font-12 text-inter text-secondary"
                      style={{ fontWeight: 600 }}
                    >
                      <div className="mb-4 h-100 d-flex align-items-center">
                        Jumlah IDR
                      </div>
                    </div>
                    <div className="col-7 font-12 text-inter py-1">
                      <div className="h-100 rounded border d-flex align-items-center px-3">
                        <div className="fw-bold">Rp</div>
                        <input
                          type="string"
                          className={
                            darkMode
                              ? "form-control form-control-sm shadow-none border-0 bg-dark-mode text-white"
                              : "form-control form-control-sm shadow-none border-0"
                          }
                          value={IDRFormater(+IDR)}
                          onChange={(e) => {
                            handleIDR(e)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* AMOUNT ASSET */}
                  <div className="row mt-1">
                    <div
                      className="col-5 font-12 text-inter text-secondary"
                      style={{ fontWeight: 600 }}
                    >
                      <div className="mb-4 h-100 d-flex align-items-center">
                        Amount {assetName}
                      </div>
                    </div>
                    <div className="col-7 font-12 text-inter py-1">
                      <div className="h-100 rounded border d-flex align-items-center px-1">
                        <input
                          step="10"
                          type="string"
                          className={
                            darkMode
                              ? "form-control form-control-sm shadow-none border-0 bg-dark-mode text-white"
                              : "form-control form-control-sm shadow-none border-0"
                          }
                          value={amount}
                          onChange={(e) => {
                            handleAmount(e)
                          }}
                        />
                        <div className="fw-bold me-2">{assetName}</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : statusIntegrasi === "0" ? (
                <>
                  {/* AMOUNT ASSET */}
                  <div className="row mt-1">
                    <div
                      className="col-5 font-12 text-inter text-secondary"
                      style={{ fontWeight: 600 }}
                    >
                      <div className="mb-4 h-100 d-flex align-items-center">
                        Amount {assetName}
                      </div>
                    </div>
                    <div className="col-7 font-12 text-inter py-1">
                      <div className="h-100 rounded border d-flex align-items-center px-1">
                        <input
                          step="10"
                          type="string"
                          className={
                            darkMode
                              ? "form-control form-control-sm shadow-none border-0 bg-dark-mode text-white"
                              : "form-control form-control-sm shadow-none border-0"
                          }
                          value={amount}
                          onChange={(e) => {
                            handleAmount(e)
                          }}
                        />
                        <div className="fw-bold me-2">{assetName}</div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* TOTAL */}
                  <div className="row mt-1">
                    <div
                      className="col-5 font-12 text-inter text-secondary"
                      style={{ fontWeight: 600 }}
                    >
                      <div className="mb-4 h-100 d-flex align-items-center">
                        Jumlah IDR
                      </div>
                    </div>
                    <div className="col-7 font-12 text-inter py-1">
                      <div className="h-100 rounded border d-flex align-items-center px-3">
                        <div className="fw-bold">Rp</div>
                        <input
                          type="string"
                          className={
                            darkMode
                              ? "form-control form-control-sm shadow-none border-0 bg-dark-mode text-white"
                              : "form-control form-control-sm shadow-none border-0"
                          }
                          value={IDRFormater(+IDR)}
                          onChange={(e) => {
                            handleIDR(e)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {/* PERCENT */}
              <div className="row">
                <div className="col-5"></div>
                <div className="col-7">
                  <div className="d-flex justify-content-between font-dark mt-3">
                    <p
                      className="font-11 badge px-2"
                      style={
                        assetPercent === 25
                          ? {
                              color: darkMode ? "white" : "black",
                              fontWeight: "400",
                              border: darkMode
                                ? "2px solid white"
                                : "1px solid #1B6AEA",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                            }
                          : {
                              color: darkMode ? "grey" : "black",
                              fontWeight: "400",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                              border: darkMode ? "1px solid grey" : "",
                            }
                      }
                      onClick={() => setAssetPercent(25)}
                    >
                      25%
                    </p>
                    <p
                      className="font-11 badge px-2"
                      style={
                        assetPercent === 50
                          ? {
                              color: darkMode ? "white" : "black",
                              fontWeight: "400",
                              border: darkMode
                                ? "2px solid white"
                                : "1px solid #1B6AEA",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                            }
                          : {
                              color: darkMode ? "grey" : "black",
                              fontWeight: "400",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                              border: darkMode ? "1px solid grey" : "",
                            }
                      }
                      onClick={() => setAssetPercent(50)}
                    >
                      50%
                    </p>
                    <p
                      className="font-11 badge px-2"
                      style={
                        assetPercent === 75
                          ? {
                              color: darkMode ? "white" : "black",
                              fontWeight: "400",
                              border: darkMode
                                ? "2px solid white"
                                : "1px solid #1B6AEA",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                            }
                          : {
                              color: darkMode ? "grey" : "black",
                              fontWeight: "400",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                              border: darkMode ? "1px solid grey" : "",
                            }
                      }
                      onClick={() => setAssetPercent(75)}
                    >
                      75%
                    </p>
                    <p
                      className="font-11 badge px-2"
                      style={
                        assetPercent === 100
                          ? {
                              color: darkMode ? "white" : "black",
                              fontWeight: "400",
                              border: darkMode
                                ? "2px solid white"
                                : "1px solid #1B6AEA",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                            }
                          : {
                              color: darkMode ? "grey" : "black",
                              fontWeight: "400",
                              backgroundColor: darkMode ? "#2F343E" : "#FAFAFC",
                              border: darkMode ? "1px solid grey" : "",
                            }
                      }
                      onClick={() => setAssetPercent(100)}
                    >
                      100%
                    </p>
                  </div>
                </div>
              </div>
            </>
          </>
        ) : (
          // ADVANCE VIEW
          <>
            <div className="mt-3">
              <div className="d-flex">
                {/* left */}
                <div className="col-6">
                  <div style={{ height: "370px" }}>
                    {/* title */}
                    {buySell === "buy" ? (
                      <div className="d-flex ">
                        <div
                          className="btn w-100 me-2 font-12 text-white"
                          style={{ backgroundColor: "#32BA71" }}
                        >
                          Beli
                        </div>
                        <div
                          className={
                            darkMode
                              ? "btn bg-dark-mode text-secondary border border-secondary w-100 font-12"
                              : "btn bg-imp-muted w-100 font-12"
                          }
                          onClick={() => setBuySell("sell")}
                        >
                          Jual
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex ">
                        <div
                          className="btn bg-dark-mode border border-secondary text-secondary w-100 me-2 font-12 "
                          onClick={() => setBuySell("buy")}
                        >
                          Beli
                        </div>
                        <div className="btn btn-danger w-100 font-12">Jual</div>
                      </div>
                    )}

                    <div className="d-flex mt-2 justify-content-between mt-3 mb-3">
                      <p className="font-12 mb-0" style={{ color: "#565D73" }}>
                        Balance
                      </p>
                      {buySell === "buy" ? (
                        <p className="font-12 fw-bold mb-0">
                          {balanceIDR ? IDRFormater(+balanceIDR) : ""} IDR
                        </p>
                      ) : (
                        <p className="font-12 fw-bold mb-0">
                          {balanceAsset ? +balanceAsset.toLocaleString() : ""}{" "}
                          {assetName}
                        </p>
                      )}
                    </div>
                    <div className="d-flex mt-2 justify-content-between mb-2 align-items-center">
                      <p
                        className="font-12 mb-0 w-100 me-2"
                        style={{ color: "#565D73" }}
                      >
                        Tampilan
                      </p>
                      <div
                        className={
                          darkMode
                            ? "btn btn-sm font-10 border-secondary text-secondary w-100 me-1"
                            : "btn btn-sm font-10 border-secondary w-100 me-1"
                        }
                        onClick={() => {
                          setTabOrder("order_book")
                          setTradeStatus("")
                        }}
                      >
                        Basic
                      </div>
                      <div
                        className={
                          darkMode
                            ? "btn btn-sm font-10 fw-bold border-white text-white w-100"
                            : "btn btn-sm font-10 fw-bold border-primary text-primary w-100"
                        }
                      >
                        Advance
                      </div>
                    </div>
                    {/* limit order */}
                    <div>
                      <select
                        className={
                          darkMode
                            ? "form-select font-12 mt-3 bg-dark-mode text-white border"
                            : "form-select border-0 font-12 mt-3"
                        }
                        aria-label="Default select example"
                        style={{ backgroundColor: "#F2F2F2" }}
                        disabled
                      >
                        <option>Limit Order</option>
                        <option value="1">Market Order</option>
                      </select>
                    </div>
                    {/* harga Beli*/}
                    <div className="d-flex w-100 d-flex mt-2 rounded justify-content-between align-items-center">
                      <p className=" font-10 mb-0 me-2">Harga</p>
                      <div className="w-75 h-100 rounded border d-flex align-items-center ps-2">
                        <div className="fw-bold font-10 ">Rp</div>
                        <input
                          type="string"
                          className={
                            darkMode
                              ? "form-control form-control-sm shadow-none border-0 bg-dark-mode rounded text-white"
                              : "form-control form-control-sm shadow-none border-0"
                          }
                          value={IDRFormater(+price)}
                          onChange={(e) => {
                            handlePrice(e)
                          }}
                        />
                      </div>
                    </div>
                    {!dataPrecision ? (
                      ""
                    ) : dataPrecision.data.integrasi === "1" ? (
                      <div className="d-flex w-100 d-flex mt-2 rounded justify-content-between align-items-center">
                        <p className=" font-10 mb-0 me-2">Total</p>
                        <div className=" w-75 h-100 rounded border d-flex align-items-center ps-2">
                          <div className="fw-bold font-10 ">Rp</div>
                          <input
                            type="string"
                            className={
                              darkMode
                                ? "form-control form-control-sm shadow-none border-0 bg-dark-mode rounded text-white"
                                : "form-control form-control-sm shadow-none border-0"
                            }
                            value={IDRFormater(+IDR)}
                            onChange={(e) => {
                              handleIDR(e)
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex w-100 d-flex mt-2 rounded justify-content-between align-items-center">
                        <p className=" font-10 mb-0 me-2">Amount</p>
                        <div className=" w-75 h-100 rounded border d-flex align-items-center px-2">
                          <input
                            type="string"
                            className={
                              darkMode
                                ? "form-control form-control-sm shadow-none border-0 bg-dark-mode rounded text-white"
                                : "form-control form-control-sm shadow-none border-0"
                            }
                            value={amount}
                            onChange={(e) => {
                              handleAmount(e)
                            }}
                          />
                          <div className="fw-bold font-10 ">{assetName}</div>
                        </div>
                      </div>
                    )}

                    {/* PERCENT */}
                    <div className="d-flex justify-content-between font-dark mt-3">
                      <p
                        className="font-11 badge px-2"
                        style={
                          assetPercent === 25
                            ? {
                                color: darkMode ? "white" : "black",
                                fontWeight: "400",
                                border: darkMode
                                  ? "2px solid white"
                                  : "1px solid #1B6AEA",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                              }
                            : {
                                color: darkMode ? "grey" : "black",
                                fontWeight: "400",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                                border: darkMode ? "1px solid grey" : "",
                              }
                        }
                        onClick={() => setAssetPercent(25)}
                      >
                        25%
                      </p>
                      <p
                        className="font-11 badge px-2"
                        style={
                          assetPercent === 50
                            ? {
                                color: darkMode ? "white" : "black",
                                fontWeight: "400",
                                border: darkMode
                                  ? "2px solid white"
                                  : "1px solid #1B6AEA",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                              }
                            : {
                                color: darkMode ? "grey" : "black",
                                fontWeight: "400",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                                border: darkMode ? "1px solid grey" : "",
                              }
                        }
                        onClick={() => setAssetPercent(50)}
                      >
                        50%
                      </p>
                      <p
                        className="font-11 badge px-2"
                        style={
                          assetPercent === 75
                            ? {
                                color: darkMode ? "white" : "black",
                                fontWeight: "400",
                                border: darkMode
                                  ? "2px solid white"
                                  : "1px solid #1B6AEA",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                              }
                            : {
                                color: darkMode ? "grey" : "black",
                                fontWeight: "400",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                                border: darkMode ? "1px solid grey" : "",
                              }
                        }
                        onClick={() => setAssetPercent(75)}
                      >
                        75%
                      </p>
                      <p
                        className="font-11 badge px-2"
                        style={
                          assetPercent === 100
                            ? {
                                color: darkMode ? "white" : "black",
                                fontWeight: "400",
                                border: darkMode
                                  ? "2px solid white"
                                  : "1px solid #1B6AEA",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                              }
                            : {
                                color: darkMode ? "grey" : "black",
                                fontWeight: "400",
                                backgroundColor: darkMode
                                  ? "#2F343E"
                                  : "#FAFAFC",
                                border: darkMode ? "1px solid grey" : "",
                              }
                        }
                        onClick={() => setAssetPercent(100)}
                      >
                        100%
                      </p>
                    </div>

                    {!dataPrecision ? (
                      ""
                    ) : dataPrecision.data.integrasi === "1" ? (
                      <div className="d-flex w-100 d-flex mt-2 rounded justify-content-between align-items-center">
                        <p className=" font-10 mb-0 me-2">Amount</p>
                        <div className=" w-75 h-100 rounded border d-flex align-items-center px-2">
                          <input
                            type="string"
                            className={
                              darkMode
                                ? "form-control form-control-sm shadow-none border-0 bg-dark-mode rounded text-white"
                                : "form-control form-control-sm shadow-none border-0"
                            }
                            value={amount}
                            onChange={(e) => {
                              handleAmount(e)
                            }}
                          />
                          <div className="fw-bold font-10 ">{assetName}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex w-100 d-flex mt-2 rounded justify-content-between align-items-center">
                        <p className=" font-10 mb-0 me-2">Total</p>
                        <div className=" w-75 h-100 rounded border d-flex align-items-center ps-2">
                          <div className="fw-bold font-10 ">Rp</div>
                          <input
                            type="string"
                            className={
                              darkMode
                                ? "form-control form-control-sm shadow-none border-0 bg-dark-mode rounded text-white"
                                : "form-control form-control-sm shadow-none border-0"
                            }
                            value={IDRFormater(+IDR)}
                            onChange={(e) => {
                              handleIDR(e)
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* TAKER - MAKER */}
                    {dataPrecision ? (
                      <p className="text-end mt-3 font-11">
                        Fee Maker{" "}
                        <span className="font-red">
                          {dataPrecision.data.maker_fee}%
                        </span>{" "}
                        - Taker{" "}
                        <span className="font-red me-2">
                          {dataPrecision.data.taker_fee}%
                        </span>
                        <InfoCircleFill className="font-primary" />
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* right */}
                <div className="col-6 ps-4">
                  <div style={{ height: "370px" }}>
                    <div className="d-flex justify-content-between fw-bold font-11 py-1 mb-3">
                      <p className="mb-0">Jumlah</p>
                      <p className="mb-0">IDR</p>
                    </div>

                    {viewOrderSection === "order_all" ? (
                      <>
                        {" "}
                        {/* list ask */}
                        {socketOrder ? (
                          <div className="font-10">
                            {socketOrder.bid
                              .slice(0, 5)
                              .reverse()
                              .map((e, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="row py-1"
                                    style={
                                      changeStringToNumber(e.total) > 50000000
                                        ? {
                                            backgroundColor: darkMode
                                              ? ""
                                              : "#E8FFE8",
                                          }
                                        : {}
                                    }
                                  >
                                    <div className="col">{e.total}</div>
                                    <div className="col text-end font-green">
                                      Rp {e.price}
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        ) : (
                          ""
                        )}
                        {/* rata-rata */}
                        <div>
                          {statePath && statePath ? (
                            <p
                              className="font-14 mt-2 mb-2 fw-bold text-center"
                              style={
                                state && statePath[0] === "-"
                                  ? { color: "F4465E" }
                                  : { color: "#20CB6F" }
                              }
                            >
                              Rp {IDRFormater(+lastprice)}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        {/* list bid */}
                        {socketOrder ? (
                          <div className="font-10">
                            {socketOrder.ask.slice(0, 5).map((e, i) => {
                              return (
                                <div
                                  key={i}
                                  className="row py-1"
                                  style={
                                    changeStringToNumber(e.total) > 50000000
                                      ? {
                                          backgroundColor: darkMode
                                            ? ""
                                            : "#FEF1F2",
                                        }
                                      : {}
                                  }
                                >
                                  <div className="col">{e.total}</div>
                                  <div className="col text-end font-red">
                                    Rp {e.price}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {viewOrderSection === "order_buy" ? (
                      socketOrder ? (
                        <div className="font-10">
                          {socketOrder.bid
                            .slice(0, 12)
                            .reverse()
                            .map((e, i) => {
                              return (
                                <div
                                  key={i}
                                  className="row py-1"
                                  style={
                                    changeStringToNumber(e.total) > 50000000
                                      ? {
                                          backgroundColor: darkMode
                                            ? ""
                                            : "#E8FFE8",
                                        }
                                      : {}
                                  }
                                >
                                  <div className="col">{e.total}</div>
                                  <div className="col text-end font-green">
                                    Rp {e.price}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {viewOrderSection === "order_sell" ? (
                      socketOrder ? (
                        <div className="font-10">
                          {socketOrder.ask.slice(0, 12).map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="row py-1"
                                style={
                                  changeStringToNumber(e.total) > 50000000
                                    ? {
                                        backgroundColor: darkMode
                                          ? ""
                                          : "#FEF1F2",
                                      }
                                    : {}
                                }
                              >
                                <div className="col">{e.total}</div>
                                <div className="col text-end font-red">
                                  Rp {e.price}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {/* filter ask bid */}
                    <div className="mt-4">
                      <select
                        name=""
                        id=""
                        aria-label="Default select example"
                        className={
                          darkMode
                            ? "form-select font-12 shadow-none bg-dark-mode text-white border-white"
                            : "form-select font-12 shadow-none  "
                        }
                        onChange={(e) => handleSwitchOrderSection(e)}
                      >
                        <option value="order_all">Lihat Order Book</option>
                        <option value="order_buy">Order Book - Buy</option>
                        <option value="order_sell">Order Book - Sell</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {!tradeStatus ? (
          <>
            {/* Balance IDR */}
            <div className="d-flex justify-content-between mt-3">
              {buySell === "buy" ? (
                <>
                  <div className="text-inter fw-bold text-secondary">
                    Balance IDR
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className="text-secondary"
                      onClick={() => navigate("/deposit/IDR")}
                    >
                      <PlusSym />{" "}
                    </div>
                    <div className="fw-bold ms-2">
                      Rp {IDRFormater(+balanceIDR)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-inter fw-bold text-secondary">
                    Balance {assetName}
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className="text-secondary"
                      onClick={() => navigate(`/deposit/${assetName}`)}
                    >
                      <PlusSym />{" "}
                    </div>
                    <div className="fw-bold ms-2">{balanceAsset}</div>
                  </div>
                </>
              )}
            </div>

            {/* TAKER - MAKER */}
            {dataPrecision ? (
              <p className="text-end mt-2 font-11">
                Fee Maker{" "}
                <span className="font-red">
                  {dataPrecision.data.maker_fee}%
                </span>{" "}
                - Taker{" "}
                <span className="font-red me-2">
                  {dataPrecision.data.taker_fee}%
                </span>
                <InfoCircleFill className="font-primary" />
              </p>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        <hr
          className="text-secondary mt-3"
          style={{ opacity: "3%", border: "2.5px solid black" }}
        />

        {/* Tabulasi order */}
        <div className="scrollbar-none overflow-scroll px-0 mx-0 mt-3">
          <div
            className="row px-0 mx-0 text-inter fw-bold font-16"
            style={!tradeStatus ? { width: "680px" } : { width: "560px" }}
          >
            <div
              className="d-flex mx-0 px-0"
              style={{
                display: "inline-block",
              }}
            >
              {!tradeStatus ? (
                <div
                  className=" p-2 me-3"
                  onClick={() => setTabOrder("order_book")}
                  style={
                    tabOrder === "order_book"
                      ? { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                      : { color: "#DBD7D7" }
                  }
                >
                  Order Book
                </div>
              ) : (
                ""
              )}

              <div
                className=" p-2 me-3"
                onClick={() => setTabOrder("pending_order")}
                style={
                  tabOrder === "pending_order"
                    ? { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                    : { color: "#DBD7D7" }
                }
              >
                Pending Order
              </div>
              <div
                className=" p-2 me-3"
                onClick={() => setTabOrder("market_activity")}
                style={
                  tabOrder === "market_activity"
                    ? { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                    : { color: "#DBD7D7" }
                }
              >
                Market Activity
              </div>
              <div
                className=" p-2"
                onClick={() => {
                  setTabOrder("order_history")
                }}
                style={
                  tabOrder === "order_history"
                    ? { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                    : { color: "#DBD7D7" }
                }
              >
                Order History
              </div>
              <div
                className=" p-2"
                onClick={() => {
                  setTabOrder("trade_history")
                }}
                style={
                  tabOrder === "trade_history"
                    ? { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                    : { color: "#DBD7D7" }
                }
              >
                Trade History
              </div>
            </div>
          </div>
        </div>

        {/* ORDER_BOOK */}
        {!tradeStatus ? (
          <>
            {" "}
            {tabOrder === "order_book" ? (
              <>
                <div className="row text-inter fw-bold font-12">
                  <div className="col-6 d-flex align-items-center">
                    <div>Lihat Orderbook Lengkap </div>
                  </div>
                  <div className="col-6">
                    <select
                      name=""
                      id=""
                      className={
                        darkMode
                          ? "form-select font-12 shadow-none bg-dark-mode text-white border-white"
                          : "form-select font-12 shadow-none"
                      }
                      onChange={(e) => handleSwitchOrderSection(e)}
                    >
                      <option value="order_all">Lihat Order Book</option>
                      <option value="order_buy">Order Book - Buy</option>
                      <option value="order_sell">Order Book - Sell</option>
                    </select>
                  </div>
                </div>

                {/* ALL ORDER (BUY/SELL) */}
                {viewOrderSection === "order_all" ? (
                  <>
                    <div
                      className=" row mt-3 py-2 text-inter fw-bold font-14"
                      style={{
                        backgroundColor: darkMode ? "#282A32" : "#F2F4F7",
                      }}
                    >
                      <div className="col">Jumlah</div>
                      <div className="col text-end">Bid</div>
                      <div className="col">Ask</div>
                      <div className="col text-end">Jumlah</div>
                    </div>
                    {socketOrder ? (
                      <div className="row fw-bold font-12 mt-2">
                        <div className="col">
                          {socketOrder.bid.slice(0, 10).map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="row py-2"
                                style={
                                  changeStringToNumber(e.total) > 50000000
                                    ? {
                                        backgroundColor: darkMode
                                          ? ""
                                          : "#E8FFE8",
                                      }
                                    : {}
                                }
                              >
                                <div className="col">{e.total}</div>
                                <div className="col text-end font-green">
                                  Rp {e.price}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <div className="col">
                          {socketOrder.ask.slice(0, 10).map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="row py-2"
                                style={
                                  changeStringToNumber(e.total) > 50000000
                                    ? {
                                        backgroundColor: darkMode
                                          ? ""
                                          : "#FEF1F2",
                                      }
                                    : {}
                                }
                              >
                                <div className="col font-red">Rp {e.price}</div>
                                <div className="col text-end">{e.total}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {/* ORDER BUY ONLY */}
                {viewOrderSection === "order_buy" ? (
                  <>
                    <div
                      className=" row mt-3 py-2 text-inter fw-bold font-14"
                      style={{ backgroundColor: "#F2F4F7" }}
                    >
                      <div className="col">Jumlah</div>
                      <div className="col">Bid</div>
                    </div>
                    {socketOrder ? (
                      <div className="row fw-bold font-12 mt-2">
                        <div className="col">
                          {socketOrder.bid.slice(0, 10).map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="row py-2"
                                style={
                                  changeStringToNumber(e.total) > 50000000
                                    ? {
                                        backgroundColor: darkMode
                                          ? ""
                                          : "#E8FFE8",
                                      }
                                    : {}
                                }
                              >
                                <div className="col">{e.total}</div>
                                <div className="col font-green">
                                  Rp {e.price}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {/* ORDER BUY ONLY */}
                {viewOrderSection === "order_sell" ? (
                  <>
                    <div
                      className=" row mt-3 py-2 text-inter fw-bold font-14"
                      style={{ backgroundColor: darkMode ? "" : "#F2F4F7" }}
                    >
                      <div className="col">Jumlah</div>
                      <div className="col">Ask</div>
                    </div>
                    {socketOrder ? (
                      <div className="row fw-bold font-12 mt-2">
                        <div className="col">
                          {socketOrder.ask.slice(0, 10).map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="row py-2"
                                style={
                                  changeStringToNumber(e.total) > 50000000
                                    ? {
                                        backgroundColor: darkMode
                                          ? ""
                                          : "#FEF1F2",
                                      }
                                    : {}
                                }
                              >
                                <div className="col">{e.total}</div>
                                <div className="col font-red">Rp {e.price}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {/* PENDING ORDER */}
        {tabOrder === "pending_order" ? (
          <>
            {activeOrder ? (
              activeOrder.length !== 0 ? (
                activeOrder.map((e, i) => {
                  console.log(e)
                  return (
                    <div
                      className="row text-center d-flex align-items-center fw-bold font-12 py-3 border-bottom"
                      key={i}
                    >
                      <div className="col-2 d-flex align-items-center ">
                        <div
                          className={
                            e.side === "BUY"
                              ? darkMode
                                ? " border text-success border-success text-center rounded  px-3 py-1"
                                : "font-green text-center rounded  px-3 py-1"
                              : darkMode
                              ? "border text-danger border-danger text-center rounded  px-3 py-1"
                              : "font-red bg-red text-center rounded  px-3 py-1"
                          }
                          style={
                            e.side === "BUY"
                              ? { backgroundColor: darkMode ? "" : "#D0FFD0" }
                              : { backgroundColor: darkMode ? "" : "#fef1f2" }
                          }
                          // style={
                          //   e.side === "BUY"
                          //     ? { backgroundColor: darkMode ? "#05BB59" :"#D0FFD0" }
                          //     : { backgroundColor: darkMode ? "#E0341C": "#fef1f2" }
                          // }
                        >
                          {e.side}
                        </div>
                      </div>
                      <div className="col-3  text-start">
                        <div>{e.symbol}</div>
                        <div className="fw-normal font-10">{e.date} </div>
                      </div>
                      <div className="col-7 d-flex justify-content-between align-items-center">
                        <div className="text-start">
                          <div>Rp {IDRFormater(+e.price * +e.quantity)}</div>
                          <div className="fw-normal font-10">
                            Qty : {+e.quantity}
                          </div>
                          <div className="fw-normal font-10">
                            @ Rp {IDRFormater(+e.price)}
                          </div>
                        </div>
                        <div className="d-flex align-items-center mx-0 px-0">
                          <div
                            className={
                              darkMode
                                ? "text-white text-center rounded  border border-danger px-3 py-1"
                                : "font-red text-center rounded  border border-danger px-3 py-1"
                            }
                            style={{
                              backgroundColor: darkMode ? "#E0341C" : "#FFFFFF",
                            }}
                            onClick={() => {
                              if (viewWaitingCancel === "Cancel") {
                                setViewWaitingCancel("Waiting")
                                cancelOrder(e.id, e.side, e.symbol)
                              }
                            }}
                          >
                            {viewWaitingCancel}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="mt-3">
                  <img
                    src={DataEmptyImg}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                  <p className="font-14 text-center mt-3">
                    No Pending Order History
                  </p>
                </div>
              )
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {/* MARKET ACTIVITY */}
        {tabOrder === "market_activity" ? (
          <>
            <>
              <div
                className="row font-12 fw-bold py-2 mb-3"
                style={{ backgroundColor: darkMode ? "#282A32" : "#F2F4F7" }}
              >
                <div className="col-4">Tanggal</div>
                <div className="col-4 text-center">Price (IDR)</div>
                <div className="col-4 text-end">Amount ({assetName})</div>
              </div>
              {marketActivity.length !== 0
                ? marketActivity.map((e, i) => {
                    return (
                      <>
                        <div className="row font-12 mt-1 py-2" key={i}>
                          <div className="col-4">
                            <div className="d-flex justify-content-between">
                              <div>{timeStampConv(e.date).split("-")[1]}</div>
                              <div>{timeStampConv(e.date).split("-")[0]}</div>
                            </div>
                          </div>
                          <div
                            className={
                              e.type === "BUY"
                                ? "col-4 text-center font-green"
                                : "col-4 text-center font-red"
                            }
                          >
                            Rp {IDRFormater(+e.price)}
                          </div>
                          <div className="col-4 text-end fw-bold">
                            {IDRFormater(+e.amount.toLocaleString())}
                          </div>
                        </div>
                      </>
                    )
                  })
                : ""}
            </>
          </>
        ) : (
          ""
        )}

        {/* ORDER HISTORY */}
        {tabOrder === "order_history" ? (
          <>
            <div>
              <div className="row">
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
                {/* Search Button */}
                <div className="d-grid col-12 mt-3">
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B6AEA" }}
                    onClick={() => handleSearchTradeOrder(dateStart, dateEnd)}
                  >
                    Search
                  </button>
                </div>
                {/* table order history */}
                {orderHistory.length !== 0 ? (
                  orderHistory.map((e, i) => {
                    return (
                      <>
                        {" "}
                        <div
                          className="row text-center d-flex align-items-center fw-bold font-12 py-3 border-bottom"
                          key={i}
                        >
                          <div className="col-2 d-flex align-items-center ">
                            <div
                              className={
                                e.type === "BUY"
                                  ? "font-green text-center rounded  px-3 py-1"
                                  : "font-red bg-red text-center rounded  px-3 py-1"
                              }
                              style={
                                e.type === "BUY"
                                  ? { backgroundColor: "#D0FFD0" }
                                  : { backgroundColor: "#fef1f2" }
                              }
                            >
                              {e.type}
                            </div>
                          </div>
                          <div className="col-3  text-center">
                            <div>
                              {assetName}-{pairName}
                            </div>
                            <div className="fw-normal font-10">
                              {e.created_at}{" "}
                            </div>
                          </div>
                          <div className="col-7 d-flex justify-content-between align-items-center">
                            <div className="text-start">
                              <div>
                                Rp {IDRFormater(+e.price * +e.quantity)}
                              </div>
                              <div className="fw-normal font-10">
                                Qty : {+e.quantity}
                              </div>
                              <div className="fw-normal font-10">
                                Rp {IDRFormater(+e.price)}
                              </div>
                            </div>
                            <div className="d-flex align-items-center mx-0 px-0">
                              <div
                                className="font-red text-center rounded  font-10 px-3 py-1"
                                style={{ backgroundColor: "#FFFFFF" }}
                              >
                                {e.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                ) : (
                  <div className="row my-5">
                    <div className="mb-2">
                      <img
                        src={DataEmptyImg}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                      <p className="font-14 text-center">No Data</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* TRADE HISTORY */}
        {tabOrder === "trade_history" ? (
          <>
            <div>
              <div className="row">
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
                {/* Search Button */}
                <div className="d-grid col-12 mt-3">
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B6AEA" }}
                    onClick={() => handleSearchTradeHistory(dateStart, dateEnd)}
                  >
                    Search
                  </button>
                </div>
                {/* table order history */}
                {tradeHistory.length !== 0 ? (
                  tradeHistory.map((e, i) => {
                    console.log(e)
                    return (
                      <>
                        {" "}
                        <div
                          className="row text-center d-flex align-items-center fw-bold font-12 py-3 border-bottom"
                          key={i}
                        >
                          <div className="col-2 d-flex align-items-center ">
                            <div
                              className={
                                e.side === "BUY"
                                  ? "font-green text-center rounded  px-3 py-1"
                                  : "font-red bg-red text-center rounded  px-3 py-1"
                              }
                              style={
                                e.side === "BUY"
                                  ? { backgroundColor: "#D0FFD0" }
                                  : { backgroundColor: "#fef1f2" }
                              }
                            >
                              {e.side}
                            </div>
                          </div>
                          <div className="col-3  text-center">
                            <div>
                              {assetName}-{pairName}
                            </div>
                            <div className="fw-normal font-10">
                              {e.updated_at}{" "}
                            </div>
                          </div>
                          <div className="col-7 d-flex justify-content-between align-items-center">
                            <div className="text-start">
                              <div>
                                Rp {IDRFormater(+e.price * +e.quantity)}
                              </div>
                              <div className="fw-normal font-10">
                                Qty : {+e.quantity}
                              </div>
                              <div className="fw-normal font-10">
                                Rp {IDRFormater(+e.price)}
                              </div>
                            </div>
                            <div className="d-flex align-items-center mx-0 px-0">
                              <div
                                className={
                                  e.status === "FILLED"
                                    ? "font-green text-center rounded  font-10 px-3 py-1"
                                    : "font-red text-center rounded  font-10 px-3 py-1"
                                }
                                style={{ backgroundColor: "#FFFFFF" }}
                              >
                                {e.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                ) : (
                  <div className="row my-5">
                    <div className="mb-2">
                      <img
                        src={DataEmptyImg}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                      <p className="font-14 text-center">No Data</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* fixed navbar */}
      <div
        className={
          darkMode
            ? "fixed-navbar w-100 px-2 width-breakpoint  bg-dark-mode2 text-white"
            : "fixed-navbar w-100 px-2 width-breakpoint"
        }
        style={{
          height: 70,
          borderTop: "1.5px solid rgba(128, 128, 128, 0.25)",
          maxWidth: 480,
        }}
      >
        <div className="d-flex align-items-center h-100 justify-content-between px-4">
          <div className="fw-bold font-12">
            <div>Total</div>
            <div
              className={
                buySell === "buy"
                  ? "font-14 text-primary"
                  : "font-14 text-danger"
              }
            >
              Rp {IDRFormater(+IDR)}
            </div>
          </div>

          {buySell === "buy" ? (
            !dataPrecision ? (
              // No-Data Precision
              ""
            ) : // BUY - NON INTEGRASI
            dataPrecision.data.integrasi === "0" ? (
              +IDR > +dataPrecision.data.min_pair_transaction ? (
                <div
                  className="btn btn-success"
                  style={{ width: 150 }}
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#buy-modal"
                >
                  Beli
                </div>
              ) : (
                <div className="btn btn-secondary" style={{ width: 150 }}>
                  Beli
                </div>
              )
            ) : // BUY - INTEGRASI
            +amount >= +dataPrecision.data.min_pair_transaction ? (
              <div
                className="btn btn-success"
                style={{ width: 150 }}
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#buy-modal"
              >
                Beli
              </div>
            ) : (
              <div className="btn btn-secondary" style={{ width: 150 }}>
                Beli
              </div>
            )
          ) : !dataPrecision ? (
            // No-Data Precision
            ""
          ) : // SELL INTEGRASI & NON INTEGRASI
          +amount >= +dataPrecision.data.min_symbol_transaction ? (
            // pop-up modal transaction (sell)
            <div
              className="btn btn-danger"
              style={{ width: 150 }}
              data-bs-dismiss="modal"
              data-bs-toggle="modal"
              data-bs-target="#sell-modal"
            >
              Jual
            </div>
          ) : (
            // disable button
            <div className="btn btn-secondary" style={{ width: 150 }}>
              Jual
            </div>
          )}
        </div>
      </div>

      {/* modal buy */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="buy-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className={
              darkMode
                ? "modal-content rounded border-0 py-2 bg-dark-mode2 text-white"
                : "modal-content rounded border-0 py-2"
            }
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body py-4">
              <p className="font-18 fw-bold text-center">
                Are you sure to Buy ?
              </p>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Amount </p>
                <p className="font-14 fw-bold">
                  {amount} / {assetName}
                </p>
              </div>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">At Price</p>
                {price ? (
                  <p className="font-14 fw-bold">
                    {IDRFormater(price)} IDR / {assetName}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Estimation</p>
                {price && amount ? (
                  <p className="font-14 fw-bold">
                    {IDRFormater(+price * +amount)} IDR
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div
                className="mb-3"
                style={{ border: "1px solid #DDE4EA" }}
              ></div>
              {/* Fee Taker Maker */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Fee Taker Maker</p>
                <p className="font-14 fw-bold font-red">0.36% - 0.36%</p>
              </div>
              {/* button cancel buy */}
              <div className="d-flex">
                {successOrder ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "#F2F2F2",
                      width: "163px",
                      height: "43px",
                    }}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                )}

                {!successOrder ? (
                  <button
                    type="button"
                    className="btn btn-primary text-white ms-2"
                    style={{
                      // backgroundColor: "#20CB6F",
                      width: "163px",
                      height: "43px",
                    }}
                    onClick={() => {
                      setSuccessOrder("waiting...")
                      handleSubmitOrder()
                    }}
                  >
                    Beli
                  </button>
                ) : successOrder === "Success" ? (
                  <button
                    type="button"
                    className="btn w-100 text-white ms-2"
                    style={{
                      backgroundColor: "#20CB6F",
                      width: "163px",
                      height: "43px",
                    }}
                    data-bs-dismiss="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-success-order"
                  >
                    {successOrder}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn w-100 text-white ms-2 bg-secondary"
                    data-bs-dismiss="modal"
                    style={{
                      backgroundColor: "#20CB6F",
                      width: "163px",
                      height: "43px",
                    }}
                    onClick={() => {
                      setSuccessOrder("")
                    }}
                  >
                    {successOrder}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal success order */}
      {successOrder ? (
        <div
          className="modal modal-sm custom fade profile-info text-roboto rounded-0"
          id="modal-success-order"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered justify-content-center">
            <div
              className={
                darkMode
                  ? "modal-content rounded border-0 py-2 bg-dark-mode2 text-white"
                  : "modal-content rounded border-0 py-2"
              }
              id="modal-addBankAccount"
              style={{ width: "350px" }}
            >
              <div className="modal-body py-4">
                <img
                  src={SuccessOrderImg}
                  alt=""
                  className="img-fluid mx-auto d-block"
                />
                <p className="font-18 fw-bold text-center mt-2">
                  Order book Set!
                </p>
                <p className="font-12 fw-normal text-center mt-2">
                  Order book has been Set! You will be notified when the price
                  order has been executed
                </p>
                {/* button ok */}
                <div className="d-grid col-12">
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B6AEA" }}
                    data-bs-dismiss="modal"
                    onClick={() => setSuccessOrder(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* modal sell */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="sell-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className={
              darkMode
                ? "modal-content rounded border-0 py-2 bg-dark-mode2 text-white"
                : "modal-content rounded border-0 py-2 bg-dark-mode2 text-white"
            }
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body py-4">
              <p className="font-18 fw-bold text-center">
                Are you sure to Sell?
              </p>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Amount </p>
                <p className="font-14 fw-bold">
                  {amount} / {assetName}
                </p>
              </div>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">At Price</p>
                {price ? (
                  <p className="font-14 fw-bold">
                    {IDRFormater(price)} IDR / {assetName}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Estimation</p>
                {price && amount ? (
                  <p className="font-14 fw-bold">
                    {IDRFormater(+price * +amount)} IDR
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div
                className="mb-3"
                style={{ border: "1px solid #DDE4EA" }}
              ></div>
              {/* Fee Taker Maker */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Fee Taker Maker</p>
                <p className="font-14 fw-bold font-red">0.36% - 0.36%</p>
              </div>
              {/* button cancel buy */}

              <div className="d-flex">
                {successOrder ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "#F2F2F2",
                      width: "163px",
                      height: "43px",
                    }}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                )}

                {!successOrder ? (
                  <button
                    type="button"
                    className="btn text-white ms-2"
                    style={{
                      backgroundColor: "#F4465E",
                      width: "163px",
                      height: "43px",
                    }}
                    onClick={() => {
                      setSuccessOrder("waiting...")
                      handleSubmitOrder()
                    }}
                  >
                    Jual
                  </button>
                ) : successOrder === "Success" ? (
                  <button
                    type="button"
                    className="btn w-100 text-white ms-2"
                    style={{
                      backgroundColor: "#20CB6F",
                      width: "163px",
                      height: "43px",
                    }}
                    data-bs-dismiss="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-success-order"
                  >
                    {successOrder}
                  </button>
                ) : successOrder === "Failed" ? (
                  <button
                    type="button"
                    className="btn w-100 text-white ms-2"
                    style={{
                      backgroundColor: "#F4465E",
                      width: "163px",
                      height: "43px",
                    }}
                  >
                    {successOrder}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn w-100 text-white ms-2 bg-secondary"
                    style={{
                      backgroundColor: "#20CB6F",
                      width: "163px",
                      height: "43px",
                    }}
                  >
                    {successOrder}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicTradingPage

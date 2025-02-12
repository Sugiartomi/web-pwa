import React, { useEffect, useState } from "react"
import DataEmptyImg from "../assets/DataEmpty.svg"
import KlineChart from "../components/Market/KlineChart"
import {
  CaretDownFill,
  CaretUpFill,
  ChevronLeft,
  Star,
  StarFill,
} from "react-bootstrap-icons"
import { json, useLocation, useNavigate, useParams } from "react-router-dom"
import { changeStringToNumber } from "../helpers/dataFunction"
import { useRecoilState } from "recoil"

import { IDRFormater } from "../helpers/currencyFormater"
import NavigationButton from "../components/global/NavigationButton"
import { getTheme } from "../recoil/theme.State"

import {
  dbMarketActivity,
  dbSocketOrder,
  dbTicker,
} from "../DB/MarketDetailPage"
import { dbAllTicker } from "../DB/MarketPage"

function MarketDetailPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const [dataTicker, setDataTicker] = useState(dbTicker)
  const [socketOrder, setSocketOrder] = useState(dbSocketOrder)
  const [tradeHistory, setTradeHistory] = useState()
  // tradeHistory belum
  const [favoriteStatus, setFavoriteStatus] = useState(true)
  const [statePath, setStatePath] = useState("2.56")
  const [fullNameAsset, setFullNameAsset] = useState("Bitcoin")
  const [balanceIDR, setBalanceIDR] = useState(650035000)
  const [balanceAsset, setBalanceAsset] = useState(6)
  const [tabOrder, setTabOrder] = useState("order_book")
  const [viewOrderSection, setViewOrderSection] = useState("order_all")
  const [marketActivity, setMarketActivity] = useState(dbMarketActivity)

  const navigate = useNavigate()

  const { state, pathname } = useLocation()
  const { name } = useParams()
  const assetName = name.split("-")[0]
  const pairName = name.split("-")[1]
  const userToken = localStorage.getItem("token")
  const [lastPricePercent, setLastPricePercent] = useState("2.56")

  const [dataAllTicker, setdataAllTicker] = useState(dbAllTicker)

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

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
      >
        <div className="d-flex justify-content-between pt-2 align-items-center">
          <p className="font-18" onClick={() => navigate("/market")}>
            <ChevronLeft />
          </p>
          <p className="font-18 fw-bold">{fullNameAsset}</p>
          {favoriteStatus ? (
            <p className="font-18 font-yellow">
              <StarFill />
            </p>
          ) : (
            <p className="font-18 font-yellow">
              <Star />
            </p>
          )}
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center">
              <img
                src={`https://asset.digitalexchange.id/coin/${assetName}.png`}
                className="img-fluid"
                style={{ objectFit: "cover", height: 54 }}
                alt=""
              />
              <div className="ms-2">
                <p className="font-16 fw-bold me-2 mb-0">
                  {assetName}/{pairName}
                </p>
                <p className="font-16 me-2 mb-0">{fullNameAsset}</p>
              </div>
            </div>
          </div>
          <div className="col text-end">
            <p className="font-20 fw-bold me-2 mb-0 me-0">
              {dataTicker ? ` Rp ${IDRFormater(+dataTicker.ask)}` : ""}
            </p>
            <div>
              {statePath && statePath ? (
                <p
                  className="badge font-red mb-0 me-2"
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
        </div>
      </div>

      {/* kline */}
      <div className="mt-4 mx-1">
        <KlineChart pairName={pairName} assetName={assetName} />
      </div>
      {/* <KlineChart /> */}
      <hr
        className="text-secondary mt-3"
        style={{ opacity: "3%", border: "2.5px solid black" }}
      />

      <div
        className={
          darkMode
            ? "container text-inter text-secondary px-3 text-white"
            : "container text-inter text-secondary px-3"
        }
      >
        <p
          className={
            darkMode
              ? "font-20 fw-bold text-white"
              : "font-20 fw-bold text-secondary"
          }
        >
          Stats
        </p>
        {dataTicker ? (
          <div className="row pb-3">
            <div className="col">
              <div className="d-flex justify-content-between align-items-center">
                <p
                  className={
                    darkMode ? "mb-0 font-14 text-grey" : "mb-0 font-14"
                  }
                >
                  High
                </p>
                <p className="mb-0 fw-bold">
                  Rp {IDRFormater(+dataTicker.high)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p
                  className={
                    darkMode ? "mb-0 font-14 text-grey" : "mb-0 font-14"
                  }
                >
                  Volume
                </p>
                <p className="mb-0 fw-bold">
                  {Number(dataTicker.volume).toLocaleString().replace(",", ".")}
                </p>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-between align-items-center">
                <p
                  className={
                    darkMode ? "mb-0 font-14 text-grey" : "mb-0 font-14"
                  }
                >
                  Low
                </p>
                <p className="mb-0 fw-bold">
                  Rp {IDRFormater(+dataTicker.low)}
                </p>
              </div>
              <div
                className="d-flex justify-content-between align-items-center mt-2"
                style={
                  lastPricePercent[0] === "-"
                    ? { color: "#F4465E" }
                    : { color: "#20CB6F" }
                }
              >
                <p
                  className={
                    darkMode
                      ? "mb-0 text-grey font-14"
                      : "mb-0 font-dark font-14"
                  }
                >
                  24h (%)
                </p>
                <p className="mb-0 fw-bold">{lastPricePercent}%</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <hr
        className="text-secondary mt-3"
        style={{ opacity: "3%", border: "2.5px solid black" }}
      />

      {/* balance status */}
      {userToken ? (
        <>
          {" "}
          <div
            className={
              darkMode
                ? "container text-inter text-grey px-3"
                : "container text-inter text-secondary px-3"
            }
          >
            <p
              className={
                darkMode
                  ? "font-20 mb-2 fw-bold text-white"
                  : "font-20 mb-2 fw-bold text-secondary"
              }
            >
              Your {assetName} Total Asset
            </p>
            <div className="border py-3 p-2 px-4" style={{ borderRadius: 15 }}>
              <div className="d-flex justify-content-between font-inter font-10">
                <div className="">Avail Balance</div>
                <div className="">Total Asset</div>
                <div className="">Eqv Asset (IDR)</div>
              </div>
              <div
                className={
                  darkMode
                    ? "d-flex justify-content-between font-inter font-12 fw-bold text-white mt-1 text-center"
                    : "d-flex justify-content-between font-inter font-12 fw-bold text-dark mt-1 text-center"
                }
              >
                <div className="">
                  {" "}
                  <span className="font-10">Rp</span> {IDRFormater(+balanceIDR)}
                </div>
                <div className="">
                  {Number(balanceAsset).toLocaleString().replace(".", ",")}{" "}
                  <span className="font-10">{assetName}</span>
                </div>
                <div className="">
                  {" "}
                  <span className="font-10">Rp</span>{" "}
                  {dataTicker
                    ? IDRFormater(+dataTicker.ask * balanceAsset)
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <hr
            className="text-secondary mt-3"
            style={{ opacity: "3%", border: "2.5px solid black" }}
          />
        </>
      ) : (
        <NavigationButton />
      )}

      {/* Tabulasi order */}
      <div className="scrollbar-none overflow-scroll px-0 mx-0 mt-3">
        <div
          className="row px-0 mx-0 text-inter fw-bold font-16"
          style={{ width: "500px" }}
        >
          <div
            className="d-flex mx-0 px-0"
            style={{
              display: "inline-block",
            }}
          >
            <div
              className=" p-2 me-3"
              onClick={() => setTabOrder("order_book")}
              style={
                tabOrder === "order_book"
                  ? darkMode
                    ? { borderBottom: "2px solid #FFFFFF", color: "#FFFFFF" }
                    : { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                  : darkMode
                  ? { color: "#6a6a6a" }
                  : { color: "#DBD7D7" }
              }
            >
              Order Book
            </div>

            <div
              className=" p-2 me-3"
              onClick={() => setTabOrder("market_activity")}
              style={
                tabOrder === "market_activity"
                  ? darkMode
                    ? { borderBottom: "2px solid #FFFFFF", color: "#FFFFFF" }
                    : { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                  : darkMode
                  ? { color: "#6a6a6a" }
                  : { color: "#DBD7D7" }
              }
            >
              Market Activity
            </div>

            <div
              className=" p-2"
              onClick={() => {
                setTabOrder("about_binance")
              }}
              style={
                tabOrder === "about_binance"
                  ? darkMode
                    ? { borderBottom: "2px solid #FFFFFF", color: "#FFFFFF" }
                    : { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                  : darkMode
                  ? { color: "#6a6a6a" }
                  : { color: "#DBD7D7" }
              }
            >
              About Binance
            </div>
            <div
              className=" p-2"
              onClick={() => {
                setTabOrder("news")
              }}
              style={
                tabOrder === "news"
                  ? darkMode
                    ? { borderBottom: "2px solid #FFFFFF", color: "#FFFFFF" }
                    : { borderBottom: "2px solid #266DE0", color: "#266DE0" }
                  : darkMode
                  ? { color: "#6a6a6a" }
                  : { color: "#DBD7D7" }
              }
            >
              News
            </div>
          </div>
        </div>
      </div>

      {/* order Book */}
      {tabOrder === "order_book" ? (
        <div className="container mb-5">
          <div className="row text-inter fw-bold font-12">
            <div className="col-6 d-flex align-items-center">
              <div className={darkMode ? "text-white" : ""}>
                Lihat Orderbook Lengkap{" "}
              </div>
            </div>
            <div className="col-6">
              <select
                name=""
                id=""
                className={
                  darkMode
                    ? "form-select font-12 shadow-none bg-dark-mode2 text-white"
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
                style={
                  darkMode
                    ? { backgroundColor: "#282A32", color: "#FFFFFF" }
                    : { backgroundColor: "#F2F4F7" }
                }
              >
                <div className="col">Jumlah</div>
                <div className="col text-end">Bid</div>
                <div className="col">Ask</div>
                <div className="col text-end">Jumlah</div>
              </div>
              {socketOrder ? (
                <div className="d-flex justify-content-between fw-bold font-10 mt-2">
                  <div className="w-100">
                    {socketOrder.bid.slice(0, 10).map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="d-flex justify-content-between w-100 py-2"
                          style={
                            changeStringToNumber(e.total) > 50000000
                              ? darkMode
                                ? { color: "#FFFFFF" }
                                : { backgroundColor: "#E8FFE8" }
                              : darkMode
                              ? { color: "#595959" }
                              : {}
                          }
                        >
                          <div className="">{e.total}</div>
                          <div className=" text-end font-green">
                            Rp {e.price}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="w-100 ps-2">
                    {socketOrder.ask.slice(0, 10).map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="d-flex justify-content-between py-2"
                          style={
                            changeStringToNumber(e.total) > 50000000
                              ? darkMode
                                ? { color: "#FFFFFF" }
                                : { backgroundColor: "#E8FFE8" }
                              : darkMode
                              ? { color: "#595959" }
                              : {}
                          }
                        >
                          <div className=" font-red">Rp {e.price}</div>
                          <div className=" text-end">{e.total}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    darkMode ? "row my-5 bg-dark-mode text-white" : "row my-5"
                  }
                >
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
            </>
          ) : (
            ""
          )}

          {/* ORDER BUY ONLY */}
          {viewOrderSection === "order_buy" ? (
            <>
              <div
                className={
                  darkMode
                    ? "row mt-3 py-2 text-inter fw-bold font-14 bg-dark-mode2 text-white"
                    : "row mt-3 py-2 text-inter fw-bold font-14"
                }
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
                              ? darkMode
                                ? { color: "#FFFFFF" }
                                : { backgroundColor: "#E8FFE8" }
                              : darkMode
                              ? { color: "#595959" }
                              : {}
                          }
                        >
                          <div className="col">{e.total}</div>
                          <div className="col font-green">Rp {e.price}</div>
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
                className={
                  darkMode
                    ? "row mt-3 py-2 text-inter fw-bold font-14 bg-dark-mode2 text-white"
                    : "row mt-3 py-2 text-inter fw-bold font-14"
                }
                style={{ backgroundColor: "#F2F4F7" }}
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
                              ? darkMode
                                ? { color: "#FFFFFF" }
                                : { backgroundColor: "#E8FFE8" }
                              : darkMode
                              ? { color: "#595959" }
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
        </div>
      ) : (
        ""
      )}

      {/* Market Activity */}
      {tabOrder === "market_activity" ? (
        <div className={darkMode ? "container text-white" : "container"}>
          <div
            className={
              darkMode
                ? "row font-12 fw-bold py-2 mb-3 bg-dark-mode2 text-white"
                : "row font-12 fw-bold py-2 mb-3"
            }
            style={{ backgroundColor: "#F2F4F7" }}
          >
            <div className="col-4">Tanggal</div>
            <div className="col-4 text-center">Price (IDR)</div>
            <div className="col-4 text-end">Amount ({assetName})</div>
          </div>
          {marketActivity.length !== 0 ? (
            marketActivity.map((e, i) => {
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
      ) : (
        ""
      )}

      {/* about binance */}
      {tabOrder === "about_binance" ? (
        <div className="row my-5">
          <div className="mb-2">
            <img
              src={DataEmptyImg}
              alt=""
              className="img-fluid mx-auto d-block"
            />
            <p
              className={
                darkMode
                  ? "font-14 text-center mt-2 text-white fw-bold"
                  : "font-14 text-center mt-2"
              }
            >
              No Data
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* news */}
      {tabOrder === "news" ? (
        <div className="row my-5">
          <div className="mb-2">
            <img
              src={DataEmptyImg}
              alt=""
              className="img-fluid mx-auto d-block"
            />
            <p
              className={
                darkMode
                  ? "font-14 text-center mt-2 text-white fw-bold"
                  : "font-14 text-center mt-2"
              }
            >
              No Data
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div style={{ marginTop: 70 }}></div>
      {/* fixed navbar */}
      {userToken ? (
        <div
          className={
            darkMode
              ? "fixed-navbar px-2 col-12 width-breakpoint bg-dark-mode2"
              : "fixed-navbar px-2 col-12 width-breakpoint"
          }
          style={{
            height: 70,
            borderTop: "1.5px solid rgba(128, 128, 128, 0.25)",
            maxWidth: 480,
          }}
        >
          {userToken ? (
            <div className="container">
              <div className="row gx-3" style={{ marginTop: 12 }}>
                <div className="col d-grid">
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#E0341C", height: "46px" }}
                    onClick={() =>
                      navigate(`/trade/${assetName}-${pairName}`, {
                        state: {
                          last_price_percentage_24h: lastPricePercent,
                          socketOrder,
                          dataTicker,
                          allTicker: dataAllTicker,
                          target: "sell",
                        },
                      })
                    }
                  >
                    Jual
                  </button>
                </div>
                <div className="col d-grid">
                  <button
                    type="button"
                    className="btn text-white"
                    onClick={() =>
                      navigate(`/trade/${assetName}-${pairName}`, {
                        state: {
                          last_price_percentage_24h: lastPricePercent,
                          socketOrder,
                          dataTicker,
                          allTicker: dataAllTicker,
                        },
                      })
                    }
                    style={{ backgroundColor: "#32BA71", height: "46px" }}
                  >
                    Beli
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default MarketDetailPage

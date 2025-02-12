import React, { useEffect, useState } from "react"
import NavigationButton from "../components/global/NavigationButton"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  CaretDownFill,
  CaretUpFill,
  GraphUpArrow,
  SortAlphaUp,
  Star,
} from "react-bootstrap-icons"

import { IDRFormater } from "../helpers/currencyFormater"
import { useRecoilState } from "recoil"

import { BsSearch } from "react-icons/bs"
import { getTheme } from "../recoil/theme.State"
import {
  dbAllTicker,
  dbRealFav1,
  dbSortBy24h,
  dbSortByLast,
  dbSortByName,
  dbSortByVol,
} from "../DB/MarketPage"

function MarketPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [realFav1, setRealFav1] = useState(dbRealFav1)
  const [allTicker, setAllTicker] = useState(dbAllTicker)
  const [readyData, setReadyData] = useState(false)
  const userToken = localStorage.getItem("token")

  // search
  const [search, setSearch] = useState("")

  // integrasi
  const [sort1_name, set_sort1_name] = useState(dbSortByName)
  const [sort1_vol, set_sort1_vol] = useState(dbSortByVol)
  const [sort1_24h, set_sort1_24h] = useState(dbSortBy24h)
  const [sort1_last, set_sort1_last] = useState(dbSortByLast)

  const [tabOrder, setTabOrder] = useState("all")
  const [paramTabOrder, setParamTabOrder] = useState("asc")

  // function navigate to trade page
  const navigateToTrade = (coin, data) => {
    navigate(`/market/${coin}`, {
      state: { last_price_percentage_24h: data, allTicker },
    })
  }

  return (
    <>
      {/* Container Luar */}
      <div
        className={
          darkMode
            ? "container text-inter bg-dark-mode2 text-white"
            : "container text-inter"
        }
        style={{ position: "fixed", backgroundColor: "#FFFFFF", maxWidth: 480 }}
      >
        {/* SEARCH */}
        <div className="d-flex mt-3">
          <div className="w-100 me-2">
            <input
              disabled={tabOrder === "favourites" ? true : ""}
              type="text"
              className={
                darkMode
                  ? "form-control shadow-none w-100 bg-dark-mode text-white border-0"
                  : "form-control shadow-none w-100"
              }
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          </div>
          <div className="">
            <div className="d-flex align-items-center h-100 w-100">
              <div className="fw-bold font-16 w-100">
                <BsSearch />
              </div>
            </div>
          </div>
        </div>

        {/* TABULASI */}
        <div
          className={
            darkMode
              ? "scrollbar-none overflow-scroll px-0 mx-0 mt-3 bg-dark-mode2"
              : "scrollbar-none overflow-scroll px-0 mx-0 mt-3"
          }
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            className="row px-0 mx-0 text-inter fw-bold font-12"
            style={{ width: "650px" }}
          >
            <div
              className="d-flex mx-0 px-0"
              style={{
                display: "inline-block",
              }}
            >
              {/* NAME */}
              <div
                className=" py-2 px-3 me-2"
                onClick={() => {
                  setTabOrder("all")
                }}
                style={
                  tabOrder === "all"
                    ? {
                        backgroundColor: "#266DE0",
                        color: "#FFFFFF",
                        borderRadius: 15,
                      }
                    : darkMode
                    ? {
                        backgroundColor: "#2F343E",
                        color: "grey",
                        borderRadius: 15,
                      }
                    : {
                        backgroundColor: "#F2F4F7",
                        color: "grey",
                        borderRadius: 15,
                      }
                }
              >
                <SortAlphaUp className="me-2" style={{ marginTop: -3 }} />
                Name
                <span
                  onClick={() =>
                    paramTabOrder === "asc"
                      ? setParamTabOrder("desc")
                      : setParamTabOrder("asc")
                  }
                >
                  {tabOrder === "all" ? (
                    paramTabOrder === "asc" ? (
                      <CaretUpFill className="ms-3" />
                    ) : (
                      <CaretDownFill className="ms-3" />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </div>

              {/* VOLUME */}
              <div
                className=" py-2 px-4 me-2"
                onClick={() => {
                  setTabOrder("vol_24h")
                }}
                style={
                  tabOrder === "vol_24h"
                    ? {
                        backgroundColor: "#266DE0",
                        color: "#FFFFFF",
                        borderRadius: 15,
                      }
                    : darkMode
                    ? {
                        backgroundColor: "#2F343E",
                        color: "grey",
                        borderRadius: 15,
                      }
                    : {
                        backgroundColor: "#F2F4F7",
                        color: "grey",
                        borderRadius: 15,
                      }
                }
              >
                <GraphUpArrow className="me-2" style={{ marginTop: -3 }} />
                Volume
                <span
                  onClick={() =>
                    paramTabOrder === "asc"
                      ? setParamTabOrder("desc")
                      : setParamTabOrder("asc")
                  }
                >
                  {tabOrder === "vol_24h" ? (
                    paramTabOrder === "asc" ? (
                      <CaretUpFill className="ms-3" />
                    ) : (
                      <CaretDownFill className="ms-3" />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </div>

              {/* 24H % */}
              <div
                className=" py-2 px-4 me-2"
                onClick={() => setTabOrder("changes_24h")}
                style={
                  tabOrder === "changes_24h"
                    ? {
                        backgroundColor: "#266DE0",
                        color: "#FFFFFF",
                        borderRadius: 15,
                      }
                    : darkMode
                    ? {
                        backgroundColor: "#2F343E",
                        color: "grey",
                        borderRadius: 15,
                      }
                    : {
                        backgroundColor: "#F2F4F7",
                        color: "grey",
                        borderRadius: 15,
                      }
                }
              >
                <span className="me-2 fw-normal">%</span> 24H Changes
                <span
                  onClick={() =>
                    paramTabOrder === "asc"
                      ? setParamTabOrder("desc")
                      : setParamTabOrder("asc")
                  }
                >
                  {tabOrder === "changes_24h" ? (
                    paramTabOrder === "asc" ? (
                      <CaretUpFill className="ms-3" />
                    ) : (
                      <CaretDownFill className="ms-3" />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </div>

              {/* PRICE */}
              <div
                className=" py-2 px-4 me-2"
                onClick={() => setTabOrder("price")}
                style={
                  tabOrder === "price"
                    ? {
                        backgroundColor: "#266DE0",
                        color: "#FFFFFF",
                        borderRadius: 15,
                      }
                    : darkMode
                    ? {
                        backgroundColor: "#2F343E",
                        color: "grey",
                        borderRadius: 15,
                      }
                    : {
                        backgroundColor: "#F2F4F7",
                        color: "grey",
                        borderRadius: 15,
                      }
                }
              >
                <span className="me-2 fw-normal">$</span> Price
                <span
                  onClick={() =>
                    paramTabOrder === "asc"
                      ? setParamTabOrder("desc")
                      : setParamTabOrder("asc")
                  }
                >
                  {tabOrder === "price" ? (
                    paramTabOrder === "asc" ? (
                      <CaretUpFill className="ms-3" />
                    ) : (
                      <CaretDownFill className="ms-3" />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div
                className=" py-2 px-4 me-2"
                onClick={() => setTabOrder("favourites")}
                style={
                  tabOrder === "favourites"
                    ? {
                        backgroundColor: "#266DE0",
                        color: "#FFFFFF",
                        borderRadius: 15,
                      }
                    : darkMode
                    ? {
                        backgroundColor: "#2F343E",
                        color: "grey",
                        borderRadius: 15,
                      }
                    : {
                        backgroundColor: "#F2F4F7",
                        color: "grey",
                        borderRadius: 15,
                      }
                }
              >
                <Star className="me-2" style={{ marginTop: -3 }} />
                Favourites
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 130 }} />

      {/* Table Integrasi */}
      <div className="container">
        {/* ALL - DEFAULT */}
        {tabOrder === "all" ? (
          <>
            {!sort1_name.length
              ? ""
              : paramTabOrder === "asc"
              ? sort1_name.map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter text-white font-14 ms-2"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div
                                  className={"fw-bold  text-inter font-10 ms-2"}
                                >
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className={"mb-0 font-10 fw-bold text-end"}>
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })
              : sort1_name.toReversed().map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? "fw-bold text-inter text-white font-14 ms-2"
                                      : "fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div
                                  className={"fw-bold  text-inter font-10 ms-2"}
                                >
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className={"mb-0 font-10 fw-bold text-end"}>
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })}
          </>
        ) : (
          ""
        )}

        {/* VOLUME */}
        {tabOrder === "vol_24h" ? (
          <>
            {!sort1_vol.length
              ? ""
              : paramTabOrder === "asc"
              ? sort1_vol.map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter text-white font-14 ms-2"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })
              : sort1_vol.toReversed().map((e, i) => {
                  return (
                    <>
                      <div
                        className={
                          darkMode
                            ? "row px-2 bg-dark-mode text-grey"
                            : "row px-2"
                        }
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter font-14 ms-2 text-white"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })}
          </>
        ) : (
          ""
        )}

        {/* 24H Changes */}
        {tabOrder === "changes_24h" ? (
          <>
            {!sort1_24h.length
              ? ""
              : paramTabOrder === "asc"
              ? sort1_24h.map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter font-14 ms-2 text-white"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })
              : sort1_24h.toReversed().map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter font-14 ms-2 text-white"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })}
          </>
        ) : (
          ""
        )}

        {/* Price */}
        {tabOrder === "price" ? (
          <>
            {!sort1_last.length
              ? ""
              : paramTabOrder === "asc"
              ? sort1_last.map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter font-14 ms-2 text-white"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })
              : sort1_last.toReversed().map((e, i) => {
                  return (
                    <>
                      <div
                        className={darkMode ? "row px-2 text-grey" : "row px-2"}
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter font-14 ms-2 text-white"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })}
          </>
        ) : (
          ""
        )}
      </div>

      {/* Favourites integrasi*/}
      <div className="container">
        {tabOrder === "favourites"
          ? userToken
            ? !realFav1.length
              ? ""
              : realFav1.map((e, i) => {
                  return (
                    <>
                      <div
                        className={
                          darkMode ? "row px-2 text-white" : "row px-2"
                        }
                        key={i}
                        onClick={() =>
                          navigateToTrade(
                            `${e.symbol.slice(0, -3)}-${e.symbol.slice(-3)}`,
                            e.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col">
                          <div className="d-flex align-items-center h-100">
                            <div className="">
                              <img
                                src={e.img}
                                className="img-fluid"
                                alt=""
                                style={{ height: 32, width: 32 }}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                              <div>
                                <div
                                  className={
                                    darkMode
                                      ? " fw-bold text-inter font-14 ms-2 text-white"
                                      : " fw-bold text-inter font-14 ms-2"
                                  }
                                >
                                  {e.assetsName}
                                </div>
                                <div className="fw-bold  text-inter font-10 ms-2">
                                  <span className="fw-normal">vol.</span>{" "}
                                  {IDRFormater(+e.volume)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="mb-0 font-10 fw-bold text-end">
                            Rp {IDRFormater(e.last_price)}
                          </p>
                          <p
                            className="badge mb-0 float-end font-10"
                            style={
                              e.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                  }
                                : {
                                    color: "#20CB6F",
                                  }
                            }
                          >
                            {e.last_price_percentage_24h[0] === "-" ? (
                              <CaretDownFill />
                            ) : (
                              <CaretUpFill />
                            )}
                            {Number(e.last_price_percentage_24h).toFixed(2)} %
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-secondary mt-2 mb-2"
                        style={{
                          height: "2px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </>
                  )
                })
            : ""
            ? ""
            : ""
          : ""}
      </div>

      <div
        className="text-secondary mb-3"
        style={{
          height: "20px",
          backgroundColor: "rgb(104,104,104,0.2)",
        }}
      />

      <div style={{ height: 70 }} />

      {/* fixed navbar */}
      <NavigationButton pathDestination={pathname} />
    </>
  )
}

export default MarketPage

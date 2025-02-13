// techstack =====================================================================
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

// icon ============================================================================
import DataEmptyImg from "../assets/DataEmpty.svg"
import PeopleWelcome from "../assets/people-welcome.svg"
import DEX_pro_logo from "../assets/DEX_pro.svg"
import ReferralModalImg from "../assets/referral-modal.svg"
import Download03 from "@untitled-ui/icons-react/build/cjs/Download03"
import Upload03 from "@untitled-ui/icons-react/build/cjs/Upload03"
import Gift03 from "@untitled-ui/icons-react/build/cjs/Gift01"
import Tag03 from "@untitled-ui/icons-react/build/cjs/Tag03"
import Hourglass03 from "@untitled-ui/icons-react/build/cjs/Hourglass03"
import {
  Bell,
  CaretDownFill,
  CaretUpFill,
  EyeFill,
  EyeSlashFill,
  Person,
  X,
} from "react-bootstrap-icons"

// component =======================================================================
import NavigationButton from "../components/global/NavigationButton"
import CardScroll from "../components/global/CardScroll"

// helper =========================================================================
import { handleLogut } from "../helpers/logout"
import { IDRFormater } from "../helpers/currencyFormater"
import { getTheme } from "../recoil/theme.State"
import {
  dataAllTicker,
  dataFav,
  dataGainer,
  dataLooser,
  dataUserProfile,
  dataVol24,
} from "../DB/HomePage"

function HomePage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [marketStatus, setMarketStatus] = useState("gainers")
  const [data24hVol, setData24hVol] = useState(dataVol24)
  const [dataGainers, setDataGainers] = useState(dataGainer)
  const [dataLosers, setDataLosers] = useState(dataLooser)
  const [dataFavorites, setDataFavorites] = useState(dataFav)
  const [allTicker, setAllTicker] = useState(dataAllTicker)
  const [tempTotalAssets, setTempTotalAssets] = useState(2260971962.850854)
  const [visibility, setVisibility] = useState(true)

  // console.log(dataFavorites)

  let statusPin = true
  let userToken = true
  let initialName = "TS"

  //   RECOIL
  const [unread_notif, setunread_notif] = useState(0)
  const [userProfile, setuserProfile] = useState(dataUserProfile)

  // function navigate to trade page
  const navigateToTrade = (coin, data) => {
    navigate(`/market/${coin}`, {
      state: { last_price_percentage_24h: data, allTicker },
    })
  }

  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") == "true") {
      setReady(true)
    } else if (localStorage.getItem("token") == null) {
      navigate("/login")
    } else {
      navigate("/login")
    }
  }, [ready])

  console.log(ready)
  console.log(localStorage.getItem("token"))

  return (
    <>
      {ready ? (
        <div>
          {/* header navigation */}
          <div
            className={
              darkMode
                ? "container-fluid bg-imp-blue pb-4 px-4 bg-dark-mode2"
                : "container-fluid bg-imp-blue pb-4 px-4"
            }
            style={{ borderRadius: "0 0 25px 25px" }}
          >
            {userToken ? (
              <>
                {" "}
                <div className="d-flex pt-2 justify-content-between align-items-center">
                  <img src={DEX_pro_logo} alt="" className="img-fluid" />
                  <div className="d-flex align-items-center">
                    <p
                      className="position-relative font-22 p-0 mb-0 font-dark fw-bold text-white"
                      onClick={() => navigate("/notification")}
                    >
                      <Bell />
                      {unread_notif === 0 ? (
                        ""
                      ) : (
                        <span
                          className="position-absolute top-0 text-center text-white rounded-circle  bg-danger"
                          style={{
                            fontSize: "7.83px",
                            marginLeft: "-25px",
                            marginTop: "4px",
                            width: "50%",
                          }}
                        >
                          {unread_notif}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      )}
                    </p>
                    {initialName === null ? (
                      <p
                        className="badge rounded-circle ms-4 p-3 mb-0 font-dark font-16 fw-bold"
                        style={{ backgroundColor: "#EDEBFF" }}
                        onClick={() =>
                          navigate("/my-profile", { state: "open-profile" })
                        }
                      >
                        <Person />
                      </p>
                    ) : (
                      <p
                        className="badge rounded-circle ms-4 p-3 mb-0 font-primary font-16 fw-bold"
                        style={{ backgroundColor: "#EDEBFF" }}
                        onClick={() =>
                          navigate("/my-profile", { state: "open-profile" })
                        }
                      >
                        {initialName}
                      </p>
                    )}
                  </div>
                </div>
                {/* saldo */}
                <div
                  className=" mt-2 px-3 py-3"
                  style={{ borderRadius: "16.25px" }}
                >
                  <div className="d-flex text-white align-items-center">
                    <div className=" me-2">Total aset value </div>

                    {visibility ? (
                      <EyeFill onClick={() => setVisibility(false)} />
                    ) : (
                      <EyeSlashFill onClick={() => setVisibility(true)} />
                    )}
                  </div>

                  <div className="fw-bold text-white font-24 text-inter">
                    {visibility
                      ? tempTotalAssets === 0
                        ? "Rp 0"
                        : tempTotalAssets
                        ? `Rp ${IDRFormater(+tempTotalAssets.toFixed(0))}`
                        : ""
                      : "Rp **********"}
                  </div>
                </div>
                {/* option */}
                <div
                  className={
                    darkMode
                      ? "mt-1 d-flex justify-content-around align-items-center bg-imp-dark-blue py-3 text-white px-3 bg-dark-mode"
                      : "mt-1 d-flex justify-content-around align-items-center bg-imp-dark-blue py-3 text-white px-3"
                  }
                  style={{ borderRadius: 15 }}
                >
                  {/* Deposit */}
                  {userToken ? (
                    <div
                      onClick={() => {
                        localStorage.setItem("link-page", "home-page")
                        navigate("/list-assets/deposit")
                      }}
                    >
                      <div className="text-center mb-1">
                        <Download03 />
                      </div>
                      <p className="font-12 text-center mb-0">Deposit</p>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="text-center mb-1"
                        onClick={() => {
                          localStorage.setItem("link-page", "home-page")
                          navigate("/login")
                        }}
                      >
                        <Download03 />
                      </div>
                      <p className="font-12 text-center mb-0">Deposit</p>
                    </div>
                  )}

                  {/* WIthdraw */}
                  {userToken ? (
                    statusPin ? (
                      <div
                        onClick={() => {
                          localStorage.setItem("link-page", "home-page")
                          navigate("/list-assets/withdraw")
                        }}
                      >
                        {/* <img src={VoucherImg} alt="" className="img-fluid" /> */}
                        <div className="text-center mb-1">
                          <Upload03 />
                        </div>
                        <p className="font-12 text-center mb-0">Withdraw</p>
                      </div>
                    ) : (
                      <div
                        data-bs-toggle="modal"
                        data-bs-target="#modal_pin_false"
                      >
                        {/* <img src={VoucherImg} alt="" className="img-fluid" /> */}
                        <div className="text-center mb-1">
                          <Upload03 />
                        </div>
                        <p className="font-12 text-center mb-0">Withdraw</p>
                      </div>
                    )
                  ) : (
                    <div
                      onClick={() => {
                        localStorage.setItem("link-page", "home-page")
                        navigate("/login")
                      }}
                    >
                      {/* <img src={VoucherImg} alt="" className="img-fluid" /> */}
                      <div className="text-center mb-1">
                        <Upload03 />
                      </div>
                      <p className="font-12 text-center mb-0">Withdraw</p>
                    </div>
                  )}

                  {/* Poin */}
                  {userToken ? (
                    <div
                      data-bs-toggle="modal"
                      onClick={() => navigate("/point-center")}
                    >
                      <div className="text-center mb-1">
                        <Gift03 />
                      </div>
                      <p className="font-12 text-center mb-0">Poin</p>
                    </div>
                  ) : (
                    <div data-bs-toggle="modal">
                      <div className="text-center mb-1">
                        <Gift03 />
                      </div>
                      <p className="font-12 text-center mb-0">Poin</p>
                    </div>
                  )}

                  {/* Voucher */}
                  {userToken ? (
                    <div>
                      <div
                        className="text-center mb-1"
                        onClick={() => navigate("/voucher")}
                      >
                        <Tag03 />
                      </div>
                      <p className="font-12 text-center mb-0">Voucher</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-1">
                        <Tag03 />
                      </div>
                      <p className="font-12 text-center mb-0">Voucher</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-center text-white text-inter pt-4 mb-0">
                  Hi, Please login to see the full features
                </p>
                <div className="d-flex justify-content-center">
                  <img src={PeopleWelcome} className="img-fluid" alt="" />
                </div>
                <p className="text-center text-white text-inter mt-2 font-12">
                  Welcome! Get ready to experience a world of possibilities.
                  Login to unlock your full potential
                </p>
                <div
                  className={
                    darkMode
                      ? "btn btn-sm w-100 fw-bold bg-primary text-white"
                      : "btn btn-sm w-100 fw-bold"
                  }
                  style={{ color: "#266DE0", backgroundColor: "#FEFEFF" }}
                  onClick={() => navigate("/login")}
                >
                  Login Now
                </div>
              </>
            )}
          </div>

          <div
            className={
              darkMode
                ? "container-fluid text-roboto px-4 bg-dark-mode "
                : "container-fluid text-roboto px-4 "
            }
            style={{ paddingBottom: "100px" }}
          >
            <div className="pt-3">
              <div
                className={
                  darkMode
                    ? "row bg-primary text-white p-3"
                    : "row bg-dark text-white p-3"
                }
                style={{ borderRadius: 15 }}
              >
                <div className="col-9">
                  <p className="mb-2 font-20"> Maintenance</p>
                  <p className="mb-0 font-12">
                    Sorry for our beloved user, Our system had to maintenance
                    till 23:00 WIB
                  </p>
                </div>
                <div className="col-3">
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div
                      className="bg-white rounded-circle d-flex justify-content-center align-items-center text-dark"
                      style={{
                        minWidth: 70,
                        maxWidth: 70,
                        minHeight: 70,
                        maxHeight: 70,
                      }}
                    >
                      <Hourglass03 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              className={
                darkMode
                  ? "text-inter mt-3 font-24 mb-0 text-white"
                  : "text-inter mt-3 font-24 mb-0"
              }
              style={{ fontWeight: 700 }}
            >
              Info and Special Promo
            </p>
            <CardScroll />
            <p
              className={
                darkMode
                  ? "text-inter mt-1 font-24 mb-0  text-white"
                  : "text-inter mt-1 font-24 mb-0"
              }
              style={{ fontWeight: 700 }}
            >
              Top Volume 24h
            </p>

            <div className="scrollbar-none overflow-scroll px-0 mx-0 mt-3">
              <div className="row px-0 mx-0" style={{ width: "650px" }}>
                {data24hVol
                  ? data24hVol.map((e) => {
                      let datapair = ""
                      if (e.symbol.slice(-3) === "IDR") {
                        datapair = "IDR"
                      } else {
                        datapair = "USDT"
                      }

                      return (
                        <div
                          className={
                            darkMode ? "card me-2  bg-dark-mode2" : "card me-2"
                          }
                          style={{
                            width: 120,
                            height: 80,
                            display: "inline-block",
                          }}
                          onClick={() =>
                            navigateToTrade(
                              `${e.symbol.slice(
                                0,
                                e.symbol.length - 3
                              )}-${datapair}`,
                              e
                            )
                          }
                        >
                          <div className="d-flex mt-2 align-items-center">
                            <img
                              src={`https://asset.digitalexchange.id/coin/${e.symbol.slice(
                                0,
                                e.symbol.length - 3
                              )}.png`}
                              alt=""
                              className="me-1"
                              style={{ width: 18, height: 18 }}
                            />
                            <div
                              className={
                                darkMode
                                  ? "font-10 text-inter text-white"
                                  : "font-10 text-inter"
                              }
                              style={{ fontWeight: 700 }}
                            >
                              {e.symbol.slice(0, e.symbol.length - 3)} /{" "}
                              {e.symbol.slice(
                                e.symbol.length - 3,
                                e.symbol.length
                              )}
                            </div>
                          </div>
                          <div
                            className={
                              darkMode
                                ? "mt-1 font-12 fw-bold text-grey"
                                : "mt-1 font-12 fw-bold text-secondary"
                            }
                          >
                            Rp {IDRFormater(+e.last_price)}
                          </div>
                          {e.last_price_percentage_24h[0] !== "-" ? (
                            <div className="font-18 fw-bold text-success">
                              <CaretUpFill /> {e.last_price_percentage_24h}%
                            </div>
                          ) : (
                            <div className="font-18 fw-bold text-danger">
                              <CaretDownFill /> {e.last_price_percentage_24h}%
                            </div>
                          )}
                        </div>
                      )
                    })
                  : ""}
              </div>
            </div>

            <p
              className={
                darkMode
                  ? "text-inter mt-4 font-24 mb-0 text-white"
                  : "text-inter mt-4 font-24 mb-0"
              }
              style={{ fontWeight: 700 }}
            >
              Market
            </p>

            {/* gainers & losers */}
            <div className="d-flex my-3">
              <p
                className="font-14 me-4"
                style={
                  marketStatus === "favorites"
                    ? darkMode
                      ? {
                          color: "#FFFFFF",
                          textDecoration: "underline",
                          textUnderlineOffset: 10,
                          fontWeight: 700,
                        }
                      : {
                          color: "#1B6AEA",
                          textDecoration: "underline",
                          textUnderlineOffset: 10,
                          fontWeight: 700,
                        }
                    : { color: "grey" }
                }
                onClick={() => setMarketStatus("favorites")}
              >
                Favorites
              </p>

              <p
                className="font-14 me-4"
                style={
                  marketStatus === "gainers"
                    ? darkMode
                      ? {
                          color: "#FFFFFF",
                          textDecoration: "underline",
                          textUnderlineOffset: 10,
                          fontWeight: 700,
                        }
                      : {
                          color: "#1B6AEA",
                          textDecoration: "underline",
                          textUnderlineOffset: 10,
                          fontWeight: 700,
                        }
                    : { color: "grey" }
                }
                onClick={() => setMarketStatus("gainers")}
              >
                Gainers
              </p>

              <p
                className="font-14"
                style={
                  marketStatus === "losers"
                    ? darkMode
                      ? {
                          color: "#FFFFFF",
                          textDecoration: "underline",
                          textUnderlineOffset: 10,
                          fontWeight: 700,
                        }
                      : {
                          color: "#1B6AEA",
                          textDecoration: "underline",
                          textUnderlineOffset: 10,
                          fontWeight: 700,
                        }
                    : { color: "grey" }
                }
                onClick={() => setMarketStatus("losers")}
              >
                Losers
              </p>
            </div>

            <hr style={{ opacity: "10%" }} />
            {/* gainers & losers list */}
            {marketStatus === "gainers" ? (
              <>
                {dataGainers &&
                  dataGainers.map((el) => {
                    let datapair = ""
                    if (el.symbol.slice(-3) === "IDR") {
                      datapair = "IDR"
                    } else {
                      datapair = "USDT"
                    }
                    return (
                      <>
                        <div
                          className="row"
                          onClick={() =>
                            navigateToTrade(
                              `${el.symbol.slice(0, -3)}-${datapair}`,
                              el
                            )
                          }
                        >
                          <div className="col-6">
                            <div className="row">
                              <div className="col-3">
                                <img
                                  src={`https://asset.digitalexchange.id/coin/${el.symbol.slice(
                                    0,
                                    el.symbol.length - 3
                                  )}.png`}
                                  alt=""
                                  className="me-1"
                                  style={{ width: 36, height: 36 }}
                                />
                              </div>
                              <div className="col">
                                <div
                                  className={
                                    darkMode
                                      ? "font-12 text-grey"
                                      : "font-12 text-dark"
                                  }
                                  style={{ fontWeight: 700 }}
                                >
                                  {el.name}
                                </div>
                                <div
                                  className="font-10 text-inter text-secondary"
                                  style={{ fontWeight: 700 }}
                                >
                                  {el.symbol.slice(0, el.symbol.length - 3)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 text-end">
                            <div
                              className={
                                darkMode
                                  ? "font-12 text-white fw-bold"
                                  : "font-12 fw-bold"
                              }
                            >
                              Rp {IDRFormater(+el.last_price)}
                            </div>
                            {el.last_price_percentage_24h[0] !== "-" ? (
                              <div className="font-12 fw-bold text-success">
                                <CaretUpFill /> {el.last_price_percentage_24h} %
                              </div>
                            ) : (
                              <div className="font-12 fw-bold text-danger">
                                <CaretDownFill /> {el.last_price_percentage_24h}{" "}
                                %
                              </div>
                            )}
                          </div>
                        </div>
                        <hr style={{ opacity: "10%" }} />
                      </>
                    )
                  })}
              </>
            ) : marketStatus === "losers" ? (
              <>
                {dataLosers &&
                  dataLosers.map((el) => {
                    let datapair = ""
                    if (el.symbol.slice(-3) === "IDR") {
                      datapair = "IDR"
                    } else {
                      datapair = "USDT"
                    }
                    return (
                      <>
                        <div
                          className="row"
                          onClick={() =>
                            navigateToTrade(
                              `${el.symbol.slice(0, -3)}-${datapair}`,
                              el
                            )
                          }
                        >
                          <div className="col-6">
                            <div className="row">
                              <div className="col-3">
                                <img
                                  src={`https://asset.digitalexchange.id/coin/${el.symbol.slice(
                                    0,
                                    el.symbol.length - 3
                                  )}.png`}
                                  alt=""
                                  className="me-1"
                                  style={{ width: 36, height: 36 }}
                                />
                              </div>
                              <div className="col">
                                <div
                                  className={
                                    darkMode
                                      ? "font-12 text-grey"
                                      : "font-12 text-dark"
                                  }
                                  style={{ fontWeight: 700 }}
                                >
                                  {el.name}
                                </div>
                                <div
                                  className="font-10 text-inter text-secondary"
                                  style={{ fontWeight: 700 }}
                                >
                                  {el.symbol.slice(0, el.symbol.length - 3)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 text-end">
                            <div
                              className={
                                darkMode
                                  ? "font-12 text-white fw-bold"
                                  : "font-12 fw-bold"
                              }
                            >
                              Rp {IDRFormater(+el.last_price)}
                            </div>
                            {el.last_price_percentage_24h[0] !== "-" ? (
                              <div className="font-12 fw-bold text-success">
                                <CaretUpFill /> {el.last_price_percentage_24h} %
                              </div>
                            ) : (
                              <div className="font-12 fw-bold text-danger">
                                <CaretDownFill /> {el.last_price_percentage_24h}{" "}
                                %
                              </div>
                            )}
                          </div>
                        </div>
                        <hr style={{ opacity: "10%" }} />
                      </>
                    )
                  })}
              </>
            ) : marketStatus === "favorites" ? (
              dataFavorites.length ? (
                dataFavorites.map((el) => {
                  let datapair = ""
                  if (el.symbol.slice(-3) === "IDR") {
                    datapair = "IDR"
                  } else {
                    datapair = "USDT"
                  }
                  return (
                    <>
                      <div
                        className="row"
                        onClick={() =>
                          navigateToTrade(
                            `${el.symbol.slice(0, -3)}-${datapair}`,
                            el
                          )
                        }
                      >
                        <div className="col-6">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={`https://asset.digitalexchange.id/coin/${el.symbol.slice(
                                  0,
                                  el.symbol.length - 3
                                )}.png`}
                                alt=""
                                className="me-1"
                                style={{ width: 36, height: 36 }}
                              />
                            </div>
                            <div className="col">
                              <div
                                className={
                                  darkMode
                                    ? "font-12 text-grey"
                                    : "font-12 text-dark"
                                }
                                style={{ fontWeight: 700 }}
                              >
                                {el.name}
                              </div>
                              <div
                                className="font-10 text-inter text-secondary"
                                style={{ fontWeight: 700 }}
                              >
                                {el.symbol.slice(0, el.symbol.length - 3)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <div
                            className={
                              darkMode
                                ? "font-12 text-white fw-bold"
                                : "font-12 fw-bold"
                            }
                          >
                            Rp {IDRFormater(+el.last_price)}
                          </div>
                          {el.last_price_percentage_24h[0] !== "-" ? (
                            <div className="font-12 fw-bold text-success">
                              <CaretUpFill /> {el.last_price_percentage_24h} %
                            </div>
                          ) : (
                            <div className="font-12 fw-bold text-danger">
                              <CaretDownFill /> {el.last_price_percentage_24h} %
                            </div>
                          )}
                        </div>
                      </div>
                      <hr style={{ opacity: "10%" }} />
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
              )
            ) : (
              ""
            )}
            <p
              className="text-inter font-16 text-primary mb-0"
              style={{ fontWeight: 700 }}
              onClick={() => navigate("/market")}
            >
              Explore more asset
            </p>
          </div>

          {/* fixed navbar */}
          <NavigationButton pathDestination={pathname} />

          {/* modal referral */}
          <div
            className="modal modal-sm custom fade profile-info text-roboto rounded-0"
            id="referral-modal"
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
                    <p className="font-20 fw-bold">Referral</p>
                    <p className="font-30" data-bs-dismiss="modal">
                      <X />
                    </p>
                  </div>
                  <img
                    src={ReferralModalImg}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                  <p className="font-18 text-center fw-bold mt-3 mb-2">
                    Referral Program is Coming Soon!
                  </p>
                  <p className="font-16 text-center mb-2">
                    Silahkan menunggu, fitur Referral ini akan segera hadir
                    kembali untuk Anda.
                  </p>
                  {/* button ok */}
                  <div className="d-grid col-12">
                    <button
                      type="button"
                      className="btn text-white"
                      style={{ backgroundColor: "#1B6AEA" }}
                      data-bs-dismiss="modal"
                    >
                      Ok, Saya Mengerti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL PIN USER FLSE */}
          <div
            className="modal  fade"
            id="modal_pin_false"
            tabindex="-1"
            aria-labelledby="modal_pin_falseLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="modal_pin_falseLabel">
                    Warning
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Aktifkan PIN untuk melakuakn withdrawal
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Aktifkan PIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default HomePage

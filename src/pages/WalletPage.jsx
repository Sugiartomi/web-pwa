import React, { useState } from "react"
import PieChartImg from "../assets/pie-chart.svg"
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Eye,
  EyeSlash,
} from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import NavigationButton from "../components/global/NavigationButton"
import { IDRFormater } from "../helpers/currencyFormater"
import { fix_total_balance, get_data_total_wallet } from "../recoil/walletState"
import { useRecoilState, useRecoilValue } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { dbAllTicker } from "../DB/MarketPage"
import { DBWallet, DBdataGraph } from "../DB/WalletPage"

function WalletPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const [wallet, setWallet] = useState(DBWallet)
  const [showAsset, setShowAsset] = useState(true)
  const [totalWalletAsset, setTotalWalletAsset] = useState(3453172635.5683875)

  const userToken = localStorage.getItem("token")
  // const { allTicker } = useSelector((store) => store.dataMarket)
  const [ allTicker, setAllticker] = useState(dbAllTicker)
  const [newDataWallet, setNewDataWallet] = useState()
  // const dataWallet = useRecoilValue(get_data_total_wallet)
  const [dataGraphBar, setDataGraphBar] = useState(DBdataGraph)

  console.log( );





  const navigateToPortofolioAsset = () => {
    if (wallet) {
      navigate("/portofolio-assets", {
        state: { wallet, allTicker, totalWalletAsset },
      })
    }
  }

  // search
  const [inputSearch, setInputSearch] = useState()

  useEffect(() => {
    if (inputSearch) {
      let arr = []
      wallet.forEach((e) => {
        if (
          e.symbol.includes(inputSearch.toUpperCase()) ||
          e.name.toUpperCase().includes(inputSearch.toUpperCase())
        ) {
          arr.push(e)
        }
      })
      setNewDataWallet(arr)
    }
  }, [inputSearch])

  useEffect(() => {
    if (wallet.length !== 0 && totalWalletAsset) {
      let temp = []
      wallet.forEach((e) => {
        let percent = (e.balanceIDR / +totalWalletAsset) * 100
        temp.push({ ...e, percent })
      })
      setDataGraphBar(temp)
    }
  }, [wallet, totalWalletAsset])

  return (
    <>
      <div
        className={
          darkMode ? "container text-inter text-white" : "container text-inter"
        }
      >
        <div className=" mt-4 px-3 py-1 shadow" style={{ borderRadius: 15 }}>
          {/* total asset */}
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <p className="font-15 mb-0 text-roboto">
                Total Asset Value (IDR)
              </p>
              <img
                src={PieChartImg}
                alt=""
                className="img-fluid"
                onClick={() => navigateToPortofolioAsset()}
              />
            </div>
            <p className="fw-bold font-22 ">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {showAsset
                    ? `Rp ${IDRFormater(+totalWalletAsset.toFixed(0))}`
                    : "*********"}
                </div>
                <div className="font-22">
                  {showAsset ? (
                    <Eye onClick={() => setShowAsset(!showAsset)} />
                  ) : (
                    <EyeSlash onClick={() => setShowAsset(!showAsset)} />
                  )}
                </div>
              </div>
            </p>
          </div>

          <div className="d-flex w-100 mb-3">
            {dataGraphBar
              ? dataGraphBar.map((e, i) => {
                  if (e.percent !== 0 && !isNaN(e.percent)) {
                    return (
                      <div
                        style={{
                          height: 20,
                          width: `${e.percent}%`,
                          backgroundColor: e.color,
                        }}
                      />
                    )
                  }
                })
              : ""}
          </div>
          {showAsset ? (
            <div className="row mb-3">
              {dataGraphBar
                ? dataGraphBar.map((e, i) => {
                    if (
                      e.percent !== 0 &&
                      !isNaN(e.percent) &&
                      e.percent.toFixed(2).toString() !== "0.00"
                    ) {
                      return (
                        <div className="col-4 d-flex mb-2">
                          <div
                            className="d-flex justify-content-center align-items-center fw-bold"
                            style={{
                              backgroundColor: e.color,
                              width: 12,
                              height: 12,
                              fontSize: 8,
                            }}
                          ></div>
                          <div className="fw-bold ms-2" style={{ fontSize: 8 }}>
                            {e.symbol}{" "}
                            <span className="fw-normal">
                              ( {e.percent.toFixed(2)}% )
                            </span>
                          </div>
                        </div>
                      )
                    }
                  })
                : ""}
            </div>
          ) : (
            ""
          )}

          {/* button deposit & penrikan */}
          <div className="d-flex justify-content-between mb-3">
            <button
              type="button"
              className="btn text-white"
              style={{
                backgroundColor: "#1B6AEA",
                width: "179px",
                borderRadius: 15,
              }}
              onClick={() => {
                localStorage.setItem("link-page", "wallet-page")
                navigate("/list-assets/deposit")
              }}
            >
              <div>
                <p className="mb-0">
                  <ArrowDownCircle />
                </p>
                Deposit
              </div>
            </button>
            <button
              type="button"
              className="btn ms-2 bg-dark"
              style={{ width: "179px", borderRadius: 15 }}
              onClick={() => {
                localStorage.setItem("link-page", "wallet-page")
                navigate("/list-assets/withdraw")
              }}
            >
              <div className="text-white">
                <p className="mb-0">
                  <ArrowUpCircle />
                </p>
                Penarikan
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* HR */}
      <div
        className="text-secondary mt-4 mb-2"
        style={{
          height: "5px",
          backgroundColor: "rgb(104,104,104,0.1)",
        }}
      />
      {/* SEARCH */}
      <div
        className={
          darkMode ? "container text-inter text-white" : "container text-inter"
        }
        style={{ minHeight: "100vh" }}
      >
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <input
            type="search"
            className={
              darkMode
                ? "form-control search-wallet border-0 mb-4 rounded shadow-none bg-dark-mode2 text-white"
                : "form-control search-wallet border border-2 mb-4 rounded shadow-none"
            }
            placeholder="&#xF002;&nbsp;Search"
            style={{
              backgroundColor: "#FFFFFF",
              height: "32px",
              fontFamily: "Arial, FontAwesome",
              width: "100%",
              height: 40,
            }}
            onChange={(e) => {
              e.preventDefault()
              setInputSearch(e.target.value)
            }}
          />
        </div>
        {/* list wallet */}
        <div className="mt-4">
          {!inputSearch ? (
            <>
              {wallet &&
                wallet.map((el, index) => {
                  return (
                    <div
                      className="row mb-3"
                      key={index}
                      onClick={() =>
                        navigate(`/asset-detail/${el.symbol}`, {
                          state: {
                            amount: el.amount,
                            amount_frozen: el.amount_frozen,
                            estimatedIDR: el.balanceIDR,
                            img_url: el.img_url,
                          },
                        })
                      }
                    >
                      <div className="col-7">
                        <div className="d-flex align-items-center">
                          <img
                            src={el.img_url}
                            alt=""
                            className="img-fluid me-2"
                            style={{ width: "25px", height: "25px" }}
                          />
                          <div className="ms-2">
                            <p className="font-14 fw-bold mb-0">{el.symbol}</p>
                            <p
                              className="font-14 mb-0"
                              style={{ color: darkMode ? "white" : "#4C5058" }}
                            >
                              {el.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-5 text-end">
                        <p className="font-14 mb-0 fw-bold">
                          {showAsset
                            ? (+el.amount + +el.amount_frozen)
                                .toString()
                                .replace(".", ",")
                            : "*************"}
                        </p>
                        {el.symbol === "IDR" ? (
                          <p
                            className="font-12 mb-0"
                            style={{ color: darkMode ? "white" : "#4C5058" }}
                          >
                            {showAsset ? (
                              <>
                                {/* <span>&#8773;</span> */}
                                {" Rp " +
                                  IDRFormater(+el.amount + +el.amount_frozen)}
                              </>
                            ) : (
                              "******"
                            )}
                          </p>
                        ) : (
                          <p
                            className="font-12 mb-0"
                            style={{ color: darkMode ? "white" : "#4C5058" }}
                          >
                            {showAsset ? (
                              <>
                                {/* <span>&#8773;</span> */}
                                {+el.balanceIDR.toFixed(0) === 0
                                  ? "Rp 1"
                                  : `Rp ${IDRFormater(
                                      +el.balanceIDR.toFixed(0)
                                    )}`}
                              </>
                            ) : (
                              "******"
                            )}
                          </p>
                        )}
                      </div>
                      <div
                        className="text-secondary mt-3"
                        style={{
                          height: "1.5px",
                          backgroundColor: "rgb(104,104,104,0.1)",
                        }}
                      />
                    </div>
                  )
                })}
            </>
          ) : (
            <>
              {newDataWallet && newDataWallet.length
                ? newDataWallet.map((el, index) => {
                    return (
                      <div
                        className="row mb-4"
                        key={index}
                        onClick={() =>
                          navigate(`/asset-detail/${el.symbol}`, {
                            state: {
                              amount: el.amount,
                              amount_frozen: el.amount_frozen,
                              estimatedIDR: el.balanceIDR,
                              img_url: el.img_url,
                            },
                          })
                        }
                      >
                        <div className="col-7">
                          <div className="d-flex align-items-center">
                            <img
                              src={el.img_url}
                              alt=""
                              className="img-fluid me-2"
                              style={{ width: "25px", height: "25px" }}
                            />
                            <div className="ms-2">
                              <p className="font-14 fw-bold mb-0">
                                {el.symbol}
                              </p>
                              <p
                                className="font-14 mb-0"
                                style={{ color: "#4C5058" }}
                              >
                                {el.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-5 text-end">
                          <p className="font-14 mb-0 fw-bold">
                            {showAsset
                              ? (+el.amount + +el.amount_frozen)
                                  .toString()
                                  .replace(".", ",")
                              : "*************"}
                          </p>
                          {el.symbol === "IDR" ? (
                            <p
                              className="font-12 mb-0"
                              style={{ color: "#4C5058" }}
                            >
                              {showAsset ? (
                                <>
                                  {/* <span>&#8773;</span> */}
                                  {" Rp " +
                                    IDRFormater(+el.amount + +el.amount_frozen)}
                                </>
                              ) : (
                                "******"
                              )}
                            </p>
                          ) : (
                            <p
                              className="font-12 mb-0"
                              style={{ color: "#4C5058" }}
                            >
                              {showAsset ? (
                                <>
                                  {/* <span>&#8773;</span> */}
                                  {+el.balanceIDR.toFixed(0) === 0
                                    ? "Rp 1"
                                    : `Rp ${IDRFormater(
                                        +el.balanceIDR.toFixed(0)
                                      )}`}
                                </>
                              ) : (
                                "******"
                              )}
                            </p>
                          )}
                        </div>
                        <div
                          className="text-secondary mt-3"
                          style={{
                            height: "1.5px",
                            backgroundColor: "rgb(104,104,104,0.1)",
                          }}
                        />
                      </div>
                    )
                  })
                : "Tidak ada"}
            </>
          )}
        </div>
      </div>

      <div style={{ height: 50 }}></div>

      {/* fixed navbar */}
      <div style={{ maxWidth: 480 }}>
        <NavigationButton pathDestination={"/wallet"} style />
      </div>
    </>
  )
}

export default WalletPage

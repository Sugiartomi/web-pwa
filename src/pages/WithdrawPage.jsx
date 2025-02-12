import React, { useEffect, useState } from "react"
import {
  CheckCircleFill,
  ChevronCompactRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExclamationCircleFill,
  PlusLg,
  PlusSquare,
} from "react-bootstrap-icons"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TimeIcon from "../assets/time.svg"
import DataEmpty from "../assets/DataEmpty.svg"
import SuccessImg from "../assets/success-order.svg"
import NoBankAccountImg from "../assets/no-bank-account.svg"
import { useDispatch, useSelector } from "react-redux"
import axiosConfig from "../config/axios"
import { ADD_BANK_ACCOUNT } from "../store/types/user"
import axios from "axios"
import { ALL_ASSETS } from "../store/types/market"
import { get_data_wallet } from "../store/actions/wallet"
import { get_data_ticker } from "../store/actions/market"
import { IDRFormater, AssetFormater } from "../helpers/currencyFormater"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { baseURLApi } from "../config/api"
import {
  DBAlltickerWD,
  DBAssetWD,
  DBDataBankAccWD,
  DBDetailNetwork,
  DBListDataWalletWD,
  DBNetworkWD,
  DBTargetAsset,
  DBWalletWD,
} from "../DB/Withdraw"

function WithdrawPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  // HOOKS================================================================================================
  const userToken = localStorage.getItem("token")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { name } = useParams()
  const { pathname, state } = useLocation()

  // REDUX================================================================================================
  const [dataBankAccount, setdataBankAccount] = useState(DBDataBankAccWD)
  const [assets, setassets] = useState(DBAssetWD)
  const [allTicker, setallTicker] = useState(DBAlltickerWD)

  // const {  allTicker } = useSelector((store) => store.dataMarket)
  const [listDataWallet, setlistDataWallet] = useState(DBListDataWalletWD)

 
  // STATE================================================================================================
  const [selectedBank, setSelectedBank] = useState([])
  const [amountWitdrawal, setAmountWithdrawal] = useState("")
  const [dataBankAcc, setDataBankAcc] = useState([])
  const [fixTax, setFixTax] = useState()

  const [wallet, setWallet] = useState(DBWalletWD)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [network, setNetwork] = useState(DBNetworkWD)
  const [targetAsset, setTargetAsset] = useState(DBTargetAsset)
  const [selectedNetwork, setSeletedNetwork] = useState()
  const [currentAmoount, setCurrentAmmount] = useState()
  const [estimateMaxWithdrawal, setEstimateMaxWithdrawal] = useState()
  const [remainingWD, setRemainingWD] = useState()
  const [minWDAsset, setMinWDAsset] = useState()
  const [labelAdress, setLabelAdress] = useState()
  const [inputWalletAddress, setInputWalletAddress] = useState()
  const [walletAddress, setWalletAddress] = useState({
    loading: true,
    list: [],
    choose: "",
  })
  const [statusWalletAddress, setStatusWalletAddress] = useState() // old or new
  const [detailNetwork, setDetailNetwork] = useState(DBDetailNetwork)
  const [tagNameNetwork, setTagNameNetwork] = useState()

  // HELPER================================================================================================
  const CFORMAT_BNB = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "BNB",
  })
  const formaterFormInput = (e) => {
    setAmountWithdrawal(+e.target.value)
  }
  const handleSelectBank = (e) => {
    let result = dataBankAccount.filter((el) => el.account_id == e.target.value)
    setSelectedBank([
      {
        bank: result[0].bank_name,
        rek: result[0].account_number,
        owner: result[0].bank_owner,
        id: result[0].account_id,
      },
    ])
  }

  // LIFE CYCLE ==============================================================================================

  // cek detail wallet
  useEffect(() => {
    if (!listDataWallet || listDataWallet.length === 0) {
    
    } else {
      setWallet(listDataWallet)
      let find = listDataWallet.find((e) => e.symbol === name)
      if (find) {
        if (find) {
          if (find.amount !== 0) {
            setCurrentAmmount(+find.amount + +find.amount_frozen)
          } else {
            setAmountWithdrawal(0)
          }
        }
      }
    }
  }, [pathname, wallet])

  // cek bank account
  useEffect(() => {
 
  }, [])

  // cek network-list
  useEffect(() => {
  
  }, [])

  // cek detail network
  

  // cek wallet list


  // cek asset
 

  useEffect(() => {
    if (name === "IDR") {
      let findAsset = assets.find((e) => e.symbol === "IDR")
      if (findAsset) {
        if (!findAsset.max_fee_type) {
          if (amountWitdrawal < 200000000) {
            setFixTax(findAsset.fee_withdrawal)
          } else {
            setFixTax(findAsset.max_fee)
          }
        } else {
          setFixTax((amountWitdrawal * findAsset.max_fee) / 100)
        }
      }
    }
  }, [amountWitdrawal])

  useEffect(() => {
    if (assets.length !== 0) {
      let find = assets.find((e) => e.symbol === name)
      setTargetAsset([find])
    }
  }, [assets])

  useEffect(() => {
    const data_user = JSON.parse(localStorage.getItem("data_user"))
    if (allTicker && allTicker.length !== 0) {
      let find = allTicker.find((e) => e.symbol === name + "IDR")
      if (find) {
        const maxWD = +data_user.user.max_daily_withdrawal / +find.last_price
        setEstimateMaxWithdrawal(maxWD.toFixed(2))

        const remainWD =
          +data_user.user.remaining_amount_withdrawal / +find.last_price
        setRemainingWD(remainWD)
      }
    }
  }, [allTicker])

  useEffect(() => {
    if (walletAddress.choose === "new") {
      setShowAddAddress(true)
      setStatusWalletAddress("new")
    } else if (walletAddress.list.length === 0) {
      setStatusWalletAddress("new")
    } else {
      setShowAddAddress(false)
      setStatusWalletAddress("old")
    }
  }, [walletAddress])

  const handleSubmitWDAsset = () => {
    const state = {}
    if (name !== "IDR") {
      state.name = "withdrawal-asset"
      state.amount = amountWitdrawal
      state.symbol = name
      state.network = selectedNetwork.id
      state.label_input = labelAdress
      if (showAddAddress === true) {
        state.address_type = "new"
      } else {
        state.address_type = "old"
      }
      state.wallet_address = inputWalletAddress
      if (detailNetwork.detail.tag_name) {
        state.extra_wallet_address = tagNameNetwork
      }
    }

    navigate("/security-verification", { state })
  }

  // RENDER================================================================================================
  return (
    <>
      <div className="container text-roboto pt-3">
        {/* title */}
        <div
          className={
            darkMode
              ? "d-flex align-items-center justify-content-between text-white"
              : "d-flex align-items-center justify-content-between"
          }
        >
          <p
            className="fw-bold"
            onClick={() => navigate(`/list-assets/withdraw`)}
          >
            <ChevronLeft />
          </p>
          <p className="fw-bold mb-0">Withdrawal</p>
          <img
            src={TimeIcon}
            alt=""
            className="img-fluid"
            style={{ width: "25px", height: "25px" }}
            onClick={() => navigate(`/asset-detail/${name}`)}
          />
        </div>
      </div>

      {name === "IDR" ? (
        <>
          <div
            className={
              darkMode
                ? "container text-roboto text-white"
                : "container text-roboto"
            }
            style={{ minHeight: "100vh" }}
          >
            <p className="font-14 text-center mt-4 mb-2">Balance</p>
            {listDataWallet ? (
              listDataWallet.length !== 0 ? (
                <p className="font-24 fw-bold text-center">
                  Rp{" "}
                  {IDRFormater(
                    +listDataWallet.find((e) => e.symbol === name).amount
                  )}
                </p>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {/* withdrawal amount */}
            <div className="mt-3">
              <label
                className="font-14"
                style={{ color: darkMode ? "white" : "#626262" }}
              >
                Enter Withdrawal Amount
              </label>
              <div
                className={
                  darkMode
                    ? "d-flex align-items-center bg-dark-mode2 rounded"
                    : "d-flex align-items-center"
                }
                style={{ backgroundColor: "#F4F8FC", height: "54px" }}
              >
                <div className="col-9">
                  <input
                    type="number"
                    className={
                      darkMode
                        ? "form-control shadow-none border-0 bg-dark-mode2 text-white"
                        : "form-control shadow-none border-0"
                    }
                    placeholder="0"
                    style={{ backgroundColor: "#F4F8FC" }}
                    onChange={formaterFormInput}
                  />
                </div>
                <div className="col-3">
                  <p className="font-primary mb-0 ms-2 font-14">Maximum</p>
                </div>
              </div>
            </div>

            {/* info */}
            <p
              className={
                darkMode
                  ? "font-9 mt-3 bg-warning text-dark rounded p-2"
                  : "font-9 mt-3 bg-warning-custom p-2"
              }
            >
              Withdrawal your IDR Daily Limit estimated worth :{" "}
              <span className="fw-bold">75.000.000 IDR</span> / 200,000,000 IDR
            </p>
            {dataBankAccount.length === 0 ? (
              <>
                {/* no bank account */}
                <div>
                  <p className="font-14">Choose your Bank Account :</p>
                  <img
                    src={NoBankAccountImg}
                    alt=""
                    className="img-fluid mx-auto d-flex"
                  />
                  <p className="font-12 text-center">
                    You don't have a bank account yet!
                  </p>
                </div>
              </>
            ) : (
              <>
                <select
                  className={
                    darkMode
                      ? "form-select form-select-lg mb-3 shadow-none bg-dark-mode2 text-white border-0"
                      : "form-select form-select-lg mb-3 shadow-none"
                  }
                  aria-label=".form-select-lg example"
                  onChange={handleSelectBank}
                >
                  <option selected disabled style={{ display: "none" }}>
                    {" "}
                    select account bank
                  </option>
                  {dataBankAccount.map((e) => {
                    return (
                      <>
                        <option value={e.account_id}>
                          {e.label} - {e.account_number}
                        </option>
                      </>
                    )
                  })}
                </select>
                {selectedBank.length === 1 ? (
                  <>
                    <div
                      className={
                        darkMode
                          ? " d-flex mb-3 justify-content-between align-items-center p-3 bg-dark-mode2 rounded"
                          : "bg-blue-transparant d-flex mb-3 justify-content-between align-items-center p-3"
                      }
                    >
                      <div>
                        <p className="font-12 font-dark mb-0">
                          {selectedBank[0].bank}
                        </p>
                        <p className="font-16 mb-0">
                          {selectedBank[0].owner} - {selectedBank[0].rek}{" "}
                        </p>
                      </div>
                      <p
                        className="font-16 font-primary mb-0"
                        onClick={() => {
                          localStorage.setItem(
                            "temp-edit-bank",
                            `${selectedBank[0].id}-${selectedBank[0].bank}-${selectedBank[0].rek} `
                          )
                          navigate("/edit-bank-account")
                        }}
                      >
                        Edit
                      </p>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            )}

            {/* add bank account */}
            <div
              className="py-4 rounded"
              style={{ backgroundColor: darkMode ? "#282A32" : "#ECF9FF" }}
              onClick={() =>
                navigate("/add-bank-account", {
                  state: { pair: name, status: "add", state },
                })
              }
            >
              <p className="font-16 text-center font-primary mb-0">
                Add Acount Bank{" "}
                <span className="ms-4">
                  <PlusSquare />
                </span>
              </p>
            </div>

            <div
              className={
                darkMode
                  ? "font-red font-12 mt-3 bg-red-transparant p-2 d-flex fw-bold rounded bg-dark-mode2"
                  : "font-red font-12 mt-3 bg-red-transparant p-2 d-flex fw-bold rounded"
              }
            >
              <p className="font-18">
                <Clock />
              </p>
              <p className="mb-0 ms-2">
                For security, users cannot send or withdraw Rupiah/Assets for 48
                hours after the 2FA reset process is approved
              </p>
            </div>

            {/* warning */}
            <div
              className={
                darkMode
                  ? "bg-dark-mode2 mt-3 p-2 font-blue-grey"
                  : "bg-blue-transparant mt-3 p-2 font-blue-grey"
              }
            >
              <p className="font-15 fw-bold text-center">ATTENTION !</p>
              <ul className="font-10 mb-0">
                <li>
                  Maximum withdrawal of 200,000,000 IDR /day to increase the
                  limit, (click here)
                </li>
                <li>
                  Make sure to transfer only from the bank account in your name
                  otherwise the withdrawal will fail.
                </li>
                <li>Minimum withdrawal 100,000 IDR</li>
                <li>
                  Withdrawals above 200,000,000 IDR will be charged IDR 120,000
                  IDR
                </li>
              </ul>
            </div>

            {/* button next */}
            {selectedBank.length !== 0 ? (
              <div className="d-grid col-12 my-3">
                <button
                  type="button"
                  className="btn text-white py-2"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-toggle="modal"
                  data-bs-target="#modal-withdrawal-confirm"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="d-grid col-12 my-3">
                <button
                  type="button"
                  className="btn text-white py-2"
                  style={{ backgroundColor: "#1B6AEA" }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className={
              darkMode
                ? "container text-roboto text-white"
                : "container text-roboto"
            }
            style={{ minHeight: "100vh" }}
          >
            {/* select asset */}
            <div className="mt-3 mx-3">
              <p className="font-16 mb-1 fw-bold font-inter">
                Select Crypto Assets
              </p>
              <div
                className={
                  darkMode
                    ? "px-2 py-2 border-0 rounded"
                    : "px-2 py-2 border rounded"
                }
                style={{ backgroundColor: darkMode ? "#282A32" : "#FFFFFF" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    {targetAsset.length !== 0
                      ? targetAsset.map((e) => {
                          const img = `https://assets.digitalexchange.id/coin/${e.symbol}.png`
                          return (
                            <>
                              <img
                                src={img}
                                alt=""
                                className="img-fluid"
                                style={{ width: "20px", height: "20px" }}
                              />
                              <p className="font-14 ms-2 mb-0">
                                <span className="fw-bold">{e.symbol}</span>{" "}
                                {e.name}
                              </p>
                            </>
                          )
                        })
                      : ""}
                  </div>
                  <p
                    className="font-16 mb-0"
                    onClick={() => navigate("/list-assets/withdraw")}
                  >
                    <ChevronRight />
                  </p>
                </div>
              </div>
            </div>

            {/* Select network */}
            {network ? (
              selectedNetwork ? (
                <div className="mt-3">
                  <div className="container text-inter mt-3">
                    <p className="mb-0 fw-bold">Select Network</p>
                    <button
                      className={
                        darkMode
                          ? "btn border w-100 mt-2 bg-dark-mode2 border-0 text-white"
                          : "btn border w-100 mt-2"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <div className="d-flex justify-content-between font-14 py-1">
                        <div>{selectedNetwork.name}</div>
                        <div>
                          <ChevronRight />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <div className="container text-inter mt-3">
                    <p className="mb-0 fw-bold">Select Network</p>
                    <button
                      className={
                        darkMode
                          ? "btn border w-100 mt-2 bg-dark-mode2 border-0 text-white"
                          : "btn border w-100 mt-2"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <div className="d-flex justify-content-between font-14 py-1">
                        <div>Select Network</div>
                        <div>
                          <ChevronRight />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="mt-3">
                <div className="container text-inter mt-3">
                  <p className="mb-0 fw-bold">Select Network</p>
                  <button
                    className={
                      darkMode
                        ? "btn border w-100 mt-2 bg-dark-mode2 border-0 text-muted"
                        : "btn border w-100 mt-2"
                    }
                    disabled
                  >
                    <div className="d-flex justify-content-between font-14 py-1">
                      <div>Select Network</div>
                      <div>
                        <ChevronRight />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {selectedNetwork ? (
              <>
                {/* available balance */}
                <div className="mt-3 mx-3">
                  <div
                    className={
                      darkMode
                        ? "d-flex align-items-center border border-secondary rounded"
                        : "d-flex align-items-center"
                    }
                    style={{
                      backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                      height: "48px",
                    }}
                  >
                    <div className="col-10">
                      <input
                        type="number"
                        className={
                          darkMode
                            ? "form-control shadow-none border-0 bg-dark-mode2 text-white"
                            : "form-control shadow-none border-0"
                        }
                        placeholder="Enter Amount"
                        style={{ backgroundColor: "#F4F8FC" }}
                        max={+currentAmoount}
                        value={amountWitdrawal}
                        min={0}
                        step={0.00000001}
                        onChange={(e) => {
                          e.preventDefault()
                          setAmountWithdrawal(e.target.value)
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <p
                        className="font-primary mb-0 ms-2 font-16"
                        onClick={() => setAmountWithdrawal(currentAmoount)}
                      >
                        MAX
                      </p>
                    </div>
                  </div>

                  {currentAmoount ? (
                    <p
                      className="font-14 mt-2"
                      style={{ color: darkMode ? "white" : "#626262" }}
                    >
                      Available Balance :{" "}
                      <span className="fw-bold">
                        {currentAmoount} {name}
                      </span>
                    </p>
                  ) : currentAmoount === 0 ? (
                    <p
                      className="font-14 mt-2"
                      style={{ color: darkMode ? "white" : "#626262" }}
                    >
                      Available Balance :{" "}
                      <span className="fw-bold">0 {name}</span>
                    </p>
                  ) : (
                    <p
                      className="font-14 mt-2"
                      style={{ color: darkMode ? "white" : "#626262" }}
                    >
                      Available Balance :{" "}
                      <span className="fw-bold">Loading...</span>
                    </p>
                  )}
                </div>

                {/* Select Address BNB */}
                <div className="mt-4 mx-3">
                  <p className="font-16 mb-1">Select Address {name}</p>
                  {walletAddress.loading ? (
                    <div
                      className={
                        darkMode
                          ? "rounded position-relative px-3 border border-secondary"
                          : "rounded position-relative px-3"
                      }
                      data-bs-toggle="modal"
                      style={{
                        height: "50px",
                        backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                      }}
                    >
                      <div className="d-flex justify-content-between pt-3">
                        <p className="mb-0">Loading... </p>
                        <p className="mb-0">
                          <ChevronDown />
                        </p>
                      </div>
                    </div>
                  ) : walletAddress.list.length == 0 ? (
                    <div
                      className={
                        darkMode
                          ? "rounded position-relative px-3 border border-secondary"
                          : "rounded position-relative px-3"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#modal-add-address"
                      style={{
                        height: "50px",
                        backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center h-100 bg-dark-mode2">
                        <p className="mb-0">Select Address Wallet </p>
                        <p className="mb-0">
                          <ChevronDown />
                        </p>
                      </div>
                    </div>
                  ) : walletAddress.list.length !== 0 ? (
                    <select
                      className="form-select border-0 shadow-none"
                      onChange={(e) => {
                        e.preventDefault()
                        setWalletAddress({
                          ...walletAddress,
                          choose: e.target.value,
                        })
                      }}
                      style={{ height: "61px", backgroundColor: "#F4F8FC" }}
                    >
                      <option
                        value=""
                        selected="false"
                        style={{ display: "none" }}
                      >
                        Select Network
                      </option>
                      {network ? (
                        walletAddress.list.map((e) => {
                          return (
                            <option value={e.address}>
                              <div className="fw-bold">{e.label}</div>
                              <div className="ms-5"> - {e.address}</div>
                            </option>
                          )
                        })
                      ) : (
                        <option
                          value=""
                          selected="false"
                          style={{ display: "" }}
                        >
                          Loading...
                        </option>
                      )}
                      <option value="new">
                        <div className="fw-bold">Add new address</div>
                      </option>
                    </select>
                  ) : (
                    ""
                  )}
                </div>

                {/* Add address */}
                {showAddAddress ? (
                  <div className="mx-3">
                    {/* label address */}
                    <div className="mt-3">
                      <p
                        className="font-14 mb-1"
                        style={{ color: darkMode ? "white" : "#626262" }}
                      >
                        Label
                      </p>
                      <input
                        type="text"
                        className={
                          darkMode
                            ? "form-control shadow-none border-0 text-white"
                            : "form-control shadow-none border-0"
                        }
                        placeholder="Enter 4-20 Characters. e.g : DEX_user1"
                        style={{
                          backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                          height: "54px",
                        }}
                        min={4}
                        max={20}
                        onChange={(e) => {
                          e.preventDefault()
                          setLabelAdress(e.target.value)
                        }}
                      />
                    </div>

                    {/*   Wallet Address */}
                    <div className="mt-3">
                      <p
                        className="font-14 mb-1"
                        style={{ color: darkMode ? "white" : "#626262" }}
                      >
                        Wallet Address
                      </p>
                      <div
                        className="d-flex align-items-center rounded"
                        style={{
                          backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                          height: "54px",
                        }}
                      >
                        <div className="col-10">
                          <input
                            type="string"
                            className={
                              darkMode
                                ? "form-control shadow-none border-0 rounded text-white "
                                : "form-control shadow-none border-0 rounded"
                            }
                            placeholder="Enter Recipient Address"
                            style={{
                              backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                            }}
                            onChange={(e) => {
                              e.preventDefault()
                              setInputWalletAddress(e.target.value)
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <p className="font-primary mb-0 ms-2 font-16">
                            Paste
                          </p>
                        </div>
                      </div>
                    </div>

                    {detailNetwork ? (
                      detailNetwork.detail.tag_name ? (
                        <div className="mt-3">
                          <p
                            className="font-14 mb-1"
                            style={{ color: darkMode ? "white" : "#626262" }}
                          >
                            {detailNetwork.detail.tag_name}
                          </p>
                          <div
                            className="d-flex align-items-center rounded"
                            style={{
                              backgroundColor: darkMode ? "#282A32" : "#F4F8FC",
                              height: "54px",
                            }}
                          >
                            <div className="col-10">
                              <input
                                type="string"
                                className={
                                  darkMode
                                    ? "form-control shadow-none border-0 rounded text-white "
                                    : "form-control shadow-none border-0 rounded"
                                }
                                placeholder="Enter Recipient Address"
                                style={{
                                  backgroundColor: darkMode
                                    ? "#282A32"
                                    : "#F4F8FC",
                                }}
                                onChange={(e) => {
                                  e.preventDefault()
                                  setTagNameNetwork(e.target.value)
                                }}
                              />
                            </div>
                            <div className="col-2">
                              <p className="font-primary mb-0 ms-2 font-16">
                                Paste
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                {/* fee withdraw */}
                <div className="mt-4 mx-3">
                  <div className="d-flex justify-content-between">
                    <p className="font-14">Fee Withdrawal</p>
                    {targetAsset.length !== 0 ? (
                      <p className="font-14">
                        {targetAsset[0].fee_withdrawal} {name}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="font-14">Total Withdrawal</p>
                    {amountWitdrawal ? (
                      <p className="font-14">
                        {
                          +(amountWitdrawal - targetAsset[0].fee_withdrawal)
                            .toFixed(8)
                            .toLocaleString()
                        }{" "}
                        {name}
                      </p>
                    ) : (
                      <p className="font-14"> {name}</p>
                    )}
                  </div>
                </div>

                {/* withdraw button */}
                <div className="d-grid col-12 mb-4 px-3">
                  <button
                    type="button"
                    className="btn font-16 text-white"
                    style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#modal-success-add-address"
                  >
                    Withdrawal
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )}

      {/* modal select address */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-add-address"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className={
              darkMode
                ? "modal-content rounded border-0  bg-dark-mode text-white"
                : "modal-content rounded border-0"
            }
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body">
              <p className="font-20 text-center fw-bold mt-3 mb-2">
                Choose Wallet Address
              </p>
              <img
                src={DataEmpty}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p className="font-14 text-center my-3">No Wallet Address</p>
              {/* button ok */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                  onClick={() => setShowAddAddress(true)}
                >
                  <PlusLg /> Add new address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal success add address */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-success-add-address"
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
              <p
                className="text-center fw-bold mb-0 font-green"
                style={{ fontSize: "50px" }}
              >
                <CheckCircleFill />
              </p>
              <div className=" row justify-content-center">
                <div className="col-11">
                  <p className="font-20 text-center fw-bold mt-3 mb-2">
                    Address Entered successfully
                  </p>
                  <p className="font-16 text-center my-3">
                    Attention! Your wallet address will be saved when the
                    withdrawal process has confirmed the email.
                  </p>
                </div>
              </div>
              {/* button ok */}
              {console.log(statusWalletAddress)}
              <div className="d-grid col-12">
                {statusWalletAddress === "new" ? (
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B6AEA" }}
                    data-bs-dismiss="modal"
                    onClick={() => {
                      if (detailNetwork.detail.tag_name) {
                        localStorage.setItem(
                          "wd_asset",
                          JSON.stringify({
                            amount: amountWitdrawal
                              .toString()
                              .replace(".", ","),
                            network: selectedNetwork.id,
                            assetName: name,
                            label: labelAdress,
                            walletAddress: inputWalletAddress,
                            statusWallet: statusWalletAddress,
                            // address_type: showAddAddress ? "new" : "old",
                            extra_wallet_address: tagNameNetwork,
                          })
                        )
                      } else {
                        localStorage.setItem(
                          "wd_asset",
                          JSON.stringify({
                            amount: amountWitdrawal
                              .toString()
                              .replace(".", ","),
                            network: selectedNetwork.id,
                            assetName: name,
                            label: labelAdress,
                            walletAddress: inputWalletAddress,
                            statusWallet: statusWalletAddress,
                            // address_type: showAddAddress ? "new" : "old",
                          })
                        )
                      }

                      navigate("/security-verification")
                    }}
                  >
                    Understand
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B6AEA" }}
                    data-bs-dismiss="modal"
                    onClick={() => {
                      localStorage.setItem(
                        "wd_asset",
                        JSON.stringify({
                          amount: amountWitdrawal.toString().replace(".", ","),
                          network: selectedNetwork.id,
                          assetName: name,
                          label: labelAdress,
                          walletAddress: walletAddress.choose,
                          statusWallet: statusWalletAddress,
                        })
                      )
                      navigate("/security-verification")
                    }}
                  >
                    Understand
                  </button>
                )}

                {/* <button
									type="button"
									className="btn text-white"
									style={{ backgroundColor: "#1B6AEA" }}
									data-bs-dismiss="modal"
									data-bs-toggle="modal"
									data-bs-target="#modal-confirm-email">
									Understand
								</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal check confirm email */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-confirm-email"
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
              <div className=" row justify-content-center">
                <div className="">
                  <p className="font-20 text-center fw-bold mt-3 mb-2">
                    One More Stage ! <br /> Please check your email
                  </p>
                  <img
                    src={SuccessImg}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                  <p className="font-14 text-center mb-3">
                    Quantity : 0.003 BNB
                  </p>
                  <p className="font-14 text-center mb-0">
                    Withdrawal Address :
                  </p>
                  <p className="font-14 text-center mb-0">
                    0x3DGWYocR6aZ9pecoRFu9rtg6373hsjddhdyd
                  </p>
                  <p
                    className="font-14 text-center my-3 p-2 rounded"
                    style={{ backgroundColor: "#FCF4DD", color: "#A56D00" }}
                  >
                    If you don't find the email, please check the spam or
                    promotion section.
                  </p>
                </div>
              </div>
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

      {/* modal sample */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog w-100 m-0"
          style={{
            position: "fixed",
            top: "auto",
            right: 0,
            left: 0,
            bottom: 0,
            maxWidth: 3000,
          }}
        >
          <div
            class={
              darkMode
                ? "modal-content bg-dark-mode2 text-white"
                : "modal-content"
            }
            style={{ borderRadius: "20px 20px 0 0 " }}
          >
            <div class="modal-body mt-2">
              {network
                ? network.map((el, index) => {
                    return (
                      <>
                        <div
                          className="my-2 p-2 rounded text-inter font-14"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            // getDetailNetwork(el.description, el.id)
                            setSeletedNetwork({
                              id: el.id,
                              name: el.description,
                            })
                          }}
                        >
                          {el.description}
                        </div>
                        <hr />
                      </>
                    )
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>

      {/* modal Withdrawal Confirm */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-withdrawal-confirm"
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
              {selectedBank.length !== 0 && fixTax ? (
                <div className=" row justify-content-center">
                  <p className="font-24 text-center fw-bold mt-3 mb-2">
                    Withdrawal Confirm
                  </p>
                  <div className="d-flex justify-content-between">
                    <p className="font-14 font-modal-withdrawal-confirm">
                      Bank Name
                    </p>
                    <p className="font-14 fw-bold">{selectedBank[0].bank}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="font-14 font-modal-withdrawal-confirm">
                      Rekening Number
                    </p>
                    <p className="font-14 fw-bold">{selectedBank[0].rek}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="font-14 font-modal-withdrawal-confirm">
                      Withdraw Balance
                    </p>
                    <p className="font-14 fw-bold">
                      {" "}
                      Rp {IDRFormater(+amountWitdrawal)}
                    </p>
                  </div>
                  <div
                    className="mb-3"
                    style={{ border: "1px solid #DDE4EA" }}
                  ></div>
                  <div className="d-flex justify-content-between">
                    <p className="font-14 font-modal-withdrawal-confirm">
                      Withdrawal Fee
                    </p>
                    <p className="font-14 fw-bold">Rp {IDRFormater(+fixTax)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="font-14 font-modal-withdrawal-confirm">
                      Total Withdrawal
                    </p>
                    <p className="font-14 fw-bold">
                      Rp {IDRFormater(amountWitdrawal - fixTax)}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* button ok */}
              <div className="row gx-2">
                <div className="d-grid col-6">
                  <button
                    type="button"
                    className="btn font-primary"
                    style={{ backgroundColor: "#F1F9FF" }}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-grid col-6">
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B6AEA" }}
                    data-bs-dismiss="modal"
                    onClick={() => {
                      navigate("/security-verification", {
                        state: {
                          name: "withdrawal",
                          pair: name,
                          withdrawal_amount: amountWitdrawal,
                          withdrawal_account: selectedBank[0],
                        }.rek,
                      })
                      localStorage.setItem(
                        "wd_idr",
                        `${amountWitdrawal}-${selectedBank[0].id}`
                      )
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WithdrawPage

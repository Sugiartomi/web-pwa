import axios from "axios"
import axiosConfig from "../../config/axios"
import React, { useEffect, useState } from "react"
import {
  ChevronCompactRight,
  ChevronDown,
  ChevronLeft,
} from "react-bootstrap-icons"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TimeIcon from "../../assets/time.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import { get_data_all_ticker } from "../../recoil/marketState"
import { getTheme } from "../../recoil/theme.State"
import {
  DBDataAssetDeposit,
  DBDetailNetwork,
  DBNetworkList,
} from "../../DB/DepositPage"

function DepositAsset() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const { name } = useParams()
  const { pathname } = useLocation()
  const { state } = useLocation()
  const [networkList, setNetworkList] = useState(DBNetworkList)
  const [detailNetwork, setDetailNetwork] = useState(DBDetailNetwork)
  const [selectNetwork, setSelectNetwork] = useState("Select Network")

  const navigate = useNavigate()
  const [network, setNetwok] = useState()
  const [depositIDR, setDepositIDR] = useState("Transfer ATM")
  const userToken = localStorage.getItem("token")
  const [dataAsset, setDataAasset] = useState(DBDataAssetDeposit)







  const getDetailNetwork = (description, networkId) => {
    setNetwok(description)
  }

  const generateWallet = (networkId) => {
 console.log("masuk");
  }

  return (
    <>
      {/* select asset */}

      <div className="container text-inter mt-3">
        <p className="mb-0 fw-bold">Select Crypto Assets</p>
        <button
          className="btn border w-100 mt-2"
          disabled={dataAsset ? "" : true}
          onClick={() =>
            navigate(`/list-assets/deposit`, {
              state: { pathname, status: "deposit" },
            })
          }
        >
          <div
            className={
              darkMode
                ? "d-flex justify-content-between font-14 py-1 text-white"
                : "d-flex justify-content-between font-14 py-1"
            }
          >
            <div>
              {dataAsset ? (
                <>
                  <span className="fw-bold">{name}</span> {dataAsset.name}
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              <ChevronCompactRight />
            </div>
          </div>
        </button>
      </div>
      {/* select network */}

      <div
        className="container text-inter mt-3"
        style={!network ? { minHeight: "100vh" } : {}}
      >
        <p className="mb-0 fw-bold">Select Network</p>
        <button
          className="btn border w-100 mt-2"
          disabled={dataAsset ? "" : true}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div
            className={
              darkMode
                ? "d-flex justify-content-between font-14 py-1 text-white"
                : "d-flex justify-content-between font-14 py-1"
            }
          >
            <div>{selectNetwork}</div>
            <div>
              <ChevronCompactRight />
            </div>
          </div>
        </button>
      </div>

      {network ? (
        <div style={{ minHeight: "100vh" }}>
          {/* warning minimum deposit */}
          <div className="mt-2 p-3">
            <p className="font-10 mb-0 font-red">
              Minimum deposit amount: 0,00000000 BNB Any deposit less than or
              equal to the minimum amount will not be credited or refunded
            </p>
          </div>
          {/* deposit address */}
          <div className="mt-3">
            <p className="font-16 fw-bold text-inter px-3 mb-1">
              Deposit Address
            </p>
            {detailNetwork?.wallet ? (
              <div
                className={
                  darkMode ? "d-flex p-2  bg-dark-mode2" : "d-flex p-2"
                }
                style={{ backgroundColor: "#F4F8FC" }}
              >
                <div className="col-10">
                  <p className="font-14 mb-0 text-center">
                    0x98f8485440dae0ec6d9220b28131724cQ
                  </p>
                </div>
                <div className="col-2">
                  <p className="font-14 mb-0 font-primary text-center">Copy</p>
                </div>
              </div>
            ) : (
              <div className="d-flex p-2 border mx-3 rounded">
                <div className="col-10">
                  <p className="font-14 mb-0 text-center"></p>
                </div>
                <div className="col-2">
                  <p
                    className="font-14 mb-0 font-primary text-center"
                    onClick={() => generateWallet(detailNetwork.detail.id)}
                  >
                    Generate
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* memo */}
          <div className="mt-3">
            <p className="font-16 text-inter fw-bold px-3 mb-1">Memo</p>
            <div className="d-flex p-2 border rounded mx-3">
              <div className="col-10">
                <p className="font-14 mb-0 text-center">104154761</p>
              </div>
              <div className="col-2">
                <p className="font-14 mb-0 font-primary text-center">Copy</p>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 font-red">
            <p className="font-10 mb-0">
              MEMO dan Alamat dibutuhkan untuk dapat berhasil melakukan deposit
              Binance Chain (BEP2)-BNB Anda ke digitalexchange.id
            </p>
          </div>
          {/* qr code */}
          <img
            src="https://www.qrstuff.com/images/default_qrcode.png"
            alt=""
            className="img-fluid mx-auto d-block"
            style={{ width: "180px", height: "180px" }}
          />
          <ul className="font-14">
            <li>
              Sending tokens other than BNB to the above address will cause the
              token to disappear.
            </li>
            <li>Deposit will enter after 1 confirmations.</li>
            <li>BNB deposit are free.</li>
          </ul>
          {/* warning */}
          <div className="d-flex mb-3 ">
            <div style={{ backgroundColor: "red", width: 10 }}></div>
            <div
              className="p-3 font-12"
              style={{ backgroundColor: darkMode ? "#282A32" : "#F5FCFF" }}
            >
              <p
                className="font-24 fw-bold text-center mb-2"
                style={{ color: "#0C6DB5" }}
              >
                Warning
              </p>
              <p className="font-12 mb-0 text-secondary">
                Please verify your Deposit address and make sure it`s correct
                address. If you send to incorrect address, we cannot refund it
                at all. The Transactions are final. It means that after
                transaction is processed, it cannot be canceled. Any personal
                mistakes that result in unwanted things will be your
                responsibility, digitalexchange.id is not responsible for the
                products, goods or services you buy or other alternate
                cryptocurrencies.
              </p>
              <p className="font-12 text-secondary mt-3">
                Saving tokens to an address other than BNB may cause your funds
                to be lost.
              </p>
            </div>
          </div>
        </div>
      ) : dataAsset ? (
        <p className="text-center mt-5 font-primary">
          Pilih Jaringan Terlebih Dahulu
        </p>
      ) : (
        ""
      )}

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
            class={darkMode ? "modal-content bg-dark-mode2" : "modal-content"}
            style={{ borderRadius: "20px 20px 0 0 " }}
          >
            <div class="modal-body mt-2">
              {networkList
                ? networkList.map((el, index) => {
                    return (
                      <>
                        <div
                          className="my-2 p-2 rounded text-inter font-14"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            getDetailNetwork(el.description, el.id)
                            setSelectNetwork(el.description)
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
    </>
  )
}

export default DepositAsset

import React, { useEffect, useState } from "react"
import axios from "axios"
import axiosConfig from "../../config/axios"
import { X } from "react-bootstrap-icons"
import Warning from "./Warning"
import { useLocation } from "react-router-dom"
import { IDRFormater } from "../../helpers/currencyFormater"
import { useRecoilState } from "recoil"
import { getTheme } from "../../recoil/theme.State"
import { DBBankList } from "../../DB/DepositPage"

function DepositIDR() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const { pathname, state } = useLocation()
  const [bankList, setBankList] = useState(DBBankList)
  const [depositVA, setDepositVA] = useState()
  const [depositIndomaret, setDepositIndomaret] = useState()
  const [depositIDR, setDepositIDR] = useState("Transfer ATM")
  const [transfer, setTransfer] = useState()
  const [indomaretDepositAmount, setIndomaretDepositAmount] = useState(0)
  const [indomaretCurrent, setIndomaretCurrent] = useState(1)
  const userToken = localStorage.getItem("token")
  const [waitingDepoRetail, setWaitingDepoRetail] = useState(false)



  const handleIDR = (e) => {
    let input = e.target.value.toString()
    let filter1 = input.replaceAll(".", "")
    let filter2 = filter1.replaceAll(",", ".")

    if (/^[0-9]/.test(+filter2)) {
      setIndomaretDepositAmount(filter2)
    }
  }

  const checkDepositVA = (type, img, name, code) => {
    setTransfer({ img, name })
 
  }

  const createDeposit = () => {
   
  }

  return (
    <>
      {/* deposit destination */}
      {!transfer ? (
        <>
          <div
            className={
              darkMode
                ? "mt-3 px-3 text-inter text-white"
                : "mt-3 px-3 text-inter"
            }
            style={{ minHeight: "100vh" }}
          >
            <p className="font-16 fw-bold">Deposit From</p>
            <div
              className={
                darkMode
                  ? "px-2 py-3 border rounded bg-dark-mode2 border-0"
                  : "px-2 py-3 border rounded"
              }
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="d-flex justify-content-between px-2">
                <p className="font-14 mb-0">Select Deposit Partner</p>
                <p
                  className="font-12 mb-0"
                  style={{ color: "#1B6AEA" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exchange-status"
                >
                  Change
                </p>
              </div>
            </div>
            <Warning />
          </div>
        </>
      ) : (
        <>
          <div className="mt-3" style={!transfer ? { minHeight: "100vh" } : {}}>
            <div
              className="px-3 py-3 border rounded"
              style={{ backgroundColor: darkMode ? "grey" : "#FFFFFF" }}
            >
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <p className="font-16 mb-0">{transfer.name}</p>
                  <div>
                    <img
                      src={`https://assets.digitalexchange.id/bank/${transfer.img}`}
                      alt=""
                      className="img-fluid ms-3"
                      style={{ width: "60px" }}
                    />
                  </div>
                </div>
                <p
                  className="font-16 mb-0"
                  style={{ color: darkMode ? "white" : "#1B6AEA" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exchange-status"
                >
                  Change
                </p>
              </div>
            </div>
          </div>

          {transfer && transfer.name !== "Indomaret" ? (
            <div style={{ minHeight: "100vh" }}>
              {/* hanya akan di tampilkan jika jenis transfer bukan indomaret. Transfer.name di dapat dari modal yang menampilkan list bank. disana terdapat onclick untuk update variablenya */}
              {/* virtual account */}
              <div className="mt-3">
                <div
                  className="px-2 py-3"
                  style={{ backgroundColor: darkMode ? "#282A32" : "#F4F8FC" }}
                >
                  {depositVA ? (
                    <>
                      <p className="font-12 mb-0">Virtual Account</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="font-20 fw-bold mb-0">
                          {depositVA.account_number}
                        </p>
                        <div
                          onClick={() =>
                            navigator.clipboard.writeText(
                              depositVA.account_number
                            )
                          }
                        >
                          <p className="font-12 badge font-primary border mb-0 px-4 py-2">
                            Copy
                          </p>
                        </div>
                      </div>
                      <p className="font-14 mb-0 mt-2">
                        a.n. {depositVA.account_holder}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* transfer option */}
              <div className="d-flex justify-content-between mb-2 mt-3">
                <p
                  className="font-15 mb-0 badge px-3 py-2"
                  style={
                    depositIDR === "Transfer ATM"
                      ? darkMode
                        ? {
                            fontWeight: "400",
                            border: "1px solid #FFFFFF",
                            backgroundColor: "#282A32",
                          }
                        : { fontWeight: "400", border: "1px solid #1B6AEA" }
                      : darkMode
                      ? {
                          fontWeight: "400",
                          border: "1px solid #282A32",
                          color: "grey",
                        }
                      : { fontWeight: "400", border: "1px solid #DDE4EA" }
                  }
                  onClick={() => setDepositIDR("Transfer ATM")}
                >
                  Transfer ATM
                </p>
                <p
                  className="font-15 mb-0 badge  px-3 py-2"
                  style={
                    depositIDR === "m-Banking"
                      ? darkMode
                        ? {
                            fontWeight: "400",
                            border: "1px solid #FFFFFF",
                            backgroundColor: "#282A32",
                          }
                        : { fontWeight: "400", border: "1px solid #1B6AEA" }
                      : darkMode
                      ? {
                          fontWeight: "400",
                          border: "1px solid #282A32",
                          color: "grey",
                        }
                      : { fontWeight: "400", border: "1px solid #DDE4EA" }
                  }
                  onClick={() => setDepositIDR("m-Banking")}
                >
                  m-Banking
                </p>
                <p
                  className="font-15 mb-0 badge px-3 py-2"
                  style={
                    depositIDR === "i-Banking"
                      ? darkMode
                        ? {
                            fontWeight: "400",
                            border: "1px solid #FFFFFF",
                            backgroundColor: "#282A32",
                          }
                        : { fontWeight: "400", border: "1px solid #1B6AEA" }
                      : darkMode
                      ? {
                          fontWeight: "400",
                          border: "1px solid #282A32",
                          color: "grey",
                        }
                      : { fontWeight: "400", border: "1px solid #DDE4EA" }
                  }
                  onClick={() => setDepositIDR("i-Banking")}
                >
                  i-Banking
                </p>
              </div>
              <div className="mb-3">
                <div
                  className="px-2 py-3 mx-0"
                  style={{ backgroundColor: darkMode ? "#282A32" : "#FFFFFF" }}
                >
                  {depositVA ? (
                    <>
                      <ul className="font-10 mb-0 mx-0 px-1 ps-3">
                        <li>Minimum Deposit is {depositVA.min_depo} IDR</li>
                        <li>Maximum Deposit is {depositVA.max_depo} IDR</li>
                      </ul>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* deposit option */}
              {/* digunakan untuk menampilkan jenis layanan transfer yang tersedia. masing-masing bank memiliki aturan transfer yang berbeda - beda. tampilan dibawah ini hanya akan muncul jika terjadi triger klik pada bagian pilih bank di modal */}
              {transfer && transfer.name === "Bank BRI" ? (
                <>
                  {depositIDR === "Transfer ATM" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* transfer BRI */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Transfer ATM (users BRI)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Insert your ATM Card.</li>
                                  <li>Select a language.</li>
                                  <li>Enter your ATM PIN.</li>
                                  <li>Select "More Menu"</li>
                                  <li>Select "Transfers".</li>
                                  <li>
                                    Select the type of account you will use
                                    (Example: “From a Savings Account”).
                                  </li>
                                  <li>Select "Virtual Account Billing".</li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    988433345226295)
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                    If so, click Confirm, if it is appropriate,
                                    continue the transaction.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transfer ATM (users others BRI) */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Transfer ATM (users others BRI)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your BRI VA number in the Interbank
                                    Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Bank BRI)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    is correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Transfer Between Banks.
                                  </li>
                                  <li>
                                    Then select the Bank (Bank BRI) and Virtual
                                    account Number (VA) that was registered
                                    earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Bank Token PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "m-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* transfer BRI */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                m-Banking (users BRI)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Access BRI Mobile Banking from your mobile
                                    phone then enter your user ID and password.
                                  </li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>
                                    Select the "Virtual Account Billing" menu
                                    then select a debit account.
                                  </li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    9884333420062959) in the “New Input” menu.
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Confirm the transaction and enter the
                                    password. Your Transaction and payment Has
                                    Been Successful
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transfer ATM (users others BRI) */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                m-Banking (users others BRI)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Login to the mobile application.</li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your BRI VA number in the Interbank
                                    Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (BRI)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select Bank (BRI) and Virtual account
                                    Number (VA) that was registered earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "i-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* transfer BRI */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                i-banking (users BRI)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Type in address i-banking BRI address then
                                    click "Enter".
                                  </li>
                                  <li>Enter User ID and Password.</li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>Select "Virtual Account Billing"</li>
                                  <li>
                                    Then enter your Virtual Account number
                                    (Example: 988433420062959) which you want to
                                    pay. Then select the debit account to be
                                    used. Then press "Continue".
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Enter the Authentication token code and your
                                    payment has been successful.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Transfer ATM (users others BRI) */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                i-banking (users others BRI)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your BRI VA number in the Interbank
                                    Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (BRI)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select Bank (BRI) and Virtual account
                                    Number (VA) that was registered earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : transfer && transfer.name === "Bank Mandiri Tbk" ? (
                <>
                  {depositIDR === "Transfer ATM" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/*1*/}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Transfer ATM (users Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Insert your ATM Card.</li>
                                  <li>Select a language.</li>
                                  <li>Enter your ATM PIN.</li>
                                  <li>Select "More Menu"</li>
                                  <li>Select "Transfers".</li>
                                  <li>
                                    Select the type of account you will use
                                    (Example: “From a Savings Account”).
                                  </li>
                                  <li>Select "Virtual Account Billing".</li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    988433345226295)
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                    If so, click Confirm, if it is appropriate,
                                    continue the transaction.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Transfer ATM (users others Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Mandiri VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Bank Mandiri)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    is correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Transfer Between Banks.
                                  </li>
                                  <li>
                                    Then select the Bank (Bank Mandiri) and
                                    Virtual account Number (VA) that was
                                    registered earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Bank Token PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "m-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* 1 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                m-banking (users Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Access Mandiri Mobile Banking from your
                                    mobile phone then enter your user ID and
                                    password.
                                  </li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>
                                    Select the "Virtual Account Billing" menu
                                    then select a debit account.
                                  </li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    9884333420062959) in the “New Input” menu.
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Confirm the transaction and enter the
                                    password. Your Transaction and payment Has
                                    Been Successful
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                m-banking (users others Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Login to the mobile application.</li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Mandiri VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Mandiri)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select Bank (Mandiri) and Virtual
                                    account Number (VA) that was registered
                                    earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "i-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* 1*/}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                i-banking (users Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Type in address i-banking Mandiri address
                                    then click "Enter".
                                  </li>
                                  <li>Enter User ID and Password.</li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>Select "Virtual Account Billing"</li>
                                  <li>
                                    Then enter your Virtual Account number
                                    (Example: 988433420062959) which you want to
                                    pay. Then select the debit account to be
                                    used. Then press "Continue".
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Enter the Authentication token code and your
                                    payment has been successful.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                i-banking (users others Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Mandiri VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Mandiri)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select Bank (BRI) and Virtual account
                                    Number (VA) that was registered earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : transfer && transfer.name === "BII Maybank" ? (
                <>
                  {depositIDR === "Transfer ATM" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/*1*/}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Transfer ATM (users Maybank)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Insert your ATM Card.</li>
                                  <li>Select a language.</li>
                                  <li>Enter your ATM PIN.</li>
                                  <li>Select "More Menu"</li>
                                  <li>Select "Transfers".</li>
                                  <li>
                                    Select the type of account you will use
                                    (Example: “From a Savings Account”).
                                  </li>
                                  <li>Select "Virtual Account Billing".</li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    988433345226295)
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                    If so, click Confirm, if it is appropriate,
                                    continue the transaction.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-none"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Transfer ATM (users others Maybank)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Maybank VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Maybank)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    is correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Transfer Between Banks.
                                  </li>
                                  <li>
                                    Then select the Bank (Maybank) and Virtual
                                    account Number (VA) that was registered
                                    earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Bank Token PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "m-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* 1 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                m-banking (users Maybank)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Access Maybank Mobile Banking from your
                                    mobile phone then enter your user ID and
                                    password.
                                  </li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>
                                    Select the "Virtual Account Billing" menu
                                    then select a debit account.
                                  </li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    9884333420062959) in the “New Input” menu.
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Confirm the transaction and enter the
                                    password. Your Transaction and payment Has
                                    Been Successful
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                m-banking (users others Mandiri)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Login to the mobile application.</li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Mandiri VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Maybank)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select Bank (Maybank) and Virtual
                                    account Number (VA) that was registered
                                    earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "i-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* 1*/}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                i-banking (users Maybank)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Type in address i-banking Maybank address
                                    then click "Enter".
                                  </li>
                                  <li>Enter User ID and Password.</li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>Select "Virtual Account Billing"</li>
                                  <li>
                                    Then enter your Virtual Account number
                                    (Example: 988433420062959) which you want to
                                    pay. Then select the debit account to be
                                    used. Then press "Continue".
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Enter the Authentication token code and your
                                    payment has been successful.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                i-banking (users others Maybank)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Maybank VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Maybank)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select the Bank (Maybank) and Virtual
                                    account Number (VA) that was registered
                                    earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : transfer && transfer.name === "Permata Bank" ? (
                <>
                  {depositIDR === "Transfer ATM" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/*1*/}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                i-banking (users Permata)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Insert your ATM Card.</li>
                                  <li>Select a language.</li>
                                  <li>Enter your ATM PIN.</li>
                                  <li>Select "More Menu"</li>
                                  <li>Select "Transfers".</li>
                                  <li>
                                    Select the type of account you will use
                                    (Example: “From a Savings Account”).
                                  </li>
                                  <li>Select "Virtual Account Billing".</li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    988433345226295)
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                    If so, click Confirm, if it is appropriate,
                                    continue the transaction.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Transfer ATM (users others Permata)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Insert the card into the ATM machine.</li>
                                  <li>
                                    Choose Indonesian to facilitate
                                    transactions.
                                  </li>
                                  <li>Enter the ATM PIN number.</li>
                                  <li>
                                    Select the "Transfer" menu. After that,
                                    select the bank you want to transfer to.
                                  </li>
                                  <li>
                                    Enter Bank Permata code 013 + No. Your
                                    Virtual Permata (example: 8423573927200).
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer to the
                                    destination account.
                                  </li>
                                  <li>
                                    Make sure the name that appears on the
                                    monitor screen is your Permata VA Name.
                                  </li>
                                  <li>
                                    Confirmation of your details will appear on
                                    the screen and if it is appropriate please
                                    continue the transaction until it is
                                    complete.
                                  </li>
                                  <li>
                                    Transfer was successful. You will receive
                                    proof of the transaction in the form of a
                                    receipt. Then, remove the ATM card from the
                                    machine.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "m-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* 1 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                m-banking (users Permata)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Access Permata Mobile Banking from your
                                    mobile phone then enter your user ID and
                                    password.
                                  </li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>
                                    Select the "Virtual Account Billing" menu
                                    then select a debit account.
                                  </li>
                                  <li>
                                    Enter your Virtual Account number (Example:
                                    9884333420062959) in the “New Input” menu.
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Confirm the transaction and enter the
                                    password. Your Transaction and payment Has
                                    Been Successful
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                m-banking (users others Permata)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>Login to the mobile application.</li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Mandiri VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Permata)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select Bank (Permata) and Virtual
                                    account Number (VA) that was registered
                                    earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : depositIDR === "i-Banking" ? (
                    <>
                      <div className="mb-3">
                        <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                        {/* 1*/}
                        <div className="accordion">
                          <div>
                            <h2 id="headingTwo">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                i-banking (users Permata)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Type in address i-banking Permata Bank
                                    address then click "Enter".
                                  </li>
                                  <li>Enter User ID and Password.</li>
                                  <li>Select the "Transfer" menu</li>
                                  <li>Select "Virtual Account Billing"</li>
                                  <li>
                                    Then enter your Virtual Account number
                                    (Example: 988433420062959) which you want to
                                    pay. Then select the debit account to be
                                    used. Then press "Continue".
                                  </li>
                                  <li>
                                    Enter the nominal amount you want to send.
                                  </li>
                                  <li>
                                    Enter the Authentication token code and your
                                    payment has been successful.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="accordion">
                          <div>
                            <h2 id="headingThree">
                              <button
                                className={
                                  darkMode
                                    ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                    : "accordion-button collapsed fw-bold pb-0 shadow-0"
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                i-banking (users others Permata)
                              </button>
                            </h2>
                            <hr />
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              aria-labelledby="collapseThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <ol className="font-14">
                                  <li>
                                    Login to the Bank's Website that you have.
                                  </li>
                                  <li>Select the Transfer menu</li>
                                  <li>
                                    Register your Maybank VA number in the
                                    Interbank Transfer menu.
                                  </li>
                                  <li>
                                    Select your Destination Bank or fill in
                                    (Permata Bank)
                                  </li>
                                  <li>
                                    Enter your Virtual account (VA) number then
                                    click send
                                  </li>
                                  <li>
                                    Then check whether the name information that
                                    appears and the destination account number
                                    are correct.
                                  </li>
                                  <li>
                                    If you have clicked Send and enter your
                                    password until the Virtual account (VA)
                                    number is registered.
                                  </li>
                                  <li>
                                    If already registered Select Transfer &#62;
                                    select Interbank Transfer.
                                  </li>
                                  <li>
                                    Then select the Bank (Permata Bank) and
                                    Virtual account Number (VA) that was
                                    registered earlier.
                                  </li>
                                  <li>
                                    Enter the amount you want to transfer then
                                    click Send.
                                  </li>
                                  <li>Next, enter your Mobile Bank PIN.</li>
                                  <li>
                                    Your transfer process has been completed and
                                    after 5 minutes your transfer will
                                    automatically enter your account.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              <Warning />
            </div>
          ) : (
            <>
              {/*  Yang ditampilkan pertama kali adalah from input deposit amount. ketika tombol next di klik maka variable indomaretCurrent akan berubah dan merender tampilan payment code */}
              {!depositIndomaret ? (
                <>
                  <form action="" className="mt-3">
                    <label className="font-14">Enter Deposit Amount</label>
                    <input
                      type="string"
                      className={
                        darkMode
                          ? "form-control shadow-none bg-dark-mode2 text-white border-0"
                          : "form-control shadow-none"
                      }
                      placeholder="0"
                      style={{ height: "50px" }}
                      // value={IDRFormater(+indomaretDepositAmount).replace(",",".")}
                      value={IDRFormater(+indomaretDepositAmount)}
                      onChange={(e) => {
                        // setIndomaretDepositAmount(e.target.value)
                        handleIDR(e)
                      }}
                    />

                    <div className="my-2 mt-1 mx-0 px-0">
                      <div
                        className=" py-3"
                        style={{
                          backgroundColor: darkMode ? "#282A32" : "#FFFFFF",
                        }}
                      >
                        {bankList ? (
                          <ul className="font-10 mb-0 mx-0 px-3 ms-3">
                            <li>
                              Minimum deposit is {bankList[1].min_deposit} IDR
                            </li>
                            <li>
                              Maximum Deposit is {bankList[1].max_deposit} IDR
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    {/* button submit */}
                    <div className="d-grid col-12">
                      {+indomaretDepositAmount > 10000 ? (
                        waitingDepoRetail ? (
                          <button
                            type="button"
                            className="btn text-white bg-secondary"
                            style={{
                              backgroundColor: "#1B6AEA",
                              height: "46px",
                            }}
                            disabled
                          >
                            Waiting...
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn text-white"
                            style={{
                              backgroundColor: "#1B6AEA",
                              height: "46px",
                            }}
                            onClick={() => {
                              setWaitingDepoRetail(true)
                              createDeposit()
                            }}
                          >
                            Next
                          </button>
                        )
                      ) : (
                        <button
                          type="button"
                          className="btn text-white"
                          style={{ backgroundColor: "#1B6AEA", height: "46px" }}
                          disabled
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </form>
                  {/* how to deposit */}
                  <div className="mt-5">
                    <p className="font-18 fw-bold mb-2">How to Deposit :</p>
                    {/* 1*/}
                    <div className="accordion">
                      <div>
                        <h2 id="headingTwo">
                          <button
                            className={
                              darkMode
                                ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                : "accordion-button collapsed fw-bold pb-0 shadow-0"
                            }
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            i-Kios
                          </button>
                        </h2>
                        <hr />
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <ol className="font-14">
                              <li>
                                Go to i-Kios Indomaret, then select “PAYMENT
                                POINT”
                              </li>
                              <li>Select “E-Commerce”</li>
                              <li>
                                Choose/search for product name “Digital
                                Exchange”
                              </li>
                              <li>Enter the payment code</li>
                              <li>
                                Select “Pay at Cashier”, then make a payment
                                according to the amount billed
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2 */}
                    <div className="accordion">
                      <div>
                        <h2 id="headingThree">
                          <button
                            className={
                              darkMode
                                ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                : "accordion-button collapsed fw-bold pb-0 shadow-0"
                            }
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Cashier
                          </button>
                        </h2>
                        <hr />
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="collapseThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <ol className="font-14">
                              <li>
                                Inform the cashier for a PAYMENT POINT payment
                              </li>
                              <li>
                                Inform the cashier for E-Commerce (online
                                shopping) payment
                              </li>
                              <li>
                                Inform the cashier for product name “Digital
                                Exchange”
                              </li>
                              <li>Inform payment code to the cashier</li>
                              <li>
                                Make a payment according to the amount billed
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3 */}
                    <div className="accordion">
                      <div>
                        <h2 id="heading-i-saku">
                          <button
                            className={
                              darkMode
                                ? "accordion-button collapsed fw-bold pb-0 shadow-0 bg-dark-mode text-white"
                                : "accordion-button collapsed fw-bold pb-0 shadow-0"
                            }
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#i-saku"
                            aria-expanded="false"
                            aria-controls="i-saku"
                          >
                            i-saku
                          </button>
                        </h2>
                        <hr />
                        <div
                          id="i-saku"
                          className="accordion-collapse collapse"
                          aria-labelledby="heading-i-saku"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <ol className="font-14">
                              <li>Open the i-Saku app on your gadget</li>
                              <li>Select “See All”</li>
                              <li>Select “E-Commerce”</li>
                              <li>
                                Choose/search for product name “Digital
                                Exchange”
                              </li>
                              <li>Enter the payment code</li>
                              <li>
                                Make a payment according to the amount billed
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* attention */}
                  <div className="d-flex mt-3">
                    <div
                      className=""
                      style={{
                        backgroundColor: "#F4B946",
                        color: "#413700",
                        width: 5,
                      }}
                    ></div>
                    <div className=" py-3 mt-3" style={{ color: "#413700" }}>
                      <p className="font-24 fw-bold text-center">Attention</p>
                      <ul className="font-14">
                        <li>
                          Please complete the payment at your nearest Indomaret
                          by <strong>{depositIndomaret.expired_date}</strong>.
                          Make sure the transfer amount is correct.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* payment code */}
                  <div className="mt-3">
                    <div
                      className="px-2 py-3"
                      style={{ backgroundColor: "#F4F8FC" }}
                    >
                      <p className="font-12 mb-0">Payment Code</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="font-20 fw-bold mb-0">
                          {depositIndomaret.account_number}
                        </p>
                        <div
                          onClick={() =>
                            navigator.clipboard.writeText(
                              depositIndomaret.account_number
                            )
                          }
                        >
                          <p className="font-12 badge font-primary border mb-0 px-4 py-2">
                            Copy
                          </p>
                        </div>
                      </div>
                      <p className="font-14 mb-0 mt-2 font-primary">
                        a.n {depositIndomaret.account_holder}
                      </p>
                    </div>
                  </div>

                  {/* detail payment */}
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <p className="font-16">Amount</p>
                      <p className="font-16 fw-bold">
                        Rp{IDRFormater(+depositIndomaret.amount)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="font-16">Service Fee</p>
                      <p className="font-16 fw-bold font-red">
                        -Rp{IDRFormater(+depositIndomaret.fee)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="font-16">Deposit Received</p>
                      <p className="font-16 fw-bold">
                        Rp{IDRFormater(+depositIndomaret.total)}
                      </p>
                    </div>
                  </div>

                  {/* button close */}
                  <div className="d-grid col-12 mt-3">
                    <button
                      type="button"
                      className="btn font-primary"
                      style={{ height: "46px", border: "1px solid #1B6AEA" }}
                      onClick={() => setTransfer()}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* warning */}
              <div
                className=" mt-4"
                style={{ backgroundColor: "rgb(128,128,128,0.005" }}
              >
                <div className="d-flex">
                  <div style={{ width: 3 }} className="bg-danger" />
                  <div className="p-3">
                    <p
                      className="font-24 fw-bold text-center mb-2"
                      style={{ color: "#667085" }}
                    >
                      Warning
                    </p>
                    <ul className="font-14" style={{ color: "#667085" }}>
                      <li>
                        Please make sure the payment code is under Digital
                        Exchange's name.
                      </li>
                      <li>
                        If after 24 hours your funds have not been received,
                        please contact our live chat immediately at
                        help.digitalexchange.id
                      </li>
                      <li>
                        These terms apply to all Indomaret outlets in Indonesia.
                      </li>
                    </ul>
                    <p className="font-12 font-red ps-2">
                      Note: This payment code is only valid for deposits via
                      Indomaret
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* modal change bank */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="exchange-status"
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
            <div className={darkMode ? "modal-body bg-dark" : "modal-body"}>
              <div className="px-2">
                <div className="d-flex align-items-center">
                  <p className="font-16 mb-1" style={{ marginLeft: "30%" }}>
                    Choose Method
                  </p>
                  <p className="ms-auto font-25 mb-1" data-bs-dismiss="modal">
                    <X />
                  </p>
                </div>
                <p className="font-12 text-center">
                  Make sure the method you have chosen matches the bank account
                  you have or you will not receive your funds
                </p>

                {/* list bank */}
                {bankList
                  ? bankList.map((el, index) => {
                      return (
                        <div
                          className="d-flex align-items-center px-2 py-3 mb-3"
                          data-bs-dismiss="modal"
                          style={{
                            backgroundColor: darkMode ? "grey" : "#F4F8FC",
                          }}
                          onClick={() =>
                            checkDepositVA(el.type, el.image, el.name, el.code)
                          }
                          key={index}
                        >
                          <div>
                            <img
                              src={`https://assets.digitalexchange.id/bank/${el.image}`}
                              alt=""
                              className="img-fluid"
                              style={{ width: "60px" }}
                            />
                          </div>
                          <p className="font-14 ms-4 mb-0">{el.name}</p>
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

export default DepositIDR

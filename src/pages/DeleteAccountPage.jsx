import React, { useEffect } from "react"
import { ChevronLeft, X } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import { MdOutlineDeleteForever } from "react-icons/md"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_user_profile } from "../store/actions/user"
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function DeleteAccountPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userToken = localStorage.getItem("token")
  const dataLocalstg = JSON.parse(localStorage.getItem("data_user"))

  const [input, setInput] = useState({
    agreement: false,
    reason: "",
  })

  const handleInput = (e) => {
    let value
    if (e.target.name === "agreement") {
      value = e.target.checked
    } else {
      value = e.target.value
    }

    setInput({
      ...input,
      [e.target.name]: value,
    })
  }

  const handleDeleteAccount = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <>
      <div className="container text-roboto mb-3 text-white">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/security")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "100px" }}>
            Delete Account
          </p>
        </div>
        <p className="font-16 mt-3 fw-bold text-center">
          Are you sure you want to delete this account?
        </p>
        <p className="font-13 text-center">
          Please tell us, What is the reason you deleted your account :
        </p>
        <textarea
          className={
            darkMode
              ? "form-control delete-account-textarea shadow-none bg-dark-mode2 border-0 text-white"
              : "form-control delete-account-textarea shadow-none"
          }
          rows="3"
          placeholder="Enter your reason"
          style={{ backgroundColor: "#DDE4EA", height: "172px" }}
          name="reason"
          onChange={handleInput}
        ></textarea>

        {/* delete account confirmation */}
        <div
          className="mt-3 rounded px-1 py-2"
          style={{ border: "1px solid #F4465E", backgroundColor: "#FEF1F2" }}
        >
          <ol className="font-14 text-secondary">
            <li>
              If you still have assets left in your account, please be able to
              withdraw assets by withdrawing IDR to a bank account or digital
              assets to an exchange/wallet outside digitalexchange.id
            </li>
            <li>
              All forms of transactions such as Security (PIN & 2FA), Escrow
              Wallet, Pending orders, unfinished deposits/withdrawals will be
              automatically deleted.
            </li>
            <li>
              digitalexchange.id is not responsible if the user still has a
              balance (Asset/IDR) and has not been transferred
            </li>
            <li>
              Your account will be permanently deleted and cannot be recovered
              if it has passed 30 days after the account deletion is confirmed.
            </li>
            <li>
              To make an account re-active, please click this link (click here).
            </li>
            <li>
              Emails that have been registered and then deleting the account can
              be reused.
            </li>
            <li>Usernames that have been registered cannot be reused</li>
          </ol>
        </div>
        <p className="font-16 mt-2">
          Before deleting your account, please confirm:
        </p>
        <div className="form-check font-16">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            name="agreement"
            onChange={handleInput}
          />
          <label className="form-check-label">
            I Accept the Terms and Conditions
          </label>
        </div>
        {input.reason.length > 10 ? (
          <>
            {/* button continue & cancel  */}
            <div className="d-grid col-12 mt-3">
              {input.agreement ? (
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "41px" }}
                  data-bs-toggle="modal"
                  data-bs-target="#buy-modal"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  className="btn text-secondary"
                  style={{ backgroundColor: "#DDE4EA", height: "41px" }}
                >
                  Continue
                </button>
              )}

              <button
                type="button"
                className={
                  darkMode ? "btn text-white mt-3" : "btn font-primary mt-3"
                }
                style={{ border: "1px solid #1B6AEA", height: "41px" }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* button continue & cancel  */}
            <div className="d-grid col-12 mt-3">
              <button
                type="button"
                className="btn text-secondary"
                style={{ backgroundColor: "#DDE4EA", height: "41px" }}
                data-bs-toggle="modal"
                data-bs-target="#minChar10"
              >
                Continue
              </button>

              <button
                type="button"
                className={
                  darkMode ? "btn text-white mt-3" : "btn font-primary mt-3"
                }
                style={{ border: "1px solid #1B6AEA", height: "41px" }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal < 10 char */}
      <div
        className="modal fade"
        id="minChar10"
        tabIndex="-1"
        aria-labelledby="minChar10Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="minChar10Label">
                Peringatan!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mb-3">
              minimum alasan untuk menghapus akun 10 karakter
            </div>
          </div>
        </div>
      </div>

      {/* modal confirm delete account */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="buy-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className="modal-content rounded border-0 py-2"
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body">
              <div className="d-flex justify-content-center">
                <div className="col-11">
                  <p className="font-20 fw-bold text-center mb-0">
                    Are you sure you want to <br /> delete your account?
                  </p>
                </div>
                <div className="col-1">
                  <p className="font-25 mb-0" data-bs-dismiss="modal">
                    <X />
                  </p>
                </div>
              </div>
              <p
                className="text-center font-red mb-0"
                style={{ fontSize: "80px" }}
              >
                <MdOutlineDeleteForever />
              </p>
              <div
                className="p-2 rounded"
                style={{ backgroundColor: "#FEF1F2" }}
              >
                <p className="font-14 text-center mb-0 font-red">
                  Warning! If you delete this account you will not be able to
                  access this account in the future. Saved funds/assets will be
                  automatically lost
                </p>
              </div>
              {/* button ok */}
              <div className="d-flex justify-content-between mt-3">
                <button
                  type="button"
                  className="btn font-primary"
                  style={{
                    border: "0.741119px solid #1B6AEA",
                    height: "39.25px",
                    width: "150px",
                  }}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                {/* { dataLocalstg.auth_status === "enable" && dataLocalstg.user.} */}
                {dataLocalstg.user.status_user_pin &&
                dataLocalstg.auth_status === "enable" ? (
                  <button
                    type="button"
                    className="btn text-white"
                    style={{
                      backgroundColor: "#1B6AEA",
                      height: "39.25px",
                      width: "150px",
                    }}
                    data-bs-dismiss="modal"
                    onClick={() =>
                      navigate("/security-verification", {
                        state: {
                          name: "delete-account",
                          reason: input.reason.replaceAll("\n", " "),
                          token: localStorage.getItem("token"),
                        },
                      })
                    }
                  >
                    Delete Account
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn text-white"
                    style={{
                      backgroundColor: "#1B6AEA",
                      height: "39.25px",
                      width: "150px",
                    }}
                    data-bs-dismiss="modal"
                    onClick={() => handleDeleteAccount()}
                  >
                    Delete Account
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

export default DeleteAccountPage

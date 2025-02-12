import React, { useEffect, useState } from "react"
import { ChevronLeft, X } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import SuccessChangePassword from "../assets/success-order.svg"
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import swal from "sweetalert"

function ChangePasswordPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const userToken = localStorage.getItem("token")
  const [generateEmailCode, setGenerateEmailCode] = useState(false)
  const [statusSubmit, setStatusSubmit] = useState(false)
  const [input, setInput] = useState({
    old_password: "",
    new_password: "",
    con_password: "",
    "2fa": "",
    email_code: "",
  })

  useEffect(() => {
    if (
      (input.old_password && input.new_password && input.con_password,
      input["2fa"])
    ) {
      setStatusSubmit(true)
    }
  }, [input])

  const handleInput = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const getEmailCode = () => {
    setGenerateEmailCode(true)
  }

  const handleChangePass = () => {
    swal("Success change password", {
      button: false,
      icon: "success",
    })
    setTimeout(() => {
      navigate("/security")
    }, 1000);
  }

  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ height: "100vh" }}
      >
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "80px" }}>
            Change Password
          </p>
        </div>

        {generateEmailCode ? (
          <div
            className="rounded font-green p-3 align-items-center"
            style={{ backgroundColor: "#E8FFE8" }}
          >
            <div className="d-flex">
              <p className="font-16 mb-0">
                Success! Please check the code on your phone
              </p>
              <p className="font-20 mb-0">
                <X />
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* form change password */}
        <form action="" className="mt-3">
          {/* old password */}
          <div className="mb-3">
            <label className="font-14">Old Password</label>
            <input
              type="password"
              className={
                darkMode
                  ? "form-control form-change-password bg-dark-mode2 text-white border-0 shadow-none"
                  : "form-control form-change-password  shadow-none"
              }
              placeholder="Input here"
              style={{ height: "43px" }}
              name="old_password"
              onChange={handleInput}
            />
          </div>
          {/* New Password */}
          <div className="mb-3">
            <label className="font-14">New Password</label>
            <input
              type="password"
              className={
                darkMode
                  ? "form-control form-change-password bg-dark-mode2 text-white border-0  shadow-none"
                  : "form-control form-change-password  shadow-none"
              }
              placeholder="Input here"
              style={{ height: "43px" }}
              name="new_password"
              onChange={handleInput}
            />
          </div>
          {/* Confirm Password */}
          <div className="mb-3">
            <label className="font-14">Confirm Password</label>
            <input
              type="password"
              className={
                darkMode
                  ? "form-control form-change-password bg-dark-mode2 text-white border-0  shadow-none"
                  : "form-control form-change-password  shadow-none"
              }
              placeholder="Input here"
              style={{ height: "43px" }}
              name="con_password"
              onChange={handleInput}
            />
          </div>

          {/* Enter Code 2FA Authenticator */}
          {/* <div className="mb-3">
						<label className="font-14">Enter Code 2FA Authenticator</label>
						<div className="d-flex align-items-center border rounded" style={{ height: "42px" }}>
							<div className="col-10">
								<input type="number" className="form-control voucher-form shadow-none border-0" placeholder="Masukkan PIN Google Authenticator " name="2fa" onChange={handleInput}/>
							</div>
							<div className="col-2">
								<p className="font-primary mb-0 ms-2 font-12">Paste</p>
							</div>
						</div>
					</div> */}

          {/* Enter Email Code */}
          <div className="mb-3">
            <label className="font-14">Enter Email Code</label>
            <div
              className={
                darkMode
                  ? "d-flex align-items-center"
                  : "d-flex align-items-center border rounded"
              }
              style={{ height: "42px" }}
            >
              <div className="col-10">
                <input
                  type="number"
                  className={
                    darkMode
                      ? "form-control voucher-form shadow-none border-0 bg-dark-mode2 text-white  shadow-none"
                      : "form-control voucher-form shadow-none border-0  shadow-none"
                  }
                  placeholder="Masukkan PIN Google Authenticator "
                  name="email_code"
                  onChange={handleInput}
                />
              </div>
              <div
                className={
                  darkMode ? "col-2 bg-primary py-2 ms-1 rounded" : "col-2"
                }
              >
                {!generateEmailCode ? (
                  <p
                    className={
                      darkMode
                        ? "font-white mb-0 ms-2 font-12"
                        : "font-primary mb-0 ms-2 font-12"
                    }
                    onClick={() => getEmailCode()}
                  >
                    Get Code
                  </p>
                ) : (
                  <p
                    className={
                      darkMode
                        ? "font-white mb-0 ms-2 font-12"
                        : "font-primary mb-0 ms-2 font-12"
                    }
                  >
                    Resends
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* button  */}
          <div className="d-grid col-12">
            {!generateEmailCode ? (
              <button
                type="button"
                className="btn text-secondary"
                style={{ backgroundColor: "#F2F2F2", height: "41px" }}
                data-bs-toggle="modal"
                data-bs-target="#get-code"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B6AEA", height: "41px" }}
                onClick={() => handleChangePass()}
              >
                Submit
              </button>
            )}
          </div>

          <div
            className="p-2 mt-3 rounded"
            style={{ backgroundColor: "#FEF1F2" }}
          >
            <p className="font-red font-9 mb-0">
              For security purpose no withdrawals are permitted for 24 hours
              after modification of methods.{" "}
            </p>
          </div>
        </form>
      </div>

      {/* modal change */}
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
            <div className="modal-body py-4">
              <img
                src={SuccessChangePassword}
                alt=""
                className="img-fluid mx-auto d-block"
              />
              <p className="font-24 fw-bold text-center">
                The Password Information Was Updated
              </p>
              <p className="font-14 text-center">
                Remember Password <br /> Don’t give any Password to anyone
              </p>

              {/* button ok */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "44px" }}
                  data-bs-dismiss="modal"
                >
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal getCode */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="get-code"
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
            <div className="modal-body py-4">
              <p className="font-24 fw-bold text-center">Get Code</p>
              <p className="font-14 text-center">
                Silahkan tekan get code untuk generate kode email
              </p>

              {/* button ok */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA", height: "44px" }}
                  data-bs-dismiss="modal"
                >
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePasswordPage

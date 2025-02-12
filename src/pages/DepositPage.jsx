import axios from "axios"
import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TimeIcon from "../assets/time.svg"
import DepositAsset from "../components/deposit/DepositAsset"
import DepositIDR from "../components/deposit/DepositIDR"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function DepositPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const { name } = useParams()
  const navigate = useNavigate()
  const { path, state } = useLocation()

  console.log(state)
  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto pt-3 text-white"
            : "container text-roboto pt-3"
        }
      >
        {/* title */}
        <div className="d-flex align-items-center justify-content-between">
          <p
            className="fw-bold"
            onClick={() => navigate(`/list-assets/deposit`)}
          >
            <ChevronLeft />
          </p>
          <p className="fw-bold mb-0">Deposit</p>
          <img
            src={TimeIcon}
            alt=""
            className="img-fluid"
            style={{ width: "25px", height: "25px" }}
            onClick={() => navigate(`/asset-detail/${name}`)}
          />
        </div>

        {name !== "IDR" ? (
          <DepositAsset dataState={state} />
        ) : (
          <DepositIDR dataState={state} />
        )}
      </div>
    </>
  )
}

export default DepositPage

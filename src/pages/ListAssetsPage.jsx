import React, { useEffect, useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { baseURLApi } from "../config/api"
import { DBDataAssets } from "../DB/ListAssetPage"

function ListAssetsPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [dataAssets, setDataAssets] = useState(DBDataAssets)
  const [newDataAssets, setNewDataAssets] = useState([])
  const [search, setSearch] = useState()



  useEffect(() => {
    if (dataAssets.length !== 0 && search) {
      let arr = []
      dataAssets.forEach((e) => {
        if (e.symbol.includes(search.toUpperCase())) {
          arr.push(e)
        }
      })
      setNewDataAssets(arr)
    }
  }, [search])

  const handleNavigate = (data) => {
    if (pathname.split("/")[2] === "deposit") {
      navigate(`/deposit/${data}`)
    } else if (pathname.split("/")[2] === "withdraw") {
      navigate(`/withdraw/${data}`)
    }
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
        <div className="d-flex pt-2 align-items-center">
          {localStorage.getItem("link-page") === "wallet-page" ? (
            <p
              className="font-20"
              onClick={() => {
                localStorage.removeItem("link-page")
                navigate(`/wallet`)
              }}
            >
              <ChevronLeft />
            </p>
          ) : localStorage.getItem("link-page") === "home-page" ? (
            <p
              className="font-20"
              onClick={() => {
                localStorage.removeItem("link-page")
                navigate(`/`)
              }}
            >
              <ChevronLeft />
            </p>
          ) : (
            <p
              className="font-20"
              onClick={() => {
                localStorage.removeItem("link-page")
                navigate(`/`)
              }}
            >
              <ChevronLeft />
            </p>
          )}

          <p className="font-20 fw-bold" style={{ marginLeft: "110px" }}>
            List Assets
          </p>
        </div>

        {/* search */}
        <form action="">
          <input
            type="search"
            className={
              darkMode
                ? "form-control border-0 rounded-pill search-form bg-dark-mode2 text-white"
                : "form-control border-0 rounded-pill search-form"
            }
            placeholder="&#xF002;&nbsp; Search Coins"
            style={{
              backgroundColor: "#F4F8FC",
              height: "31px",
              fontFamily: "Arial, FontAwesome",
            }}
            onChange={(e) => {
              e.preventDefault()
              setSearch(e.target.value)
            }}
          />
        </form>

        <div className="mt-4">
          {!search
            ? dataAssets
              ? dataAssets.map((el) => {
                  const img = `https://assets.digitalexchange.id/coin/${el.symbol}.png`
                  return (
                    <div
                      className="d-flex align-items-center mb-4"
                      key={el.id}
                      onClick={() => handleNavigate(el.symbol)}
                    >
                      <img
                        src={img}
                        alt=""
                        className="img-fluid"
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="font-14 fw-bold ms-3 mb-0">{el.symbol}</p>
                    </div>
                  )
                })
              : "Loading"
            : newDataAssets.map((el) => {
                const img = `https://assets.digitalexchange.id/coin/${el.symbol}.png`
                return (
                  <div
                    className="d-flex align-items-center mb-4"
                    key={el.id}
                    onClick={() => handleNavigate(el.symbol)}
                  >
                    <img
                      src={img}
                      alt=""
                      className="img-fluid"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <p className="font-14 fw-bold ms-3 mb-0">{el.symbol}</p>
                  </div>
                )
              })}
        </div>
      </div>
    </>
  )
}

export default ListAssetsPage

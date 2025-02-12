import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"
import { baseURLApi } from "../config/api"

export default function TransactionBuySell() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const { name } = useParams()
  const assetName = name.split("-")[0]
  const pairName = name.split("-")[1]
  const navigate = useNavigate()

  const [fullNameAsset, setFullNameAsset] = useState()

  // API-Assets
  useEffect(() => {
    axios
      .get(`${baseURLApi}/assets`)
      .then(({ data }) => {
        if (data.status === "success") {
          let find = data.data.find((e) => e.symbol === assetName)

          if (find) {
            setFullNameAsset(find.name)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div
        className={darkMode ? "container text-white" : "container"}
        style={{ minHeight: "100vh" }}
      >
        <div className="d-flex justify-content-between pt-2 align-items-center">
          <p className="font-18" onClick={() => navigate("/market")}>
            <ChevronLeft />
          </p>
          <p className="font-18 fw-bold mb-0">
            {assetName}/{pairName}
          </p>

          <p>{""}</p>
        </div>

        {/* Header */}
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center h-100">
              <div className="fw-bold ">
                {assetName}
                <p className="font-14 mb-0">{fullNameAsset}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <img
              src={`https://asset.digitalexchange.id/coin/${assetName}.png`}
              className="img-fluid float-end"
              style={{ objectFit: "cover", width: 72 }}
              alt=""
            />
          </div>
        </div>
        <hr
          className="text-secondary mt-3"
          style={{ opacity: "3%", border: "2.5px solid black" }}
        />

        <div className="d-flex justify-content-center">
          <div className="div w-75 pt-4">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={`https://asset.digitalexchange.id/coin/${assetName}.png`}
                className="img-fluid float-end"
                style={{ objectFit: "cover", width: 36 }}
                alt=""
              />
              <p className="mb-0 fw-bold font-18">
                {fullNameAsset} ({assetName})
              </p>
            </div>
          </div>
        </div>
        <p className="mb-0 text-center mt-1">Informasi Pembelian</p>
        <p className="mb-0 text-center fw-bold font-24 font-green mt-3">
          0.5648 {assetName}
        </p>
        <div className="px-3 mt-4">
          <div className="row text-inter font-14">
            <div className="col">Final Price ({assetName})</div>
            <div className="col text-end fw-bold">Rp a1111d</div>
          </div>
          <div className="row text-inter font-14 mt-3">
            <div className="col">Total Purchases</div>
            <div className="col text-end fw-bold">Rp 26255</div>
          </div>
          <div className="row text-inter font-14 mt-3">
            <div className="col">PPN</div>
            <div className="col text-end fw-bold">Rp 26255</div>
          </div>
          <p className="mt-4 fw-bold">Jumlah</p>
        </div>
      </div>
    </>
  )
}

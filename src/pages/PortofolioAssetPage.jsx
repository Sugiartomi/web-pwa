import React, { useEffect, useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate } from "react-router-dom"
import PieChartComponent from "../components/wallet/HighChart"
import { handleAddIdrEstimation } from "../helpers/dataFunction"
import { useRecoilState, useRecoilValue } from "recoil"
import { getTheme } from "../recoil/theme.State"
import Chart from "@mindinventory/result-doughnut-chart"
import { fix_total_balance, get_data_total_wallet } from "../recoil/walletState"
import { DBDataWalletPorto, DBDatagraphPorto, DBTotalWalletAsset, DBWAlletPorto } from "../DB/PortoPage"

const PortofolioAssetPage = () => {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()

  const [totalWalletAsset, setTotalWalletAsset] =
    useState(DBTotalWalletAsset)

    const [dataWallet, setdataWallet] = useState(DBDataWalletPorto) 
   
  const [wallet, setWallet] = useState(DBWAlletPorto)

  const [dataGraphBar, setDataGraphBar] = useState(DBDatagraphPorto)
  

  const sortWallet = (a, b) => {
    if (a.balanceIDR < b.balanceIDR) {
      return 1
    }
    if (a.balanceIDR > b.balanceIDR) {
      return -1
    }
    return 0
  }

  useEffect(() => {
    if (dataWallet.length !== 0) {
      let temp = []
      let total = 0
      dataWallet.map((e) => {
        let balanceIDR = 0
        if (e.symbol === "IDR") {
          balanceIDR = +e.amount + +e.amount_frozen
        } else {
          if (!e.price) {
            balanceIDR = (+e.amount + +e.amount_frozen) * 1
          } else {
            balanceIDR = (+e.amount + +e.amount_frozen) * +e.price
          }
        }
        if (balanceIDR) {
          total += balanceIDR
        }
        if (balanceIDR !== 0 && !isNaN(balanceIDR)) {
          temp.push({ ...e, balanceIDR })
        }
      })
      setWallet(temp.sort(sortWallet))
      setTotalWalletAsset(total)
    }
  }, [dataWallet])

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

 

  const [apiData, setApiData] = useState({
    firstChartDataSetLabel: "%",
    firstChart: [],
    tipData: [],
    extraData: [],
  })

  useEffect(() => {
    if (dataGraphBar.length !== 0) {
      let temp2 = []
      dataGraphBar.forEach((e) => {
        let temp = {}
        temp.name = e.symbol
        temp.backgroundColor = e.color
        temp.borderColor = e.color
        temp.data = e.percent
        temp2.push(temp)
      })
      setApiData({ ...apiData, firstChart: temp2 })
    }
  }, [dataGraphBar])
  return (
    <>
      <div
        className={
          darkMode
            ? "container text-roboto text-white"
            : "container text-roboto"
        }
        style={{ minHeight: "100vh" }}
      >
        <p className="font-25" onClick={() => navigate("/wallet")}>
          <ChevronLeft />
        </p>
        <div className="text-center w-100">
          <p className="  mb-2">Total Asset Value (IDR)</p>
          {/* <p className="font-25 fw-bold">{state.totalAsset} IDR</p> */}
        </div>
        <div>
          <Chart data={apiData} />
        </div>
        {/* <PieChartComponent dataChart={chartList()} /> */}
      </div>
    </>
  )
}

export default PortofolioAssetPage

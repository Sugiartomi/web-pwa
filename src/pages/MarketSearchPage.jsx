import React, { useEffect, useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"
import connectSocketMarket from "../config/socketMarket"
import {
  data_favorite_market,
  get_last_price_24,
} from "../store/actions/market"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { baseURLApi } from "../config/api"

function MarketSearchPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // SOCKET MARKET
  const [dataMarket, setDataMarket] = useState([])
  const [newDataMarket, setNewDataMarket] = useState([])
  const [search, setSearch] = useState()
  const [dataAllTicker, setDataAllTicker] = useState()
  const { allTicker } = useSelector((store) => store.dataMarket)

  useEffect(() => {
    connectSocketMarket(setDataMarket, undefined, "market-search")
    return () => {
      connectSocketMarket(setDataMarket, undefined, "market-search", true)
    }
  }, [])

  useEffect(() => {
    console.log(allTicker)
    if (allTicker.length === 0) {
      axios
        .get(baseURLApi + "/allticker")
        .then(({ data }) => {
          setDataAllTicker(data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setDataAllTicker(allTicker)
    }
  }, [])

  // function navigate to trade page
  const navigateToTrade = (coin, data) => {
    console.log("masuk")
    navigate(`/market/${coin}`, {
      state: { last_price_percentage_24h: data, allTicker: dataAllTicker },
    })
    dispatch(get_last_price_24(data))
  }

  useEffect(() => {
    if (dataMarket.length !== 0 && search) {
      let arr = []
      dataMarket.forEach((e) => {
        if (e.symbol.includes(search.toUpperCase())) {
          arr.push(e)
        }
      })
      setNewDataMarket(arr)
    }
  }, [search, dataMarket])

  return (
    <>
      <div className="container text-roboto">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/market")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "120px" }}>
            Search
          </p>
        </div>

        {/* search */}
        <form action="">
          <input
            type="search"
            className="form-control border-0 rounded-pill search-form"
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

        {/* list coin */}
        <div className="mt-4">
          {!search ? (
            <>
              {dataMarket.length !== 0
                ? dataMarket.map((el, i) => {
                    return (
                      <div
                        className="row mb-2"
                        key={i + 1}
                        onClick={() =>
                          navigateToTrade(
                            `${el.symbol.slice(0, -3)}-${el.symbol.slice(-3)}`,
                            el.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col-4">
                          <p className="font-15 fw-bold mb-1">
                            <span className="font-dark">{el.assetsName}</span>
                          </p>
                          <p className="font-10 font-primary">
                            Vol {el.volume}
                          </p>
                        </div>
                        <div className="col-4">
                          <p
                            className="font-15 fw-bold"
                            style={
                              el.last_price_percentage_24h[0] === "-"
                                ? { color: "#F4465E" }
                                : { color: "#20CB6F" }
                            }
                          >
                            {el.last_price}
                          </p>
                        </div>
                        <div className="col-4">
                          <p
                            className="font-15 fw-bold badge"
                            style={
                              el.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                    backgroundColor: "#FFEDED",
                                  }
                                : {
                                    color: "#20CB6F",
                                    backgroundColor: "#EDFFF2",
                                  }
                            }
                          >
                            {el.last_price_percentage_24h}
                          </p>
                        </div>
                      </div>
                    )
                  })
                : "loading"}
            </>
          ) : (
            <>
              {newDataMarket.length !== 0
                ? newDataMarket.map((el, i) => {
                    return (
                      <div
                        className="row mb-2"
                        key={i + 1}
                        onClick={() =>
                          navigateToTrade(
                            `${el.symbol.slice(0, -3)}-${el.symbol.slice(-3)}`,
                            el.last_price_percentage_24h
                          )
                        }
                      >
                        <div className="col-4">
                          <p className="font-15 fw-bold mb-1">
                            <span className="font-dark">{el.assetsName}</span>
                          </p>
                          <p className="font-10 font-primary">
                            Vol {el.volume}
                          </p>
                        </div>
                        <div className="col-4">
                          <p
                            className="font-15 fw-bold"
                            style={
                              el.last_price_percentage_24h[0] === "-"
                                ? { color: "#F4465E" }
                                : { color: "#20CB6F" }
                            }
                          >
                            {el.last_price}
                          </p>
                        </div>
                        <div className="col-4">
                          <p
                            className="font-15 fw-bold badge"
                            style={
                              el.last_price_percentage_24h[0] === "-"
                                ? {
                                    color: "#F4465E",
                                    backgroundColor: "#FFEDED",
                                  }
                                : {
                                    color: "#20CB6F",
                                    backgroundColor: "#EDFFF2",
                                  }
                            }
                          >
                            {el.last_price_percentage_24h}
                          </p>
                        </div>
                      </div>
                    )
                  })
                : "Tidak ada"}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MarketSearchPage

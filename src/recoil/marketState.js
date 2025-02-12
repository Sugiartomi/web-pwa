import { atom, selector } from "recoil"
import axiosConfig from "../config/axios"
import axios from "axios"
import { baseURLApi, baseURLPrivateApi } from "../config/api"
const userToken = localStorage.getItem("token")



export const get_data_all_ticker = atom({
  key: "get_data_all_ticker",
  default: selector({
    key: "allTickerData",
    get: async () => {
      let result
      await axios
        .get(baseURLApi+"/allticker")
        .then(({ data }) => {
          result = data.data
        })
        .catch((err) => {
          result = err.messages
        })
      return result
    },
  }),
})

export const get_filtered_ticker = selector({
  key: "get_filtered_ticker",
  get: ({ get }) => {
    let dataTicker0 = null
    let dataTicker1 = null

    let data = get(get_data_all_ticker)

    const handleShortName = (a, b) => {
        if (a.symbol < b.symbol) return -1
        if (a.symbol > b.symbol) return 1
        return 0
      }

    dataTicker0 = data
      .filter((el) => el.integrasi === "0" && el.market_beta === "0")
      .sort(handleShortName)
    dataTicker1 = data
      .filter((el) => el.integrasi === "1" || el.market_beta === "1")
      .sort(handleShortName)

    return { dataTicker0, dataTicker1 }
  },
})

export const get_fav_market = selector({
  key : "get_fav_market",
  get : async () => {
    let dataFavourite;
    await  axios
    .post(baseURLPrivateApi+"/favourite-list", {
      token: userToken,
    })
    .then(({ data }) => {
      if( data.status === "success") {
        dataFavourite = data.data
      }
    })
    .catch((err) => {
      console.log(err);
    });

    return dataFavourite
  }
})
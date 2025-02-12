import axios from "axios"
import axiosConfig from "../../config/axios"
import { handleAddIdrEstimation } from "../../helpers/dataFunction"
import {
  DATA_WALLET_LIST,
  HISTORY_DEPOSIT_IDR,
  GET_TOTAL_ASSET,
} from "../types/wallet"
import { baseURLApi, baseURLPrivateApi } from "../../config/api"
const userToken = localStorage.getItem("token")

export const get_data_wallet = (name) => (dispatch, getState) => {
  setTimeout(() => {
    axiosConfig
      .post("/wallet", {
        token: userToken,
      })
      .then(({ data }) => {
        return dispatch({
          type: DATA_WALLET_LIST,
          payload: data.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, 500)
}

export const get_deposit_history_idr = () => (dispatch, getState) => {
  setTimeout(() => {
    axios
      .post(baseURLPrivateApi + "/depositIdr", {
        token: userToken,
      })
      .then(({ data }) => {
        return dispatch({
          type: HISTORY_DEPOSIT_IDR,
          payload: data.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, 300)
}

export const count_total_asset = () => (dispatch, getState) => {
  console.log("masuk sinuiuiiiii")
  let dataTicker
  let totalAsset = 0
  axios
    .get(baseURLApi + "/allticker")
    .then(({ data }) => {
      if (data.status === "success") {
        dataTicker = data.data

        axiosConfig
          .post("/wallet", {
            token: userToken,
          })
          .then(({ data }) => {
            console.log(data)
            let dataWalet =
              data &&
              data.data?.map((el) => {
                let asset = handleAddIdrEstimation(
                  dataTicker,
                  +el.amount,
                  +el.amount_frozen,
                  el.symbol
                )
                totalAsset += asset
              })
            return dispatch({
              type: GET_TOTAL_ASSET,
              payload: totalAsset,
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

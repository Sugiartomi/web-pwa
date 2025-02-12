import { LAST_PRICE_PERCENTAGE_24, GET_ALL_TICKER, FAVORITE_MARKET } from "../types/market";
import axios from "axios";
import axiosConfig from "../../config/axios";
import { baseURLApi } from "../../config/api";
const userToken = localStorage.getItem("token");

export const get_last_price_24 = (data) => (dispatch, getState) => {
  return dispatch({
    type: LAST_PRICE_PERCENTAGE_24,
    payload: data,
  });
};

export const get_data_ticker = () => (dispatch, getState) => {
  axios
    .get(baseURLApi+"/allticker")
    .then(({ data }) => {
      return dispatch({
        type: GET_ALL_TICKER,
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const data_favorite_market = () => (dispatch, getState) => {
  setTimeout(() => {
    axiosConfig
      .post("/favourite-list", {
        token: userToken,
      })
      .then(({ data }) => {
        return dispatch({
          type: FAVORITE_MARKET,
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, 300);
};

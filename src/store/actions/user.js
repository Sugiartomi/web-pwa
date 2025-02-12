import {
  GOOGLE_2FA,
  LOGIN_STATUS,
  PHONE_VERIFICATION,
  PIN_GUARD,
  SECURITY_STATUS,
  ADD_BANK_ACCOUNT,
  USER_PROFILE,
  TOTAL_WALLET_ASSET,
  DATA_ALL_TICKER,
} from "../types/user"
import axiosConfig from "../../config/axios"
const userToken = localStorage.getItem("token")

export const phone_verification = (status) => (dispatch, getState) => {
  return dispatch({
    type: PHONE_VERIFICATION,
    payload: status,
  })
}
export const pin_guard = (status) => (dispatch, getState) => {
  return dispatch({
    type: PIN_GUARD,
    payload: status,
  })
}

export const security_status = (status) => (dispatch, getState) => {
  return dispatch({
    type: SECURITY_STATUS,
    payload: status,
  })
}

export const google_authenticator_status = (status) => (dispatch, getState) => {
  return dispatch({
    type: GOOGLE_2FA,
    payload: status,
  })
}

export const login_status = (status) => (dispatch, getState) => {
  return dispatch({
    type: LOGIN_STATUS,
    payload: status,
  })
}
export const add_bank_account = (data) => (dispatch, getState) => {
  return dispatch({
    type: ADD_BANK_ACCOUNT,
    payload: data,
  })
}
// FROM API
export const get_total_wallet_asset = (data) => (dispatch, getState) => {
  return dispatch({
    type: TOTAL_WALLET_ASSET,
    payload: data,
  })
}
export const get_all_ticker = (data) => (dispatch, getState) => {
  return dispatch({
    type: DATA_ALL_TICKER,
    payload: data,
  })
}

export const get_user_profile = (data) => (dispatch, getState) => {
  axiosConfig
    .post("/update-profile", {
      token: userToken,
    })
    .then(({ data }) => {
      if (data.status === "success") {
        return dispatch({
          type: USER_PROFILE,
          payload: data.info,
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

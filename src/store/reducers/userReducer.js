import { GOOGLE_2FA, LOGIN_STATUS, PHONE_VERIFICATION, PIN_GUARD, SECURITY_STATUS, ADD_BANK_ACCOUNT, TOTAL_WALLET_ASSET, DATA_ALL_TICKER, USER_PROFILE } from "../types/user";

let initialState = {
  phoneVerification: false,
  pinGuard: false,
  google2FA: false,
  securityStatus: "low",
  loginStatus: false,
  dataBankAccount: [],
  userProfile: {},
  dataTotalWalletAsset: 0,
  dataAllTicker: [],
};

const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
      };
    case PHONE_VERIFICATION:
      return {
        ...state,
        phoneVerification: payload,
      };
    case PIN_GUARD:
      return {
        ...state,
        pinGuard: payload,
      };
    case GOOGLE_2FA:
      return {
        ...state,
        google2FA: payload,
      };
    case SECURITY_STATUS:
      return {
        ...state,
        securityStatus: payload,
      };
    case LOGIN_STATUS:
      return {
        ...state,
        loginStatus: payload,
      };
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        dataBankAccount: payload,
      };
    case TOTAL_WALLET_ASSET:
      return {
        ...state,
        dataTotalWalletAsset: payload,
      };
    case DATA_ALL_TICKER:
      return {
        ...state,
        dataAllTicker: payload,
      };

    default:
      return state;
  }
};

export default userReducer;

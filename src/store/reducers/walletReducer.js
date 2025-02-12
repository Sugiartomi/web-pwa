import { DATA_WALLET_LIST, HISTORY_DEPOSIT_IDR, GET_TOTAL_ASSET } from "../types/wallet";

let initialState = {
  listDataWallet: [],
  historyDepositIdr: [],
  totalAsset: 0,
};

const walletReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case DATA_WALLET_LIST:
      return {
        ...state,
        listDataWallet: payload,
      };
    case HISTORY_DEPOSIT_IDR:
      return {
        ...state,
        historyDepositIdr: payload,
      };
    case GET_TOTAL_ASSET:
      return {
        ...state,
        totalAsset: payload,
      };

    default:
      return state;
  }
};

export default walletReducer;

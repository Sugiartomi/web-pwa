import { GET_DEPOSIT_HISTORY, GET_WITHDRAWAL_HISTORY } from "../types/history";

let initialState = {
  depositHistory : [],
  withdrawalHistory : []
};

const historyReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_DEPOSIT_HISTORY:
      return {
        ...state,
        depositHistory: payload,
      };
    case GET_WITHDRAWAL_HISTORY:
      return {
        ...state,
        withdrawalHistorys: payload,
      };


    default:
      return state;
  }
};

export default historyReducer;

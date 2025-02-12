import { GET_DATA_ORDERBOOK } from "../types/socketOrder";

let initialState = {
  socketOrderList: {},
};

const socketOrderReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_DATA_ORDERBOOK:
      return {
        ...state,
        socketOrderList: payload,
      };

    default:
      return state;
  }
};

export default socketOrderReducer;

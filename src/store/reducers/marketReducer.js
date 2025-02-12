import { LAST_PRICE_PERCENTAGE_24, GET_ALL_TICKER, FAVORITE_MARKET, ALL_ASSETS } from "../types/market";

let initialState = {
  lastPricePercentage_24h: "",
  allTicker: [],
  favoriteMarket: [],
  assets : []
};

const marketReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case LAST_PRICE_PERCENTAGE_24:
      return {
        ...state,
        lastPricePercentage_24h: payload,
      };
    case GET_ALL_TICKER:
      return {
        ...state,
        allTicker: payload,
      };
    case FAVORITE_MARKET:
      return {
        ...state,
        favoriteMarket: payload,
      };
    case ALL_ASSETS:
      return {
        ...state,
        assets: payload,
      };

    default:
      return state;
  }
};

export default marketReducer;

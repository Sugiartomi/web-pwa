import { httpSocketMarket } from "../../config/api";
import { GET_DATA_ORDERBOOK } from "../types/socketOrder";
import { io } from "socket.io-client";

export const get_data_order = (assetName, pairName) => (dispatch, getState) => {
  const CONNECTION_PORT = httpSocketMarket;
  const socket = io(CONNECTION_PORT, {
    transports: ["websocket"],
  });
  const CHANNEL = `tradedata-${assetName + pairName}@depth`;
  socket.emit("subscribe", `guest.${CHANNEL}`);
  socket.on(CHANNEL, (data) => {
    return dispatch({
      type: GET_DATA_ORDERBOOK,
      payload: data,
    });
  });
};

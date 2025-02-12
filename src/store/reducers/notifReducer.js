import { DATA_NOTIFICATION_LIST, DATA_READ_NOTIFICATION_LIST } from "../types/notification";

let initialState = {
  notificationList: [],
  readNotification : false
};

const notificationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case DATA_NOTIFICATION_LIST:
      return {
        ...state,
        notificationList: payload,
      };

    case DATA_READ_NOTIFICATION_LIST:
      return {
        ...state,
        readNotification: payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;

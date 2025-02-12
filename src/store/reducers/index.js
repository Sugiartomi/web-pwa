import { combineReducers } from "redux";
import marketReducer from "./marketReducer";
import socketOrderReducer from "./socketOrderReducer";
import userReducer from "./userReducer";
import walletReducer from "./walletReducer";
import notificationReducer from "./notifReducer";
import historyReducer from "./historyReducer";

const rootReducer = combineReducers({
    user: userReducer,
    dataSocketOrder: socketOrderReducer,
    dataMarket: marketReducer,
    wallet: walletReducer,
    notification: notificationReducer,
    history : historyReducer
});

export default rootReducer;

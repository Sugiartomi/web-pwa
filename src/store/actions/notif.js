import axiosConfig from "../../config/axios";
import { DATA_NOTIFICATION_LIST, DATA_READ_NOTIFICATION_LIST } from "../types/notification";
const userToken = localStorage.getItem("token");

export const data_notification_list = () => (dispatch, getState) => {
    axiosConfig
        .post("/notification", {
            token: userToken,
        })
        .then(({ data }) => {
            return dispatch({
                type: DATA_NOTIFICATION_LIST,
                payload: data.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const data_read_notification_list = () => (dispatch, getState) => {
    axiosConfig
        .post("/read-notification", {
            token: userToken,
        })
        .then(({ data }) => {
            let result;
            data.status === "success" ? (result = true) : (result = false);
            return dispatch({
                type: DATA_READ_NOTIFICATION_LIST,
                payload: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
